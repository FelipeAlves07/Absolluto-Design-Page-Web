import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const navLinks = [
    { label: 'Sobre', href: '/sobre' },
    { label: 'Serviços', href: '/servicos' },
    { label: 'Processo', href: '/processo' },
    { label: 'Portfólio', href: '/portfolio' },
    { label: 'Briefing', href: '/briefing' },
  ];

  const isActive = (href: string) => location === href;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-16 py-4 md:py-5 flex items-center justify-between transition-all duration-400 ${
        scrolled ? 'bg-black/92 backdrop-blur-lg border-b border-border' : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <img
          src="/logo.png"
          alt="Absolluto Design²"
          className="h-16 md:h-20 w-auto"
        />
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-9">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-xs font-syne font-semibold tracking-widest uppercase transition-colors duration-300 relative group ${
              isActive(link.href) ? 'text-white' : 'text-text-gray hover:text-white'
            }`}
          >
            {link.label}
            <span
              className={`absolute -bottom-1 left-0 h-px bg-orange transition-all duration-300 ${
                isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            />
          </Link>
        ))}
        <Link href="/contato" className="btn-primary text-xs py-2 px-6">
          Contato
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white z-10"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/97 border-b border-border md:hidden backdrop-blur-lg">
          <div className="flex flex-col gap-6 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-syne font-semibold tracking-widest uppercase transition-colors ${
                  isActive(link.href) ? 'text-orange' : 'text-text-gray hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contato" className="btn-primary text-xs py-2 px-6 text-center">
              Contato
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
