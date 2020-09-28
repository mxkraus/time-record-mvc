class ZRM_Storage{

	constructor( storageType ){

		let storAvailable = false;
		let storType = null;
		let storContent = null;

		console.log( (typeof storageType) == (typeof localStorage) );

		try{
			// console.log( (storage ? (storageType + " verfügbar") : 'Storage nicht verfübar' ));
			// this.storContent = window[ storageType ];
				// this.storType = storageType;
				// this.storAvailable = true;
		}catch( e ){
			return e instanceof DOMException && ( 
				e.code === 22 || 
				e.code === 1014 || 
				e.name === 'QuotaExceededError' || 
				e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
			storage.length !== 0;
		}

	}

	timeFormatFrontend( timeStamp ){
		var time = new Date( parseInt(timeStamp) );
		var h = time.getHours();
		var m = time.getMinutes(); // wenn Minuten < 10 wird der Datumswert nicht akzeptiert
		m = ("0" + m).slice(-2);
		h = ("0" + h).slice(-2); // 9:31 wird nicht genommen -> 09.31
		return h + ":" + m;
	}

	setStorageItem( name, value ){

		if (storageAvailable( this.storAvailable )){
			this.storType.setItem( name, value );
		}else{
			error("no localStorage found");
		}

	}

	getStorageItem( name, inMilliSeconds = false ){

		if (storageAvailable( this.storAvailable )){
			if( inMilliSeconds == true ){
				return this.storType.getItem( name.toString() );
			}else{
				return timeFormatFrontend( (this.storType.toString()).getItem( name.toString() ) );
			}
		}else{
			error("no localStorage found");
		}

	}




}