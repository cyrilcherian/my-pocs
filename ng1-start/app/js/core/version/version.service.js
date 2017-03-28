'use strict';

angular.
module('core.version').
factory('Version', ['$http', '$resource',
    function($http, $resource) {
        return ({
            versionGet: versionGet
        });

        function versionGet() {
            return "1.0.0";
        }
    }
]);
