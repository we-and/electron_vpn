const { ipcRenderer } = require('electron');

function saveSettings() {
    const killSwitchEnabled = document.getElementById('killSwitch').checked;
    const wifiProtectionEnabled = document.getElementById('wifiProtection').checked;

    // Send these settings back to the main process if needed or store them
    ipcRenderer.send('save-settings', { killSwitchEnabled, wifiProtectionEnabled });
}