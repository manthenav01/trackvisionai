import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient

import { routes } from './app.routes';

// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore'; // Add if you use Firestore
// import { getStorage, provideStorage } from '@angular/fire/storage'; // Add if you use Storage

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
    provideHttpClient(), // Provide HttpClient

    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
// provideFirestore(() => getFirestore()), // Add if you use Firestore
      // provideStorage(() => getStorage()),

  ]
};
