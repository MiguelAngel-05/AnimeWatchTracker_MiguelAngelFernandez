import { Routes } from '@angular/router';
import { InicioComponent } from './inicio-component/inicio-component';
import { BusquedaComponent } from './busqueda-component/busqueda-component';
import { DetalleAnimeComponent } from './detalle-anime-component/detalle-anime-component';
import { MilistaComponent } from './milista-component/milista-component';
import {TinderComponent} from './tinder-component/tinder-component';
export const routes: Routes = [

    { path: '', component: InicioComponent },
    { path: 'inicio', component: InicioComponent },
  { path: 'buscar', component: BusquedaComponent },
  { path: 'anime/:id', component: DetalleAnimeComponent },
  { path: 'animeTop/:id', component: DetalleAnimeComponent },
  { path: 'animeProx/:id', component: DetalleAnimeComponent },
  { path: 'mi-lista', component: MilistaComponent },
  { path: 'tinder', component: TinderComponent },
  { path: '**', redirectTo: '' }

];
