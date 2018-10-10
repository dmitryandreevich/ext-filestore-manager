Ext.define('MyApp.FileStore.FileStore', {
    alias: 'FileStore',

    config: {
        selectedStore: 'local',
        path: ''
    },

    constructor: function(config){
        this.initConfig(config);
    },

    getFilesData: function(path = '', callback){
        var selectedStore = MyApp.UserData.selectedStore;

        Ext.Ajax.request({
            url: MyApp.FileStore.Config.urlMethods.getFilesData,
            method: 'POST',
            params: {
                selectedStore: selectedStore,
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

    delete: function(path, type, callback){  
        var selectedStore = MyApp.UserData.selectedStore;
        Ext.Ajax.request({
            url: MyApp.FileStore.Config.urlMethods.delete,
            method: 'POST',
            params: {
                path: path,
                type: type,
                selectedStore: selectedStore
            },
            success: function(response){
                callback(response);
            }
        });
    },

    createNewFolder: function(path, name, callback = null){
        var selectedStore = MyApp.UserData.selectedStore;

        Ext.Ajax.request({
            url: MyApp.FileStore.Config.urlMethods.createNewFolder,
            method: 'POST',
            params: {
                path: path,
                name: name,
                selectedStore: selectedStore
            },

            success: function(response){
                callback();
            }
        });
    },

    rename: function(path, newPath, callback = null){
        var selectedStore = MyApp.UserData.selectedStore;

        Ext.Ajax.request({
            url: MyApp.FileStore.Config.urlMethods.rename,
            method: 'POST',
            params: {
                path: path,
                newPath: newPath,
                selectedStore: selectedStore
            },

            success: function(response){
                callback();
            }
        });
    },

    getFileContent: function(path, callback = null){
        var selectedStore = MyApp.UserData.selectedStore;

        Ext.Ajax.request({
            url: MyApp.FileStore.Config.urlMethods.getFileContent,
            method: 'POST',
            params: {
                path: path,
                selectedStore: selectedStore
            },

            success: function(response){
                callback(response.responseText);
            }
        });
    },

    createOrRewriteFile(path, content = ' ', callback = null){
        var selectedStore = MyApp.UserData.selectedStore;

        Ext.Ajax.request({
            url: MyApp.FileStore.Config.urlMethods.createOrRewriteFile,
            method: 'POST',
            params: {
                path: path,
                content: content,
                selectedStore: selectedStore
            },

            success: function(response){
                callback(response.responseText);
            }
        });
    }


});