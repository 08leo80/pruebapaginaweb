# Configuración de Webhooks de Respuesta en Vercel

## 🚀 **Pasos para Configurar Vercel**

### **Paso 1: Subir el Proyecto a Vercel**

1. **Crear cuenta en Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Crea una cuenta gratuita
   - Conecta tu repositorio de GitHub

2. **Subir el proyecto**
   - Vercel detectará automáticamente que es un sitio estático
   - Los archivos de API se configurarán automáticamente

### **Paso 2: Verificar la Estructura de Archivos**

Tu proyecto debe tener esta estructura:
```
tu-proyecto/
├── index.html
├── styles.css
├── script.js
├── vercel.json
├── api/
│   ├── webhook-response.js
│   └── check-response.js
└── otros archivos...
```

### **Paso 3: Obtener la URL de tu Dominio**

Una vez desplegado, tu sitio tendrá una URL como:
- `https://tu-proyecto.vercel.app`
- `https://tu-proyecto-git-main-tu-usuario.vercel.app`

## 🔗 **URLs de los Webhooks**

### **Webhook Principal de Respuesta:**
```
https://pruebapaginaweb.vercel.app/api/webhook-response
```

### **Webhook de Verificación (Polling):**
```
https://pruebapaginaweb.vercel.app/api/check-response
```

## ⚙️ **Configuración en Make**

### **Método 1: Webhook Directo (Recomendado)**

En Make, después de procesar el mensaje:

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
      "reply": "¡Hola! Te ayudo con tu cotización de auto.",
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

### **Método 2: Almacenamiento Temporal**

En Make, usar el endpoint de almacenamiento:

1. **Añadir módulo "HTTP"**
2. **Configurar:**
   ```
       URL: https://pruebapaginaweb.vercel.app/api/check-response
    Method: POST
    Headers:
      Content-Type: application/json
    
    Body:
    {
      "sessionId": "{{sessionId}}",
      "reply": "¡Hola! Te ayudo con tu cotización.",
      "timestamp": "{{timestamp}}",
      "actions": []
    }
   ```

## 🧪 **Probar los Webhooks**

### **Probar el Webhook Principal:**

```bash
curl -X POST https://tu-dominio.vercel.app/api/webhook-response \
  -H "Content-Type: application/json" \
  -d '{
    "success": true,
    "reply": "Respuesta de prueba",
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
curl -X POST https://tu-dominio.vercel.app/api/check-response \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test_session_123",
    "reply": "Respuesta almacenada",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }'

# Verificar respuesta
curl "https://tu-dominio.vercel.app/api/check-response?sessionId=test_session_123"
```

## 📊 **Monitoreo y Logs**

### **Ver Logs en Vercel:**

1. Ve a tu dashboard de Vercel
2. Selecciona tu proyecto
3. Ve a "Functions" → "api/webhook-response"
4. Revisa los logs de ejecución

### **Logs Importantes:**

- **200 OK:** Respuesta procesada correctamente
- **400 Bad Request:** Datos faltantes o inválidos
- **405 Method Not Allowed:** Método HTTP incorrecto
- **500 Internal Server Error:** Error en el servidor

## 🔧 **Configuración Avanzada**

### **Variables de Entorno (Opcional):**

En Vercel, puedes configurar variables de entorno:

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Añadir:
   ```
   WEBHOOK_SECRET=tu-token-secreto
   ALLOWED_ORIGINS=https://hook.us2.make.com
   ```

### **Seguridad Adicional:**

Modificar `api/webhook-response.js` para incluir autenticación:

```javascript
// Verificar token de seguridad
const authHeader = req.headers.authorization;
if (!authHeader || authHeader !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
    return res.status(401).json({ error: 'No autorizado' });
}
```

## 🚨 **Solución de Problemas**

### **Error 404 - Endpoint no encontrado:**
- Verificar que los archivos estén en `/api/`
- Verificar que el nombre del archivo sea correcto
- Revisar la configuración en `vercel.json`

### **Error CORS:**
- Verificar que los headers estén configurados correctamente
- Verificar que el origen de Make esté permitido

### **Error 500 - Error interno:**
- Revisar los logs en Vercel
- Verificar que el código JavaScript sea válido
- Verificar que los datos enviados sean correctos

### **Timeout de función:**
- Aumentar `maxDuration` en `vercel.json`
- Optimizar el código para que sea más rápido

## 📞 **Soporte**

Si necesitas ayuda:

1. **Revisar logs:** Dashboard de Vercel → Functions → Logs
2. **Probar endpoints:** Usar curl o Postman
3. **Verificar configuración:** Revisar `vercel.json`
4. **Contactar soporte:** Vercel tiene excelente documentación

## 🎯 **Próximos Pasos**

Una vez configurado:

1. **Probar con Make:** Enviar una respuesta de prueba
2. **Configurar el chat:** Actualizar la URL en `script.js`
3. **Monitorear:** Revisar logs regularmente
4. **Optimizar:** Ajustar según el rendimiento 