# Configuración Final de Make con tu Webhook

## 🎯 **URLs de tu Webhook**

Tu página está desplegada en: **https://pruebapaginaweb.vercel.app**

### **Webhooks Disponibles:**

1. **Webhook Principal:** `https://pruebapaginaweb.vercel.app/api/webhook-response`
2. **Webhook de Verificación:** `https://pruebapaginaweb.vercel.app/api/check-response`

## ⚙️ **Configuración en Make**

### **Paso 1: Configurar el Escenario en Make**

1. Ve a [Make.com](https://www.make.com)
2. Crea un nuevo escenario
3. Añade un trigger "Webhook"
4. Configura el webhook de entrada:
   ```
   URL: https://hook.us2.make.com/ds2d2wpsk2fcbr5jp1h5ym7opkiwo6bj
   Method: POST
   Content Type: application/json
   ```

### **Paso 2: Procesar el Mensaje**

1. **Añadir módulo "Router"**
2. **Configurar rutas según palabras clave:**
   - "cotizar" → Ruta de cotización
   - "auto" → Ruta de seguro de auto
   - "hogar" → Ruta de seguro de hogar
   - "vida" → Ruta de seguro de vida

### **Paso 3: Generar Respuesta**

1. **Añadir módulo "Set up a text aggregator"**
2. **Configurar respuestas según el tipo:**

**Para "cotizar":**
```
¡Perfecto! Te ayudo con tu cotización. ¿Qué tipo de seguro necesitas? 
Puedes elegir entre: Auto, Hogar, Vida o Empresarial.
```

**Para "auto":**
```
Para tu seguro de auto, necesito algunos datos: 
¿Qué modelo y año es tu vehículo? ¿Tienes historial de accidentes?
```

**Para "hogar":**
```
Para tu seguro de hogar, ¿es casa propia o rentada? 
¿Qué valor aproximado tienen tus pertenencias?
```

### **Paso 4: Enviar Respuesta al Chat**

1. **Añadir módulo "HTTP"**
2. **Configurar:**
   ```
   URL: https://pruebapaginaweb.vercel.app/api/webhook-response
   Method: POST
   Headers:
     Content-Type: application/json
   
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

## 🧪 **Probar la Conexión**

### **Probar el Webhook Principal:**

```bash
curl -X POST https://pruebapaginaweb.vercel.app/api/webhook-response \
  -H "Content-Type: application/json" \
  -d '{
    "success": true,
    "reply": "Respuesta de prueba desde Make",
    "sessionId": "test_session_123",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "actions": [
      {
        "type": "notification",
        "message": "Prueba exitosa",
        "level": "success"
      }
    ]
  }'
```

### **Probar el Webhook de Verificación:**

```bash
# Almacenar respuesta
curl -X POST https://pruebapaginaweb.vercel.app/api/check-response \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test_session_123",
    "reply": "Respuesta almacenada",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }'

# Verificar respuesta
curl "https://pruebapaginaweb.vercel.app/api/check-response?sessionId=test_session_123"
```

## 🔄 **Flujo Completo**

```
1. Cliente escribe en chat → https://pruebapaginaweb.vercel.app
2. Chat envía a Make → https://hook.us2.make.com/ds2d2wpsk2fcbr5jp1h5ym7opkiwo6bj
3. Make procesa el mensaje
4. Make genera respuesta
5. Make envía respuesta de vuelta → https://pruebapaginaweb.vercel.app/api/webhook-response
6. Chat recibe y muestra la respuesta
```

## 📊 **Monitoreo**

### **Ver Logs en Vercel:**
1. Ve a tu dashboard de Vercel
2. Selecciona tu proyecto "pruebapaginaweb"
3. Ve a "Functions" → "api/webhook-response"
4. Revisa los logs de ejecución

### **Ver Logs en Make:**
1. Ve a tu escenario en Make
2. Haz clic en "Execution history"
3. Revisa las ejecuciones recientes

## 🚨 **Solución de Problemas**

### **Si el webhook no responde:**
1. Verificar que la URL sea correcta
2. Verificar que el método sea POST
3. Verificar que el Content-Type sea application/json
4. Revisar logs en Vercel

### **Si hay error CORS:**
- Los headers ya están configurados correctamente
- Verificar que el origen de Make esté permitido

### **Si hay error 500:**
1. Revisar logs en Vercel
2. Verificar que los datos enviados sean correctos
3. Verificar que el código JavaScript sea válido

## ✅ **Estado Actual**

- ✅ **Página desplegada:** https://pruebapaginaweb.vercel.app
- ✅ **Webhooks configurados:** api/webhook-response.js y api/check-response.js
- ✅ **Chat funcional:** Con webhook de Make configurado
- ⚙️ **Pendiente:** Configurar Make con las URLs de respuesta

## 🎯 **Próximos Pasos**

1. **Configurar Make** siguiendo las instrucciones arriba
2. **Probar la conexión** enviando un mensaje desde el chat
3. **Verificar logs** en Vercel y Make
4. **Optimizar respuestas** según las necesidades

¿Necesitas ayuda con algún paso específico de la configuración en Make? 