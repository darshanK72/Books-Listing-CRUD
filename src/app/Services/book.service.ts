import { Injectable} from '@angular/core';
import { doc, Firestore, getDoc, setDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Router } from '@angular/router';
import { User } from '../Models/user';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { FirebaseApp, initializeApp} from 'firebase/app';
import { BehaviorSubject} from 'rxjs';
import { getFirestore } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  app:FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  storage:any;

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());
  private loggedInUser: BehaviorSubject<any> = new BehaviorSubject<any>(this.getUserDetails());

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get getLoggedInUser() {
    return this.loggedInUser.asObservable();
  }

  constructor(private router: Router,private toast: ToastrService) {
    this.app = initializeApp(environment.firebase);
    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app);
    this.storage = getStorage(this.app);
  }

  hasToken(): boolean {
    return localStorage.getItem('token') ? true:false;
  }

  getUserDetails(): any {
    let userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  }

  loginUser(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password).then(
      async (data) => {
        if (data.user?.emailVerified) {
          localStorage.setItem('token', JSON.stringify(data));
          this.toast.success('Logged In Successfully', 'Success', {
            timeOut: 3000,
          });
          if (data.user?.uid) {
            let docRef = doc(this.firestore, 'users', data.user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              this.loggedInUser.next(docSnap.data());
              localStorage.setItem('user', JSON.stringify(docSnap.data()));
            }
          }

          this.loggedIn.next(true);
          this.router.navigate(['dashboard']);

        } else {
          this.toast.info('Please Verify Your Email Id !!', 'Info', {
            timeOut: 3000,
          });
        }
      },
      (error) => {
        this.toast.error(error.message, 'Error', { timeOut: 4000 });
      }
    );
  }

  googleSingIn() {
    signInWithPopup(this.auth, new GoogleAuthProvider()).then(
      async (data) => {
        localStorage.setItem('token', JSON.stringify(data));
        this.toast.success('Logged In Successfully', 'Success', {
          timeOut: 3000,
        });
        this.loggedIn.next(true);
        if (data.user?.uid) {
          let docRef = doc(this.firestore, 'users', data.user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            this.loggedInUser.next(docSnap.data());
            localStorage.setItem('user', JSON.stringify(docSnap.data()));
          }
        }

        this.router.navigate(['dashboard']);
      },
      (error) => {
        this.toast.error(error.message, 'Error', { timeOut: 4000 });
        this.router.navigate(['login']);
      }
    );
  }

  registerUser(user: User) {
    createUserWithEmailAndPassword(this.auth, user.email, user.password).then(
      (data) => {
        if (data.user?.uid) {
          let docRef = doc(this.firestore, 'users', data.user.uid);
          setDoc(docRef, user).then(
            () => {
              sendEmailVerification(data.user).then(() => {
                this.toast.info(
                  'Email verification is send to your email!!',
                  'Info',
                  { timeOut: 3000 }
                );
                this.router.navigate(['login']);
              });
            },
            (error) => {
              this.toast.error(error.message, 'Error', { timeOut: 4000 });
            }
          );
        }
      },
      (error) => {
        this.toast.error(error.message, 'Error', { timeOut: 4000 });
      }
    );
  }

  logoutUser() {
    this.auth.signOut().then(
      () => {
        localStorage.clear();
        this.loggedIn.next(false);
        this.loggedInUser.next('');
        this.router.navigate(['login']);
        this.toast.success('Logout Successfully!', 'Success', {
          timeOut: 3000,
        });
      },
      (error) => {
        this.toast.error(error.message, 'Error', { timeOut: 4000 });
      }
    );
  }

  forgetPassword(email: string) {
    sendPasswordResetEmail(this.auth, email).then(
      () => {
        this.toast.info(
          'Email verification link is send to your email!!',
          'Info',
          { timeOut: 3000 }
        );
        this.router.navigate(['login']);
      },
      (err) => {
        this.toast.error(err.message, 'Error', { timeOut: 4000 });
        this.router.navigate(['forget']);
      }
    );
  }
}
