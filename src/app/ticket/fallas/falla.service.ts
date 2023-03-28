import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FallaService {

 falla: boolean = false;

  constructor() { }

    abrirPDF() {
    this.falla = true;
  }

  cerrarPDF() {
    this.falla = false;
    
  }
}
