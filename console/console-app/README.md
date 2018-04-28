# console-app

> Console App Plugin

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## About

This plugin is a small assets that the developer includes in their web application to connect and enable nodular console application features. 

This assets will expose a cross framework API for implementers to integrate with to enable certain functions, like:

* Authentication (User, security authorisation, etc)
* Server Event communication (Functions) (alerts & notification, instant messaging, emails, etc)
* Listeners (e.g when a notification is clicked)
* Context (functions and listeners work within the current applications context)
* Application Menu (will allows the user to pull a menu to change current running application, proxy server switch)