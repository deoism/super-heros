## Super Heroes be had!!!

1. Create superheroes.js inside your src folder with provided json of superheroes.
2. In App.js, we want to add state, with 2 properties. title, and heroes. 
3. Import the superheroes data from superheroes.js as Superheroes 
```js
state = {
    title: "Super Heroes",
    heroes: SuperHeroes.HEROES
  };
```
4. Now that we have an array hero objects. We want to convert the array of objects, to an array of react elements. **MAP**
We want to map over the array of heroes and return an array of react elements. 
5. Sweet. Now we can render that array, heroesList, as a child of a created ul element. 
```js
<div>
        <h1>{this.state.title}</h1>
        <ul>{heroesList}</ul>
      </div>
```
6. Let's make this look nice. grab the App.css so we can add some nice hover style. 
7. We can't use class, bc it's a key word. So we need to use className in order to apply css class's to our JSX markup.
8. Update your superheroes.js, so it has unique id to go with it. 
9. We need to add click event to our li elements. In order to do so,  we'll add an onClick event to each element. 
```onClick={() => this.handleSelectedHero(hero)}```
10. Then in the handleSelectedHero method in our component, we want to take our hero that was selected and setState on our component.  