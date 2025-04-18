import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
// Import the Material preset and color palettes
import Material from '@primeng/themes/material';

// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';
// import { getStorage, provideStorage } from '@angular/fire/storage';

// --- Create the custom theme object ---
const MyTheme = {
    ...Material, // Start with the base Material preset
    colorScheme: {
      light: {
        primary: {
          //colorScheme: 'teal' // Assign the full teal palette
        '50': '#e0f2f7',
        '100': '#b2ebf2',
        '200': '#80deea',
        '300': '#4dd0e1',
        '400': '#26c6da',
        '500': '#00bcd4', // Main primary color (teal 500)
        '600': '#00acc1',
        '700': '#0097a7',
        '800': '#00838f',
        '900': '#006064',
        '950': '#004d40'
        },
        surface: {
         // colorScheme: 'zinc' // Assign the full zinc palette
          '0': '#ffffff', // Typically white for light mode surface 0
          '50': '#fafafa',
          '100': '#f4f4f5', // Main surface color (zinc 100)
          '200': '#e4e4e7',
          '300': '#d4d4d8',
          '400': '#a1a1aa',
          '500': '#71717a',
          '600': '#52525b',
          '700': '#3f3f46',
          '800': '#27272a',
          '900': '#18181b',
          '950': '#09090b'
        }
      },
      
    }
    // You can further customize other aspects of the Material preset here if desired
};
// --- End custom theme object ---


// TODO: Replace with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUKytxsHUuuqsr5sbAZOZ04WKBYuhXbos",
  authDomain: "doctracker-b4528.firebaseapp.com",
  projectId: "doctracker-b4528",
  storageBucket: "doctracker-b4528.firebasestorage.app",
  messagingSenderId: "213026976072",
  appId: "1:213026976072:web:40ff129938660330e3037d",
  measurementId: "G-WGK0Z3JVF8"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        // Use the customized theme object
        preset: MyTheme
      }
    }),

    // Firebase Providers
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore()),
    // provideStorage(() => getStorage()),
  ]
};
