# 🚀 Desafio Técnico em React Native

Bem-vindo ao desafio técnico em React Native! Este projeto demonstra uma configuração básica para um aplicativo móvel construído usando React Native com Expo. O aplicativo inclui várias funcionalidades essenciais, como registro e login de usuários, utilizando práticas modernas do React, validação de formulários e gerenciamento de estado.

## 📱 Visão Geral das Telas

### 1. **Tela de Registro**
   - **Propósito:** Permitir que os usuários criem uma nova conta fornecendo suas informações pessoais, incluindo nome, e-mail, CPF, número de telefone e senha.
   - **Principais Funcionalidades:**
     - Validação de CPF com lógica personalizada.
     - Campos de senha e confirmação de senha com opção de visualizar ou ocultar o conteúdo.
     - Integração com uma API backend para criação de usuários.
     - Seletor de código de país para o número de telefone.

### 2. **Tela de Login**
   - **Propósito:** Permitir que os usuários façam login usando seu e-mail, CPF ou número de telefone junto com a senha.
   - **Principais Funcionalidades:**
     - Integração com a API backend para autenticação.
     - Tratamento de erros e feedback ao usuário para falhas no login.

### 3. **Tela Principal**
   - **Propósito:** Exibir uma saudação ao usuário e fornecer acesso rápido às funcionalidades mais usadas.
   - **Principais Funcionalidades:**
     - Cabeçalho com ícones de navegação e notificação.
     - Campo de busca com ícone de lupa e botão de filtro.
     - Exibição de médicos e categorias mais procuradas.

## 🗂️ Arquitetura de Pastas

```plaintext
/src
├── /assets                # Static files (images, fonts, etc.)
├── /components            # Reusable components
├── /features              # Feature-specific code (e.g., auth, profile)
│   ├── /auth
│   ├── /profile
│   └── /home
├── /hooks                 # Custom hooks
├── /navigation            # Navigation setup (React Navigation)
├── /screens               # Screen components (connected to navigation)
├── /services              # API calls and business logic
├── /store                 # Global state management (e.g., Redux, Zustand)
├── /styles                # Global styles and theming
└── /utils                 # Utility functions
```

### Estrutura Ideal (Se Houvesse Mais Tempo)
- **Camadas Separadas:** Implementação de camadas bem definidas para separar responsabilidades como lógica de negócios, dados e apresentação.
- **Gerenciamento de Estado Global:** Utilização de um gerenciador de estado como Redux ou Context API para gerenciar o estado de forma centralizada.
- **Testes Automatizados:** Implementação de testes unitários e de integração usando Jest e Testing Library.

## 🛠️ Tecnologias e Princípios Utilizados

- **React Native & Expo:** Framework principal para desenvolvimento de aplicativos móveis multiplataforma.
- **React Hook Form & Yup:** Gerenciamento de formulários e validação de dados.
- **AsyncStorage:** Armazenamento local de dados de forma persistente.
- **Axios:** Cliente HTTP para comunicação com a API backend.

## 🔮 Melhorias Futuras

- **Armazenamento Assíncrono:** Implementação de AsyncStorage para armazenar dados como tokens de autenticação de forma persistente.
- **Internacionalização:** Suporte a múltiplos idiomas.
- **Tema Escuro:** Implementação de temas claro e escuro.
- **Monitoramento e Análise:** Integração com ferramentas de monitoramento para rastreamento de erros e análise de uso.

## 📚 Como Rodar o Projeto

1. Clone este repositório.
2. Execute `npm install` para instalar as dependências.
3. Execute `expo start` para iniciar o projeto.

😊
