export default class SwapiService {
  _apiBase = "https://swapi.co/api";
  async getResourse(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`${url}, error - ${res.status}`);
    }
    return await res.json();
  }

  async getAllPeople() {
    const people = await this.getResourse(`/people/`);
    return people.results.map(person => this._transformPerson(person));
  }

  async getPerson(id) {
    const person = await this.getResourse(`/people/${id}/`);
    return this._transformPerson(person);
  }

  async getAllPlanets() {
    const planets = await this.getResourse(`/planets/`);
    return planets.results.map(planet => this._transformPlanet(planet));
  }

  async getPlanet(id) {
    const planet = await this.getResourse(`/planets/${id}/`);
    return this._transformPlanet(planet);
  }

  async getAllStarships() {
    const starships = await this.getResourse(`/starships/`);
    return starships.results.map(starship => this._transformStarship(starship));
  }

  async getStarship(id) {
    const starship = await this.getResourse(`/starships/${id}/`);
    return this._transformStarship(starship);
  }

  _extractId(item) {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  }

  _transformPlanet(planet) {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    };
  }

  _transformStarship(starship) {
    return {
      id: this._extractId(starship),
      model: starship.name,
      lenth: starship.population,
      crew: starship.crew
    };
  }
  _transformPerson(person) {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birtYear: person.birtYear
    };
  }
}
