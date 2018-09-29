Ext.define('MyApp.FileStore.FileStore', {
    alias: 'FileStore',
    //singleton: true,

    config: {
        selectedStore: 'local', // local or CloudS3
        path: ''
    },

    constructor: function(config){
        this.initConfig(config);
    },

    getFilesData: function(path = '', callback){

        Ext.Ajax.request({
            url: MyApp.FileStore.Config.urlMethods.getFilesData,
            method: 'POST',
            params: {
                path: path
            },
            success: function(response){
                var filesData = JSON.parse(response.responseText);
                var storeData = [];

                Object.keys(filesData).forEach(key => {
                    var fileData = filesData[ key ];

                    storeData.push(fileData);
                });

                callback(storeData);
            }
        });
    },

    /**
     * type = any file or directory
     */

    delete: function(path, type, callback){  
        Ext.Ajax.request({
            url: MyApp.FileStore.Config.urlMethods.delete,
            method: 'POST',
            params: {
                path: path,
                type: type
            },
            success: function(response){

                callback(response);
            }
        });
    },

    createNewFolder: function(path, name, callback = null){
        Ext.Ajax.request({
            url: MyApp.FileStore.Config.urlMethods.createNewFolder,
            method: 'POST',
            params: {
                path: path,
                name: name
            },

            success: function(response){
                callback();
            }
        });
    },

    rename: function(path, newPath, callback = null){
        Ext.Ajax.request({
            url: MyApp.FileStore.Config.urlMethods.rename,
            method: 'POST',
            params: {
                path: path,
                newPath: newPath
            },

            success: function(response){
                callback();
            }
        });
    },

    getFileContent: function(path, callback = null){
        Ext.Ajax.request({
            url: MyApp.FileStore.Config.urlMethods.getFileContent,
            method: 'POST',
            params: {
                path: path,
            },

            success: function(response){
                callback(response.responseText);
            }
        });
    },

    createOrRewriteFile(path, content = ' ', callback = null){
        Ext.Ajax.request({
            url: MyApp.FileStore.Config.urlMethods.createOrRewriteFile,
            method: 'POST',
            params: {
                path: path,
                content: content
            },

            success: function(response){
                callback(response.responseText);
            }
        });
    }


});