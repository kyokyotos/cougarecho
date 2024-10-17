import { Counter } from "./components/Counter";
import Home from './components/Home'
import { ArtistHome } from './components/artist/ArtistHome'
import Homepage from './components/Homepage/homepage';
//import { ArtistAlbumView } from './components/artist/ArtistAblumView'
//import { ArtistSongView } from './components/artist/ArtistSongView'

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
  //{
  //path: '/artist/albumview',
  //element: <ArtistAlbumView />
  //},
  /*{
    path: '/artist/songview',
    element: <ArtistSongView />
  }*/
];

export default AppRoutes;