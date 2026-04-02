# 🚀 Guia Completo de Deploy — Absolluto Design²

> **Tempo estimado:** 20–30 minutos para tudo funcionar.

---

## PARTE 1 — Subir o código no GitHub

### 1.1 Criar repositório no GitHub
1. Acesse **github.com** e clique em **"New repository"**
2. Nome: `absolluto-design-web`
3. Deixe como **Private** (recomendado)
4. Clique em **"Create repository"**

### 1.2 Enviar o código
Dentro da pasta do projeto, rode no terminal:

```bash
git init
git add .
git commit -m "deploy: absolluto design² v2"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/absolluto-design-web.git
git push -u origin main
```

---

## PARTE 2 — Criar o projeto no Railway

1. Acesse **railway.app** e faça login com GitHub
2. Clique em **"New Project"** → **"Deploy from GitHub repo"**
3. Selecione `absolluto-design-web`
4. Railway vai detectar automaticamente e iniciar o deploy

### 2.1 Adicionar banco de dados MySQL
1. No projeto do Railway, clique em **"+ New"**
2. Selecione **"Database"** → **"MySQL"**
3. Aguarde o MySQL iniciar (fica verde quando pronto)

---

## PARTE 3 — Variáveis de ambiente no Railway

Na aba **Variables** do serviço Node.js (não do MySQL), adicione:

| Variável          | Valor                                          |
|-------------------|------------------------------------------------|
| `DATABASE_URL`    | Copie do MySQL → **"Connect"** → **"MySQL URL"** |
| `JWT_SECRET`      | Qualquer texto longo, ex: `absolluto2024$ecret!XyZ` |
| `NODE_ENV`        | `production`                                   |
| `EMAIL_USER`      | `absollutodesign@gmail.com`                    |
| `EMAIL_PASSWORD`  | App Password do Gmail (ver Parte 4)            |
| `SITE_URL`        | `https://www.absollutodesign.com.br`           |

> ⚠️ Após adicionar as variáveis, o Railway faz redeploy automático.

---

## PARTE 4 — Configurar o Gmail (App Password)

> Isso é necessário para o email dos briefings funcionar!

### Passo a passo:
1. Acesse **myaccount.google.com**
2. Vá em **"Segurança"** (menu lateral)
3. Em **"Como você faz login no Google"**, clique em **"Verificação em duas etapas"**
4. Ative a verificação em duas etapas (se ainda não estiver ativa)
5. Depois de ativar, volte em **"Segurança"** e procure **"Senhas de app"**
6. Clique em **"Senhas de app"**
7. Em "Selecionar app", escolha **"Outro (nome personalizado)"**
8. Digite: `Absolluto Design Site`
9. Clique em **"Gerar"**
10. Copie a senha gerada (16 caracteres, ex: `abcd efgh ijkl mnop`)
11. **Remova os espaços** e cole no Railway em `EMAIL_PASSWORD`
    - Exemplo: `abcdefghijklmnop`

---

## PARTE 5 — Criar as tabelas no banco de dados

### Opção A — Via Railway Dashboard (mais fácil)
1. No Railway, clique no serviço **MySQL**
2. Vá na aba **"Query"** ou **"Data"**
3. Cole e execute o conteúdo completo do arquivo `drizzle/setup_novo.sql`

### Opção B — Via cliente MySQL (TablePlus, DBeaver, etc.)
1. No Railway MySQL → aba **"Connect"** → copie os dados de conexão
2. Conecte com seu cliente SQL favorito
3. Execute o arquivo `drizzle/setup_novo.sql`

---

## PARTE 6 — Criar o primeiro usuário admin

Após o deploy estar online (URL no Railway aparece em verde), rode:

```bash
curl -X POST https://www.absollutodesign.com.br/api/auth/setup \
  -H "Content-Type: application/json" \
  -d '{"name":"Seu Nome","email":"absollutodesign@gmail.com","password":"sua-senha-segura-aqui"}'
```

> ✅ Se retornar `{"success":true}`, deu certo!
> ⚠️ Este endpoint funciona **apenas uma vez** — enquanto não houver nenhum usuário.

### Acessar o painel admin:
1. Acesse `https://www.absollutodesign.com.br/admin`
2. Use o email e senha que você acabou de criar
3. Pronto! 🎉

---

## PARTE 7 — Apontar domínio absollutodesign.com.br

### No Railway:
1. No serviço Node.js → aba **"Settings"** → **"Domains"**
2. Clique em **"+ Custom Domain"**
3. Digite: `www.absollutodesign.com.br`
4. Railway vai mostrar um **CNAME** para configurar

### No seu provedor de domínio (Hostinger, GoDaddy, Registro.br, etc.):
1. Acesse o painel DNS do seu domínio
2. Adicione um registro **CNAME**:
   - Nome/Host: `www`
   - Valor: o CNAME mostrado pelo Railway (ex: `absolluto.up.railway.app`)
   - TTL: 3600
3. Para o domínio raiz (sem www), adicione um **ALIAS** ou **A record**:
   - Nome/Host: `@`
   - Valor: IP fornecido pelo Railway

> ⏱️ Propagação DNS pode levar de 5 minutos a 24 horas.

---

## PARTE 8 — Testar tudo ✅

### Checklist final:
- [ ] Site carrega em `https://www.absollutodesign.com.br`
- [ ] Logo aparece grande na navegação
- [ ] Páginas Sobre, Serviços, Processo, Portfólio, Briefing, Contato abrem sem scroll
- [ ] Clicar em "Ver Projeto" no portfólio abre o modal
- [ ] Preencher e enviar briefing funciona (aparece toast de sucesso)
- [ ] Você recebe email quando briefing é enviado
- [ ] Painel admin em `/admin` funciona (login com email/senha)
- [ ] Formulários customizados podem ser criados e enviados

---

## Problemas comuns e soluções

### ❌ "Erro ao enviar briefing"
- Verifique `DATABASE_URL` no Railway (deve ser a URL MySQL completa)
- Verifique se as tabelas foram criadas (Parte 5)

### ❌ "Não recebo email"
- Verifique `EMAIL_USER` e `EMAIL_PASSWORD` (App Password, sem espaços)
- Confira se a verificação em 2 etapas está ativa no Gmail
- Verifique a pasta de Spam/Lixo eletrônico

### ❌ "Login não funciona"
- Certifique-se de ter criado o admin via curl (Parte 6)
- Verifique o `JWT_SECRET` — deve ser o mesmo em todos os deploys

### ❌ "Erro 500 no servidor"
- Veja os logs no Railway (aba "Logs" do serviço)
- Verifique se todas as variáveis de ambiente estão preenchidas

---

## Esqueci a senha do admin

No Railway, abra o **MySQL Query** e rode:

```sql
-- Gere um hash novo com Node.js primeiro:
-- node -e "import('bcryptjs').then(b => b.default.hash('nova-senha', 12).then(h => console.log(h)))"
-- Depois substitua o hash abaixo:

UPDATE users SET passwordHash = 'HASH_GERADO_AQUI' WHERE email = 'absollutodesign@gmail.com';
```

---

**Versão:** 2.1.0 — Deploy definitivo  
**Última atualização:** Abril de 2026
