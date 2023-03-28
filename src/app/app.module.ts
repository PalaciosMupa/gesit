import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './apps/clientes/clientes.component';
import { MenuComponent } from './apps/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import {ServiciosService} from './services/servicios.service';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
 
import {MatNativeDateModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import { PdfViewerModule } from 'ng2-pdf-viewer';


import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { AreasComponent } from './catalogo/areas/areas.component';
import { AreaComponent } from './catalogo/area/area.component';
import { FormularioComponent } from './catalogo/area/formulario/formulario.component';
import { ListsubareaComponent } from './catalogo/listsubarea/listsubarea.component';
import { FormsubareaComponent } from './catalogo/formsubarea/formsubarea.component';
import { ImpresorasComponent } from './catalogo/impresoras/impresoras.component';
import { ConsumiblesComponent } from './catalogo/consumibles/consumibles.component';
import { ListimpreComponent } from './catalogo/impresoras/listimpre/listimpre.component';
import { ListconsuComponent } from './catalogo/consumibles/listconsu/listconsu.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { ListCuentaComponent } from './cuentas/list-cuenta/list-cuenta.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { InventarioComponent } from './inventario/inventario.component';
import { ListinvenComponent } from './inventario/listinven/listinven.component';
import { ReportComponent } from './inventario/report/report.component';
import { RepuestosComponent } from './repuestos/repuestos.component';
import { ListrepueComponent } from './repuestos/listrepue/listrepue.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { RolesComponent } from './roles/roles.component';
import { ListrolComponent } from './roles/listrol/listrol.component';
import { FormatoComponent } from './formato/formato.component';
import { ContratoComponent } from './apps/contrato/contrato.component';
import { PdfcontratoComponent } from './apps/pdfcontrato/pdfcontrato.component';
import { HeaderComponent } from './apps/pdfcontrato/header/header.component';
import { PdfFormatoComponent } from './formato/pdf-formato/pdf-formato.component';
import { InstructivoComponent } from './instructivo/instructivo.component';
import { PdfinstructivoComponent } from './instructivo/pdfinstructivo/pdfinstructivo.component';
import { VerpdfComponent } from './instructivo/verpdf/verpdf.component';
import { VideoComponent } from './instructivo/video/video.component';
import { TicketComponent } from './ticket/ticket.component';
import { ListTicketComponent } from './list-ticket/list-ticket.component';
import { ImagenComponent } from './list-ticket/imagen/imagen.component';
import { TickTecnicoComponent } from './repuestos/tick-tecnico/tick-tecnico.component';
import { VerfotoComponent } from './repuestos/tick-tecnico/verfoto/verfoto.component';
import { ReasignarComponent } from './repuestos/tick-tecnico/reasignar/reasignar.component';
import { RecurrenteComponent } from './ticket/recurrente/recurrente.component';
import { FallasComponent } from './ticket/fallas/fallas.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    MenuComponent,
    AreasComponent,
    AreaComponent,
    FormularioComponent,
    ListsubareaComponent,
    FormsubareaComponent,
    ImpresorasComponent,
    ConsumiblesComponent,
    ListimpreComponent,
    ListconsuComponent,
    CuentasComponent,
    ListCuentaComponent,
    InventarioComponent,
    ListinvenComponent,
    ReportComponent,
    RepuestosComponent,
    ListrepueComponent,
    SignupComponent,
    LoginComponent,
    RolesComponent,
    ListrolComponent,
    FormatoComponent,
    ContratoComponent,
    PdfcontratoComponent,
    HeaderComponent,
    PdfFormatoComponent,
    InstructivoComponent,
    PdfinstructivoComponent,
    VerpdfComponent,
    VideoComponent,
    TicketComponent,
    ListTicketComponent,
    ImagenComponent,
    TickTecnicoComponent,
    VerfotoComponent,
    ReasignarComponent,
    RecurrenteComponent,
    FallasComponent,
    HomeComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
    Ng2SearchPipeModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    PdfViewerModule
    
    
  ],
  providers: [ServiciosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
