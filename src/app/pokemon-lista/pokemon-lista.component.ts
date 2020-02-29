import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
import { PokemonDetails } from '../model/PokemonDetails';

@Component({
  selector: 'app-pokemon-lista',
  templateUrl: './pokemon-lista.component.html',
  styleUrls: ['./pokemon-lista.component.scss']
})
export class PokemonListaComponent implements OnInit {

  pokemons: PokemonDetails[];
  results: any[];
  throttle = 300;
  next: any;
  nextPrevios: any;
  scrollDistance = 1;
  scrollUpDistance = 2;
  previous: string;
  urlPokeApi: string = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=21";

  constructor(private service: PokemonService) { }

  ngOnInit(): void {
    this.pokemons = [];
    this.service.listPokemons(this.urlPokeApi).subscribe(
      dados => {
        this.loadData(dados.results);
        this.next = dados.next;
      }
    );
  }

  onScrollDown() {
    if (this.next != this.nextPrevios) {
      this.service.listPokemons(this.next).subscribe(
        data => {
          this.next = data.next;
          this.pokemons.push.apply(this.pokemons, this.loadData(data.results));
          console.log(this.pokemons.length);
        }
      );
      this.nextPrevios = this.next;
    }
  }

  loadData(results) {
    results.forEach(element => {
      var id = element.url.split("/")[6];
      var urlImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
      this.pokemons.push(new PokemonDetails(id, element.name, results.url, urlImage));
    });
  }

  favorite(id) {
    if (this.checkFavorite(id)) {
      localStorage.removeItem(id);
    } else {
      localStorage.setItem(id, "true");
    }


  }

  checkFavorite(id) {
    if (localStorage.getItem(id) == 'true') {
      return true;
    }
    return false;
  }

}
