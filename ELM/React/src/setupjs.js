const aVariable = 32;

const Reset = function() {
	  console.log("///////////////////////////////////////////");
	}
	
var Example = {
    aVariable:80,
    incrementVariable : function (){
        return this.aVariable +1;
    }
};

console.log("1 simple declaired property variable = "+Example.incrementVariable())
 

// var unboundIncrementVariable = Example.incrementVariable;
// console.log("2 unbound = " + unboundIncrementVariable());

//why doesn't this display nan??? (( notes say it should!!!))

//create a new function with this bound to object
var boundIncrementVariable = Example.incrementVariable.bind(Example);
console.log("3 Unbound Increment Variable bound = "+boundIncrementVariable());
console.log("//////////////////////////////////////////");




class  BaseClass{
	constructor() {}
	
	setTitle(title){
		this.title = title;
	}
	printTitle(){
		console.log(`Title: ${this.title}`);
	}
}
 

class SubClass extends BaseClass{
	constructor(){
		super(); //this is the class constructor
		this.setTitle("This is the class based subclass");
	 
	}
};

 
const s2 = new SubClass();
s2.printTitle();

Reset();

import React from 'react';


//	React.render(...);
 

import {test} from './first.js'
console.log(test(5, 'hi'));
