<?php 

/*********************
*
* View class
*
*
********/

class View{

	private $path = 'view/templates';
	private $template = 'single';


	/**
	 * Enthält die Variablen, die in das Template eingebetet
	 * werden sollen.
	 */
	private $_ = array();


	/**
	 * Variablen mit einem Schlüssel an das View übergeben
	 * 
	 */
	public function assign($key, $value){
		$this->_[$key] = $value;
	}


	/**
	 * Template setzten
	 * 
	 */
	public function setTemplate( $template = 'single' ){
		$this->template = $template;
	}



	/**
	 * Template laden und ausgeben
	 * 
	 */
	public function loadTemplate(){
		$tpl = $this->template;
		$file = $this->path . DIRECTORY_SEPARATOR . $tpl . '.tmpl.php';
		$exists = file_exists($file);
		// Wenn Template vorhanden
		if( $exists ){

			ob_start();
			include $file;
			$output = ob_get_contents();
			ob_end_clean();

			return $output;
		}else{
			return 'Datei nicht gefunden!';
		}
	}

}



?>



