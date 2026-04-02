import { Mail, MessageCircle, Instagram, ExternalLink } from 'lucide-react';

export default function Contato() {
  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: 'absollutodesign@gmail.com',
      href: 'mailto:absollutodesign@gmail.com',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '(31) 97567-2291',
      href: 'https://wa.me/5531975672291',
    },
    {
      icon: ExternalLink,
      label: 'Portfólio',
      value: 'Ver nossos trabalhos',
      href: '/portfolio',
      internal: true,
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@absollutodesign2',
      href: 'https://instagram.com/absollutodesign2',
    },
  ];

  return (
    <section id="contato" className="bg-dark py-24 md:py-32 px-6 md:px-16 min-h-screen flex flex-col justify-center">
      <div className="max-w-4xl mx-auto text-center w-full">
        {/* Header */}
        <div className="mb-12 animate-fadeUp">
          <div className="section-label justify-center">Vamos Conversar</div>
          <h2 className="section-title">
            Entre em <span>contato</span>
          </h2>
          <p className="text-text-gray text-lg leading-relaxed mt-6">
            Estamos prontos para transformar sua visão em realidade. Envie uma mensagem e vamos começar essa jornada juntos.
          </p>
        </div>

        {/* Contact Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactLinks.map((contact, idx) => {
            const Icon = contact.icon;
            const commonClass =
              'flex items-center gap-4 bg-card border border-border p-6 rounded-lg hover:border-blue transition-all duration-300 hover:shadow-lg hover:shadow-blue/20 group animate-fadeUp';
            const style = { animationDelay: `${idx * 0.1}s` };

            if (contact.internal) {
              return (
                <a key={idx} href={contact.href} className={commonClass} style={style}>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue to-orange rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-syne font-semibold tracking-widest uppercase text-muted-gray">
                      {contact.label}
                    </div>
                    <div className="text-white font-syne font-bold">{contact.value}</div>
                  </div>
                </a>
              );
            }

            return (
              <a
                key={idx}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className={commonClass}
                style={style}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue to-orange rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-syne font-semibold tracking-widest uppercase text-muted-gray">
                    {contact.label}
                  </div>
                  <div className="text-white font-syne font-bold">{contact.value}</div>
                </div>
              </a>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="pt-8 border-t border-border animate-fadeUp" style={{ animationDelay: '0.4s' }}>
          <p className="text-text-gray text-sm mb-8">
            Ou clique abaixo para iniciar um projeto
          </p>
          <a href="/briefing" className="btn-primary text-lg px-12 py-4">
            Solicitar Briefing
          </a>
        </div>
      </div>
    </section>
  );
}
