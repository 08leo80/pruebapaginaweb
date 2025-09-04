# Configuración de Respuestas desde Make hacia el Chat

## 🔄 **Flujo de Comunicación Bidireccional**

```
Cliente → Chat → Make (Procesamiento) → Respuesta → Chat → Cliente
```

## 📋 **Pasos para Configurar Make**

### **Paso 1: Configurar el Escenario en Make**

1. **Crear Nuevo Escenario**
   - Ve a Make.com
   - Crea un nuevo escenario
   - Añade un trigger "Webhook"

2. **Configurar el Webhook de Entrada**
   - URL: `https://hook.us2.make.com/ds2d2wpsk2fcbr5jp1h5ym7opkiwo6bj`
   - Método: POST
   - Content Type: application/json

### **Paso 2: Procesar el Mensaje**

3. **Añadir Módulo de Procesamiento**
   - Añade un módulo "Router" para clasificar mensajes
   - Configura rutas según palabras clave:
     - "cotizar" → Ruta de cotización
     - "auto" → Ruta de seguro de auto
     - "hogar" → Ruta de seguro de hogar
     - "vida" → Ruta de seguro de vida

### **Paso 3: Generar Respuesta**

4. **Crear Respuesta Dinámica**
   - Añade un módulo "Set up a text aggregator"
   - Configura la respuesta según el tipo de consulta
   - Ejemplo de respuesta:
   ```
   ¡Hola! Te ayudo con tu cotización de {{insuranceType}}. 
   ¿Qué {{specificQuestion}}?
   ```

### **Paso 4: Enviar Respuesta de Vuelta**

5. **Método 1: Webhook de Respuesta (Recomendado)**
   - Añade un módulo "HTTP"
   - URL: `https://tu-dominio.vercel.app/api/webhook-response`
   - Método: POST
   - Headers:
     ```
     Content-Type: application/json
     Authorization: Bearer tu-token-secreto
     ```
   - Body:
     ```json
     {
       "success": true,
       "reply": "{{respuesta_generada}}",
       "sessionId": "{{sessionId}}",
       "timestamp": "{{timestamp}}",
       "actions": [
         {
           "type": "notification",
           "message": "Nuevo cliente interesado",
           "level": "info"
         }
       ]
     }
     ```

6. **Método 2: JavaScript Injection**
   - Añade un módulo "Code"
   - Código:
   ```javascript
   const responseData = {
       success: true,
       reply: "{{respuesta_generada}}",
       sessionId: data.sessionId,
       timestamp: new Date().toISOString()
   };
   
   return {
       "javascript": `
           if (window.receiveMakeResponse) {
               window.receiveMakeResponse(${JSON.stringify(responseData)});
           }
       `
   };
   ```

## 🎯 **Ejemplos de Configuración en Make**

### **Ejemplo 1: Respuesta Automática para Cotización**

```
Trigger (Webhook) → Router → 
  ├─ "cotizar" → Set Text → HTTP Response
  ├─ "auto" → Set Text → HTTP Response  
  └─ "hogar" → Set Text → HTTP Response
```

**Configuración del Router:**
- Condición 1: `message` contiene "cotizar"
- Condición 2: `message` contiene "auto"
- Condición 3: `message` contiene "hogar"

**Configuración de Set Text:**
```
Respuesta para "cotizar":
¡Perfecto! Te ayudo con tu cotización. ¿Qué tipo de seguro necesitas? 
Puedes elegir entre: Auto, Hogar, Vida o Empresarial.

Respuesta para "auto":
Para tu seguro de auto, necesito algunos datos: 
¿Qué modelo y año es tu vehículo? ¿Tienes historial de accidentes?

Respuesta para "hogar":
Para tu seguro de hogar, ¿es casa propia o rentada? 
¿Qué valor aproximado tienen tus pertenencias?
```

### **Ejemplo 2: Integración con CRM**

```
Webhook → Router → Process → Google Sheets → Email → HTTP Response
```

**Flujo:**
1. Recibe mensaje del chat
2. Clasifica el tipo de consulta
3. Guarda lead en Google Sheets
4. Envía notificación por email
5. Responde al chat

## 🔧 **Configuración Avanzada**

### **Integración con Google Sheets**

1. **Añadir módulo "Google Sheets"**
2. **Configurar para guardar leads:**
   ```
   Spreadsheet: Leads SegurosPro
   Worksheet: Nuevos Leads
   Campos:
   - Timestamp: {{timestamp}}
   - SessionId: {{sessionId}}
   - Nombre: {{name}}
   - Email: {{email}}
   - Teléfono: {{phone}}
   - Tipo Seguro: {{insuranceType}}
   - Mensaje: {{message}}
   ```

### **Integración con Email**

1. **Añadir módulo "Email"**
2. **Configurar notificación:**
   ```
   To: asesor@segurospro.com
   Subject: Nuevo lead - {{insuranceType}}
   Body: 
   Nuevo cliente interesado en {{insuranceType}}
   
   Datos del cliente:
   - Nombre: {{name}}
   - Email: {{email}}
   - Teléfono: {{phone}}
   - Mensaje: {{message}}
   ```

### **Integración con WhatsApp Business**

1. **Añadir módulo "WhatsApp"**
2. **Configurar mensaje automático:**
   ```
   To: {{phone}}
   Message: ¡Hola {{name}}! Gracias por tu interés en {{insuranceType}}. 
   Un asesor se pondrá en contacto contigo en los próximos minutos.
   ```

## 🚨 **Consideraciones Importantes**

### **Seguridad**
- Usa tokens de autenticación para webhooks
- Valida el sessionId en cada respuesta
- Implementa rate limiting

### **Rendimiento**
- Configura timeouts apropiados
- Usa respuestas automáticas como fallback
- Monitorea el rendimiento del webhook

### **Logging**
- Registra todas las interacciones
- Guarda errores para debugging
- Monitorea el tiempo de respuesta

## 📊 **Monitoreo y Analytics**

### **Métricas a Seguir**
- Tiempo de respuesta promedio
- Tasa de éxito de webhooks
- Número de leads generados
- Tipos de consultas más comunes

### **Alertas Configurar**
- Webhook no responde
- Error en procesamiento
- Nuevo lead de alto valor
- Tiempo de respuesta > 5 segundos

## 🔄 **Testing y Debugging**

### **Probar el Flujo Completo**
1. Envía mensaje desde el chat
2. Verifica que llegue a Make
3. Confirma que se procese correctamente
4. Verifica que la respuesta llegue al chat
5. Confirma que se muestre correctamente

### **Herramientas de Debug**
- Console logs en el navegador
- Make execution history
- Webhook testing tools
- Network tab en DevTools

## 📞 **Soporte**

Si necesitas ayuda con la configuración:
1. Revisa los logs de Make
2. Verifica la configuración del webhook
3. Prueba con mensajes simples primero
4. Contacta soporte técnico si persisten los problemas 