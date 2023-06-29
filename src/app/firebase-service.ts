import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {
    this.getPedidos();
  }

  public getPedidos() {
    return this.firestore.collection('pedidos').snapshotChanges();
  }
}