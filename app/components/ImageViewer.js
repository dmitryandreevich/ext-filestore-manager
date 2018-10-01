Ext.define('MyApp.components.ImageViewer', {
    extend: 'Ext.window.Window',

    imageId: 'imageViewerImg',

    setSrcBase64: function(imgBase64){
        var img = Ext.getCmp('imageViewerImg');

        img.setSrc('data:image;base64,' + imgBase64);
    },
    
    width: 700,
    height: 500,
    closable: true,
    //html: "<img src='data:image;base64,"+ imageBase64 +"'>"

    items: [
        {
            xtype: 'img',
            src: 'data:image;base64,' + this.imageBase64,
            id: 'imageViewerImg',

            fullscreen: true
        },
    ],
    buttons: [
        {
            text: 'Закрыть',
            handler: () => { this.close(); }       
        }
    ]
});