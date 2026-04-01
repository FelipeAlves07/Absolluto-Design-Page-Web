import { useEffect, useRef } from 'react';

export default function Processo() {
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

  const etapas = [
    {
      numero: '01',
      titulo: 'Imersão',
      descricao: 'Entendemos profundamente seu negócio, mercado e objetivos.',
    },
    {
      numero: '02',
      titulo: 'Estratégia',
      descricao: 'Desenvolvemos uma estratégia sólida e criativa para seus projetos.',
    },
    {
      numero: '03',
      titulo: 'Criação',
      descricao: 'Executamos com excelência e atenção aos detalhes.',
    },
    {
      numero: '04',
      titulo: 'Entrega',
      descricao: 'Entregamos resultados que superam expectativas.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="processo"
      className="bg-dark py-24 md:py-32 px-6 md:px-16 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 reveal">
          <div className="section-label">Como Trabalhamos</div>
          <h2 className="section-title">
            Nosso <span>processo</span> criativo
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-32 left-0 right-0 h-0.5 bg-gradient-to-r from-blue via-orange to-transparent" />

          {etapas.map((etapa, idx) => (
            <div
              key={idx}
              className="reveal relative"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Number Circle */}
              <div className="mb-6 relative">
                <div className="w-20 h-20 rounded-full border-2 border-orange flex items-center justify-center relative z-10 bg-black">
                  <span className="font-bebas text-3xl text-orange">{etapa.numero}</span>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-syne font-bold text-xl text-white mb-3">
                  {etapa.titulo}
                </h3>
                <p className="text-text-gray text-sm leading-relaxed">
                  {etapa.descricao}
                </p>
              </div>

              {/* Arrow (Mobile) */}
              {idx < etapas.length - 1 && (
                <div className="lg:hidden flex justify-center mt-8">
                  <div className="text-orange text-2xl">↓</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
