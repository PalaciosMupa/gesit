import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import  Swal  from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login.service';
import { UsuarioModel } from '../models/usuario.model';
import {ServiciosService} from '../services/servicios.service';
import {RolesModel} from '../models/roles.model';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav; 
  public usuarios: UsuarioModel = new UsuarioModel();
  autenticado:boolean = false;
  errores: string[];
  usuarioss: UsuarioModel[];
  usuari: UsuarioModel[];
  roles: RolesModel[];

   public user = {
    username : '',
    password : '',
    nombre : '',
    apellido : '',
    email : '',
    telefono : ''
  }

  constructor(private observer: BreakpointObserver, private userService:UserService,
              private snack:MatSnackBar, public authService: LoginService,
              private serviciosService: ServiciosService,
              private activatedRoute: ActivatedRoute, private router: Router) { }

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

            this.usuarioss = resp;


        }
    );




      this.serviciosService.getRol().subscribe(
        roless => {this.roles = roless 
        }

        );


  }

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      this.snack.open('El nombre de usuario es requerido !!','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    this.userService.añadirUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario guardado','Usuario registrado con exito en el sistema','success');
      },(error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema !!','Aceptar',{
          duration : 3000
        });
      }
    )
  }


   validate(input){

    

     if($(input).attr("name") == "username"){

            /*=============================================
            Validamos expresión regular del campo para la refaccion
            =============================================*/ 

            let pattern = /^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]{1,}$/;

            if(!pattern.test(input.value)){

                $(input).addClass('was-validated');

                input.value = "";

                return;

            }else{

               if($(input).attr("name") == "username"){

                // con este codigo la informacion que se escriba desde el input
                // la colocamos en la variable filterValue pasandola a minusculas
                 const filterValue = input.value.toLowerCase();
                 

           
           // en la siguiente linea tenemos la forma de realizar un filtrado
           // en la base de datos pero con algun elemento en especifico
           // como decir filtrame todos los elementos donde sea igual a esto
            this.usuari =  this.usuarioss.filter(option => option.username.toLowerCase() === filterValue);
      
             

                if(this.usuari.length > 0){

                 

                    $(input).parent().addClass('was-validated')
                    input.value = "";
                  
                    Swal.fire(
                'Usuario repetido!',
                'Este Usuario ya esta registrado',
                'error'
              )


                    return;

                }

               }

            }

        }

         if($(input).attr("name") == "password"){

            /*=============================================
            Validamos expresión regular del campo para la refaccion
            =============================================*/ 

            let pattern = /^(?=.*\d)(?=.*[()@$?¡!%&\-_])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
                          
            if(!pattern.test(input.value)){

                $(input).addClass('was-validated');

                input.value = "";

                return;

            }

        }

         if($(input).attr("name") == "nombre"){

            /*=============================================
            Validamos expresión regular del campo para la refaccion
            =============================================*/ 

            let pattern = /^[A-Za-zñÑáéíóúÁÉÍÓÚ ]{1,}$/;
                          
            if(!pattern.test(input.value)){

                $(input).addClass('was-validated');

                input.value = "";

                return;

            }

        }

         if($(input).attr("name") == "apellido"){

            /*=============================================
            Validamos expresión regular del campo para la refaccion
            =============================================*/ 

            let pattern = /^[A-Za-zñÑáéíóúÁÉÍÓÚ ]{1,}$/;
                          
            if(!pattern.test(input.value)){

                $(input).addClass('was-validated');

                input.value = "";

                return;

            }

        }

         if($(input).attr("name") == "email"){

            /*=============================================
            Validamos expresión regular del campo para la refaccion
            =============================================*/ 

            let pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                        
            if(!pattern.test(input.value)){

                $(input).addClass('was-validated');

                input.value = "";

                return;

            }

        }

         if($(input).attr("name") == "telefono"){

            /*=============================================
            Validamos expresión regular del campo para la refaccion
            =============================================*/ 

            let pattern = /^[0-9]{10,}$/;
                        
            if(!pattern.test(input.value)){

                $(input).addClass('was-validated');

                input.value = "";

                return;

            }

        }

     }


   createUsuario(): void {

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


    this.serviciosService.createUsuario(this.usuarios).subscribe(
        cuentas => {

        this.router.navigate(['/listRol']);
            Swal.fire('Usuario Registrado', 'Registro Exitoso', 'success');
         

        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );

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
