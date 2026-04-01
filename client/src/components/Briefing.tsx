import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

export default function Briefing() {
  const [selectedType, setSelectedType] = useState<string>('identidade-visual');
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitMutation = trpc.briefing.submit.useMutation();

  const briefingTypes = [
    {
      id: 'identidade-visual',
      title: 'Identidade Visual',
      icon: '🎨',
      fields: [
        { name: 'empresa', label: 'Nome da Empresa', type: 'text' },
        { name: 'descricao', label: 'Descrição do Negócio', type: 'textarea' },
        { name: 'publico', label: 'Público-Alvo', type: 'text' },
        { name: 'cores', label: 'Cores Preferidas', type: 'text' },
      ],
    },
    {
      id: 'social-media',
      title: 'Social Media',
      icon: '📱',
      fields: [
        { name: 'redes', label: 'Quais Redes Sociais?', type: 'text' },
        { name: 'frequencia', label: 'Frequência de Posts', type: 'text' },
        { name: 'objetivo', label: 'Objetivo Principal', type: 'textarea' },
        { name: 'publico', label: 'Público-Alvo', type: 'text' },
      ],
    },
    {
      id: 'design-grafico',
      title: 'Design Gráfico',
      icon: '✨',
      fields: [
        { name: 'tipo', label: 'Tipo de Material', type: 'text' },
        { name: 'quantidade', label: 'Quantidade de Peças', type: 'text' },
        { name: 'descricao', label: 'Descrição do Projeto', type: 'textarea' },
        { name: 'prazo', label: 'Prazo Desejado', type: 'text' },
      ],
    },
    {
      id: 'apresentacoes',
      title: 'Apresentações',
      icon: '🎯',
      fields: [
        { name: 'tema', label: 'Tema da Apresentação', type: 'text' },
        { name: 'slides', label: 'Quantidade de Slides', type: 'text' },
        { name: 'objetivo', label: 'Objetivo', type: 'textarea' },
        { name: 'publico', label: 'Público', type: 'text' },
      ],
    },
  ];

  const currentType = briefingTypes.find((t) => t.id === selectedType);

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clientName.trim() || !clientEmail.trim()) {
      toast.error('Por favor, preencha nome e email');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitMutation.mutateAsync({
        clientName,
        clientEmail,
        briefingType: selectedType,
        formData,
      });

      if (result.success) {
        toast.success('Briefing enviado com sucesso! Em breve entraremos em contato.');
        setClientName('');
        setClientEmail('');
        setFormData({});
      } else {
        toast.error('Erro ao enviar briefing. Tente novamente.');
      }
    } catch (error) {
      toast.error('Erro ao enviar briefing');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="briefing" className="bg-black py-24 md:py-32 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="section-label justify-center">Solicitar Briefing</div>
          <h2 className="section-title">
            Vamos criar algo <span>extraordinário</span>
          </h2>
          <p className="text-text-gray text-lg mt-6">
            Preencha o formulário abaixo e nos envie os detalhes do seu projeto. Analisaremos e entraremos em contato em breve.
          </p>
        </div>

        {/* Type Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {briefingTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => {
                setSelectedType(type.id);
                setFormData({});
              }}
              className={`p-6 rounded-lg border-2 transition-all duration-300 text-left ${
                selectedType === type.id
                  ? 'border-orange bg-card'
                  : 'border-border bg-transparent hover:border-blue'
              }`}
            >
              <div className="text-3xl mb-2">{type.icon}</div>
              <h3 className="font-syne font-bold text-lg text-white">
                {type.title}
              </h3>
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card border border-border p-8 md:p-12 rounded-lg">
          {/* Client Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-syne font-semibold text-white mb-2">
                Seu Nome *
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
                className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-white placeholder-muted-gray focus:border-blue focus:outline-none transition-colors"
                placeholder="João Silva"
              />
            </div>
            <div>
              <label className="block text-sm font-syne font-semibold text-white mb-2">
                Seu Email *
              </label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                required
                className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-white placeholder-muted-gray focus:border-blue focus:outline-none transition-colors"
                placeholder="joao@empresa.com"
              />
            </div>
          </div>

          {/* Dynamic Fields */}
          {currentType && (
            <div className="space-y-6 mb-8">
              {currentType.fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-syne font-semibold text-white mb-2">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={formData[field.name] || ''}
                      onChange={(e) => handleFieldChange(field.name, e.target.value)}
                      className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-white placeholder-muted-gray focus:border-blue focus:outline-none transition-colors resize-none"
                      rows={4}
                      placeholder={`Digite ${field.label.toLowerCase()}...`}
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleFieldChange(field.name, e.target.value)}
                      className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-white placeholder-muted-gray focus:border-blue focus:outline-none transition-colors"
                      placeholder={`Digite ${field.label.toLowerCase()}...`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Briefing'}
          </button>
        </form>
      </div>
    </section>
  );
}
