
function onInstall(e) {
    onOpen(e);
}

function onOpen(e) {
    SpreadsheetApp.getUi()
        .createMenu('Fábrica de relleno y envío de plantillas')
        .addItem('Construir proyecto', 'BUILDER.crate_tables')
        .addItem('Ejecutar', 'EXECUTOR.TakeOff')
        .addToUi();
}