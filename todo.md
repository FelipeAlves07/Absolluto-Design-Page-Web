# Absolluto Design² - TODO List

## Fase 1: Configuração Visual e Tema
- [x] Configurar tema global com CSS variables (cores, tipografia)
- [x] Configurar scrollbar customizado
- [x] Importar fontes Google (Bebas Neue, Syne, DM Sans)

## Fase 2: Componentes Base
- [x] Criar componente Navigation com scroll detection
- [x] Criar componente Hero com animações
- [x] Criar componente Sobre com cards de diferenciais
- [x] Criar componente Serviços (4 cards)
- [x] Criar componente Processo (4 etapas)
- [x] Criar componente Alcance
- [x] Criar componente Contato
- [x] Criar componente Footer

## Fase 3: Sistema de Formulários Dinâmicos
- [x] Criar estrutura de dados para formulários personalizados
- [x] Implementar componente Briefing com campos dinâmicos
- [x] Criar 4 tipos de formulários (Identidade Visual, Social Media, Design Gráfico, Apresentações)
- [x] Implementar validação de formulários

## Fase 4: Integração com Banco de Dados
- [x] Criar schema Drizzle para tabela `briefings`
- [x] Gerar migration SQL
- [x] Criar tabela `briefings` no banco de dados
- [x] Implementar funções de CRUD em server/db.ts
- [x] Criar endpoints tRPC para briefing

## Fase 5: Painel Administrativo
- [x] Criar página Admin com autenticação
- [x] Implementar listagem de briefings salvos
- [x] Implementar visualização detalhada de cada briefing
- [x] Implementar exclusão de briefings
- [x] Implementar filtros por status
- [x] Implementar atualização de status
- [x] Implementar notas internas

## Fase 6: Testes e Validação
- [x] Criar testes unitários para routers de briefing
- [x] Testar validação de email
- [x] Testar autenticação admin
- [x] Testar CRUD de briefings
- [ ] Testar responsividade em mobile/tablet
- [ ] Testar performance

## Fase 7: Documentação e Deploy
- [x] Criar arquivo SETUP.md com instruções
- [x] Documentar variáveis de ambiente
- [x] Documentar funcionalidades
- [x] Documentar como executar migration SQL
- [ ] Testar em staging
- [ ] Deploy no Vercel
- [ ] Configurar domínio customizado

## Fase 7: Notificações por Email
- [x] Implementar serviço de email com Nodemailer
- [x] Enviar notificações quando briefing é enviado
- [x] Enviar notificações quando formulário customizado é respondido

## Fase 8: Sistema de Formulários Customizados
- [x] Criar tabelas de formulários customizados no banco
- [x] Implementar upload de formulários HTML/CSS
- [x] Criar página para cliente responder formulário
- [x] Implementar link único para cada formulário
- [x] Adicionar seção de formulários customizados no painel admin

## Fase 9: Integração Supabase
- [x] Documentar setup do Supabase gratuito
- [x] Gerar migrations SQL para Supabase
- [x] Instruções de connection string

## Fase 10: Deploy Vercel
- [x] Documentar instruções de deploy no Vercel
- [x] Configurar variáveis de ambiente
- [x] Instruções de email com Gmail

## Fase 11: Entrega
- [x] Revisar todo o projeto
- [x] Atualizar WhatsApp e email de contato
- [x] Criar README.md completo
- [ ] Criar checkpoint final
- [ ] Entregar ao usuário com instruções
