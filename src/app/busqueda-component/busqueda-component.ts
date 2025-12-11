import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-busqueda',
  imports: [FormsModule, RouterModule],
  standalone: true,
  templateUrl: './busqueda-component.html',
  styleUrl: './busqueda-component.css',
})
export class BusquedaComponent {

nombre = "";
  tipo = "";
  estado = "";

  resultados: any[] = [];
  cargando = false;
  error = false;

  constructor(private router: Router) {}

  async buscar() {
    try {
      this.cargando = true;
      this.error = false;
      this.resultados = [];

      const params = new URLSearchParams();

      if (this.nombre) params.append("q", this.nombre);
      if (this.tipo) params.append("type", this.tipo);
      if (this.estado) params.append("status", this.estado);

      const url = `https://api.jikan.moe/v4/anime?${params.toString()}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Error en búsqueda");

      const data = await res.json();
      this.resultados = data.data;

    } catch (e) {
      console.error("Error:", e);
      this.error = true;

    } finally {
      this.cargando = false;
    }
  }

  verDetalle(id: number) {
    this.router.navigate(['/anime', id]);
  }

}
