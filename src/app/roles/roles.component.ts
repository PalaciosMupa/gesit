import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import {UsuarioRolModel} from '../models/usuariorol.model';
import {UsuarioModel} from '../models/usuario.model';
import {RolesModel} from '../models/roles.model';
import {ServiciosService} from '../services/servicios.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  myControl = new FormControl('');
  filteredOptions: Observable<string[]>;

  public UsuariosRoles: UsuarioRolModel = new UsuarioRolModel();

	 @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  autenticado:boolean = false;
  admin:boolean = false;
  usuarios: UsuarioModel[];
  usuario: UsuarioModel[];
  roles: RolesModel[]; 
  errores: string[];
 

  constructor(private observer: BreakpointObserver,private activatedRoute: ActivatedRoute, private router: Router,
              public authService: LoginService, private serviciosService: ServiciosService ) { }

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


    this.serviciosService.getUsuario().subscribe(usuarioss => this.usuarios = usuarioss);

    this.serviciosService.getRol().subscribe(roless => this.roles = roless);
  }

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }


  createUserRol(): void {

          /*=============================================
            Codigo para actualizar la tabla usuario desde
            el componente de Asignacion de Rol.
            esto se hace con el fin de que en la tabla de 
            usuario se pueda identificar al rol de tecnico 
            =============================================*/ 
         this.usuario = this.usuarios.filter(item => 
    
       item.id == this.UsuariosRoles.usuario.id
     )

  
        
          if(this.UsuariosRoles.rol.id == 3){

            this.usuario[0].cargo = "Tecnico"
            

              this.serviciosService.updateUsuarioR(this.usuario[0])
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




    this.serviciosService.createUsuarioRol(this.UsuariosRoles).subscribe(
        usuariosRoles => {

        this.router.navigate(['/listRol']);
            Swal.fire('Rol Asignado', 'Se Asigno el Rol de manera correcta', 'success');
         

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
