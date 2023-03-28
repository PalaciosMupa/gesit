import { Component, OnInit, Input } from '@angular/core';
import { PdfService } from './pdf.service';
import { PDFDocumentProxy } from "ng2-pdf-viewer";
import { ClientesModel } from '../../models/clientes.model';
import {ServiciosService} from '../../services/servicios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';

import pdfFonts from "./../../../assets/vfs_fonts.js";
import { fonts } from "./pdfFonts";
import { styles, defaultStyle } from "./customStyles";
import pdfMake from "pdfmake/build/pdfmake";

// PDFMAKE fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = fonts;

@Component({
  selector: 'app-pdfcontrato',
  templateUrl: './pdfcontrato.component.html',
  styleUrls: ['./pdfcontrato.component.css']
})
export class PdfcontratoComponent implements OnInit {
	 @Input() cliente: ClientesModel;
   @Input() sat: boolean;
   @Input() dom: boolean;
   @Input() iden: boolean;
   @Input() contr: boolean;
	titulo: string = "Documentos del Cliente";
  path: string= "http://localhost:8080/api/uploads/img/";
  pathSat: string= "http://localhost:8080/api/uploadsSat/img/";
  pathDom: string= "http://localhost:8080/api/uploadsDom/img/";
  pathIden: string= "http://localhost:8080/api/uploadsIden/img/";
 // variable: string = "e4090342-5fc4-4caf-8283-14ddf35bef90_ConstanciaSituacionFiscal.pdf";
variable: string = "";
src: any = null;


 filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
 // pdfSrc; // this sample, dynamic one we will generate with the pdfmake
  pageVariable = 1;

  // Initialize variables required for the header and this component
  fileName = "test-document.pdf";
  // set zoom variables
  zoom = 0.98; // default initial zoom value
  zoomMax = 2; // max zoom value
  zoomMin = 0.5; // min zoom value
  zoomAmt = 0.2; // stepping zoom values on button click
  zoomScale = "page-width"; // zoom scale based on the page-width
  totalPages = 0; // indicates the total number of pages in the pdf document
  pdf: PDFDocumentProxy; // to access pdf information from the pdf viewer
  documentDefinition: object;
  generatedPDF: any;
  pdfData;
    

  constructor(public pdfService: PdfService, private activatedRoute: ActivatedRoute, private router: Router,
              private serviciosService: ServiciosService,private httpClient: HttpClient) { 
 
  }

  ngOnInit(): void {

    if(this.sat){

      
      if(this.cliente.fiscal == null || this.cliente.fiscal == "" ){
     
      swal.fire('Sin Cedula de Indentificación Fiscal', 'No se ha cargado', 'info');
     //this.router.navigate(['/listClie']);    

   }
   else{
    
 this.src =`${this.pathSat}${this.cliente.fiscal}`; 
 
   
   }

}

  if(this.dom){

   

      if(this.cliente.domicilio == null || this.cliente.domicilio == "" ){
     
      swal.fire('Sin Comprobante de Domicilio', 'No se ha cargado', 'info');
     //this.router.navigate(['/listClie']);    

   }
   else{
    
 this.src =`${this.pathDom}${this.cliente.domicilio}`; 
 
   
   }

}

  if(this.iden){

   

      if(this.cliente.identificacion == null || this.cliente.identificacion == "" ){
     
      swal.fire('Sin Identificación', 'No se ha cargado', 'info');
     //this.router.navigate(['/listClie']);    

   }
   else{
    
 this.src =`${this.pathIden}${this.cliente.identificacion}`; 
 
   
   }

}

 if(this.contr){

   if(this.cliente.contrato == null || this.cliente.contrato == "" ){
     
      swal.fire('No hay Contrato, cargado', 'Sin Contrato', 'info');
     //this.router.navigate(['/listClie']);    

   }
   else{
    
 this.src =`${this.path}${this.cliente.contrato}`; 
 
   
   }

 }


 //  this.getData();
   

  }

   cerrarPdf() {
    this.pdfService.cerrarPDF();
   window.location.reload();
    
    
  }


   onDownloadFile(): void {
    this.serviciosService.download(this.src).subscribe(
      event => {
        
        
        console.log(event);
        this.resportProgress(event);
      
        
      },
     
    );
  }


  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch(httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!, 
                  {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
          // saveAs(new Blob([httpEvent.body!], 
          //   { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
          //    httpEvent.headers.get('File-Name'));
        }
        this.fileStatus.status = 'done';
        break;
        default:
          console.log(httpEvent);
          break;
      
    }
  }

   private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }




    




  generatePDF(): void {
    // All the contents required goes here
    this.documentDefinition = {
      info: {
        title: this.pdfData.title,
        author: this.pdfData.author,
        subject: this.pdfData.subject,
        keywords: this.pdfData.keywords,
        creator: this.pdfData.creator,
        creationDate: new Date(),
      },
      pageSize: "A4",
      pageOrientation: "landscape",
      pageMargins: [40, 60, 40, 60], // left, top, right, bottom margin values
      content: [
        {
          text: "Sample test to check the font",
          style: "head", // normal text with custom font
        },
        {
          text: ">",
          font: "Icomoon", // icon intgerated to the pdfmake document
          fontSize: 18,
        },
      ], // it will be discussed later
      styles,
      defaultStyle,
    };

    // Generating the pdf
    this.generatedPDF = pdfMake.createPdf(this.documentDefinition);
    // This generated pdf buffer is used for the download, print and for viewing
    this.generatedPDF.getBuffer((buffer) => {
      this.cliente.contrato = buffer;
    });
  }


    

}
