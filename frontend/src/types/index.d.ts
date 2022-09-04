/* eslint-disable no-unused-vars */
export {};

declare global {
  interface Window {
    YonseiSpaceSystem: {
      login: (id: string, pw: string) => Promise<boolean>;
    };
  }
}
