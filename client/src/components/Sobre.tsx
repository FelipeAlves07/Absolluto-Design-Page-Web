import { useEffect, useRef } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Sobre() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollReveal([]);

  const diferenciais = [
    {
      title: 'Experiência Real',
      description: 'Design no nosso DNA desde a infância.',
    },
    {
      title: 'Estilo Único',
      description: 'Minimalismo tecnológico + vibrante.',
    },
    {
      title: 'Tecnologia',
      description: 'Melhores ferramentas para resultados de ponta.',
    },
    {
      title: 'Comprometimento',
      description: 'Sua satisfação é o nosso combustível.',
    },
  ];

  const skills = [
    'Identidade Visual',
    'Social Media',
    'Design Gráfico',
    'Apresentações',
    'Branding',
    'Motion Design',
  ];

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="bg-dark py-24 md:py-32 px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {/* Text Content */}
          <div className="reveal">
            <div className="section-label">Nossa história</div>
            <h2 className="section-title">
              De hobby a<br />
              <span>agência de elite</span>
            </h2>
            <p className="text-base md:text-lg text-text-gray leading-relaxed mb-6">
              Começamos há mais de 10 anos criando banners e vinhetas para famosos do YouTube. O que era diversão se tornou uma paixão e, hoje, uma profissão sólida.
            </p>
            <p className="text-base md:text-lg text-text-gray leading-relaxed mb-8">
              Com mais de uma década de experiência moldando o cenário digital, evoluímos constantemente para entregar o Absoluto em cada projeto.
            </p>

            {/* Skills Pills */}
            <div className="flex flex-wrap gap-3 mb-12">
              {skills.map((skill) => (
                <span key={skill} className="pill">
                  {skill}
                </span>
              ))}
            </div>

            {/* Diferenciais Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {diferenciais.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-card border border-border p-6 hover:border-blue transition-colors duration-300"
                >
                  <div className="font-bebas text-4xl text-orange mb-3">²</div>
                  <h4 className="font-syne font-bold text-lg text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-text-gray leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="reveal-right flex items-center justify-center">
            <div className="relative w-80 h-80 bg-card border border-border flex items-center justify-center overflow-hidden">
              {/* Glow */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: 'radial-gradient(circle at center, var(--blue-glow), transparent 70%)',
                }}
              />
              {/* Logo */}
              <img src="/logo.png" alt="Absolluto Design²" className="w-64 h-64 object-contain relative z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
