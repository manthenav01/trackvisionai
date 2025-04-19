import { AsyncPipe, CommonModule, DatePipe, TitleCasePipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Firestore, collectionData, collection, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
// Angular Material modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

interface DocumentMeta {
  name: string;
  url: string;
  uploadedAt?: any;
  id?: string; // Optional ID field for Firestore document
  status: string; // Optional status field for document
}

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    TitleCasePipe,
    CommonModule,
    NgClass,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
})
export class DocumentListComponent {
  private firestore = inject(Firestore);
  documents$: Observable<DocumentMeta[]>;

  constructor() {
    const docsRef = collection(this.firestore, 'documents');
    this.documents$ = collectionData(docsRef, { idField: 'id' }) as Observable<DocumentMeta[]>;
  }

  deleteDocument(document: DocumentMeta) {
    if (!document.id) return;
    const docRef = doc(this.firestore, `documents/${document.id}`);
    deleteDoc(docRef).catch(error => {
      console.error('Error deleting document:', error);
    });
  }
}
