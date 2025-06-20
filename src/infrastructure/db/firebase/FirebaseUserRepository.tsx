import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import {User} from '../../../domain/entities/User';
import { db } from "./firebaseClient";

import {
    collection,
    doc,
    setDoc,
    getDoc,
  } from "firebase/firestore";
  
  export class FirebaseUserRepository implements IUserRepository {
    private usersRef = collection(db, "users");
  
    async create(user: User): Promise<User> {
      const userDoc = doc(this.usersRef, user.id);
      await setDoc(userDoc, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        password: user.password,
        termsAgreed: user.termsAgreed,
        receiveEmails: user.receiveEmails
      });
      return user;
    }
  
    async findById(id: string): Promise<User | null> {
      const userDoc = doc(this.usersRef, id);
      const snapshot = await getDoc(userDoc);
  
      if (!snapshot.exists()) return null;
  
      const data = snapshot.data();
      return new User(id, data.firstName, data.lastName, data.passwordHash, data.email, data.phone, data.termsAgreed, data.receiveEmails);
    }
  }