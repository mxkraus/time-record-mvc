/************************
*
* Elemente
*
********/

var mf, mt;
// Input Elemente
var newDate = document.getElementById('newDate').value;
var minFrom = document.getElementById('minFrom');
var minTo = document.getElementById('minTo');
var newHours = document.getElementById('newHours');
// Zeige die vollen Stunden und Minuten
var aH = document.getElementById('absoluteHours');
var aM = document.getElementById('absoluteMinutes');
// Buttons für Jetztzeit
var startAddon = document.getElementById('start-addon');
var endAddon = document.getElementById('end-addon');



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

function populateStorage( name, value ){
	if (storageAvailable('localStorage')){
	  localStorage.setItem( name, value );
	}
}
	
/************************
*
* Set Now Times
*
********/

function nowDateFormat(){
	var now = new Date();
	console.log(now);
	var h = now.getHours();
	var m = now.getMinutes(); // wenn Minuten < 10 wird der Datumswert nicht akzeptiert
	m = ("0" + m).slice(-2);
	h = ("0" + h).slice(-2); // 9:31 wird nicht genommen -> 09.31
	return h + ":" + m;
}

function setCurrentTime( trigger, parentInput ){
	trigger.addEventListener('click', function(){
		parentInput.value = nowDateFormat(); // html input befüllen
		populateStorage( parentInput.name, nowDateFormat() ); // localStorage befüllen
	});
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

		// volle Stunden links neben Kreis darstellen
		aH.innerHTML = Math.round( hours ) + " Stunden";

		// gerundete Stunden in Kreis darstellen
		hours = Math.round( hours * 20 ) / 20; // auf zwei nachkommastellen runden
		newHours.value = hours + " h";

		// volle Stunden links neben Kreis darstellen
		var minutes = diff/(60*1000);
		hours = Math.round( hours ); // Stunden glatt runden
		minutes = minutes - (hours * 60); // Stunden subtrahieren
		console.log((hours * 60));
		aM.innerHTML = minutes + " Minuten";

	}
}


/************************
*
* Calc Dates
*
********/




// Zum Berechnen der Stunden werden Standardmäßig die Werte aus dem Cache geholt
// Diese werden bei erneutem Klick im Cache aktualisiert
window.addEventListener('load', function(){

	mf = document.getElementById('minFrom').value = localStorage.getItem('minfrom');
	mt = document.getElementById('minTo').value = localStorage.getItem('minto');
	printHours( mf, mt );

});





// Inputs bei onclick auf Jetztzeit setzen (trigger, element)
// Wirkt beim anklicken der "Jetzt" Buttons
setCurrentTime(startAddon, minFrom);
setCurrentTime(endAddon, minTo);


// Timevariablen auf Jetztzeit setzen
// wirkt beim berechnen der Zeit
startAddon.addEventListener('click', function(){
	mf = getCurrentTime();
});

endAddon.addEventListener('click', function(){
	mt = getCurrentTime();
	printHours( mf, mt );
});



// Bei Eingabe UND wenn sich an der Eingabe was ändert soll
// - Input neu befüllt werden
// - Speicher aktualiserit werden
// - die Stunden neu berechnet werden
['input', 'change'].map(function(e) {
	minFrom.addEventListener(e, function(){
		mf = minFrom.value;
		populateStorage( minFrom.name, minFrom.value );
		printHours( mf, mt );
	});
	minTo.addEventListener(e, function(){
		mt = minTo.value;
		populateStorage( minTo.name, minTo.value );
		printHours( mf, mt );
	});
});




















