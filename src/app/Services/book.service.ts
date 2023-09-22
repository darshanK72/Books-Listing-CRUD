import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from '../Models/user';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  auth: AngularFireAuth = inject(AngularFireAuth);

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.hasToken()
  );
  private userName: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.getUserName()
  );

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get getName() {
    return this.userName.asObservable();
  }

  constructor(
    private firestore: Firestore,
    private storage: Storage,
    private router: Router
  ) {}

  hasToken(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  getUserName(): string {
    if (this.hasToken()) {
      let data = JSON.parse(localStorage.getItem('token') || ' ');
      return data.user.displayName;
    }
    return '';
  }

  loginUser(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password).then(
      async (data) => {
        localStorage.setItem('token', JSON.stringify(data));
        if (data.user?.emailVerified) {
          alert('Logged In Successfully');
          console.log(data);

          let user;
          if (data.user?.uid) {
            let docRef = doc(this.firestore, 'users', data.user.uid);
            const docSnap = await getDoc(docRef);
            user = docSnap.data() || {};
            this.userName.next(user['firstName'] + ' ' + user['lastName']);
          }

          this.loggedIn.next(true);
          this.router.navigate(['dashboard']);
        } else {
          alert('Please Verify Your Email Id !!');
        }
      },
      (error) => {
        alert('Error : ' + error.message);
      }
    );
  }

  googleSingIn() {
    this.auth.signInWithPopup(new GoogleAuthProvider()).then(
      async (data) => {
        localStorage.setItem('token', JSON.stringify(data));
        alert('Logged In Successfully');
        this.loggedIn.next(true);

        let user;
        if (data.user?.uid) {
          let docRef = doc(this.firestore, 'users', data.user.uid);
          const docSnap = await getDoc(docRef);
          user = docSnap.data() || {};
          this.userName.next(user['firstName']+ ' ' + user['lastName']);
        }

        this.router.navigate(['dashboard']);
      },
      (error) => {
        alert('Error : ' + error.message);
        this.router.navigate(['login']);
      }
    );
  }

  registerUser(user: User) {
    this.auth.createUserWithEmailAndPassword(user.email, user.password).then(
      (data) => {
        if (data.user?.uid) {
          let docRef = doc(this.firestore, 'users', data.user.uid);
          setDoc(docRef, user).then(
            () => {
              data.user?.sendEmailVerification().then(() => {
                alert('Email verification is send to your email!!');
                this.router.navigate(['login']);
              });
            },
            (error) => {
              alert(error.message);
            }
          );
        }
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  logoutUser() {
    this.auth.signOut().then(
      () => {
        localStorage.clear();
        this.loggedIn.next(false);
        this.userName.next('');
        this.router.navigate(['login']);
      },
      (error) => {
        alert('Error : ' + error.message);
      }
    );
  }

  forgetPassword(email:string){
    this.auth.sendPasswordResetEmail(email).then(()=>{
      alert("Password reset link is send to your email !!");
      this.router.navigate(["login"]);
    },err => {
      alert(err.message);
      this.router.navigate(["forget"]);
    })
  }
}
