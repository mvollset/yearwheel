	/*global moment*/
				/*global d3*/
				/*global $*/
				//Data
				var wheelName = "_Dummy";
				var activityData = [{
					name: "Aktivitet X",
					startDateID: 0,
					endDateID: 119,
					level: 0
				}, {
					name: "Aktivitet Y",
					startDateID: 119,
					endDateID: 153,
					level: 0
				}, {
					name: "Ekstra moro",
					startDateID: 0,
					endDateID: 58,
					level: 1
				}, {
					name: "Sommer ferie",
					startDateID: 150,
					endDateID: 256,
					level: 1
				}];
				var eventData = [{
						name: "Connect",
						startDateID: 311
					}, {
						name: "ServiceNow release",
						startDateID: 35
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

				renderData(activityData, eventData);


				var startOfYear = moment().startOf('year');
				function dateIDRenderer(data, type, full, meta) {
					if (type == "display") {
						
						return moment().startOf('year').add(data, 'days').format('D. MMM');
					}
					return data;
				}
				var activityTable = $('#tblActivities').DataTable({
					data: activityData,
					select: true,
					order: [
						[1, 'asc']
					],
					columns: [{
						title: "Name",
						data: "name"
					}, {
						title: "Start",
						data: "startDateID",
						render: dateIDRenderer
					}, {
						title: "End",
						data: "endDateID",
						render: dateIDRenderer
					}, {
						title: "Level",
						data: "level"
					}]
				});
				var eventTable = $('#tblEvents').DataTable({
					data: eventData,
					select: true,
					order: [
						[1, 'asc']
					],
					columns: [{
						title: "Name",
						data: "name"
					}, {
						title: "Date",
						data: "startDateID",
						render: dateIDRenderer
					}]
				});
				eventTable.on('select', function(e, dt, type, indexes) {
					if (type === 'row') {
						var data = eventTable.rows(indexes).data();
						var event=data[0];
						showEvent(event,indexes[0]);

						// do something with the ID of the selected items
					}
				});
					activityTable.on('select', function(e, dt, type, indexes) {
					if (type === 'row') {
						var data = activityTable.rows(indexes).data();
						var activity=data[0];
						showActivity(activity,indexes[0]);

						// do something with the ID of the selected items
					}
				});
				$(document).ready(function() {
					$('#showData').on('click', function(e) {
						e.preventDefault();
						showData();

					});
					$('#menuNewEvent').on('click', function(e) {
						e.preventDefault();
						showData();
						showNewEvent();

					})
					$('#menuNewActivity').on('click', function(e) {
						e.preventDefault();
						showData();
						showNewActivity();

					})
					$('#btnSaveEvent').on('click', function(e) {
						saveEvent();


					});
					$('#btnSaveActivity').on('click', function(e) {
						saveActivity();


					});
					$('#btnHideData').on('click', function(e) {
						hideData();


					});
					$('#menuSaveAsImage').on('click', function(e) {
						saveAsPng();
					});

				});

				function showData() {
					$('#datapanel').removeClass('hidden');
				}

				function hideData() {
					$('#datapanel').addClass('hidden');

				}

				function saveActivity() {
					var name = $('#activityName').val();
					var startdate = $('#activityStartDate').val();
					var enddate = $('#activityEndDate').val();
					var startDateID = moment(startdate).dayOfYear()-1;
					var endDateID = moment(enddate).dayOfYear()-1;
					var ev = {
						name: name,
						startDateID: startDateID,
						endDateID: endDateID,
						level: parseInt($('#level').val())
					};
					activityData.push(ev);
					renderData(activityData, eventData);
					activityTable.row.add(ev).draw();
					saveToLocalStorage();
				}

				function saveEvent() {
					var name = $('#eventName').val();
					var edate = $('#eventDate').val();
					var index=$('#eventN').val();
					var mom=moment(edate);
					var startDateID = mom.dayOfYear()-1;
					var ev = {
						name: name,
						startDateID: startDateID
					};
					let iindex=parseInt(index);
					if(isNaN(iindex)){
						eventData.push(ev);
						eventTable.row.add(ev).draw();
					}
					else
						{
							eventData[iindex]={name:name,startDateID:startDateID};
							eventTable.row(iindex).data({name:name,startDateID:startDateID});
						}
					renderData(activityData, eventData);
					eventTable.draw();
					saveToLocalStorage();
				}

				function saveToLocalStorage() {
					localStorage.setItem('wheel-' + wheelName, JSON.stringify({
						name: wheelName,
						activityData: activityData,
						eventData: eventData
					}));
				}
				
				function dateIdToHtmlDate(dateid){
					return moment().utc().startOf('year').add(dateid,'days').format('YYYY-MM-DD')
				}
				function showEvent(event,index){
					$('#eventForm').removeClass('hidden');
					$('#eventN').val(index);
					$('#eventName').val(event.name);
					$('#eventDate').val(dateIdToHtmlDate(event.startDateID));
				}
			    function showActivity(activity,index){
					$('#activityForm').removeClass('hidden');
					$('#activityN').val(index);
					$('#activityName').val(activity.name);
					$('#activityStartDate').val(dateIdToHtmlDate(activity.startDateID));
					$('#activityEndDate').val(dateIdToHtmlDate(activity.endDateID));
					$('#level').val(activity.level);
				}
				function showNewEvent() {
					$('#eventForm').removeClass('hidden');
					$('#eventN').val("");
					$('#eventName').val("New Event");

				}

				function showNewActivity() {
					$('#activityForm').removeClass('hidden');
					$('#activityN').val("");
					$('#activityName').val("New Event");

				}

				function saveAsPng() {
					var tempstyle = $('#thewheel').attr('style');
					$('#thewheel').attr('style', '');
					saveSvgAsPng(document.getElementById('thewheel'), 'wheel.png');
					$('#thewheel').attr('style', tempstyle);
				}