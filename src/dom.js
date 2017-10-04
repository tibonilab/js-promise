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
