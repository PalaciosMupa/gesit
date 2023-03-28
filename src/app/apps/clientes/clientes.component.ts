import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import { Router, ActivatedRoute } from '@angular/router';
import {ClientesModel} from '../../models/clientes.model';
import {ServiciosService} from '../../services/servicios.service';
import { ModalService } from '../contrato/modal.service';
import { PdfService } from '../pdfcontrato/pdf.service';
import { DatePipe } from '@angular/common';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

   @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  autenticado:boolean = false;
  admin:boolean = false;
  activo:boolean = false;
  medio:boolean = false;
  inactivo:boolean = false;
  ClieMes:boolean = false;
  ClieMedio:boolean = false;
  Cliequince:boolean = false;  
  pipe = new DatePipe('en-US');
  fechaHoy = null;
  fechaTomorro = null;
  fechaTomorro2 = null;
  fechaAyer = null;
  fechas:any[] = [];
  variable:number;
  contr:boolean = false;
  sat:boolean = false;
  dom:boolean = false;
  iden:boolean = false;
  public  dateToCompare = null;

  Clie: ClientesModel[];
  Clien: ClientesModel[];
  Clie15: ClientesModel[];
  Clien15: ClientesModel[];
  Clie7: ClientesModel[];
  Clien7: ClientesModel[];
  clientes: ClientesModel[];
  clientesFechas: ClientesModel[];
  clienteSeleccionado: ClientesModel;
  clienteSeleccionad: ClientesModel;

  constructor(private observer: BreakpointObserver, private serviciosService: ServiciosService,
              private activatedRoute: ActivatedRoute, private router: Router,
              private modalService: ModalService, public authService: LoginService,
              private pdfService: PdfService) { }


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

    this.dateToCompare = new Date(this.dateToCompare).getTime();
    
     if (this.authService.isAuthenticated()) {
      this.autenticado = true;
    }


     this.serviciosService.getCliente().subscribe(
      resp => {    // con este codigo ordenamos una columna en orden ascende
                  // de la a a la z

    this.clientes = resp.sort((a, b) => {
    if(a.nombre < b.nombre) { return -1; }
    if(a.nombre > b.nombre) { return 1; }
    return 0;
});


        }
    );


       this.modalService.notificarUpload.subscribe(cliente => {
      this.clientes = this.clientes.map(clienteOriginal => {
        if (cliente.id == clienteOriginal.id) {
          clienteOriginal.contrato = cliente.contrato;
        }
        return clienteOriginal;
      })
    })


      let today = new Date();
        this.fechaHoy = this.pipe.transform(today, 'yyyy-MM-dd');

        let Tomorrow = <any>new Date(this.fechaHoy).setMonth(<any>new Date(this.fechaHoy).getMonth()+1)
        let Tomorrow2 = <any>new Date(this.fechaHoy).setHours(<any>new Date(this.fechaHoy).getHours()+720)
        let ayer = <any>new Date(this.fechaHoy).setMonth(<any>new Date(this.fechaHoy).getMonth()-1)

        this.fechaTomorro = this.pipe.transform(Tomorrow, 'yyyy-MM-dd');
        this.fechaTomorro2 = this.pipe.transform(Tomorrow2, 'yyyy-MM-dd');
        this.fechaAyer = this.pipe.transform(ayer, 'yyyy-MM-dd');


        console.log("Hoy",this.fechaHoy)

        this.serviciosService.getCliente().subscribe(
      resp => {

       this.Clie = resp;
      this.Clien = this.Clie.filter(items =>
          <any>new Date(this.fechaHoy).setMonth(<any>new Date(this.fechaHoy).getMonth()+1)
           === <any>new Date(items.fechaFContrato).setMonth(<any>new Date(items.fechaFContrato).getMonth()+0)
          )

         

        if (this.Clien.length > 0){
          Swal.fire('1 MES', 'Contratos Próximos a Vencer en Un Mes', 'info');
          this.ClieMes = true;    

        }else{
          this.ClieMes = false;  
        }

            }
        );

          this.serviciosService.getCliente().subscribe(
      resp => {

       this.Clie15 = resp;
      this.Clien15 = this.Clie15.filter(items =>
          <any>new Date(this.fechaHoy).setHours(<any>new Date(this.fechaHoy).getHours()+360)
           === <any>new Date(items.fechaFContrato).setMonth(<any>new Date(items.fechaFContrato).getMonth()+0)
          )

        

        if (this.Clien15.length > 0){
          Swal.fire('15 DIAS', 'Contratos Próximos a Vencer en 15 dias', 'info');
          this.ClieMedio = true;    

        }else{
      this.ClieMedio = false;           
        }

            }
        );

           this.serviciosService.getCliente().subscribe(
      resp => {

       this.Clie7 = resp;
      this.Clien7 = this.Clie7.filter(items =>
          <any>new Date(items.fechaFContrato).setHours(<any>new Date(items.fechaFContrato).getHours()+0)
           <= <any>new Date(this.fechaHoy).setHours(<any>new Date(this.fechaHoy).getHours()+168) && 
           <any>new Date(items.fechaFContrato).setHours(<any>new Date(items.fechaFContrato).getHours()+0)
           >=  <any>new Date(this.fechaHoy).setHours(<any>new Date(this.fechaHoy).getHours()+0)
          )

        

        if (this.Clien7.length > 0){
          Swal.fire('7 DÍAS o MENOS', 'Contratos Próximos a Vencer en 7 dias O Menos', 'info');
          this.Cliequince = true;    

        }else{
          this.Cliequince = false; 
        }

            }
        );



        

   

  }

logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }


  delete(clien: ClientesModel): void {
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

          this.serviciosService.deleteCliente(clien.id).subscribe(
            () => {
              this.clientes = this.clientes.filter(cli => cli !== clien)
              Swal.fire(
                'Cliente!',
                'Cliente Eliminado con éxito.',
                'success'
              )
            }
          )

        }
      });
    }

    abrirModal(cliente: ClientesModel) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
      abrirPdf(cliente: ClientesModel, contr: boolean) {
       this.contr = true;
        this.sat = false;
       this.iden = false;
       this.dom = false;
    this.clienteSeleccionad = cliente;
    this.pdfService.abrirPDF();
  }

     abrirSAT(cliente: ClientesModel, sat: boolean) {
       this.sat = true;
       this.iden = false;
       this.dom = false;
       this.contr = false;
    this.clienteSeleccionad = cliente;
    this.pdfService.abrirPDF();
  }

    abrirIden(cliente: ClientesModel, iden: boolean) {
      this.iden = true;
      this.sat = false;
      this.dom = false;
      this.contr = false;
    this.clienteSeleccionad = cliente;
    this.pdfService.abrirPDF();
  }

    abrirDom(cliente: ClientesModel, dom: boolean) {
      this.dom = true;
      this.sat = false;
      this.iden = false;
      this.contr = false;
    this.clienteSeleccionad = cliente;
    this.pdfService.abrirPDF();
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
