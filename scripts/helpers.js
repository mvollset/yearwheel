
		
	function addPersonalTouch(){
			 var head = document.head;
			  var link = document.createElement("link");
			
			  link.type = "text/css";
			  link.rel = "stylesheet";
			  link.href = '/css/personal.css';
			
			  head.appendChild(link);
		}
	function sortItems(a,b){
		return a.startDateID-b.startDateID;
	}