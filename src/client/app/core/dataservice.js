(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'logger'];
    /* @ngInject */
    function dataservice($http, $q, logger) {
        var service = {
            getPeople: getPeople,
            getMessageCount: getMessageCount,
            getBears: getBears
        };

        return service;

        function getMessageCount() { return $q.when(75); }

        function getPeople() {
            return $http.get('/api/people')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                var msg = 'query for people failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }

        function getBears() {
            return $http.get("//bearsapi.wolfspool.chickenkiller.com/api/bears").then(success).catch(fail);
            function success(response) { return response.data; }
            function fail(error) {
                var msg = 'query for bears failed. ' + error.data.description;
                logger.error(msg);
                return $q.reject(msg);
            }
        }
    }
})();
