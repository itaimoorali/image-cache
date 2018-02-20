imageCacheApp.directive('onErrorSrc', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('error', function() {
                element.remove()
            });
        }
    }
});
