import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.calendaap.app',
  appName: 'calendaap',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
