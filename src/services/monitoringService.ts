import { supabase } from "@/integrations/supabase/client";

// Interface para o item do RSS
interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  source: string;
}

// Palavras-chave para análise de sentimento simples (MVP)
const POSITIVE_KEYWORDS = ['inaugura', 'conquista', 'aprova', 'melhoria', 'crescimento', 'sucesso', 'parceria', 'benefício', 'avanço', 'elogia', 'destaque'];
const NEGATIVE_KEYWORDS = ['crise', 'escândalo', 'denúncia', 'atraso', 'problema', 'falha', 'erro', 'crítica', 'protesto', 'acusação', 'investigação'];
const URGENT_KEYWORDS = ['urgente', 'grave', 'alerta', 'emergência', 'desastre', 'crime'];

export const monitoringService = {
  /**
   * Busca notícias do Google News via RSS
   * @param query Termo de busca (ex: nome do político)
   */
  async fetchMentions(query: string) {
    try {
      // Usamos um proxy (allorigins) para evitar problemas de CORS ao buscar o RSS do Google direto do browser
      const encodedQuery = encodeURIComponent(query);
      const rssUrl = `https://news.google.com/rss/search?q=${encodedQuery}&hl=pt-BR&gl=BR&ceid=BR:pt-419`;
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;

      const response = await fetch(proxyUrl);
      const data = await response.json();
      
      if (!data.contents) {
        throw new Error("Falha ao obter dados do feed");
      }

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data.contents, "text/xml");
      const items = xmlDoc.querySelectorAll("item");
      
      const mentions: any[] = [];

      items.forEach((item) => {
        const title = item.querySelector("title")?.textContent || "";
        const link = item.querySelector("link")?.textContent || "";
        const pubDate = item.querySelector("pubDate")?.textContent || "";
        const description = item.querySelector("description")?.textContent || "";
        const source = item.querySelector("source")?.textContent || "Google News";

        // Análise de Sentimento Básica
        let sentiment = "neutral";
        const lowerText = (title + " " + description).toLowerCase();
        
        const positiveCount = POSITIVE_KEYWORDS.filter(k => lowerText.includes(k)).length;
        const negativeCount = NEGATIVE_KEYWORDS.filter(k => lowerText.includes(k)).length;

        if (positiveCount > negativeCount) sentiment = "positive";
        if (negativeCount > positiveCount) sentiment = "negative";

        // Definição de Prioridade
        let priority = "medium";
        if (URGENT_KEYWORDS.some(k => lowerText.includes(k))) priority = "urgent";
        else if (sentiment === "negative") priority = "high";
        else if (sentiment === "positive") priority = "low";

        mentions.push({
          title: title.replace(/ - .*$/, ""), // Remove o nome da fonte do título se estiver no padrão "Título - Fonte"
          source: source,
          source_type: "news", // Google News agrega blogs e sites de notícias
          date: new Date(pubDate).toISOString(),
          sentiment,
          priority,
          excerpt: this.stripHtml(description).substring(0, 150) + "...",
          url: link
        });
      });

      return mentions;

    } catch (error) {
      console.error("Erro ao buscar menções:", error);
      throw error;
    }
  },

  /**
   * Salva as menções no Supabase, evitando duplicatas
   */
  async saveMentions(mentions: any[], userId: string) {
    let savedCount = 0;

    for (const mention of mentions) {
      // Verifica se já existe uma menção com o mesmo link para este usuário
      const { data: existing } = await supabase
        .from("mentions")
        .select("id")
        .eq("url", mention.url)
        .eq("user_id", userId)
        .single();

      if (!existing) {
        const { error } = await supabase.from("mentions").insert({
          ...mention,
          user_id: userId
        });

        if (!error) savedCount++;
      }
    }

    return savedCount;
  },

  stripHtml(html: string) {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }
};
