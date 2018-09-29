Ext.define('MyApp.components.FileUploader', {
    extend: 'Ext.form.Panel',
    alias: 'FileUploader',
    xtype: 'fileuploader',
    title: 'Загрузчик файлов',
    
    width: 400,
    bodyPadding: 10,
    
    frame: true,
    renderTo: Ext.getBody(),
    
    items: [{
        xtype: 'filefield',
        name: 'photo',
        fieldLabel: 'Photo',
        labelWidth: 50,
        msgTarget: 'side',
        allowBlank: false,
        anchor: '100%',
        buttonText: 'Select Photo...'
    }],

    buttons: [{
        text: 'Загрузить',
        handler: function() {
            var form = Ext.getCmp('ext-fileuploader-1');

            if(form.isValid()) {
                form.submit({
                    url: 'http://t-maxim/web/?r=main/refresh',
                    waitMsg: 'Uploading your photo...',
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                     },
                     failure: function(form, action) {
                        console.log(action);
                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                     }
                });
            }
        }
    }]
});