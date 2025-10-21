// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements with animation
    const animatedElements = document.querySelectorAll('.feature-card, .step, .testimonial-card, .security-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Chart animation
    const chartBars = document.querySelectorAll('.bar');
    const chartObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'barGrow 1s ease forwards';
            }
        });
    }, { threshold: 0.5 });
    
    chartBars.forEach(bar => {
        chartObserver.observe(bar);
    });
    
    // Mobile menu toggle (if needed)
    const createMobileMenu = () => {
        const nav = document.querySelector('.nav');
        const navMenu = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 968 && !document.querySelector('.mobile-menu-toggle')) {
            const menuToggle = document.createElement('button');
            menuToggle.classList.add('mobile-menu-toggle');
            menuToggle.innerHTML = '☰';
            menuToggle.style.cssText = `
                background: none;
                border: none;
                font-size: 28px;
                cursor: pointer;
                color: var(--dark);
            `;
            
            menuToggle.addEventListener('click', () => {
                navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '70px';
                navMenu.style.right = '20px';
                navMenu.style.background = 'white';
                navMenu.style.padding = '20px';
                navMenu.style.borderRadius = '10px';
                navMenu.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            });
            
            nav.appendChild(menuToggle);
        }
    };
    
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const phoneElement = document.querySelector('.phone-mockup');
        
        if (phoneElement && scrolled < 800) {
            phoneElement.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // Add typing effect to hero (optional)
    const heroText = document.querySelector('.hero h1');
    if (heroText) {
        const text = heroText.innerHTML;
        heroText.innerHTML = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroText.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        }
        
        // Uncomment to enable typing effect
        // setTimeout(typeWriter, 500);
    }
    
    // WhatsApp chat simulation
    const simulateChat = () => {
        const messages = document.querySelectorAll('.message');
        messages.forEach((msg, index) => {
            msg.style.opacity = '0';
            setTimeout(() => {
                msg.style.opacity = '1';
                msg.style.animation = 'messageSlide 0.3s ease forwards';
            }, index * 800);
        });
    };
    
    const chatObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                simulateChat();
                chatObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    const chatElement = document.querySelector('.whatsapp-chat');
    if (chatElement) {
        chatObserver.observe(chatElement);
    }
});
