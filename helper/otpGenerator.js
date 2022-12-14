const otpGenerator = require('otp-generator');

const generatedOTP = () => {

    const getNewOTP =  otpGenerator.generate(4, {upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false});

    return getNewOTP;

};

module.exports = { generatedOTP };

