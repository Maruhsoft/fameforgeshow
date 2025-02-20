import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import LiveStream from './pages/LiveStream';
import Seasons from './pages/Seasons';
import { AppData } from './types';
import data from './data/data.json';

function App() {
  const [appData, setAppData] = React.useState<AppData>(data);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home data={appData} />} />
          <Route path="live" element={<LiveStream streamData={appData.currentStream} />} />
          <Route path="seasons" element={<Seasons seasons={appData.seasons} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;