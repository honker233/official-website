document.addEventListener('DOMContentLoaded', () => {
  // --- HEADER SCROLL EFFECT ---
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- MOBILE NAV TOGGLE ---
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(6px, 6px)' : 'none';
      spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
      spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(5px, -5px)' : 'none';
    });

    // Close menu when link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // --- FAQ ACCORDION ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close all items
      faqItems.forEach(i => i.classList.remove('active'));
      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // --- INTERACTIVE AI SIMULATOR ---
  const chatHistory = document.getElementById('chat-history');
  const simForm = document.getElementById('sim-form');
  const simInput = document.getElementById('sim-input');
  const promptTags = document.querySelectorAll('.sim-prompt-tag');

  // Prebaked responses in Chinese
  const responses = {
    "write social post": "🚀 与 云枢AI 一起探索未来！我们的全新 AI 助手已准备好全面提升您的生产力。今天你想创造点什么？ #云枢AI #科技创新 #创意无限 #未来已来",
    "design code snippet": "这里是一个高级发光按钮的 CSS 代码片段：\n\n```css\n.btn-glow {\n  background: linear-gradient(135deg, #8B5CF6, #06B6D4);\n  box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);\n  border-radius: 8px;\n  padding: 12px 24px;\n  color: white;\n  font-weight: 600;\n  transition: all 0.3s ease;\n}\n.btn-glow:hover {\n  box-shadow: 0 0 25px rgba(139, 92, 246, 0.7);\n  transform: translateY(-2px);\n}\n```",
    "how help me": "我可以为您提供广泛的创意与技术支持：\n\n✍️ *创意写作：* 撰写邮件、博客文章或社媒文案。\n💻 *编程助手：* 生成、解释和调试各种代码。\n💡 *头脑风暴：* 策划项目概念、命名或大纲。\n📊 *深度分析：* 提炼长篇文章要点，整理结构化数据。",
    "who created you": "我是 云枢AI，一款专为帮助用户优化日常工作流、释放创意潜能并解决复杂问题而设计的新一代智能助手。我完美支持 iOS、iPadOS 和 macOS 设备。"
  };

  const getAIResponse = (input) => {
    const cleaned = input.toLowerCase().trim();
    if (cleaned.includes('post') || cleaned.includes('social') || cleaned.includes('社媒') || cleaned.includes('帖子') || cleaned.includes('文案')) {
      return responses["write social post"];
    } else if (cleaned.includes('code') || cleaned.includes('snippet') || cleaned.includes('css') || cleaned.includes('代码') || cleaned.includes('设计')) {
      return responses["design code snippet"];
    } else if (cleaned.includes('help') || cleaned.includes('what') || cleaned.includes('帮助') || cleaned.includes('功能') || cleaned.includes('做什')) {
      return responses["how help me"];
    } else if (cleaned.includes('who') || cleaned.includes('create') || cleaned.includes('谁') || cleaned.includes('开发') || cleaned.includes('创建') || cleaned.includes('yunshu') || cleaned.includes('云枢')) {
      return responses["who created you"];
    }
    
    return `这是一个很有意思的问题！作为 云枢AI 助手，我完全可以处理写作、编程、数据提炼和创意研究。您可以尝试这样问我：\n- *“写一篇关于 AI 的社媒帖子”*\n- *“生成一个设计代码片段”*！`;
  };

  const appendMessage = (sender, text) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender === 'user' ? 'chat-msg-user' : 'chat-msg-bot'}`;

    const avatar = document.createElement('div');
    avatar.className = `chat-avatar ${sender === 'user' ? 'chat-avatar-user' : 'chat-avatar-bot'}`;
    avatar.textContent = sender === 'user' ? 'U' : '云';

    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}`;
    bubble.innerHTML = text;
    
    msgDiv.appendChild(avatar);
    msgDiv.appendChild(bubble);
    chatHistory.appendChild(msgDiv);

    // Scroll to bottom
    chatHistory.scrollTop = chatHistory.scrollHeight;

    return bubble;
  };

  const typeText = (element, text, callback) => {
    let index = 0;
    element.classList.add('typing');
    
    const interval = setInterval(() => {
      if (index < text.length) {
        let currentSlice = text.substring(0, index + 1);
        element.innerHTML = currentSlice
          .replace(/\n/g, '<br>')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/```css([\s\S]*?)```/g, '<pre style="background:rgba(0,0,0,0.3); padding:10px; border-radius:6px; margin:8px 0; overflow-x:auto; font-family:monospace; border:1px solid rgba(255,255,255,0.05);">$1</pre>');
        
        index++;
        chatHistory.scrollTop = chatHistory.scrollHeight;
      } else {
        clearInterval(interval);
        element.classList.remove('typing');
        if (callback) callback();
      }
    }, 20);
  };

  const handleUserInput = (text) => {
    if (!text.trim()) return;

    // User Message
    appendMessage('user', text);
    simInput.value = '';

    // Simulate AI thinking
    setTimeout(() => {
      const responseBubble = appendMessage('bot', '');
      const aiResponse = getAIResponse(text);
      
      // Disable inputs during typing
      simInput.disabled = true;
      if (simForm.querySelector('button')) {
        simForm.querySelector('button').disabled = true;
      }

      typeText(responseBubble, aiResponse, () => {
        simInput.disabled = false;
        if (simForm.querySelector('button')) {
          simForm.querySelector('button').disabled = false;
        }
        simInput.focus();
      });
    }, 600);
  };

  if (simForm && simInput) {
    simForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleUserInput(simInput.value);
    });

    // Tag click
    promptTags.forEach(tag => {
      tag.addEventListener('click', () => {
        if (!simInput.disabled) {
          handleUserInput(tag.getAttribute('data-prompt'));
        }
      });
    });
  }

  // --- MOCK SUPPORT FORM SUBMISSION ---
  const supportForm = document.getElementById('support-form');
  const successMsg = document.getElementById('form-success');
  
  if (supportForm && successMsg) {
    supportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = supportForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.textContent = '正在发送信息...';

      // Simulate API call
      setTimeout(() => {
        supportForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Show success
        successMsg.style.display = 'block';
        
        // Hide after 5 seconds
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 5000);
      }, 1200);
    });
  }
});
