	/*global moment*/
				/*global d3*/
				/*global $*/
				//Data
				var wheelName = "_Dummy";
				var activityData = [{
					name: "Aktivitet X",
					startDateID: 0,
					endDateID: 119,
					level: 0,
					_id:"asd"
				}, {
					name: "Aktivitet Y",
					startDateID: 119,
					endDateID: 153,
					level: 0,
					_id:"asd2"
				},
				 {
					name: "Aktivitet Z",
					startDateID: 153,
					endDateID: 170,
					level: 0,
					_id:"asd3"
				}
				, {
					name: "Ekstra moro",
					startDateID: 0,
					endDateID: 58,
					level: 1,
					_id:"asd4"
				}, {
					name: "Sommerferie",
					startDateID: 150,
					endDateID: 256,
					level: 1,
					_id:"as5"
				}];
				var eventData = [{
						name: "Connect",
						startDateID: 311,
						_id:"evt1"
					}, {
						name: "ServiceNow release",
						startDateID: 35,
						_id:"evt2"
					}

				]
				var defaultWheel = localStorage.getItem("defaultWheel");

				if (defaultWheel) {
					let wheel = JSON.parse(localStorage.getItem('wheel-' + defaultWheel));
					eventData = wheel.eventData;
					activityData = wheel.activityData;
					wheelName = wheel.name;

				}
				else {
					var dd = localStorage.getItem('wheel-' + wheelName);
					if (dd) {
						let wheel = JSON.parse(dd);
						eventData = wheel.eventData;
						activityData = wheel.activityData;
						wheelName = wheel.name;
					}
				}
				var wheels = JSON.parse(localStorage.getItem('wheels'));


				eventData.push({
					name: "I dag",
					startDateID: moment().dayOfYear()
				});

				


				var startOfYear = moment().startOf('year');
				function dateIDRenderer(data, type, full, meta) {
					if (type == "display") {
						
						return moment().startOf('year').add(data, 'days').format('D. MMM');
					}
					return data;
				}

				function saveAsPng() {
					var tempstyle = $('#thewheel').attr('style');
					$('#thewheel').attr('style', '');
					saveSvgAsPng(document.getElementById('thewheel'), 'wheel.png');
					$('#thewheel').attr('style', tempstyle);
				}