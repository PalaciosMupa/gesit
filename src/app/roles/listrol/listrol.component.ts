import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import {ServiciosService} from '../../services/servicios.service';
import { Router, ActivatedRoute } from '@angular/router';
import {UsuarioRolModel} from '../../models/usuariorol.model';
import {UsuarioModel} from '../../models/usuario.model';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listrol',
  templateUrl: './listrol.component.html',
  styleUrls: ['./listrol.component.css']
})
export class ListrolComponent implements OnInit {

@ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  UsuarioRoles: UsuarioModel[];
  Usuar: UsuarioModel[];
   autenticado:boolean = false;
  admin:boolean = false; 
  Nombre: any;
  Apellido: any;
  Usuario: any;
  Roles: any; 
   errores: string[];
  
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


 this.serviciosService.getUsuario().subscribe(
      resp => {

       this.UsuarioRoles = resp;
 
       console.log("Usuarios",this.UsuarioRoles);
        }
    );

  }

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }


   SearchNombre(){

    if(this.Nombre == ""){

    this.ngOnInit();
    }
    else{
 
      this.UsuarioRoles = this.UsuarioRoles.filter(res => {

        return res.nombre.toLocaleLowerCase().match(this.Nombre.toLocaleLowerCase());
      })
    }
  }


    SearchApellido(){

    if(this.Apellido == ""){

    this.ngOnInit();
    }
    else{
 
      this.UsuarioRoles = this.UsuarioRoles.filter(res => {

        return res.apellido.toLocaleLowerCase().match(this.Apellido.toLocaleLowerCase());
      })
    }
  }

   SearchUsuario(){

    if(this.Usuario == ""){

    this.ngOnInit();
    }
    else{
 
      this.UsuarioRoles = this.UsuarioRoles.filter(res => {

        return res.username.toLocaleLowerCase().match(this.Usuario.toLocaleLowerCase());
      })
    }
  }

  

   habilitar(usuarioRoles: UsuarioModel): void {
    Swal.fire({
  title: 'Esta usted Seguro?',
  text: "No se podra revertir esto!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, Deshabilitar!'
}).then((result) => {
        if (result.isConfirmed) {


        	 this.Usuar =  this.UsuarioRoles.filter(option => option.id === usuarioRoles.id);

            this.Usuar[0].enable = false;
           
               console.log("User", this.Usuar[0].id);
               console.log("User", this.Usuar[0].nombre);
          this.serviciosService.updateUsuarioR(this.Usuar[0])
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

des(usuarioRoles: UsuarioModel): void {
    Swal.fire({
  title: 'Esta usted Seguro?',
  text: "No se podra revertir esto!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, Habilitar!!'
}).then((result) => {
        if (result.isConfirmed) {


        	 this.Usuar =  this.UsuarioRoles.filter(option => option.id === usuarioRoles.id);

            this.Usuar[0].enable = true;


           

          this.serviciosService.updateUsuarioR(this.Usuar[0])
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
