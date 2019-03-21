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
	function addPersonalTouch(){
			 var head = document.head;
			  var link = document.createElement("link");
			
			  link.type = "text/css";
			  link.rel = "stylesheet";
			  link.href = '/css/personal.css';
			
			  head.appendChild(link);
		}