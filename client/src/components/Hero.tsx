import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const [counters, setCounters] = useState({ exp: 0, pot: 0, proj: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const animateCounters = () => {
      let exp = 0, pot = 0, proj = 0;
      const interval = setInterval(() => {
        if (exp < 10) exp++;
        if (pot < 1) pot += 0.1;
        if (proj < 100) proj += 10;
        setCounters({ exp, pot: Math.round(pot * 10) / 10, proj });
      }, 30);
      setTimeout(() => clearInterval(interval), 1000);
    };
    animateCounters();
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-20 px-6 md:px-16">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(30, 111, 255, 0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(30, 111, 255, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Glow Effects */}
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none -top-20 -left-20"
        style={{
          background: 'radial-gradient(circle, var(--blue-glow) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute w-64 h-64 rounded-full pointer-events-none -bottom-10 right-1/4"
        style={{
          background: 'radial-gradient(circle, var(--orange-glow) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl">
        {/* Tag */}
        <div
          className="inline-flex items-center gap-2.5 bg-card border border-border rounded-full px-4 py-1.5 mb-8 animate-fadeUp"
          style={{ animationDelay: '0s' }}
        >
          <div className="w-1.5 h-1.5 bg-blue rounded-full animate-pulse-custom" />
          <span className="text-xs font-syne font-semibold tracking-widest uppercase text-blue">
            Agência de Design Premium
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-bebas text-7xl md:text-8xl lg:text-9xl leading-none tracking-wider mb-6 animate-fadeUp"
          style={{ animationDelay: '0.1s' }}
        >
          ABSOLLUTO
          <span className="block text-orange-accent">
            DESIGN<span className="text-base align-super text-blue">²</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-text-gray font-light leading-relaxed max-w-2xl mb-8 animate-fadeUp"
          style={{ animationDelay: '0.2s' }}
        >
          Sua marca, elevada ao quadrado. Não entregamos apenas design — entregamos resultados multiplicados.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-wrap gap-4 animate-fadeUp"
          style={{ animationDelay: '0.3s' }}
        >
          <a href="#briefing" className="btn-primary">
            Iniciar Projeto
          </a>
          <a href="#servicos" className="btn-outline">
            Ver Serviços
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-10 left-6 md:left-16 flex items-center gap-3 animate-fadeUp"
        style={{ animationDelay: '0.5s' }}
      >
        <div className="w-10 h-px bg-border relative overflow-hidden">
          <div
            className="w-full h-px bg-orange absolute animate-scrollLine"
            style={{ animationDelay: '0s' }}
          />
        </div>
        <span className="text-xs font-syne font-semibold tracking-widest uppercase text-muted-gray">
          Scroll
        </span>
      </div>

      {/* Counters */}
      <div className="absolute bottom-10 right-6 md:right-16 hidden lg:flex gap-12 animate-fadeUp" style={{ animationDelay: '0.4s' }}>
        <div className="text-center">
          <div className="font-bebas text-4xl leading-none bg-gradient-to-r from-blue to-orange bg-clip-text text-transparent">
            {counters.exp}+
          </div>
          <div className="text-xs font-syne font-semibold tracking-widest uppercase text-muted-gray mt-1">
            Anos de exp.
          </div>
        </div>
        <div className="text-center">
          <div className="font-bebas text-4xl leading-none bg-gradient-to-r from-blue to-orange bg-clip-text text-transparent">
            ²
          </div>
          <div className="text-xs font-syne font-semibold tracking-widest uppercase text-muted-gray mt-1">
            Potencialização
          </div>
        </div>
        <div className="text-center">
          <div className="font-bebas text-4xl leading-none bg-gradient-to-r from-blue to-orange bg-clip-text text-transparent">
            ∞
          </div>
          <div className="text-xs font-syne font-semibold tracking-widest uppercase text-muted-gray mt-1">
            Projetos
          </div>
        </div>
      </div>
    </section>
  );
}
