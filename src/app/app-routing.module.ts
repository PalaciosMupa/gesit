import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './apps/clientes/clientes.component';
import { MenuComponent } from './apps/menu/menu.component';
import { AreasComponent } from './catalogo/areas/areas.component';
import { AreaComponent } from './catalogo/area/area.component';
import { FormularioComponent } from './catalogo/area/formulario/formulario.component';
import { ListsubareaComponent } from './catalogo/listsubarea/listsubarea.component';
import { FormsubareaComponent } from './catalogo/formsubarea/formsubarea.component';
import { ImpresorasComponent } from './catalogo/impresoras/impresoras.component';
import { ListimpreComponent } from './catalogo/impresoras/listimpre/listimpre.component';
import { ListconsuComponent } from './catalogo/consumibles/listconsu/listconsu.component';
import { ConsumiblesComponent } from './catalogo/consumibles/consumibles.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { ListCuentaComponent } from './cuentas/list-cuenta/list-cuenta.component';
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
import { InstructivoComponent } from './instructivo/instructivo.component';
import { TicketComponent } from './ticket/ticket.component';
import { ListTicketComponent } from './list-ticket/list-ticket.component';
import { TickTecnicoComponent } from './repuestos/tick-tecnico/tick-tecnico.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
{path: '', component: LoginComponent },
{path: 'home', component: HomeComponent },
{path: 'listClie', component: ClientesComponent },
{path: 'listImpre', component: ListimpreComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
{path: 'listConsu', component: ListconsuComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
{path: 'listSub', component: ListsubareaComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
{path: 'listCuen', component: ListCuentaComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
{path: 'listRol', component: ListrolComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
{path: 'listInvent', component: ListinvenComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
{path: 'formConsu', component: ConsumiblesComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
{path: 'formConsu/:id', component: ConsumiblesComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
{path: 'formInvent', component: InventarioComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
{path: 'formInvent/:id', component: InventarioComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
{path: 'formRespuesto', component: RepuestosComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_TECNICO' } },
{path: 'formRespuesto/:id', component: RepuestosComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_TECNICO' } },
{path: 'listRepuesto', component: ListrepueComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_TECNICO' } },
{path: 'reporte/:id', component: ReportComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
{path: 'formCuent', component: CuentasComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
{path: 'formCuent/:id', component: CuentasComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
{path: 'formImpr', component: ImpresorasComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
{path: 'formImpr/:id', component: ImpresorasComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
{path: 'formsub', component: FormsubareaComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
{path: 'formsub/:id', component: FormsubareaComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
{path: 'formarea', component: FormularioComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
{path: 'formarea/:id', component: FormularioComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
{path: 'catalogos', component: AreasComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
{path: 'CataArea', component: AreaComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
{path: 'roles', component: RolesComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
{ path: 'formclie', component: MenuComponent,canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
{ path: 'signup', component: SignupComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
{ path: 'login', component: LoginComponent },
{ path: 'formato', component: FormatoComponent },
{ path: 'instructivo', component: InstructivoComponent },
{ path: 'contrato', component: ContratoComponent },
{ path: 'ticket', component: TicketComponent },
{ path: 'listticket', component: ListTicketComponent },
{ path: 'ticket2', component: TickTecnicoComponent },


{ path: 'formclie/:id', component: MenuComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
//{path: 'home', component:HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
