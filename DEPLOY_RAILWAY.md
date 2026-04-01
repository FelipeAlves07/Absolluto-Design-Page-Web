# 🚀 Guia de Deploy no Railway — Absolluto Design²

## O que mudou nesta versão
- ✅ OAuth Manus **removido**
- ✅ Login próprio com **email e senha** (JWT + bcrypt)
- ✅ Sem dependência de nenhum serviço externo de autenticação

---

## Passo 1 — Subir no GitHub

```bash
git init
git add .
git commit -m "deploy: auth próprio, sem Manus"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/absolluto-design-web.git
git push -u origin main
```

---

## Passo 2 — Criar projeto no Railway

1. Acesse **railway.app** e faça login com GitHub
2. Clique em **"New Project"** → **"Deploy from GitHub repo"**
3. Selecione o repositório `absolluto-design-web`
4. Clique em **"+ New"** → **"Database"** → **"MySQL"**

---

## Passo 3 — Variáveis de ambiente

Na aba **Variables** do seu serviço Node.js, adicione:

| Variável        | Valor                                      |
|-----------------|--------------------------------------------|
| `DATABASE_URL`  | (copie do serviço MySQL do Railway)        |
| `JWT_SECRET`    | qualquer texto longo e aleatório           |
| `NODE_ENV`      | `production`                               |

> ⚠️ Não precisa mais de OAUTH_SERVER_URL, OWNER_OPEN_ID nem nenhuma variável do Manus!

---

## Passo 4 — Criar as tabelas no banco

1. No Railway, clique no serviço **MySQL**
2. Vá na aba **"Data"** ou use um cliente MySQL
3. Execute o conteúdo do arquivo **`drizzle/setup_novo.sql`**

---

## Passo 5 — Criar o primeiro admin

Após o deploy estar online, acesse via terminal ou curl:

```bash
curl -X POST https://SEU-APP.up.railway.app/api/auth/setup \
  -H "Content-Type: application/json" \
  -d '{"name":"Seu Nome","email":"admin@absolluto.com","password":"sua-senha-segura"}'
```

> ⚠️ Este endpoint funciona **apenas uma vez** — enquanto não houver nenhum usuário no banco.
> Depois da criação, ele fica bloqueado automaticamente.

---

## Passo 6 — Acessar o painel

1. Acesse `https://SEU-APP.up.railway.app/admin`
2. Use o email e senha que você criou no passo anterior
3. Pronto! 🎉

---

## Como fazer login no dia a dia

Acesse `/admin` — a tela de login aparece automaticamente se você não estiver logado.

---

## Esqueci a senha — como resetar?

No Railway, vá em **MySQL → Data**, encontre sua linha na tabela `users` e atualize o campo `passwordHash`.

Para gerar um novo hash, use este script Node.js:

```js
import bcrypt from 'bcryptjs';
console.log(await bcrypt.hash('nova-senha', 12));
```

---

## Dúvidas?

Qualquer problema no deploy, abra o Claude e cole a mensagem de erro! 😊
