module.exports = {
    localDir: 'dist',
 
    // It decides the root path to upload to. 
    remoteDir: 'dist',
 
    // It decides the root accessible path. 
    rootAllowed: '/',
 
    host: '127.0.0.1',
    port: 8345,
    pattern: '**',
    pollingInterval: 500,
 
    // If it is set, transfer data will be encrypted with the algorithm. 
    password: null,
    algorithm: 'aes128',
 
    onChange: function (type, path, oldPath) {
        // It can also return a promise. 
        console.log('Write your custom code here')
    }
}