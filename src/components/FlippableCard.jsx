import React, { useEffect, useState } from 'react';

function FlippableCard({ track, onPlay }) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    console.log(track)
  }, [])
  

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full aspect-square perspective-1000">
      <div
        className="relative w-full h-full transition-transform duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <div 
          className="absolute w-full h-full backface-hidden cursor-pointer"
          onClick={() => setIsFlipped(true)}
        >
          <img 
            src={track.cover} 
            alt={track.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Back of card */}
        <div 
          className="absolute w-full h-full bg-white p-6 flex flex-col backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <button 
            onClick={() => setIsFlipped(false)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>

          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-2">{track.title}</h3>
            <p className="text-gray-600 mb-4">Duration: {formatDuration(track.duration || 180)}</p>
            <p className="text-gray-600 mb-8">{track.description || 'No description available'}</p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlay(track);
            }}
            className="absolute bottom-6 right-6 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlippableCard;