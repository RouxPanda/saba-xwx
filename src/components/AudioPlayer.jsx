import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioPlayer } from '../context/AudioPlayerContext.jsx';
import ProgressBar from './ProgressBar.jsx';
import { formatTime } from '../utils/timeFormat.js';

function AudioPlayer() {
  const { currentTrack, isPlaying, togglePlay, closePlayer } = useAudioPlayer();
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const seekIntervalRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.load(); // Force reload when track changes
      
      if (isPlaying) {
        audio.play().catch(error => {
          console.error("Audio playback error:", error);
          togglePlay(false);
        });
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, currentTrack, togglePlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setCurrentTime(0);
    };
    const handleEnded = () => {
      setCurrentTime(0);
      togglePlay(false);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplay', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplay', handleLoadedMetadata);
    };
  }, [togglePlay]);

  const startSeek = (direction) => {
    setIsSeeking(true);
    const seekAmount = direction === 'forward' ? 2 : -2;
    
    seekIntervalRef.current = setInterval(() => {
      const audio = audioRef.current;
      if (audio) {
        const newTime = Math.max(0, Math.min(audio.duration, audio.currentTime + seekAmount));
        audio.currentTime = newTime;
      }
    }, 100);
  };

  const stopSeek = () => {
    setIsSeeking(false);
    if (seekIntervalRef.current) {
      clearInterval(seekIntervalRef.current);
      seekIntervalRef.current = null;
    }
  };

  if (!currentTrack) return null;

  return (
    // <AnimatePresence>
    //   {currentTrack && (
    //     <motion.div
    //       initial={{ y: 100, opacity: 0 }}
    //       animate={{ y: 0, opacity: 1 }}
    //       exit={{ y: 100, opacity: 0 }}
    //       className="fixed top-5 right-5 bg-white p-4 rounded-lg shadow-lg z-50"
    //     >
    //       <audio
    //         ref={audioRef}
    //         src={currentTrack.audioUrl}
    //         onEnded={() => togglePlay(false)}
    //       />

    //       <div className="flex items-center gap-4">
    //         <button
    //           onClick={() => togglePlay()}
    //           className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
    //         >
    //           <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    //             {isPlaying ? (
    //               <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
    //             ) : (
    //               <path d="M8 5v14l11-7z"/>
    //             )}
    //           </svg>
    //         </button>

    //         <div className="text-sm">
    //           <p className="font-bold">{currentTrack.title}</p>
    //         </div>

    //         <button
    //           onClick={closePlayer}
    //           className="w-8 h-8 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity"
    //         >
    //           <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    //             <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    //           </svg>
    //         </button>
    //       </div>
    //     </motion.div>
    //   )}
    // </AnimatePresence>
    <AnimatePresence>
      {currentTrack && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className='fixed top-5 right-5 bg-gray-200 p-4 border border-gray-500 z-50'
        >
          <audio ref={audioRef} src={currentTrack.audioUrl} onEnded={() => togglePlay(false)} />

          <div className='flex flex-col items-start'>
            <div className='flex flex-col border border-gray-500 w-full mb-2 p-2 bg-gray-800'>
              {/* Display Title */}
              <div className='w-full text-left border border-red-700 text-green-500 font-mono text-sm'>
                <p>{currentTrack.title}</p>
              </div>
              <div className='w-full text-left border border-blue-700 text-green-500 font-mono text-sm'>
                <p>{currentTrack.artist} {formatTime(currentTime)} / {formatTime(duration)}</p>
              </div>
            </div>

            {/* Playback Controls */}
            <div className='flex items-center space-x-1 border border-gray-500 p-2 bg-gray-300'>
              {/* Play Button */}
              <div className='winCl-wrap'>
                <button
                  onClick={() => togglePlay()}
                  className={`${isPlaying ? "winCl-btn-play" : "winCl-btn"}`}
                  //className={`flex items-center justify-center w-8 h-6 bg-gray-100 border border-gray-500 active:bg-gray-300 ${isPlaying ? 'bg-gray-300' : ''}`}
                >
                  <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M8 5v14l11-7z' />
                  </svg>
                </button>
              </div>

              {/* Pause Button */}
              <div className='winCl-wrap'>
                <button
                  onClick={() => togglePlay(false)}
                  className='winCl-btn'
                  // className="flex items-center justify-center w-8 h-6 bg-gray-100 border border-gray-500 active:bg-gray-300"
                >
                  <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' />
                  </svg>
                </button>
              </div>

              {/* Stop Button */}
              <div className='winCl-wrap'>
                <button
                  onClick={closePlayer}
                  className='winCl-btn'
                  //className="flex items-center justify-center w-8 h-6 bg-gray-100 border border-gray-500 active:bg-gray-300"
                >
                  <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M6 6h12v12H6z' />
                  </svg>
                </button>
              </div>

              {/* Previous Button */}
              <div className='winCl-wrap'>
                <button
                  onClick={() => previousTrack()}
                  className='winCl-btn'
                  //className="flex items-center justify-center w-8 h-6 bg-gray-100 border border-gray-500 active:bg-gray-300"
                >
                  <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M6 4v16l12-8z' />
                  </svg>
                </button>
              </div>

              {/* Next Button */}
              <div className='winCl-wrap'>
                <button
                  onClick={() => nextTrack()}
                  className='winCl-btn'
                  //className="flex items-center justify-center w-8 h-6 bg-gray-100 border border-gray-500 active:bg-gray-300"
                >
                  <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M6 4l12 8-12 8z' />
                  </svg>
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className='w-full pt-2'>
              <ProgressBar
                currentTime={currentTime}
                duration={duration}
                onSeek={time => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = time;
                  }
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AudioPlayer;