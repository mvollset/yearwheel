/*global moment*/
function isLeapYear(year){
    return moment([year]).isLeapYear();
}
const curyear = new Date().getFullYear();
const moment0 = moment(curyear + "-01-01"); //1. of Janary this year
function toThisYearsDate(dateId){
			let mom = moment(moment0);
			mom.add(dateId,'days');
			return mom;
		}
		function formatDate(dateid){
			let dd = toThisYearsDate(dateid);
			return moment(dd).format("DD.MM");
		}
function getMonthData(year){
    const yy=year?year:new Date().getFullYear();
    const durations = getMonthDurations(yy);
    let monthData=[];
    let start = 0;
    for(let i =0;i<12;i++){
        monthData.push({
            month:moment.months(i),
            startDateID:start,
            endDateID:(start + durations[i])-1
        });
        start+=durations[i];
    }
    return monthData;
		
}
function getMonthDurations(year){
    
    return [31, //Januar
            isLeapYear(year)?29:28, //Februar
            31, //Mars
            30, //April
            31, //Mai
            30, //Juni
            31, //Juli
            31, //August
            30, //September
            31, //Oktober
            30, //November
            31];
}