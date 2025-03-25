# Blog Escolar - Frontend

![Blog Escolar](https://front-blog-escolar.vercel.app/og-image.jpg)

## 📝 Sobre o Projeto

Frontend do Blog Escolar, uma plataforma desenvolvida para compartilhamento de conteúdo educacional. O projeto está disponível em: [Blog Escolar](https://front-blog-escolar.vercel.app/)

Este projeto consome a API REST desenvolvida na etapa anterior do projeto, integrando todas as funcionalidades do backend com uma interface moderna e responsiva.

## 🚀 Tecnologias Utilizadas

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma
- NextAuth.js
- React Hook Form
- Zod

## 📁 Estrutura do Projeto
blog-escolar/
├── app/
│ ├── (auth)/ # Rotas autenticadas
│ ├── api/ # Rotas da API
│ ├── blog/ # Páginas do blog
│ │ ├── actions/ # Server Actions
│ │ ├── components/# Componentes específicos do blog
│ │ └── post/ # Páginas de posts
│ └── components/ # Componentes globais
├── prisma/ # Configurações do Prisma
├── public/ # Arquivos estáticos
└── services/ # Serviços (auth, api, etc)



## 🔧 Configuração e Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/blog-escolar-frontend.git
```

2. Instale as dependências
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente
```env
DATABASE_URL="sua-url-do-banco" ## usado para salvar os usuarios gerenciados pelo authjs /nextauth
NEXTAUTH_SECRET="seu-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BACKEND_URL="urldodeploy"
BACKEND_URL="urldobackend"
```

4. Execute as migrações do Prisma
```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

## 🌟 Funcionalidades Principais

- 📝 Criação, edição e exclusão de posts
- 👥 Sistema de autenticação de usuários
- 🔍 Busca de posts
- 👨‍💼 Painel administrativo
- 💬 Sistema de comentários
- 📱 Design responsivo

## 🔗 Links Importantes

- [Frontend Deployed](https://front-blog-escolar.vercel.app/)
- [Documentação da API](link-para-documentacao)
- [Backend Repository](link-para-backend)


## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
