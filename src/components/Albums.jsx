import React from 'react';
import { useAudioPlayer } from '../context/AudioPlayerContext.jsx';
import { albums } from '../data/albums.js';
import FlippableCard from './FlippableCard.jsx';

function Albums() {
  const { playTrack } = useAudioPlayer();

  return (
    <section id="albums" className="min-h-screen flex flex-col justify-center py-20 px-4">
      <h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold uppercase tracking-tighter text-center mb-16"
      >
        Albums
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {albums.map((album) => (
          <div
            key={album.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whilehover={{ scale: 1.02 }}
            className="relative aspect-square cursor-pointer"
            onClick={() => playTrack(album)}
          >
            <FlippableCard track={album} onPlay={playTrack} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Albums;