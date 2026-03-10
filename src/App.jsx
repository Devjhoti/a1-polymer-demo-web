import React from 'react';
import Scene from './components/Three/Scene';
import Navbar from './components/Navbar';
import './index.css';

function App() {
  return (
    <main style={{ background: '#050505' }}>
      <Navbar />
      <Scene />
    </main>
  );
}

export default App;
