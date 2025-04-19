import { AsyncPipe, CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Firestore, collectionData, collection, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
  standalone: true,
  imports: [AsyncPipe, DatePipe, TitleCasePipe, CommonModule],
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
