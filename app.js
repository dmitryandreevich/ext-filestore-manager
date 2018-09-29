Ext.application({
    name: 'MyApp',

    mainView: 'MyApp.view.main.Main',
    

    requires: [
        'MyApp.*',
    ],
    openImageViewer: function(imageBase64){
        var w = Ext.create('Ext.window.Window', {
            width: 500,
            height: 500,
            clossable: true,
            //html: "<img src='data:image;base64,"+ imageBase64 +"'>"

            items: [
                {
                    xtype: 'img',
                    src: 'data:image;base64,' + imageBase64,
                    id: 'img',
                    width: 50,
                    height: 50,
                    
                },
            ],
            buttons: [
                {
                    text: 'Закрыть',
                    handler: () => { w.close(); }       
                }
            ]
        }).show();
    },

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
        /*
         var e = Ext.create('Ext.window.Window',{
             items: [
                 {
                     xtype: 'fileuploader'
                 }
             ]
         }).show();
         */
        
         
    }

    
});



