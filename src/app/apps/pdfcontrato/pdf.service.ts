import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
 pdf: boolean = false;

 

  constructor(private activatedRoute: ActivatedRoute, private router: Router,) { }

  

  abrirPDF() {
    this.pdf = true;
  }

  cerrarPDF() {
    this.pdf = false;
    this.router.navigate(['/listClie']);
  }
}
