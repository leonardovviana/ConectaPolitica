# Prompt para Criação de Workflow de Monitoramento (n8n + Apify + Supabase)

Você pode usar o prompt abaixo em uma IA (como ChatGPT ou Claude) ou como guia para configurar seu workflow no n8n.

---

**Contexto:**
Estou desenvolvendo o "Conecta Política", um SaaS de monitoramento de reputação para políticos. Preciso criar uma automação no **n8n** que utilize o **Apify** para coletar dados do Instagram e da Web, processe esses dados e os salve no meu banco de dados **Supabase**.

**Objetivo do Workflow:**
Monitorar continuamente termos (nome do político, apelido) e salvar novas menções no banco de dados.

**Especificações Técnicas:**

1.  **Fontes de Dados (Apify Actors):**
    *   *Instagram:* Usar um Actor como `apify/instagram-scraper` ou `apify/instagram-hashtag-scraper`.
    *   *Web/News:* Usar `apify/google-news-scraper` (para complementar o RSS que já tenho).

2.  **Banco de Dados (Supabase):**
    *   Tabela: `mentions`
    *   Schema da Tabela:
        *   `id` (uuid, auto-gerado)
        *   `user_id` (uuid, ID do cliente)
        *   `title` (text): Legenda do post (Instagram) ou Título da matéria (Web).
        *   `source` (text): Nome do perfil (ex: "@usuario") ou nome do site.
        *   `source_type` (text): Deve ser preenchido como 'social' para Instagram ou 'news' para sites.
        *   `url` (text): Link direto para o post/matéria (Usar como chave única para evitar duplicatas).
        *   `date` (timestamp): Data da publicação.
        *   `excerpt` (text): Texto completo ou resumo.
        *   `sentiment` (text): 'positive', 'negative' ou 'neutral'.
        *   `priority` (text): 'low', 'medium', 'high' ou 'urgent'.

3.  **Lógica do Workflow no n8n:**
    *   **Gatilho:** Execução agendada (ex: a cada 6 horas).
    *   **Passo 1 (Coleta):** Chamar o Apify para buscar os termos definidos.
    *   **Passo 2 (Processamento IA - Opcional mas recomendado):** Passar o texto coletado por um nó da OpenAI (GPT-4o-mini ou GPT-3.5) para:
        *   Classificar o sentimento (`sentiment`).
        *   Definir a prioridade (`priority`) baseada na gravidade do conteúdo.
        *   Resumir o texto para o campo `title` se for muito longo.
    *   **Passo 3 (Verificação):** Consultar o Supabase para ver se a `url` já existe.
    *   **Passo 4 (Persistência):** Inserir apenas os novos registros na tabela `mentions`.

**Solicitação:**
Crie o JSON do workflow para o n8n ou descreva detalhadamente os nós necessários, incluindo o código JavaScript para a transformação dos dados do formato do Apify para o formato do meu banco de dados Supabase.

---

## Dicas para Configuração no n8n

1.  **Credenciais:** Você precisará configurar as credenciais do `Supabase API` e `Apify API` no n8n.
2.  **Apify Actor:** O Actor `apify/instagram-scraper` é pago/limitado. Para testes gratuitos, verifique os limites do plano free do Apify.
3.  **Webhook:** Você pode criar um Webhook no n8n e chamar ele através do seu frontend (botão "Atualizar") se quiser execução sob demanda, além do agendamento.
