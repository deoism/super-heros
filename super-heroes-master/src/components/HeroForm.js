import React, { Component } from "react";

class HeroForm extends Component {
  state = {
    heroId: parseInt(this.props.match.params.heroId),
    hero: undefined
  };

  //on load when component is init
  componentWillMount() {
    //we've got the hero id -> is the hero object{}
    const hero = this.props.getHeroById(this.props.match.params.heroId);
    this.setState({
      hero: hero
    });
  }

  handleSubmitHeroForm = (e, hero) => {
    e.preventDefault();
    this.props.handleSubmit(e, hero);
    this.props.history.goBack();
  };

  handleNameChange = event => {
    this.setState({
      hero: {
        ...this.state.hero,
        superhero: event.target.value
      }
    });
  };
  render() {
    const hero = this.state.hero;
    if (!hero) {
      return (
        <div>
          <h1>{this.state.heroId}</h1>
        </div>
      );
    }
    return (
      <div className="col-md-6 col-sm-12">
        <h2 style={{ textAlign: "center" }}>{hero.superhero}</h2>
        <form
          className="form-horizontal"
          style={{ width: "60%", padding: "25px" }}
          onSubmit={e => this.handleSubmitHeroForm(e, hero)}
        >
          <div className="form-group">
            <label className="control-label">ID: </label>
            {hero.id}
          </div>
          <div className="form-group">
            <label className="control-label">Hero Name: </label>
            <input
              className="form-control"
              type="text"
              value={hero.superhero}
              onChange={event => this.handleNameChange(event, hero)}
            />
          </div>
          <input className="button btn btn-info" type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default HeroForm;
