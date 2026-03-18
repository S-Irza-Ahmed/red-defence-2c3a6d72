import { useState, useEffect } from 'react';

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

const TypeWriter = ({ text, speed = 50, delay = 500, className = '' }: TypeWriterProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Initial delay before starting
    timeout = setTimeout(() => {
      let currentIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          // Hide cursor after typing is complete
          setTimeout(() => setShowCursor(false), 1500);
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return (
    <span className={className}>
      {displayedText}
      <span 
        className={`inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle transition-opacity duration-300 ${
          showCursor ? 'animate-pulse' : 'opacity-0'
        }`}
      />
    </span>
  );
};

export default TypeWriter;
