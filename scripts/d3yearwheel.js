		var monthData = getMonthData();
		////////////////////////////////////////////////////////////
		//////////////////////// Set-up ////////////////////////////
		////////////////////////////////////////////////////////////
		let svg,radix;
		let gtoradians = Math.PI / 180;
		//Function for generating a circular path
		/*function circleGen() {
			//set defaults
			var r = function(d) {
					return d.radius;
				},
				x = function(d) {
					return d.x;
				},
				y = function(d) {
					return d.y;
				};

			//returned function to generate circle path
			function circle(d) {
				let cx = d3.functor(x).call(this, d),
					cy = d3.functor(y).call(this, d),
					myr = d3.functor(r).call(this, d);
				
				return `M${cx},${cy} m${-myr}, 0 a${myr},${myr} 0 1,0 ${myr*2},0 a${myr},${myr} 0 1,0 ${-myr*2},0Z`;
			}

			//getter-setter methods
			circle.r = function(value) {
				if (!arguments.length) return r;
				r = value;
				return circle;
			};
			circle.x = function(value) {
				if (!arguments.length) return x;
				x = value;
				return circle;
			};
			circle.y = function(value) {
				if (!arguments.length) return y;
				y = value;
				return circle;
			};

			return circle;
		}*/
		function setUp(){
			var screenWidth = Math.min(window.innerWidth, window.innerHeight);
			var xoffset = 0;
			if (window.innerWidth > window.innerHeight) {
				xoffset = ((window.innerWidth - window.innerHeight) / 2)-320;
			}
			
			var margin = {
					left: 30,
					top: 30,
					right: 30,
					bottom: 30
				},
			width = Math.min(screenWidth) - margin.left - margin.right,
			height = Math.min(screenWidth) - margin.top - margin.bottom;
			radix = width * 0.7 / 2;
			/*var myC = circleGen()
				.x(function(d) {
					return 0;
				})
				.y(function(d) {
					return 0;
				})
				.r(function(d) {
					return radix + 15;
				});*/
			 svg = d3.select("#chart").append("svg").attr('id', "thewheel")
				.attr("width", (width + margin.left + margin.right))
				.attr("height", (height + margin.top + margin.bottom))
				.attr("style", "margin-left:" + xoffset + "px;")
				.append("g").attr("class", "wrapper")
				.attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")")
		}
		function createArc(d){
			//A regular expression that captures all in between the start of a string (denoted by ^) 
				//and the first capital letter L
				var firstArcSection = /(^.+?)L/;

				//The [1] gives back the expression between the () (thus not the L as well) 
				//which is exactly the arc statement
				var newArc = firstArcSection.exec(d3.select(d).attr("d"))[1];
				//Replace all the comma's so that IE can handle it -_-
				//The g after the / is a modifier that "find all matches rather than stopping after the first match"
				return newArc.replace(/,/g, " ");
		}
		function createMonthTextPath(d,i){
				const newArc = createArc(this);
				svg.append("path")
					.attr("class", "hiddenDonutArcs")
					.attr("id", "donutArc" + i)
					.attr("d", newArc)
					.style("fill", "none");
			
		}
		function drawMonths(){
			drawMonthArcs(svg);
			addMonthText(svg);
		
	
		}
		function drawMonthArcs(svg){
				//Creates a function that makes SVG paths in the shape of arcs with the specified inner and outer radius 
		//Months
		let arc = d3.svg.arc()
			.innerRadius(radix)
			.outerRadius(radix + 30);

		//Creates function that will turn the month data into start and end angles
		let pie = d3.layout.pie()
			.value(function(d) {
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
			.attr("id", function(d, i) {
				return "monthArc_" + i;
			})
			.attr("d", arc)
			.each(createMonthTextPath);
		}
		function addMonthText(svg){
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
			.attr("xlink:href", function(d, i) {
				return "#donutArc" + i;
			})
			.text(function(d) {
				return d.month.toUpperCase();
			});
		}
		setUp();
		drawMonths();
		//Add a circular path to animate days....

		////////////////////////////////////////////////////////////
		//////////////////// Scales & Data /////////////////////////
		////////////////////////////////////////////////////////////

		//The start date number and end date number of the months in a year

		
		const eventKeyfn = function(d) {
			return keyFn(d);
		}
		const activityKeyfn = function(d) {
			return keyFn(d);
		}
		const keyFn = function(d){
			if (!d)
				return null;
			return `${d.name}@${d.startDateID}`;
		}
		function doActivities(acts){

				drawActivityArcs(acts);
				drawInlineActivityText(acts.filter(function(d){return hasRoomForText(d)}));
				drawActivityPins(acts.filter(function(d){return !hasRoomForText(d)}));
				drawActivityText(acts.filter(function(d){return !hasRoomForText(d)}));
		}
		function drawInlineActivityText(activities){
			activities.append("text")
			.attr("class", "activityText")
			//.attr("x", 14) //Move the text from the start angle of the arc
			.attr("dy", 18) //Move the text down
			.append("textPath")
			.attr("startOffset", "50%")
			.style("text-anchor", "middle")
			.attr("xlink:href", function(d, i) {
				return "#activityArc" + d._i; //Use reference on generated arc!
			})
			.text(function(d) {
				return d.name.toUpperCase();
			});
		}
		function drawActivityArcs(activities){
			activities.attr("class", "activities").append("path")
				.attr("class", function(d, i) {
					return "arcer level" + d.level
				})
				.attr("d", activityArc).each(function(d, i) {
				
					let newArc = createArc(this);
					d._i=i;
					activities.append("path")
						.attr("class", "hiddenDonutArcs")
						.attr("id", "activityArc" + d._i) //Keep reference on generated arc!
						.attr("d", newArc)
						.style("fill", "none");
				});
		}
		function hasRoomForText(activity){
			let n = activity.name.length;
			let d = activity.endDateID-activity.startDateID;
			return (d>(n*3));
		}
		function renderActivities(activities){
				//Get all existing activities
				var acts = svg
				.selectAll('.activities')
				.data(activities, activityKeyfn);
			acts.selectAll('*').remove();
			//For all existing redraw
			doActivities(acts);
			var g = acts.enter().append("g");
			//do new ones
			doActivities(g);
			//remove the deleted
			acts.exit().remove();
		}
		let activityArc=
			d3.svg.arc()
				.innerRadius(function(d, i) {
					return radix + (d.level * 30 + 35)
				})
				.outerRadius(function(d, i) {
					return radix + (d.level * 30 + 60)
				})
				.startAngle(function(d, i) {
					return d.startDateID * gtoradians
				})
				.endAngle(function(d) {
					return d.endDateID * gtoradians
				});
		function drawEventCircles(events){
				drawPinMarkers(events,0);
				/*events.append("circle")
				.attr("r", 10)
				.style("fill", "#000")
				.style("opacity", ".4")
				.attr("cx", function(d) {
					return ((radix) + 15) * Math.sin(d.startDateID * gtoradians);
				})
				.attr("cy", function(d) {
					return -((radix) + 15) * Math.cos(d.startDateID * gtoradians);
				})*/
		}
		function drawEventPins(events){
			events.append("path")
				.attr("d", function(d) {
					return getPinSvg(25,d.startDateID);
				})
				.attr("class", "link");
		}
		function drawPinMarkers(events,startOffset){
			events.append("circle")
				.attr("r", 10)
				.style("fill", "#000")
				.style("opacity", ".4")
				.attr("cx", function(d) {
					return ((radix) + 15 + startOffset) * Math.sin(d.startDateID * gtoradians);
				})
				.attr("cy", function(d) {
					return -((radix) + 15 + startOffset) * Math.cos(d.startDateID * gtoradians);
				})
		}
		function drawActivityPins(activities){
			//Same as event pins, but move starting point based on level.
			activities.append("path")
				.attr("d", function(d) {
					return getPinSvg(d.level * 30 + 60,d.startDateID);			
				})
				.attr("class", "link");
				//
		}
		function getPinSvg(startOffset,startDateID){
				const x1=(radix + (startOffset)) * Math.sin(startDateID * gtoradians);
				const y1=-(radix + (startOffset)) * Math.cos(startDateID * gtoradians);
				const x2=((radix) + 130) * Math.sin(startDateID * gtoradians);
				const y2=-((radix) + 130) * Math.cos(startDateID * gtoradians);
				return `M ${x1} ${y1} L ${x2} ${y2}`;
		}
		function drawPinText(events,textfn){
			events.append("text")
				.attr("x", function(d) {
					return ((radix) + 135) * Math.sin(d.startDateID * gtoradians)
				})
				.attr("y", function(d) {
					return -((radix) + 135) * Math.cos(d.startDateID * gtoradians)
				})
				.style("text-anchor", function(d) {
					//When we pass 180 turn the text;
					return d.startDateID > 180 ? "end" : "start"
				})
				.text(function(d) {
					/*d3.select("body").append('div')
					.attr('pointer-events', 'none')
                    .attr("class", "toolxtip")
                    //.style("opacity", 1)
                    .html( "<b>" + d.name + "<b/")
                    .style("left", (((radix) + 135) * Math.sin(d.startDateID * gtoradians) + 644+ "px"))
                    .style("top", (-(((radix) + 135) * Math.cos(d.startDateID * gtoradians)) +644 +"px"));*/
					return textfn(d);
					//return formatDate(d.startDateID) + " - " + formatDate(d.endDateID) + " " +d.name;
				});
		}
		function drawActivityText(events){
			drawPinText(events,function(d){
				return `${formatDate(d.startDateID)} - ${formatDate(d.startDateID)} ${d.name}`;
			});
		}
		function drawEventText(events){
			drawPinText(events,function(d){
				return `${formatDate(d.startDateID)} ${d.name}`;
			});
		}
		function doEvents(events){
			drawEventCircles(events);			
			drawEventPins(events);
			drawEventText(events);
		}
		function renderEvents(eventData){
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
		
	