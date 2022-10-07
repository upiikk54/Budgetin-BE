const otpGenerator = require('otp-generator');

const getNewOTP = () => {
    const getOTP =  otpGenerator.generate(4);

    return getOTP;
};

module.exports = { getNewOTP };

