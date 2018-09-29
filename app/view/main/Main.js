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
                            iconCls  : 'fa fa-backward',
                            handler: 'onBackFolder',
                        },
                        {
                            xtype: 'button',
                            iconCls  : 'x-fa fa-refresh',
                            handler: 'onRefreshList',
                        },
                        {
                            xtype: 'button',
                            iconCls: 'fa fa-download',
                            handler: 'onDownloadFile'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'fa fa-trash',
                            handler: 'onDelete'
                        },
                        {
                            xtype: 'button',
                            text: ' + ',
                            iconCls: 'fa fa-folder',
                            handler: 'onNewFolder'
                        },
                        {
                            xtype: 'button',
                            text: ' + ',
                            iconCls: 'fa fa-file',
                            handler: 'onCreateFile'
                        },
                        {
                            xtype: 'button',
                            text: 'Открыть',
                            handler: 'onOpenFolder',
                        },
                        
                        
                        {
                            xtype: 'button',
                            text: 'Переименовать',
                            
                            handler: 'onRename'
                        },
                        
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
                            text: 'Деqствия',
                            dataIndex: 'actions',
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