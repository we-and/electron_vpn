
const { app, BrowserWindow, ipcMain } = require('electron');
let settingsWindow;
let mainWindow;
function createSettingsWindow() {
    settingsWindow = new BrowserWindow({
        width: 400,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false // Note: For security reasons, consider using contextIsolation: true and preload scripts
        }
    });

    // Load the HTML file for the settings window
    settingsWindow.loadFile('settings.html');
    settingsWindow.webContents.openDevTools();
    // Clear the window when closed
    settingsWindow.on('closed', () => settingsWindow = null);
}

function createWindow () {
    // Create the browser window.
     mainWindow = new BrowserWindow({
        width: 400,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // and load the index.html of the app.
    mainWindow.loadFile('index.html');

    mainWindow.webContents.openDevTools();
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});


// Listen for an 'open-settings-window' message from the renderer process
ipcMain.on('open-settings-window', (event, arg) => {
    createSettingsWindow();
});
