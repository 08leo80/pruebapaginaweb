// Configuración del Chat Widget para SegurosPro
// Integración con Make (Integromat) Webhooks

const CHAT_CONFIG = {
    // ===== CONFIGURACIÓN DE WEBHOOK =====
    // URL del webhook de Make en uso
    webhookUrl: 'https://hook.us2.make.com/ds2d2wpsk2fcbr5jp1h5ym7opkiwo6bj',
    
    // ===== CONFIGURACIÓN DEL CHAT =====
    autoOpenDelay: 30000, // 30 segundos
    typingDelay: {
        min: 1000, // 1 segundo mínimo
        max: 3000  // 3 segundos máximo
    },
    
    // ===== RESPUESTAS AUTOMÁTICAS =====
    autoResponses: {
        'cotizar': {
            keywords: ['cotizar', 'cotización', 'precio', 'costo'],
            response: '¡Perfecto! Te ayudo con tu cotización. ¿Qué tipo de seguro necesitas? Puedes elegir entre: Auto, Hogar, Vida o Empresarial.'
        },
        'auto': {
            keywords: ['auto', 'carro', 'vehículo', 'coche'],
            response: 'Para tu seguro de auto, necesito algunos datos: ¿Qué modelo y año es tu vehículo? ¿Tienes historial de accidentes?'
        },
        'hogar': {
            keywords: ['hogar', 'casa', 'inmueble', 'vivienda'],
            response: 'Para tu seguro de hogar, ¿es casa propia o rentada? ¿Qué valor aproximado tienen tus pertenencias?'
        },
        'vida': {
            keywords: ['vida', 'familiar', 'familia'],
            response: 'Para tu seguro de vida, ¿qué edad tienes? ¿Tienes dependientes económicos?'
        },
        'contacto': {
            keywords: ['contacto', 'teléfono', 'whatsapp', 'llamar'],
            response: 'Puedes contactarnos al 800-123-4567 o por WhatsApp. También puedes llenar el formulario de cotización en nuestra página.'
        },
        'horarios': {
            keywords: ['horarios', 'disponible', 'cuándo', 'tiempo'],
            response: 'Estamos disponibles 24/7 para atenderte. Nuestro equipo de asesores está listo para ayudarte en cualquier momento.'
        }
    },
    
    // ===== CONFIGURACIÓN DE NOTIFICACIONES =====
    notifications: {
        enabled: true,
        sound: false, // Cambiar a true para activar sonidos
        badge: true
    },
    
    // ===== CONFIGURACIÓN DE ANALÍTICAS =====
    analytics: {
        enabled: true,
        trackEvents: true,
        sessionTimeout: 1800000 // 30 minutos
    }
};

// ===== ESTRUCTURA DE DATOS PARA WEBHOOK =====
// Este es el formato que se envía al webhook de Make

const WEBHOOK_PAYLOAD_EXAMPLE = {
    sessionId: "session_1234567890_abc123",
    message: "Hola, quiero cotizar un seguro de auto",
    timestamp: "2024-01-15T10:30:00.000Z",
    userAgent: "Mozilla/5.0...",
    pageUrl: "https://tudominio.com",
    userInfo: {
        name: "Juan Pérez",
        email: "juan@email.com",
        phone: "555-123-4567",
        insuranceType: "auto"
    },
    metadata: {
        source: "chat_widget",
        pageSection: "hero",
        timeOnPage: 120000
    }
};

// ===== RESPUESTA ESPERADA DEL WEBHOOK =====
// Este es el formato que debe devolver tu webhook de Make

const WEBHOOK_RESPONSE_EXAMPLE = {
    success: true,
    reply: "¡Hola Juan! Te ayudo con tu cotización de auto. ¿Qué modelo y año es tu vehículo?",
    actions: [
        {
            type: "redirect",
            url: "/cotizar-auto"
        },
        {
            type: "notification",
            message: "Nuevo lead generado"
        }
    ],
    metadata: {
        leadScore: 85,
        nextAction: "follow_up_call",
        assignedAgent: "maria@segurospro.com"
    }
};

// ===== INSTRUCCIONES PARA CONFIGURAR MAKE =====

const MAKE_SETUP_INSTRUCTIONS = `
=== CONFIGURACIÓN DE WEBHOOK EN MAKE ===

1. CREAR UN NUEVO ESCENARIO:
   - Ve a Make.com (Integromat)
   - Crea un nuevo escenario
   - Agrega un trigger "Webhook"

2. CONFIGURAR EL WEBHOOK:
   - Copia la URL del webhook
   - Pégala en chatConfig.webhookUrl en script.js
   - Configura el método POST
   - Acepta JSON como formato

3. PROCESAR LOS DATOS:
   - Agrega un módulo "Set up a webhook response"
   - Configura la respuesta JSON
   - Usa la estructura de WEBHOOK_RESPONSE_EXAMPLE

4. INTEGRACIONES SUGERIDAS:
   - Google Sheets (para guardar leads)
   - Email (para notificar al equipo)
   - CRM (HubSpot, Salesforce, etc.)
   - WhatsApp Business API
   - Slack (para notificaciones internas)

5. AUTOMATIZACIONES RECOMENDADAS:
   - Guardar lead en base de datos
   - Enviar email de bienvenida
   - Asignar asesor automáticamente
   - Programar seguimiento
   - Enviar cotización automática

=== EJEMPLO DE ESCENARIO MAKE ===

Trigger: Webhook
↓
Router (por tipo de seguro)
↓
Google Sheets (guardar lead)
↓
Email (notificar al equipo)
↓
Webhook Response (respuesta al chat)
`;

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CHAT_CONFIG,
        WEBHOOK_PAYLOAD_EXAMPLE,
        WEBHOOK_RESPONSE_EXAMPLE,
        MAKE_SETUP_INSTRUCTIONS
    };
} 