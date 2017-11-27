const heroURL =
  "https://raw.githubusercontent.com/jtomchak/super-heroes/master/superhero.json";

const getHeroes = () => {
  return fetch(heroURL);
};

export { getHeroes };
