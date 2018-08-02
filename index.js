const path = require('path');
const electron = require('electron');
const AppTray = require('./app/app_tray');
const MainWindow = require('./app/main_window');

const {
    app,
    ipcMain
} = electron;

// if need to hide the app from taskbar/dock
const hideApp = false;
// Set up a tray icon
const useTray = false;

// Init on ready
let isLinux;
let isWindows;
let isMac;

// Keeps reference to avoid garbage collection 
let mainWindow;
let tray;


app.on('ready', () => {
    console.log('App is ready');
    console.log(`Platform is ${process.platform}`);

    // Update plateform info
    isMac = process.platform === 'darwin';
    isWindows = process.platform === 'win32';
    isLinux = !isWindows && !isMac;

    const appIcon = !isMac ? 'windows-icon.png' : 'iconTemplate.png';
    const appIconPath = path.join(__dirname, `./src/assets/${appIcon}`);

    // (macOs only) Hide the tray app on the dock 
    if (hideApp && isMac) {
        app.dock.hide();
    }

    const loadURL = `file://${__dirname}/src/index.html`;
    let optionals = {
        hideOnBlur : true
    }
    mainWindow = new MainWindow(loadURL, appIconPath, optionals);

    if (useTray) {
        tray = new AppTray(appIconPath, mainWindow);
    }
});