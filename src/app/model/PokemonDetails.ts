export class PokemonDetails {
  public id: number;
  public url: string;
  public name: string;
  public image: string;

  constructor(id: number, name: string, url: string, image: string) {
    this.id = id;
    this.name = name;
    this.image = image;
  }
}