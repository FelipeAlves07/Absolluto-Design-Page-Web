import { useEffect, useState } from 'react';
import { useParams } from 'wouter';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

export default function CustomFormPage() {
  const { uniqueLink } = useParams<{ uniqueLink: string }>();
  const [formHtml, setFormHtml] = useState<string>('');
  const [formCss, setFormCss] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formQuery = trpc.customForm.getByLink.useQuery(
    { uniqueLink: uniqueLink || '' },
    { enabled: !!uniqueLink }
  );

  const submitMutation = trpc.customForm.submit.useMutation();

  useEffect(() => {
    if (formQuery.data) {
      setFormHtml(formQuery.data.htmlContent);
      setFormCss(formQuery.data.cssContent || '');
      setLoading(false);
    } else if (formQuery.isError) {
      setError('Formulário não encontrado');
      setLoading(false);
    }
  }, [formQuery.data, formQuery.isError]);

  useEffect(() => {
    // Inject CSS into the page
    if (formCss) {
      const style = document.createElement('style');
      style.innerHTML = formCss;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, [formCss]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: Record<string, any> = {};

    formData.forEach((value, key) => {
      if (data[key]) {
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      } else {
        data[key] = value;
      }
    });

    const clientName = data.clientName || 'Cliente';
    const clientEmail = data.clientEmail || '';

    if (!clientEmail) {
      toast.error('Por favor, preencha seu email');
      return;
    }

    try {
      const result = await submitMutation.mutateAsync({
        uniqueLink: uniqueLink || '',
        clientName,
        clientEmail,
        formData: data,
      });

      if (result.success) {
        toast.success('Formulário enviado com sucesso!');
        e.currentTarget.reset();
      } else {
        toast.error(result.error || 'Erro ao enviar formulário');
      }
    } catch (error) {
      toast.error('Erro ao enviar formulário');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bebas text-white mb-4">Carregando formulário...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bebas text-white mb-4">Erro</h1>
          <p className="text-text-gray">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleFormSubmit} dangerouslySetInnerHTML={{ __html: formHtml }} />
      </div>
    </div>
  );
}
