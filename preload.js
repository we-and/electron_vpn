const { contextBridge, ipcRenderer } = require('electron');
const { exec } = require('child_process');

contextBridge.exposeInMainWorld('electronAPI', {
    runCommand: (cmd, callback) => {
        exec(cmd, (error, stdout, stderr) => {
            callback(stdout);
        });
    }
});


contextBridge.exposeInMainWorld(
  'api', {
    send: (channel, data) => {
      ipcRenderer.send(channel, data);
    },
    receive: (channel, func) => {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
);