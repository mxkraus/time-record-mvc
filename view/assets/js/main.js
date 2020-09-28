

/**
 *
 * Wenn Textarea Fouc erhält, soll Content nach oben rutschen
 * dass Tastatur auf Android platz bekommt.
 *
 */

jQuery('#projectDescription').on( 'focus', function(){
	jQuery('#addNewPage').addClass('elementUp');
}).focusout( function(){
	jQuery('#addNewPage').removeClass('elementUp');
});

jQuery('#addNewTimeForm').submit(function(e){
  e.preventDefault(); // dont submit multiple times
  this.submit(); // use native js submit

  setTimeout(function(){
    window.localStorage.clear();
  });
});