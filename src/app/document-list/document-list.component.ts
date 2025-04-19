import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface DocumentMeta {
  name: string;
  url: string;
  uploadedAt?: any;
  id?: string; // Optional ID field for Firestore document
}

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
})
export class DocumentListComponent {
  private firestore = inject(Firestore);
  documents$: Observable<DocumentMeta[]>;

  constructor() {
    const docsRef = collection(this.firestore, 'documents');
    this.documents$ = collectionData(docsRef, { idField: 'id' }) as Observable<DocumentMeta[]>;
  }
}
