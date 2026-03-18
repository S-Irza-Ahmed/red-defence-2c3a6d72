import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

interface FloatingParticlesProps {
  count?: number;
  variant?: 'red' | 'blue' | 'purple' | 'mixed';
}

const FloatingParticles = ({ count = 20, variant = 'mixed' }: FloatingParticlesProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = {
      red: ['hsl(0, 85%, 55%)', 'hsl(0, 100%, 60%)'],
      blue: ['hsl(200, 100%, 50%)', 'hsl(195, 100%, 60%)'],
      purple: ['hsl(270, 80%, 60%)', 'hsl(270, 100%, 70%)'],
      mixed: ['hsl(0, 85%, 55%)', 'hsl(200, 100%, 50%)', 'hsl(270, 80%, 60%)'],
    };

    const colorPalette = colors[variant];

    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));

    setParticles(newParticles);
  }, [count, variant]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            animation: `float-particle ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes float-particle {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(20px, -30px) scale(1.1);
            opacity: 0.5;
          }
          50% {
            transform: translate(-10px, -50px) scale(1);
            opacity: 0.3;
          }
          75% {
            transform: translate(-20px, -20px) scale(0.9);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingParticles;
