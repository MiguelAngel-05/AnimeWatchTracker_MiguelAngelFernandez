import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalle-anime',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './detalle-anime-component.html',
  styleUrl: './detalle-anime-component.css',
})
export class DetalleAnimeComponent {

anime: any = null;
  episodios: any[] = [];
  resenas: any[] = [];

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    try {

      // pa el detalle
      const d1 = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
      if (!d1.ok) throw new Error("Error detalle");
      this.anime = (await d1.json()).data;

      // pa los episodios
      const d2 = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`);
      if (!d2.ok) throw new Error("Error episodios");
      this.episodios = (await d2.json()).data;

      // pa las reseñas
      const d3 = await fetch(`https://api.jikan.moe/v4/anime/${id}/reviews`);
      if (!d3.ok) throw new Error("Error reseñas");
      this.resenas = (await d3.json()).data;

    } catch (e) {
      console.error(e);
    }
  }

  agregar() {
    let lista = JSON.parse(localStorage.getItem("miLista") || "[]");

    if (!lista.some((a: { mal_id: any; }) => a.mal_id === this.anime.mal_id)) {
      lista.push({
        ...this.anime,
        estado: "Pendiente",
        favorito: false
      });
      localStorage.setItem("miLista", JSON.stringify(lista));
    }
  }

}
