# Pragma Test Ionic - Todo App

A modern To-Do List application built with Ionic 7+ and Angular 17+ following Clean Architecture principles.

## Features

- ✅ **Clean Architecture** - Strict separation of concerns (Domain, Data, Presentation)
- 📱 **Responsive Design** - Optimized for Mobile, Tablet, and Desktop
- 🎨 **Modern UI** - Ionic 7+ components with custom theming
- ⚡ **Performance** - Virtual scrolling and lazy loading
- 🔥 **Firebase Integration** - Remote Config support
- 📦 **Standalone Components** - Angular 17+ standalone architecture
- 🎯 **Signals** - Modern reactive state management
- 🌙 **Dark Mode** - Automatic theme switching
- 📱 **Mobile Ready** - Capacitor/Cordova build support

## Architecture

```
src/app/
├── domain/           # Business logic layer
│   ├── entities/     # Domain entities
│   ├── repositories/ # Repository interfaces
│   └── use-cases/    # Business use cases
├── data/             # Data access layer
│   ├── repositories/ # Repository implementations
│   └── services/     # External services
└── presentation/     # UI layer
    ├── components/   # Reusable components
    ├── pages/        # Page components
    └── layouts/      # Layout components
```

## Tech Stack

- **Framework**: Ionic 7 + Angular 17+
- **Architecture**: Clean Architecture + SOLID Principles
- **State Management**: Angular Signals
- **Styling**: SCSS + Ionic CSS Variables
- **Build**: Capacitor 7 for mobile builds
- **Backend**: Firebase (Remote Config)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Ionic CLI: `npm install -g @ionic/cli`
- Capacitor CLI: `npm install -g @capacitor/cli`

### Installation

1. **Clone and install dependencies**:
   ```bash
   cd pragma-test-ionic
   npm install
   ```

2. **Update package.json** (replace current package.json with package-update.json):
   ```bash
   copy package-update.json package.json
   npm install
   ```

3. **Configure Firebase** (optional):
  - Update `src/environments/firebase.config.ts` with your Firebase config
  - Enable Remote Config in Firebase Console

4. **Run the application**:
   ```bash
   ionic serve
   ```

### Mobile Build

1. **Add platforms**:
   ```bash
   ionic capacitor add android
   ionic capacitor add ios
   ```

2. **Build and sync**:
   ```bash
   ionic capacitor build android
   ionic capacitor build ios
   ```

3. **Open in native IDE**:
   ```bash
   ionic capacitor open android
   ionic capacitor open ios
   ```

## Project Structure

### Domain Layer

- `TodoEntity` & `CategoryEntity` - Core business entities
- `TodoRepository` & `CategoryRepository` - Repository contracts
- `TodoUseCases` & `CategoryUseCases` - Business logic

### Data Layer

- Repository implementations with in-memory storage
- Firebase Remote Config service
- Extensible for real Firebase/API integration

### Presentation Layer

- `TodoListPage` - Main todo list with virtual scrolling
- `ResponsiveLayoutComponent` - Adaptive layout component
- Modern Ionic components with signals

## Key Features Implementation

### Virtual Scrolling

```typescript
<ion-virtual-scroll 
  [items]="filteredTodos()" 
  [itemHeight]="config().virtualScrollItemHeight"
  [trackBy]="trackByTodo">
```

### Signals for State Management

```typescript
todos = signal<TodoEntity[]>([]);
filteredTodos = computed(() => {
  // Reactive filtering logic
});
```

### Responsive Design

```typescript
currentView = signal<'mobile' | 'tablet' | 'desktop'>('mobile');
layoutClass = computed(() => {
  const width = this.screenWidth();
  if (width < 768) return 'mobile-layout';
  if (width < 1024) return 'tablet-layout';
  return 'desktop-layout';
});
```

### Clean Architecture DI

```typescript
// Domain layer injection
private
todoUseCases = inject(TodoUseCases);
private
categoryUseCases = inject(CategoryUseCases);

// Repository abstraction
{
  provide: TodoRepository, useClass
:
  TodoRepositoryImpl
}
```

## Development Guidelines

### SOLID Principles

- **S**ingle Responsibility - Each class has one reason to change
- **O**pen/Closed - Open for extension, closed for modification
- **L**iskov Substitution - Derived classes must be substitutable
- **I**nterface Segregation - Many specific interfaces vs one general
- **D**ependency Inversion - Depend on abstractions, not concretions

### Code Style

- Use standalone components
- Prefer signals over observables for local state
- Follow Clean Architecture boundaries
- Use dependency injection for all services
- Implement responsive design patterns

## Performance Optimizations

- Virtual scrolling for large lists
- Lazy loading with Angular router
- OnPush change detection strategy
- Computed signals for derived state
- Minimal bundle size with standalone components

## Firebase Remote Config

Configure app behavior remotely:

```typescript
interface AppConfig {
  maxTodosPerCategory: number;
  enableNotifications: boolean;
  defaultPriority: 'low' | 'medium' | 'high';
  theme: 'light' | 'dark' | 'auto';
  virtualScrollItemHeight: number;
}
```

## Contributing

1. Follow Clean Architecture principles
2. Use TypeScript strict mode
3. Write unit tests for use cases
4. Follow Angular style guide
5. Use conventional commits

## License

MIT License - see LICENSE file for details.
