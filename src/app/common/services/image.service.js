function imageService($http, CacheFactory, $q, config){
    let imageCache = CacheFactory.get('images');
    if(!imageCache) {
        imageCache = CacheFactory.createCache('images', {
            deleteOnExpire: 'aggressive',
            recycleFreq: 60 * 60 * 1000,
            capacity: 20,
        })
    }
    function getImage (url) {
        let image = imageCache.get(url)
        if(image) {
            return Promise.resolve(image)
        }

        return $http.get(url, {responseType: 'arraybuffer'})
            .then(({data}) => {
                const base64 = _arrayBufferToBase64(data);
                imageCache.put(url, base64);
                return base64;
            }, (err) => {
                if(err.statusCode === 404) {
                    return {}
                }
                return err;
            })
    }

    function _arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    return {
        getImage,
    };
}
imageCacheApp.service('ImageService', [
    '$http',
    'CacheFactory',
    '$q',
    'config',
    imageService,
]);