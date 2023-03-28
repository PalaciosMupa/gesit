import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReasignarService {
	asignar: boolean = false;

  constructor() { }

      abrirAsignar() {
    this.asignar = true;
  }

  cerrarAsignar() {
    this.asignar = false;
   // this.router.navigate(['/listClie']);
  }
}
