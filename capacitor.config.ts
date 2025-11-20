import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pragma.todoapp',
  appName: 'Pragma Todo App',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#3880ff',
      showSpinner: false
    },
    StatusBar: {
      style: 'default',
      backgroundColor: '#3880ff',
      overlaysWebView: false
    },
    Keyboard: {
      resize: 'body',
      style: 'dark'
    }
  }
};

export default config;
