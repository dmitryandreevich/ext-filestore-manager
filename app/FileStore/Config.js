Ext.define('MyApp.FileStore.Config', {
    alias: 'FileStore.Config',
    singleton: true,
    componentIds: {
        filesGrid: 'filesGrid'
    },
    urlMethods: {
        getFilesData: 'http://t-maxim/web/?r=main/get_files_data',
        delete: 'http://t-maxim/web/?r=main/delete',
        createNewFolder: 'http://t-maxim/web/?r=main/new_folder',
        rename: 'http://t-maxim/web/?r=main/rename',
        getFileContent: 'http://t-maxim/web/?r=main/get_content',
        createOrRewriteFile: 'http://t-maxim/web/?r=main/create_or_rewrite_file',
        uploadFile: 'http://t-maxim/web/?r=main/upload'

    }
})