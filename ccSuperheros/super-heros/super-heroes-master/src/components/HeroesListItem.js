import React from "react";

//an array of Hero objects and return an array of react elements of hero
const HeroesListItem = props =>
  props.heroes.map(hero => (
    <li key={hero.id} onClick={() => props.onSelectedHero(hero)}>
      <span className="badge">{hero.id}:</span> {hero.superhero}
    </li>
  ));

export default HeroesListItem;
