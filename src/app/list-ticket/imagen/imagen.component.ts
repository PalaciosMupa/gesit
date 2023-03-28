import { Component, OnInit, Input } from '@angular/core';
import { TicketModel } from '../../models/ticket.model';
import { ImagenService } from './imagen.service';
import {ServiciosService} from '../../services/servicios.service';
import { HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.css']
})
export class ImagenComponent implements OnInit {

	@Input() ticket: TicketModel;
	titulo: string = "Cargar laimagen de la falla";
	private fotoSeleccionada: File;
	progreso: number = 0;

  constructor(public modalService: ImagenService, 
              private serviciosService: ServiciosService) { }

  ngOnInit(): void {
  }

     seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
   
    
  }

     subirFoto() {

    if (!this.fotoSeleccionada) {
      swal.fire('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.serviciosService.subirFotoTicket(this.fotoSeleccionada, this.ticket.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.ticket = response.Ticket as TicketModel;

            this.modalService.notificarUpload.emit(this.ticket);
            swal.fire('Imagen cargada completamente!', response.mensaje, 'success');
          }
        });
    }
  }

   cerrarModal() {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  
    
  }

}
