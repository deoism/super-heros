//file first.js
export function test(a,b) {
	return `a: ${a}, b: ${b}`;
}

 

const hasUsernameAndpassword = (user) => { 
	return user.name.length > 0 && user.password.length > 0;	
}

const  filterInvalidUsers = (users) => {
	let validUsers = [];
	
	for (var user of users){
		if (hasUsernameAndpassword(user)){
		validUsers.push(user);
		console.log("added "+ user + " to users");
		}
	}
	
	return validUsers;
	
}

const userToFormattedString = (user) => {
	console.log(`name:${user.name}  role:${user.role}`);
	return 'name: ' +user.name + '\nrole: '	+ user.role;
	
}

let  users = [
	{
	
		name: 'kirk douglas',
		password: 'iamspartacus',
		role: 'revolutionary'
		},
	{
		name: 'charlie chaplain',
		password: '',
		role: 'tramp'
	},
	{
		name: 'harrison  ford',
		password: 'anythingbutsnakes',
		role: 'archaeologist'
	}
	];
	
	var validUsers = filterInvalidUsers(users);
	
	for (var i = 0; i< validUsers.length; i++){
	userToFormattedString(validUsers[i])
	}
	
////////////////////////////////////////////////////////////////////////////////	
	
console.log("lesson 2");


function DieBag(numberOfFaces){
	this.values = [];
	
	for(var iterationCount=0;iterationCount<3;iterationCount++){
		for(var faceCount = 0;faceCount < numberOfFaces; faceCount++){
			this.values.push(faceCount +1);
		}
	}
}
	
	DieBag.prototype.drawValue = function (){
		return this.values.shift();
	};
	
	DieBag.prototype.shuffle = function(){
		for(var i=0; i< this.values.length;i++){
			var temp = this.values[i];
			var swapIndex = Math.floor(Math.random() * this.values.length);
			this.values[i] = this.values[swapIndex];
			this.values[swapIndex]= temp;
		}
	};
	
	
	DieBag.prototype.itemsRemaining = function(){
		return this.values.length;
	}
	
	// var bag  = new DieBag(10);
	// bag.shuffle();
	
	// while(bag.itemsRemaining()){
		// console.log(bag.drawValue());
		// console.clear();
	// }
	
	////////////////////////////////////////////////////////////////////////////
	console.log("LESSON 3 jsx");
	
import React from 'react';
import ReactDOM from 'react-dom';
 
 
const item1 = "Apples";
const item2 = "Oranges";

ReactDOM.render(
  <ul >Lesson 3 fruit
    <li>{item1}</li>
    <li>{item2}</li>
  </ul>,
  
	
  document.getElementById('lesson3')
);
console.log("grocerylist via parsed values   function 3");

const groceryList = (
	<ul> groceryList passed ul  via  jsx
		<li>apples</li>
		<li>oranges</li>
	</ul>
	
);

ReactDOM.render(
	groceryList,
	document.getElementById('lesson3a')
	);
console.log("grocerylist via jsx function 3a");
	
	
function groceryListfunct(item1,item2){
		return(
		<ul>grocerylist function  returned  via jsx
			<li>{item1}</li>
			<li>{item2}</li>
		</ul>
	);
	}
	
	ReactDOM.render(
	groceryListfunct("apples","oranges"),
	document.getElementById('lesson3b')
	);
	console.log("grocerylist via jsx function 3b");
	
	
	function GroceryList(props){
		return(
		<ul> GroceryList Prop!
			<li>{props.item1}</li>
			<li>{props.item2}</li>
		</ul>
		);
		
	} 

ReactDOM.render(
	<GroceryList item1="apples" item2="Oranges" />,
	document.getElementById('lesson3c')
);	
	console.log("GroceryList via prop 3c");
		 
		 
		 
		 const Hello = props =>(
		 <div>
			<h1>hello {props.name}</h1>
		</div>
		);
		
		
ReactDOM.render(
	<div>
	<Hello name="Nikki" />
	<Hello name="deo" />
	<Hello name="mike" />
	</div>,
	document.getElementById('propslesson')
);
console.log("hello props lesson");



console.log('///////////////////////////////////////////////////////////////////////');
console.log("JSX FROM COLLECTIONS!");

const items = ["bread","milk","eggs","tea"];
const listItems = [];

for (let i=0; i < items.length; i++){
	
		listItems.push(<li key={i}>{items[i]}</li>)
		};
		
const List = props => (
	<ul>
	{props.items}
	</ul>
);


ReactDOM.render(
<List items={listItems} />,  
document.getElementById('JSX')
);

console.log("collections completed");	
	
	
	
	