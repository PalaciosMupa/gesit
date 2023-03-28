import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerpdfService {
	 pdf: boolean = false;

  constructor() { }

    abrirPDF() {
    this.pdf = true;
  }

  cerrarPDF() {
    this.pdf = false;
    
  }
}
