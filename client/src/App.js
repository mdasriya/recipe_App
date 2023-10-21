
import './App.css';
import { Home } from './Pages/Home';
import { Route, Routes } from 'react-router-dom';
import { Details } from './Pages/Details';
import NavBar from './components/NavBar';
import LoginForm from './Pages/LoginForm';
import Register from './Pages/Register';
import FavRecipe from './Pages/FavRecipe';


function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginForm />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/fav_recipe' element={<FavRecipe />}/>
        <Route path='/:id' element={<Details />} />
      </Routes>

    </div>
  );
}

export default App;
