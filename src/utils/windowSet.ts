import { Page } from "puppeteer";

const windowSet = (page: Page, name: string, value: string | number) => {
  page.evaluateOnNewDocument(`
    Object.defineProperty(window, '${name}', {
      get() {
        return ${value};
      }
    });
  `);
};

export default windowSet;
