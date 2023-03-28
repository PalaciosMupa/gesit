import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FormatoService {
	pdfFormato: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router)
   { }

 abrirFormato() {
    this.pdfFormato = true;
  }

  cerrarFormato() {
    this.pdfFormato = false;
   // this.router.navigate(['/listClie']);
  }


}
