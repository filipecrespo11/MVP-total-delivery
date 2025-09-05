# 🍔 Calixto's Burger - Sistema de Delivery

Uma aplicação moderna de delivery inspirada no iFood, desenvolvida com React, TypeScript e design responsivo. O sistema permite que os clientes naveguem pelo cardápio, adicionem itens ao carrinho e finalizem pedidos através do WhatsApp.

## 📱 Funcionalidades

### ✅ Principais Features
- **Navegação por categorias**: Destaques, Mais Pedidos, Burgers, Gourmet, Veggies
- **Carrinho de compras**: Adicionar/remover itens, controlar quantidades
- **Checkout integrado**: Formulário para dados do cliente
- **Integração WhatsApp**: Finalização automática via WhatsApp
- **Design responsivo**: Funciona perfeitamente em mobile e desktop
- **Interface moderna**: Baseada no design do iFood/Uber Eats

### 🎨 Design Features
- Cards de produtos com hover effects
- Animações suaves e transições
- Badge para produtos em destaque e populares
- Carrinho lateral deslizante
- Headers com gradiente azul
- Indicadores visuais (status online, contador carrinho)

## 🏗️ Arquitetura do Projeto

### 📁 Estrutura de Pastas
```
src/
├── components/           # Componentes React reutilizáveis
│   ├── Header/          # Cabeçalho da aplicação
│   ├── CategoryTabs/    # Navegação por categorias
│   ├── ProductCard/     # Card individual de produto
│   ├── Cart/           # Modal do carrinho
│   └── index.ts        # Barrel exports
├── context/            # Context API para estado global
│   └── CartContext.tsx # Gerenciamento do carrinho
├── data/              # Dados mock e configurações
│   └── products.ts    # Lista de produtos e categorias
├── types/             # Definições TypeScript
│   └── index.ts       # Interfaces e tipos
├── utils/             # Funções utilitárias
│   └── index.ts       # Formatação, validação, WhatsApp
├── App.tsx            # Componente principal
├── App.css            # Estilos da aplicação
├── index.css          # Estilos globais e reset
└── main.tsx           # Entry point
```

### 🔧 Tecnologias Utilizadas

#### Frontend
- **React 19.1.1**: Biblioteca principal
- **TypeScript 5.8.3**: Tipagem estática
- **Vite 7.1.2**: Build tool e dev server
- **Lucide React**: Ícones modernos
- **CSS3**: Estilização com variáveis customizadas

#### Ferramentas de Desenvolvimento
- **ESLint**: Linting de código
- **TypeScript ESLint**: Regras específicas para TS
- **Vite Plugin React**: Hot reload otimizado

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn como gerenciador de pacotes

### Passos para rodar o projeto

1. **Clone ou baixe o projeto**
```bash
# Se usando Git
git clone <repository-url>
cd "MVP total delivery"
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto em desenvolvimento**
```bash
npm run dev
```

4. **Acesse no navegador**
```
http://localhost:5173/
```

### 🔨 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build de Produção
npm run build        # Gera build otimizado para produção
npm run preview      # Preview do build de produção

# Qualidade de Código
npm run lint         # Executa ESLint para verificar código
```

## 📋 Como Usar

### 1. **Navegação**
- Use as abas superiores para alternar entre categorias
- Cada categoria mostra produtos específicos
- Produtos com badges "Destaque" e "Popular" são destacados

### 2. **Adicionando ao Carrinho**
- **Desktop**: Hover no produto e clique no botão "+" que aparece
- **Mobile**: Clique no botão "Adicionar" na parte inferior do card

### 3. **Gerenciando Carrinho**
- Clique no ícone do carrinho (canto superior direito)
- Use botões +/- para alterar quantidades
- Clique no X para remover itens

### 4. **Finalizando Pedido**
- Preencha os dados: Nome, Telefone e Endereço
- Clique em "Finalizar no WhatsApp"
- Será redirecionado para WhatsApp com pedido formatado

## ⚙️ Configurações

### WhatsApp Integration
Para configurar o número do WhatsApp do restaurante:

```typescript
// src/utils/index.ts
export const APP_CONFIG = {
  RESTAURANT_PHONE: '5511999999999', // Substitua pelo número real
  // ... outras configurações
} as const;
```

### Produtos e Categorias
Para editar produtos e categorias:

```typescript
// src/data/products.ts
export const products: Product[] = [
  {
    id: '1',
    name: 'Nome do Produto',
    description: 'Descrição do produto',
    price: 24.90,
    image: 'URL_da_imagem',
    category: 'categoria',
    isHighlight: true,    // Aparece em "Destaques"
    isPopular: true,      // Aparece em "Mais Pedidos"
  },
  // ... mais produtos
];
```

### Personalizando Design
As cores principais estão definidas em:

```css
/* src/index.css */
:root {
  --primary-color: #4A90E2;        /* Azul principal */
  --primary-dark: #357ABD;         /* Azul escuro */
  --secondary-color: #FF6B6B;      /* Vermelho acentos */
  /* ... outras variáveis */
}
```

## 🎯 Funcionalidades Futuras

### 📈 Melhorias Planejadas
- [ ] Sistema de busca de produtos
- [ ] Filtros por preço e categoria
- [ ] Favoritos/Lista de desejos
- [ ] Histórico de pedidos
- [ ] Sistema de avaliações
- [ ] Cupons de desconto
- [ ] Múltiplos métodos de pagamento
- [ ] Rastreamento de pedidos
- [ ] Modo escuro
- [ ] PWA (Progressive Web App)

### 🔧 Melhorias Técnicas
- [ ] Testes unitários (Jest/Testing Library)
- [ ] Testes E2E (Cypress/Playwright)
- [ ] Storybook para componentes
- [ ] Integração com backend real
- [ ] Cache de dados (React Query)
- [ ] Lazy loading de imagens
- [ ] SEO otimizado (Next.js migration)

## 🤝 Contribuindo

### Para Desenvolvedores Futuros

Este projeto foi estruturado pensando em facilitar manutenção e expansão:

1. **Componentes Modulares**: Cada componente tem sua pasta com TypeScript, CSS e index
2. **TypeScript Rigoroso**: Todas as interfaces estão tipadas em `src/types/`
3. **Context API**: Estado global gerenciado de forma organizada
4. **Utilitários**: Funções auxiliares centralizadas em `src/utils/`
5. **CSS Moderno**: Variáveis customizadas e design system consistente

### Padrões do Código

- **Naming**: PascalCase para componentes, camelCase para funções
- **Comments**: JSDoc para funções importantes
- **Structure**: Um componente por arquivo, barrel exports
- **Styling**: CSS modules ou styled-components recomendados para projetos maiores

## 📞 Suporte

### Problemas Conhecidos
- **Imagens**: URLs de placeholder podem falhar, sistema de fallback implementado
- **WhatsApp Web**: Pode precisar de permissões do navegador
- **Responsividade**: Testado em Chrome/Firefox/Safari

### Debugging
```bash
# Verificar erros de lint
npm run lint

# Build de produção (verificar erros)
npm run build

# Limpar cache (se necessário)
rm -rf node_modules package-lock.json
npm install
```

## 📄 Licença

Este projeto é uma demonstração educacional. Livre para uso e modificação.

---

**Desenvolvido com ❤️ usando React + TypeScript + Vite**

*Para dúvidas ou sugestões, consulte a documentação do código ou abra uma issue.*
