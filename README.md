# Pragma Test Ionic - Todo App

A modern To-Do List application built with Ionic 7+ and Angular 17+ following Clean Architecture principles.

## Architecture

This application implements **Clean Architecture** with strict separation of concerns:

- **Domain Layer**: Business entities and repository interfaces
- **Data Layer**: Service implementations and data access
- **Presentation Layer**: UI components and pages

### Technologies

- **Framework**: Ionic 7 + Angular 17+
- **Architecture**: Clean Architecture + SOLID Principles
- **Components**: Standalone Components (Angular 17+)
- **State Management**: Angular Signals
- **Styling**: SCSS + Ionic CSS Variables
- **Language**: TypeScript (strict mode)
- **Mobile**: Capacitor 7 for hybrid builds
- **Backend**: Firebase Remote Config

## Features

### Core Functionality

- ✅ **Task Management**: Full CRUD operations (Create, Read, Update, Delete)
- ✅ **Category Management**: Full CRUD operations with color coding
- ✅ **Feature Flags**: Firebase Remote Config integration
- ✅ **Responsive Design**: Mobile, Tablet, and Desktop layouts
- ✅ **Dark Mode**: Automatic theme switching via feature flags

### Technical Features

- 📱 **Reactive State**: Angular Signals for efficient updates
- 🎯 **Clean Architecture**: Strict layer separation
- 🔥 **Firebase Integration**: Remote configuration management
- 📦 **Standalone Components**: Modern Angular architecture
- 🌙 **Theme Support**: Dynamic dark/light mode switching

## Setup & Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Ionic CLI: `npm install -g @ionic/cli`
- Capacitor CLI: `npm install -g @capacitor/cli`

### Installation Steps

1. **Clone and install dependencies**:
   ```bash
   cd pragma-test-ionic
   npm install
   ```

2. **Configure Firebase** (see Firebase Setup section below)

3. **Run the application**:
   ```bash
   ionic serve
   ```

## Firebase Setup

### 1. Firebase Configuration

Update the Firebase configuration in `src/environments/firebase.config.ts`:

```typescript
import {FirebaseOptions} from 'firebase/app';

export const firebaseConfig: FirebaseOptions = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### 2. Firebase Console Setup

1. **Create Firebase Project**: Go to [Firebase Console](https://console.firebase.google.com/)
2. **Enable Remote Config**: Navigate to Remote Config in your project
3. **Add Configuration Parameters**:

   | Parameter Key | Type | Default Value | Description |
      |---------------|------|---------------|-------------|
   | `enableAddTask` | Boolean | `true` | Controls Add Task button visibility |
   | `enableManagementCategories` | Boolean | `true` | Controls Category Management access |
   | `enableDarkMode` | Boolean | `false` | Enables automatic dark mode |

4. **Publish Configuration**: Click "Publish changes" in Firebase Console

### 3. Feature Flag Usage

The app will automatically fetch these flags on startup. To test different configurations:

- Modify values in Firebase Console
- Changes take effect within 5 seconds in development
- Production apps fetch every hour

## Build (Hybrid Mobile)

### Add Platforms

```bash
# Add Android platform
ionic capacitor add android

# Add iOS platform  
ionic capacitor add ios
```

### Build and Sync

```bash
# Build for Android
ionic capacitor build android

# Build for iOS
ionic capacitor build ios
```

### Open in Native IDE

```bash
# Open Android Studio
ionic capacitor open android

# Open Xcode
ionic capacitor open ios
```

### Alternative: Cordova Build

```bash
# Add platforms
ionic cordova platform add android
ionic cordova platform add ios

# Build
ionic cordova build android
ionic cordova build ios
```

## Testing

Run the comprehensive unit test suite:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Coverage

- **Domain Layer**: Model instantiation and property validation
- **Data Layer**: Service logic, state management, and reactive streams
- **Presentation Layer**: Component interactions and UI state changes

## Project Structure

```
src/app/
├── domain/           # Business logic layer
│   ├── models/       # Domain entities (Task, Category)
│   └── repositories/ # Repository interfaces
├── data/             # Data access layer
│   └── services/     # Service implementations
└── presentation/     # UI layer
    ├── components/   # Reusable components
    ├── pages/        # Page components
    └── layouts/      # Layout components
```

## Development Methodology and Technical Leadership

This project has been developed with a strong focus on efficiency and clean architecture. The code implementation was strategically guided through advanced Prompt Engineering techniques and the use of the **Amazon Q** coding assistant.

The AI tool acted as a high-performance executor, following precisely the guidelines of the Architect/Orchestra Coordinator (the developer). This ensured rigorous adherence to SOLID principles, Clean Architecture, and performance optimization in Ionic 7 + Angular 17.

### Methodological Approach

- **Architecture-Driven**: Strategic structure design before implementation
- **Prompt Engineering**: Precise instructions to maintain architectural consistency
- **Efficient Co-creation**: Combination of human technical vision and AI-assisted execution
- **Quality Assurance**: Continuous review of adherence to patterns and principles

## Development Guidelines

### SOLID Principles Implementation

- **S**ingle Responsibility: Each class has one reason to change
- **O**pen/Closed: Open for extension, closed for modification
- **L**iskov Substitution: Derived classes are substitutable
- **I**nterface Segregation: Specific interfaces over general ones
- **D**ependency Inversion: Depend on abstractions, not concretions

### Code Standards

- Use standalone components
- Prefer signals over observables for local state
- Follow Clean Architecture boundaries
- Implement comprehensive unit tests
- Use dependency injection for all services

## Contributing

1. Follow Clean Architecture principles
2. Use TypeScript strict mode
3. Write unit tests for all new features
4. Follow Angular style guide
5. Use conventional commits

## License

MIT License - see LICENSE file for details.
