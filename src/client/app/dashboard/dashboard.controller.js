/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', '$interval', '$rootScope', '$state',
        '$timeout', 'dataservice', 'logger'
    ];
    /* @ngInject */
    function DashboardController($q, $interval, $rootScope, $state, $timeout, dataservice, logger) {
        var vm = this;
        vm.news = {
            title: 'helloWorld',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Dashboard (r)';

        activate();

        function activate() {
            var promises = [getMessageCount(), getPeople()];
            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
                logger.info('selbstgemachtes hier...');

                vm.timeout = $timeout(function() {
                    vm.news.description = 'ts:' + new Date();
                    logger.info('timeout! : ' + vm.news.description);
                    //                    logger.info(JSON.stringify($state));
                    //                    logger.info(JSON.stringify($rootScope));
                    logger.info($rootScope.intervalMessageCount.count);
                    logger.info($state.intervalPeople.count);
                }, 5000);

                $rootScope.intervalMessageCount = $interval(function() {
                    //                    logger.info('interval!');
                    vm.messageCount++;
                }, 150);

                $state.intervalPeople = $interval(function() {
                    $q.when(getPeople()).then(function() {
                        logger.info('got people.');
                    });
                }, 12500);
            });

        }

        function getMessageCount() {
            return dataservice.getMessageCount().then(function(data) {
                vm.messageCount = data;
                return vm.messageCount;
            });
        }

        function getPeople() {
            return dataservice.getPeople().then(function(data) {
                vm.people = data;
                return vm.people;
            });
        }
    }
})();
