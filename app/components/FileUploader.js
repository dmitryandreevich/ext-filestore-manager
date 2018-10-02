Ext.define('MyApp.components.FileUploader', {
    extend: 'Ext.form.Panel',
    alias: 'FileUploader',
    xtype: 'fileuploader',
    
    width: 400,
    bodyPadding: 15,
    
    frame: true,
    renderTo: Ext.getBody(),
    
    items: [{
        xtype: 'filefield',
        name: 'file',
        fieldLabel: 'file',
        labelWidth: 50,
        msgTarget: 'side',
        allowBlank: false,
        anchor: '100%',
        buttonText: 'Выберите файл...'
    }],

    buttons: [{
        text: 'Загрузить',
        handler: function() {
            var form = Ext.getCmp('ext-fileuploader-1');

            if(form.isValid()) {
                form.submit({
                    url: MyApp.FileStore.Config.urlMethods.uploadFile,
                    params: {
                        path: MyApp.UserData.currentPath,
                        selectedStore: MyApp.UserData.selectedStore
                    },
                    waitMsg: 'Загрузка вашего файла...',
                    success: function(form, action) {
                        console.log(action);
                     },
                    failure: function(form, action) {
                        console.log(action);
                    }
                });
            }
        }
    }]
});