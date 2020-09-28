	
/************************
*
* Set Now Times
*
********/

function nowDateFormat(){
	var now = new Date();
	var h = now.getHours();
	var m = now.getMinutes(); // wenn Minuten < 10 wird der Datumswert nicht akzeptiert
	m = ("0" + m).slice(-2);
	h = ("0" + h).slice(-2); // 9:31 wird nicht genommen -> 09.31
	return h + ":" + m;
}

function setCurrentTime( trigger, parentInput ){
	trigger.addEventListener('click', function(){
		parentInput.value = nowDateFormat();
	}, false);
}

function getCurrentTime(){
	return nowDateFormat();
}

function printHours( from, to ){
	if( from != undefined && to != undefined ){

		var f = new Date( newDate + " " + from);
		var t = new Date( newDate + " " + to);

		var diff = t.getTime() - f.getTime();

		var hours = diff/(60*60*1000);
		hours = Math.round( hours * 20 ) / 20; // auf zwei nachkommastellen runden
		console.log(hours + " Stunden");

		var minutes = diff/(60*1000);
		console.log(minutes + " Minuten");

		newHours.value = hours;
	}
}

/************************
*
* Check Storage
*
********/

function storageAvailable( type ){
	try{

		var storage = window[ type ];
		var x = "__storage_test__";
		storage.setItem(x, x);
		storage.removeItem(x);

		console.log("Speichergröße: " + storage.length);

		return true;

	}catch( e ){

		return e instanceof DOMException && ( 
			e.code === 22 || 
			e.code === 1014 || 
			e.name === 'QuotaExceededError' || 
			e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&

		storage.length !== 0;

	}
}

if (storageAvailable('sessionStorage')) {
  // Yippee! We can use localStorage awesomeness
  console.log('sessionStorage verfügbar');
}
else {
  // Too bad, no localStorage for us
  console.log('sessionStorage nicht verfügbar');
}

/************************
*
* Calc Dates
*
********/

var mf, mt;

// Input Elemente
var newDate = document.getElementById('newDate').value;
var minFrom = document.getElementById('minFrom');
var minTo = document.getElementById('minTo');
var newHours = document.getElementById('newHours');


// Buttons für Jetztzeit
var startAddon = document.getElementById('start-addon');
var endAddon = document.getElementById('end-addon');


// Inputs auf Jetztzeit setzen
setCurrentTime(startAddon, minFrom);
setCurrentTime(endAddon, minTo);


// Timevariablen auf Jetztzeit setzen
startAddon.addEventListener('click', function(){
	mf = getCurrentTime();
}, false);

endAddon.addEventListener('click', function(){
	mt = getCurrentTime();
	printHours(mf, mt);
}, false);


// Timevariablen auf Usereingaben setzen
minFrom.addEventListener("input", function(){
	mf = minFrom.value;
	console.log(mf);
}, false);

minTo.addEventListener("input", function(){
	mt = minTo.value;
	console.log(mt);
}, false);

minTo.addEventListener('change', function(){
	printHours( mf, mt );
}, false);





























