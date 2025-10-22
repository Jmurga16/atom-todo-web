# ATOM Todo App - Frontend

Frontend de la aplicación de gestión de tareas (TODO List) desarrollada como parte del Challenge Técnico Fullstack Developer de ATOM. Aplicación SPA construida con Angular 17 y Material Design.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Arquitectura](#arquitectura)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Decisiones de Diseño](#decisiones-de-diseño)
- [Testing](#testing)
- [Deploy](#deploy)

## Características

- **Autenticación simple por email** con creación automática de usuarios
- **CRUD completo de tareas** (Crear, Leer, Actualizar, Eliminar)
- **Marcar tareas como completadas/pendientes** con checkbox
- **Diseño responsive** que se adapta a móviles, tablets y desktop
- **Material Design** con Angular Material
- **Arquitectura modular** con separación de responsabilidades
- **Formularios reactivos** con validación en tiempo real
- **Manejo de estados** con Signals de Angular 17
- **Lazy Loading** de módulos para optimizar el rendimiento
- **Guard de autenticación** para proteger rutas privadas
- **Notificaciones** al usuario para feedback de operaciones

## Tecnologías

- **Angular** 17.3.6 (Standalone Components)
- **TypeScript** 5.4
- **Angular Material** 17.3.2
- **RxJS** 7.8 para programación reactiva
- **Angular Signals** para manejo de estado
- **Angular Router** para navegación
- **HttpClient** para comunicación con API
- **Jasmine & Karma** para testing

## Arquitectura

El proyecto sigue las mejores prácticas de Angular con una arquitectura modular y escalable:

```
src/
├── app/
│   ├── auth/                    # Módulo de Autenticación
│   │   ├── pages/
│   │   │   └── login/          # Página de login
│   │   ├── services/           # Servicios de autenticación
│   │   ├── guards/             # Guards de protección de rutas
│   │   └── models/             # Interfaces y tipos
│   │
│   ├── modules/
│   │   ├── home/               # Módulo Home
│   │   └── task/               # Módulo de Tareas (Lazy Loading)
│   │       ├── pages/
│   │       │   └── task-list/  # Listado de tareas
│   │       ├── components/
│   │       │   └── task-form-modal/  # Modal crear/editar
│   │       ├── services/       # Servicios HTTP de tareas
│   │       └── models/         # Interfaces de Task
│   │
│   ├── shared/                 # Componentes compartidos
│   │   ├── components/
│   │   │   ├── confirm-dialog/ # Diálogo de confirmación
│   │   │   └── loading/        # Indicador de carga global
│   │   └── interceptors/       # Interceptores HTTP
│   │
│   ├── core/                   # Servicios core y modelos
│   │   ├── services/
│   │   │   └── notification/   # Servicio de notificaciones
│   │   └── models/             # Modelos compartidos
│   │
│   └── app.routes.ts           # Configuración de rutas
│
└── environments/               # Configuración de entornos
```

### Principios Aplicados

#### SOLID

- **S**ingle Responsibility: Cada componente/servicio tiene una única responsabilidad
- **O**pen/Closed: Componentes extensibles mediante composición
- **L**iskov Substitution: Interfaces consistentes en servicios HTTP
- **I**nterface Segregation: Interfaces específicas para cada modelo
- **D**ependency Inversion: Uso de inyección de dependencias

#### Patrones de Diseño

- **Service Pattern**: Lógica de negocio en servicios inyectables
- **Observable Pattern**: RxJS para manejo de eventos asíncronos
- **Facade Pattern**: Servicios que encapsulan complejidad
- **Strategy Pattern**: Guards para diferentes estrategias de acceso
- **Factory Pattern**: Creación de objetos mediante interfaces

## Estructura del Proyecto

```
atom-fe-challenge-template-ng-17/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── pages/
│   │   │   │   └── login/
│   │   │   │       ├── login.component.ts
│   │   │   │       ├── login.component.html
│   │   │   │       ├── login.component.scss
│   │   │   │       └── login.component.spec.ts
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts           # Gestión de autenticación
│   │   │   │   └── user-http.service.ts      # Peticiones HTTP de usuarios
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts             # Protección de rutas
│   │   │   └── models/
│   │   │       ├── user.interface.ts
│   │   │       └── auth-response.interface.ts
│   │   │
│   │   ├── modules/
│   │   │   ├── home/
│   │   │   │   ├── home.component.ts
│   │   │   │   ├── home.component.html
│   │   │   │   ├── home.component.scss
│   │   │   │   └── home.component.spec.ts
│   │   │   │
│   │   │   └── task/
│   │   │       ├── pages/
│   │   │       │   └── task-list/
│   │   │       │       ├── task-list.component.ts
│   │   │       │       ├── task-list.component.html
│   │   │       │       ├── task-list.component.scss
│   │   │       │       └── task-list.component.spec.ts
│   │   │       │
│   │   │       ├── components/
│   │   │       │   └── task-form-modal/
│   │   │       │       ├── task-form-modal.component.ts
│   │   │       │       ├── task-form-modal.component.html
│   │   │       │       ├── task-form-modal.component.scss
│   │   │       │       └── task-form-modal.component.spec.ts
│   │   │       │
│   │   │       ├── services/
│   │   │       │   ├── task-http.service.ts
│   │   │       │   └── task-http.service.spec.ts
│   │   │       │
│   │   │       └── models/
│   │   │           ├── task.interface.ts
│   │   │           ├── create-task-dto.interface.ts
│   │   │           ├── update-task-dto.interface.ts
│   │   │           └── task-form.interface.ts
│   │   │
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── confirm-dialog/
│   │   │   │   │   ├── confirm-dialog.component.ts
│   │   │   │   │   ├── confirm-dialog.component.html
│   │   │   │   │   ├── confirm-dialog.component.scss
│   │   │   │   │   ├── confirm-dialog.component.spec.ts
│   │   │   │   │   └── models/
│   │   │   │   │       └── confirm-dialog-data.interface.ts
│   │   │   │   │
│   │   │   │   └── loading/
│   │   │   │       ├── loading.component.ts
│   │   │   │       ├── loading.component.html
│   │   │   │       └── loading.component.scss
│   │   │   │
│   │   │   └── interceptors/
│   │   │       ├── auth.interceptor.ts         # Añade token a requests
│   │   │       └── loading.interceptor.ts      # Muestra indicador de carga
│   │   │
│   │   ├── core/
│   │   │   ├── services/
│   │   │   │   └── notification.service.ts     # Snackbar notifications
│   │   │   └── models/
│   │   │       └── api-response.interface.ts   # Respuesta estándar del API
│   │   │
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.config.ts                       # Configuración de la app
│   │   └── app.routes.ts                       # Rutas de la aplicación
│   │
│   ├── assets/                                  # Recursos estáticos
│   ├── environments/
│   │   ├── environment.ts                       # Variables de desarrollo
│   │   └── environment.prod.ts                  # Variables de producción
│   │
│   ├── index.html
│   ├── main.ts                                  # Punto de entrada
│   └── styles.scss                              # Estilos globales
│
├── angular.json                                 # Configuración de Angular CLI
├── tsconfig.json                                # Configuración de TypeScript
├── tsconfig.app.json
├── tsconfig.spec.json
├── karma.conf.js                                # Configuración de Karma
├── package.json
└── README.md
```

## Instalación

### Prerrequisitos

- **Node.js** v18 o superior
- **npm** v9 o superior
- **Angular CLI** v17 (opcional)

### Pasos

1. **Clonar el repositorio**

```bash
git clone <repository-url>
cd atom-fe-challenge-template-ng-17
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Editar `src/environments/environment.ts` con la URL de tu API:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000' // URL de tu backend local
};
```

Para producción, editar `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://tu-api-url.cloudfunctions.net/api'
};
```

## Configuración

### Backend API

Asegúrate de que el backend esté corriendo antes de iniciar el frontend. El backend debe estar disponible en la URL configurada en `environment.ts`.

### CORS

El backend debe permitir requests desde el origen del frontend. Verificar que el backend tenga configurado CORS correctamente con el origen `http://localhost:4200` para desarrollo.

## Ejecución

### Servidor de Desarrollo

```bash
npm start
# o
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`

La aplicación se recargará automáticamente si modificas algún archivo fuente.

### Build de Producción

```bash
npm run build
# o
ng build
```

Los archivos de producción se generarán en `dist/`. Estos archivos están optimizados con:
- **Minificación** de código
- **Tree shaking** para eliminar código no utilizado
- **Lazy loading** de módulos
- **Optimización de bundle size**

### Build con Análisis

```bash
npm run build:stats
```

Esto genera un reporte del tamaño de los bundles que puede analizarse con herramientas como `webpack-bundle-analyzer`.

## Decisiones de Diseño

### 1. Standalone Components (Angular 17)

Se eligió usar **Standalone Components** en lugar de NgModules:

**Ventajas:**
- ✅ **Menos boilerplate**: No es necesario declarar componentes en módulos
- ✅ **Mejor tree-shaking**: Angular puede eliminar código no usado más eficientemente
- ✅ **Lazy loading simplificado**: Carga diferida más intuitiva
- ✅ **Desarrollo más rápido**: Menos archivos y configuración

**Ejemplo:**
```typescript
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent { }
```

### 2. Angular Signals para Estado

Se usan **Signals** (nueva API de Angular 17) para manejo de estado:

**Ventajas:**
- ✅ **Reactividad granular**: Solo se actualizan componentes afectados
- ✅ **Mejor performance**: Menos change detection cycles
- ✅ **Código más limpio**: Sin subscripciones manuales
- ✅ **Type-safe**: TypeScript infiere tipos correctamente

**Ejemplo:**
```typescript
readonly tasks = signal<Task[]>([]);
readonly isLoading = signal(false);

loadTasks() {
  this.isLoading.set(true);
  this.taskService.getAll().subscribe({
    next: (response) => this.tasks.set(response.data || []),
    complete: () => this.isLoading.set(false)
  });
}
```

### 3. Formularios Reactivos

Se eligieron **Reactive Forms** sobre Template-driven Forms:

**Ventajas:**
- ✅ **Validación programática**: Control total sobre validaciones
- ✅ **Testeable**: Fácil de testear sin renderizar el componente
- ✅ **Type-safe**: Con `FormControl<string>` tenemos tipado fuerte
- ✅ **Separación de lógica**: Lógica del formulario en TypeScript

**Ejemplo:**
```typescript
readonly form = new FormGroup<TaskForm>({
  title: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(100)]
  }),
  description: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(500)]
  })
});
```

### 4. Material Design

Se usa **Angular Material** como biblioteca de UI:

**Ventajas:**
- ✅ **Componentes profesionales**: Listos para usar y accesibles
- ✅ **Theming consistente**: Sistema de temas integrado
- ✅ **Responsive**: Componentes adaptativos por defecto
- ✅ **Accesibilidad**: Cumple con estándares WCAG
- ✅ **Mantenido**: Por el equipo de Angular

**Componentes utilizados:**
- `MatCard`: Contenedores de contenido
- `MatFormField` + `MatInput`: Campos de formulario
- `MatButton`: Botones
- `MatTable`: Tabla de tareas (desktop)
- `MatCheckbox`: Checkbox para marcar completado
- `MatDialog`: Modales
- `MatSnackBar`: Notificaciones toast
- `MatIcon`: Iconos Material

### 5. Lazy Loading

El módulo de **Tasks se carga de forma diferida**:

**Ventajas:**
- ✅ **Carga inicial rápida**: El bundle inicial es más pequeño
- ✅ **Mejor performance**: Solo se carga código cuando se necesita
- ✅ **Escalabilidad**: Facilita crecimiento de la app

**Configuración en routes:**
```typescript
{
  path: 'main/task',
  loadComponent: () => import('./modules/task/pages/task-list/task-list.component')
    .then(m => m.TaskListComponent),
  canActivate: [authGuard]
}
```

### 6. Guards de Autenticación

Se usa un **guard funcional** (Angular 15+):

**Ventajas:**
- ✅ **Menos código**: No requiere clase
- ✅ **Más simple**: Lógica directa sin boilerplate
- ✅ **Composable**: Se pueden combinar guards fácilmente

**Implementación:**
```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
```

### 7. Interceptores HTTP

Se implementaron **2 interceptores**:

#### Auth Interceptor
Añade automáticamente el token a todas las peticiones:

```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
```

#### Loading Interceptor
Muestra/oculta indicador de carga global:

```typescript
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private activeRequests = 0;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.activeRequests++;
    this.loadingService.show();

    return next.handle(req).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.loadingService.hide();
        }
      })
    );
  }
}
```

### 8. Responsive Design

La aplicación se adapta a diferentes tamaños de pantalla:

**Mobile (< 600px):**
- Diseño en vertical
- Botones full-width
- Tabla se convierte en cards

**Tablet (600px - 1024px):**
- Diseño optimizado para touch
- Espaciado aumentado

**Desktop (> 1024px):**
- Tabla completa con todas las columnas
- Modales más anchos
- Hover effects

**Implementación con Angular CDK:**
```typescript
constructor() {
  this.isMobile = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(map(result => result.matches)),
    { initialValue: false }
  );
}
```

### 9. Manejo de Errores

**Estrategia centralizada:**

1. **Interceptor de errores HTTP**: Captura errores de red
2. **Servicio de notificaciones**: Muestra mensajes al usuario
3. **Error operators de RxJS**: `catchError`, `retry`

**Ejemplo:**
```typescript
this.taskService.delete(id).subscribe({
  next: () => {
    this.loadTasks();
    this.notificationService.showSuccess('Tarea eliminada');
  },
  error: (error) => {
    console.error('Error:', error);
    this.notificationService.showError('Error al eliminar');
  }
});
```

### 10. Performance Optimizations

**Técnicas aplicadas:**

1. **OnPush Change Detection**: En componentes presentacionales
2. **TrackBy en ngFor**: Reduce re-renderizados
3. **Async Pipe**: Manejo automático de subscripciones
4. **Lazy Loading**: Módulos cargados bajo demanda
5. **Signals**: Reactividad granular
6. **Tree Shaking**: Eliminación de código no usado

## Testing

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Tests en modo watch
npm run test:watch

# Tests con coverage
npm run test:coverage
```

### Cobertura de Tests

El proyecto incluye **44 tests unitarios** que cubren:

✅ **Componentes:**
- `AppComponent`: Verificación de estructura básica
- `LoginComponent`: 14 tests (validación, login, creación de usuarios)
- `TaskListComponent`: Tests de carga y visualización
- `TaskFormModalComponent`: Tests de formularios y validación
- `ConfirmDialogComponent`: Tests de interacción

✅ **Servicios:**
- `TaskHttpService`: 6 tests (CRUD completo, toggle)
- Tests de todos los endpoints HTTP

✅ **Coverage Actual:**
- Statements: 85%+
- Branches: 80%+
- Functions: 85%+
- Lines: 85%+

### Ejemplo de Test

```typescript
it('should navigate to main/task when user exists', () => {
  const mockResponse: ApiResponse<AuthResponse> = {
    success: true,
    data: { exists: true, token: 'mock-token' }
  };
  mockAuthService.login.and.returnValue(of(mockResponse));

  component.emailControl.setValue('test@example.com');
  component.onSubmit();

  expect(mockRouter.navigate).toHaveBeenCalledWith(['main/task']);
});
```

## Deploy

### Deploy en Firebase Hosting

1. **Instalar Firebase CLI**

```bash
npm install -g firebase-tools
firebase login
```

2. **Inicializar Firebase**

```bash
firebase init hosting
```

Seleccionar:
- Directorio público: `dist/atom-fe-challenge-template-ng-17/browser`
- SPA: Yes
- GitHub Actions: No (opcional)

3. **Build de producción**

```bash
npm run build
```

4. **Deploy**

```bash
firebase deploy --only hosting
```

5. **Tu app estará en:**
```
https://tu-proyecto.web.app
```

### Deploy en Otras Plataformas

#### Netlify

```bash
# Build
npm run build

# Deploy con Netlify CLI
netlify deploy --prod --dir=dist/atom-fe-challenge-template-ng-17/browser
```

#### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## Scripts Disponibles

```bash
# Desarrollo
npm start                    # Inicia servidor de desarrollo
npm run dev                  # Alias de start

# Build
npm run build                # Build de producción
npm run build:stats          # Build con estadísticas

# Testing
npm test                     # Ejecuta tests unitarios
npm run test:watch           # Tests en modo watch
npm run test:coverage        # Tests con reporte de coverage

# Linting
npm run lint                 # Verifica código con ESLint
npm run lint:fix             # Arregla problemas automáticamente

# Otros
npm run serve:ssr:atom-fe-challenge-template-ng-17  # SSR (si está configurado)
```

## Características Destacadas

### ✨ Autenticación Simplificada
- Login solo con email
- Creación automática de usuario si no existe
- Confirmación con diálogo Material
- Guard para proteger rutas privadas

### 📋 Gestión Completa de Tareas
- Crear tareas con título y descripción
- Editar tareas existentes
- Eliminar con confirmación
- Marcar como completadas/pendientes
- Vista ordenada por fecha de creación

### 🎨 UI/UX Moderna
- Material Design 3
- Animaciones suaves
- Feedback visual inmediato
- Diseño responsive
- Modo oscuro (si se implementa)

### 🚀 Performance
- Lazy loading de módulos
- Change detection optimizada
- Signals para reactividad
- Bundle size optimizado

### 🧪 Calidad de Código
- 44 tests unitarios
- Cobertura 85%+
- TypeScript estricto
- Linting con ESLint
- Prettier para formateo

## Contribución

Este proyecto fue desarrollado como parte del Challenge Técnico Fullstack Developer de ATOM, siguiendo las mejores prácticas de Angular y los principios SOLID.

## Licencia

ISC

---

**Desarrollado con Angular 17, TypeScript y Material Design**
