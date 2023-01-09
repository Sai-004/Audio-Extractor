import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from './components/navbar';
import { Upload } from './components/upload';
import { Loading } from "./components/loading";
import MyUploads from "./components/my_uploads";
import SongPage from "./components/songpage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Upload />} />
            <Route path="loading" element={<Loading />} />
            <Route path="upload" element={<Upload />} />
            <Route path="player/:id/" element={<SongPage />} />
            <Route path="my_uploads" element={<MyUploads/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
