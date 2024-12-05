import React from 'react';
import ThreeScene from './components/ThreeScene';
import Header from './components/Header';
import Hero from './components/Hero';
import Albums from './components/Albums';
import Singles from './components/Singles';
import Social from './components/Social';
import AudioPlayer from './components/AudioPlayer';
import { AudioPlayerProvider } from './context/AudioPlayerContext.jsx';

const App = () => {
  return (
    <AudioPlayerProvider>
      <div className="App">
        <ThreeScene/>
        <Header />
        <main>
          <div className='z-5 relative'>
            <Hero />
            <Albums />
            <Singles />
            <Social />
          </div>
        </main>
        <AudioPlayer />
      </div>
    </AudioPlayerProvider>
  );
}


export default App;
