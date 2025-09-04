// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Variables globales
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const quoteForm = document.querySelector('.quote-form');
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    // Función para manejar el menú móvil
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    }
    
    // Función para cerrar el menú móvil al hacer clic en un enlace
    function closeMobileMenu() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
    
    // Función para manejar el scroll suave
    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Cerrar menú móvil si está abierto
            closeMobileMenu();
        }
    }
    
    // Función para scroll a secciones específicas de tipos de seguros
    function scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Hacer la función global para que funcione con onclick
    window.scrollToSection = scrollToSection;
    
    // Función para manejar el envío del formulario de cotización
    function handleQuoteForm(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const name = e.target.querySelector('input[type="text"]').value;
        const phone = e.target.querySelector('input[type="tel"]').value;
        const insuranceType = e.target.querySelector('select').value;
        
        // Validación básica
        if (!name || !phone || !insuranceType) {
            showNotification('Por favor, completa todos los campos', 'error');
            return;
        }
        
        // Simular envío de formulario
        showNotification('¡Cotización enviada! Te contactaremos pronto.', 'success');
        e.target.reset();
    }
    
    // Función para mostrar notificaciones
    function showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Agregar estilos CSS dinámicamente si no existen
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 1000;
                    max-width: 400px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    animation: slideInRight 0.3s ease-out;
                }
                
                .notification-success {
                    background-color: #10b981;
                    color: white;
                }
                
                .notification-error {
                    background-color: #ef4444;
                    color: white;
                }
                
                .notification-info {
                    background-color: #3b82f6;
                    color: white;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 16px;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: inherit;
                    cursor: pointer;
                    margin-left: auto;
                    opacity: 0.7;
                    transition: opacity 0.2s;
                }
                
                .notification-close:hover {
                    opacity: 1;
                }
                
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
                
                .notification.hiding {
                    animation: slideOutRight 0.3s ease-in forwards;
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Agregar al DOM
        document.body.appendChild(notification);
        
        // Manejar cierre de notificación
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.add('hiding');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto-cerrar después de 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.add('hiding');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }
    
    // Función para manejar los botones CTA
    function handleCTAClick(e) {
        const buttonText = e.target.textContent.trim();
        
        if (buttonText.includes('Cotizar') || buttonText.includes('Calcular')) {
            // Scroll al formulario de cotización
            const quoteForm = document.querySelector('.quote-form');
            if (quoteForm) {
                quoteForm.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (buttonText.includes('Llamar')) {
            // Simular llamada telefónica
            showNotification('Llamando al 800-123-4567...', 'info');
        }
    }
    
    // Función para animar elementos al hacer scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .benefit-item, .testimonial-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    // Función para actualizar estadísticas animadas
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        
        stats.forEach(stat => {
            const target = stat.textContent;
            const isPercentage = target.includes('%');
            const isTime = target.includes('/');
            
            if (!isPercentage && !isTime) {
                const finalValue = parseInt(target.replace('K+', '000').replace('+', ''));
                let currentValue = 0;
                const increment = finalValue / 50;
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        currentValue = finalValue;
                        clearInterval(timer);
                    }
                    
                    if (target.includes('K+')) {
                        stat.textContent = Math.floor(currentValue / 1000) + 'K+';
                    } else {
                        stat.textContent = Math.floor(currentValue) + '+';
                    }
                }, 30);
            }
        });
    }
    
    // Función para manejar el efecto parallax en el hero
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    }
    
    // Función para agregar efecto hover a las tarjetas de servicio
    function addCardHoverEffects() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Función para validar formularios en tiempo real
    function addFormValidation() {
        const inputs = document.querySelectorAll('input, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.type === 'tel') {
                    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                    if (this.value && !phoneRegex.test(this.value.replace(/[\s\-\(\)]/g, ''))) {
                        this.style.borderColor = '#ef4444';
                        showNotification('Por favor, ingresa un número de teléfono válido', 'error');
                    } else {
                        this.style.borderColor = '';
                    }
                }
            });
        });
    }
    
    // Event Listeners
    
    // Menú móvil
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Navegación suave
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Formulario de cotización
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleQuoteForm);
    }
    
    // Botones CTA
    ctaButtons.forEach(button => {
        button.addEventListener('click', handleCTAClick);
    });
    
    // Scroll events
    window.addEventListener('scroll', () => {
        animateOnScroll();
        handleParallax();
    });
    
    // Animación de estadísticas al cargar
    setTimeout(animateStats, 1000);
    
    // Efectos hover en tarjetas
    addCardHoverEffects();
    
    // Validación de formularios
    addFormValidation();
    
    // Función para agregar efecto de escritura al título principal
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Aplicar efecto de escritura al título si existe
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
    
    // Función para agregar contador de visitantes
    function updateVisitorCount() {
        const visitorCount = localStorage.getItem('visitorCount') || 0;
        const newCount = parseInt(visitorCount) + 1;
        localStorage.setItem('visitorCount', newCount);
        
        // Actualizar en la página si existe un elemento para mostrar
        const visitorElement = document.querySelector('.visitor-count');
        if (visitorElement) {
            visitorElement.textContent = newCount.toLocaleString();
        }
    }
    
    // Actualizar contador de visitantes
    updateVisitorCount();
    
    // Función para agregar efecto de partículas en el hero
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(212, 169, 106, 0.3);
                border-radius: 50%;
                pointer-events: none;
                animation: float 6s ease-in-out infinite;
                left: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 6}s;
            `;
            hero.appendChild(particle);
        }
        
        // Agregar estilos CSS para las partículas
        if (!document.querySelector('#particle-styles')) {
            const styles = document.createElement('style');
            styles.id = 'particle-styles';
            styles.textContent = `
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                        opacity: 0;
                    }
                    50% {
                        transform: translateY(-20px) rotate(180deg);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
    }
    
    // Crear partículas
    createParticles();
    
    // Función para agregar efecto de scroll progress
    function addScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--color-accent), var(--color-accent-dark));
            z-index: 1000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
    
    // Agregar barra de progreso de scroll
    addScrollProgress();
    
    // Función para agregar efecto de hover en botones
    function addButtonHoverEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Agregar efectos hover a botones
    addButtonHoverEffects();
    
    // Función para agregar lazy loading a imágenes
    function addLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Agregar lazy loading
    addLazyLoading();
    
    // Función para agregar efecto de carga de página
    function addPageLoadEffect() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <i class="fas fa-shield-alt"></i>
                <span>Cargando SegurosPro...</span>
            </div>
        `;
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--color-sand-50);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;
        
        const loaderStyles = document.createElement('style');
        loaderStyles.textContent = `
            .loader-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 16px;
            }
            
            .loader-content i {
                font-size: 3rem;
                color: var(--color-accent);
                animation: pulse 1.5s ease-in-out infinite;
            }
            
            .loader-content span {
                font-size: 1.125rem;
                color: var(--color-gray-600);
                font-weight: 500;
            }
            
            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.1);
                }
            }
        `;
        
        document.head.appendChild(loaderStyles);
        document.body.appendChild(loader);
        
        // Ocultar loader después de 1 segundo
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    }
    
    // Agregar efecto de carga
    addPageLoadEffect();
    
    console.log('SegurosPro - Landing Page cargada exitosamente! 🛡️');
    
    // ===== CHAT WIDGET FUNCTIONALITY =====
    
    // Configuración del chat
    const chatConfig = {
        webhookUrl: 'https://hook.us2.make.com/ds2d2wpsk2fcbr5jp1h5ym7opkiwo6bj', // Webhook de Make configurado
        sessionId: generateSessionId(),
        isOpen: false,
        messageCount: 0,
        typingTimeout: null,
        // Mostrar solo un mensaje automático de fallback por sesión
        fallbackShown: false,
        // Tiempo máximo de espera de respuesta de Make (3 minutos)
        responseTimeoutMs: 180000
    };
    
    // Elementos del chat
    const chatWidget = document.getElementById('chatWidget');
    const chatToggle = document.getElementById('chatToggle');
    const chatContainer = document.getElementById('chatContainer');
    const chatClose = document.getElementById('chatClose');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatBadge = document.getElementById('chatBadge');
    const chatStatus = document.getElementById('chatStatus');
    const chatQuickActions = document.getElementById('chatQuickActions');
    
    // Generar ID de sesión único
    function generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    // Función para mostrar/ocultar el chat
    function toggleChat() {
        chatConfig.isOpen = !chatConfig.isOpen;
        
        if (chatConfig.isOpen) {
            chatContainer.classList.add('show');
            chatInput.focus();
            hideChatBadge();
        } else {
            chatContainer.classList.remove('show');
        }
    }
    
    // Función para mostrar badge de notificación
    function showChatBadge(count = 1) {
        chatConfig.messageCount += count;
        chatBadge.textContent = chatConfig.messageCount;
        chatBadge.classList.add('show');
    }
    
    // Función para ocultar badge de notificación
    function hideChatBadge() {
        chatConfig.messageCount = 0;
        chatBadge.classList.remove('show');
    }
    
    // Función para agregar mensaje al chat
    function addMessage(content, isUser = false, timestamp = null) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-shield-alt"></i>';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messageText = document.createElement('p');
        messageText.textContent = content;
        
        const messageTime = document.createElement('span');
        messageTime.className = 'message-time';
        messageTime.textContent = timestamp || getCurrentTime();
        
        messageContent.appendChild(messageText);
        messageContent.appendChild(messageTime);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
        
        // Mostrar badge si el chat está cerrado
        if (!chatConfig.isOpen && !isUser) {
            showChatBadge();
        }
    }
    
    // Función para obtener hora actual
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }
    
    // Función para hacer scroll al final del chat
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Función para mostrar indicador de escritura
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator-message';
        typingDiv.id = 'typingIndicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = '<i class="fas fa-shield-alt"></i>';
        
        const typingContent = document.createElement('div');
        typingContent.className = 'typing-indicator';
        typingContent.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(typingContent);
        
        chatMessages.appendChild(typingDiv);
        scrollToBottom();
    }
    
    // Función para ocultar indicador de escritura
    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Función para enviar mensaje al webhook de Make
    async function sendMessageToWebhook(message, userInfo = {}, abortSignal) {
        try {
            const payload = {
                sessionId: chatConfig.sessionId,
                message: message,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                pageUrl: window.location.href,
                ...userInfo
            };
            
            const response = await fetch(chatConfig.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                signal: abortSignal
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
            
        } catch (error) {
            console.error('Error enviando mensaje al webhook:', error);
            return null;
        }
    }
    
    // Función para recibir respuestas desde Make
    function receiveResponseFromMake(responseData) {
        if (responseData && responseData.reply) {
            // Ocultar indicador de escritura si está activo
            hideTypingIndicator();
            
            // Agregar la respuesta del bot
            addMessage(responseData.reply, false);
            
            // Ejecutar acciones adicionales si las hay
            if (responseData.actions) {
                executeActions(responseData.actions);
            }
        }
    }
    
    // Función para ejecutar acciones desde Make
    function executeActions(actions) {
        actions.forEach(action => {
            switch (action.type) {
                case 'notification':
                    showNotification(action.message, action.level || 'info');
                    break;
                case 'redirect':
                    if (action.url) {
                        setTimeout(() => {
                            window.location.href = action.url;
                        }, 2000);
                    }
                    break;
                case 'open_chat':
                    if (!chatConfig.isOpen) {
                        toggleChat();
                    }
                    break;
                case 'update_status':
                    if (action.status && chatStatus) {
                        chatStatus.textContent = action.status;
                    }
                    break;
            }
        });
    }
    
    // Configurar endpoint para recibir respuestas de Make
    // Esta función se puede llamar desde Make usando JavaScript en el navegador
    window.receiveMakeResponse = receiveResponseFromMake;
    
    // Función para hacer polling de respuestas (alternativa)
    function pollForResponses() {
        // Esta función puede hacer polling a un endpoint de Make
        // para verificar si hay nuevas respuestas
        setInterval(async () => {
            try {
                const response = await fetch(`${chatConfig.webhookUrl}/check-response`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        sessionId: chatConfig.sessionId,
                        lastMessageTime: chatConfig.lastMessageTime
                    })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    if (data.newResponse) {
                        receiveResponseFromMake(data);
                    }
                }
            } catch (error) {
                console.log('Polling de respuestas:', error);
            }
        }, 5000); // Verificar cada 5 segundos
    }
    
    // Iniciar polling de respuestas
    // pollForResponses();
    
    // Deshabilitado: las respuestas las dará Make (solo fallback si no responde)
    function handleAutoResponse(message) {
        return null;
    }
    
    // Función para procesar mensaje del usuario
    async function processUserMessage(message) {
        // Agregar mensaje del usuario
        addMessage(message, true);
        
        // Mostrar indicador de escritura mientras esperamos respuesta de Make
        showTypingIndicator();
        
        // Control para resolver una única vez (respuesta o fallback)
        let resolved = false;
        const abortController = new AbortController();
        
        // Temporizador de fallback (3 minutos)
        const fallbackTimer = setTimeout(() => {
            if (resolved) return;
            resolved = true;
            hideTypingIndicator();
            
            // Mostrar solo un mensaje automático en toda la sesión
            if (!chatConfig.fallbackShown) {
                addMessage('En este momento no hay un asesor disponible. Por favor, deja tu nombre, teléfono y correo y te contactaremos a la brevedad.', false);
                chatConfig.fallbackShown = true;
            }
            
            // Cancelar solicitud pendiente
            try { abortController.abort(); } catch (e) { /* ignore */ }
        }, chatConfig.responseTimeoutMs);
        
        try {
            // Enviar al webhook de Make y NO esperar respuesta inmediata
            // Make responderá de forma asíncrona (p. ej., vía webhook al backend o JS injection).
            await sendMessageToWebhook(message, {}, abortController.signal);
            // Dejamos el indicador de escritura activo hasta que llegue la respuesta del bot
            // mediante window.receiveMakeResponse, o hasta que dispare el fallback.
        } catch (error) {
            // Mantener el indicador hasta que se cumpla el fallback
            console.log('Error esperando respuesta de Make:', error);
        }
    }
    
    // Función para manejar acciones rápidas
    function handleQuickAction(action) {
        const actionMessages = {
            'cotizar': 'Hola',
            'info': 'Hola',
            'contacto': 'Hola'
        };
        
        const message = actionMessages[action] || 'Hola';
        chatInput.value = message;
        processUserMessage(message);
    }
    
    // Event Listeners del chat
    
    // Toggle del chat
    chatToggle.addEventListener('click', toggleChat);
    
    // Cerrar chat
    chatClose.addEventListener('click', toggleChat);
    
    // Enviar mensaje con Enter
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim()) {
            const message = this.value.trim();
            this.value = '';
            processUserMessage(message);
        }
    });
    
    // Enviar mensaje con botón
    chatSend.addEventListener('click', function() {
        const message = chatInput.value.trim();
        if (message) {
            chatInput.value = '';
            processUserMessage(message);
        }
    });
    
    // Acciones rápidas
    chatQuickActions.addEventListener('click', function(e) {
        if (e.target.classList.contains('quick-action')) {
            const action = e.target.dataset.action;
            handleQuickAction(action);
        }
    });
    
    // Cerrar chat al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!chatWidget.contains(e.target) && chatConfig.isOpen) {
            toggleChat();
        }
    });
    
    // Mostrar chat automáticamente después de 30 segundos
    setTimeout(() => {
        if (!chatConfig.isOpen) {
            showChatBadge(1);
        }
    }, 30000);
    
    // Función para integrar con formularios existentes (sin mensajes automáticos al chat)
    function integrateWithForms() {
        const quoteForm = document.querySelector('.quote-form');
        if (quoteForm) {
            quoteForm.addEventListener('submit', function(e) {
                // Intencionalmente no se envían mensajes automáticos al chat desde formularios
            });
        }
    }
    
    // Integrar con formularios
    integrateWithForms();
    
    console.log('Chat widget inicializado correctamente! 💬');
}); 