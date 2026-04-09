# Migración a Mock Data y LocalStorage

## Cambios Realizados

El proyecto ha sido migrado de una base de datos PostgreSQL (Prisma) a una arquitectura completamente local usando:
- **Datos mockeados en JSON**: para menú y usuarios
- **localStorage**: para persistencia de datos (carrito, sesiones de usuario)

### Archivos Creados/Modificados

#### Nuevos Archivos:
1. **`frontend/mockdata/mockUsers.js`**
   - Contiene usuarios de demostración
   - Funciones para gestionar usuarios en localStorage
   - Usuarios de prueba:
     - Email: `test@example.com` / Password: `password123`
     - Email: `demo@example.com` / Password: `demo123`

2. **`frontend/services/menuService.js`**
   - Reemplaza las llamadas al backend `/api/menu`
   - Retorna datos mockeados del menú desde `platos.js`

#### Archivos Modificados:
1. **`frontend/services/authService.js`**
   - Reemplaza las llamadas a `/api/session/login` y `/api/session/register`
   - Usa localStorage para persistencia
   - Valida credenciales contra mockData

2. **`frontend/pages/menu/menu.js`**
   - Cambia de `fetch('http://localhost:3000/api/menu')` a uso de `menuService.getMenu()`

3. **`frontend/pages/registration/registration.js`**
   - Corrige el import de authService (de named export a default export)

4. **`frontend/pages/cart/cart.js`**
   - Ya estaba funcionando con localStorage (no fue necesario cambiar)

## Flujo del Carrito ✓

El flujo completo del carrito ahora funciona completamente con datos locales:

1. **Ver Menú**: Navega a `/menu` para ver los platillos mockeados
2. **Agregar al Carrito**: Click en "Add to Cart" en cualquier platillo
3. **Ver Carrito**: Click en el ícono 🛒 en la navbar o navega a `/cart`
4. **Gestionar Carrito**:
   - Modificar cantidad (+/-)
   - Remover items (X)
   - Ver subtotal, envío y total
5. **Hacer Pedido**: Click en "PLACE ORDER"

Los datos del carrito se guardan automáticamente en `localStorage` con la key `qitchen-cart`.

## Flujo de Autenticación ✓

1. **Registro**: 
   - Navega a `/registration`
   - Completa el formulario
   - El usuario se guarda en localStorage (key: `sushi-app-users`)
   
2. **Login**:
   - Navega a `/login`
   - Usa una de las cuentas de prueba o una que hayas registrado
   - La sesión se guarda en localStorage (key: `UCBuser`)

3. **Logout**:
   - Click en el botón de logout en navbar
   - Se limpia la sesión de localStorage

## LocalStorage Keys

- `qitchen-cart`: Carrito de compras (array de items)
- `UCBuser`: Sesión actual del usuario (objeto user)
- `sushi-app-users`: Base de datos de usuarios registrados (array)

## Para Iniciar el Frontend

```bash
cd frontend
npm install
npm start
```

El servidor estará disponible en `http://localhost:8080` (o el puerto configurado)

## Notas Importantes

- No necesitas ejecutar el backend para que funcione el carrito
- Los datos se pierden si limpias el localStorage del navegador
- Para agregar más usuarios de prueba, edita `frontend/mockdata/mockUsers.js`
- Para cambiar los platillos, edita `frontend/mockdata/platos.js`

## Próximos Pasos (Opcional)

Si deseas agregar funcionalidades adicionales con datos persistentes:
1. Blog: Crear mockdata para posts
2. Reservaciones: Crear mockdata para reservaciones
3. Órdenes: Guardar historial de pedidos en localStorage
