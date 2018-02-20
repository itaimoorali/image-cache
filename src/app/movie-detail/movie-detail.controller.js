imageCacheApp.controller('MovieDetailController', [
    '$scope',
    'MovieService',
    'ImageService',
    '$stateParams',
    function ($scope, MovieService, ImageService, $stateParams) {
        $scope.movie;
        MovieService.getMovieById($stateParams.movieId).then((movie) => {
            $scope.movie = movie;
            $scope.movie.cardImages.forEach((image) => {
                ImageService.getImage(image.url).then((src) => {
                    image.src = `${getImageBase64(image.url)} ${src}`;
                })
            });
            $scope.movie.keyArtImages.forEach((image) => {
                ImageService.getImage(image.url).then((src) => {
                    image.src = `${getImageBase64(image.url)} ${src}`;
                })
            });
        }).catch(err => {
            console.error(err);
        });
        function getImageBase64(url) {
            let lastIndex = url.lastIndexOf('.');
            return `data:image/${url.substr(lastIndex, url.length)};base64,`
        }
    },
]);
