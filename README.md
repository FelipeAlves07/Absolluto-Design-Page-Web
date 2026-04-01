# Absolluto Design² - Website Completo

Site profissional da Absolluto Design² com sistema de formulários dinâmicos, painel administrativo e integração com banco de dados.

## 🚀 Funcionalidades

### Para Clientes
- **Homepage**: Apresentação completa com Hero, Sobre, Serviços, Processo, Alcance
- **Formulários de Briefing**: 4 tipos de formulários dinâmicos (Identidade Visual, Social Media, Design Gráfico, Apresentações)
- **Formulários Customizados**: Acesse formulários personalizados via link único (ex: `seu-dominio.com/form/cliente-2024`)
- **Contato**: WhatsApp, Email, LinkedIn, Instagram

### Para Admin
- **Painel Admin** (`/admin`): Gerenciar todos os briefings e formulários
- **Filtros**: Por status (Novo, Em Andamento, Concluído)
- **Upload de Formulários**: Crie formulários HTML/CSS customizados para cada cliente
- **Notificações por Email**: Receba notificações automáticas quando cliente enviar briefing
- **Visualização Detalhada**: Veja todas as respostas e adicione notas

## 📋 Pré-requisitos

1. **Conta Supabase** (gratuita): https://supabase.com
2. **Conta Vercel** (gratuita): https://vercel.com
3. **Node.js 18+** (para desenvolvimento local)

## 🔧 Setup Supabase (Banco de Dados Gratuito)

### Passo 1: Criar Projeto no Supabase

1. Acesse https://supabase.com
2. Clique em "New Project"
3. Preencha:
   - **Project name**: `absolluto-design`
   - **Database password**: Crie uma senha forte
   - **Region**: Escolha a mais próxima (ex: `sa-east-1` para Brasil)
4. Clique em "Create new project" e aguarde (~2 minutos)

### Passo 2: Executar Migrations SQL

Após o projeto ser criado:

1. No painel Supabase, clique em "SQL Editor" (lado esquerdo)
2. Clique em "New Query"
3. Cole o seguinte SQL:

```sql
-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  openId VARCHAR(64) UNIQUE NOT NULL,
  name TEXT,
  email VARCHAR(320),
  loginMethod VARCHAR(64),
  role VARCHAR(10) DEFAULT 'user' NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW() NOT NULL,
  updatedAt TIMESTAMP DEFAULT NOW() NOT NULL,
  lastSignedIn TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Tabela de Briefings
CREATE TABLE IF NOT EXISTS briefings (
  id SERIAL PRIMARY KEY,
  clientName VARCHAR(255) NOT NULL,
  clientEmail VARCHAR(320) NOT NULL,
  briefingType VARCHAR(50) NOT NULL,
  formData TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'novo' NOT NULL,
  notes TEXT,
  createdAt TIMESTAMP DEFAULT NOW() NOT NULL,
  updatedAt TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Tabela de Formulários Customizados
CREATE TABLE IF NOT EXISTS customForms (
  id SERIAL PRIMARY KEY,
  clientName VARCHAR(255) NOT NULL,
  clientEmail VARCHAR(320) NOT NULL,
  formTitle VARCHAR(255) NOT NULL,
  htmlContent TEXT NOT NULL,
  cssContent TEXT,
  uniqueLink VARCHAR(100) UNIQUE NOT NULL,
  isActive INT DEFAULT 1 NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW() NOT NULL,
  updatedAt TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Tabela de Respostas de Formulários Customizados
CREATE TABLE IF NOT EXISTS customFormSubmissions (
  id SERIAL PRIMARY KEY,
  formId INT NOT NULL,
  clientName VARCHAR(255) NOT NULL,
  clientEmail VARCHAR(320) NOT NULL,
  formData TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Índices para melhor performance
CREATE INDEX idx_briefings_status ON briefings(status);
CREATE INDEX idx_customForms_uniqueLink ON customForms(uniqueLink);
CREATE INDEX idx_customFormSubmissions_formId ON customFormSubmissions(formId);
```

4. Clique em "Run" (botão azul)
5. Aguarde a execução

### Passo 3: Copiar Connection String

1. No painel Supabase, vá para "Settings" → "Database"
2. Copie a **Connection string** (URI format)
3. Substitua `[YOUR-PASSWORD]` pela senha que você criou
4. Guarde essa string para usar no Vercel

**Exemplo:**
```
postgresql://postgres:[SUA-SENHA]@db.xxxxxxxxxxxx.supabase.co:5432/postgres
```

## 🌐 Deploy no Vercel

### Passo 1: Preparar o Código

1. Certifique-se de que todo o código está commitado:
```bash
git add .
git commit -m "Absolluto Design² - Pronto para deploy"
```

2. Faça push para GitHub:
```bash
git push origin main
```

### Passo 2: Conectar ao Vercel

1. Acesse https://vercel.com
2. Clique em "Add New..." → "Project"
3. Selecione seu repositório GitHub
4. Clique em "Import"

### Passo 3: Configurar Variáveis de Ambiente

Na página de configuração do Vercel, adicione as seguintes variáveis:

| Variável | Valor |
|----------|-------|
| `DATABASE_URL` | Connection string do Supabase (copiada acima) |
| `JWT_SECRET` | Gere uma string aleatória (ex: `openssl rand -base64 32`) |
| `VITE_APP_ID` | ID da aplicação (deixe em branco por enquanto) |
| `OAUTH_SERVER_URL` | *(não necessário)* |
| `VITE_OAUTH_PORTAL_URL` | *(não necessário)* |
| `EMAIL_USER` | `absollutodesign@gmail.com` |
| `EMAIL_PASSWORD` | Senha de app do Gmail (veja abaixo) |

### Passo 4: Configurar Email (Gmail)

Para receber notificações por email:

1. Acesse sua conta Google: https://myaccount.google.com
2. Vá para "Security" (Segurança)
3. Ative "2-Step Verification" (Verificação em 2 etapas)
4. Vá para "App passwords" (Senhas de app)
5. Selecione "Mail" e "Windows Computer"
6. Copie a senha gerada
7. Use essa senha como `EMAIL_PASSWORD` no Vercel

### Passo 5: Deploy

1. Clique em "Deploy"
2. Aguarde ~5 minutos
3. Seu site estará online em `https://seu-projeto.vercel.app`

## 🔑 Configurar Admin

Para ter acesso ao painel admin (`/admin`):

1. Faça login no site com sua conta
2. Acesse o banco de dados Supabase
3. Na tabela `users`, encontre seu usuário
4. Altere o campo `role` de `user` para `admin`
5. Salve

## 📝 Como Usar os Formulários Customizados

### Criar um Novo Formulário para Cliente

1. Acesse `/admin` (painel administrativo)
2. Clique na aba "Formulários Customizados"
3. Clique em "Novo Formulário Customizado"
4. Preencha:
   - **Nome do Cliente**: Nome do cliente
   - **Email do Cliente**: Email para receber notificações
   - **Título do Formulário**: Título que aparecerá para o cliente
   - **HTML do Formulário**: Cole o HTML do seu formulário
   - **CSS do Formulário**: Cole o CSS (opcional)
   - **Link Único**: Identificador único (ex: `cliente-2024`)

5. Clique em "Criar Formulário"
6. Copie o link gerado e envie para o cliente

### Exemplo de HTML para Formulário

```html
<form>
  <h2>Briefing de Identidade Visual</h2>
  
  <input type="hidden" name="clientName" value="Cliente">
  <input type="hidden" name="clientEmail" value="cliente@email.com">
  
  <div>
    <label>Nome da Empresa:</label>
    <input type="text" name="empresa" required>
  </div>
  
  <div>
    <label>Descrição:</label>
    <textarea name="descricao" required></textarea>
  </div>
  
  <button type="submit">Enviar</button>
</form>
```

## 📧 Notificações por Email

Quando um cliente enviar um briefing ou responder um formulário customizado, você receberá um email automático em `absollutodesign@gmail.com` com:

- Nome e email do cliente
- Tipo de formulário
- Todos os dados preenchidos
- Link direto para o painel admin

## 🛠️ Desenvolvimento Local

Para desenvolver localmente:

```bash
# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais

# Iniciar servidor de desenvolvimento
pnpm dev

# Acessar em http://localhost:3000
```

## 📊 Estrutura do Projeto

```
absolluto-design-web/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── pages/         # Páginas (Home, Admin, CustomFormPage)
│   │   ├── components/    # Componentes reutilizáveis
│   │   └── lib/           # Utilitários (tRPC client)
│   └── index.html         # HTML principal
├── server/                # Backend Express + tRPC
│   ├── routers.ts         # Procedimentos tRPC
│   ├── db.ts              # Funções de banco de dados
│   └── _core/             # Configurações internas
├── drizzle/               # Schema e migrations do banco
└── package.json           # Dependências
```

## 🔒 Segurança

- Todas as operações de admin requerem autenticação
- Senhas de email não são armazenadas no código
- Dados são validados no servidor
- Conexão com banco de dados é criptografada

## 🆘 Troubleshooting

### "Erro ao conectar ao banco de dados"
- Verifique se a `DATABASE_URL` está correta
- Certifique-se de que o Supabase está rodando
- Teste a conexão: `psql [DATABASE_URL]`

### "Email não está sendo enviado"
- Verifique se `EMAIL_USER` e `EMAIL_PASSWORD` estão corretos
- Certifique-se de que 2FA está ativado no Gmail
- Verifique a pasta de spam

### "Formulário customizado não carrega"
- Verifique se o `uniqueLink` está correto na URL
- Certifique-se de que o formulário está ativo no banco

## 📞 Suporte

Para dúvidas ou problemas, entre em contato com a Absolluto Design².

---

**Versão**: 2.0.0  
**Última atualização**: Abril de 2026  
**Absolluto Design² - Sua marca, elevada ao quadrado.**
