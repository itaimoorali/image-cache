function movieService($http, CacheFactory, $q, config){
    let movies = [];
    let movieCache = CacheFactory.get('movies');
    if(!movieCache) {
        movieCache = CacheFactory.createCache('movies', {
            deleteOnExpire: 'aggressive',
            recycleFreq: 2 * 60 * 1000,
            capacity: 10,
        })
    }
    function getMovies () {
        const defered = $q.defer();
        if(movies.length) {
            return Promise.resolve(movies);
        }
        const cachedMovies = movieCache.get('moviesJson');
        if(cachedMovies) {
            movies = cachedMovies;
            return Promise.resolve(cachedMovies);
        }
        $http
            .get(config.moviesUrl)
            .then(({data}) => {
                movies = data;
                movieCache.put('moviesJson', data);
                return defered.resolve(data);
            })
            .catch((err) => {
                return defered.reject(err);
            });
        return defered.promise;
    }

    function getMovieById(id) {
        const defered = $q.defer();
        let promise;
        if(!movies.length) {
            promise = getMovies();
        } else {
            promise = Promise.resolve();
        }
        promise
            .then(() => defered.resolve(_.find(movies, m => m.id === id)))
            .catch((err) => defered.reject(err));
        return defered.promise;
    }
    return {
        getMovies,
        getMovieById,
    }
}
imageCacheApp.service('MovieService', [
    '$http',
    'CacheFactory',
    '$q',
    'config',
    '$sce',
    movieService,
]);