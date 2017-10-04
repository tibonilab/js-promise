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
