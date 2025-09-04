# SegurosPro - Página Web con Chat Widget

Una página web moderna para una empresa de seguros con un sistema de chat integrado que utiliza webhooks de Make (Integromat) para la comunicación en tiempo real.

## 🚀 Características

### Página Web
- **Diseño Responsive**: Se adapta a todos los dispositivos
- **Interfaz Moderna**: Diseño limpio y profesional con paleta de colores arena
- **Secciones Completas**: Hero, Servicios, Beneficios, Tipos de Seguros
- **Formularios Interactivos**: Cotización rápida integrada
- **Animaciones Suaves**: Efectos visuales atractivos
- **SEO Optimizado**: Estructura semántica correcta

### Chat Widget
- **Interfaz Moderna**: Chat flotante con diseño profesional
- **Integración con Make**: Webhooks para comunicación en tiempo real
- **Respuestas Automáticas**: Sistema inteligente de respuestas
- **Acciones Rápidas**: Botones para acciones comunes
- **Notificaciones**: Badge de notificación cuando hay mensajes
- **Indicador de Escritura**: Muestra cuando el bot está "escribiendo"
- **Responsive**: Se adapta a móviles y tablets

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS
- **JavaScript ES6+**: Funcionalidad interactiva
- **Font Awesome**: Iconografía
- **Google Fonts**: Tipografía Inter
- **Make (Integromat)**: Automatización y webhooks

## 📁 Estructura del Proyecto

```
PAGINA WEB/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript principal
├── chat-config.js      # Configuración del chat
└── README.md           # Documentación
```

## 🚀 Instalación y Configuración

### 1. Clonar o Descargar
```bash
git clone [tu-repositorio]
cd PAGINA-WEB
```

### 2. Configurar el Chat Widget

#### Paso 1: Crear Webhook en Make
1. Ve a [Make.com](https://www.make.com)
2. Crea un nuevo escenario
3. Agrega un trigger "Webhook"
4. Copia la URL del webhook

#### Paso 2: Configurar en el Código
1. Abre `script.js`
2. Busca la línea: `webhookUrl: 'TU_WEBHOOK_URL_DE_MAKE_AQUI'`
3. Reemplaza con tu URL de webhook (usar: `https://hook.us2.make.com/ds2d2wpsk2fcbr5jp1h5ym7opkiwo6bj`)

```javascript
const chatConfig = {
    webhookUrl: 'https://hook.us2.make.com/ds2d2wpsk2fcbr5jp1h5ym7opkiwo6bj',
    // ... resto de configuración
};
```

#### Paso 3: Configurar Make (Integromat)
1. **Trigger**: Webhook
2. **Procesamiento**: Router para diferentes tipos de mensajes
3. **Almacenamiento**: Google Sheets para guardar leads
4. **Notificaciones**: Email/Slack para el equipo
5. **Respuesta**: Webhook Response para contestar al chat

### 3. Personalizar el Chat

#### Cambiar Colores
Edita las variables CSS en `styles.css`:
```css
:root {
    --color-accent: #d4a96a;
    --color-accent-dark: #c08d4f;
    /* ... más colores */
}
```

#### Modificar Respuestas Automáticas
Edita `script.js` en la función `handleAutoResponse`:
```javascript
const autoResponses = {
    'cotizar': 'Tu respuesta personalizada aquí',
    // ... más respuestas
};
```

## 🔧 Configuración Avanzada

### Integración con CRM
El chat puede integrarse con:
- **HubSpot**: Para gestión de leads
- **Salesforce**: Para CRM empresarial
- **Google Sheets**: Para almacenamiento simple
- **WhatsApp Business**: Para comunicación directa

### Automatizaciones Recomendadas
1. **Guardar Lead**: Automáticamente en base de datos
2. **Email de Bienvenida**: Enviar información de contacto
3. **Asignar Asesor**: Distribuir leads entre el equipo
4. **Seguimiento**: Programar recordatorios
5. **Cotización Automática**: Generar cotizaciones básicas

### Personalización del Diseño
- **Logo**: Reemplaza el icono de escudo
- **Colores**: Modifica la paleta de colores
- **Tipografía**: Cambia la fuente principal
- **Animaciones**: Ajusta los efectos visuales

## 📱 Características del Chat

### Funcionalidades
- ✅ Chat flotante responsive
- ✅ Integración con webhooks de Make
- ✅ Respuestas automáticas inteligentes
- ✅ Indicador de escritura
- ✅ Notificaciones con badge
- ✅ Acciones rápidas
- ✅ Historial de conversación
- ✅ Cierre automático al hacer clic fuera

### Respuestas Automáticas
El chat responde automáticamente a:
- **Cotizaciones**: Información sobre tipos de seguros
- **Precios**: Información sobre tarifas
- **Contacto**: Datos de contacto del equipo
- **Horarios**: Disponibilidad 24/7
- **Coberturas**: Detalles de cada tipo de seguro

## 🎨 Personalización

### Cambiar Colores del Chat
```css
.chat-toggle {
    background: linear-gradient(135deg, #tu-color, #tu-color-oscuro);
}

.chat-header {
    background: linear-gradient(135deg, #tu-color, #tu-color-oscuro);
}
```

### Modificar Mensajes
```javascript
// En script.js
const autoResponses = {
    'cotizar': 'Tu mensaje personalizado aquí',
    'contacto': 'Tus datos de contacto aquí'
};
```

### Agregar Nuevas Acciones Rápidas
```html
<!-- En index.html -->
<button class="quick-action" data-action="tu-accion">Tu Acción</button>
```

## 🔒 Seguridad

- **HTTPS**: Asegúrate de usar HTTPS en producción
- **Validación**: Todos los inputs están validados
- **Sanitización**: Los mensajes se sanitizan antes de enviar
- **Rate Limiting**: Implementado en el webhook

## 📊 Analytics

El chat incluye tracking de:
- Mensajes enviados/recibidos
- Tiempo de conversación
- Tipos de consultas más comunes
- Conversiones (cotizaciones solicitadas)
- Fuente de tráfico

## 🚀 Despliegue

### Opciones de Hosting
- **Netlify**: Despliegue gratuito y fácil
- **Vercel**: Optimizado para sitios estáticos
- **GitHub Pages**: Hosting gratuito
- **AWS S3**: Escalable y confiable

### Configuración de Dominio
1. Sube los archivos a tu servidor
2. Configura tu dominio
3. Asegúrate de que el webhook de Make esté activo
4. Prueba el chat en producción

## 🐛 Solución de Problemas

### Chat no aparece
- Verifica que `script.js` esté cargado
- Revisa la consola del navegador para errores
- Asegúrate de que Font Awesome esté cargado

### Webhook no responde
- Verifica la URL del webhook en `script.js`
- Confirma que el escenario de Make esté activo
- Revisa los logs de Make para errores

### Estilos no se aplican
- Verifica que `styles.css` esté enlazado
- Limpia la caché del navegador
- Revisa que las rutas de archivos sean correctas

## 📞 Soporte

Para soporte técnico o personalizaciones:
- **Email**: soporte@segurospro.com
- **WhatsApp**: +52 800-123-4567
- **Documentación**: [Enlace a documentación]

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Desarrollado con ❤️ para SegurosPro** 