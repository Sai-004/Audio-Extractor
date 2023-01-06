import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Navbar } from './components/navbar';
import { Home } from './components/home';
import { Upload } from './components/upload';
import { Player } from './components/player';
import { PrevUploads } from "./components/Prev_uploads";

export default function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="upload" element={<Upload />} />
          <Route path="player" element={<Player />} />
          <Route path="prev_uploads" element={<PrevUploads />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
