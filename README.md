# Aplicación Web para Restaurante de Sushi

Este proyecto es una **aplicación web completa** para la gestión de un restaurante de sushi. Incluye un **frontend de tipo Single Page Application (SPA)** desarrollado con **Vanilla JavaScript** y **Web Components**, y un backend construido con **Node.js**, **Express** y **Prisma**.

El sistema permite a los usuarios **navegar por el menú, navegar por los blogs, ver blogs y visualizar los pedidos en el carrito**.

-----

## Tabla de Contenidos

1.  [Estructura del Proyecto](https://www.google.com/search?q=%231-estructura-del-proyecto)
2.  [Diseño de la Base de Datos](https://www.google.com/search?q=%232-dise%C3%B1o-de-la-base-de-datos)
3.  [Patrones de Diseño Implementados](https://www.google.com/search?q=%233-patrones-de-dise%C3%B1o-implementados)
4.  [Tecnologías Utilizadas](https://www.google.com/search?q=%234-tecnolog%C3%ADas-utilizadas)
5.  [Configuración del Entorno Local](https://www.google.com/search?q=%235-configuraci%C3%B3n-del-entorno-local)
6.  [Cómo Ejecutar la Aplicación](https://www.google.com/search?q=%236-c%C3%B3mo-ejecutar-la-aplicaci%C3%B3n)
7.  [Endpoints de la API](https://www.google.com/search?q=%237-endpoints-de-la-api)

-----

## 1\. Estructura del Proyecto

El proyecto está organizado como un **monorepo**, lo que permite una clara separación de las responsabilidades entre el frontend y el backend:

```
SUSHI-APP/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── client.js
│   ├── controllers/
│   │   ├── usuarioController.js
│   │   ├── menuController.js
│   │   └── blogController.js
│   ├── routes/
│   │   ├── usuarioRoutes.js
│   │   ├── menuRoutes.js
│   │   └── blogRoutes.js
│   ├── .env
│   ├── main.js
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── blocks/
│   ├── pages/
│   ├── styles.css
│   ├── server.js
│   ├── scripts.js
│   ├── index.html
│   ├── package.json
│   ├── router.js
│   └── .gitignore
│
└── README.md
```

-----

## 2\. Diseño de la Base de Datos

El esquema de la base de datos fue diseñado con un enfoque **frontend-first** y está implementado en **PostgreSQL**. A continuación, se detalla la estructura de las tablas:

```
model carrito {
  id              Int @id @default(autoincrement())
  idusuario       Int
  fechacreacion   DateTime @default(now())
  estado          String
  // Relación con el usuario
  usuario         usuario @relation(fields: [idusuario], references: [id])
  // Relación con los platillos en el carrito
  plato_carrito   plato_carrito[]
}

model categoria {
  id     Int    @id @default(autoincrement())
  nombre String @unique
  // Relación con los platillos
  platillo platillo[]
}

model guardado {
  id            Int @id @default(autoincrement())
  idpublicacion Int
  idusuario     Int
  // Relaciones con publicaciones y usuarios
  publicacion   publicaciones @relation(fields: [idpublicacion], references: [id])
  usuario       usuario       @relation(fields: [idusuario], references: [id])
}

model platillo {
  id          Int     @id @default(autoincrement())
  nombre      String
  descripcion String? // Descripción opcional
  precio      Float
  idcategoria Int
  image       String? // Ruta de la imagen opcional
  // Relación con la categoría
  categoria   categoria @relation(fields: [idcategoria], references: [id])
  // Relación con los platillos en el carrito
  plato_carrito plato_carrito[]
}

model plato_carrito {
  id       Int @id @default(autoincrement())
  idcarrito Int
  idplato  Int
  cantidad Int
  // Relaciones con carrito y platillo
  carrito  carrito  @relation(fields: [idcarrito], references: [id])
  platillo platillo @relation(fields: [idplato], references: [id])
}

model publicaciones {
  id        Int      @id @default(autoincrement())
  idusuario Int
  nombre    String
  contenido String
  autor     String
  fecha     DateTime @default(now())
  // Relación con el usuario que publica
  usuario   usuario   @relation(fields: [idusuario], references: [id])
  // Relación con los elementos guardados
  guardado  guardado[]
}

model reservacion {
  id        Int      @id @default(autoincrement())
  idusuario Int
  nombre    String
  telefono  String
  email     String
  invitados Int
  fecha     DateTime
  tiempo    String
  estado    String
  // Relación con el usuario
  usuario   usuario @relation(fields: [idusuario], references: [id])
}

model usuario {
  id         Int     @id @default(autoincrement())
  nombre     String
  telefono   String? // Teléfono opcional
  email      String  @unique
  contrasena String
  direccion  String? // Dirección opcional
  // Relaciones con otras tablas
  carrito      carrito[]
  guardado     guardado[]
  publicaciones publicaciones[]
  reservacion  reservacion[]
}
```

![DB diagrama](/backend/dbDesign/DBdiagrama.drawio.png)

-----

## 3\. Patrones de Diseño Implementados

### Frontend

Enlace al diseño de [Figma](https://www.figma.com/design/JuSsIiGBiSqf1O5YuiXhzJ/Sushi-EDIT--Copy-?node-id=0-1&t=8srjio8sAjKInt5s-1)

#### 🟡 **Patrón Observer**

  * **Ubicación**: `frontend/pages/menu/menu.js`, `frontend/pages/blog/blog.js`
  * **Uso**: Se utiliza para **sincronizar automáticamente el estado del carrito** y la **selección de visualizacion del blog**, asegurando que los componentes reaccionen a los cambios de manera eficiente.

-----

## 4\. Tecnologías Utilizadas

  * **Backend**: **Node.js**, **Express**, **Prisma**, **PostgreSQL**, **JWT** (JSON Web Tokens), **Cors**.
  * **Frontend**: **HTML5**, **CSS**, **Vanilla JavaScript**, **Web Components**.
  * **Herramientas**: **Git**, **npm**, **Nodemon** (para desarrollo del backend), **Live Server** (para desarrollo del frontend).

-----

## 5\. Configuración del Entorno Local

Para poner en marcha la aplicación en tu entorno local, sigue estos pasos:

### Prerrequisitos

Asegúrate de tener instalados los siguientes programas:

  * **Node.js** (versión 18 o superior)
  * **npm** (Node Package Manager)
  * **Git**
  * **PostgreSQL**

### Instalación

```bash
# 1. Clona el repositorio
git clone <url-del-repositorio>
cd nombre-del-repositorio

# 2. Configura el Backend
cd backend
npm install

# 3. Crear un archivo .env en la carpeta 'backend' con las credenciales de PostgreSQL:
# DATABASE_URL="postgresql://USUARIO:CONTRASENA@HOST:PUERTO/BASE_DE_DATOS"

# 4. Ejecuta las migraciones y la siembra de datos de Prisma
npx prisma migrate dev --name init
npx prisma db seed

# 5. Configura el Frontend
cd ../frontend
npm install
```

-----

## 6\. Cómo Ejecutar la Aplicación

Para iniciar tanto el backend como el frontend, necesitarás dos terminales:

### Terminal 1 - Backend:

```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend:

```bash
cd frontend
npm run dev
```

-----

## 7\. Endpoints de la API

Aquí tienes una lista de los principales endpoints disponibles en la API:

  * `GET /api/usuario`

      * **Propósito**: Obtiene una lista de usuarios. Utilizado principalmente para pruebas y administración.

  * `GET /api/menu`

      * **Propósito**: Retorna una lista de platillos del menú, agrupados por categoría.

  * `GET /api/blog`

      * **Propósito**: Recupera todas las publicaciones del blog.