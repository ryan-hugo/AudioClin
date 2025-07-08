// Smooth scrolling para links internos
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para links de navegação
    const links = document.querySelectorAll('a[href^="#"]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Referência ao menu mobile
            const navMenu = document.querySelector('.nav-menu');
            
            if (targetSection) {
                // Verificar se o menu mobile está aberto
                const menuIsOpen = navMenu && navMenu.classList.contains('active');
                
                if (menuIsOpen) {
                    // Primeiro fechar o menu mobile
                    document.querySelector('.menu-toggle').classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    
                    // Dar um pequeno delay para que o menu se feche antes de rolar
                    setTimeout(() => {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 150);
                } else {
                    // Se o menu não estiver aberto, simplesmente rolar para a seção
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Animação de entrada para elementos quando entram na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.service-card, .differential-item, .contact-item, .stat');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Efeito de hover nos cards de serviço
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Navbar scroll effect
    // Removido o efeito de cor ao rolar a página

    // Contador animado para estatísticas
    const stats = document.querySelectorAll('.stat h3');
    
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target === 100) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 20);
    };

    // Observer para iniciar animação dos contadores
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                if (text.includes('20')) {
                    animateCounter(entry.target, 20);
                } else if (text.includes('100')) {
                    animateCounter(entry.target, 100);
                } else if (text.includes('3')) {
                    animateCounter(entry.target, 3);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Botão de WhatsApp flutuante (opcional)
    const createFloatingWhatsApp = () => {
        const whatsappBtn = document.createElement('a');
        whatsappBtn.href = 'https://wa.me/556932237924';
        whatsappBtn.target = '_blank';
        whatsappBtn.className = 'floating-whatsapp';
        whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
        
        // Estilos inline para o botão flutuante
        whatsappBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: #25d366;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            text-decoration: none;
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        whatsappBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.6)';
        });
        
        whatsappBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.4)';
        });
        
        document.body.appendChild(whatsappBtn);
    };

    // Criar botão flutuante do WhatsApp
    createFloatingWhatsApp();

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // MENU HAMBURGER FUNCIONALIDADE
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    function toggleMenu() {
        // Verificar se os elementos existem antes de manipulá-los
        if (!menuToggle || !navMenu) return;
        
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Mudança do ícone do menu com animação suave
        const icon = menuToggle.querySelector('i');
        if (icon) {
            if (navMenu.classList.contains('active')) {
                icon.style.transform = 'rotate(90deg)';
                setTimeout(() => {
                    icon.className = 'fas fa-times';
                    icon.style.transform = 'rotate(0deg)';
                }, 150);
            } else {
                icon.style.transform = 'rotate(90deg)';
                setTimeout(() => {
                    icon.className = 'fas fa-bars';
                    icon.style.transform = 'rotate(0deg)';
                }, 150);
            }
        }
    }
    
    // Evento de clique no botão do menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Impede a propagação do evento
            toggleMenu();
        });
    }
    
    // Adicionamos tratamento específico para links de navegação móvel
    const mobileNavLinks = document.querySelectorAll('.nav-menu ul li a[href^="#"]');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Certifique-se de que fechamos o menu quando um link é clicado
            if (window.innerWidth <= 900 && navMenu && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Fechar menu ao redimensionar janela (para evitar problemas de layout)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900 && navMenu && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Fechar menu ao clicar fora dele
    document.addEventListener('click', (e) => {
        // Verificamos se o menu está ativo e se o clique não foi no menu nem no botão de toggle
        if (navMenu && navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });

    // EFEITOS AVANÇADOS PARA NAVBAR
    const navbar = document.querySelector('.navbar');
    
    // Destaca o link ativo baseado na seção atual
    function highlightActiveLink() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Certifique-se de que navLinks está definido
        const allNavLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    // Efeito de parallax suave na navbar (removido para melhor performance)
    window.addEventListener('scroll', () => {
        highlightActiveLink();
    });
    
    // Efeito de ondulação nos links da navbar
    const menuLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Adiciona keyframes para o efeito ripple
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

