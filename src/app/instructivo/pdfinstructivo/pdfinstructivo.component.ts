import { Component, OnInit, Input } from '@angular/core';
import {ImpresorasModel} from '../../models/impresoras.model';
import { ModaleService } from '../pdfinstructivo/modale.service';
import {ServiciosService} from '../../services/servicios.service';
import { HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-pdfinstructivo',
  templateUrl: './pdfinstructivo.component.html',
  styleUrls: ['./pdfinstructivo.component.css']
})
export class PdfinstructivoComponent implements OnInit {

	 @Input() impresora: ImpresorasModel;
	titulo: string = "Cargar Instructivos";
	private impresoraSeleccionada: File;
	progreso: number = 0;
	errores: string[];

  constructor(public modaleService: ModaleService, private activatedRoute: ActivatedRoute, private router: Router,
              private serviciosService: ServiciosService) { }

  ngOnInit(): void {
  }

    seleccionarFoto(event) {
    this.impresoraSeleccionada = event.target.files[0];
    this.progreso = 0;
   
    
  }

     subirFoto() {

    if (!this.impresoraSeleccionada) {
      swal.fire('Error Upload: ', 'Debe seleccionar una archivo', 'error');
    } else {
      this.serviciosService.subirImpresora(this.impresoraSeleccionada, this.impresora.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.impresora = response.impresora as ImpresorasModel;

            this.modaleService.notificarUpload.emit(this.impresora);
            swal.fire('El Instructivo se ha subido completamente!', response.mensaje, 'success');
          }
        });
    }
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
        this.router.navigate(['/instructivo']);
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
