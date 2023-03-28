import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import {ConsumibleModel} from '../../../models/consumible.model';
import {ServiciosService} from '../../../services/servicios.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listconsu',
  templateUrl: './listconsu.component.html',
  styleUrls: ['./listconsu.component.css']
})
export class ListconsuComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav; 
  consumibles: ConsumibleModel[];
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


 this.serviciosService.getConsumible().subscribe(
      resp => {

    this.consumibles = resp;
  
        

        }
    );

  }

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }



      delete(consumible: ConsumibleModel): void {
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

          this.serviciosService.deleteConsumible(consumible.id).subscribe(
            () => {
              this.consumibles = this.consumibles.filter(cli => cli !== consumible)
              Swal.fire(
                'Consumible!',
                'Consumible Eliminado con éxito.',
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
