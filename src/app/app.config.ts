import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

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
    // Firebase Providers
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAnimationsAsync(),
  ]
};
