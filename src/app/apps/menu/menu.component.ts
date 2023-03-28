import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import {ServiciosService} from '../../services/servicios.service';
import {ClientesModel} from '../../models/clientes.model';
import {UsuarioModel} from '../../models/usuario.model';
import {FormGroup, FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  autenticado:boolean = false;
  admin:boolean = false;  
  favoriteSeason: number;
  seasons: number[] = [12, 24, 36];
  usuarios: UsuarioModel[];
  fechaInicio = null;


  public cliente: ClientesModel = new ClientesModel();
  registrosClie: any[];
  Clientes: ClientesModel[];
  Clientess: ClientesModel[];
  errores: string[];
  pipe = new DatePipe('en-US');
  fechaHoy = null;
  



    range = new FormGroup({
      FechaIni: new FormControl
     // end: new FormControl
       });

     rango = new FormGroup({
      periodos: new FormControl
     // end: new FormControl
       });
  

  constructor(private observer: BreakpointObserver, private serviciosService: ServiciosService,
              private activatedRoute: ActivatedRoute, private router: Router,
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


this.activatedRoute.paramMap.subscribe(params => {
        let id = +params.get('id');
        if (id) {
          this.serviciosService.getClienteTodos(id).subscribe((clientes) => this.cliente = clientes);
        }
      });


  this.serviciosService.getCliente().subscribe(
      resp => {

    this.registrosClie = resp;
  
        

        }
    );

   this.serviciosService.getCliente().subscribe(
      resp => {

            this.Clientes = resp;


        }
    );

    this.serviciosService.getUsuario().subscribe(usuarioss => this.usuarios = usuarioss);

  }

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }

 


   createClientes(): void {

     let formStore = $(".formStore");

        let error = 0;

        for(let i = 0; i < formStore.length; i++){

            if($(formStore[i]).val() == "" || $(formStore[i]).val() == undefined){

                error++

                $(formStore[i]).parent().addClass("was-validated")

            }
        }

        if(error > 0){

            return;
        }

    let today = new Date();
    this.fechaHoy = this.pipe.transform(today, 'yyyy-MM-dd');

     this.fechaInicio = this.pipe.transform(this.range.value.FechaIni, 'yyyy-MM-dd');

         this.cliente.fechaIContrato = this.fechaInicio;

    
      this.cliente.fechaInicio = this.fechaHoy;

      this.cliente.periodoCont = this.rango.value.periodos;
    
    if(this.registrosClie.length > 0){
        this.cliente.numero_cliente = this.registrosClie[this.registrosClie.length-1].numero_cliente + 200;
      }else {
        this.cliente.numero_cliente = 200;
      }

      if(this.rango.value.periodos === 12){
      this.cliente.fechaFContrato = <any>new Date(this.cliente.fechaIContrato).setMonth(<any>new Date(this.cliente.fechaIContrato).getMonth()+12);
      }

       if(this.rango.value.periodos === 24){
      this.cliente.fechaFContrato = <any>new Date(this.cliente.fechaIContrato).setMonth(<any>new Date(this.cliente.fechaIContrato).getMonth()+24);
      }

       if(this.rango.value.periodos === 36){
      this.cliente.fechaFContrato = <any>new Date(this.cliente.fechaIContrato).setMonth(<any>new Date(this.cliente.fechaIContrato).getMonth()+36);
      }

        
  
    this.serviciosService.createCliente(this.cliente).subscribe(
        client => {


        this.router.navigate(['/listClie']);
            swal.fire('Cliente Registrado', 'El Cliente se registro correctamente', 'success');
           
  

        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }


   updateCliente(): void {
  console.log(this.cliente);
  this.serviciosService.updateCliente(this.cliente)
    .subscribe(
      json => {
        this.router.navigate(['/listClie']);
        swal.fire('El Cliente fue Actualizado', 'El Cliente  se ha  Actualizó con éxito', 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    )
  }

   validate(input){


      if($(input).attr("name") == "nombre" ){

            /*=============================================
            Validamos expresión regular para validar el nombre del cliente
            =============================================*/ 

            let pattern = /^[A-Za-zñÑáéíóúÁÉÍÓÚ ]{1,}$/;

            if(!pattern.test(input.value)){

                $(input).parent().addClass('was-validated');

                input.value = "";

                return;

            }else{

               if($(input).attr("name") == "nombre"){

                // con este codigo la informacion que se escriba desde el input
                // la colocamos en la variable filterValue pasandola a minusculas
                 const filterValue = input.value.toLowerCase();

           
           // en la siguiente linea tenemos la forma de realizar un filtrado
           // en la base de datos pero con algun elemento en especifico
           // como decir filtrame todos los elementos donde sea igual a esto
            this.Clientess =  this.Clientes.filter(option => option.nombre.toLowerCase() === filterValue);
      
             

                if(this.Clientess.length > 0){

                    $(input).parent().addClass('was-validated')
                    input.value = "";
                  
                    swal.fire(
                'Nombre de Cliente repetido!',
                'Este cliente ya esta registrado',
                'error'
              )


                    return;

                }

               }

            }
        }

         /*=============================================
        Validamos la dirección del cliente
        =============================================*/

         if($(input).attr("name") == "direccion"){

            /*=============================================
            Validamos expresión regular de la dirección del cliente
            =============================================*/ 

            let pattern = /^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\,\\.\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,1000}$/;

            if(!pattern.test(input.value)){

                $(input).parent().addClass('was-validated');

                input.value = "";

                return;

            }

        }

          
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
