import { AreasModel } from './areas.model';
import { ClientesModel } from './clientes.model';
import { ImpresorasModel } from './impresoras.model';
import { SubAreasModel } from './subareas.model';

export class CuentaModel{
id: number;
numero: number;
serie: string;
areas: AreasModel;
subarea: SubAreasModel;
impresora: ImpresorasModel;
cliente: ClientesModel;

}