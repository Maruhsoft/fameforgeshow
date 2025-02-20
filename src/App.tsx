import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import LiveStream from './pages/LiveStream';
import Seasons from './pages/Seasons';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
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
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;