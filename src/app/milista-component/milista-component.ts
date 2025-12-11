import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-milista',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './milista-component.html',
  styleUrl: './milista-component.css',
})
export class MilistaComponent {

 lista: any[] = [];
 filtroEstado: string = '';
 listaFiltrada: any[] = [];

  ngOnInit() {
    this.cargarLista();
  }

  cargarLista() {
    this.lista = JSON.parse(localStorage.getItem("miLista") || "[]");
    this.aplicarFiltro();
  }

  cambiarEstado(id: number, event: Event) {
  const value = (event.target as HTMLSelectElement).value;

  let lista = JSON.parse(localStorage.getItem("miLista") || "[]");
  const item = lista.find((a: { mal_id: number; }) => a.mal_id === id);

  if (item) {
    item.estado = value;
  }

  localStorage.setItem("miLista", JSON.stringify(lista));
  this.cargarLista();
}

  toggleFavorito(id: number) {
    let lista = JSON.parse(localStorage.getItem("miLista") || "[]");
    const item = lista.find((a: { mal_id: number; }) => a.mal_id === id);
    if (item) item.favorito = !item.favorito;
    localStorage.setItem("miLista", JSON.stringify(lista));
    this.cargarLista();
  }

  eliminar(id: number) {
    let lista = JSON.parse(localStorage.getItem("miLista") || "[]");
    lista = lista.filter((a: { mal_id: number; }) => a.mal_id !== id);
    localStorage.setItem("miLista", JSON.stringify(lista));
    this.cargarLista();
  }

  // con esto cambio el filtro
  cambiarFiltro(event: Event) {
  const select = event.target as HTMLSelectElement | null;
  if (!select) return;
  this.filtroEstado = select.value;
  this.aplicarFiltro();
}

  // aqui voy a aplicar el filtro
  aplicarFiltro() {
    if (!this.filtroEstado) {
      this.listaFiltrada = [...this.lista];
    } else {
      this.listaFiltrada = this.lista.filter(a => a.estado === this.filtroEstado);
    } // <-- tengo q terminar esto
  }

}
