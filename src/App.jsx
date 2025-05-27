import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PlayersProvider } from './contexts/PlayersContext.jsx';

//Pages
import DraftHub from './pages/DraftHub'
import PlayerProfilePage from './pages/PlayerProfilePage'
import ComparePlayers from './pages/ComparePlayers'
const router = createBrowserRouter([
  {
    path: "/",
    element: <DraftHub />,
  },
  {
    path: "/players/:playerId",
    element: <PlayerProfilePage />,
  },
  {
    path: "/compare",
    element: <ComparePlayers />,
  },
]);

function App() {
  return (
    <PlayersProvider>
      <RouterProvider router={router} />
    </PlayersProvider>
  )
}

export default App
