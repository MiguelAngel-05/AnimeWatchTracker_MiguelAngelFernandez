import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OnInit } from '@angular/core'

@Component({
  selector: 'app-tinder-component',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tinder-component.html',
  styleUrls: ['./tinder-component.css'],
})
export class TinderComponent {

  animeTitle: string | null = null;

  animes: any[] = [];
  selectedAnimeIndex: number = 0;
  selectedAnime: any = null;

  baseUrl = `https://api.jikan.moe/v4`;

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    await this.loadAnimes();

    // cojo el primer anime para hacerle
    this.selectedAnime = this.animes[0];

    this.animeTitle = this.route.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe((params: { get: (arg0: string) => string | null; }) => {
      this.animeTitle = params.get('id');
    });
  }

  async loadAnimes() {
  try {
    this.animes = [];

    // cargo 10 animes para que no se quede sin animes

    for (let i = 0; i < 10; i++) {
      const res = await fetch(`${this.baseUrl}/random/anime`);
      const data = await res.json();
      this.animes.push(data.data);
    }

    this.selectedAnimeIndex = 0;
    this.selectedAnime = this.animes[0];

  } catch (error) {
    console.error(error);
  }
}

  // le doy megusta
  like() {
    console.log('Me gusta:', this.selectedAnime.title);
    this.nextAnime();
  }

  // le doy dislike
  dislike() {
    console.log('No me gusta:', this.selectedAnime.title);
    this.nextAnime();
  }

  nextAnime() {
    this.selectedAnimeIndex++;
    if (this.selectedAnimeIndex >= this.animes.length) {
      this.loadAnimes();
    } else {
      this.selectedAnime = this.animes[this.selectedAnimeIndex];
    }
  }

}
