import { Component, inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrl: './upload-document.component.scss',
  standalone: true,
  imports: [Button],
})
export class UploadDocumentComponent {
  selectedFile: File | null = null;
  uploadProgress: number | null = null;
  uploadUrl: string | null = null;
  private storage = inject(Storage);
  private firestore = inject(Firestore);

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  uploadDocument() {
    if (!this.selectedFile) return;
    const file = this.selectedFile;
    const filePath = `uploads/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.uploadProgress = Math.round(progress);
      },
      (error) => {
        alert('Upload failed: ' + error.message);
        this.uploadProgress = null;
      },
      async () => {
        try {
          this.uploadUrl = await getDownloadURL(storageRef);
          this.uploadProgress = null;
          // Save file metadata to Firestore
          await addDoc(collection(this.firestore, 'documents'), {
            name: file.name,
            url: this.uploadUrl,
            uploadedAt: serverTimestamp(),
          });
          alert('File uploaded and metadata saved!');
        } catch (error: any) {
          alert('Failed to save metadata: ' + error.message);
        }
      }
    );
  }
}
