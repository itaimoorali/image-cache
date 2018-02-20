var imageCacheApp = angular.module('imageCacheApp', [
    'ui.router',
    'angular-cache',
]);
const appConstants = {
    moviesUrl: '/api/movies'
};
imageCacheApp.config(function (
    $stateProvider,
    $locationProvider,
    $urlRouterProvider,
) {
    $locationProvider.html5Mode(true);
    $stateProvider
        .state('list', {
            url: '/movies-list',
            controller: 'MoviesListController',
            templateUrl: '/app/movies-list/movies-list.html',
        })
        .state('detail', {
            url: '/movie/:movieId/detail',
            controller: 'MovieDetailController',
            templateUrl: '/app/movie-detail/movie-detail.html',
        });
    $urlRouterProvider.otherwise("/movies-list");

})
    .run()
    .constant('config', appConstants);
