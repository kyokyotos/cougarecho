import { Counter } from "./components/Counter";
import Home from './components/Home';
import Homepage from './components/Homepage/homepage';
import Login from './components/login/Login'; 
import Register from "./components/register/Register";
import Confirm from './components/confirm/Confirm';// Updated import path
import Admin from "./components/admin/Admin";
import Edit from './components/edit/Edit';
import Search from './components/search/Search';
import Listener from './components/listener/Listener';
import Artist from "./components/artistpage/Artist";
import AlbumPage from "./components/album/AlbumComp";
import Playlist from './components/playlist/Playlist';
import Newplaylist from './components/playlist/Newplaylist';
import Player from './components/songplayer/Player';



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
  },
  {
    path: '/useredit',
    element: <Edit />
  },

  {
    path: '/search',
    element: <Search />
  },
  
  {
    path: '/listener',
    element: <Listener />
  },

  {
    path: '/artist',
    element: <Artist />
  },
  
  {
    path: '/album',
    element: <AlbumPage />
  },
  
  {
    path: '/playlist',
    element: <Playlist />
  },
  
  {
    path: '/newplaylist',
    element: <Newplaylist />
  },
  
  {
    path: '/player',
    element: <Player />
  }
];

export default AppRoutes;