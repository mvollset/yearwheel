var monthData = getMonthData();
////////////////////////////////////////////////////////////
//////////////////////// Set-up ////////////////////////////
////////////////////////////////////////////////////////////
let radix;
const numdaysInHalfYear = (365 + (isLeapYear(curyear) ? 1 : 0)) / 2;
const gtodayradians = Math.PI / numdaysInHalfYear;
const gtoradians = gtodayradians// Math.PI / 180;

//function setUp() {
var screenWidth = Math.min(window.innerWidth, window.innerHeight);
var xoffset = 0;
if (window.innerWidth > window.innerHeight) {
    xoffset = ((window.innerWidth - window.innerHeight) / 2) - 320;
}

var margin = {
    left: 30,
    top: 130,
    right: 30,
    bottom: 30
},
    width = Math.min(screenWidth) - margin.left - margin.right,
    height = Math.min(screenWidth) - margin.top - margin.bottom;
radix = width * 0.7 / 2;


//}
function createArc(d) {
    //A regular expression that captures all in between the start of a string (denoted by ^) 
    //and the first capital letter L
    var firstArcSection = /(^.+?)L/;

    //The [1] gives back the expression between the () (thus not the L as well) 
    //which is exactly the arc statement
    let newArc;
    if (typeof d == 'string') {
        newArc = firstArcSection.exec(d)[1];
    }
    else
        newArc = firstArcSection.exec(d3.select(d).attr("d"))[1];
    //Replace all the comma's so that IE can handle it -_-
    //The g after the / is a modifier that "find all matches rather than stopping after the first match"
    return newArc.replace(/,/g, " ");
}
// Returns a tween for a transition’s "d" attribute, transitioning any selected
// arcs from their current angle to the specified new angle.
function arcTween(datum) {
    //let newArc = activityArc(d);
    this._angles;
    const newStartAngle = datum.startDateID * gtoradians;
    const newEndAngle = datum.endDateID * gtoradians;
    const level = datum.level;
    const arcer = d3.arc()
        .innerRadius(function (d) {
            return radix + (level * 30 + 35)
        })
        .outerRadius(function (d) {
            return radix + (level * 30 + 60)
        })
    const interpolate = d3.interpolate(this._angles.endAngle, newEndAngle);
    const interpolateStart = d3.interpolate(this._angles.startAngle, newStartAngle);
    return i = (t) => {
        return arcer({
            startAngle: interpolateStart(t),
            endAngle: interpolate(t)
        })
    };
}
function hiddenArcTween(datum) {
    //let newArc = activityArc(d);
    this._angles;
    const newStartAngle = datum.startDateID * gtoradians;
    const newEndAngle = datum.endDateID * gtoradians;
    const level = datum.level;
    const arcer = d3.arc()
        .innerRadius(function (d) {
            return radix + (level * 30 + 35)
        })
        .outerRadius(function (d) {
            return radix + (level * 30 + 60)
        })
    const interpolate = d3.interpolate(this._angles.endAngle, newEndAngle);
    const interpolateStart = d3.interpolate(this._angles.startAngle, newStartAngle);
    return i = (t) => {
        let arc = arcer({
            startAngle: interpolateStart(t),
            endAngle: interpolate(t)
        });
        return createArc(arc);
    };
}
function createMonthTextPath(d, i) {
    const newArc = createArc(this);
    svg.append("path")
        .attr("class", "hiddenDonutArcs")
        .attr("id", "donutArc" + i)
        .attr("d", newArc)
        .style("fill", "none");

}
function drawMonths() {
    let monthGroup = svg.append("g").attr('id', "monthsetup");
    drawMonthArcs(monthGroup);
    addMonthText(monthGroup);


}
function drawMonthArcs(svg) {
    //Creates a function that makes SVG paths in the shape of arcs with the specified inner and outer radius 
    //Months
    let arc = d3.arc()
        .innerRadius(radix)
        .outerRadius(radix + 30);

    //Creates function that will turn the month data into start and end angles
    let pie = d3.pie()
        .value(function (d) {
            return d.endDateID - d.startDateID;
        })
        .padAngle(.01)
        .sort(null);

    ////////////////////////////////////////////////////////////
    //////////////////// Create the Slices /////////////////////
    ////////////////////////////////////////////////////////////

    //Draw the arcs themselves
    svg.selectAll(".monthArc")
        .data(pie(monthData))
        .enter().append("path")
        .attr("class", "monthArc")
        .attr("id", function (d, i) {
            return "monthArc_" + i;
        })
        .attr("d", arc)
        .each(function (d, i) {
            const newArc = createArc(this);
            svg.append("path")
                .attr("class", "hiddenDonutArcs")
                .attr("id", "donutArc" + i)
                .attr("d", newArc)
                .style("fill", "none");
        });
}
function addMonthText(svg) {
    //Append the month names within the arcs
    svg.selectAll(".monthText")
        .data(monthData)
        .enter().append("text")
        .attr("class", "monthText")
        //.attr("x", 14) //Move the text from the start angle of the arc
        .attr("dy", 19) //Move the text down
        .append("textPath")
        .attr("startOffset", "50%")
        .style("text-anchor", "middle")
        .attr("xlink:href", function (d, i) {
            return "#donutArc" + i;
        })
        .text(function (d) {
            return d.month.toUpperCase();
        });
}
//setUp();

//Add a circular path to animate days....

////////////////////////////////////////////////////////////
//////////////////// Scales & Data /////////////////////////
////////////////////////////////////////////////////////////

//The start date number and end date number of the months in a year


const eventKeyfn = function (d) {
    return keyFn(d);
}
const activityKeyfn = function (d) {
    return keyFn(d);
}
const keyFn = function (d) {
    if (!d)
        return null;
    return d._id ? d._id : `${d.name}@${d.startDateID}`;
}
function doActivities(acts) {

    const retval = drawActivityArcs(acts);
	/*const acttext = drawInlineActivityText(acts.filter(function (d) { return hasRoomForText(d) }));
	drawActivityPins(acts.filter(function (d) { return !hasRoomForText(d) }));
	drawActivityText(acts.filter(function (d) { return !hasRoomForText(d) }));*/
    return acts;
}
function drawInlineActivityText(activities) {
    return activities.append("text")
        .attr("class", "activityText")
        //.attr("x", 14) //Move the text from the start angle of the arc
        .attr("dy", 18) //Move the text down
        .append("textPath")
        .attr("startOffset", "50%")
        .style("text-anchor", "middle")
        .attr("xlink:href", function (d, i) {
            return "#activityArc" + d._id; //Use reference on generated arc!
        })
        .text(function (d) {
            return d.name.toUpperCase();
        });
}
function drawActivityArcs(activities) {
    var p = activities.append("path")
        .attr("class", function (d, i) {
            return "arcer level" + d.level
        })
        .attr("d", activityArc)
        .each(d => {
            this._angles = {
                startAngle: d.startDateID * gtoradians,
                endAngle: d.endDateID * gtoradians
            }
        });
    activities.append('path')
        .attr("class", "hiddenDonutArcs")
        .attr("id", (d) => ("activityArc" + d._id)) //Keep reference on generated arc!
        .style("fill", "none")
        .attr("d", (d) => {
            let ds = activityArc(d);
            return createArc(ds);
        });

    /*activities.append("path")
        .attr("class", "hiddenDonutArcs")
        .attr("id", (d)=>"activityArc" + d._i) //Keep reference on generated arc!
        .attr("d", createArc(activityArc))
        .style("fill", "none");	*/
    return p;
}
let counter = 0;
function hasRoomForText(activity) {
    let n = activity.name.length;
    let d = activity.endDateID - activity.startDateID;
    return (d > (n * 1.5));
}
let svg;
function renderActivities(activities) {
    if (!svg) {
        svg = d3.select("#chart").append("svg").attr('id', "thewheel")
            .attr("width", (width + margin.left + margin.right))
            .attr("height", (height + margin.top + margin.bottom))
            .attr("style", "margin-left:" + xoffset + "px;")
            .append("g").attr("class", "wrapper")
            .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")")
        drawMonths();
    }
    const t = svg.transition()
        .duration(750);
    svg.selectAll(".dimmy")
        .data(activities, d => d._id)
        .join(
            enter => {
                let gr = enter.append('g').attr('class', 'dimmy');
                drawActivityArcs(gr);
                drawInlineActivityText(gr.filter(function (d) { return hasRoomForText(d) }));
                drawActivityPins(gr.filter(function (d) { return !hasRoomForText(d) }));
                drawActivityText(gr.filter(function (d) { return !hasRoomForText(d) }));
                return gr;
            }
            ,
            update => {
                update.select('.arcer')
                    .attr("class", function (d, i) {
                        return "arcer level" + d.level
                    })
                    .call(update => update.transition()
                        .duration(750)
                        .attrTween("d", (d, i) => arcTween(d)));
                update.select('.arcer')
                    .attr("class", function (d, i) {
                        return "arcer level" + d.level
                    })
                    .call(update => update.transition()
                        .duration(750)
                        .attrTween("d", (d, i) => arcTween(d)));
                update.select('.hiddenDonutArcs')
                    .call(update => update.transition()
                        .duration(750)
                        .attrTween("d", (d, i) => {
                            return hiddenArcTween(d);
                        }
                        ))
                update.select('.activityText').remove();
                update.select('.link.activity').remove();
                update.select('.activitypin').remove();
                update.call(update => drawInlineActivityText(update.filter(function (d) { return hasRoomForText(d) })));
                setTimeout(() => {
                    update.call(update => drawActivityPins(update.filter(function (d) { return !hasRoomForText(d) })));
                    update.call(update => drawActivityText(update.filter(function (d) { return !hasRoomForText(d) })));
                }, 750)

                return update;
            }
            ,
            exit => exit
                .call(exit => exit.transition(t)
                    .attr("y", 30)
                    .attr("cy", 30)
                    .remove())
        );
}
let activityArc =
    d3.arc()
        .innerRadius(function (d, i) {
            return radix + (d.level * 30 + 35)
        })
        .outerRadius(function (d, i) {
            return radix + (d.level * 30 + 60)
        })
        .startAngle(function (d, i) {
            return d.startDateID * gtoradians
        })
        .endAngle(function (d) {
            return d.endDateID * gtoradians
        });
function drawEventCircles(events) {
    drawPinMarkers(events, 0);
}
function drawEventPins(events) {
    events.append("path")
        .attr("d", function (d) {
            return getPinSvg(25, d.startDateID);
        })
        .attr("class", "link");
}
function drawPinMarkers(events, startOffset) {
    events.append("circle")
        .attr("r", 10)
        .style("fill", "#000")
        .style("opacity", ".4")
        .attr("cx", function (d) {
            return ((radix) + 15 + startOffset) * Math.sin(d.startDateID * gtoradians);
        })
        .attr("cy", function (d) {
            return -((radix) + 15 + startOffset) * Math.cos(d.startDateID * gtoradians);
        })
}
function drawActivityPins(activities) {
    //Same as event pins, but move starting point based on level.
    return activities.append("path")
        .attr("d", function (d) {
            return getPinSvg(d.level * 30 + 60, d.startDateID);
        })
        .attr("class", "link");
    //
}
function getPinSvg(startOffset, startDateID) {
    const x1 = (radix + (startOffset)) * Math.sin(startDateID * gtoradians);
    const y1 = -(radix + (startOffset)) * Math.cos(startDateID * gtoradians);
    const x2 = ((radix) + 130) * Math.sin(startDateID * gtoradians);
    const y2 = -((radix) + 130) * Math.cos(startDateID * gtoradians);
    return `M ${x1} ${y1} L ${x2} ${y2}`;
}
function drawPinText(events, textfn) {
    events.append("text")
        .attr("x", function (d) {
            return ((radix) + 135) * Math.sin(d.startDateID * gtoradians)
        })
        .attr("y", function (d) {
            return -((radix) + 135) * Math.cos(d.startDateID * gtoradians)
        })
        .style("text-anchor", function (d) {
            //When we pass 180 turn the text;
            return d.startDateID > 180 ? "end" : "start"
        })
        .text(function (d) {
            return textfn(d);
        });
}
function drawActivityText(events) {
    drawPinText(events, function (d) {
        return `${formatDate(d.startDateID)} - ${formatDate(d.endDateID)} ${d.name}`;
    });
}
function drawEventText(events) {
    drawPinText(events, function (d) {
        return `${formatDate(d.startDateID)} ${d.name}`;
    });
}
function doEvents(events) {
    drawEventCircles(events);
    drawEventPins(events);
    drawEventText(events);
}
function renderEvents(eventData) {
    var events = svg.selectAll('.circle')
        .data(eventData, eventKeyfn);
    events.selectAll('*').remove();
    doEvents(events);
    events.exit().remove();
    var g = events.enter().append("g").attr("class", 'circle');
    doEvents(g);
}
function renderData(activities, events) {
    renderActivities(activities);
    renderEvents(events);


}

function randomLetters() {
    var activityData = [{ "_id": "5cd1b23c44dfc80004daf687", "name": "Grønn 1", "level": 0, "startDateID": 120, "endDateID": 122, "_i": 0 },
    { "_id": "5cd1b24444dfc80004daf688", "name": "Grønn 2", "level": 0, "startDateID": 59, "endDateID": 87, "_i": 1 },
    { "_id": "5cd1b59244dfc80004daf689", "name": "Rød 1", "level": 1, "startDateID": 151, "endDateID": 179, "_i": 2 },
    { "_id": "5cd1b61fa1d5b60004fc3781", "name": "Grønn 3", "level": 0, "startDateID": 185, "endDateID": 210, "_i": 3 }];
    var activityData2 = [{ "_id": "5cd1b23c44dfc80004daf687", "name": "Grønn 1", "level": 0, "startDateID": 100, "endDateID": 130, "_i": 0 },
    { "_id": "5cd1b24444dfc80004daf688", "name": "Grønn 2", "level": 0, "startDateID": 59, "endDateID": 87, "_i": 1 },
    { "_id": "5cd1b59244dfc80004daf689", "name": "Rød 1", "level": 1, "startDateID": 151, "endDateID": 179, "_i": 2 },
    { "_id": "5cd1b61fa1d5b60004fc3781", "name": "Grønn 3", "level": 0, "startDateID": 151, "endDateID": 179, "_i": 3 }];
    var activityData3 = [{ "_id": "5cd1b23c44dfc80004daf687", "name": "Grønn 1", "level": 0, "startDateID": 120, "endDateID": 122, "_i": 0 },
    { "_id": "5cd1b24444dfc80004daf688", "name": "Grønn 2", "level": 1, "startDateID": 59, "endDateID": 87, "_i": 1 },
    { "_id": "5cd1b61fa1d5b60004fc3781", "name": "Grønn 3", "level": 0, "startDateID": 151, "endDateID": 179, "_i": 3 }];
    var activityData4 = [{ "_id": "5cd1b23c44dfc80004daf687", "name": "Grønn 1", "level": 0, "startDateID": 120, "endDateID": 122, "_i": 0 },
    { "_id": "5cd1b24444dfc80004daf688", "name": "Grønn 2", "level": 0, "startDateID": 59, "endDateID": 87, "_i": 1 },
    { "_id": "5cd1b59244dfc80004daf689", "name": "Rød 1", "level": 1, "startDateID": 151, "endDateID": 179, "_i": 2 },
    { "_id": "5cd1b61fa1d5b60004fc3781", "name": "Grønn 3", "level": 0, "startDateID": 110, "endDateID": 179, "_i": 3 }];
    if (counter == 0) {
        ++counter;
        return activityData;
    }
    if (counter == 1) {
        ++counter;
        return activityData2;
    }
    if (counter == 2) {
        ++counter;
        return activityData3;
    }
    if (counter == 3) {
        counter = 0;
        return activityData4;
    }

}