var proxy = require('express-http-proxy');
var app = require('express')();
var path = require('path');

var activeApp = { app: 'vue', route: '/vue', proxy: 'localhost:8080' };

app.get('/home', (req, res) => {    
    var file = path.resolve(__dirname + '/index.html');
    res.sendFile(file);    
})

app.use('/vue/*', proxy('localhost:8080', {
    forwardPath: function (req, res) {   
        activeApp = { app: 'vue', route: '/vue', proxy: 'localhost:8080' };
        return req.params[0] || req.url;
    }
}))

app.use('/ng/*', proxy('localhost:5000', {
    forwardPath: function (req, res) {   
        activeApp = { app: 'ng', route: '/ng', proxy: 'localhost:5000' };
        return req.params[0] || req.url;
    }
}))

function selectProxyHost() {
    return activeApp.proxy;
}

app.use('/', proxy(selectProxyHost, {
    forwardPath: function (req, res) {        
        return req.url;
    }
}))


app.listen(3000, () => console.log('Example app listening on port 3000!'))