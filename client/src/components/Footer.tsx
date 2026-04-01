export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-border py-8 md:py-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="font-bebas text-lg md:text-xl tracking-widest text-white">
          ABSOLLUTO <span className="text-orange">DESIGN²</span>
        </div>

        {/* Copyright */}
        <p className="text-xs md:text-sm text-muted-gray tracking-wide">
          © {currentYear} Absolluto Design². Sua marca, elevada ao quadrado.
        </p>

        {/* Links */}
        <div className="flex gap-6">
          <a
            href="#sobre"
            className="text-xs md:text-sm text-muted-gray hover:text-blue transition-colors duration-300"
          >
            Sobre
          </a>
          <a
            href="#servicos"
            className="text-xs md:text-sm text-muted-gray hover:text-blue transition-colors duration-300"
          >
            Serviços
          </a>
          <a
            href="#contato"
            className="text-xs md:text-sm text-muted-gray hover:text-blue transition-colors duration-300"
          >
            Contato
          </a>
        </div>
      </div>
    </footer>
  );
}
