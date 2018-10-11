Ext.define('MyApp.FileStore.FileStore', {
    alias: 'FileStore',

    config: {
        selectedStore: 'local',
        path: ''
    },

    constructor: function(config){
        this.initConfig(config);
    },
    getMetaContent: function (metaName) {
        var metas = document.getElementsByTagName('meta');
        var re = new RegExp('\\b' + metaName + '\\b', 'i');
        var i = 0;
        var mLength = metas.length;
     
        for (i; i < mLength; i++) {
            if (re.test(metas[i].getAttribute('name'))) {
                return metas[i].getAttribute('content');
            }
        }
     
        return '';
    },
    getFilesData: function(path = '', callback){
        var selectedStore = MyApp.UserData.selectedStore;
        var csrfToken = this.getMetaContent('csrf-token');
        Ext.Ajax.request({
            url: MyApp.FileStore.Config.urlMethods.getFilesData,
            method: 'POST',
            params: {
                selectedStore: selectedStore,
                path: path,
                _csrf: csrfToken 
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
        var csrfToken = this.getMetaContent('csrf-token');
        Ext.Ajax.request({
            url: MyApp.FileStore.Config.urlMethods.delete,
            method: 'POST',
            params: {
                path: path,
                type: type,
                selectedStore: selectedStore,
                _csrf: csrfToken 

            },
            success: function(response){
                callback(response);
            }
        });
    },

    createNewFolder: function(path, name, callback = null){
        var selectedStore = MyApp.UserData.selectedStore;
        var csrfToken = this.getMetaContent('csrf-token');

        Ext.Ajax.request({
            url: MyApp.FileStore.Config.urlMethods.createNewFolder,
            method: 'POST',
            params: {
                path: path,
                name: name,
                selectedStore: selectedStore,
                _csrf: csrfToken 

            },

            success: function(response){
                callback();
            }
        });
    },

    rename: function(path, newPath, callback = null){
        var csrfToken = this.getMetaContent('csrf-token');
        var selectedStore = MyApp.UserData.selectedStore;

        Ext.Ajax.request({
            url: MyApp.FileStore.Config.urlMethods.rename,
            method: 'POST',
            params: {
                path: path,
                newPath: newPath,
                selectedStore: selectedStore,
                _csrf: csrfToken 

            },

            success: function(response){
                callback();
            }
        });
    },

    getFileContent: function(path, callback = null){
        var csrfToken = this.getMetaContent('csrf-token');
        var selectedStore = MyApp.UserData.selectedStore;

        Ext.Ajax.request({
            url: MyApp.FileStore.Config.urlMethods.getFileContent,
            method: 'POST',
            params: {
                path: path,
                selectedStore: selectedStore,
                _csrf: csrfToken 

            },

            success: function(response){
                callback(response.responseText);
            }
        });
    },

    createOrRewriteFile(path, content = ' ', callback = null){
        var csrfToken = this.getMetaContent('csrf-token');
        var selectedStore = MyApp.UserData.selectedStore;

        Ext.Ajax.request({
            url: MyApp.FileStore.Config.urlMethods.createOrRewriteFile,
            method: 'POST',
            params: {
                path: path,
                content: content,
                selectedStore: selectedStore,
                _csrf: csrfToken 

            },

            success: function(response){
                callback(response.responseText);
            }
        });
    }


});