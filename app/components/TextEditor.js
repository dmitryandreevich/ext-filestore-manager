Ext.define('MyApp.components.TextEditor', {
    extend: 'Ext.window.Window',
    alias: 'TextEditor',
    id: 'textEditorWindow',
    
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
            
            //disabled: true,
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
            handler: '',
        }
    ]
 });