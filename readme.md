# E-commerce de Ferretería Industrial 🛠️

## Descripción

Este proyecto es un E-commerce de ferretería industrial desarrollado utilizando tecnologías avanzadas y buenas prácticas de desarrollo. Permite a los usuarios navegar, seleccionar y comprar productos de ferretería de manera eficiente y segura.

## Tecnologías Utilizadas

- **Express Avanzado**
- **Router y Multer**
- **Motores de Plantilla (Handlebars)**
- **MongoDB y Mongoose**
- **Cookies, Sessions & Storages**
- **Autorización y Autenticación (uuid)**
- **Estrategia de Autenticación por Terceros + JWT (con GitHub)**
- **Passport Avanzado**
- **Ruteo Avanzado y Estrategias Avanzadas de Autorización**
- **Dotenv**
- **Controllers**
- **DAO (Data Access Object)**
- **FACTORY**
- **DTO (Data Transfer Object)**
- **Repository**
- **ADMIN CRUD**
- **Mailing**
- **Crear Ticket y Ruta Purchas**
- **Mocking y Manejo de Errores**
- **Implementación de Logger**
- **Documentación de API con Swagger**
- **Testing Unitario y Avanzado**

## Características

### Funcionalidades Principales

1. **Productos**:
   - CRUD completo para productos.
   - Documentación del módulo de productos con Swagger.

2. **Carrito**:
   - CRUD completo para el carrito de compras.
   - Documentación del módulo de carrito con Swagger.

3. **Sesiones**:
   - Manejo de sesiones con autenticación y autorización.
   - Estrategia de autenticación por terceros (GitHub) y JWT.

4. **Tickets y Compras**:
   - Generación de tickets.
   - Ruta de compras para gestionar el proceso de finalización de compra.

5. **Mailing**:
   - Envío de correos electrónicos para notificaciones y confirmaciones.

6. **Mocking y Manejo de Errores**:
   - Implementación de mocking para pruebas.
   - Manejo avanzado de errores.

7. **Logger**:
   - Implementación de logger para registrar eventos y errores.

### Testing

- **Testing Unitario y Avanzado**:
   - Módulos de testing para:
     - Router de productos.
     - Router de carritos.
     - Router de sesiones.
   - Para ejecutar los tests:
     ```bash
     npx mocha -timeout 10000 tests/integrations/supertest.test.js
     ```

### Documentación de la API

- **Swagger**:
   - Documentación del módulo de productos.
   - Documentación del módulo de carrito.
   - No se realiza documentación de sesiones.

### Despliegue

- **Despliegue en Railway.app**:
   - La aplicación está desplegada en Railway.app y puede ser visitada en [este enlace](https://segunda-entrega-integradora-production.up.railway.app).

## Instrucciones de Instalación

Para ejecutar este proyecto localmente, sigue estos pasos:

1. Clona este repositorio.
   ```bash
   git clone https://github.com/nm1davi/Desarrollo-FullStack-Ecommerce.git
2. Navega al directorio del proyecto.
   ```bash
   cd nombre-del-proyecto
3. Instala las dependencias.
   ```bash
   npm install
4. Inicia la aplicación.
   ```bash
   npm run dev

