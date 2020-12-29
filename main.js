const { app, BrowserWindow } = require('electron')

function isDev() {
  return process.argv[2] == '--dev';
}


if(isDev()) {
  console.log("environment: development")
  var args = process.argv.slice(3);
} else {
  console.log("environment: production")
  var args = process.argv.slice(1);
}

data = {"args": args, "dirname": __dirname};

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
  })

  try {
    win.removeMenu()
  } catch(e) {
    win.setMenuBarVisibility(false)
  }

  win.loadFile(`index.html`, {query: {"data": JSON.stringify(data)}});
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})