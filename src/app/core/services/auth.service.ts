import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  User,
  authState,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState$ = authState(this.afAuth);

  constructor(private afAuth: Auth) {}

  async register(email: string, password: string): Promise<User> {
    try {
      const { user } = await createUserWithEmailAndPassword(
        this.afAuth,
        email,
        password
      );
      console.log('User -->', user);
      await signInWithEmailAndPassword(this.afAuth, email, password);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await signInWithEmailAndPassword(
        this.afAuth,
        email,
        password
      );
      // this.updateUserData(user)
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async logout() {
    try {
      await signOut(this.afAuth);
    } catch (error) {
      console.log('Error -->', error);
    }
  }

  async resetPassword(email: string): Promise<any> {
    try {
      return sendPasswordResetEmail(this.afAuth, email);
    } catch (error) {
      console.log('Error -->', error);
    }
  }

  async sendEmailVerification(user: User): Promise<void> {
    try {
      return await sendEmailVerification(user);
    } catch (error) {
      console.log('Error -->', error);
    }
  }

  isEmailVerified(user: User) {
    return user.emailVerified === true ? true : false;
  }

  // private updateUserData(user: UserAuth) {
  //   const userRef: AngularFirestoreDocument<UserAuth> = this.afs
  //     .collection('users')
  //     .doc(user.uid);
  //   // console.log('userRef -->', userRef)
  //   const data: UserAuth = {
  //     uid: user.uid,
  //     email: user.email,
  //     emailVerified: user.emailVerified,
  //     displayName: user.displayName,
  //   };
  //   return userRef.set(data, { merge: true });
  // }
}
