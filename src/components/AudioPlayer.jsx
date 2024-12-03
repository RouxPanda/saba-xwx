import React, { useEffect, useRef, useState } from 'react';
import { useAudioPlayer } from '../context/AudioPlayerContext.jsx';

function AudioPlayer() {
  const { currentTrack, isPlaying, togglePlay, closePlayer } = useAudioPlayer();
  const audioRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Audio playback error:", error);
            setError(true);
            togglePlay(false);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (currentTrack) {
      setError(false);
    }
  }, [currentTrack]);

  if (!currentTrack) return null;

  return (
      <div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-5 right-5 bg-white p-4 rounded-lg shadow-lg z-50"
      >
        <audio
          ref={audioRef}
          src={currentTrack.audioUrl}
          onEnded={() => togglePlay(false)}
          onError={() => setError(true)}
        />
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => togglePlay()}
            className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
            disabled={error}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              {isPlaying ? (
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              ) : (
                <path d="M8 5v14l11-7z"/>
              )}
            </svg>
          </button>
          
          <div className="text-sm">
            <p className="font-bold">{currentTrack.title}</p>
            {error && <p className="text-red-500 text-xs">Error playing track</p>}
          </div>
          
          <button
            onClick={closePlayer}
            className="w-8 h-8 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
      </div>
  );
}

export default AudioPlayer;