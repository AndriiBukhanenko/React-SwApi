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
    const res = await this.getResourse(`/people/`);
    return res.results;
  }

  async getPerson(id) {
    const res = await this.getResourse(`/people/${id}/`);
    return res;
  }

  async getAllPlanets() {
    const planets = await this.getResourse(`/planets/`);
    return planets.map(planet => this._transformPlanet(planet));
  }

  async getPlanet(id) {
    const planet = await this.getResourse(`/planets/${id}/`);
    return this._transformPlanet(planet);
  }

  async getAllStarships() {
    const res = await this.getResourse(`/starships/`);
    return res.results;
  }

  async getStarship(id) {
    const res = await this.getResourse(`/starships/${id}/`);
    return res;
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
}

// const swapi = new SwapiService();
// swapi.getAllPeople()
// .then(people => people.forEach((person) => console.log(person.name)))
// swapi.getPerson(3).then(person => console.log(person.name));
