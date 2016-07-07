/* jshint -W117, -W030 */
describe('db-service routes', function () {
    describe('state', function () {
        var controller;
        var view = 'app/db-service/db-service.html';

        beforeEach(function() {
            module('app.db-service', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        bard.verifyNoOutstandingHttpRequests();

        it('should map state dashboard to url / ', function() {
            expect($state.href('db-service', {})).to.equal('/');
        });

        it('should map /dashboard route to dashboard View template', function () {
            expect($state.get('db-service').templateUrl).to.equal(view);
        });

        it('of dashboard should work with $state.go', function () {
            $state.go('db-service');
            $rootScope.$apply();
            expect($state.is('db-service'));
        });
    });
});
