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

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            menuToggle.textContent = isActive ? '☰' : '✕';
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isActive ? '' : 'hidden';
        });

        // Close menu when clicking on overlay
        menuOverlay.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            menuToggle.textContent = '☰';
            document.body.style.overflow = '';
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                menuToggle.textContent = '☰';
                document.body.style.overflow = '';
            });
        });
    }
    
    // Smooth scroll for navigation links
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
    });    // Parallax effect for hero section
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
