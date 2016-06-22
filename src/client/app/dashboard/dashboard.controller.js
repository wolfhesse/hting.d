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
        vm.bearsLoaded = 0;
        vm.bearStatus = "initializing...";

        activate();

        function activate() {

            var promises = [getMessageCount(), getPeople(), getBearsCount()];
            return $q.all(promises).then(function () {
                logger.info('Activated Dashboard View');
                //                logger.info('selbstgemachtes hier...');
                logger.info("bears loaded " + vm.bearsLoaded);

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

                if (null == $state.intervalBears) {
                    logger.info('new interval bears arrangement');
                    $state.intervalBears = $interval(function () {
                        $q.when(getBearsCount()).then(function () {
                            logger.info('got bears: ' + vm.bearsLoaded);
                        });
                    }, 6500);
                }

                if (null == $state.intervalPeople) {
                    logger.info('new interval people arrangement');
                    $state.intervalPeople = $interval(function () {
                        $q.when(getPeople()).then(function () {
                            logger.info('got people: ' + vm.people.length);
                        });
                    }, 8500);
                }
            });

        }

        function getBearsCount() {
            vm.bears = dataservice.getBears().then(function (data) {
                logger.log("bears api should have been touched..");
                vm.bears = [];
                var limitBears = Math.min(15, data.length);
                for (var bx = 0; bx < limitBears; bx++) {
                    vm.bears[bx] = data[bx];
                }
                // old version: vm.bears = data;
                vm.bearsLoaded = data.length;
                vm.bearStatus = "loaded " + vm.bearsLoaded + " bears @ " + vm.news.date;
                return vm.bears.length;
            });
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
