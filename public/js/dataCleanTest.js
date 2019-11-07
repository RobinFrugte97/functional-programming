import { csv } from 'd3';

let splitData = enqueteData.split("; ")

csv("https://gist.github.com/RobinFrugte97/a5e17cb2420bb1a671ff3912fb1d8cda")
    .then(function (data) {
        console.log(data);
    });