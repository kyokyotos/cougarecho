import { Counter } from "./components/Counter";
import Home from './components/Home'
import { ArtistHome } from './components/artist/ArtistHome'
import Homepage from './components/Homepage/homepage';
import Login from './components/login/Login'; 
import Register from "./components/register/Register";
import Confirm from './components/confirm/Confirm';// Updated import path
import Admin from "./components/admin/Admin";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/artist',
    element: <ArtistHome />
  },
  {
    path: '/homepage',
    element: <Homepage />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/confirm',
    element: <Confirm />
  },
  {
    path: '/admin',
    element: <Admin />
  }
];

export default AppRoutes;