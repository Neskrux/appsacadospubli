# App Sacados - Sistema de Agendamento de Consultas

Sistema para agendamento de consultas médicas com chat integrado.

## Requisitos

- Node.js (versão 14 ou superior)
- MongoDB
- NPM ou Yarn

## Instalação

1. Clone o repositório
2. Instale as dependências do backend:
```bash
npm install
```

3. Instale as dependências do frontend:
```bash
cd client
npm install
```

## Configuração

1. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
MONGODB_URI=mongodb://localhost:27017/app-sacados
PORT=5000
```

## Executando o Projeto

1. Inicie o servidor backend:
```bash
npm run dev
```

2. Em outro terminal, inicie o frontend:
```bash
cd client
npm start
```

3. Acesse a aplicação em `http://localhost:3000`

## Funcionalidades

- Seleção de setor médico
- Seleção de cidade e bairro
- Busca de clínicas próximas
- Chat em tempo real com as clínicas
- Interface responsiva e moderna

## Tecnologias Utilizadas

- Frontend: React, Material-UI, Socket.io-client
- Backend: Node.js, Express, Socket.io, MongoDB 