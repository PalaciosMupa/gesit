import { Component, OnInit, Input } from '@angular/core';
import { ClientesModel } from '../../models/clientes.model';
import { ModalService } from './modal.service';
import {ServiciosService} from '../../services/servicios.service';
import { HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit {

	 @Input() cliente: ClientesModel;
	titulo: string = "Cargar documentos  del Cliente";
	private fotoSeleccionada: File;
  private fotoSeleccionadaSAT: File;
  private fotoSeleccionadaIden: File;
  private fotoSeleccionadaDom: File;
    progreso: number = 0;
    progresoF: number = 0;
    progresoI: number = 0;
    progresoD: number = 0;

  constructor(public modalService: ModalService, 
              private serviciosService: ServiciosService) { }

  ngOnInit(): void {

    console.log("Cliente",this.cliente.id);
  }

   seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
   
    
  }

   seleccionarFiscal(event) {
    this.fotoSeleccionadaSAT = event.target.files[0];
    this.progresoF = 0;
    
    
  }

    SelIdentificacion(event) {
    this.fotoSeleccionadaIden = event.target.files[0];
    this.progresoI = 0;
    
    
  }

     seleccionarDom(event) {
    this.fotoSeleccionadaDom = event.target.files[0];
    this.progresoD = 0;
    
    
  }

   subirFoto() {

    if (!this.fotoSeleccionada) {
      swal.fire('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.serviciosService.subirFoto(this.fotoSeleccionada, this.cliente.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.cliente = response.cliente as ClientesModel;

            this.modalService.notificarUpload.emit(this.cliente);
            swal.fire('El Contrato se ha subido completamente!', response.mensaje, 'success');
          }
        });
    }
  }

    subirFiscal() {

    if (!this.fotoSeleccionadaSAT) {
      swal.fire('Error Upload: ', 'Debe seleccionar una Constancia', 'error');
    } else {
      this.serviciosService.subirFiscal(this.fotoSeleccionadaSAT, this.cliente.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progresoF = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.cliente = response.cliente as ClientesModel;

            this.modalService.notificarUpload.emit(this.cliente);
            swal.fire('La Constancia se ha subido completamente!', response.mensaje, 'success');
          }
        });
    }
  }

    subirIdentific() {

    if (!this.fotoSeleccionadaIden) {
      swal.fire('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.serviciosService.subirIdentif(this.fotoSeleccionadaIden, this.cliente.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progresoI = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.cliente = response.cliente as ClientesModel;

            this.modalService.notificarUpload.emit(this.cliente);
            swal.fire('La Identificación se ha subido completamente!', response.mensaje, 'success');
          }
        });
    }
  }

     subirDom() {

    if (!this.fotoSeleccionadaDom) {
      swal.fire('Error Upload: ', 'Debe seleccionar un Comprobante de Domicilio', 'error');
    } else {
      this.serviciosService.subirDom(this.fotoSeleccionadaDom, this.cliente.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progresoD = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.cliente = response.cliente as ClientesModel;

            this.modalService.notificarUpload.emit(this.cliente);
            swal.fire('El Comprobante de domicilio se ha subido completamente!', response.mensaje, 'success');
          }
        });
    }
  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.fotoSeleccionadaSAT = null;
    this.fotoSeleccionadaDom = null;
    this.fotoSeleccionadaIden = null;
    this.progreso = 0;
    this.progresoF = 0;
    this.progresoI = 0;
    this.progresoD = 0;
    
  }


}
