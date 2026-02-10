/**
 * Tokens explícitos para DI.
 *
 * Decisão arquitetural:
 * - Evitamos acoplamento direto com classes concretas nas camadas de aplicação/domínio.
 * - Tokens facilitam substituição de implementações (ex: trocar SQLite por Postgres).
 */
export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
export const ROOM_REPOSITORY = Symbol('ROOM_REPOSITORY');
export const MESSAGE_REPOSITORY = Symbol('MESSAGE_REPOSITORY');
export const AI_CHAT_ADAPTER = Symbol('AI_CHAT_ADAPTER');
