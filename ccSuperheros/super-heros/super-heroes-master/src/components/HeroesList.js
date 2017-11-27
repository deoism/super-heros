import React, { Component } from "react";
import HeroesListItem from "./HeroesListItem";
import HeroForm from "./HeroForm";
import "./HeroesList.css";

import { getHeroes } from "../superheroes.service";

class HeroesList extends Component {
  state = {
    title: "Super Heroes",
    heroes: [],
    selectedHero: {
      id: undefined,
      superhero: ""
    }
  };

  //life kyle hooks. do stuff on initialize
  componentWillMount() {
    getHeroes()
      .then(res => res.json())
      .then(payload => {
        this.setState({
          heroes: payload.heroes
        });
      })
      .catch(err => console.log(err));
  }

  //update our super in the array, in place
  handleSubmit = (event, hero) => {
    event.preventDefault();
    // const hero = this.state.selectedHero;
    const heroIndex = this.state.heroes.map(o => o.id).indexOf(hero.id);
    this.setState({
      selectedHero: {
        id: undefined,
        superhero: ""
      },
      heroes: [
        ...this.state.heroes.slice(0, heroIndex),
        {
          ...hero,
          superhero: hero.superhero
        },
        ...this.state.heroes.slice(heroIndex + 1, this.state.heroes.length)
      ]
    });
  };

  handleSelectedHero = hero => {
    // this.state.selectedHero = hero;
    this.setState({
      selectedHero: hero
    });
  };

  render() {
    return (
      <div className="App">
        <h1>{this.state.title}</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <ul className="heroes">
                <HeroesListItem
                  heroes={this.state.heroes}
                  onSelectedHero={this.handleSelectedHero}
                />
              </ul>
            </div>
            {this.state.selectedHero.id && (
              <HeroForm
                hero={this.state.selectedHero}
                onSubmit={this.handleSubmit}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default HeroesList;
