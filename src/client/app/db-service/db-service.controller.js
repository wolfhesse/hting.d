/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
(function () {
    'use strict';

    // todo: migrate vars to const ES6
    var INTERVAL_MSG = 600;
    var INTERVAL_BEARS = 15750;
    var INTERVAL_PEOPLE = 16500;
    var LIMIT_BEARS = 15;

    angular
        .module('app.db-service')
        .controller('DbServiceController', DbServiceController);

    DbServiceController.$inject = ['$q', '$interval', '$rootScope', '$state',
        '$timeout', 'dataservice', 'logger'
    ];

    /* @ngInject */
    function DbServiceController($q, $interval, $rootScope, $state, $timeout, dataservice, logger) {
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
        vm.bearStatus = 'initializing...';

        activate();

        function deactivate(){
            logger.info('Deactivated DbService View');
        }

        function activate() {

            var promises = [getMessageCount(), getPeople(), getBearsCount()];
            return $q.all(promises).then(function () {
                logger.info('Activated DbService View');
                //                logger.info('selbstgemachtes hier...');
                // logger.info("bears loaded " + vm.bearsLoaded);

                if (null == $state.timeout) {
                    $state.timeout = $timeout(function () {
                        vm.news.description = 'ts:' + new Date();
                        vm.news.date = Date();
                        logger.info('timeout! : ' + vm.news.description);
                        //                    logger.info(JSON.stringify($state));
                        //                    logger.info(JSON.stringify($rootScope));
                        //                        logger.info($rootScope.intervalMessageCount.count);
                        //                        logger.info($state.timeout.count);
                    }, 12500);
                    logger.info('new timeout arrangement');
                }

                if (null == $state.intervalMessageCount) {
                    $state.intervalMessageCount = $interval(function () {
                        //                    logger.info('interval!');
                        var msgSaved = vm.busyMessage;
                        vm.busyMessage = 'busy...';
                        vm.messageCount++;
                        vm.news.date = Date();

                        vm.busyMessage = msgSaved;
                    }, INTERVAL_MSG);
                }

                if (null == $state.intervalBears) {
                    logger.info('new interval bears arrangement');
                    $state.intervalBears = $interval(function () {
                        $q.when(getBearsCount()).then(function () {
                            logger.success('got bears: ' + vm.bearsLoaded);
                        });
                    }, INTERVAL_BEARS);
                }

                if (null == $state.intervalPeople) {
                    logger.info('new interval people arrangement');
                    $state.intervalPeople = $interval(function () {
                        $q.when(getPeople()).then(function () {
                            logger.success('got people: ' + vm.people.length);
                        });
                    }, INTERVAL_PEOPLE);
                }
            });

        }

        function getBearsCount() {
            return dataservice.getBears().then(function (data) {
                logger.log('bears api should have been touched..');
                var bearsResponseBuffer = [];
                // vm.bears = [];
                var limitBears = Math.min(LIMIT_BEARS, data.length);
                for (var bx = 0; bx < limitBears; bx++) {
                    bearsResponseBuffer.push(data[bx]);
                    bearsResponseBuffer[bx]['loadTs'] = Date();
                }
                vm.bearsLoaded = data.length;
                vm.bearStatus = 'loaded ' + vm.bearsLoaded + ' bears @ ' + vm.news.date;
                vm.bears = bearsResponseBuffer;
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
