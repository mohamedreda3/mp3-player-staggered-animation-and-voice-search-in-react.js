import react, { useState, useEffect } from 'react';
import './layouts/layoutstyle.css';
import Reciter from './layouts/reciter';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './layouts/header';
import Main from './layouts/main';
import Homepage from './layouts/homepage';
function App() {
  const [reciters, setReciters] = useState([]);
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Main setReciters={setReciters} />
        <Routes>
          <Route path={`/`} element={<Homepage reciters={reciters}/>} />
          <Route path={`/reciter`} element={<Reciter />}>
            <Route path={`:userId`} element={<Reciter />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
