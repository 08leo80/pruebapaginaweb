// API Route para recibir respuestas desde Make
// Ubicación: /api/webhook-response.js

export default async function handler(req, res) {
    // Configurar CORS para permitir peticiones desde Make
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Manejar preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Solo permitir POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    try {
        // Obtener datos del body
        const { success, reply, sessionId, timestamp, actions, metadata } = req.body;

        // Validar datos requeridos
        if (!reply || !sessionId) {
            return res.status(400).json({ 
                error: 'Datos requeridos faltantes',
                required: ['reply', 'sessionId']
            });
        }

        // Log de la respuesta recibida
        console.log('Respuesta recibida desde Make:', {
            sessionId,
            reply,
            timestamp,
            actions: actions || [],
            metadata: metadata || {}
        });

        // Aquí puedes procesar la respuesta como necesites
        // Por ejemplo, almacenarla en una base de datos, enviar notificaciones, etc.

        // Respuesta exitosa
        res.status(200).json({
            success: true,
            message: 'Respuesta procesada correctamente',
            receivedAt: new Date().toISOString(),
            sessionId,
            replyLength: reply.length
        });

    } catch (error) {
        console.error('Error procesando respuesta de Make:', error);
        res.status(500).json({
            error: 'Error interno del servidor',
            message: error.message
        });
    }
} 