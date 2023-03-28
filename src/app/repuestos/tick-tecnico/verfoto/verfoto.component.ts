import { Component, OnInit, Input } from '@angular/core';
import { TicketModel } from '../../../models/ticket.model';
import { FotoService } from '../foto.service';
import {ServiciosService} from '../../../services/servicios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-verfoto',
  templateUrl: './verfoto.component.html',
  styleUrls: ['./verfoto.component.css']
})
export class VerfotoComponent implements OnInit {

	@Input() ticket: TicketModel;
	titulo: string = "Imagen de la falla";
	private fotoSeleccionada: File;
	path: string= "http://localhost:8080/api/uploadsFalla/img/";
	variable: string = "";
    src: any = null;

  constructor(public fotoService: FotoService, private activatedRoute: ActivatedRoute, private router: Router,
              private serviciosService: ServiciosService,private httpClient: HttpClient) { }

  ngOnInit(): void {

  	this.src =`${this.path}${this.ticket.imagen}`; 

  	console.log("PAth",this.path);
  	console.log("Imagen", this.ticket.imagen);

  	console.log("Ruta", this.src);
  }

   cerrarModal() {
    this.fotoService.cerrarImagen();
    this.fotoSeleccionada = null;
    
  
    
  }

}
