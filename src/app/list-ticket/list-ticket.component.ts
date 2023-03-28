import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import { TicketModel } from '../models/ticket.model';
import { ImagenService } from './imagen/imagen.service';
import {ServiciosService} from '../services/servicios.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';
import {UsuarioModel} from '../models/usuario.model';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit {

	@ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  autenticado:boolean = false;
  tickets: TicketModel[];
  ticketsTodos: TicketModel[];
  usuarios: UsuarioModel[];
  apellido: string;
  nombre: string;
  clienteSeleccionado: TicketModel;

  constructor(private observer: BreakpointObserver, private serviciosService: ServiciosService,
              private activatedRoute: ActivatedRoute, private router: Router, private modalService: ImagenService,
              public authService: LoginService) { }

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

    this.serviciosService.getUsuario().subscribe((usuarioss:any) => {
     this.usuarios = usuarioss.filter(
     (usuarioss:any) => usuarioss.username == this.authService.usuario.username)
      
      this.apellido = this.usuarios[0].apellido;
      this.nombre = this.usuarios[0].nombre;
     

     })


     this.serviciosService.getTicket().subscribe(
      resp => {
 
    this.ticketsTodos = resp;

    this.tickets = resp.filter(item => item.apellido == this.apellido && item.nombre == this.nombre)

  //  let newarr = this.cuentas.sort((a, b) => b.numero - a.numero);
  // Con este codigo organizamos la tabla por fecha de manera descendente
        this.tickets = this.tickets.sort((a: any, b: any) => <any>new Date(b.fechaInicio) -  <any>new Date(a.fechaInicio));
        
         this.ticketsTodos = this.ticketsTodos.sort((a: any, b: any) => <any>new Date(b.fechaInicio) -  <any>new Date(a.fechaInicio));
        
       
        }
    );

  }

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }

   abrirModal(ticket: TicketModel) {
    this.clienteSeleccionado = ticket;
    this.modalService.abrirModal();
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
