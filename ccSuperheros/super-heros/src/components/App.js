import React, { Component } from "react";
import HeroesList from "./HeroesList";


class App extends Component {
  render() {
    return (
	<Router>
      <div>
        <h1>Super Hero Town</h1>
		<nav>
		<NavLink ext to="/heros">
		Heros
		</NavLink>
		</nav> 
	  <hr />
	  
	  <Route exact path="/heros" component={HerosList} />
	  <Route path={"/heros/details/:heroId"} component={HeroForm} />
	  </div>
	 </Router>
    );
  }
}

export default App;
