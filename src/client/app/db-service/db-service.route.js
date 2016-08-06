(function() {
    'use strict';

    angular
        .module('app.db-service')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'db-service',
                config: {
                    url: '/',
                    templateUrl: 'app/db-service/db-service.html',
                    controller: 'DbServiceController',
                    controllerAs: 'vm',
                    title: 'db-service',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> DbService'
                    }
                }
            }
        ];
    }
})();
