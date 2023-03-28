import { Component, OnInit, Input } from '@angular/core';
import { TicketModel } from '../../../models/ticket.model';
import { ReasignarService } from '../reasignar.service';
import {ServiciosService} from '../../../services/servicios.service';
import {UsuarioModel} from '../../../models/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { HttpEventType } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import swal from 'sweetalert2';

@Component({
  selector: 'app-reasignar',
  templateUrl: './reasignar.component.html',
  styleUrls: ['./reasignar.component.css']
})
export class ReasignarComponent implements OnInit {

	@Input() ticket: TicketModel;
	titulo: string = "Reasignar Ticket a otra persona";
	usuar: UsuarioModel[];
	usuario: UsuarioModel[];
	errores: string[];

  constructor(public reasignarService: ReasignarService, private activatedRoute: ActivatedRoute, private router: Router,
              private serviciosService: ServiciosService,private httpClient: HttpClient) { }

  ngOnInit(): void {

  	  this.serviciosService.getUsuario().subscribe(usuarioss => 
  	  	this.usuar = usuarioss.filter(item => item.cargo == "Tecnico" ));

  	 
  	  //  console.log("Tecnicos", this.usuario);
  }

   cerrarModal() {
    this.reasignarService.cerrarAsignar();
   // this.fotoSeleccionada = null;
    
    
  }


  reasignar(){

  

  	     this.serviciosService.updateTicket(this.ticket)
    .subscribe(
      json => {
      	swal.fire('Ticket reasignado', 'Se reasigno el Ticket con Exito', 'success');
        window.location.reload();
       
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    )
  }

}
