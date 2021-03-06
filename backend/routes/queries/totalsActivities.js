const moment = require('moment');
const isEmpty = require('../../validation/isEmpty');
const calcPace = (dist, time) => {
  const splitedTime = time.split(':');
  const distance = parseFloat(dist);
  const hrs = splitedTime.length === 3 ? parseFloat(splitedTime[0]) : 0;
  const mins = parseFloat(
    splitedTime.length === 3 ? splitedTime[1] : splitedTime[0]
  );
  const secs = parseFloat(
    splitedTime.length === 3 ? splitedTime[2] : splitedTime[1]
  );
  const timeElapsed = hrs * 60 * 60 + mins * 60 + secs;
  let paceMins = Math.floor(Math.floor(timeElapsed / distance) / 60);
  let paceSecs = Math.floor(timeElapsed / distance) - paceMins * 60;
  return paceMins + ':' + paceSecs;
};
const calculatedTotals = runs => {
  const calcTotalKM = (arrOfObj, prop) =>
    arrOfObj
      .reduce((acc, obj) => parseFloat(acc) + parseFloat(obj[prop]), 0)
      .toFixed(2);
  const calcTotalTime = (arrOfObj, prop) => {
    const time = arrOfObj.reduce(
      (acc, obj) => acc.add(moment.duration(obj[prop])),
      moment.duration()
    );
    return [Math.floor(time.asHours()), time.minutes(), time.seconds()].join(
      ':'
    );
  };
  const calcTotalRun = (arrOfObj, prop1, prop2) =>
    arrOfObj.reduce(
      (acc, obj) =>
        isEmpty(obj[prop1]) && isEmpty(obj[prop2]) ? (acc += 0) : (acc += 1),
      0
    );
  const calcAvgDistance = (totalKM, totalRun) =>
    (totalKM / totalRun).toFixed(2);

  // const calcTotalPace = (dist, time) => {
  //   const splitedTime = time.split(':');
  //   const distance = parseFloat(dist);
  //   const hrs = splitedTime.length === 3 ? parseFloat(splitedTime[0]) : 0;
  //   const mins = parseFloat(
  //     splitedTime.length === 3 ? splitedTime[1] : splitedTime[0]
  //   );
  //   const secs = parseFloat(
  //     splitedTime.length === 3 ? splitedTime[2] : splitedTime[1]
  //   );
  //   const timeElapsed = hrs * 60 * 60 + mins * 60 + secs;
  //   let paceMins = Math.floor(Math.floor(timeElapsed / distance) / 60);
  //   let paceSecs = Math.floor(timeElapsed / distance) - paceMins * 60;
  //   return paceMins + ':' + paceSecs;
  // };

  const totalsRun = {};
  totalsRun.totalKM = calcTotalKM(runs, 'distance');
  totalsRun.totalTime = calcTotalTime(runs, 'time');
  totalsRun.totalRun = calcTotalRun(runs, 'distance', 'time');
  totalsRun.avgDistance = calcAvgDistance(
    totalsRun.totalKM,
    totalsRun.totalRun
  );
  totalsRun.avgPace = calcPace(totalsRun.totalKM, totalsRun.totalTime);
  return totalsRun;
};

module.exports = { calculatedTotals, calcPace };
