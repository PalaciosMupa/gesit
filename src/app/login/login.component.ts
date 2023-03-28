import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../services/login.service';
import {ServiciosService} from '../services/servicios.service';
import {UsuarioModel} from '../models/usuario.model';
import {ClientesModel} from '../models/clientes.model';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  clientes: ClientesModel[];
  clientes2: ClientesModel[];
  cliente:any[] = [];
  clienUsua:any[] = [];
   pipe = new DatePipe('en-US');
  fechaHoy = null;
  fechaTomorro = null;
  fechaTomorro2 = null;
  fechaAyer = null;
	
    constructor(private snack:MatSnackBar, private authService: LoginService, 
      private router: Router, private serviciosService: ServiciosService) { 
  this.usuario =  new UsuarioModel();
    }

  ngOnInit(): void {
     if (this.authService.isAuthenticated()) {
      swal.fire('Login', `Hola ${this.authService.usuario.username} ya estás autenticado!`, 'info');
      this.router.navigate(['/home']);
    }

     this.serviciosService.getCliente().subscribe(
      resp => {

        this.clientes = resp;
  
        this.cliente.push(resp);

         for(const i in resp){

                        this.clienUsua.push(resp[i]);
                    }
}


    );
  }


 login(): void{
 
 
 
  if(this.usuario.username.trim() == '' || this.usuario.username.trim() == null){
      this.snack.open('El nombre de usuario es requerido !!','Aceptar',{
        duration:3000
      })
      return;
    }

 if(this.usuario.password.trim() == '' || this.usuario.password.trim() == null){
      this.snack.open('La contraseña es requerida !!','Aceptar',{
        duration:3000
      })
      return;
 }
 

   this.authService.login(this.usuario).subscribe(response => {
   //   console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
       this.router.navigate(['/home']);
     
      
      this.clientes2 = this.clientes.filter(item => item.usuario.username == usuario.username);

        let today = new Date();
        this.fechaHoy = this.pipe.transform(today, 'yyyy-MM-dd');

        let Tomorrow = <any>new Date(this.fechaHoy).setMonth(<any>new Date(this.fechaHoy).getMonth()+1)
        let Tomorrow2 = <any>new Date(this.fechaHoy).setHours(<any>new Date(this.fechaHoy).getHours()+720)
        let ayer = <any>new Date(this.fechaHoy).setMonth(<any>new Date(this.fechaHoy).getMonth()-1)

        this.fechaTomorro = this.pipe.transform(Tomorrow, 'yyyy-MM-dd');
        this.fechaTomorro2 = this.pipe.transform(Tomorrow2, 'yyyy-MM-dd');
        this.fechaAyer = this.pipe.transform(ayer, 'yyyy-MM-dd');

       if (this.clientes2[0].fechaFContrato <= this.fechaTomorro && 
            this.clientes2[0].fechaFContrato >= this.fechaHoy){
         swal.fire('Login', ` ${this.clientes2[0].nombre}, Su Contrato está próximo a expirar!!`, 'info');

       }

         if (this.clientes2[0].fechaFContrato < this.fechaHoy){
         swal.fire('Login', ` ${this.clientes2[0].nombre}, Su Contrato Ha Expirado!!`, 'error');
          this.router.navigate(['/login']);
       }

       if (this.clientes2[0].fechaFContrato > this.fechaTomorro){
         swal.fire('Login', `Hola ${this.clientes2[0].nombre}, has iniciado sesión con éxito!`, 'success');

       }
      
     

    }, err => {
      if (err.status == 400) {

        this.snack.open('Usuario o clave incorrectas!!!','Aceptar',{
        duration:4000
      })
      }
    }
    );

    


    }

}
