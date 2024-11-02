# AuthJS Template

Este repositório é um template para criar aplicações utilizando AuthJS com Prisma e Next.js. Ele fornece uma estrutura básica para autenticação de usuários, gerenciamento de sessões e envio de e-mails de verificação.

## Tecnologias Utilizadas

- **Next.js**: Framework React para desenvolvimento de aplicações web.
- **Prisma**: ORM para banco de dados, utilizado para gerenciar a conexão com o PostgreSQL.
- **AuthJS**: Biblioteca para autenticação de usuários.
- **Tailwind CSS**: Framework CSS para estilização.
- **React Hook Form**: Biblioteca para gerenciamento de formulários em React.
- **Zod**: Biblioteca para validação de esquemas de dados.
- **@react-email/components**: Biblioteca para criação de e-mail em React.

## Estrutura do Projeto

- **src/app**: Contém as páginas e layouts da aplicação.
- **src/components**: Componentes reutilizáveis da interface do usuário.
- **src/constants**: Constantes utilizadas em toda a aplicação.
- **src/emails**: E-mails e funções relacionadas ao envio de e-mails.
- **src/hooks**: Hooks personalizados para funcionalidades específicas.
- **src/schema**: Esquemas de validação utilizando Zod.
- **src/styles**: Arquivos de estilo, incluindo configurações do Tailwind CSS.
- **src/types**: Definições de tipos TypeScript.
- **src/utils**: Funções utilitárias.
- **prisma**: Configurações e esquemas do banco de dados Prisma.

## Configuração

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/authjs-template.git
   cd authjs-template
   ```

2. **Instale as dependências**:

```bash
 npm install
```

ou

```bash
yarn
```

3. **Configure o banco de dados**:

   - Certifique-se de que o Docker está instalado e em execução.
   - Suba o container do PostgreSQL utilizando o Docker Compose:

   ```bash
   docker-compose up -d
   ```

   - O banco de dados será configurado automaticamente com as credenciais definidas no `docker-compose.yml`.

4. **Execute as migrações do banco de dados**:

   ```bash
   npx prisma migrate dev
   ```

5. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila a aplicação para produção.
- `npm run start`: Inicia o servidor em modo de produção.
- `npm run db:migrate`: Executa as migrações do banco de dados.
- `npm run db:clear`: Reseta o banco de dados.
- `npm run db:push`: Sincroniza o esquema do banco de dados.
- `npm run db:studio`: Abre o Prisma Studio para gerenciar o banco de dados.
- `npm run lint`: Executa o linter para verificar problemas de código.
- `npm run format`: Formata o código utilizando as regras definidas.

## Tarefas Pendentes

- [ ] Implementar a funcionalidade de recuperação de senha.
- [ ] Implementar o signIn com Credentials (email e senha).
- [ ] Adicionar Google / Apple / Facebook Auth.
- [ ] Adicionar autenticação de dois fatores.
- [ ] Adicionar OTP.
- [ ] Adicionar suporte a internacionalização (i18n).
- [ ] Criar testes unitários para os componentes principais.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Este README fornece uma visão geral do projeto e instruções básicas para configuração e execução. Sinta-se à vontade para personalizá-lo conforme necessário para o seu projeto específico.
