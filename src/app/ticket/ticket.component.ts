import { Component, OnInit, ViewChild, Input  } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { TicketService } from './ticket.service';
import { LoginService } from '../services/login.service';
import {ServiciosService} from '../services/servicios.service';
import {RepuestosModel} from '../models/repuestos.model';
import { ClientesModel } from '../models/clientes.model';
import { CuentaModel } from '../models/cuenta.model';
import { TicketModel } from '../models/ticket.model';
import {UsuarioModel} from '../models/usuario.model';
import {UsuarioRolModel} from '../models/usuariorol.model';
import {InventarioModel} from '../models/inventario.model';
import { ModallService } from './recurrente/modall.service';
import { FallaService } from './fallas/falla.service';


import {ImpresorasModel} from '../models/impresoras.model';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { filter } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
	@Input() cliente: ClientesModel;
	myControl = new FormControl('');
	filteredOptions: Observable<string[]>;
	@ViewChild(MatSidenav)
	sidenav!: MatSidenav;

  impres: ImpresorasModel[];
  impreso: ImpresorasModel[]; 
  Modelo: any;

   atasco:boolean = false;
  rayas:boolean = false;
  impre:boolean = false;
  config:boolean = false;
  escanea:boolean = false;
  mancha:boolean = false;

	autenticado:boolean = false;
	ticket:boolean=false;
	agregar:boolean=false;
	recurrente:boolean=false;
	serie: string[] = [];
	telef: string;
	telef2: string;
	area: string = "";
	subarea:  string ="";
	nom: string;
	apellido: string;
  id: number;
	pipe = new DatePipe('en-US');
	inventa:  InventarioModel[];
  Cuenta:  CuentaModel[];
  Cuentas:  CuentaModel[];
  Clie:  ClientesModel[];
  Clies:  ClientesModel[];
	inventarioss:  InventarioModel[];
	inventarios: InventarioModel[];
	usuarios: UsuarioModel[];
	usuar: UsuarioModel[];
	inventas: InventarioModel[];
	invent: InventarioModel[];
	tick: TicketModel[];
	usuario: UsuarioModel[];
	usuariosRol: UsuarioRolModel[];
	public usuariosRoles: UsuarioRolModel[];
	usua: UsuarioModel[];
	public repuestos: RepuestosModel = new RepuestosModel();
	private fotoSeleccionada: File;
  private fotoSeleccionad: File;
	progreso: number = 0;
	public tickets: TicketModel = new TicketModel();
	errores: string[];
	fechaHoy = null;
	hora = null;
  ImpresoraSeleccionada: ImpresorasModel;
  ImpresoraSeleccionad: ImpresorasModel;

  constructor(private observer: BreakpointObserver, private serviciosService: ServiciosService,
              private activatedRoute: ActivatedRoute, private router: Router,  private fallaService: FallaService,
               public authService: LoginService,public modalService: TicketService, private modaleService: ModallService) { }


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

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
      
    );
     this.serviciosService.getInventario().subscribe(
      resp => {

             for(const i in resp){

               this.serie[i] = resp[i].serie;  // en lavariable this.serie almaceno todas las series
             }        



        }
    );
 this.serviciosService.getUsuario().subscribe((usuarioss:any) => {
     this.usuarios = usuarioss.filter(
     (usuarioss:any) => usuarioss.username == this.authService.usuario.username)
      this.telef = this.usuarios[0].telefono;
      this.nom = this.usuarios[0].nombre;
      this.apellido = this.usuarios[0].apellido;
      this.id = this.usuarios[0].id
     

     })

   this.serviciosService.getInventario().subscribe(inventass => this.inventas = inventass);
   this.serviciosService.getUsuario().subscribe(usuarioss => this.usuar = usuarioss);
   this.serviciosService.getTicket().subscribe(ticketss => this.tick = ticketss);
   this.serviciosService.getCliente().subscribe(clientess => this.Clie = clientess);
   this.serviciosService.getCuenta().subscribe(cuentass => this.Cuenta = cuentass);
   this.serviciosService.getImpresora().subscribe(impresorass => this.impres = impresorass.filter(imp => imp.equipos.tipo == "Impresoras"));

    this.Clies = this.Clie.filter(item => 
    
       item.usuario.id == this.id);



  }

    private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.serie.filter(option => option.toLowerCase().includes(filterValue));
    
  }

  

   seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
   
    
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


  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
   

  }

  Search(){

       

    if(this.Modelo == ""){

    this.ngOnInit();
    }
    else{
 
      this.impres = this.impres.filter(res => {

        return res.modelo.toLocaleLowerCase().match(this.Modelo.toLocaleLowerCase());
      })

     



    }

  }


  changeTicket(){

       if(this.ticket){
         Swal.fire('Antes de Generar el TICKET por favor Revise lo siguiente:', 'Que el Cable de Red este conectado y Que haya internet', 'info');
        
        }

      

     

    }


     createTicket(): void {

       
     

        this.Clies = this.Clie.filter(item => 
    
       item.usuario.id == this.id);

       


       this.Cuentas = this.Cuenta.filter(item => 
    
       item.cliente.id == this.Clies[0].id);

       



     	let today = new Date();
        this.fechaHoy = this.pipe.transform(today, 'yyyy-MM-dd');
        this.hora = this.pipe.transform(today, 'HH:mm');
        this.tickets.fechaInicio = this.fechaHoy;
        this.tickets.horaI = this.hora;

        this.tickets.apellido = this.apellido;
        this.tickets.nombre = this.nom;
        this.tickets.telefono1 = this.telef;
       


       this.usuario = this.usuar.filter(item => 
    
       item.cargo == "Tecnico"
     );


       this.invent = this.inventas.filter(it =>
         it.serie == this.tickets.serie

       	);
           
         this.tickets.ubicacion = this.Cuentas[0].areas.area;
         this.tickets.ubicacion2 = this.Cuentas[0].subarea.subarea;
         this.tickets.serie = this.Cuentas[0].serie;

     
        if(this.tick.length > 0) {


        let index = this.usuario.findIndex(x => x.id === this.tick[this.tick.length-1].usuario.id);
      
       
        if( this.usuario.length === index + 1){

        	this.tickets.usuario = this.usuario[0];
        	

        }

         if(this.usuario.length > index + 1){


           
        	this.tickets.usuario = this.usuario[index + 1];

        }

       
}else{
      this.tickets.usuario = this.usuario[0];

}

 	
        


     	this.serviciosService.createTicket(this.tickets).subscribe(
        repuestos => {

        this.router.navigate(['/listticket']);
        swal.fire('Ticket Levantado', 'se levanto el ticket de manera correcta', 'success');
         

        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );

          this.serviciosService.sendEmail(this.tickets).subscribe(
        repuestos => {

       
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
 
 
     }

       abrirModal(impresora: ImpresorasModel) {
    this.ImpresoraSeleccionada = impresora;
    this.modaleService.abrirModal();
  }

     abrirAtasco(impresora: ImpresorasModel, atasco: boolean) {
       this.atasco = true;
        this.rayas = false;
        this.impre = false;
       this.config = false;
       this.escanea = false;
       this.mancha = false;
       
    this.ImpresoraSeleccionad = impresora;
    this.fallaService.abrirPDF();
  }


 abrirMancha(impresora: ImpresorasModel, mancha: boolean) {
       this.atasco = false;
        this.rayas = false;
        this.impre = false;
       this.config = false;
       this.escanea = false;
       this.mancha = true;
       
    this.ImpresoraSeleccionad = impresora;
    this.fallaService.abrirPDF();
  } 

  abrirRayas(impresora: ImpresorasModel, rayas: boolean) {
       this.atasco = false;
        this.rayas = true;
        this.impre = false;
       this.config = false;
       this.escanea = false;
       this.mancha = false;
       
    this.ImpresoraSeleccionad = impresora;
    this.fallaService.abrirPDF();
  }

  abrirEscanea(impresora: ImpresorasModel, escanea: boolean) {
       this.atasco = false;
        this.rayas = false;
        this.impre = false;
       this.config = false;
       this.escanea = true;
       this.mancha = false;
       
    this.ImpresoraSeleccionad = impresora;
    this.fallaService.abrirPDF();
  }

    abrirImpreso(impresora: ImpresorasModel, impre: boolean) {
       this.atasco = false;
        this.rayas = false;
        this.impre = true;
       this.config = false;
       this.escanea = false;
       this.mancha = false;
       
    this.ImpresoraSeleccionad = impresora;
    this.fallaService.abrirPDF();
  }

    abrirConfig(impresora: ImpresorasModel, config: boolean) {
       this.atasco = false;
        this.rayas = false;
        this.impre = false;
       this.config = true;
       this.escanea = false;
       this.mancha = false;
       
    this.ImpresoraSeleccionad = impresora;
    this.fallaService.abrirPDF();
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
