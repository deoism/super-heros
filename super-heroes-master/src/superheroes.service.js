const heroURL =
  "https://raw.githubusercontent.com/jtomchak/super-heroes/master/superhero.json";

const getHeroes = () => {
  return fetch(heroURL);
};

const getHeroById = id => {};

export { getHeroes };
