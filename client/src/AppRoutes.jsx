import Home from './components/Home';
import Homepage from './components/Homepage/Homepage';
import Login from './components/login/Login';
import Register from "./components/register/Register";
import Confirm from './components/confirm/Confirm';// Updated import path
import Admin from "./components/admin/Admin";
import Edit from './components/edit/Edit';
import Search from './components/search/Search';
import Listener from './components/listener/Listener';
import Artist from "./components/artistpage/Artist";
import AlbumPage from "./components/albumpage/Albumpage";
import Library from "./components/library/Library";
import Newalbum from './components/albumpage/Newalbum';
import Playlist from './components/playlist/Playlist';
import Newplaylist from './components/playlist/Newplaylist';
import ArtistProfile from './components/artistpage/Artistprofile';


const AppRoutes = [
  {
    index: true,
    element: <Home />
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
    path: '/userlibrary',
    element: <Library />
  },

  {
    path: '/newalbum',
    element: <Newalbum />
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
    path: '/artistprofile',
    element: <ArtistProfile />
  }






];

export default AppRoutes;