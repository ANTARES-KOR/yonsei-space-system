import { contextBridge, ipcRenderer } from "electron";
import { BuildingName } from "./constants";

contextBridge.exposeInMainWorld("YonseiSpaceSystem", {
  login: (id: string, pw: string) => ipcRenderer.invoke("login", id, pw),
  getRoomReservations: (building: BuildingName, room: string) =>
    ipcRenderer.invoke("getRoomReservations", building, room),
});
