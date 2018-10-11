Ext.define('MyApp.components.TextEditor', {
    extend: 'Ext.window.Window',
    alias: 'TextEditor',
    id: 'textEditorWindow',
    config: {
        pathToFile: ''
    },
    
    width: 500,
    height: 500,
    padding: 10,
    title: 'Просмотр файла',
    closable: true,
    
    setValue: function(text){
        Ext.getCmp('editorArea').setValue(text);
    },

    items:[
        {
            xtype: 'textareafield',
            height: 350,
            id: 'editorArea',
            value: '',
        }
    ],

    buttons: [
        {
            text: 'Закрыть',
            handler: () => {  Ext.getCmp('textEditorWindow').close();}
        },
        {
            text: 'Сохранить',
            handler: () => {
                var pathToFile = Ext.getCmp('textEditorWindow').getPathToFile();
                var content = Ext.getCmp('editorArea').getValue();

                Ext.create('FileStore').createOrRewriteFile(pathToFile, content, () => {
                    Ext.toast('Файл был успешно сохранён!');
                });
                
            },
        }
    ]
 });