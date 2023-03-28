import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import {CuentaModel} from '../../models/cuenta.model';
import {ServiciosService} from '../../services/servicios.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-list-cuenta',
  templateUrl: './list-cuenta.component.html',
  styleUrls: ['./list-cuenta.component.css']
})
export class ListCuentaComponent implements OnInit {

   @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  cuentas: CuentaModel[]; 
  Cliente: any;
  Area: any;
  Equipo: any;
  Serie: any;
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


   this.serviciosService.getCuenta().subscribe(
      resp => {

    this.cuentas = resp.sort((a, b) => b.numero - a.numero);

  //  let newarr = this.cuentas.sort((a, b) => b.numero - a.numero);
  

        }
    );


  }


logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }


  Search(){

    if(this.Cliente == ""){

    this.ngOnInit();
    }
    else{
 
      this.cuentas = this.cuentas.filter(res => {

        return res.cliente.nombre.toLocaleLowerCase().match(this.Cliente.toLocaleLowerCase());
      })
    }
  }

  SearchArea(){

    if(this.Area == ""){

    this.ngOnInit();
    }
    else{
 
      this.cuentas = this.cuentas.filter(res => {

        return res.areas.area.toLocaleLowerCase().match(this.Area.toLocaleLowerCase());
      })
    }
  }


  SearchEquipo(){

    if(this.Equipo == ""){

    this.ngOnInit();
    }
    else{
 
      this.cuentas = this.cuentas.filter(res => {

        return res.impresora.modelo.toLocaleLowerCase().match(this.Equipo.toLocaleLowerCase());
      })
    }
  }

  SearchSerie(){

    if(this.Serie == ""){

    this.ngOnInit();
    }
    else{
 
      this.cuentas = this.cuentas.filter(res => {

        return res.serie.toLocaleLowerCase().match(this.Serie.toLocaleLowerCase());
      })
    }
  }



      delete(cuenta: CuentaModel): void {
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

          this.serviciosService.deleteCuentas(cuenta.id).subscribe(
            () => {
              this.cuentas = this.cuentas.filter(cli => cli !== cuenta)
              Swal.fire(
                'Cuenta!',
                'Cuenta Eliminada con éxito.',
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
