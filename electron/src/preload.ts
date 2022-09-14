import { BuildingUID, RoomUID } from "./types";
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("YonseiSpaceSystem", {
  login: (id: string, pw: string) => ipcRenderer.invoke("login", id, pw),

  getRoomReservations: (building_uid: BuildingUID, room_uid: RoomUID) =>
    ipcRenderer.invoke("getRoomReservations", building_uid, room_uid),

  getRoomList: () => ipcRenderer.invoke("getRoomList"),
});
