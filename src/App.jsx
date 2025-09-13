import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { RecipesLists } from "./pages/RecipesLists";
import { Route, Routes } from "react-router-dom";
import { RecipeComplete } from "./components/RecipeComplete";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" exact element={ <RecipesLists /> } />
        <Route path="/recipe" element={ <RecipeComplete /> } />
      </Routes>
    </>
  );
}

export default App;
