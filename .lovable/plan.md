
# Finalização Estrutural — VITTALLE Web App

Preservar a identidade visual, componentes principais e arquitetura já aprovadas. O objetivo é completar a estrutura oficial (produtos, dias, fluxos, materiais) para que só faltem os ativos reais (thumbnails, PDFs, vídeos, áudios).

## 1. Modelo de dados (`src/lib/mock-data.ts`) e store (`src/lib/store.ts`)

- **Produtos oficiais** (substituir mocks genéricos):
  - `plano-barriga-hormonal-40` (front, adquirido)
  - `chas-e-tonicos` (Bump 1, R$19)
  - `desinchar-express-24h` (Bump 2, R$17)
  - `cozinha-hormonal-21-dias` (Upsell, R$67)
  - `cardapio-hormonal` (Downsell, R$37)
- **Bônus oficiais**: Guia de Superalimentos Hormonais, Lista de Compras dos 8 Pratos, Diário Hormonal 21 Dias.
- **Guias/Materiais front**: Método Monta-Prato, Superalimentos e Substituições, Refeições Rápidas e Emergenciais, Lista de Compras Inteligente.
- **21 dias oficiais** organizados em Semana 1 Desinchar (1-7), Semana 2 Ativar (8-14), Semana 3 Firmar (15-21). Cada dia terá cards: Leitura, Sequência de Movimento (nome amigável: Respirar e Soltar, Soltar e Mover, Acordar o Corpo, Ganhar Força, Firmar, Sua Sequência Completa), Alimentação, Hábito/Âncora, Check-in e Medição (apenas dias previstos).
- **Áudios oficiais apenas**: Áudio da Absolvição + 21 narrações das leituras + áudio Desinchar Express (Bump 2) + 3 áudios ritual noturno (Upsell). Remover meditações inventadas (4-7-8, manhã, noite).
- **Entitlements**: `ownedProducts: string[]` no store. Fluxo de "compra simulada" seta entitlement.
- **Estado de dia**: `unlocked`, `available`, `inProgress`, `completed`, `locked`. Regra Modo Cliente: dia N desbloqueia após dia N-1 concluído + data ≥ startDate + (N-1) dias. Modo Demo ignora regras.
- **Modo Demonstração** persistido em `demoMode: boolean`. Toggle rápido. Permite: abrir qualquer dia, marcar/desmarcar atividades, simular data (`demoDateOffset`), alternar `ownedProducts`, resetar demo.
- **Onboarding**: `onboardingStep` com estágios (video-inaugural, absolvicao, orientacao-medicao, medicao-inicial, foto-opcional, horario, mapa, pronta). Bloqueia Dia 1 - Parte B enquanto medição inicial não feita.

## 2. Rotas

### Novas
- `/programa` → roteador inteligente: se onboarding incompleto → continua; senão → `/jornada/$dia` do dia atual.
- `/onboarding/inaugural`, `/onboarding/absolvicao`, `/onboarding/medicao`, `/onboarding/horario`, `/onboarding/mapa` (ou uma rota `/onboarding` com etapas internas — preferir etapas internas para simplificar).
- `/produto/$id/checkout` — checkout simulado (aprovar/recusar).
- `/produto/$id/acessar` — experiência do produto adquirido (Chás, Desinchar, Cozinha, Cardápio).
- `/bonus/$id` — página do bônus (guia/checklist/diário) com placeholder de PDF.
- `/guia/$id` — página dos guias front (Monta-Prato, Superalimentos, Refeições Rápidas, Lista de Compras).
- `/leitura/$dia` — leitura do dia + player de narração.
- `/sequencia/$id` — player de sequência de movimento + "Senti dor".
- `/alimentacao` — hub interativo (Prato de Hoje, SOS, Missão, Biblioteca Alimentar).
- `/alimentacao/sos` — SOS "Não sei o que comer".
- `/cerimonia` — Cerimônia do Dia 21 (gated no Modo Cliente).
- `/downsell` — apresentação do Cardápio Hormonal após recusa do Upsell.
- `/demo` — painel Modo Demonstração (controles admin).

### Corrigidas
- `/jornada/$dia` — cards com estados e desfazer conclusão.
- `/biblioteca` — três áreas com produtos oficiais reais.
- `/produto/$id` — página de apresentação com CTA correto (Conhecer/Acessar).
- `/perfil` — mover reembolso para configurações discretas.

## 3. Componentes novos/refinados

- `DemoBadge` — faixa discreta "MODO DEMONSTRAÇÃO" fixa no topo quando ativo.
- `DemoToggle` — botão rápido no perfil e no painel demo.
- `DayCard` — card unificado por atividade (leitura, movimento, alimentação, hábito, check-in, medição) com estados e CTAs corretos.
- `ProductCard` — já existe; garantir estados dos 5 produtos.
- `Thumbnail` — substitui ícones gigantes por placeholder premium com proporção fixa (16/9 ou 4/5), cantos arredondados, slot para imagem futura, ícone de tipo secundário.
- `AudioPlayer` — player placeholder para narrações e áudios oficiais.
- `VideoPlayer` — placeholder para movimentos com botão "SENTI DOR".
- `CheckoutSimulado` — modal/tela com "Aprovar" e "Recusar".
- `ConfirmUndo` — confirmação para desfazer conclusão.

## 4. Regras Modo Cliente vs Demo

Helper `canOpenDay(dia)`:
- Demo: sempre true.
- Cliente: true se `dia <= currentUnlockedDay` (calculado por dias transcorridos desde `startDate` + progresso). Dia 1-B exige `initialMeasurement`.

Sem punição: sem streaks vermelhos, sem "você falhou". Ausência apenas mostra "Retome quando puder".

## 5. Remoções

- Áudios inventados: Respiração 4-7-8, Meditação da manhã, Meditação para o fim do dia — remover dos dados e de qualquer rota/biblioteca.
- Códigos internos (M01, S1, Fase 1) — remover da UI cliente. Manter apenas em comentário/dado interno se necessário.

## 6. Thumbnails

Manter componente `MediaPlaceholder` mas evoluir para receber `imageUrl` opcional. Enquanto não há imagem: fundo temático (soft-green / warm / stone) + ícone secundário pequeno + nome do conteúdo. Proporção 16/9 padrão para cards, 4/5 para capas de produto.

## 7. Cerimônia Dia 21

Rota `/cerimonia`: gated (`day21Completed` no cliente, aberto no demo). Contém: mensagem de fechamento, medição final vs inicial, comparação, próximos passos neutros, sem forçar produto inexistente.

## 8. Ajuda

Preservar `/ajuda`. Reorganizar seções: FAQ, Quando procurar médico, Dor durante movimento, Medição, Acesso. Reembolso movido para `/perfil/dados` (seção discreta).

## 9. Testes finais

Passar Playwright rápido validando:
- Home carrega, CTA "Continuar meu dia" navega.
- Jornada mostra 21 dias em 3 semanas.
- Dia 2 bloqueado no cliente, aberto no demo.
- Cerimônia gated.
- Todos os 5 produtos têm página, checkout simulado, estado adquirido/não adquirido.
- Bônus e guias abrem com placeholder.
- Nenhum 404, nenhum botão morto.

## Detalhes técnicos

- Adicionar `startDate`, `initialMeasurement`, `ownedProducts`, `demoMode`, `demoDateOffset`, `dayActivityStates` ao store (localStorage).
- Helper `getCurrentClientDay()` calcula dia liberado.
- `useDemoMode()` hook.
- Novos arquivos de rota seguem convenção TanStack file-based (dots for slashes) e cada rota exporta `head()` com metadata pt-BR.
- Não introduzir Supabase, backend, login real — tudo local.
- Reutilizar `AppShell`, `BottomNav`, `MediaPlaceholder`, `ContentCard`, `ProductCard`.

## Fora de escopo (não fazer)

Backend, Supabase, login real, checkout real, notificações reais, Coach Lara, Comunidade, novas meditações, novos ensinamentos, redesign geral.

## Entrega

Ao final:
1. Lista de rotas criadas/corrigidas.
2. Lista de produtos e materiais oficiais cadastrados.
3. Resultado dos testes Playwright.
4. Itens pendentes (ex.: PDFs reais, vídeos reais — todos são placeholders substituíveis).
