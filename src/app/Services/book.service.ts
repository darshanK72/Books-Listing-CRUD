import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';
import { FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { environment } from 'src/environments/environment';
import { Book } from '../Models/book';
@Injectable({
  providedIn: 'root',
})
export class BookService {
  app: FirebaseApp;
  firestore: Firestore;
  storage: FirebaseStorage;

  constructor() {
    this.app = initializeApp(environment.firebase);
    this.firestore = getFirestore(this.app);
    this.storage = getStorage(this.app);
  }

  getAllBooks(){
    let collectionInstance = collection(this.firestore,'books');
    return getDocs(collectionInstance);
  }

  getBook(bookId:string){
    let docRef = doc(this.firestore,"books",bookId);
    return getDoc(docRef);
  }

  postBook(file:File,book: Book) {
    let collectionInstance = collection(this.firestore, 'books');
    let url = this.uploadFile(file);
    console.log(url);
    book.imageLink = url;
    return addDoc(collectionInstance, Object(book));
  }

  updateBook(book:Book){
    let docRef = doc(this.firestore,'books',book.bookId);
    return updateDoc(docRef,Object(book));
  }

  deleteBook(bookId:string){
    let docRef = doc(this.firestore,'books',bookId);
    return deleteDoc(docRef);
  }

  uploadFile(file:File){
    let url = '';
    let storageRef = ref(this.storage, file.name);
    let uploadRef = uploadBytesResumable(storageRef,file);

    uploadRef.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },(error) =>{
        console.log(error);
      },() => {
        getDownloadURL(uploadRef.snapshot.ref).then((downloadURL) => {
          url = downloadURL;
        });
      });
      return url;
  }

  async createFile(path: string, name: string, type: string): Promise<File> {
    let response = await fetch(path);
    let data = await response.blob();
    let metadata = {
      type: type,
    };
    return new File([data], name, metadata);
  }
}
