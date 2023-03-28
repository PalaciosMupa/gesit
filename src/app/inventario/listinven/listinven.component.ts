import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import {InventarioModel} from '../../models/inventario.model';
import {ImpresorasModel} from '../../models/impresoras.model';
import {ServiciosService} from '../../services/servicios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listinven',
  templateUrl: './listinven.component.html',
  styleUrls: ['./listinven.component.css']
})
export class ListinvenComponent implements OnInit {

	 @ViewChild(MatSidenav)
     sidenav!: MatSidenav;
     inventarios: InventarioModel[];
     invenConsum: InventarioModel[];
     impresoras: ImpresorasModel[];
     arrayFiltrado: ImpresorasModel[];
     invenConsumJ: any[] = [];
     impresoraJ: any[] = [];
     Inventario: any;
     inven:any[] = [];
     invenCon:any[] = [];
     tt:any[] = [];
     mantos:boolean=false;
      autenticado:boolean = false;
      admin:boolean = false; 
  


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


  this.serviciosService.getInventario().subscribe(
      resp => {

   this.inventarios = resp;

   this.invenConsum = resp.filter(res => {

        return res.equipos.id == 4;

        
      })

    this.serviciosService.getImpresora().subscribe(
   respu => {

     this.impresoras = respu.filter(ress =>{
       return ress.equipos.id == 4;

       })

  // con este codigo del arreglo de todos los modelos de consumibles
  // eliminamos los modelos que haya en el inventario
  // y este nuevo arreglo son los consumibles que se deben de adquirir

       this.arrayFiltrado = this.impresoras.filter(modelos =>
      !this.invenConsum.some(inventario =>
      inventario.impresora.modelo == modelos.modelo
       )
      )

     if (this.arrayFiltrado.length > 0){
          Swal.fire('Sin Stock', 'Consumibles sin existencia', 'info');
          this.mantos = true;    

        }

     

    
   });



   

        });


 


 



  }


  Search(){

    if(this.Inventario == ""){

    this.ngOnInit();
    }
    else{
 
      this.inventarios = this.inventarios.filter(res => {

        return res.impresora.modelo.toLocaleLowerCase().match(this.Inventario.toLocaleLowerCase());
      })
    }
  }

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }

  exportarExcel(){

                  
    this.serviciosService.exportToExcel(this.inventarios, 'inventario');
  }


    delete(inventario: InventarioModel): void {
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

          this.serviciosService.deleteInventario(inventario.id).subscribe(
            () => {
              this.inventarios = this.inventarios.filter(cli => cli !== inventario)
              Swal.fire(
                'Inventario!',
                'Inventario Eliminado con éxito.',
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
