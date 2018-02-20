imageCacheApp.controller('MoviesListController', [
    '$scope',
    'MovieService',
    function ($scope, MovieService) {
        $scope.movies;
        MovieService.getMovies().then((movies) => {
            $scope.movies = movies;
        })
    },
]);