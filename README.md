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