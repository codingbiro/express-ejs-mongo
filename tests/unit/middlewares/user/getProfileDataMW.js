const expect = require('chai').expect;
const getProfileDataMW = require('../../../../middlewares/user/getProfileDataMW');

describe('getProfileData middleware', function () {
    it('should return userdata', function (done) {
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
});

describe('getProfileData middleware with db error', function () {
    it('should fail with dberror', function (done) {
        const mw = getProfileDataMW({
            userModel: {
                findOne: (param1, cb) => {
                    expect(param1).to.be.eql({ email: 'asd@gmail.com' });
                    cb('dberror', 'mockuser');
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
                expect(err).to.be.eql('dberror');
                done();
            });
    });
});