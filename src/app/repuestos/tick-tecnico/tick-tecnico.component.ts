import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import { TicketModel } from '../../models/ticket.model';
import {UsuarioModel} from '../../models/usuario.model';
import { FotoService } from '../tick-tecnico/foto.service';
import { ReasignarService } from '../tick-tecnico/reasignar.service';
import {ServiciosService} from '../../services/servicios.service';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'app-tick-tecnico',
  templateUrl: './tick-tecnico.component.html',
  styleUrls: ['./tick-tecnico.component.css']
})
export class TickTecnicoComponent implements OnInit {

	  @ViewChild(MatSidenav)
     sidenav!: MatSidenav;
     autenticado:boolean = false;
     tickets: TicketModel[];
     ticke: TicketModel[];
     usuarios: UsuarioModel[];
     clienteSeleccionado: TicketModel;
     clienteSeleccionad: TicketModel;
     id: number;
     fechaHoy = null;
	hora = null;
	pipe = new DatePipe('en-US');
	errores: string[];

  constructor(private observer: BreakpointObserver,private serviciosService: ServiciosService,
               private activatedRoute: ActivatedRoute, private router: Router, private modalService: FotoService,
               public authService: LoginService, private reasignarService: ReasignarService) { }

    ngAfterViewInit(){
    this.observer.observe(['(max-width: 800px)']).subscribe((res) =>{
      if(res.matches){
        this.sidenav.mode = 'over';
        this.sidenav.close();
      }else{
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    })
  }

  ngOnInit(): void {

  	  if (this.authService.isAuthenticated()) {
      this.autenticado = true;
    }



    console.log("Username",this.authService.usuario.username);
    this.serviciosService.getUsuario().subscribe((usuarioss:any) => {
     this.usuarios = usuarioss.filter(
     (usuarioss:any) => usuarioss.username == this.authService.usuario.username)
      console.log("Usuarios", this.usuarios);
      console.log("id", this.usuarios[0].id);
      
      this.id = this.usuarios[0].id;
     

     });

      this.serviciosService.getTicket().subscribe(
      resp => {

    this.tickets = resp.filter(item => item.usuario.id == this.id)

  //  let newarr = this.cuentas.sort((a, b) => b.numero - a.numero);

   // Con este codigo organizamos la tabla por fecha de manera descendente
        this.tickets = this.tickets.sort((a: any, b: any) => <any>new Date(b.fechaInicio) -  <any>new Date(a.fechaInicio));
        
  
        
        }
    );

  }

    logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }

     abrirImagen(ticket: TicketModel) {
    this.clienteSeleccionado = ticket;
    this.modalService.abrirImagen();
  }


  abrirReasignar(ticket: TicketModel) {
    this.clienteSeleccionad = ticket;
    this.reasignarService.abrirAsignar();
  }

   cerrar(tickets: TicketModel): void {
    swal.fire({
  title: 'Esta usted Seguro?',
  text: "No se podra revertir esto!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, Cerrar Ticket!'
}).then((result) => {
        if (result.isConfirmed) {


        	 this.ticke =  this.tickets.filter(option => option.id === tickets.id);

        let today = new Date();
        this.fechaHoy = this.pipe.transform(today, 'yyyy-MM-dd');
        this.hora = this.pipe.transform(today, 'HH:mm');
       

            this.ticke[0].horaCierre = this.hora;
            this.ticke[0].fechaCierre = this.fechaHoy;
           
              
          this.serviciosService.updateTicket(this.ticke[0])
    .subscribe(
      json => {
       
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    )

        }
      });
    }

   onSelect(data: any): void {
       console.log('Item clicked', JSON.parse(JSON.stringify(data)));
     }

     onActivate(data: any): void {
       console.log('Activate', JSON.parse(JSON.stringify(data)));
     }

     onDeactivate(data: any): void {
       console.log('Deactivate', JSON.parse(JSON.stringify(data)));
     }


}
