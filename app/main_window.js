const electron = require('electron');
const {
    BrowserWindow
} = electron;

class MainWindow extends BrowserWindow {

    constructor(loadURL, iconPath, optionnals) {
        super({
            height: 500,
            width: 300,
            // Window decoration
            frame: true,
            // Block window rezise
            resizable: true,
            show: true,
            // Needed on linux to show icon on taskbar (if wants to show in the task bar)
            icon: iconPath,
            // Won't show the tray icon app on taskBar, app.dock.hide() for mac
            skipTaskbar: false,
            webPreferences: {
                // Avoid freeze of the app when no focused (tray)
                backgroundThrottling: false
            }
        });

        this.loadURL(loadURL);

        if (optionnals) {
            if (optionnals.hideOnBlur) {
                this.on('blur', this.hideWindow.bind(this));
            }
        }
    }

    hideWindow() {
        this.hide();
    }
}

module.exports = MainWindow;