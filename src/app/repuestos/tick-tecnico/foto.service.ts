import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FotoService {
	imagen: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

    abrirImagen() {
    this.imagen = true;
  }

  cerrarImagen() {
    this.imagen = false;
   // this.router.navigate(['/listClie']);
  }
}
