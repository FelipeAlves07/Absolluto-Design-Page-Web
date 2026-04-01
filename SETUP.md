# Absolluto Design² — Guia de Setup e Deploy

## 📋 Visão Geral

Site completo da Absolluto Design² com:
- ✅ Homepage com todas as seções (Hero, Sobre, Serviços, Processo, Alcance)
- ✅ Sistema de formulários dinâmicos de briefing
- ✅ Painel administrativo para gerenciar briefings
- ✅ Integração com banco de dados MySQL
- ✅ Autenticação própria com email e senha (sem dependências externas)
- ✅ Design responsivo com identidade visual da marca

## 🚀 Deploy no Railway

Consulte o arquivo **`DEPLOY_RAILWAY.md`** para o guia completo passo a passo.

## 🗄️ Banco de Dados

Use o arquivo **`drizzle/setup_novo.sql`** para criar todas as tabelas.

## 🔐 Autenticação

O sistema usa autenticação própria com email e senha — sem OAuth externo.

Após criar o banco, crie o primeiro admin chamando:

```bash
curl -X POST https://SEU-DOMINIO/api/auth/setup \
  -H "Content-Type: application/json" \
  -d '{"name":"Seu Nome","email":"admin@absolluto.com","password":"sua-senha"}'
```

Depois acesse `/admin` para fazer login.

## 🎨 Customização

### Cores e Tipografia

Edite `/client/src/index.css`:

```css
:root {
  --black: #080808;
  --blue: #1E6FFF;
  --orange: #FF4C00;
}
```

## 📞 Contato

Para suporte, entre em contato com a Absolluto Design².

---
**Versão**: 2.0.0 — Auth própria
**Última atualização**: Abril de 2026
