# Configuración de Make (Integromat) para Chat Widget

## 📋 Pasos para Configurar Make

### Paso 1: Crear Cuenta en Make
1. Ve a [Make.com](https://www.make.com)
2. Crea una cuenta gratuita
3. Accede al dashboard

### Paso 2: Crear Nuevo Escenario
1. Haz clic en "Create a new scenario"
2. Busca "Webhook" en los triggers
3. Selecciona "Webhook" como trigger

### Paso 3: Configurar el Webhook
1. **Configuración Básica:**
   - Nombre: "SegurosPro Chat Webhook"
   - Método: POST
   - Content Type: application/json

2. **Configuración Avanzada:**
   - Headers: Dejar por defecto
   - Response: JSON
   - Timeout: 30 segundos

3. **Copiar URL del Webhook:**
   - Haz clic en "Save"
   - Copia la URL del webhook
   - Pégala en `script.js` en la línea `webhookUrl` (usar: https://hook.us2.make.com/ds2d2wpsk2fcbr5jp1h5ym7opkiwo6bj)

### Paso 4: Configurar Procesamiento de Datos

#### 4.1 Agregar Router
1. Haz clic en el "+" después del webhook
2. Busca "Router"
3. Configura las rutas:

```
Ruta 1: Cotización
- Condición: message contains "cotizar"
- Acción: Procesar solicitud de cotización

Ruta 2: Contacto
- Condición: message contains "contacto"
- Acción: Proporcionar información de contacto

Ruta 3: Precios
- Condición: message contains "precio"
- Acción: Información sobre tarifas

Ruta 4: Default
- Condición: Default
- Acción: Respuesta general
```

#### 4.2 Configurar Google Sheets (Opcional)
1. Agrega módulo "Google Sheets"
2. Conecta tu cuenta de Google
3. Configura:
   - Spreadsheet: "SegurosPro_Leads"
   - Worksheet: "Chat_Leads"
   - Action: "Add a row"

#### 4.3 Configurar Email (Opcional)
1. Agrega módulo "Email"
2. Configura:
   - To: equipo@segurospro.com
   - Subject: "Nuevo lead del chat"
   - Body: Template personalizado

### Paso 5: Configurar Respuesta
1. Agrega módulo "Set up a webhook response"
2. Configura la respuesta JSON:

```json
{
  "success": true,
  "reply": "{{reply_message}}",
  "actions": [
    {
      "type": "notification",
      "message": "Lead procesado"
    }
  ]
}
```

### Paso 6: Activar el Escenario
1. Haz clic en "Save"
2. Activa el escenario
3. Prueba el webhook

## 🔧 Configuración Avanzada

### Integración con CRM

#### HubSpot
1. Agrega módulo "HubSpot"
2. Conecta tu cuenta
3. Configura:
   - Object: Contact
   - Action: Create
   - Properties: Mapea los campos

#### Salesforce
1. Agrega módulo "Salesforce"
2. Conecta tu cuenta
3. Configura:
   - Object: Lead
   - Action: Create
   - Fields: Mapea los campos

### Automatizaciones Avanzadas

#### Asignación Automática de Asesores
```javascript
// Lógica de asignación
if (insuranceType === "auto") {
    assignedAgent = "maria@segurospro.com";
} else if (insuranceType === "hogar") {
    assignedAgent = "juan@segurospro.com";
} else {
    assignedAgent = "equipo@segurospro.com";
}
```

#### Scoring de Leads
```javascript
// Cálculo de score
let leadScore = 0;
if (message.includes("cotizar")) leadScore += 30;
if (message.includes("precio")) leadScore += 20;
if (userInfo.email) leadScore += 25;
if (userInfo.phone) leadScore += 25;
```

## 📊 Monitoreo y Analytics

### Métricas a Seguir
- **Tasa de respuesta**: % de mensajes respondidos
- **Tiempo de respuesta**: Promedio en segundos
- **Conversiones**: Cotizaciones solicitadas
- **Satisfacción**: Feedback de usuarios

### Logs y Debugging
1. Ve a "Logs" en Make
2. Revisa los errores
3. Ajusta la configuración según sea necesario

## 🚨 Solución de Problemas

### Webhook no responde
1. Verifica que el escenario esté activo
2. Revisa los logs de Make
3. Confirma la URL del webhook
4. Prueba con Postman

### Error de CORS
1. Asegúrate de usar HTTPS
2. Configura headers correctos
3. Verifica el dominio

### Respuestas lentas
1. Optimiza el escenario
2. Reduce el número de módulos
3. Usa respuestas en caché

## 📱 Pruebas

### Probar el Chat
1. Abre la página web
2. Haz clic en el chat
3. Envía un mensaje de prueba
4. Verifica la respuesta

### Probar el Webhook
```bash
curl -X POST https://hook.us2.make.com/ds2d2wpsk2fcbr5jp1h5ym7opkiwo6bj \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test_session",
    "message": "Hola, quiero cotizar",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }'
```

## 🔄 Actualizaciones

### Mantener Actualizado
1. Revisa regularmente los logs
2. Actualiza las respuestas automáticas
3. Optimiza el rendimiento
4. Agrega nuevas integraciones según sea necesario

## 📞 Soporte

### Recursos Útiles
- [Documentación de Make](https://www.make.com/en/help)
- [Comunidad de Make](https://community.make.com)
- [API Reference](https://www.make.com/en/help/apps)

### Contacto
- **Email**: soporte@segurospro.com
- **WhatsApp**: +52 800-123-4567

---

**¡Listo para usar! 🚀** 