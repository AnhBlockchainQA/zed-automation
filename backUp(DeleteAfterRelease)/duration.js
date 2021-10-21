var duration = [];
duration[0] = '1 Day';
duration[1] = '3 Days';
duration[2] = '7 Days';

var r_duration = duration[Math.floor(Math.random()*duration.length)].toString();

module.exports = r_duration;