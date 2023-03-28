import { AreasModel } from './areas.model';
import { EquiposModel } from './equipos.model';
import { ImpresorasModel } from './impresoras.model';
import { SubAreasModel } from './subareas.model';
import { ConsumibleModel } from './consumible.model';

export class InventarioModel{
id: number;
contador: number;
serie: string;
toner: number;
consumible1: string;
consumible2: string;
refaccion: string; 
destino:  string;
caracteristica: string;
lugarBodega: string;


equipos: EquiposModel;
impresora: ImpresorasModel;
areas: AreasModel;
subarea: SubAreasModel;
consumible: ConsumibleModel;


}