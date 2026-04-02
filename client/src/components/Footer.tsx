import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-border py-8 md:py-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="font-bebas text-lg md:text-xl tracking-widest text-white hover:opacity-80 transition-opacity">
          ABSOLLUTO <span className="text-orange">DESIGN²</span>
        </Link>

        {/* Copyright */}
        <p className="text-xs md:text-sm text-muted-gray tracking-wide text-center">
          © 2020 - {new Date().getFullYear()} Absolluto Design². Sua marca, elevada ao quadrado.
        </p>

        {/* Links */}
        <div className="flex gap-6">
          <Link
            href="/sobre"
            className="text-xs md:text-sm text-muted-gray hover:text-blue transition-colors duration-300"
          >
            Sobre
          </Link>
          <Link
            href="/servicos"
            className="text-xs md:text-sm text-muted-gray hover:text-blue transition-colors duration-300"
          >
            Serviços
          </Link>
          <Link
            href="/portfolio"
            className="text-xs md:text-sm text-muted-gray hover:text-blue transition-colors duration-300"
          >
            Portfólio
          </Link>
          <Link
            href="/contato"
            className="text-xs md:text-sm text-muted-gray hover:text-blue transition-colors duration-300"
          >
            Contato
          </Link>
        </div>
      </div>
    </footer>
  );
}
