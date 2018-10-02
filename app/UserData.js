Ext.define('MyApp.UserData', {
    singleton: true,

    currentPath: '', // current folder
    //currentFile: '',
    selectedStore: 'local', // local OR S3

    setSelectedStore: function(storeName) {
        if(storeName !== 'local' && storeName !== 'S3')
            throw ('Undefined store name. Correctly local or S3');

        this.selectedStore = storeName;
    }




});