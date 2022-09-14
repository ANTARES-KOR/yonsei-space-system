// Modules to control application life and create native browser window
import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { YonseiSpaceSystem } from "./module/YonseiSpaceSystem";
import updater from "update-electron-app";
import logger from "electron-log";

updater({
  repo: "ANTARES-KOR/yonsei-space-system",
  updateInterval: "1 hour",
  logger,
});

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL("http://127.0.0.1:5173/login");
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(async () => {
  const yonseiSpaceSystem = new YonseiSpaceSystem();
  await yonseiSpaceSystem.init();

  createWindow();

  ipcMain.handle("login", async (event, ...args) => {
    const [id, pw] = args;
    const result = await yonseiSpaceSystem.login(id, pw);
    return result;
  });

  ipcMain.handle("getRoomReservations", async (event, ...args) => {
    const [building, room] = args;
    const result = await yonseiSpaceSystem.getRoomReservations(building, room);
    return result;
  });

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
