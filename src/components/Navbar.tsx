import React from 'react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' }
];

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-50 mt-4">
      <div className="bg-black/80 backdrop-blur-md border border-[#dedbc8]/15 rounded-full px-6 py-2.5 shadow-xl">
        <ul className="flex items-center gap-6 sm:gap-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-[#dedbc8]/60 hover:text-[#dedbc8] text-xs sm:text-sm font-medium tracking-wide transition-colors duration-200"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
