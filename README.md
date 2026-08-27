# ShipNow API

## Temática
API backend para una plataforma de gestión de envíos/delivery. Administra usuarios (clientes, repartidores y administradores), productos, pedidos y entregas, con arquitectura profesional por capas, sistema de mocking para datos de prueba, manejo centralizado de errores, logging profesional con Winston, documentación interactiva con Swagger, y testing funcional automatizado.

## Tecnologías
- Node.js
- Express
- MongoDB / Mongoose
- dotenv
- @faker-js/faker
- winston
- winston-daily-rotate-file
- swagger-jsdoc
- swagger-ui-express
- mocha
- chai
- supertest
- cross-env

## Cómo correr el proyecto localmente
1. Cloná el repositorio
2. Ejecutá `npm install`
3. Copiá `.env.example` como `.env` y completá `PORT`, `MONGODB_URI` y `NODE_ENV`
4. Ejecutá `npm run dev`

Si falta alguna variable obligatoria en el `.env`, la aplicación **no arranca** y muestra un mensaje de error indicando cuál falta. Esto se valida en `src/config/env.config.js` antes de que la app intente conectarse a la base de datos.

## Variables de entorno
- `PORT`: puerto donde corre el servidor
- `MONGODB_URI`: cadena de conexión a MongoDB
- `NODE_ENV`: entorno de ejecución (`development` / `production` / `test`). Controla también el comportamiento del logger y qué archivo `.env` se carga.

## Estructura de carpetas

src/
├── app.js
├── server.js
├── config/
│ ├── env.config.js
│ ├── logger.config.js
│ └── swagger.config.js
├── constants/
│ └── index.js
├── docs/
│ └── schemas.js
├── errors/
│ ├── CustomError.js
│ └── errorDictionary.js
├── models/
│ ├── product.model.js
│ ├── user.model.js
│ ├── order.model.js
│ └── delivery.model.js
├── repositories/
│ ├── product.repository.js
│ ├── user.repository.js
│ ├── order.repository.js
│ └── mock.repository.js
├── services/
│ ├── product.service.js
│ ├── user.service.js
│ ├── order.service.js
│ └── mock.service.js
├── controllers/
│ ├── product.controller.js
│ ├── user.controller.js
│ ├── order.controller.js
│ ├── mock.controller.js
│ └── logger.controller.js
├── routes/
│ ├── product.routes.js
│ ├── user.routes.js
│ ├── order.routes.js
│ ├── mock.routes.js
│ └── logger.routes.js
├── middlewares/
│ ├── errorHandler.middleware.js
│ └── notFound.middleware.js
├── utils/
│ └── mockGenerators.js
└── tests/
├── hooks.js
├── users.test.js
├── orders.test.js
├── mocks.test.js
├── logger.test.js
├── docs.test.js
└── notFound.test.js


## Arquitectura por capas

- **Model**: define únicamente el esquema de Mongoose. No contiene lógica de negocio ni de request/response.
- **Repository**: único lugar que conoce Mongoose/MongoDB. Encapsula el acceso a datos (filtros, proyecciones, agregaciones) — nunca hace un simple `return model.find()` sin criterio.
- **Service**: concentra toda la lógica de negocio (validaciones, cálculos, reglas de estado, relaciones entre entidades). Ante una condición de error, **lanza** (`throw`) un error personalizado — nunca responde HTTP directamente ni importa Mongoose.
- **Controller**: única puerta de entrada HTTP. Extrae datos del request, llama al service dentro de un `try/catch`, y si el service lanza un error, lo delega con `next(error)`. Nunca decide códigos de error ni importa Mongoose.
- **Router**: mínimo, solo conecta cada path con su método del controller correspondiente. La documentación de Swagger vive en comentarios JSDoc encima de cada ruta, sin mezclar configuración con lógica.

### Por qué separar Service de Repository

El Repository responde "¿cómo busco/guardo esto en la base?" — es intercambiable, podría cambiar de motor de base de datos sin tocar el resto de la app. El Service responde "¿qué reglas del negocio aplican acá?" — por ejemplo, que un producto sin stock cambie automáticamente su estado, o que un pedido solo pueda crearse si el usuario indicado existe realmente. Mezclar esa lógica dentro del Repository lo volvería frágil y dependiente del motor de base de datos elegido; separarla permite razonar y testear las reglas de negocio sin necesidad de una base de datos real.

## Constantes del dominio

Definidas en `src/constants/index.js`, como objetos congelados (`Object.freeze`) para evitar strings sueltos escritos a mano en cualquier parte del código:

- `USER_ROLES`: `ADMIN`, `CLIENTE`, `REPARTIDOR`
- `PRODUCT_STATUS`: `AVAILABLE`, `OUT_OF_STOCK`, `DISCONTINUED`
- `ORDER_STATUS`: `PENDING`, `ASSIGNED`, `IN_TRANSIT`, `DELIVERED`, `CANCELLED`
- `ORDER_PRIORITY`: `LOW`, `MEDIUM`, `HIGH`

## Manejo de errores

Todos los errores del proyecto pasan por un middleware global centralizado (`src/middlewares/errorHandler.middleware.js`), montado al final de `app.js`, después de todas las rutas. Ningún controller ni ruta arma respuestas de error por su cuenta.

### Cómo funciona

1. Los **services** detectan condiciones de error de negocio y las lanzan con errores personalizados definidos en `src/errors/`, usando el diccionario `ErrorDictionary`.
2. Los **controllers** capturan la excepción en un `try/catch` y la delegan con `next(error)`.
3. El **middleware global** intercepta cualquier error, lo registra con el logger, y arma la respuesta final HTTP. Si el error no es uno de los personalizados, responde `500` con un mensaje genérico, sin exponer detalles técnicos internos.

### Formato de respuesta de error

```json
{ "status": "error", "code": "PRODUCT_NOT_FOUND", "message": "Producto no encontrado" }
```

### Errores personalizados por dominio

| Código | Status | Descripción |
|---|---|---|
| PRODUCT_NOT_FOUND | 404 | Producto inexistente |
| PRODUCT_INVALID_PRICE | 400 | Precio negativo |
| PRODUCT_INVALID_STOCK | 400 | Stock negativo |
| PRODUCT_MISSING_FIELDS | 400 | Faltan campos obligatorios |
| USER_NOT_FOUND | 404 | Usuario inexistente |
| USER_EMAIL_EXISTS | 409 | Email ya registrado |
| USER_MISSING_FIELDS | 400 | Faltan campos obligatorios |
| ORDER_NOT_FOUND | 404 | Pedido inexistente |
| ORDER_INVALID_STATUS | 400 | Estado de pedido inválido |
| ORDER_MISSING_FIELDS | 400 | Faltan campos obligatorios del pedido |
| DELIVERY_NOT_FOUND | 404 | Entrega inexistente |
| MOCK_INVALID_QTY | 400 | Cantidad no numérica, no entera, o menor/igual a 0 |
| MOCK_QTY_TOO_LARGE | 400 | Cantidad solicitada excede el máximo permitido (100) |
| MOCK_NO_CLIENTS_AVAILABLE | 400 | No hay usuarios `CLIENTE` para asociar pedidos |
| MOCK_NO_RELATED_DATA | 400 | No hay pedidos o repartidores para generar entregas |
| MOCK_SEED_FAILED | 400 | Falla al insertar los datos de prueba en MongoDB |
| ROUTE_NOT_FOUND | 404 | Ruta inexistente |

## Logging y monitoreo

### Herramienta
El proyecto usa **Winston** como logger centralizado, configurado en `src/config/logger.config.js`, con rotación diaria de archivos mediante `winston-daily-rotate-file`.

### Niveles de log (de más a menos severo)
`fatal` → `error` → `warning` → `info` → `http` → `debug`

### Comportamiento según entorno
- **Desarrollo** (`NODE_ENV=development`): se muestran todos los niveles, incluido `debug`.
- **Producción** (`NODE_ENV=production`): solo se registran desde `info` hacia arriba (se filtran `debug` y `http`).

### Persistencia en archivos
Los niveles `warning`, `error` y `fatal` se guardan en la carpeta `logs/`, con rotación diaria y retención de 14 días. La carpeta `logs/` está en `.gitignore`.

### Endpoint de prueba

GET /api/logger/test

Genera un mensaje de cada uno de los 6 niveles.

## Documentación de la API (Swagger)

Documentación interactiva disponible en: http://localhost:3000/api/docs


### Módulos documentados (tags)
- **Users**: CRUD de usuarios
- **Products**: CRUD de productos
- **Orders**: CRUD de pedidos (crear, consultar, listar, actualizar estado)
- **Deliveries**: generación de entregas de prueba, vía mocking
- **Mocks**: generación y siembra de datos simulados
- **Logger**: endpoint interno de validación del sistema de logs

### Schemas reutilizables
`User`, `Order`, `Delivery`, `OrderItem`, `Product`, `SuccessResponse`, `ErrorResponse` — definidos en `src/docs/schemas.js`.

## Testing

### Herramientas
**Mocha** (organización/ejecución), **Chai** (aserciones) y **Supertest** (peticiones HTTP contra la app de Express, sin necesidad de levantar un puerto real — la app está separada del arranque del servidor en `src/app.js` / `src/server.js`).

### Cómo ejecutar

npm test

Corre con `NODE_ENV=test`, usando las variables definidas en `.env.test` (base de datos separada de la de desarrollo).

### Variables de entorno para testing (`.env.test`)
Ver `.env.test.example` como plantilla. Se necesita:
- `PORT` (por ejemplo `3001`)
- `MONGODB_URI` apuntando a una base **distinta** a la de desarrollo (por ejemplo `mongodb://localhost:27017/shipnow_test`)
- `NODE_ENV=test`

### Módulos cubiertos
- **Users**: listado, creación válida, campos faltantes (400), email duplicado (409)
- **Orders**: creación válida, consulta por id, id inexistente (404), estado inválido (400)
- **Mocks**: generación sin persistir, cantidad inválida (400), siembra de usuarios, siembra de pedidos sin clientes disponibles (400)
- **Logger**: endpoint de prueba
- **Swagger**: disponibilidad de `/api/docs`
- **Ruta inexistente**: 404 con `ROUTE_NOT_FOUND`

### Limpieza de datos
Después de cada test se vacían todas las colecciones de la base de testing (`src/tests/hooks.js`, mediante `mochaHooks`), garantizando que los tests sean independientes entre sí y no dependan del orden de ejecución ni de datos cargados manualmente.

## Endpoints

### Products

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/products | Lista todos los productos (soporta `?onlyAvailable=true`) |
| GET | /api/products/:id | Detalle de un producto |
| POST | /api/products | Crea un producto |
| PUT | /api/products/:id | Modifica un producto |
| DELETE | /api/products/:id | Elimina un producto |

### Users

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/users | Lista todos los usuarios |
| GET | /api/users/:id | Detalle de un usuario |
| POST | /api/users | Crea un usuario (rol `CLIENTE` por defecto) |

### Orders

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/orders | Lista todos los pedidos |
| GET | /api/orders/:id | Detalle de un pedido |
| POST | /api/orders | Crea un pedido (requiere `user` existente y `address`) |
| PATCH | /api/orders/:id/status | Actualiza el estado de un pedido |

### Mocks

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/mocks/users?qty=N | Genera N usuarios simulados, sin guardarlos en la base |
| POST | /api/mocks/seed/users?qty=N | Genera e inserta N usuarios reales en MongoDB |
| POST | /api/mocks/seed/orders?qty=N | Genera e inserta N pedidos, asociados a clientes ya existentes |
| POST | /api/mocks/seed/deliveries?qty=N | Genera e inserta N entregas, asociadas a pedidos y repartidores existentes |

### Logger

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/logger/test | Genera un log de cada nivel (herramienta interna) |

## Cómo probar el manejo de errores

| Caso | Endpoint | Resultado esperado |
|---|---|---|
| Producto inexistente | `GET /api/products/000000000000000000000000` | 404, `PRODUCT_NOT_FOUND` |
| Pedido inexistente | `GET /api/orders/000000000000000000000000` | 404, `ORDER_NOT_FOUND` |
| Estado de pedido inválido | `PATCH /api/orders/:id/status` con `status: "NO_EXISTE"` | 400, `ORDER_INVALID_STATUS` |
| Email de usuario duplicado | `POST /api/users` con un email ya registrado | 409, `USER_EMAIL_EXISTS` |
| Mock con cantidad negativa | `GET /api/mocks/users?qty=-5` | 400, `MOCK_INVALID_QTY` |
| Mock con cantidad excesiva | `GET /api/mocks/users?qty=500` | 400, `MOCK_QTY_TOO_LARGE` |
| Sembrar pedidos sin clientes en la base | `POST /api/mocks/seed/orders?qty=5` | 400, `MOCK_NO_CLIENTS_AVAILABLE` |
| Ruta inexistente | `GET /api/no-existe` | 404, `ROUTE_NOT_FOUND` |