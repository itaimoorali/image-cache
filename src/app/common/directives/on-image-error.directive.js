imageCacheApp.directive('onErrorSrc', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('error', function() {
                element.remove()
            });
        }
    }
});
