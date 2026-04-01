import { useEffect, useRef } from 'react';
import { TrendingUp, Users, Zap } from 'lucide-react';

export default function Alcance() {
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

  const stats = [
    {
      icon: TrendingUp,
      numero: '500+',
      label: 'Projetos Entregues',
      descricao: 'Criamos soluções que crescem com você',
    },
    {
      icon: Users,
      numero: '200+',
      label: 'Clientes Satisfeitos',
      descricao: 'Relacionamentos que duram anos',
    },
    {
      icon: Zap,
      numero: '10+',
      label: 'Anos de Experiência',
      descricao: 'Evolução constante e inovação',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="alcance"
      className="bg-black py-24 md:py-32 px-6 md:px-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 reveal text-center">
          <div className="section-label justify-center">Nosso Alcance</div>
          <h2 className="section-title">
            Números que <span>falam</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="reveal bg-card border border-border p-8 text-center hover:border-blue transition-all duration-300 hover:shadow-lg hover:shadow-blue/20"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue to-orange rounded-lg flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Number */}
                <div className="font-bebas text-5xl text-orange mb-2">
                  {stat.numero}
                </div>

                {/* Label */}
                <h3 className="font-syne font-bold text-lg text-white mb-3">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-text-gray text-sm leading-relaxed">
                  {stat.descricao}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 reveal text-center">
          <p className="text-text-gray text-lg mb-8">
            Pronto para elevar sua marca ao quadrado?
          </p>
          <a href="#briefing" className="btn-primary">
            Começar Agora
          </a>
        </div>
      </div>
    </section>
  );
}
