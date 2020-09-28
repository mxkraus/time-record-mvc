<?php 

/*********************
*
* Controller class
*
*
********/



class Controller{

	private $request = null;
	private $template = '';



	/**
	 * Controller erzeugen
	 * 
	 */
	public function __construct( $request ){
		$this->request = $request;
		// Standard
		if( ! isset($this->request['id'])){
			$this->request['id'] = 1; //Max immer anzeigen
		}
		$this->template = ! empty($request['view']) ? $request['view'] : 'main';
	}


	/**
	 * Daten dem View (Anzeige) zuweisen
	 *
	 */
	public function display(){

		$view = new View();
		switch ( $this->template ) {
			case 'default':

				$user = new User();
				$entries = $user->getAllUsers();

				$view->setTemplate('default');
				$view->assign('entries', $entries);

				break;

			case 'add':

				$view->setTemplate('add');

				break;

			case 'single':
			default:

				//hole Daten von Model
				$id = $this->request['id'];

				$u = new User();
				$user = $u->getSingleUser( $id );

				$t = new UserTimes();
				$times = $t->getUserTimes( $id );


				//Daten an View weitergeben
				$view->setTemplate('single');
				$view->assign('name', $user['name']);
				$view->assign('vorname', $user['vorname']);
				$view->assign('times', $times);
		}
		return $view->loadTemplate();
	}


	/**
	 * neue Daten dem Model geben -> speichern in DB
	 *
	 */
	public function saveTime(){
		if( isset($this->request['saveRequest'] )){

			$times = new UserTimes();
			$times->setUserTime( $this->request['newdate'], $this->request['minfrom'], $this->request['minto'], $this->request['descr'], $this->request['newhours'], $this->request['id']);

		}
	}


	/**
	 * angegebene Daten per ID aus DB löschen 
	 *
	 */
	public function deleteTime(){
		if( isset($this->request['deleteRequest'] )){

			$times = new UserTimes();

			$rows = $this->request['deleteByID'];
			for ($i=0; $i < count($rows); $i++) { 
				$times->deleteUserTime( $rows[$i] );
			}

		}
	}


}



?>



