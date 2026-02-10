# Chat em Tempo Real (Versão Simplificada)

Projeto mínimo de chat para rodar localmente com **Node.js + Express + Socket.IO**.

## O que este projeto faz

- Serve o frontend estático pelo Express.
- Conecta clientes em tempo real com Socket.IO.
- Quando um cliente envia mensagem, o servidor retransmite para todos.

---

## Estrutura simples

```bash
.
├── server.js        # Backend Express + Socket.IO
├── public/
│   └── index.html   # Frontend único (HTML + CSS + JS)
└── package.json
```

---

## Pré-requisitos

- Node.js 18+ (recomendado 20+)
- npm

---

## Como rodar localmente

1. Instale dependências:

```bash
npm install
```

2. Inicie o servidor:

```bash
npm start
```

3. Abra no navegador:

```bash
http://localhost:3000
```

Pronto. O frontend já conecta automaticamente ao Socket.IO do mesmo servidor.

---

## Fluxo do chat

1. Cliente abre a página e conecta no Socket.IO.
2. Cliente envia uma mensagem.
3. Servidor recebe e faz `io.emit(...)` para todos os conectados.

---

## Observações de aprendizado

- `server.js` tem comentários explicando as partes principais.
- `public/index.html` contém HTML, CSS e JS com comentários para facilitar estudo.
