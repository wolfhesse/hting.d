/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
(function () {
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
            description: 'Hot Towel Angular is a SPA template for Angular developers.',
            date: Date()
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Dashboard (r)';
        vm.bears = [];

        activate();

        function activate() {

            var promises = [getMessageCount(), getPeople(), getBearsCount()];
            return $q.all(promises).then(function () {
                logger.info('Activated Dashboard View');
                //                logger.info('selbstgemachtes hier...');
                logger.info("bears count is set to " + vm.bears.length);

                if (null == $state.timeout) {
                    $state.timeout = $timeout(function () {
                        vm.news.description = 'ts:' + new Date();
                        vm.news.date = Date();
                        logger.info('timeout! : ' + vm.news.description);
                        //                    logger.info(JSON.stringify($state));
                        //                    logger.info(JSON.stringify($rootScope));
                        //                        logger.info($rootScope.intervalMessageCount.count);
                        //                        logger.info($state.timeout.count);
                    }, 1500);
                    logger.info('new timeout arrangement');
                }

                if (null == $rootScope.intervalMessageCount) {
                    $rootScope.intervalMessageCount = $interval(function () {
                        //                    logger.info('interval!');
                        var msg_saved = vm.busyMessage;
                        vm.busyMessage = "busy...";
                        vm.messageCount++;
                        vm.news.date = Date();

                        vm.busyMessage = msg_saved;
                    }, 450);
                }

                if (null == $state.intervalPeople) {
                    logger.info('new interval arrangement');
                    $state.intervalPeople = $interval(function () {
                        $q.when(getPeople()).then(function () {
                            logger.info('got people @ ' + Date());
                        });
                    }, 12500);
                }
            });

        }

        function getBearsCount() {
            vm.bears = [{ 'bear': { 'name': 'evo' } }];
            return vm.bears.length;
        }

        function getMessageCount() {
            return dataservice.getMessageCount().then(function (data) {
                vm.messageCount = data;
                return vm.messageCount;
            });
        }

        function getPeople() {
            return dataservice.getPeople().then(function (data) {
                vm.people = data;
                return vm.people;
            });
        }
    }
})();
