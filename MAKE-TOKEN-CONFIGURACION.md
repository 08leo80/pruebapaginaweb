# Configuración del Token de Autenticación en Make

## 🔐 **Información del Token**

### **Nombre del Token:**
```
Authorization
```

### **Valor del Token:**
```
Bearer segurospro_webhook_token_2024
```

## ⚙️ **Configuración en Make**

### **Paso 1: Configurar el Módulo HTTP**

En Make, cuando configures el módulo "HTTP" para enviar la respuesta:

1. **URL:** `https://pruebapaginaweb.vercel.app/api/webhook-response`
2. **Method:** POST
3. **Headers:**
   ```
   Content-Type: application/json
   Authorization: Bearer segurospro_webhook_token_2024
   ```

### **Paso 2: Configurar el Body**

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

## 📋 **Pasos Detallados en Make**

### **1. Crear el Escenario:**
1. Ve a [Make.com](https://www.make.com)
2. Crea un nuevo escenario
3. Añade un trigger "Webhook"

### **2. Configurar el Webhook de Entrada:**
```
URL: https://hook.us2.make.com/ds2d2wpsk2fcbr5jp1h5ym7opkiwo6bj
Method: POST
Content Type: application/json
```

### **3. Procesar el Mensaje:**
1. Añadir módulo "Router"
2. Configurar rutas según palabras clave

### **4. Generar Respuesta:**
1. Añadir módulo "Set up a text aggregator"
2. Configurar respuestas según el tipo

### **5. Enviar Respuesta (CON TOKEN):**
1. **Añadir módulo "HTTP"**
2. **Configurar:**
   ```
   URL: https://pruebapaginaweb.vercel.app/api/webhook-response
   Method: POST
   Headers:
     Content-Type: application/json
     Authorization: Bearer segurospro_webhook_token_2024
   
   Body:
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

## 🧪 **Probar con Token**

### **Probar desde Terminal:**
```bash
curl -X POST https://pruebapaginaweb.vercel.app/api/webhook-response \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer segurospro_webhook_token_2024" \
  -d '{
    "success": true,
    "reply": "Respuesta de prueba con token",
    "sessionId": "test_session_123",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "actions": [
      {
        "type": "notification",
        "message": "Prueba exitosa con token",
        "level": "success"
      }
    ]
  }'
```

## ✅ **Resumen de Configuración**

### **En Make necesitas configurar:**

1. **URL:** `https://pruebapaginaweb.vercel.app/api/webhook-response`
2. **Method:** POST
3. **Headers:**
   - `Content-Type: application/json`
   - `Authorization: Bearer segurospro_webhook_token_2024`
4. **Body:** JSON con la respuesta

### **Variables importantes:**
- `{{sessionId}}` - ID de sesión del chat
- `{{timestamp}}` - Timestamp actual
- `{{respuesta_generada}}` - Respuesta que genera Make

## 🚨 **Solución de Problemas**

### **Si recibes error 401 (No autorizado):**
- Verificar que el header `Authorization` esté configurado correctamente
- Verificar que el valor sea exactamente `Bearer segurospro_webhook_token_2024`
- Verificar que no haya espacios extra

### **Si recibes error 400 (Bad Request):**
- Verificar que el Content-Type sea `application/json`
- Verificar que el body sea JSON válido
- Verificar que todos los campos requeridos estén presentes

## 📞 **Soporte**

Si necesitas ayuda:
1. Verificar que el token esté configurado correctamente en Make
2. Probar con curl para verificar que el endpoint funciona
3. Revisar logs en Vercel para ver errores específicos 