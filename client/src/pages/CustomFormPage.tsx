import { useEffect, useRef, useState } from 'react';
import { useParams } from 'wouter';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

export default function CustomFormPage() {
  const { uniqueLink } = useParams<{ uniqueLink: string }>();
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  const formQuery = trpc.customForm.getByLink.useQuery(
    { uniqueLink: uniqueLink || '' },
    { enabled: !!uniqueLink }
  );

  const submitMutation = trpc.customForm.submit.useMutation();

  // Injeta CSS customizado na página
  useEffect(() => {
    const css = formQuery.data?.cssContent;
    if (!css) return;
    const style = document.createElement('style');
    style.id = 'custom-form-css';
    style.innerHTML = css;
    document.head.appendChild(style);
    return () => {
      document.getElementById('custom-form-css')?.remove();
    };
  }, [formQuery.data?.cssContent]);

  // Quando o form carrega, injeta o HTML e trata o submit
  useEffect(() => {
    if (!formQuery.data) return;
    setLoading(false);

    if (!formContainerRef.current) return;

    // Injeta HTML
    formContainerRef.current.innerHTML = formQuery.data.htmlContent;

    // Encontra todos os forms e intercepta o submit
    const forms = formContainerRef.current.querySelectorAll('form');

    const handleSubmit = async (e: SubmitEvent) => {
      e.preventDefault();
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      const data: Record<string, any> = {};

      formData.forEach((value, key) => {
        if (data[key]) {
          data[key] = Array.isArray(data[key])
            ? [...data[key], value]
            : [data[key], value];
        } else {
          data[key] = value;
        }
      });

      // Extrai nome e email dos campos comuns
      const clientName =
        (data['nome'] || data['clientName'] || data['name'] || data['cliente'] || 'Cliente') as string;
      const clientEmail =
        (data['email'] || data['clientEmail'] || data['e-mail'] || '') as string;

      if (!clientEmail) {
        toast.error('Por favor, preencha seu email no formulário');
        return;
      }

      try {
        const result = await submitMutation.mutateAsync({
          uniqueLink: uniqueLink || '',
          clientName: String(clientName),
          clientEmail: String(clientEmail),
          formData: data,
        });

        if (result.success) {
          setSubmitted(true);
        } else {
          toast.error(result.error || 'Erro ao enviar. Tente novamente.');
        }
      } catch {
        toast.error('Erro de conexão. Tente novamente.');
      }
    };

    forms.forEach((form) => {
      form.addEventListener('submit', handleSubmit as EventListener);
    });

    return () => {
      forms.forEach((form) => {
        form.removeEventListener('submit', handleSubmit as EventListener);
      });
    };
  }, [formQuery.data, uniqueLink]);

  // Error state
  useEffect(() => {
    if (formQuery.isError || (formQuery.data === null && !formQuery.isLoading)) {
      setLoading(false);
      setError('Formulário não encontrado ou expirado.');
    }
  }, [formQuery.isError, formQuery.data, formQuery.isLoading]);

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-orange border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-text-gray font-syne text-sm tracking-widest uppercase">
            Carregando formulário...
          </p>
        </div>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">😕</div>
          <h1 className="font-bebas text-4xl text-white mb-4">Formulário não encontrado</h1>
          <p className="text-text-gray">
            Este link pode ter expirado ou não existe. Entre em contato com a Absolluto Design².
          </p>
          <a
            href="https://www.absollutodesign.com.br"
            className="inline-block mt-8 btn-primary"
          >
            Voltar ao site
          </a>
        </div>
      </div>
    );
  }

  // ── Sucesso após envio ───────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="font-bebas text-4xl text-white mb-4">Enviado com sucesso!</h1>
          <p className="text-text-gray text-lg mb-2">
            Suas respostas foram registradas.
          </p>
          <p className="text-text-gray text-sm">
            Em breve a equipe da <strong className="text-white">Absolluto Design²</strong> entrará em contato.
          </p>
          <div className="mt-10 pt-8 border-t border-border">
            <p className="text-xs text-muted-gray">Absolluto Design² — Sua marca, elevada ao quadrado.</p>
          </div>
        </div>
      </div>
    );
  }

  // ── Formulário ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-black">
      <Toaster />

      {/* Header mínimo */}
      <div className="bg-black border-b border-border py-4 px-6 flex items-center gap-3">
        <a href="https://www.absollutodesign.com.br" className="font-bebas text-lg tracking-widest text-white hover:text-orange transition-colors">
          ABSOLLUTO <span className="text-orange">DESIGN²</span>
        </a>
        {formQuery.data?.formTitle && (
          <>
            <span className="text-border">|</span>
            <span className="text-text-gray text-sm font-syne">{formQuery.data.formTitle}</span>
          </>
        )}
      </div>

      {/* Conteúdo do formulário */}
      <div className="py-12 px-6">
        <div
          ref={formContainerRef}
          className="max-w-2xl mx-auto"
        />
      </div>
    </div>
  );
}
