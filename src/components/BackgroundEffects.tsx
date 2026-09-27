import React from 'react';

export const BackgroundEffects: React.FC = () => {
  return (
    <>
      {/* SVG noise texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`
        }}
      />

      {/* Cyberpunk Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(124, 92, 252, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124, 92, 252, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Floating luminous glow orbs */}
      <div
        className="fixed -top-24 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none z-0 blur-[100px] opacity-35 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(124, 92, 252, 0.25) 0%, transparent 70%)',
          animationDuration: '8s'
        }}
      />

      <div
        className="fixed top-1/2 -right-32 w-[550px] h-[550px] rounded-full pointer-events-none z-0 blur-[120px] opacity-30 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(0, 229, 192, 0.18) 0%, transparent 70%)',
          animationDuration: '11s'
        }}
      />

      <div
        className="fixed -bottom-24 left-10 w-[600px] h-[600px] rounded-full pointer-events-none z-0 blur-[110px] opacity-25 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(124, 92, 252, 0.2) 0%, transparent 70%)',
          animationDuration: '14s'
        }}
      />
    </>
  );
};
