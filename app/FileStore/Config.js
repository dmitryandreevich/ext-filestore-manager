Ext.define('MyApp.FileStore.Config', {
    alias: 'FileStore.Config',
    singleton: true,
    componentIds: {
        filesGrid: 'filesGrid'
    },
    host: window.location.protocol + window.location.host,
    urlMethods: {
        getFilesData:        '/web/?r=main/get-files-data',
        delete:              '/web/?r=main/delete',
        createNewFolder:     '/web/?r=main/new-folder',
        rename:              '/web/?r=main/rename',
        getFileContent:      '/web/?r=main/get-content',
        createOrRewriteFile: '/web/?r=main/create-or-rewrite-file',
        uploadFile:          '/web/?r=main/upload',
        uploadFileToDB:      '/web/?r=main/upload-to-db'

    }
})