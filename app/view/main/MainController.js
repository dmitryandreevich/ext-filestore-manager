Ext.define('MyApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    requires: [
        'Ext.MessageBox',
    ],

    /*
    control: {
        'grid': {
            itemtap: 'onItemTap'
        }
    },

    onItemTap: function(grid, index, target, record, e) {
        if(e.target.classList.contains("fa-trash") ||
           e.target.children[0] && e.target.children[0].classList.contains("fa-trash"))
        {
            console.log(record);
            
            Ext.Msg.confirm("Confirmation", "Are you sure you want to do that?", function(btn) {
                if(btn == 'yes') {
                    grid.getStore().removeAt(index);
                }
            });
        }
    },*/

    onRefreshList: function(){

       var fStore = Ext.create('FileStore'); 
       fStore.getFilesData('' ,filesData => {

            var store = Ext.create('Ext.data.Store', {
                model: 'MyApp.view.main.MainModel',
                data: filesData
             });

            if( grid = Ext.getCmp( MyApp.FileStore.Config.componentIds.filesGrid ) )
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
                    if( grid =  Ext.getCmp( MyApp.FileStore.Config.componentIds.filesGrid ) )
                        grid.getStore().loadData(filesData);

                    MyApp.UserData.currentPath = path;
                } );
            }else if( selectedRow.data.type === 'file'){
                fStore.getFileContent(path, resp => {
                    if(resp !== ''){
                        var response = JSON.parse(resp);
                        
                        if(response.type === 'text/plain'){
                            var textEditor = Ext.create('TextEditor');

                            textEditor.setValue(response.content);
                            textEditor.setPathToFile( MyApp.UserData.currentPath + '/' + response.basename );
                            textEditor.show();
                        } else if( ~response.type.indexOf('image') ){
                            var iv = Ext.create('MyApp.components.ImageViewer');

                            iv.setSrcBase64(response.content);
                            iv.show();
                        }
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
                if( grid =  Ext.getCmp( MyApp.FileStore.Config.componentIds.filesGrid ) )
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
                //Ext.toast('Удалено!');

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
                   // Ext.toast('Папка была успешно создана!');
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
                        //Ext.toast('Файл был переименован!');
                        reloadGridDataFunc(currentPath, fStore);
                    });
                }
            }
        });
    },

    onDownloadFile: function(){
        var grid =  Ext.getCmp( MyApp.FileStore.Config.componentIds.filesGrid );
        var selectedRow = grid.getSelection();

        var fStore = Ext.create('FileStore');
        fStore.getFileContent(selectedRow.data.path, response => {
            response = JSON.parse(response);

            var type = response.type;
            var filename = response.basename;
            var content = response.content;

            // пока проблема со скачиванием любых закодированных файлов
            if(~ type.indexOf('text') ){
                var blob = new Blob([content], {
                    type: type
                });

                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = filename;
                a.click();
                window.URL.revokeObjectURL(url);
            }
        } );
    },

    onCreateFile: function () {
        Ext.Msg.prompt('Создание нового файла', 'Пожалуйста, название с расширением:', function(btn, text){
            if (btn == 'ok'){
                Ext.create('FileStore').createOrRewriteFile( MyApp.UserData.currentPath + text, '', () => {
                    //Ext.toast('Файл был успешно создан!');
                });
            }
        });
    },

    onSelectStore: function () {
        var w = Ext.create('Ext.window.Window', {
            width: 400,
            padding: 10,

            items: [
                {
                    xtype: 'combobox',
                    label: 'Хранилище',
                    displayField: 'name',
                    valueField: 'abbr',
                    editable: false,
                    value: 'local',
                    id: 'selStoreCombobox',
                    store: [
                        { abbr: 'local', name: 'Локальное хранилище (Local)' },
                        { abbr: 'S3', name: 'Облачное хранилище (AWS3)' },
                    ]
                }
            ],

            buttons: [
                {
                    text: 'Закрыть',
                    handler: () => { 
                        w.close();
                     }
                },
                {
                    text: 'Сохранить',
                    handler: () => {
                        var combobox = Ext.getCmp('selStoreCombobox');
                        MyApp.UserData.setSelectedStore( combobox.getValue() );
                        Ext.get('refreshButton').el.dom.click();
                        Ext.get('currentStore').setHtml('Текущее хранилище: ' + combobox.getValue());
                        w.close();
                    }
                }
            ]
            
        }).show();
    },

    reloadGridData: function(path, fStoreInstance = false){
        if(!fStoreInstance)
            fStoreInstance = Ext.create('FileStore'); 
            fStoreInstance.getFilesData(path ,filesData => {

            if( grid =  Ext.getCmp( MyApp.FileStore.Config.componentIds.filesGrid ) )
                grid.getStore().loadData(filesData);

        } );
    },

});