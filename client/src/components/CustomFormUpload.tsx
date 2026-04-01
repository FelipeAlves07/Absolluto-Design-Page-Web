import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { Upload, X, Copy, Check } from 'lucide-react';

export default function CustomFormUpload({ onFormCreated }: { onFormCreated: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [cssContent, setCssContent] = useState('');
  const [uniqueLink, setUniqueLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdLink, setCreatedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const createMutation = trpc.customForm.create.useMutation();

  const generateUniqueLink = () => {
    const link = `form-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setUniqueLink(link);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName.trim() || !clientEmail.trim() || !formTitle.trim() || !htmlContent.trim() || !uniqueLink.trim()) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createMutation.mutateAsync({
        clientName,
        clientEmail,
        formTitle,
        htmlContent,
        cssContent,
        uniqueLink,
      });

      if (result.success) {
        const formUrl = `${window.location.origin}/form/${uniqueLink}`;
        setCreatedLink(formUrl);
        toast.success('Formulário criado com sucesso!');
        
        // Reset form
        setClientName('');
        setClientEmail('');
        setFormTitle('');
        setHtmlContent('');
        setCssContent('');
        setUniqueLink('');
        
        onFormCreated();
      } else {
        toast.error('Erro ao criar formulário');
      }
    } catch (error) {
      toast.error('Erro ao criar formulário');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    if (createdLink) {
      navigator.clipboard.writeText(createdLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Link copiado!');
    }
  };

  if (createdLink) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
        <div className="bg-card border border-border rounded-lg max-w-2xl w-full p-8">
          <div className="text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="font-bebas text-3xl text-white mb-4">Formulário Criado!</h2>
            
            <div className="bg-dark border border-border rounded-lg p-6 mb-6 text-left">
              <p className="text-sm text-text-gray mb-2">Link do Formulário:</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={createdLink}
                  readOnly
                  className="flex-1 bg-black border border-blue rounded-lg px-4 py-3 text-white text-sm font-mono"
                />
                <button
                  onClick={copyToClipboard}
                  className="p-3 bg-orange text-black rounded-lg hover:bg-orange/90 transition-colors"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-muted-gray mt-2">
                Compartilhe este link com seu cliente para que ele preencha o formulário.
              </p>
            </div>

            <button
              onClick={() => setCreatedLink(null)}
              className="btn-primary"
            >
              Criar Outro Formulário
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-3 bg-orange text-black font-syne font-semibold rounded-lg hover:bg-orange/90 transition-colors"
      >
        <Upload className="w-5 h-5" />
        Novo Formulário Customizado
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bebas text-3xl text-white">Upload de Formulário</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-2xl text-muted-gray hover:text-white"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Client Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-syne font-semibold text-white mb-2">
                      Nome do Cliente *
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-dark border border-border rounded-lg px-4 py-2 text-white"
                      placeholder="João Silva"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-syne font-semibold text-white mb-2">
                      Email do Cliente *
                    </label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full bg-dark border border-border rounded-lg px-4 py-2 text-white"
                      placeholder="joao@empresa.com"
                    />
                  </div>
                </div>

                {/* Form Title */}
                <div>
                  <label className="block text-sm font-syne font-semibold text-white mb-2">
                    Título do Formulário *
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-dark border border-border rounded-lg px-4 py-2 text-white"
                    placeholder="Briefing de Identidade Visual"
                  />
                </div>

                {/* Unique Link */}
                <div>
                  <label className="block text-sm font-syne font-semibold text-white mb-2">
                    Link Único *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={uniqueLink}
                      onChange={(e) => setUniqueLink(e.target.value)}
                      className="flex-1 bg-dark border border-border rounded-lg px-4 py-2 text-white"
                      placeholder="form-cliente-2024"
                    />
                    <button
                      type="button"
                      onClick={generateUniqueLink}
                      className="px-4 py-2 bg-blue text-white rounded-lg hover:bg-blue/90"
                    >
                      Gerar
                    </button>
                  </div>
                  <p className="text-xs text-muted-gray mt-1">
                    Este será o identificador único do formulário na URL
                  </p>
                </div>

                {/* HTML Content */}
                <div>
                  <label className="block text-sm font-syne font-semibold text-white mb-2">
                    HTML do Formulário *
                  </label>
                  <textarea
                    value={htmlContent}
                    onChange={(e) => setHtmlContent(e.target.value)}
                    className="w-full bg-dark border border-border rounded-lg px-4 py-2 text-white font-mono text-xs resize-none"
                    rows={6}
                    placeholder="<form>...</form>"
                  />
                </div>

                {/* CSS Content */}
                <div>
                  <label className="block text-sm font-syne font-semibold text-white mb-2">
                    CSS do Formulário (Opcional)
                  </label>
                  <textarea
                    value={cssContent}
                    onChange={(e) => setCssContent(e.target.value)}
                    className="w-full bg-dark border border-border rounded-lg px-4 py-2 text-white font-mono text-xs resize-none"
                    rows={4}
                    placeholder="/* Seu CSS aqui */"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 px-6 py-2 bg-dark border border-border text-white rounded-lg hover:border-blue transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-2 bg-orange text-black font-semibold rounded-lg hover:bg-orange/90 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Criando...' : 'Criar Formulário'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
