Prueba Técnica - Integración Pasarela de Pagos Kushki

Descripción
Este proyecto es una implementación de prueba técnica que demuestra la integración de la pasarela de pagos Kushki en una aplicación Vue.js. La aplicación permite procesar pagos de manera segura utilizando el SDK de Kushki Checkout.

Tecnologías Utilizadas
- Vue.js 3
- Vite
- Tailwind CSS
- Kushki Checkout SDK

Características
- Integración completa con la pasarela de pagos Kushki
- Interfaz de usuario moderna y responsiva
- Manejo seguro de transacciones
- Validación de pagos en tiempo real

Requisitos Previos
- Node.js (versión recomendada: 16.x o superior)
- NPM o Yarn
- Cuenta de Kushki y credenciales de acceso

Instalación

```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Instalar dependencias
npm install

# Configurar variables de entorno
# Crear un archivo .env con las credenciales de Kushki

# Iniciar servidor de desarrollo
npm run dev
```

Estructura del Proyecto
```
frontend/test-kushki/
├── src/               # Código fuente
├── public/           # Archivos estáticos
├── index.html        # Punto de entrada HTML
└── vite.config.js    # Configuración de Vite
```

Notas de Implementación
- La integración utiliza el SDK oficial de Kushki para procesamiento de pagos
- Se implementa manejo de errores y validaciones
- Incluye polyfills necesarios para compatibilidad

Autor
David Leonardo Duarte Duarte

Licencia
Este proyecto es parte de una prueba técnica y está destinado solo para fines de evaluación.
