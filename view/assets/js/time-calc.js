/**
 *
 * Storage
 *
 **/

function storageAvailable( type ){
	try{
		var storage = window[ type ];
		// console.log("Speichergröße: " + storage.length);
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
	}else{
		error("no localStorage found");
	}
}

/**
 * Holt einen Zeiteintrag aus dem localStorage
 * @param {string} name Name des Eintrags
 * @param {boolean} [inMilliSeconds=false] -  Wenn true, wird der Zeiteintrag in Millisekunden zurückgegeben
 * @returns {string} Zeit aus local Storage - entweder formatiert oder in Millisekunden
 */

function getStorageItem( name, inMilliSeconds = false ){
	if (storageAvailable('localStorage')){
		if( inMilliSeconds == true ){
			return localStorage.getItem( name.toString() );
		}else{
			return timeFormatFrontend( localStorage.getItem( name.toString() ) );
		}
	}else{
		error("no localStorage found");
	}
}





/**
 *
 * Elemente
 *
 **/

var mf, mt;
// Input Elemente
var InputNewDate = document.getElementById('newDate').value;
var InputFrom = document.getElementById('minFrom');
var InputTo = document.getElementById('minTo');
// Ergebnis Input
var InputNewHours = document.getElementById('newHours');
// Zeige die vollen Stunden und Minuten
var aH = document.getElementById('absoluteHours');
var aM = document.getElementById('absoluteMinutes');
// Buttons für Jetztzeit
var TriggerStart = document.getElementById('start-addon');
var TriggerEnd = document.getElementById('end-addon');


// Inputs bei onclick auf Jetztzeit setzen (trigger, element)
// Wirkt beim anklicken der "Jetzt" Buttons
setCurrentTime(TriggerStart, InputFrom);
setCurrentTime(TriggerEnd, InputTo);





/**
 *
 * Funktionen
 *
 **/

 function timeNow(){
	var now = new Date();
	return now.getTime();
}

function timeFormatFrontend( timeStamp ){
	var time = new Date( parseInt(timeStamp) );
	var h = time.getHours();
	var m = time.getMinutes(); // wenn Minuten < 10 wird der Datumswert nicht akzeptiert
	m = ("0" + m).slice(-2);
	h = ("0" + h).slice(-2); // 9:31 wird nicht genommen -> 09.31
	return h + ":" + m;
}

function timeFormatToMS( userInput ){

	Date.prototype.monthNames = [
	    "January", "February", "March",
	    "April", "May", "June",
	    "July", "August", "September",
	    "October", "November", "December"
	];

	Date.prototype.getMonthName = function() {
	    return this.monthNames[this.getMonth()];
	};
	Date.prototype.getShortMonthName = function () {
	    return this.getMonthName().substr(0, 3);
	};

	var date = new Date();
	var m = date.getShortMonthName();
	var y = date.getFullYear();
	var d = date.getDate();

	var newUserDate = new Date( d+" "+m+" "+y+" "+userInput);

	return newUserDate.getTime();

}

function setCurrentTime( trigger, givenInput ){

	trigger.addEventListener('click', function(){
		givenInput.value = timeFormatFrontend( timeNow() ); // html input befüllen
		populateStorage( givenInput.name, timeNow() ); // localStorage befüllen
	});

}






/**
 *
 * Calc Dates
 *
 **/

function calcPeriod(){

	var from = getStorageItem('minfrom', true);
	var to = getStorageItem('minto', true);

	if( from != undefined && to != undefined ){

		var f = new Date( parseInt(from) );
		// console.log(f); //Sat Feb 10 2018 15:01:10 GMT+0100 (CET)
		var t = new Date( parseInt(to) );
		// console.log(t); //Sat Feb 10 2018 15:01:10 GMT+0100 (CET)

		var diff 	= t.getTime() - f.getTime();	
		var hours 	= diff/(60*60*1000);
		var r_hours = Math.floor( hours ); // gerundete Stunden

		var minutes = diff/(60*1000);
		var r_minutes = Math.floor( minutes ); // gerundete Stunden


		// Kreis: gerundete Stundenanzahl
		hours = Math.round( hours * 20 ) / 20; // auf zwei nachkommastellen runden
		InputNewHours.value = hours + " h";

		// volle Stunden
		aH.innerHTML = r_hours + " Stunden";

		// volle Minuten
		// console.log(minutes + ' minutes');
		if( r_minutes < (r_hours * 60) ){

			if( r_minutes < 60 ){
				aM.innerHTML = r_minutes + " Minuten";
			}else{
				aM.innerHTML = (r_hours * 60) - r_minutes + " Minuten";
			}
			
		}else{
			// console.log((r_hours*60 )+ ' hours');
			aM.innerHTML = r_minutes - (r_hours * 60) + " Minuten";
		}

	}
}





// Zum Berechnen der Stunden werden Standardmäßig die Werte aus dem Cache geholt
// Diese werden bei erneutem Klick im Cache aktualisiert
window.addEventListener('load', function(){

	// FRONTEND Anischt: html inputs mit Daten aus Speicher befüllen
	mf = document.getElementById('minFrom').value = getStorageItem('minfrom');
	mt = document.getElementById('minTo').value = getStorageItem('minto');

	calcPeriod();

});






// Timevariablen auf Jetztzeit setzen
// wirkt beim berechnen der Zeit
TriggerStart.addEventListener('click', function(){
	populateStorage('minfrom', timeNow() );
});

TriggerEnd.addEventListener('click', function(){
	populateStorage('minto', timeNow() );
	calcPeriod();
});





/**
 * Event bei INPUT und CHANGE
 *	-> html input neu befüllen
 *	-> Sepicher updaten
 *	-> neue Berechnung mit neuem Wert ausführen
 */

['input', 'change'].map(function(e) {

	InputFrom.addEventListener(e, function(){

		mtmilsec = timeFormatToMS( InputFrom.value );

		populateStorage('minfrom', mtmilsec );

		calcPeriod();

	});

	InputTo.addEventListener(e, function(){

		mtmilsec = timeFormatToMS( InputTo.value );

		populateStorage('minto', mtmilsec );

		calcPeriod();

	});

});
















/**
 *
 * Wenn Textarea Fouc erhält, soll Content nach oben rutschen
 * dass Tastatur auf Android platz bekommt.
 *
 */

jQuery('#projectDescription').on( 'focus', function(){
	jQuery('#addNewPage').addClass('elementUp');
	jQuery('#newPageFooter').hide();
	jQuery(this).select();
}).focusout( function(){
	jQuery('#addNewPage').removeClass('elementUp');
	jQuery('#newPageFooter').show();
});

jQuery('#addNewTimeForm').submit(function(e){
  e.preventDefault(); // dont submit multiple times
  this.submit(); // use native js submit

  setTimeout(function(){
    window.localStorage.clear();
  });
});



