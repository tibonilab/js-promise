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
