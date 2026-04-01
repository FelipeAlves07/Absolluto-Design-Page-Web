import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Processo', href: '#processo' },
    { label: 'Portfólio', href: '/portfolio' },
    { label: 'Briefing', href: '#briefing' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-16 py-5 md:py-6 flex items-center justify-between transition-all duration-400 ${
        scrolled ? 'bg-black/92 backdrop-blur-lg border-b border-border' : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <a href="#hero" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <img src="/logo.png" alt="Absolluto Design²" className="h-12 md:h-14 w-auto" />
      </a>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-9">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-xs font-syne font-semibold tracking-widest uppercase text-text-gray transition-colors duration-300 hover:text-white relative group"
          >
            {link.label}
            <span className="absolute bottom-0 left-0 w-0 h-px bg-orange transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
        <a href="#contato" className="btn-primary text-xs py-2 px-6">
          Contato
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-dark border-b border-border md:hidden">
          <div className="flex flex-col gap-6 p-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-syne font-semibold tracking-widest uppercase text-text-gray hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#contato" className="btn-primary text-xs py-2 px-6 text-center" onClick={() => setMobileMenuOpen(false)}>
              Contato
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
