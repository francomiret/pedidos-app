import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { FirebaseService } from '../firebase-service';

@Injectable({
  providedIn: 'root',
})
export class TorneoService {
  public torneos$: Observable<any[]>;

  constructor(private service: FirebaseService) {
    this.torneos$ = this.service
      .getPedidos()
      .pipe(map((x) => x.map((x) => x.payload.doc.data())));
  }
}
