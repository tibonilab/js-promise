const wrapper = document.getElementById('story');

const removeLoadingChapter = function(index) {
    const loading = document.getElementById(`loading_${index}`);
    wrapper.removeChild(loading);
}

const addLoadingChapter = function(index) {
    const loading = document.createElement('div');
    loading.id = `loading_${index}`;
    loading.innerHTML = 'LOADING...';
    wrapper.appendChild(loading);
}

const addChapeter = function(data, index) {
    const chapter = document.createElement('div');
    chapter.id = `chapter_${index}`;
    chapter.appendChild(document.createTextNode(data.content));
    wrapper.appendChild(chapter);
}

const outputChapter = function(chapter, index) {
    removeLoadingChapter(index);
    addChapeter(chapter, index);
}

const get = function(url) {
    return new Promise(function(resolve, reject) {

        // init http request object
        const xhr = new XMLHttpRequest();

        xhr.open('GET', url);

        // load event
        xhr.onload = function() {
            if (xhr.status == 200) {
                resolve(xhr.responseText);
            } else {
                reject(Error(xhr.statusText));
            }
        }

        // error event
        xhr.onerror = function(err) {
            reject(console.log(err));
        }

        // send http request
        xhr.send();
    });
}

const storyUrl = `http://localhost:8080/data/story.json`;

const getJSON = function(url) {
    return get(url)
        .then(JSON.parse)
        .catch(function (err){
            throw Error(err)
        });
}

const start = function () {
    wrapper.innerHTML = '';

    let sequence = Promise.resolve();

    getJSON(storyUrl).then(function(story) {
        story.chapterUrls.forEach(function(chapterUrl, index) {
            sequence = sequence
                .then(function() {
                    addLoadingChapter(index);
                    // simulate 2 seconds loading
                    return new Promise(function(resolve, reject) {
                        setTimeout(function () {
                            resolve(chapterUrl);
                        },2000)
                    })
                })
                .then(getJSON)
                .then(function (chapter) {
                    outputChapter(chapter, index)
                });
        });

        sequence.then(function () {
            console.log('all data loaded!');
        });
    });
}
