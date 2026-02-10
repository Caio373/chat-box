# Mini Chat em Tempo Real (NestJS + TypeScript + Clean Architecture)

Projeto completo de **mini chat em tempo real** com foco em engenharia de software, utilizando:
- **Node.js + TypeScript**
- **NestJS**
- **WebSockets com Socket.IO**
- **Banco relacional** (SQLite para desenvolvimento, pronto para PostgreSQL)
- **Clean Architecture + SOLID**

---

## 1) Visão Geral da Arquitetura

O projeto foi dividido em camadas para garantir baixo acoplamento, alta coesão e fácil evolução.

### Camadas

- **Domain**
  - Entidades puras (`User`, `Room`, `Message`)
  - Contratos de repositório
  - Porta de integração (`AIChatAdapter`)
  - Regras de domínio (`ChatPolicyService`)

- **Application**
  - Casos de uso (`RegisterUser`, `CreateRoom`, `JoinRoom`, `SendMessage`, `ListRoomMessages`)
  - Orquestração de regras de negócio

- **Infrastructure**
  - Implementações TypeORM (repositórios e entidades de banco)
  - Adapter de integração exemplo para IA (`AIChatAdapterImpl`)
  - Tokens de injeção de dependências

- **Interfaces**
  - Controllers HTTP (REST)
  - Gateway WebSocket (Socket.IO)
  - DTOs de entrada (validação com `class-validator`)

### Princípios aplicados

- **S de SOLID (Single Responsibility)**: cada classe tem responsabilidade bem definida.
- **O (Open/Closed)**: adiciona-se novas integrações sem mudar casos de uso existentes.
- **L (Liskov)**: contratos de repositório/adapter permitem substituições transparentes.
- **I (Interface Segregation)**: interfaces pequenas e focadas por contexto.
- **D (Dependency Inversion)**: use-cases dependem de abstrações (tokens + interfaces), nunca de concretos.

---

## 2) Funcionalidades Implementadas

✅ Cadastro simples de usuário  
✅ Criação e entrada em salas  
✅ Envio/recebimento de mensagens em tempo real (Socket.IO)  
✅ Persistência do histórico de mensagens em banco relacional  
✅ Identificação do usuário em cada mensagem  
✅ Integração desacoplada de exemplo (`AIChatAdapter`) para respostas automáticas com `@assistant`

---

## 3) Estrutura de Pastas

```bash
src/
├── domain/
│   ├── adapters/
│   ├── entities/
│   ├── repositories/
│   └── services/
├── application/
│   ├── dto/
│   └── use-cases/
├── infrastructure/
│   ├── database/
│   │   └── typeorm/
│   │       ├── entities/
│   │       └── repositories/
│   ├── integrations/
│   └── providers/
├── interfaces/
│   ├── http/
│   │   ├── controllers/
│   │   └── dto/
│   └── websocket/
│       ├── dto/
│       └── gateways/
├── app.module.ts
└── main.ts
```

---

## 4) Instalação e Execução

### Pré-requisitos
- Node.js 20+
- npm 10+

### 4.1 Instalação

```bash
npm install
```

> O projeto usa versões compatíveis do ecossistema NestJS v10 e `@nestjs/swagger` v7.

### 4.2 Executar em desenvolvimento

```bash
npm run start:dev
```

### 4.3 Build e execução em produção

```bash
npm run build
npm run start:prod
```

Serviços expostos:
- UI do Chat (HTML/CSS): `http://localhost:3000`
- API HTTP: `http://localhost:3000`
- Swagger (OpenAPI): `http://localhost:3000/docs`
- Socket.IO endpoint: `ws://localhost:3000`

---

## 5) Swagger (OpenAPI)

A documentação OpenAPI está habilitada de forma centralizada em um endpoint único e consistente:

```bash
http://localhost:3000/docs
```

### Endpoints principais
- `POST /users` → cadastra usuário
- `POST /rooms` → cria sala
- `POST /rooms/:roomId/join/:userId` → valida entrada de usuário em sala
- `GET /rooms/:roomId/messages` → histórico da sala

---

## 6) Eventos WebSocket

### Evento: `room:join`
Payload:
```json
{
  "roomId": "uuid-da-sala",
  "userId": "uuid-do-usuario"
}
```
Retorno broadcast:
- `room:user-joined`

### Evento: `message:send`
Payload:
```json
{
  "roomId": "uuid-da-sala",
  "userId": "uuid-do-usuario",
  "content": "Olá @assistant"
}
```
Retorno broadcast:
- `message:new` (mensagem do usuário)
- `message:new` (mensagem da assistente, quando triggerado `@assistant`)

---

## 7) Banco de Dados

### Desenvolvimento
- SQLite (`chat.db`) com `synchronize: true`

### Produção (recomendado)
- Trocar para PostgreSQL no `TypeOrmModule.forRoot`.
- Manter contratos de repositório; a troca é transparente para o domínio/aplicação.

---

## 8) Como Adicionar Novas Integrações (Adapters)

Exemplo: integrar provedor real de IA.

1. Criar implementação em `src/infrastructure/integrations/` para a interface `AIChatAdapter`.
2. Registrar no `AppModule` no token `AI_CHAT_ADAPTER`.
3. Manter `SendMessageUseCase` inalterado (Inversão de Dependência).

Esse padrão também permite integrar:
- bots internos
- serviços de moderação
- analytics/event streaming
- traduções automáticas

---

## 9) Expansibilidade Planejada

A arquitetura já permite evolução para:

- **Bots adicionais**: novos adapters + roteamento por tipo de mensagem.
- **JWT**: incluir módulo de auth e guardas nas interfaces sem quebrar casos de uso.
- **Novos tipos de mensagens**: campo `type` já previsto (`USER_TEXT`, `ASSISTANT_TEXT`, etc).
- **Serviços externos**: integração via portas/adapters sem refatorações grandes.

---

## 10) Próximos passos sugeridos

- Criar módulo de autenticação JWT e refresh tokens.
- Persistir memberships em tabela `room_members`.
- Adicionar controle de presença online/offline.
- Implementar testes unitários dos use-cases e testes de integração E2E.

---


## 11) Troubleshooting

### Erro: `Cannot find name 'end_of_line'` em `src/main.ts`

Se você encontrar algo como:

```
src/main.ts:41:1 - error TS2304: Cannot find name 'end_of_line'.
```

isso indica que uma linha de configuração de editor (ex.: `end_of_line = lf`) foi inserida acidentalmente dentro de um arquivo TypeScript.

Como corrigir:
1. Abra `src/main.ts` e remova qualquer linha inválida parecida com `end_of_line = lf`.
2. Garanta que o arquivo termine com `void bootstrap();`.
3. Rode novamente:

```bash
npm run start
```

> Este repositório já inclui `.editorconfig` para evitar esse problema no futuro.

---

## Evolução para Chat Corporativo ou Educacional

Este projeto pode evoluir para:

- **Corporativo**: canais por equipe, permissões por papel, integração com SSO, auditoria e compliance.
- **Educacional**: salas por turma/disciplina, bots tutores, trilhas de aprendizado e métricas de engajamento.

Como a base usa Clean Architecture, o crescimento acontece por módulos e adapters, evitando refatorações disruptivas.
