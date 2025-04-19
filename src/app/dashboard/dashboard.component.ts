import { Component, inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { UploadDocumentComponent } from '../upload-document/upload-document.component';
import { DocumentListComponent } from '../document-list/document-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, UploadDocumentComponent, DocumentListComponent],
})
export class DashboardComponent {
  private firestore = inject(Firestore);
  documentsCount$: Observable<number>;

  constructor() {
    const docsRef = collection(this.firestore, 'documents');
    this.documentsCount$ = collectionData(docsRef).pipe(map((docs: any[]) => docs.length));
  }
}
