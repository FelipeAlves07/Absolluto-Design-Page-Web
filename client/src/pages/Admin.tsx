import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { useState } from 'react';
import { toast } from 'sonner';
import { Eye, Trash2, CheckCircle, Clock, AlertCircle, FileText, LogOut, Lock } from 'lucide-react';
import CustomFormUpload from '@/components/CustomFormUpload';

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Erro ao fazer login.');
      } else {
        onSuccess();
      }
    } catch {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange/10 border border-orange rounded-2xl mb-6">
            <Lock className="w-8 h-8 text-orange" />
          </div>
          <h1 className="font-bebas text-4xl text-white mb-2">Painel Admin</h1>
          <p className="text-text-gray text-sm">Absolluto Design²</p>
        </div>

        <form onSubmit={handleLogin} className="bg-card border border-border rounded-2xl p-8 space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-syne font-semibold text-white mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="admin@absolluto.com"
              className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-white placeholder:text-muted-gray focus:outline-none focus:border-blue transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-syne font-semibold text-white mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-dark border border-border rounded-lg px-4 py-3 text-white placeholder:text-muted-gray focus:outline-none focus:border-blue transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange text-black font-syne font-bold py-3 rounded-lg hover:bg-orange/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Admin() {
  const { user, loading, refresh, logout } = useAuth();
  const [selectedBriefing, setSelectedBriefing] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [activeTab, setActiveTab] = useState<'briefings' | 'forms'>('briefings');

  const briefingsQuery = trpc.briefing.list.useQuery(undefined, {
    enabled: user?.role === 'admin',
  });

  const customFormsQuery = trpc.customForm.list.useQuery(undefined, {
    enabled: user?.role === 'admin',
  });

  const updateMutation = trpc.briefing.update.useMutation({
    onSuccess: () => { briefingsQuery.refetch(); toast.success('Briefing atualizado'); },
  });

  const deleteMutation = trpc.briefing.delete.useMutation({
    onSuccess: () => { briefingsQuery.refetch(); toast.success('Briefing deletado'); },
  });

  const deleteFormMutation = trpc.customForm.delete.useMutation({
    onSuccess: () => { customFormsQuery.refetch(); toast.success('Formulário deletado'); },
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-text-gray">Carregando...</div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <LoginForm onSuccess={() => refresh()} />;
  }

  const briefings = briefingsQuery.data || [];
  const filtered = statusFilter === 'todos' ? briefings : briefings.filter((b: any) => b.status === statusFilter);
  const customForms = customFormsQuery.data || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'novo': return <AlertCircle className="w-5 h-5 text-orange" />;
      case 'em-andamento': return <Clock className="w-5 h-5 text-blue" />;
      case 'concluido': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'novo': return 'Novo';
      case 'em-andamento': return 'Em Andamento';
      case 'concluido': return 'Concluído';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-black py-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex items-start justify-between">
          <div>
            <h1 className="font-bebas text-5xl text-white mb-2">Painel Admin</h1>
            <p className="text-text-gray">Olá, {user.name || user.email}</p>
          </div>
          <button
            onClick={() => logout()}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-text-gray hover:text-white hover:border-white transition-colors text-sm font-syne"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('briefings')}
            className={`px-6 py-3 font-syne font-semibold border-b-2 transition-colors ${activeTab === 'briefings' ? 'border-orange text-orange' : 'border-transparent text-text-gray hover:text-white'}`}
          >
            Briefings Padrão
          </button>
          <button
            onClick={() => setActiveTab('forms')}
            className={`px-6 py-3 font-syne font-semibold border-b-2 transition-colors ${activeTab === 'forms' ? 'border-orange text-orange' : 'border-transparent text-text-gray hover:text-white'}`}
          >
            Formulários Customizados
          </button>
        </div>

        {/* Briefings Tab */}
        {activeTab === 'briefings' && (
          <>
            <div className="flex gap-4 mb-8 flex-wrap">
              {['todos', 'novo', 'em-andamento', 'concluido'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-6 py-2 rounded-lg font-syne font-semibold text-sm transition-all ${statusFilter === status ? 'bg-orange text-black' : 'bg-card border border-border text-white hover:border-blue'}`}
                >
                  {status === 'todos' ? 'Todos' : getStatusLabel(status)}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filtered.length === 0 ? (
                <div className="bg-card border border-border rounded-lg p-8 text-center">
                  <p className="text-text-gray">Nenhum briefing encontrado</p>
                </div>
              ) : (
                filtered.map((briefing: any) => (
                  <div key={briefing.id} className="bg-card border border-border rounded-lg p-6 hover:border-blue transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-syne font-bold text-lg text-white">{briefing.clientName}</h3>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(briefing.status)}
                            <span className="text-xs font-syne font-semibold text-muted-gray uppercase">{getStatusLabel(briefing.status)}</span>
                          </div>
                        </div>
                        <p className="text-text-gray text-sm mb-2">{briefing.clientEmail}</p>
                        <div className="flex gap-4 text-xs text-muted-gray">
                          <span>Tipo: {briefing.briefingType}</span>
                          <span>Data: {new Date(briefing.createdAt).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setSelectedBriefing(briefing)} className="p-2 bg-blue/10 border border-blue rounded-lg text-blue hover:bg-blue/20 transition-colors" title="Ver detalhes">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button onClick={() => { if (confirm('Tem certeza que deseja deletar?')) deleteMutation.mutate({ id: briefing.id }); }} className="p-2 bg-red-500/10 border border-red-500 rounded-lg text-red-500 hover:bg-red-500/20 transition-colors" title="Deletar">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* Custom Forms Tab */}
        {activeTab === 'forms' && (
          <>
            <div className="mb-8">
              <CustomFormUpload onFormCreated={() => customFormsQuery.refetch()} />
            </div>
            <div className="space-y-4">
              {customForms.length === 0 ? (
                <div className="bg-card border border-border rounded-lg p-8 text-center">
                  <FileText className="w-12 h-12 text-muted-gray mx-auto mb-4" />
                  <p className="text-text-gray mb-4">Nenhum formulário customizado criado ainda</p>
                  <p className="text-xs text-muted-gray">Clique no botão acima para criar um novo formulário</p>
                </div>
              ) : (
                customForms.map((form: any) => (
                  <div key={form.id} className="bg-card border border-border rounded-lg p-6 hover:border-blue transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-syne font-bold text-lg text-white mb-2">{form.formTitle}</h3>
                        <p className="text-text-gray text-sm mb-2">{form.clientName}</p>
                        <div className="flex gap-4 text-xs text-muted-gray mb-4">
                          <span>Email: {form.clientEmail}</span>
                          <span>Data: {new Date(form.createdAt).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="bg-dark border border-border rounded-lg p-3">
                          <p className="text-xs text-muted-gray mb-2">Link do Formulário:</p>
                          <input type="text" value={`${window.location.origin}/form/${form.uniqueLink}`} readOnly className="w-full bg-black border border-blue rounded-lg px-3 py-2 text-white text-xs font-mono" />
                        </div>
                      </div>
                      <button onClick={() => { if (confirm('Tem certeza que deseja deletar este formulário?')) deleteFormMutation.mutate({ id: form.id }); }} className="p-2 bg-red-500/10 border border-red-500 rounded-lg text-red-500 hover:bg-red-500/20 transition-colors" title="Deletar">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* Detail Modal */}
        {selectedBriefing && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="font-bebas text-3xl text-white mb-2">{selectedBriefing.clientName}</h2>
                    <p className="text-text-gray">{selectedBriefing.clientEmail}</p>
                  </div>
                  <button onClick={() => setSelectedBriefing(null)} className="text-2xl text-muted-gray hover:text-white">×</button>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-syne font-semibold text-white mb-2">Status</label>
                    <select value={selectedBriefing.status} onChange={(e) => { updateMutation.mutate({ id: selectedBriefing.id, status: e.target.value }); setSelectedBriefing({ ...selectedBriefing, status: e.target.value }); }} className="w-full bg-dark border border-border rounded-lg px-4 py-2 text-white">
                      <option value="novo">Novo</option>
                      <option value="em-andamento">Em Andamento</option>
                      <option value="concluido">Concluído</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-syne font-semibold text-white mb-2">Anotações</label>
                    <textarea value={selectedBriefing.notes || ''} onChange={(e) => setSelectedBriefing({ ...selectedBriefing, notes: e.target.value })} onBlur={() => updateMutation.mutate({ id: selectedBriefing.id, notes: selectedBriefing.notes })} className="w-full bg-dark border border-border rounded-lg px-4 py-2 text-white resize-none" rows={4} />
                  </div>
                  <div>
                    <h3 className="font-syne font-bold text-white mb-3">Dados do Formulário</h3>
                    <div className="bg-dark border border-border rounded-lg p-4">
                      <pre className="text-xs text-text-gray overflow-x-auto">{JSON.stringify(JSON.parse(selectedBriefing.formData), null, 2)}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
