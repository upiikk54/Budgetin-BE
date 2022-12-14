function addLeadingZeros(n) {
    if (n <= 9) {
        return "0" + n;
    }
    return n
};

const expiredTimeOTP = () => {
    const currentDatetime = new Date()
    const formattedDate = currentDatetime.getFullYear() + "-" + addLeadingZeros(currentDatetime.getMonth() + 1) + "-" + addLeadingZeros(currentDatetime.getDate()) + " " + addLeadingZeros(currentDatetime.getHours()) + ":" + addLeadingZeros(currentDatetime.getMinutes() + 4) + ":" + addLeadingZeros(currentDatetime.getSeconds())
    
    return formattedDate;
};

module.exports = { expiredTimeOTP };