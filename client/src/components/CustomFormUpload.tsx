import { useState, useRef } from 'react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { Upload, X, Copy, Check, FileCode, Link2 } from 'lucide-react';

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
  const [inputMode, setInputMode] = useState<'paste' | 'file'>('paste');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createMutation = trpc.customForm.create.useMutation();

  const generateUniqueLink = () => {
    const link = `briefing-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    setUniqueLink(link);
  };

  const readFile = (file: File) => {
    if (!file.name.endsWith('.html') && !file.name.endsWith('.htm')) {
      toast.error('Somente arquivos .html são aceitos');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setHtmlContent(content);
      // Auto-preencher título com nome do arquivo
      if (!formTitle) {
        setFormTitle(file.name.replace(/\.(html|htm)$/i, '').replace(/-|_/g, ' '));
      }
      toast.success(`Arquivo "${file.name}" carregado!`);
    };
    reader.readAsText(file);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) readFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) readFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName.trim() || !clientEmail.trim() || !formTitle.trim() || !htmlContent.trim()) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (!uniqueLink.trim()) {
      generateUniqueLink();
      toast('Link gerado automaticamente!');
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
        setClientName('');
        setClientEmail('');
        setFormTitle('');
        setHtmlContent('');
        setCssContent('');
        setUniqueLink('');
        onFormCreated();
      } else {
        toast.error('Erro ao criar formulário. Tente novamente.');
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

  const resetAndClose = () => {
    setCreatedLink(null);
    setIsOpen(false);
  };

  // ── Tela de sucesso ──────────────────────────────────────────────────────────
  if (createdLink) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
        <div className="bg-card border border-border rounded-2xl max-w-lg w-full p-8">
          <div className="text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="font-bebas text-3xl text-white mb-2">Formulário Criado!</h2>
            <p className="text-text-gray text-sm mb-8">
              Copie o link abaixo e envie para o seu cliente.
            </p>

            <div className="bg-dark border border-blue rounded-xl p-5 mb-6 text-left">
              <div className="flex items-center gap-2 mb-3">
                <Link2 className="w-4 h-4 text-blue" />
                <span className="text-xs font-syne font-semibold text-blue uppercase tracking-widest">Link do Formulário</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={createdLink}
                  readOnly
                  className="flex-1 bg-black border border-border rounded-lg px-3 py-2 text-white text-xs font-mono"
                />
                <button
                  onClick={copyToClipboard}
                  className="p-2 bg-orange text-black rounded-lg hover:bg-orange/90 transition-colors flex-shrink-0"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-muted-gray mt-3">
                ✅ Ao preencher o formulário, você receberá um email automaticamente.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCreatedLink(null)}
                className="flex-1 px-4 py-3 bg-dark border border-border text-white rounded-lg hover:border-blue transition-colors font-syne font-semibold text-sm"
              >
                Criar outro
              </button>
              <button
                onClick={resetAndClose}
                className="flex-1 btn-primary py-3"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Botão + Modal principal ───────────────────────────────────────────────────
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-3 bg-orange text-black font-syne font-bold rounded-lg hover:bg-orange/90 transition-colors"
      >
        <Upload className="w-5 h-5" />
        Novo Formulário Customizado
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-card border border-border rounded-2xl max-w-2xl w-full my-4">
            {/* Header */}
            <div className="flex justify-between items-center p-8 pb-0">
              <div>
                <h2 className="font-bebas text-3xl text-white">Upload de Formulário</h2>
                <p className="text-text-gray text-sm mt-1">Cole o HTML ou faça upload do arquivo</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-gray hover:text-white hover:border-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Dados do cliente */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-syne font-semibold text-white mb-2">
                    Nome do Cliente *
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-white placeholder:text-muted-gray focus:border-blue focus:outline-none transition-colors"
                    placeholder="João Silva"
                    required
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
                    className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-white placeholder:text-muted-gray focus:border-blue focus:outline-none transition-colors"
                    placeholder="joao@empresa.com"
                    required
                  />
                </div>
              </div>

              {/* Título */}
              <div>
                <label className="block text-sm font-syne font-semibold text-white mb-2">
                  Título do Formulário *
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-white placeholder:text-muted-gray focus:border-blue focus:outline-none transition-colors"
                  placeholder="Briefing de Identidade Visual — João Silva"
                  required
                />
              </div>

              {/* Link único */}
              <div>
                <label className="block text-sm font-syne font-semibold text-white mb-2">
                  Link Único (URL)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={uniqueLink}
                    onChange={(e) => setUniqueLink(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))}
                    className="flex-1 bg-dark border border-border rounded-lg px-4 py-3 text-white placeholder:text-muted-gray focus:border-blue focus:outline-none transition-colors font-mono text-sm"
                    placeholder="briefing-joao-silva"
                  />
                  <button
                    type="button"
                    onClick={generateUniqueLink}
                    className="px-4 py-3 bg-blue text-white rounded-lg hover:bg-blue/90 transition-colors font-syne font-semibold text-sm whitespace-nowrap"
                  >
                    Gerar automático
                  </button>
                </div>
                <p className="text-xs text-muted-gray mt-1">
                  O link do cliente será: <span className="text-blue font-mono">/form/{uniqueLink || 'seu-link-aqui'}</span>
                </p>
              </div>

              {/* Modo de input do HTML */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-syne font-semibold text-white">
                    HTML do Formulário *
                  </label>
                  <div className="flex gap-1 bg-dark border border-border rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => setInputMode('paste')}
                      className={`px-3 py-1 rounded text-xs font-syne font-semibold transition-colors ${inputMode === 'paste' ? 'bg-orange text-black' : 'text-muted-gray hover:text-white'}`}
                    >
                      Colar código
                    </button>
                    <button
                      type="button"
                      onClick={() => setInputMode('file')}
                      className={`px-3 py-1 rounded text-xs font-syne font-semibold transition-colors ${inputMode === 'file' ? 'bg-orange text-black' : 'text-muted-gray hover:text-white'}`}
                    >
                      Upload arquivo
                    </button>
                  </div>
                </div>

                {inputMode === 'paste' ? (
                  <textarea
                    value={htmlContent}
                    onChange={(e) => setHtmlContent(e.target.value)}
                    className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-white font-mono text-xs resize-none focus:border-blue focus:outline-none transition-colors"
                    rows={8}
                    placeholder="<form>&#10;  <input type='text' name='nome' placeholder='Seu nome' />&#10;  ...&#10;</form>"
                    required
                  />
                ) : (
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                      dragOver ? 'border-orange bg-orange/5' : htmlContent ? 'border-green-500 bg-green-500/5' : 'border-border hover:border-blue hover:bg-blue/5'
                    }`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleFileDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".html,.htm"
                      className="hidden"
                      onChange={handleFileInput}
                    />
                    {htmlContent ? (
                      <>
                        <div className="text-4xl mb-3">✅</div>
                        <p className="text-green-400 font-syne font-semibold">Arquivo carregado!</p>
                        <p className="text-xs text-muted-gray mt-1">{htmlContent.length} caracteres. Clique para trocar.</p>
                      </>
                    ) : (
                      <>
                        <FileCode className="w-10 h-10 text-muted-gray mx-auto mb-3" />
                        <p className="text-white font-syne font-semibold">Arraste o arquivo .html aqui</p>
                        <p className="text-xs text-muted-gray mt-1">ou clique para selecionar</p>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* CSS opcional */}
              <div>
                <label className="block text-sm font-syne font-semibold text-white mb-2">
                  CSS Adicional <span className="text-muted-gray font-normal">(opcional)</span>
                </label>
                <textarea
                  value={cssContent}
                  onChange={(e) => setCssContent(e.target.value)}
                  className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-white font-mono text-xs resize-none focus:border-blue focus:outline-none transition-colors"
                  rows={3}
                  placeholder="/* Estilos adicionais para o formulário */"
                />
              </div>

              {/* Botões */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-6 py-3 bg-dark border border-border text-white rounded-lg hover:border-blue transition-colors font-syne font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Criando...' : 'Criar Formulário →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
