var clone = require('git-clone');

clone('https://github.com/fortitudecloud/grapple-base.git', 'cloned', {}, (e) => {
    console.log('Cloned Repo!');
});