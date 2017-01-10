		var monthData = [{
			month: "Januar",
			startDateID: 0,
			endDateID: 30
		}, {
			month: "Februar",
			startDateID: 31,
			endDateID: 58
		}, {
			month: "Mars",
			startDateID: 59,
			endDateID: 89
		}, {
			month: "April",
			startDateID: 90,
			endDateID: 119
		}, {
			month: "Mai",
			startDateID: 120,
			endDateID: 150
		}, {
			month: "Juni",
			startDateID: 151,
			endDateID: 180
		}, {
			month: "Juli",
			startDateID: 181,
			endDateID: 211
		}, {
			month: "August",
			startDateID: 212,
			endDateID: 242
		}, {
			month: "September",
			startDateID: 243,
			endDateID: 272
		}, {
			month: "Oktober",
			startDateID: 273,
			endDateID: 303
		}, {
			month: "November",
			startDateID: 306,
			endDateID: 333
		}, {
			month: "Desember",
			startDateID: 334,
			endDateID: 364
		}];
	
	////////////////////////////////////////////////////////////
		//////////////////////// Set-up ////////////////////////////
		////////////////////////////////////////////////////////////

		var screenWidth = Math.min(window.innerWidth, window.innerHeight);
		var xoffset = 0;
		if (window.innerWidth > window.innerHeight) {
			xoffset = (window.innerWidth - window.innerHeight) / 2;
		}
		var gtoradians = Math.PI / 180;
		var margin = {
				left: 30,
				top: 30,
				right: 30,
				bottom: 30
			},
			width = Math.min(screenWidth) - margin.left - margin.right,
			height = Math.min(screenWidth) - margin.top - margin.bottom;
		var radix = width * 0.7 / 2;
		var svg = d3.select("#chart").append("svg").attr('id', "thewheel")
			.attr("width", (width + margin.left + margin.right))
			.attr("height", (height + margin.top + margin.bottom))
			.attr("style", "margin-left:" + xoffset + "px;")
			.append("g").attr("class", "wrapper")
			.attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

		////////////////////////////////////////////////////////////
		//////////////////// Scales & Data /////////////////////////
		////////////////////////////////////////////////////////////

		//The start date number and end date number of the months in a year

		//Creates a function that makes SVG paths in the shape of arcs with the specified inner and outer radius 
		//Months
		var arc = d3.svg.arc()
			.innerRadius(radix)
			.outerRadius(radix + 30);

		//Creates function that will turn the month data into start and end angles
		var pie = d3.layout.pie()
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
			.each(function(d, i) {
				//A regular expression that captures all in between the start of a string (denoted by ^) 
				//and the first capital letter L
				var firstArcSection = /(^.+?)L/;

				//The [1] gives back the expression between the () (thus not the L as well) 
				//which is exactly the arc statement
				var newArc = firstArcSection.exec(d3.select(this).attr("d"))[1];
				//Replace all the comma's so that IE can handle it -_-
				//The g after the / is a modifier that "find all matches rather than stopping after the first match"
				newArc = newArc.replace(/,/g, " ");

				//Create a new invisible arc that the text can flow along
				svg.append("path")
					.attr("class", "hiddenDonutArcs")
					.attr("id", "donutArc" + i)
					.attr("d", newArc)
					.style("fill", "none");
			});

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

		function renderData(activities, events) {

			//Handles the mo
			var _activityArc = d3.svg.arc()
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
			var acts = svg.selectAll('.activities')
				.data(activityData)
			acts.exit().remove();
			var g = acts.enter().append("g").attr("class", "activities");
			g.append("path")
				.attr("class", function(d, i) {
					return "arcer level" + d.level
				})
				.attr("d", _activityArc).each(function(d, i) {
					//A regular expression that captures all in between the start of a string (denoted by ^) 
					//and the first capital letter L
					var firstArcSection = /(^.+?)L/;

					//The [1] gives back the expression between the () (thus not the L as well) 
					//which is exactly the arc statement
					var newArc = firstArcSection.exec(d3.select(this).attr("d"))[1];
					//Replace all the comma's so that IE can handle it -_-
					//The g after the / is a modifier that "find all matches rather than stopping after the first match"
					newArc = newArc.replace(/,/g, " ");

					//Create a new invisible arc that the text can flow along
					g.append("path")
						.attr("class", "hiddenDonutArcs")
						.attr("id", "activityArc" + i)
						.attr("d", newArc)
						.style("fill", "none");
				});
			//Append the Activity names names within the arcs
			g.append("text")
				.attr("class", "activityText")
				//.attr("x", 14) //Move the text from the start angle of the arc
				.attr("dy", 18) //Move the text down
				.append("textPath")
				.attr("startOffset", "50%")
				.style("text-anchor", "middle")
				.attr("xlink:href", function(d, i) {
					return "#activityArc" + i;
				})
				.text(function(d) {
					return d.name.toUpperCase();
				});

			var events = svg.selectAll('.circle')
				.data(eventData);
			events.exit().remove();
			var g = events.enter().append("g").attr("class", 'circle');

			g.append("circle")
				.attr("r", 10)
				.style("fill", "#000")
				.style("opacity", ".4")
				.attr("cx", function(d) {
					return ((radix) + 15) * Math.sin(d.startDateID * gtoradians);
				})
				.attr("cy", function(d) {
					return -((radix) + 15) * Math.cos(d.startDateID * gtoradians);
				})

			g.append("path")
				.attr("d", function(d) {
					return "M " + ((radix) + 25) * Math.sin(d.startDateID * gtoradians) + " " +
						-((radix) + 25) * Math.cos(d.startDateID * gtoradians) + " L " + ((radix) + 130) * Math.sin(d.startDateID * gtoradians) + " " +
						-((radix) + 130) * Math.cos(d.startDateID * gtoradians)
				})
				.attr("class", "link");
			g.append("text")
				.attr("x", function(d) {
					return ((radix) + 135) * Math.sin(d.startDateID * gtoradians)
				})
				.attr("y", function(d) {
					return -((radix) + 135) * Math.cos(d.startDateID * gtoradians)
				})
				.style("text-anchor", function(d) {
					return d.startDateID > 180 ? "end" : "start"
				})
				.text(function(d) {
					return d.name
				});
			events.transition().
			duration(500)
				.attr("cx", function(d) {
					return ((radix) + 15) * Math.sin(d.startDateID * gtoradians);
				})
				.attr("cy", function(d) {
					return -((radix) + 15) * Math.cos(d.startDateID * gtoradians);
				})
		}