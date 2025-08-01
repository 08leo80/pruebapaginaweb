// API Route para verificar respuestas desde Make
// Ubicación: /api/check-response.js

// Almacenamiento temporal de respuestas (en producción usar base de datos)
const responseStore = new Map();

export default async function handler(req, res) {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
        // Endpoint para almacenar respuestas temporalmente
        try {
            const { sessionId, reply, timestamp, actions } = req.body;

            if (!sessionId || !reply) {
                return res.status(400).json({ error: 'Datos requeridos faltantes' });
            }

            // Almacenar respuesta temporalmente
            responseStore.set(sessionId, {
                reply,
                timestamp,
                actions: actions || [],
                storedAt: new Date().toISOString()
            });

            res.status(200).json({
                success: true,
                message: 'Respuesta almacenada',
                sessionId
            });

        } catch (error) {
            console.error('Error almacenando respuesta:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else if (req.method === 'GET') {
        // Endpoint para verificar respuestas
        try {
            const { sessionId } = req.query;

            if (!sessionId) {
                return res.status(400).json({ error: 'SessionId requerido' });
            }

            const response = responseStore.get(sessionId);

            if (response) {
                // Eliminar respuesta después de enviarla
                responseStore.delete(sessionId);

                res.status(200).json({
                    success: true,
                    newResponse: true,
                    data: response
                });
            } else {
                res.status(200).json({
                    success: true,
                    newResponse: false
                });
            }

        } catch (error) {
            console.error('Error verificando respuesta:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
} 