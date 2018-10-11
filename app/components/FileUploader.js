Ext.define('MyApp.components.FileUploader', {
    extend: 'Ext.form.Panel',
    alias: 'FileUploader',
    xtype: 'fileuploader',
    urlUpload: false,
    
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
            var url = form.urlUpload ? form.urlUpload : MyApp.FileStore.Config.urlMethods.uploadFile; 
            var csrfToken = Ext.create('MyApp.FileStore.FileStore').getMetaContent('csrf-token');

            if(form.isValid()) {
                form.submit({
                    url: url,
                    params: {
                        path: MyApp.UserData.currentPath,
                        selectedStore: MyApp.UserData.selectedStore,
                        _csrf: csrfToken
                    },
                    waitMsg: 'Загрузка вашего файла...',
                    success: function(form, action) {
                     },
                    failure: function(form, action) {
                    }
                });
            }
        }
    }]
});