import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import { Router, ActivatedRoute } from '@angular/router';
import {SubAreasModel} from '../../models/subareas.model';
import {ServiciosService} from '../../services/servicios.service';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listsubarea',
  templateUrl: './listsubarea.component.html',
  styleUrls: ['./listsubarea.component.css']
})
export class ListsubareaComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav; 
  subareas: SubAreasModel[];
  autenticado:boolean = false;

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


    this.serviciosService.getSubArea().subscribe(
      resp => {

    this.subareas = resp;
  
        

        }
    );


  }

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }


      delete(subarea: SubAreasModel): void {
    Swal.fire({
  title: 'Esta usted Seguro?',
  text: "No se podra revertir esto!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, Eliminar esto!'
}).then((result) => {
        if (result.isConfirmed) {

          this.serviciosService.deleteSubAreas(subarea.id).subscribe(
            () => {
              this.subareas = this.subareas.filter(cli => cli !== subarea)
              Swal.fire(
                'Subrea!',
                'Subrea Eliminada con éxito.',
                'success'
              )
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
