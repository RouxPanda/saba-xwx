import React from 'react';
import './styles.css';
import ThreeScene from './components/ThreeScene';
import Header from './components/Header';
import Hero from './components/Hero';
import Albums from './components/Albums';
import Singles from './components/Singles';
import Social from './components/Social';
import { AudioPlayerProvider } from './context/AudioPlayerContext.jsx';

const App = () => {
  return (
    <AudioPlayerProvider>
      <div className="App">
        <ThreeScene/>
        <Header />
        <main>
          <Hero />
          <Albums />
          <Singles />
          <Social />
        </main>
      </div>
    </AudioPlayerProvider>
  );
}


export default App;
