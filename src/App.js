import React from "react";
import "./styles/main.scss";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import Cards from "./components/Cards";

function App() {
  return (
    <main className="App">
      <header>
        <h1 className="title">The Unofficial Dungeon Run Fansite</h1>
      </header>

      <main>
        <BrowserRouter>
          <Switch>
            <Route path="/cards" component={Cards} />
            <Route
              exact
              path="/"
              render={() => (
                <nav>
                  <ul>
                    <li>
                      <a href="/discord">Join Discord</a>
                    </li>
                    <li>
                      <Link to="/cards">Force Card Generator</Link>
                    </li>
                  </ul>
                </nav>
              )}
            />
          </Switch>
        </BrowserRouter>
      </main>
    </main>
  );
}

export default App;
