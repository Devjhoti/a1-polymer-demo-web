import React, { useState } from 'react';
import Scene from './components/Three/Scene';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import Chatbot from './components/Chatbot';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [forceChatOpen, setForceChatOpen] = useState(false);

  return (
    <main>
      <LayoutGroup>
        <AnimatePresence>
          {loading && <Preloader onComplete={() => setLoading(false)} />}
        </AnimatePresence>
        
        {/* Mount Scene beneath preloader to allow buffering */}
        {!loading && <Navbar />}
      </LayoutGroup>
      <Scene setForceChatOpen={setForceChatOpen} />
      {!loading && <Chatbot forceOpen={forceChatOpen} setForceOpen={setForceChatOpen} />}
    </main>
  );
}

export default App;
