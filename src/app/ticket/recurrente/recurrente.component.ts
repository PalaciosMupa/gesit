import { Component, OnInit, Input } from '@angular/core';
import {ImpresorasModel} from '../../models/impresoras.model';
import { ModallService } from '../recurrente/modall.service';
import {ServiciosService} from '../../services/servicios.service';
import { HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-recurrente',
  templateUrl: './recurrente.component.html',
  styleUrls: ['./recurrente.component.css']
})
export class RecurrenteComponent implements OnInit {

@Input() impresora: ImpresorasModel;
	titulo: string = "Cargar Videos en Youtube de Problemas recurrentes";
	private impresoraSeleccionada: File;
	progreso: number = 0;
	errores: string[];
  constructor(public modaleService: ModallService, private activatedRoute: ActivatedRoute, private router: Router,
              private serviciosService: ServiciosService) { }

  ngOnInit(): void {
  }

     cerrarModal() {
    this.modaleService.cerrarModal();
    this.impresoraSeleccionada = null;
    
    this.progreso = 0;
   
    
  }


     cargarVideo(): void {
  
  this.serviciosService.updateImpresoras(this.impresora)
    .subscribe(
      json => {
        this.router.navigate(['/ticket']);
        swal.fire('El video fue cargado', 'Video agregado con éxito', 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    )
  }





}
