import React from 'react';
import { profileData } from '../data/profile';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 px-4 sm:px-6 md:px-12 border-t border-[#dedbc8]/[0.08]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[#dedbc8]/30 text-xs tracking-wider">
        <span>PETLA KEERTHI &middot; &copy; 2025 &ndash; 2026</span>
        <span>{profileData.headline} &middot; {profileData.location}</span>
      </div>
    </footer>
  );
};
