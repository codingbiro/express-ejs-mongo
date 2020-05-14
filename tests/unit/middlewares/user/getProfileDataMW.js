const expect = require('chai').expect;
const getProfileDataMW = require('../../../../middlewares/user/getProfileDataMW');

describe('getProfileData middleware', function () {
    it('should return userData', function (done) {
        const mw = getProfileDataMW({
            userModel: {
                findOne: (param1, cb) => {
                    expect(param1).to.be.eql({ email: 'asd@gmail.com' });
                    cb(null, 'mockuser');
                }
            }
        });

        let resMock = {
            locals: {
                isLoggedIn: true
            }
        };

        mw({
            session: {
                userMail: 'asd@gmail.com',
                isLoggedIn: true
            }
        },
            resMock, (err) => {
                expect(err).to.be.eql(undefined);
                expect(resMock.locals).to.be.eql({ user: 'mockuser', isLoggedIn: true });
                done();
            });
    });
    it('should return error when dbError', function (done) {
        const mw = getProfileDataMW({
            userModel: {
                findOne: (param1, cb) => {
                    cb('dberror', 'mockuser');
                }
            }
        });

        mw({ session: {} }, {}, (err) => {
            expect(err).to.be.eql('dberror');
            done();
        });
    });
    it('should send flash error message when dbError', function (done) {
        const mw = getProfileDataMW({
            userModel: {
                findOne: (param1, cb) => {
                    cb('dberror', 'mockuser');
                }
            }
        });

        let reqMock = {
            session: {}
        };

        mw(reqMock, {}, () => {
            expect(typeof reqMock.session.sessionFlash).not.to.be.eql('undefined');
            expect(reqMock.session.sessionFlash).to.be.eql({ type: 'danger', message: 'DB error.', });
            done();
        });
    });
});