// Configuración para Respuestas desde Make hacia el Chat
// =====================================================

const MAKE_RESPONSE_CONFIG = {
    // Configuración del endpoint de respuesta
    responseEndpoint: {
        // URL donde Make puede enviar respuestas
        url: 'https://pruebapaginaweb.vercel.app/api/webhook-response',
        
        // Métodos de respuesta disponibles
        methods: {
            // 1. Webhook directo (recomendado)
            webhook: {
                url: 'https://pruebapaginaweb.vercel.app/api/webhook-response',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer segurospro_webhook_token_2024'
                }
            },
            
            // 2. JavaScript injection (alternativa)
            jsInjection: {
                function: 'window.receiveMakeResponse',
                parameters: ['responseData']
            },
            
            // 3. Polling (para casos especiales)
            polling: {
                interval: 5000, // 5 segundos
                endpoint: 'https://pruebapaginaweb.vercel.app/api/check-response'
            }
        }
    },
    
    // Estructura de respuesta esperada desde Make
    expectedResponseFormat: {
        success: true,
        reply: "Respuesta del bot desde Make",
        sessionId: "session_1234567890_abc123",
        timestamp: "2024-01-15T10:30:00.000Z",
        actions: [
            {
                type: "notification",
                message: "Nuevo lead generado",
                level: "success"
            },
            {
                type: "redirect",
                url: "/cotizar-auto"
            },
            {
                type: "open_chat"
            },
            {
                type: "update_status",
                status: "Asesor conectado"
            }
        ],
        metadata: {
            source: "make_automation",
            agent: "bot_001",
            processingTime: 1500
        }
    },
    
    // Configuración de Make para enviar respuestas
    makeConfiguration: {
        // En Make, después de procesar el mensaje, enviar respuesta así:
        responseExample: `
        // En Make, después del módulo de procesamiento:
        
        // 1. Crear módulo "HTTP" para enviar respuesta
        URL: https://pruebapaginaweb.vercel.app/api/webhook-response
        Method: POST
        Headers: 
          Content-Type: application/json
        
        Body:
        {
          "success": true,
          "reply": "¡Hola! Te ayudo con tu cotización de auto. ¿Qué modelo y año es tu vehículo?",
          "sessionId": "{{sessionId}}",
          "timestamp": "{{timestamp}}",
          "actions": [
            {
              "type": "notification",
              "message": "Nuevo cliente interesado en auto",
              "level": "info"
            }
          ]
        }
        `,
        
        // 2. Alternativa usando JavaScript injection
        jsInjectionExample: `
        // En Make, usar módulo "Code" para ejecutar JavaScript:
        
        const responseData = {
            success: true,
            reply: "¡Hola! Te ayudo con tu cotización de auto.",
            sessionId: data.sessionId,
            timestamp: new Date().toISOString()
        };
        
        // Ejecutar función en el navegador del cliente
        return {
            "javascript": `
                if (window.receiveMakeResponse) {
                    window.receiveMakeResponse(${JSON.stringify(responseData)});
                }
            `
        };
        `
    },
    
    // Configuración de seguridad
    security: {
        // Token de autenticación para webhooks
        webhookToken: 'tu-token-secreto-aqui',
        
        // Dominios permitidos para CORS
        allowedOrigins: [
            'https://pruebapaginaweb.vercel.app',
            'https://hook.us2.make.com'
        ],
        
        // Rate limiting
        rateLimit: {
            requestsPerMinute: 60,
            burstLimit: 10
        }
    },
    
    // Configuración de logging
    logging: {
        enabled: true,
        level: 'info', // debug, info, warn, error
        logResponses: true,
        logErrors: true
    }
};

// Función para validar respuesta desde Make
function validateMakeResponse(responseData) {
    const required = ['reply', 'sessionId'];
    const missing = required.filter(field => !responseData[field]);
    
    if (missing.length > 0) {
        console.error('Respuesta de Make inválida. Campos faltantes:', missing);
        return false;
    }
    
    return true;
}

// Función para procesar respuesta desde Make
function processMakeResponse(responseData) {
    if (!validateMakeResponse(responseData)) {
        return false;
    }
    
    // Verificar que la sesión coincida
    if (responseData.sessionId !== chatConfig.sessionId) {
        console.warn('SessionId no coincide:', responseData.sessionId);
        return false;
    }
    
    // Procesar la respuesta
    receiveResponseFromMake(responseData);
    
    // Log de la respuesta
    if (MAKE_RESPONSE_CONFIG.logging.enabled) {
        console.log('Respuesta recibida desde Make:', responseData);
    }
    
    return true;
}

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MAKE_RESPONSE_CONFIG, validateMakeResponse, processMakeResponse };
} 