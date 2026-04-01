import { Mail, MessageCircle, Linkedin, Instagram } from 'lucide-react';

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
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Absolluto Design',
      href: 'https://linkedin.com',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@absolluto.design',
      href: 'https://instagram.com/absolluto.design',
    },
  ];

  return (
    <section id="contato" className="bg-dark py-24 md:py-32 px-6 md:px-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
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
            return (
              <a
                key={idx}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-card border border-border p-6 rounded-lg hover:border-blue transition-all duration-300 hover:shadow-lg hover:shadow-blue/20 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue to-orange rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-syne font-semibold tracking-widest uppercase text-muted-gray">
                    {contact.label}
                  </div>
                  <div className="text-white font-syne font-bold">
                    {contact.value}
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="pt-8 border-t border-border">
          <p className="text-text-gray text-sm mb-8">
            Ou clique abaixo para iniciar um projeto
          </p>
          <a href="#briefing" className="btn-primary text-lg px-12 py-4">
            Solicitar Briefing
          </a>
        </div>
      </div>
    </section>
  );
}
