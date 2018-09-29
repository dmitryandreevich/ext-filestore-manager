Ext.define('MyApp.view.main.MainModel', {
    extend: 'Ext.data.Model',
    alias: 'FileDataModel',
    
    fields:[
        { name: 'dirname', type: 'string' },
        { name: 'extension', type: 'string', convert: ( v, r ) => {
            return r.data.type === 'dir' ? 'Папка' : v;
        } },
        { name: 'filename', type: 'string' },
        { name: 'size', type: 'int', convert: (v, r) => {
            return r.data.type !== 'dir' ? Math.round( v / 1024) + ' kb' : '-';
        }},
        { name: 'timestamp', type: 'int', convert: (v, r) => { return Ext.Date.format( new Date(v * 1000), 'Y-m-d H:i:s'); } },
        { name: 'type', type: 'string' },
    ]

})