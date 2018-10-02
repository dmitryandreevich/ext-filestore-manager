Ext.define('MyApp.FileStore.Config', {
    alias: 'FileStore.Config',
    singleton: true,
    componentIds: {
        filesGrid: 'filesGrid'
    },
    urlMethods: {
        getFilesData: 'http://t-maxim/web/?r=main/get-files-data',
        delete: 'http://t-maxim/web/?r=main/delete',
        createNewFolder: 'http://t-maxim/web/?r=main/new-folder',
        rename: 'http://t-maxim/web/?r=main/rename',
        getFileContent: 'http://t-maxim/web/?r=main/get-content',
        createOrRewriteFile: 'http://t-maxim/web/?r=main/create-or-rewrite-file',
        uploadFile: 'http://t-maxim/web/?r=main/upload'

    }
})