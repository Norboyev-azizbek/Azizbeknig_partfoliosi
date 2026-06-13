// main.js - Complete Premium Portfolio JavaScript (No Loading Screen)

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ============ PERFORMANCE OPTIMIZATIONS ============
    const debounce = (func, delay = 100) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const throttle = (func, limit = 100) => {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    // ============ SCROLL PROGRESS BAR ============
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);

    const updateScrollProgress = () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    };
    window.addEventListener('scroll', throttle(updateScrollProgress, 50));

    // ============ BACK TO TOP BUTTON ============
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Yuqoriga qaytish');
    document.body.appendChild(backToTop);

    const toggleBackToTop = () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    };
    window.addEventListener('scroll', throttle(toggleBackToTop, 50));
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============ TYPING EFFECT ============
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const words = [
            'Full-Stack Dasturchi',
            'Grafik Dizayner',
            'UI/UX Designer',
            'Python Developer',
            'Web Developer'
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                setTimeout(() => { isDeleting = true; type(); }, 2000);
                return;
            }

            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500);
                return;
            }

            const speed = isDeleting ? 50 : 100;
            setTimeout(type, speed);
        }

        type();
    }

    // ============ COUNTER ANIMATION ============
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 1500;
        const startTime = performance.now();
        
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * easeOut);
            counter.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        };
        
        requestAnimationFrame(update);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5, rootMargin: '50px' });

    counters.forEach(counter => counterObserver.observe(counter));

    // ============ SKILLS PROGRESS BAR ANIMATION ============
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5, rootMargin: '50px' });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // ============ READ MORE / READ LESS TOGGLE ============
    function initReadMoreButtons() {
        const toggleButtons = document.querySelectorAll('.toggle-read-btn');
        
        toggleButtons.forEach(button => {
            button.removeEventListener('click', button._listener);
            
            const clickHandler = function(e) {
                e.preventDefault();
                const parent = this.closest('.project-content');
                if (!parent) return;
                
                const shortText = parent.querySelector('.project-short-text');
                const fullText = parent.querySelector('.project-full-text');
                
                if (fullText && shortText) {
                    if (fullText.classList.contains('hidden')) {
                        shortText.style.opacity = '0';
                        setTimeout(() => {
                            shortText.classList.add('hidden');
                            fullText.classList.remove('hidden');
                            fullText.style.opacity = '0';
                            setTimeout(() => {
                                fullText.style.opacity = '1';
                            }, 10);
                        }, 150);
                        this.textContent = 'Kamroq ko\'rsat';
                    } else {
                        fullText.style.opacity = '0';
                        setTimeout(() => {
                            fullText.classList.add('hidden');
                            shortText.classList.remove('hidden');
                            shortText.style.opacity = '0';
                            setTimeout(() => {
                                shortText.style.opacity = '1';
                            }, 10);
                        }, 150);
                        this.textContent = 'Ko\'proq ko\'rsat';
                    }
                }
            };
            
            button._listener = clickHandler;
            button.addEventListener('click', clickHandler);
        });
    }
    initReadMoreButtons();

    // ============ PREMIUM NAVIGATION ============
    const nav = document.querySelector('nav');
    const menuBtn = document.querySelector('.menu-btn');
    const navUl = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');

    const handleNavScroll = () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', throttle(handleNavScroll, 50));

    // Mobile menu
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            if (navUl) {
                navUl.classList.toggle('active');
                if (navUl.classList.contains('active')) {
                    navUl.style.animation = 'fadeInDown 0.3s ease forwards';
                } else {
                    navUl.style.animation = 'fadeOutUp 0.3s ease forwards';
                }
            }
        });
    }

    if (navLinks.length) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (menuBtn) menuBtn.classList.remove('active');
                if (navUl) navUl.classList.remove('active');
            });
        });
    }

    document.addEventListener('click', (e) => {
        if (nav && !nav.contains(e.target) && navUl && navUl.classList.contains('active')) {
            if (menuBtn) menuBtn.classList.remove('active');
            navUl.classList.remove('active');
        }
    });

    // ============ SEARCH FUNCTIONALITY ============
    const searchInput = document.querySelector('.search-wrapper input');
    const searchBtn = document.querySelector('.search-btn');

    const showToast = (title, message, type = 'success') => {
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(toast => toast.remove());
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
            <div class="toast-progress"></div>
        `;
        document.body.appendChild(toast);
        
        const progress = toast.querySelector('.toast-progress');
        if (progress) {
            progress.style.transition = 'width 4s linear';
            setTimeout(() => progress.style.width = '100%', 10);
        }
        
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 500);
        }, 4000);
        
        toast.addEventListener('click', () => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 500);
        });
    };

    const performSearch = () => {
        if (!searchInput || !searchInput.value.trim()) return;
        
        const searchTerm = searchInput.value.trim().toLowerCase();
        const searchableElements = document.querySelectorAll('h1, h2, h3, p, .project-content, .service-card, .project-card');
        let results = [];
        
        searchableElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                results.push(element);
                element.classList.add('search-highlight');
                setTimeout(() => {
                    element.classList.remove('search-highlight');
                }, 3000);
            }
        });
        
        if (results.length > 0) {
            results[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            showToast('Qidiruv natijasi', `${results.length} ta natija topildi: "${searchTerm}"`, 'success');
        } else {
            showToast('Qidiruv', `"${searchTerm}" bo'yicha hech narsa topilmadi`, 'error');
        }
    };
    
    if (searchBtn) searchBtn.addEventListener('click', performSearch);
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }

    // ============ PROJECT FILTERS ============
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                let visibleCount = 0;
                
                projectCards.forEach((card, index) => {
                    if (filter === 'all') {
                        card.style.display = '';
                        card.style.animation = `fadeInUp 0.4s ease ${index * 0.05}s forwards`;
                        visibleCount++;
                    } else {
                        const category = card.getAttribute('data-category');
                        if (category && category === filter) {
                            card.style.display = '';
                            card.style.animation = `fadeInUp 0.4s ease ${visibleCount * 0.05}s forwards`;
                            visibleCount++;
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
                
                if (visibleCount === 0) {
                    showToast('Filter', 'Bu toifada loyihalar topilmadi', 'info');
                }
            });
        });
    }

    // ============ CONTACT FORM VALIDATION ============
    const contactForm = document.querySelector('.contact-container form');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.classList.add('success');
                    this.classList.remove('error');
                    const errorMsg = this.parentElement.querySelector('.error-message');
                    if (errorMsg) errorMsg.remove();
                }
            });
        });
        
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = this.querySelector('input[name="name"]');
            const emailInput = this.querySelector('input[name="email"]');
            const messageInput = this.querySelector('textarea[name="message"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!nameInput.value.trim()) {
                showFormError(nameInput, 'Ismingizni kiriting');
                isValid = false;
            } else if (nameInput.value.trim().length < 2) {
                showFormError(nameInput, 'Ism kamida 2 ta harf');
                isValid = false;
            } else {
                clearFormError(nameInput);
            }
            
            if (!emailInput.value.trim()) {
                showFormError(emailInput, 'Email kiriting');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                showFormError(emailInput, 'To\'g\'ri email kiriting');
                isValid = false;
            } else {
                clearFormError(emailInput);
            }
            
            if (!messageInput.value.trim()) {
                showFormError(messageInput, 'Xabar kiriting');
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                showFormError(messageInput, 'Xabar kamida 10 belgi');
                isValid = false;
            } else {
                clearFormError(messageInput);
            }
            
            if (isValid) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Yuborilmoqda...';
                
                try {
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message show';
                    successMessage.innerHTML = `
                        <div class="success-icon">✅</div>
                        <h3>Xabaringiz yuborildi!</h3>
                        <p>Tez orada siz bilan bog'lanamiz.</p>
                    `;
                    this.appendChild(successMessage);
                    this.reset();
                    showToast('Muvaffaqiyat', 'Xabaringiz muvaffaqiyatli yuborildi!', 'success');
                    
                    setTimeout(() => {
                        successMessage.classList.add('fade-out');
                        setTimeout(() => successMessage.remove(), 300);
                    }, 5000);
                } catch (error) {
                    showToast('Xatolik', 'Xatolik yuz berdi. Qayta urinib ko\'ring.', 'error');
                } finally {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
            }
        });
    }
    
    const showFormError = (input, message) => {
        input.classList.add('error');
        input.classList.remove('success');
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) existingError.remove();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message show';
        errorDiv.textContent = message;
        input.parentElement.appendChild(errorDiv);
    };
    
    const clearFormError = (input) => {
        input.classList.remove('error');
        input.classList.add('success');
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) existingError.remove();
        setTimeout(() => input.classList.remove('success'), 2000);
    };

    // ============ AI WIDGET ============
    const aiToggle = document.querySelector('.ai-toggle');
    const aiChat = document.querySelector('.ai-chat');
    const aiClose = document.querySelector('.ai-close');
    const aiSend = document.querySelector('.ai-send');
    const aiInput = document.querySelector('.ai-input-field');
    const aiMessages = document.querySelector('.ai-messages');

    if (aiToggle && aiChat) {
        aiToggle.addEventListener('click', () => {
            aiChat.classList.toggle('active');
        });

        if (aiClose) {
            aiClose.addEventListener('click', () => {
                aiChat.classList.remove('active');
            });
        }

        const sendAIMessage = () => {
            const message = aiInput.value.trim();
            if (!message) return;

            const userMsg = document.createElement('div');
            userMsg.className = 'ai-message';
            userMsg.style.background = 'rgba(255, 165, 0, 0.2)';
            userMsg.textContent = message;
            aiMessages.appendChild(userMsg);

            setTimeout(() => {
                const botMsg = document.createElement('div');
                botMsg.className = 'ai-message bot';
                botMsg.textContent = getAIResponse(message);
                aiMessages.appendChild(botMsg);
                aiMessages.scrollTop = aiMessages.scrollHeight;
            }, 500 + Math.random() * 1000);

            aiInput.value = '';
            aiMessages.scrollTop = aiMessages.scrollHeight;
        };

        if (aiSend) aiSend.addEventListener('click', sendAIMessage);
        if (aiInput) {
            aiInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendAIMessage();
            });
        }
    }

    function getAIResponse(message) {
        const responses = {
            'salom': 'Salom! 👋 Sizga qanday yordam bera olaman?',
            'loyiha': 'Azizbekning loyihalarini "Loyihalarim" bo\'limida ko\'rishingiz mumkin.',
            'narx': 'Narxlar loyihaga qarab belgilanadi. "Aloqa" bo\'limi orqali so\'rov yuboring.',
            'aloqa': 'Azizbek bilan "Aloqa" sahifasi yoki Telegram orqali bog\'lanishingiz mumkin.',
            'ko\'nikma': 'Azizbek Python, Django, JavaScript, React va boshqa texnologiyalarni biladi.',
            'tajriba': 'Azizbek 2+ yillik tajribaga ega full-stack dasturchi.',
        };
        
        const msgLower = message.toLowerCase();
        for (const [key, response] of Object.entries(responses)) {
            if (msgLower.includes(key)) return response;
        }
        
        return 'Kechirasiz, bu savolga aniq javob topa olmadim. "Aloqa" orqali bevosita bog\'lanishingiz mumkin. 😊';
    }

    // ============ VISITOR COUNTER ============
    const visitorCount = document.getElementById('visitorCount');
    if (visitorCount) {
        // Simulated counter
        const baseCount = 1532;
        const randomAdd = Math.floor(Math.random() * 50);
        const targetCount = baseCount + randomAdd;
        
        const duration = 1000;
        const startTime = performance.now();
        
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(targetCount * progress);
            visitorCount.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                visitorCount.textContent = targetCount.toLocaleString();
            }
        };
        
        requestAnimationFrame(update);
    }

    // ============ LANGUAGE SWITCHER ============
    const langBtns = document.querySelectorAll('.lang-btn');
    
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const lang = btn.getAttribute('data-lang');
            localStorage.setItem('language', lang);
            showToast('Til', `Til o'zgartirildi: ${lang.toUpperCase()}`, 'info');
        });
    });

    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        const activeBtn = document.querySelector(`[data-lang="${savedLang}"]`);
        if (activeBtn) {
            langBtns.forEach(b => b.classList.remove('active'));
            activeBtn.classList.add('active');
        }
    }

    // ============ KEYBOARD SHORTCUTS ============
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (searchInput) searchInput.focus();
        }
        if (e.key === 'Escape' && searchInput && document.activeElement === searchInput) {
            searchInput.blur();
        }
    });

    // ============ ANIMATION ON SCROLL ============
    const animatedElements = document.querySelectorAll('.project-card, .service-card, .stat-box, .certificate-card, .testimonial-card');
    const aosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                aosObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '50px' });
    
    animatedElements.forEach(el => aosObserver.observe(el));

    // ============ INITIAL SETUP ============
    handleNavScroll();
    toggleBackToTop();
    updateScrollProgress();

    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        .search-highlight {
            animation: highlightPulse 0.5s ease-in-out 3;
        }
        @keyframes highlightPulse {
            0%, 100% { background-color: rgba(255, 165, 0, 0); }
            50% { background-color: rgba(255, 165, 0, 0.3); }
        }
        .project-short-text, .project-full-text {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    console.log('🚀 Premium Portfolio Initialized Successfully!');
    console.log('✨ All features ready without loading screen');
});