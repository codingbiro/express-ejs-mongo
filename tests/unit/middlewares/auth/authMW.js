const expect = require('chai').expect;
const authMW = require('../../../../middlewares/auth/authMW');

describe('auth middleware', function () {
    it('should call next when user is logged in', function (done) {
        const mw = authMW({});

        let reqMock = {
            session: {
                isLoggedIn: true
            }
        };

        let resMock = {};

        mw(reqMock, resMock, (err) => {
            expect(err).to.be.eql(undefined);
            done();
        });
    });
    it('should redirect to login when user is not logged in', function (done) {
        const mw = authMW({});

        let reqMock = {
            session: {}
        };

        let resMock = {
            redirect: function (to) {
                expect(to).to.eql('/login');
                done();
            }
        };

        mw(reqMock, resMock, () => {
            done();
        });
    });
    it('should send flash error message when user is not logged in', function (done) {
        const mw = authMW({});

        let reqMock = {
            session: {}
        };

        let resMock = {
            redirect: () => {
                expect(typeof reqMock.session.sessionFlash).not.to.be.eql('undefined');
                expect(reqMock.session.sessionFlash).to.be.eql({ type: 'danger', message: 'Log in to view content.' });
                done();
            }
        };

        mw(reqMock, resMock, () => { });
    });
});