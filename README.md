# ShipNow API

## Cómo correr el proyecto localmente
1. Cloná el repositorio
2. `npm install`
3. Copiá `.env.example` como `.env` y completá `PORT`, `MONGODB_URI` y `NODE_ENV`
4. `npm run dev`

Si falta alguna variable obligatoria en el `.env`, la aplicación no arranca y muestra un mensaje de error indicando cuál falta.

## Arquitectura

- **Repository**: único lugar que conoce Mongoose. Encapsula el acceso a datos (filtros, proyecciones), no solo hace `find()` plano.
- **Service**: concentra la lógica de negocio (por ejemplo, calcular el `status` de un producto según su `stock`, o filtrar solo productos disponibles). Es el único que decide *qué* hacer con los datos, no *cómo* guardarlos.
- **Controller**: única puerta de entrada HTTP. Solo extrae datos del request, llama al service, y devuelve la respuesta con el código correspondiente. Nunca importa Mongoose ni conoce detalles de la base de datos.

### Por qué separar Service de Repository

El Repository responde "¿cómo busco/guardo esto en la base?" — es intercambiable (podría cambiar de MongoDB a otra base sin tocar el resto de la app). El Service responde "¿qué reglas del negocio aplican acá?" — por ejemplo, que un producto sin stock cambie automáticamente su estado, o que no se pueda crear un producto con precio negativo. Mezclar esa lógica dentro del Repository lo volvería frágil y dependiente del motor de base de datos elegido; separarla permite testear las reglas de negocio sin necesidad de una base de datos real.

## Endpoints

### Products
- GET /api/products
- GET /api/products/:id
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id

### Users
- GET /api/users
- GET /api/users/:id
- POST /api/users

## Mocking de datos de prueba

### Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/mocks/users?qty=N | Genera N usuarios simulados, sin guardarlos en la base |
| POST | /api/mocks/seed/users?qty=N | Genera e inserta N usuarios reales en MongoDB |
| POST | /api/mocks/seed/orders?qty=N | Genera e inserta N pedidos, asociados a clientes existentes |
| POST | /api/mocks/seed/deliveries?qty=N | Genera e inserta N entregas, asociadas a pedidos y repartidores existentes |

### Orden recomendado para probar

1. `POST /api/mocks/seed/users?qty=10` — para tener clientes y repartidores en la base
2. `POST /api/mocks/seed/orders?qty=5` — se asocian a clientes ya sembrados
3. `POST /api/mocks/seed/deliveries?qty=3` — se asocian a pedidos y repartidores ya sembrados

Los datos generados respetan los modelos reales del proyecto y usan las constantes de roles, estados y prioridades definidas en `src/constants/index.js` — nunca strings sueltos.