/*
Map, Filter, Reduce 

1. Create a function called removeAnimal. This function should take an animal
as a string and an array of animals, 
and if that animal is in the array, remove it, and return the new array. 

2. Create a function called addAnimal. This function should take an animal as
a string and an array of animals, 
and add it to the array, then return said array. 

3. Stretch goal: Create a function called pluralize.It should take an array, 
and return an array with all the elements pluralized. ;-)  
*/


const farmAnimals = ["pig", "chicken", "horse", "sheep", "goat"];
Object.freeze(farmAnimals);

console.log(farmAnimals);
//---------> Code Here

const removeAnimal = (animal, collection) => {
 console.log(collection.filter(a => a !== animal));
  console.log(animal +" removed");
};


removeAnimal("horse",farmAnimals);

const addAnimal = (animal, collection)  =>{
  
  console.log(animal +" adding");
  return[
  ...collection,
  animal
    ];
}
addAnimal("panda",farmAnimals);

const pluralize = array => array.map(x => x+"s"); 
//{
//  return array.map(function(arrayItem){
//   return arrayIitem + "s";
//  })
//}
console.log(pluralize(farmAnimals));