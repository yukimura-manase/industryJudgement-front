/**
 * Valtio Store定義
 * 使用例
 *
 * const states = proxy({
 *   isAuthLoading: false,
 *   auth: null as {
 *     username: string;
 *   } | null,
 * });
 *
 * /** ログイン処理 /
 * const actions = {
 *   async login() {
 *     states.isAuthLoading = true;
 *
 *     try {
 *       await wait(1000);
 *       states.auth = {
 *         username: "Robotama",
 *       };
 *     } finally {
 *       states.isAuthLoading = false;
 *     }
 *   },
 * };
 *
 * export const authStore = {
 *   states,
 *   actions,
 * } satisfies Store;
 */

/** 1. Valtio Store の型定義 */
export interface Store {
  states: Record<string | number | symbol, any>;
  actions: Record<string | number | symbol, (...param: any) => any>;
}

/** 2. Record<string | number | symbol, any> は、次のような Index Signatureの型定義と同様 */
interface StatesType {
  [key: string | number | symbol]: any;
}

/** 3. Record<string | number | symbol, (...param: any) => any> は、次のような Index Signatureの型定義と同様 */
interface ActionsType {
  [key: string | number | symbol]: (...param: any) => any;
}
