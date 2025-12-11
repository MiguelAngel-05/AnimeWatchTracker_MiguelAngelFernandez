import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [RouterModule, FormsModule],
  standalone: true,
  templateUrl: './inicio-component.html',
  styleUrl: './inicio-component.css',
})
export class InicioComponent {

 animeTitle: string | null = null;

search = "";
animes: any[] = [];
animesFiltrados: any[] = [];
selectedAnime: any = null;

baseUrl = `https://api.jikan.moe/v4`;

constructor(private route: ActivatedRoute) {}

async ngOnInit() {

  await this.loadAnimes();
  await this.loadAnimes2();
  await this.loadAnimes3();

  this.animeTitle = this.route.snapshot.paramMap.get('id');

  this.route.paramMap.subscribe((params: { get: (arg0: string) => string | null; }) => {
    this.animeTitle = params.get('id');
  });
}

async loadAnimes() {
  try {
    const res = await fetch(`${this.baseUrl}/seasons/now`);
    if (!res.ok) throw new Error("Error al cargar animes");

    const data = await res.json();

    // la info me viene como data.data
    this.animes = data.data;
    this.animesFiltrados = data.data;

  } catch (error) {
    console.error(error);
    this.animes = [];
    this.animesFiltrados = [];
  }
}

animesTop: any[] = [];
animesFiltradosTop: any[] = [];
selectedAnimeTop: any = null;

async loadAnimes2() {
  try {
    const res = await fetch(`${this.baseUrl}/top/anime`);
    if (!res.ok) throw new Error("Error al cargar animes");

    const data = await res.json();

    // la info me viene como data.data
    this.animesTop = data.data;
    this.animesFiltradosTop = data.data;

  } catch (error) {
    console.error(error);
    this.animesTop = [];
    this.animesFiltradosTop = [];
  }
}

animesProx: any[] = [];
animesFiltradosProx: any[] = [];
selectedAnimeProx: any = null;

async loadAnimes3() {
  try {
    const res = await fetch(`${this.baseUrl}/seasons/upcoming`);
    if (!res.ok) throw new Error("Error al cargar animes");

    const data = await res.json();

    // la info me viene como data.data
    this.animesProx = data.data;
    this.animesFiltradosProx = data.data;

  } catch (error) {
    console.error(error);
    this.animesProx = [];
    this.animesFiltradosProx = [];
  }
}

buscarAnime() {
  const term = this.search.toLowerCase();

  this.animesFiltrados = this.animes.filter(a =>
    a.title.toLowerCase().includes(term)
  );

  this.animesFiltradosTop = this.animesTop.filter(a =>
    a.title.toLowerCase().includes(term)
  );

  this.animesFiltradosProx = this.animesProx.filter(a =>
    a.title.toLowerCase().includes(term)
  );

}

}
