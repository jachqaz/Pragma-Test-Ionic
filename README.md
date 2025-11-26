# Pragma Test Ionic - Todo App

[![Build Status](https://github.com/jachqaz/Pragma-Test-Ionic/actions/workflows/main.yml/badge.svg)](https://github.com/jachqaz/Pragma-Test-Ionic/actions)

A modern To-Do List application built with Ionic 7+ and Angular 17+ following Clean Architecture principles, powered by Cordova for native mobile functionality.

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
- **Native Runtime**: Apache Cordova
- **Backend**: Firebase Remote Config

## Features

### Core Functionality

- ✅ **Task Management**: Full CRUD operations (Create, Read, Update, Delete)
- ✅ **Category Management**: Full CRUD operations with color coding
- ✅ **Feature Flags**: Firebase Remote Config integration
- ✅ **Responsive Design**: Mobile, Tablet, and Desktop layouts
- ✅ **Dark Mode**: Automatic theme switching via feature flags

### Technical Features

- 📱 **Native Mobile**: Cordova-powered hybrid application
- 🔄 **Reactive State**: Angular Signals for efficient updates
- 🎯 **Clean Architecture**: Strict layer separation
- 🔥 **Firebase Integration**: Remote configuration management
- 📦 **Standalone Components**: Modern Angular architecture
- 🌙 **Theme Support**: Dynamic dark/light mode switching
- 🚀 **Cross-Platform**: Single codebase for web, Android, and iOS

## Setup & Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Ionic CLI: `npm install -g @ionic/cli`
- Cordova CLI: `npm install -g cordova`

### Installation Steps

1. **Clone and install dependencies**:
   ```bash
   git clone https://github.com/jachqaz/Pragma-Test-Ionic.git
   cd pragma-test-ionic
   npm install
   ```

2. **Configure Firebase** (see Firebase Setup section below)

3. **Run the web application**:
   ```bash
   ionic serve
   ```

4. **Add mobile platforms**:
   ```bash
   # Add Android platform
   ionic cordova platform add android
   
   # Add iOS platform  
   ionic cordova platform add ios
   ```

5. **Run on mobile devices**:
   ```bash
   # Run on Android
   ionic cordova run android
   
   # Run on iOS
   ionic cordova run ios
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

### 3. Feature Flags & Remote Config

The application uses Firebase Remote Config to control feature availability through three main flags:

#### Feature Flag Details

- **`enableAddTask`**: Controls the visibility and availability of the "Add Task" functionality, including the FAB (Floating Action Button) and add task buttons throughout the application.
- **`enableManagementCategories`**: Controls the visibility and availability of the "Category Management" feature, allowing users to create, edit, and delete task categories.
- **`enableDarkMode`**: Controls the application's Dark Mode theme setting, enabling automatic dark/light theme switching based on system preferences or manual toggle.

#### Usage

The app automatically fetches these flags on startup. To test different configurations:

- Modify values in Firebase Console
- Changes take effect within 5 seconds in development
- Production apps fetch every hour

### 4. Configuración Segura de Firebase (CI/CD)

For security reasons, Firebase configuration is dynamically injected during the CI/CD build process to protect API keys. The configuration file must **never** be committed to the repository.

#### Required GitHub Secrets

Configure the following secrets in your GitHub repository settings:

- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`
- `FIREBASE_MEASUREMENT_ID`

#### Dynamic Configuration Injection

The `.github/workflows/main.yml` file uses the following command to generate the secure Firebase configuration:

```bash
cat > src/environments/firebase.config.ts << EOF
import {FirebaseOptions} from 'firebase/app';

export const firebaseConfig: FirebaseOptions = {
  apiKey: "${{ secrets.FIREBASE_API_KEY }}",
  authDomain: "${{ secrets.FIREBASE_AUTH_DOMAIN }}",
  projectId: "${{ secrets.FIREBASE_PROJECT_ID }}",
  storageBucket: "${{ secrets.FIREBASE_STORAGE_BUCKET }}",
  messagingSenderId: "${{ secrets.FIREBASE_MESSAGING_SENDER_ID }}",
  appId: "${{ secrets.FIREBASE_APP_ID }}",
  measurementId: "${{ secrets.FIREBASE_MEASUREMENT_ID }}"
};
EOF
```

This ensures the `FirebaseRemoteConfigService` can properly initialize while keeping sensitive configuration secure.

## Cordova Configuration

### Core Plugins

The application uses essential Cordova plugins for native functionality:

```xml
<!-- config.xml - Core plugins -->
<plugin name="cordova-plugin-whitelist" spec="^1.3.5"/>
<plugin name="cordova-plugin-statusbar" spec="^4.0.0"/>
<plugin name="cordova-plugin-device" spec="^2.1.0"/>
<plugin name="cordova-plugin-splashscreen" spec="^6.0.2"/>
<plugin name="cordova-plugin-ionic-webview" spec="^5.0.0"/>
<plugin name="cordova-plugin-ionic-keyboard" spec="^2.2.0"/>
```

### Platform Detection

The application uses Ionic's Platform service to detect the runtime environment:

```typescript
import {Platform} from '@ionic/angular';

constructor(private
platform: Platform
)
{
  this.platform.ready().then(() => {
    if (this.platform.is('cordova')) {
      // Native Cordova environment
      console.log('Running on native platform');
    } else {
      // Web browser environment
      console.log('Running in web browser');
    }
  });
}
```

### Plugin Integration

When adding new Cordova plugins, follow this pattern:

1. **Install the plugin**:
   ```bash
   ionic cordova plugin add cordova-plugin-name
   npm install @awesome-cordova-plugins/plugin-name
   ```

2. **Import and inject**:
   ```typescript
   import { PluginName } from '@awesome-cordova-plugins/plugin-name/ngx';
   
   constructor(private pluginName: PluginName) {}
   ```

3. **Use with platform detection**:
   ```typescript
   if (this.platform.is('cordova')) {
     this.pluginName.someMethod().then(result => {
       // Handle native result
     });
   }
   ```

## Build & Deployment

### Development Builds

```bash
# Web development server
ionic serve

# Android development build
ionic cordova build android

# iOS development build  
ionic cordova build ios

# Run on connected Android device/emulator
ionic cordova run android

# Run on connected iOS device/simulator
ionic cordova run ios
```

### Production Builds

```bash
# Web production build
ionic build --prod

# Android production build (generates APK)
ionic cordova build android --prod --release --no-interactive

# iOS production build (generates IPA)
ionic cordova build ios --prod --release --no-interactive
```

### Platform Management

```bash
# List installed platforms
ionic cordova platform list

# Remove a platform
ionic cordova platform remove android
ionic cordova platform remove ios

# Update platform
ionic cordova platform update android
ionic cordova platform update ios
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

# Run tests for CI/CD
npm run test:ci
```

### Test Coverage

- **Domain Layer**: Model instantiation and property validation
- **Data Layer**: Service logic, state management, and reactive streams
- **Presentation Layer**: Component interactions and UI state changes

## CI/CD Pipeline & GitHub Actions

🔗 **[View Build Status & Artifacts](https://github.com/jachqaz/Pragma-Test-Ionic/actions)**

### Automated Build Pipeline

The entire build and deployment process is automated through GitHub Actions, with all logic centralized in `.github/workflows/main.yml`. This ensures consistent builds across all platforms and environments.

### Build Triggers

- **Automatic**: Every push to `main` branch
- **Manual**: Workflow dispatch for on-demand builds
- **Pull Requests**: Validation builds for code review

### Generated Artifacts

The CI/CD pipeline produces three deployment-ready artifacts:

1. **Web Application**: Production-optimized web build with Firebase integration
2. **Android APK**: Native Android application package ready for distribution
3. **iOS IPA**: iOS application archive ready for App Store or TestFlight

### Build Process

**Unified Workflow** (`.github/workflows/main.yml`):

1. **Environment Setup**: Node.js, Java, and Cordova CLI installation
2. **Dependency Installation**: npm packages and Cordova plugins
3. **Firebase Configuration**: Secure injection of environment variables
4. **Multi-Platform Builds**: Parallel web, Android, and iOS compilation
5. **Artifact Generation**: Packaged applications ready for deployment

### Security & Configuration

- Firebase configuration is securely injected via GitHub Secrets
- Mobile builds require signing certificates (configured in repository secrets)
- All sensitive data is protected and never exposed in logs

### Platform-Specific Requirements

**Android Build Requirements:**

- Java 17 JDK
- Android SDK and build tools
- Signing keystore (for release builds)

**iOS Build Requirements:**

- Xcode command line tools
- iOS provisioning profiles
- Distribution certificates

## Project Structure

```
├── config.xml              # Cordova configuration
├── ionic.config.json       # Ionic project configuration
├── src/
│   ├── app/
│   │   ├── domain/          # Business logic layer
│   │   │   ├── models/      # Domain entities (Task, Category)
│   │   │   └── repositories/# Repository interfaces
│   │   ├── data/            # Data access layer
│   │   │   └── services/    # Service implementations
│   │   ├── presentation/    # UI layer
│   │   │   ├── components/  # Reusable components
│   │   │   ├── pages/       # Page components
│   │   │   └── layouts/     # Layout components
│   │   └── testing/         # Test utilities and mocks
│   ├── environments/        # Environment configurations
│   └── theme/              # Global styling
├── platforms/              # Cordova platform builds (generated)
├── plugins/               # Cordova plugins (generated)
├── www/                   # Built web assets (generated)
└── .github/workflows/     # CI/CD pipeline configuration
```

## Development Methodology and Technical Leadership

This Cordova-based Ionic application has been architected with a strong focus on efficiency, scalability, and clean code principles. The implementation follows industry best practices for hybrid mobile development.

### Technical Excellence

- **Hybrid Architecture**: Leveraging Cordova's mature plugin ecosystem
- **Cross-Platform Optimization**: Single codebase for web, Android, and iOS
- **Performance-First**: Optimized for mobile device constraints
- **Native Integration**: Seamless access to device capabilities through Cordova plugins

### Methodological Approach

- **Architecture-Driven**: Strategic structure design with Clean Architecture
- **Mobile-First**: Cordova-optimized development patterns
- **Platform-Aware**: Conditional logic for web vs. native environments
- **Quality Assurance**: Comprehensive testing with Cordova plugin mocks

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

## Troubleshooting

### Common Cordova Issues

**Platform Build Failures:**

```bash
# Clean and rebuild platforms
ionic cordova platform remove android
ionic cordova platform add android
ionic cordova build android
```

**Plugin Installation Issues:**

```bash
# Clear Cordova cache
cordova clean
npm install
ionic cordova prepare
```

**iOS Build Issues:**

```bash
# Update iOS platform
ionic cordova platform update ios
# Open in Xcode for manual configuration
open platforms/ios/*.xcworkspace
```

**Android Build Issues:**

```bash
# Check Android SDK configuration
ionic cordova requirements android
# Update Android platform
ionic cordova platform update android
```

### Development Tips

- Always test on actual devices for native functionality
- Use `ionic cordova run android --device` for device testing
- Monitor device logs: `ionic cordova run android --consolelogs`
- Use Chrome DevTools for debugging web views

## Contributing

1. Follow Clean Architecture principles
2. Use TypeScript strict mode
3. Write unit tests for all new features
4. Test on both web and native platforms
5. Mock Cordova plugins in unit tests
6. Follow Angular style guide
7. Use conventional commits

## License

MIT License - see LICENSE file for details.
