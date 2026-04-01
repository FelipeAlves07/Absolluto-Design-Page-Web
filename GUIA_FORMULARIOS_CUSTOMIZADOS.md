# 📋 Guia Completo: Como Usar Formulários Customizados

## O que é o Sistema de Formulários Customizados?

Você pode criar um formulário **único e personalizado para cada cliente** com seu próprio HTML e CSS. Cada cliente recebe um **link exclusivo** para responder seu briefing.

**Exemplo:**
- Cliente A: `seu-site.com/form/cliente-a-identidade-visual`
- Cliente B: `seu-site.com/form/cliente-b-social-media`
- Cliente C: `seu-site.com/form/cliente-c-apresentacoes`

---

## 🎯 Fluxo Completo (Passo a Passo)

### PASSO 1: Você cria um formulário HTML/CSS no Figma ou Adobe XD

Você já tem esse processo, certo? Você cria um PDF de apresentação e depois transforma em HTML/CSS.

**Exemplo de um formulário que você pode criar:**

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      background: #0a0a0a; 
      font-family: 'Syne', sans-serif;
      padding: 40px 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #1a1a1a;
      padding: 40px;
      border-radius: 12px;
      border: 2px solid #1E6FFF;
    }
    h1 {
      color: #FF4C00;
      font-size: 32px;
      margin-bottom: 10px;
    }
    .subtitle {
      color: #999;
      margin-bottom: 30px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      color: #fff;
      margin-bottom: 8px;
      font-weight: 600;
    }
    input, textarea, select {
      width: 100%;
      padding: 12px;
      background: #0a0a0a;
      border: 1px solid #333;
      border-radius: 6px;
      color: #fff;
      font-family: inherit;
    }
    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: #1E6FFF;
      box-shadow: 0 0 0 3px rgba(30, 111, 255, 0.1);
    }
    textarea { resize: vertical; min-height: 120px; }
    button {
      width: 100%;
      padding: 14px;
      background: #FF4C00;
      color: #000;
      border: none;
      border-radius: 6px;
      font-weight: 700;
      cursor: pointer;
      font-size: 16px;
      transition: background 0.3s;
    }
    button:hover { background: #E63C00; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Briefing de Identidade Visual</h1>
    <p class="subtitle">Preencha os dados abaixo para iniciarmos seu projeto</p>
    
    <form>
      <!-- Esses campos são OBRIGATÓRIOS e devem estar em todo formulário -->
      <input type="hidden" name="clientName" value="João Silva">
      <input type="hidden" name="clientEmail" value="joao@empresa.com">
      
      <!-- Seus campos customizados -->
      <div class="form-group">
        <label>Nome da Empresa *</label>
        <input type="text" name="nomeEmpresa" required>
      </div>
      
      <div class="form-group">
        <label>Segmento de Mercado *</label>
        <select name="segmento" required>
          <option value="">Selecione...</option>
          <option value="tecnologia">Tecnologia</option>
          <option value="saude">Saúde</option>
          <option value="educacao">Educação</option>
          <option value="varejo">Varejo</option>
          <option value="outro">Outro</option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Descreva sua marca em 3 palavras *</label>
        <input type="text" name="palavrasChave" placeholder="Ex: Inovador, Confiável, Moderno" required>
      </div>
      
      <div class="form-group">
        <label>Qual é seu público-alvo? *</label>
        <textarea name="publicoAlvo" required></textarea>
      </div>
      
      <div class="form-group">
        <label>Cores que você gosta? *</label>
        <input type="text" name="coresPreferidas" placeholder="Ex: Azul, Laranja, Preto" required>
      </div>
      
      <div class="form-group">
        <label>Referências de design (links ou descrição)</label>
        <textarea name="referencias"></textarea>
      </div>
      
      <button type="submit">Enviar Briefing</button>
    </form>
  </div>
</body>
</html>
```

---

### PASSO 2: Você acessa o Painel Admin

1. Acesse: `seu-site.com/admin`
2. Faça login com sua conta
3. Clique na aba **"Formulários Customizados"**

---

### PASSO 3: Clique em "Novo Formulário Customizado"

Vai abrir uma janela com um formulário para você preencher:

```
┌─────────────────────────────────────────┐
│  Upload de Formulário                   │
├─────────────────────────────────────────┤
│                                         │
│ Nome do Cliente *                       │
│ [João Silva                           ] │
│                                         │
│ Email do Cliente *                      │
│ [joao@empresa.com                     ] │
│                                         │
│ Título do Formulário *                  │
│ [Briefing de Identidade Visual        ] │
│                                         │
│ Link Único * (ou clique "Gerar")        │
│ [cliente-joao-identidade-visual       ] │
│                                         │
│ HTML do Formulário * (Cole aqui)        │
│ ┌─────────────────────────────────────┐ │
│ │ <!DOCTYPE html>                     │ │
│ │ <html>                              │ │
│ │ ...                                 │ │
│ │ </html>                             │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ CSS do Formulário (Opcional)            │
│ ┌─────────────────────────────────────┐ │
│ │ (deixe em branco se CSS está no     │ │
│ │  HTML, ou cole aqui se preferir)    │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [Cancelar]  [Criar Formulário]          │
└─────────────────────────────────────────┘
```

---

### PASSO 4: Preencha os Campos

#### **Nome do Cliente**
- Quem é o cliente? Ex: "João Silva", "Empresa XYZ"

#### **Email do Cliente**
- Email para receber notificações quando o cliente responder
- Ex: `seu-email@absolluto.com` (você receberá as respostas aqui)

#### **Título do Formulário**
- Como o formulário vai aparecer para o cliente
- Ex: "Briefing de Identidade Visual"

#### **Link Único** ⭐ IMPORTANTE
- Identificador único na URL
- **Regras:**
  - Sem espaços
  - Sem caracteres especiais
  - Use hífens para separar palavras
  - Seja descritivo
  
**Exemplos bons:**
- `cliente-joao-identidade-visual`
- `empresa-xyz-social-media`
- `startup-tech-apresentacoes`
- `loja-online-design-grafico`

**Exemplos ruins:**
- `cliente1` (não é descritivo)
- `form@123` (tem caracteres especiais)
- `briefing de identidade visual` (tem espaços)

**Dica:** Clique em "Gerar" para criar um link único automaticamente!

#### **HTML do Formulário**
- Cole todo o código HTML do seu formulário
- **IMPORTANTE:** O formulário DEVE ter esses 2 campos ocultos:
  ```html
  <input type="hidden" name="clientName" value="João Silva">
  <input type="hidden" name="clientEmail" value="joao@empresa.com">
  ```

#### **CSS do Formulário** (Opcional)
- Se você colocou `<style>` dentro do HTML, deixe em branco
- Se preferir separar, cole o CSS aqui

---

### PASSO 5: Clique em "Criar Formulário"

Pronto! Você verá uma mensagem de sucesso com o **link do formulário**:

```
┌─────────────────────────────────────────┐
│           ✅ Formulário Criado!          │
├─────────────────────────────────────────┤
│                                         │
│ Link do Formulário:                     │
│ ┌─────────────────────────────────────┐ │
│ │ https://seu-site.com/form/          │ │
│ │ cliente-joao-identidade-visual      │ │
│ │                                     │ │
│ │ [📋 Copiar]                         │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Compartilhe este link com seu cliente   │
│ para que ele preencha o formulário.     │
│                                         │
│ [Criar Outro Formulário]                │
└─────────────────────────────────────────┘
```

---

### PASSO 6: Copie o Link e Envie para o Cliente

Clique em "Copiar" e envie para o cliente por:
- WhatsApp
- Email
- Qualquer outro meio

**Mensagem de exemplo:**
```
Olá João! 👋

Criei um formulário especial para seu projeto de Identidade Visual.

Por favor, preencha todos os dados clicando no link abaixo:
https://seu-site.com/form/cliente-joao-identidade-visual

Isso vai nos ajudar a entender melhor sua marca e criar algo incrível! 🚀

Qualquer dúvida, é só chamar!
```

---

### PASSO 7: Cliente Responde o Formulário

O cliente acessa o link e vê o formulário customizado:

```
┌──────────────────────────────────────────┐
│                                          │
│     ABSOLLUTO DESIGN²                    │
│                                          │
│ Briefing de Identidade Visual            │
│ Preencha os dados abaixo para            │
│ iniciarmos seu projeto                   │
│                                          │
│ Nome da Empresa *                        │
│ [                                      ] │
│                                          │
│ Segmento de Mercado *                    │
│ [Selecione...                          ▼] │
│                                          │
│ Descreva sua marca em 3 palavras *       │
│ [                                      ] │
│                                          │
│ Qual é seu público-alvo? *               │
│ ┌──────────────────────────────────────┐ │
│ │                                      │ │
│ │                                      │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ Cores que você gosta? *                  │
│ [                                      ] │
│                                          │
│ Referências de design                    │
│ ┌──────────────────────────────────────┐ │
│ │                                      │ │
│ │                                      │ │
│ └──────────────────────────────────────┘ │
│                                          │
│        [Enviar Briefing]                 │
│                                          │
└──────────────────────────────────────────┘
```

---

### PASSO 8: Você Recebe Notificação por Email

Quando o cliente clica em "Enviar", você recebe um email em `absollutodesign@gmail.com`:

```
De: Sistema Absolluto Design²
Assunto: 📋 Novo Briefing Recebido - Identidade Visual

Olá!

Você recebeu uma nova resposta de formulário!

👤 Cliente: João Silva
📧 Email: joao@empresa.com
📋 Formulário: Briefing de Identidade Visual
📅 Data: 01/04/2026 às 14:30

RESPOSTAS:
─────────────────────────────────────
Nome da Empresa: Tech Solutions
Segmento de Mercado: Tecnologia
Palavras-chave: Inovador, Confiável, Moderno
Público-alvo: Empresas de 50-500 funcionários
Cores: Azul, Laranja, Branco
Referências: [links enviados]
─────────────────────────────────────

Acesse o painel admin para ver todos os detalhes:
https://seu-site.com/admin
```

---

### PASSO 9: Você Visualiza no Painel Admin

1. Acesse `/admin`
2. Clique na aba **"Briefings Padrão"** (se foi um briefing normal)
   - OU **"Formulários Customizados"** (para gerenciar os formulários)
3. Clique no ícone de "Olho" para ver os detalhes completos
4. Adicione notas e atualize o status

```
┌──────────────────────────────────────────┐
│ Painel Admin > Briefings Padrão           │
├──────────────────────────────────────────┤
│                                          │
│ João Silva                    [🔴 Novo]  │
│ joao@empresa.com                         │
│ Tipo: Identidade Visual                  │
│ Data: 01/04/2026                         │
│                                    [👁️] [🗑️] │
│                                          │
│ ┌──────────────────────────────────────┐ │
│ │ Status: [Novo ▼]                     │ │
│ │                                      │ │
│ │ Anotações:                           │ │
│ │ ┌────────────────────────────────┐   │ │
│ │ │ Projeto interessante! Cliente  │   │ │
│ │ │ quer algo moderno e inovador.  │   │ │
│ │ │ Agendar reunião para 05/04.    │   │ │
│ │ └────────────────────────────────┘   │ │
│ │                                      │ │
│ │ Dados do Formulário:                 │ │
│ │ {                                    │ │
│ │   "nomeEmpresa": "Tech Solutions",   │ │
│ │   "segmento": "tecnologia",          │ │
│ │   ...                                │ │
│ │ }                                    │ │
│ └──────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

---

## 💡 Exemplo Prático Completo

### Cenário: Você quer criar um briefing para "Loja Online ABC"

**PASSO 1:** Você cria um formulário HTML/CSS no seu editor (Figma → HTML/CSS)

**PASSO 2:** Você vai para `/admin` → "Formulários Customizados" → "Novo"

**PASSO 3:** Preenche:
- **Nome do Cliente:** Loja Online ABC
- **Email do Cliente:** seu-email@absolluto.com
- **Título:** Briefing de Design Gráfico para E-commerce
- **Link Único:** loja-abc-design-ecommerce
- **HTML:** [Cola o HTML do formulário]
- **CSS:** [Cola o CSS ou deixa em branco]

**PASSO 4:** Clica "Criar Formulário"

**PASSO 5:** Copia o link: `https://seu-site.com/form/loja-abc-design-ecommerce`

**PASSO 6:** Envia para o cliente

**PASSO 7:** Cliente responde

**PASSO 8:** Você recebe email com as respostas

**PASSO 9:** Você visualiza no painel admin e começa o trabalho!

---

## ⚠️ Pontos Importantes

### ✅ O que DEVE ter em todo formulário:
```html
<input type="hidden" name="clientName" value="Nome do Cliente">
<input type="hidden" name="clientEmail" value="email@cliente.com">
```

### ✅ O que você pode customizar:
- Cores
- Tipografia
- Layout
- Campos do formulário
- Imagens
- Animações
- Qualquer coisa em HTML/CSS!

### ❌ O que NÃO fazer:
- Usar JavaScript complexo (pode não funcionar)
- Usar `<form method="POST" action="...">` (o sistema já trata disso)
- Deixar os campos ocultos em branco

### 🔄 Para atualizar um formulário:
1. Vá para `/admin` → "Formulários Customizados"
2. Delete o antigo (ícone de lixeira)
3. Crie um novo com o link atualizado

---

## 📞 Resumo Rápido

| Ação | Como Fazer |
|------|-----------|
| **Criar formulário** | `/admin` → "Formulários Customizados" → "Novo" |
| **Copiar link** | Clique no botão "Copiar" após criar |
| **Enviar para cliente** | Copie o link e envie por WhatsApp/Email |
| **Ver respostas** | `/admin` → "Briefings Padrão" → Clique no ícone de olho |
| **Receber notificação** | Email automático em `absollutodesign@gmail.com` |
| **Adicionar notas** | Clique no briefing e escreva na seção "Anotações" |
| **Deletar formulário** | `/admin` → "Formulários Customizados" → Ícone de lixeira |

---

## 🎓 Dúvidas Frequentes

**P: Posso usar o mesmo link para vários clientes?**
R: Não, cada link é único. Crie um novo para cada cliente.

**P: E se o cliente não responder?**
R: Você pode enviar um lembrete com o link novamente.

**P: Posso editar um formulário depois de criado?**
R: Delete o antigo e crie um novo. As respostas antigas são mantidas.

**P: Quantos formulários posso criar?**
R: Ilimitado! Crie quantos precisar.

**P: Os dados são salvos automaticamente?**
R: Sim! Quando o cliente clica "Enviar", tudo é salvo no banco de dados.

---

Pronto! Agora você sabe como usar o sistema de formulários customizados! 🚀
