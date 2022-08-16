import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("YonseiSpaceSystem", {
  login: (id: string, pw: string) => ipcRenderer.invoke("login", id, pw),
});
