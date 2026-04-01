import { useEffect, useRef } from 'react';
import { Palette, Share2, Sparkles, Presentation } from 'lucide-react';

export default function Servicos() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal').forEach((el) => {
            el.classList.add('visible');
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const servicos = [
    {
      icon: Palette,
      title: 'Identidade Visual',
      description: 'Criamos identidades visuais que marcam presença e comunicam sua essência.',
      features: ['Logo Design', 'Paleta de Cores', 'Tipografia', 'Guidelines'],
    },
    {
      icon: Share2,
      title: 'Social Media',
      description: 'Conteúdo estratégico que engaja, cresce e converte sua audiência.',
      features: ['Posts Criativos', 'Reels & Stories', 'Estratégia', 'Community Mgmt'],
    },
    {
      icon: Sparkles,
      title: 'Design Gráfico',
      description: 'Peças gráficas impactantes que elevam sua comunicação visual.',
      features: ['Flyers', 'Banners', 'Cartazes', 'Materiais Impressos'],
    },
    {
      icon: Presentation,
      title: 'Apresentações',
      description: 'Decks e apresentações que impressionam e comunicam com clareza.',
      features: ['Pitch Decks', 'Relatórios', 'Propostas', 'Eventos'],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="servicos"
      className="bg-black py-24 md:py-32 px-6 md:px-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 reveal">
          <div className="section-label">Nossas Soluções</div>
          <h2 className="section-title">
            Serviços que <span>multiplicam</span> resultados
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicos.map((servico, idx) => {
            const Icon = servico.icon;
            return (
              <div
                key={idx}
                className="reveal bg-card border border-border p-8 hover:border-blue transition-all duration-300 hover:shadow-lg hover:shadow-blue/20 group"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue to-orange rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-syne font-bold text-xl md:text-2xl text-white mb-3">
                  {servico.title}
                </h3>

                {/* Description */}
                <p className="text-text-gray text-sm md:text-base leading-relaxed mb-6">
                  {servico.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {servico.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-orange rounded-full" />
                      <span className="text-xs md:text-sm text-text-gray font-syne font-semibold tracking-wide uppercase">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="#briefing"
                  className="inline-block mt-8 text-xs font-syne font-bold tracking-widest uppercase text-blue hover:text-orange transition-colors duration-300"
                >
                  Solicitar Briefing →
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
