import React, { Component } from "react";
import "./App.css";
import SuperHeroes from "./superheroes";

class App extends Component {
  state = {
    title: "Super Heroes",
    heroes: SuperHeroes.HEROES,
    selectedHero: {}
  };

  handleSelectedHero = hero => {
    // this.state.selectedHero = hero;
    this.setState({
      selectedHero: hero
    });
  };

  render() {
    const heroesList = this.state.heroes.map(hero => {
      return (
        <li key={hero.id} onClick={() => this.handleSelectedHero(hero)}>
          <span className="badge">{hero.id}:</span> {hero.superhero}
        </li>
      );
    });
    return (
      <div className="App">
        <h1>{this.state.title}</h1>
        <ul className="heroes">{heroesList}</ul>
        <div>
          <label>ID: </label>
          {this.state.selectedHero.id}
        </div>
        <form>
          <label>Hero Name:</label>
          <input type="text" value={this.state.selectedHero.superhero} />
          <input className="button" type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default App;
