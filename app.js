Ext.application({
    name: 'MyApp',

    mainView: 'MyApp.view.main.Main',
    

    requires: [
        'MyApp.*',
    ],

    launch: function(){

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
    }
});



