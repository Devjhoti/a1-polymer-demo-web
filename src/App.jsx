import React, { useState } from 'react';
import Scene from './components/Three/Scene';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <main>
      <LayoutGroup>
        <AnimatePresence>
          {loading && <Preloader onComplete={() => setLoading(false)} />}
        </AnimatePresence>
        
        {/* Mount Scene beneath preloader to allow buffering */}
        {!loading && <Navbar />}
      </LayoutGroup>
      <Scene />
    </main>
  );
}

export default App;
