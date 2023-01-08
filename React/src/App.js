import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Navbar } from './components/navbar';
import { Upload } from './components/upload';
import { Player } from './components/player';
import { PlaySong } from "./components/playsong";
import { PrevUploads } from "./components/Prev_uploads";
import { Home } from "./components/home";
import { Loading } from "./components/loading";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="loading" element={<Loading/>}/>
            <Route path="upload" element={<Upload />} />
            <Route path="player" element={<Player />} />
            <Route path="player/:id/" element={<PlaySong />} />
            <Route path="prev_uploads" element={<PrevUploads />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
