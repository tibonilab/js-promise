const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const get = function(url) {
    return new Promise(function(resolve, reject) {

        // init http request object
        const request = new XMLHttpRequest();

        // set open url with GET mehtod
        request.open('GET', url);

        // load event
        request.onload = function() {
            if (request.status == 200) {
                resolve(request.responseText);
            } else {
                reject(Error(request.statusText));
            }
        }

        // error event
        request.onerror = function() {
            reject(Error('network error'));
        }

        // send http request
        request.send();
    });
}

// chain of promises
const storyUrl = `http://www.tibonilab.com/story.json`;

const getJSON = function(url) {
    return get(url)
        .then(JSON.parse)
        .catch(function (err){
            throw Error(err)
        });
}

const readChapter = function(chapter) {
    console.log('\n' + chapter.content);
}

let sequence = Promise.resolve();

getJSON(storyUrl).then(function(story) {
    console.log('loading data...');

    story.chapterUrls.forEach(function(chapterUrl) {
        sequence = sequence
            .then(function(chpaterUrl) {
                return getJSON(chapterUrl)
            })
            .then(readChapter);
    })

    sequence.then(function () {
        console.log('\n', 'all done!');
    });
})
