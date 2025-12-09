# Conecta Política

Conecta Política é uma plataforma de inteligência política em tempo real, projetada para vereadores, prefeitos e deputados monitorarem sua reputação, acompanharem menções e analisarem o sentimento do público com o auxílio de Inteligência Artificial.

## Funcionalidades

- **Monitoramento em Tempo Real**: Acompanhe menções em redes sociais e notícias.
- **Análise de Sentimento**: Utilize IA para entender o sentimento (positivo, negativo, neutro) das menções.
- **Dashboard Intuitivo**: Visualize dados críticos através de gráficos e cards informativos.
- **Gestão de Riscos**: Identifique potenciais crises de imagem antes que elas cresçam.
- **Relatórios**: Gere relatórios para análise de desempenho e estratégia.

## Tecnologias Utilizadas

- **Frontend**: React, TypeScript, Vite
- **UI/UX**: Tailwind CSS, Shadcn/ui, Lucide React
- **Gerenciamento de Estado**: TanStack Query
- **Backend/BaaS**: Supabase (Autenticação, Banco de Dados)
- **Gráficos**: Recharts

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn ou bun

## Configuração do Ambiente

1.  Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/conecta-politica.git
    cd conecta-politica
    ```

2.  Instale as dependências:
    ```bash
    npm install
    # ou
    yarn install
    # ou
    bun install
    ```

3.  Configure as variáveis de ambiente:
    Crie um arquivo `.env` na raiz do projeto e adicione as seguintes chaves (você precisará de um projeto no Supabase):

    ```env
    VITE_SUPABASE_URL=sua_url_do_supabase
    VITE_SUPABASE_PUBLISHABLE_KEY=sua_chave_publica_do_supabase
    ```

## Executando o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
bun dev
```

O aplicativo estará disponível em `http://localhost:8080`.

## Build para Produção

Para gerar a versão de produção:

```bash
npm run build
# ou
yarn build
# ou
bun build
```

## Estrutura do Projeto

- `src/components`: Componentes reutilizáveis da UI e específicos de funcionalidades (dashboard, feed, etc.).
- `src/contexts`: Contextos do React (ex: AuthContext).
- `src/hooks`: Hooks customizados.
- `src/integrations`: Integrações com serviços externos (Supabase).
- `src/lib`: Utilitários e funções auxiliares.
- `src/pages`: Páginas da aplicação (Dashboard, Auth, Landing, etc.).

## Contribuição

1.  Faça um Fork do projeto.
2.  Crie uma Branch para sua Feature (`git checkout -b feature/MinhaFeature`).
3.  Faça o Commit de suas mudanças (`git commit -m 'Adiciona a MinhaFeature'`).
4.  Faça o Push para a Branch (`git push origin feature/MinhaFeature`).
5.  Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
