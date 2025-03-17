# Sistema de gestión de tickets de asistencia técnica. - Backend

## Descripción
Este es el backend de un sistema de gestión de tickets desarrollado con Node.js y Express, utilizando MongoDB como base de datos. Permite la administración de tickets de soporte, técnicos y clientes.

## Tecnologías Utilizadas
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT) para autenticación
- Express Validator para validación de datos
- CORS para seguridad de peticiones
- Dotenv para manejo de variables de entorno

## Estructura del Proyecto
```
mtdev2312-ticket-practice/
├── README.md
├── package.json
├── .env.example
└── src/
    ├── index.js
    ├── server.js
    ├── config/
    │   └── database.js
    ├── controller/
    │   ├── auth_controller.js
    │   ├── tech_controller.js
    │   └── ticket_controller.js
    ├── helpers/
    │   ├── auth_validator.js
    │   ├── tech_validator.js
    │   └── ticket_validator.js
    ├── middlewares/
    │   ├── jwt.js
    │   └── middleware_validator.js
    ├── models/
    │   ├── clients_model.js
    │   ├── tech_model.js
    │   ├── tickets_model.js
    │   └── users_model.js
    └── routers/
        ├── auth_routes.js
        ├── tech_routes.js
        └── ticket_routes.js
```

## Instalación y Configuración
1. Clonar el repositorio:
   ```sh
   git clone [https://github.com/usuario/mtdev2312-ticket-practice.git](https://github.com/MTDEV2312/Ticket-Practice.git)
   ```
2. Instalar dependencias:
   ```sh
   cd Ticket-Practice
   npm install
   ```
3. Configurar variables de entorno:
   - Copiar el archivo `.env.example` y renombrarlo como `.env`.
   - Completar la variable `MONGODB_URI` con la URL de conexión a la base de datos.

## Uso
### Iniciar el servidor
Ejecutar en modo desarrollo:
```sh
npm run dev
```
Ejecutar en modo producción:
```sh
npm start
```

## Endpoints Principales
### Autenticación
- `POST /api/login`: Iniciar sesión y obtener un token JWT.
- `GET /api/verify-token`: Verificar validez del token JWT.

### Técnicos
- `GET /api/techs`: Obtener todos los técnicos.
- `GET /api/techs/:cedula`: Obtener un técnico por cédula.
- `POST /api/techs`: Registrar un nuevo técnico.
- `PATCH /api/techs/:id`: Actualizar datos de un técnico.
- `DELETE /api/techs/:id`: Eliminar un técnico.

### Tickets
- `POST /api/register-ticket`: Registrar un nuevo ticket.
- `GET /api/tickets`: Obtener todos los tickets.
- `GET /api/tickets/:codigo`: Obtener un ticket por código.
- `PATCH /api/update-tickets/:id`: Actualizar datos de un ticket.
- `DELETE /api/delete-tickets/:id`: Eliminar un ticket.

## Autenticación
Para acceder a los endpoints protegidos, se requiere un token JWT que debe enviarse en la cabecera de la petición:
```sh
Authorization: Bearer <token>
```

## Contribución
Si deseas contribuir, por favor abre un issue o un pull request en el repositorio.

