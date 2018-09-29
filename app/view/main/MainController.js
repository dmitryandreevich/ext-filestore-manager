Ext.define('MyApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    requires: [
        'Ext.MessageBox',
    ],

    onGo: function(){
        Ext.Msg.alert('Alert title', 'Clicked!');
    },

    remove: function(){
        var filesGrid = Ext.getCmp('filesGrid');
        var selection = filesGrid.getSelection().data; 
        console.log(selection);
    },

    onRefreshList: function(){

       var fStore = Ext.create('FileStore'); 
       fStore.getFilesData('' ,filesData => {

            var store = Ext.create('Ext.data.Store', {
                model: 'MyApp.view.main.MainModel',
                data: filesData
             });

            var grid =  Ext.getCmp( MyApp.FileStore.Config.componentIds.filesGrid );
            if( grid )
                grid.setStore(store);
        } );
    },
    
    onOpenFolder: function(){
        var grid =  Ext.getCmp( MyApp.FileStore.Config.componentIds.filesGrid );
        var selectedRow = grid.getSelection();

        if(selectedRow){
            var path = selectedRow.data.path;
            var fStore = Ext.create('FileStore'); 
            
            if( selectedRow.data.type === 'dir' ){
                fStore.getFilesData(path ,filesData => {
                    var grid =  Ext.getCmp( MyApp.FileStore.Config.componentIds.filesGrid );
                    
                    if( grid )
                        grid.getStore().loadData(filesData);

                    MyApp.UserData.currentPath = path;
                } );
            }else if( selectedRow.data.type === 'file'){
                fStore.getFileContent(path, resp => {
                    var response = JSON.parse(resp);
                    
                    if(response.type === 'text/plain'){
                        //this.openTextEdtor(response.content);
                        var textEditor = Ext.create('TextEditor');
                        textEditor.setValue(response.content);
                        textEditor.show();
                    } else if( ~response.type.indexOf('image') ){
                        var iv = Ext.create('MyApp.components.ImageViewer');
                        iv.setSrcBase64(response.content);
                        iv.show();
                    }
                });
            }
        }
    },
    
    onBackFolder: function(){
        var currentPath = MyApp.UserData.currentPath;

        if( currentPath !== '' ){
            var backPath = currentPath + '/..';
            var fStore = Ext.create('FileStore'); 

            fStore.getFilesData(backPath ,filesData => {
                var grid =  Ext.getCmp( MyApp.FileStore.Config.componentIds.filesGrid );
                if( grid )
                    grid.getStore().loadData(filesData);

                MyApp.UserData.currentPath = backPath;
            } );
        }
    },


    onDelete: function(){
        var grid =  Ext.getCmp( MyApp.FileStore.Config.componentIds.filesGrid );
        var selectedRow = grid.getSelection();

        if(selectedRow){
            var fStore = Ext.create('FileStore');

            fStore.delete(selectedRow.data.path, selectedRow.data.type, () => {
                var currentPath = MyApp.UserData.currentPath;
                this.reloadGridData( currentPath, fStore );
                Ext.toast('Удалено!');

                //grid.getStore().remove(selectedRow); Тут я не решил. Либо на клиенте просто удалять строку, либо синхронизировать.
            });
        }

    },

    onNewFolder: function(){
        var reloadGridDataFunc = this.reloadGridData;

        Ext.Msg.prompt('Новая папка', 'Пожалуйста, введите название новой папки:', function(btn, text){
            if (btn == 'ok'){
                var fStore = Ext.create('FileStore');
                var currentPath = MyApp.UserData.currentPath;

                fStore.createNewFolder(currentPath, text, () => {
                    Ext.toast('Папка была успешно создана!');
                    reloadGridDataFunc( currentPath, fStore );
                });
            }
        });
    }
    ,
    onRename: function(){
        var reloadGridDataFunc = this.reloadGridData;
        var grid =  Ext.getCmp( MyApp.FileStore.Config.componentIds.filesGrid );
        var selectedRow = grid.getSelection();

        Ext.Msg.prompt('Переименовать - ' + selectedRow.data.filename, 'Пожалуйста, введите новое название:', function(btn, text){
            if (btn == 'ok'){
                var fStore = Ext.create('FileStore');
                var currentPath = MyApp.UserData.currentPath;
                
                var pathToFile = currentPath + '/' + selectedRow.data.basename;
                var newPathToFile = currentPath + '/' + text;

                if(text !== ''){
                    fStore.rename(pathToFile, newPathToFile, () => {
                        Ext.toast('Файл был переименован!');
                        reloadGridDataFunc(currentPath, fStore);
                    });
                }
            }
        });
    },
    // в отдельные классы

    openTextEdtor: function(text){
        var w = Ext.create('Ext.window.Window', {
            width: 500,
            height: 500,
            padding: 10,
            title: 'Просмотр файла',
            closable: true,
            
            items:[
                {
                    xtype: 'textareafield',
                    height: 350,
                    disabled: true,
                    value: text,
                }
            ],

            buttons: [
                {
                    text: 'Закрыть',
                    handler: () => { w.close(); }
                }
            ]
         });
         w.show();

         return w;

    },

    reloadGridData: function(path, fStoreInstance = false){
        if(!fStoreInstance)
            fStoreInstance = Ext.create('FileStore'); 

            fStoreInstance.getFilesData(path ,filesData => {
            var grid =  Ext.getCmp( MyApp.FileStore.Config.componentIds.filesGrid );
            if( grid )
                grid.getStore().loadData(filesData);

        } );
    }
});