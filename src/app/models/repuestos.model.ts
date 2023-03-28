import { AreasModel } from './areas.model';
import { SubAreasModel } from './subareas.model';

export class RepuestosModel{
id: number;
equipo: string;
serie_equipo: string;
serie_refaccion: string;
serie_toner: string;
serie_unidad: string;
serie_fusor: string;
toner: number;
unidad: number;
fusor: number;
refaccion: number;
mantto: number;
fechaCambio:  string;


areas: AreasModel;
subarea: SubAreasModel;

}