import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Home from './pages/Home';
import LiveStream from './pages/LiveStream';
import Seasons from './pages/Seasons';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { AppData } from './types';
import data from './data/data.json';

function App() {
  const [appData, setAppData] = React.useState<AppData>(data);

  const handleDataChange = (newData: AppData) => {
    setAppData(newData);
  };

  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'bg-gray-800 text-white',
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home data={appData} />} />
          <Route path="live" element={<LiveStream streamData={appData.currentStream} />} />
          <Route path="seasons" element={<Seasons seasons={appData.seasons} />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="contact" element={<Contact />} />
          <Route path="admin" element={<Admin data={appData} onDataChange={handleDataChange} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;