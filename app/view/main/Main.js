var dataStore = Ext.create('Ext.data.Store', {
    model: 'MyApp.view.main.MainModel',

    data: [
       { fileName: 'fileName', fileSize: 123, extension: 'png', created: '12345' },
    ]
    
});

Ext.define('MyApp.view.main.Main', {
    extend: 'Ext.panel.Panel',
    requires:[
        
    ],
    controller: 'main',

    renderTo: document.body,

    layout: {
        type: 'vbox',
    },
    items: [
        {
            xtype: 'panel',

            items: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Назад',
                            handler: 'onBackFolder',
                        },
                        {
                            xtype: 'button',
                            text: 'Открыть',
                            handler: 'onOpenFolder',
                        },
                        {
                            xtype: 'button',
                            text: 'Обновить',
                            handler: 'onRefreshList',
                        },
                        {
                            xtype: 'button',
                            text: 'Загрузить'
                        },
                        {
                            xtype: 'button',
                            text: 'Удалить',
                            handler: 'onDelete'
                        },
                        {
                            xtype: 'button',
                            text: 'Переименовать',
                            handler: 'onRename'
                        },
                        {
                            xtype: 'button',
                            text: 'Новая папка',
                            handler: 'onNewFolder'
                        }
                        
                    ]            
                },
                {
                    xtype: 'grid',
                    width: 800,
                    height: 500,
                    store: dataStore,
                    selModel: 'cellmodel',
                    id: 'filesGrid',
                   
                    columns: [
                        { xtype: 'rownumberer'},
                    
                        {
                            text: 'Имя',
                            dataIndex: 'filename'
                        },
                        {
                            text: 'Расширение',
                            dataIndex: 'extension',
                            flex: 2
                        },
                        {
                            text: 'Размер',
                            dataIndex: 'size'
                        },
                        {
                            text: 'Дата создания',
                            dataIndex: 'timestamp',
                            flex: 2
                        },
                        {
                            text: 'Путь',
                            dataIndex: 'path',
                            flex: 2
                        },
                    ],
                    listeners: {
                        dblclick: {
                            element: 'element',
                            fn: 'onOpenFolder'
                        },

                    },
                }
            ]
        },
    ]
});