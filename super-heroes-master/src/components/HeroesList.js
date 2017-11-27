import React, { Component } from "react";
import { Link } from "react-router-dom";
import HeroesListItem from "./HeroesListItem";
import HeroForm from "./HeroForm";
import "./HeroesList.css";

class HeroesList extends Component {
  state = {
    title: "Super Heroes",
    selectedHero: {
      id: undefined,
      superhero: ""
    }
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
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <ul className="heroes">
                <HeroesListItem
                  heroes={this.props.heroes}
                  onSelectedHero={this.handleSelectedHero}
                />
              </ul>
            </div>
            {this.state.selectedHero.id && (
              <div className="col-md-6 col-sm-12">
                <h2 style={{ textAlign: "center" }}>
                  {this.state.selectedHero.superhero}
                </h2>
                <Link to={`/heroes/details/${this.state.selectedHero.id}`}>
                  <button className="btn btn-info">Details</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default HeroesList;
