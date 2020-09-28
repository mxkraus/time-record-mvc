<?php 

/*********************
*
* Model class
*
*
********/

class User{

	private $entries = array();
	private static $userDB = null;


	function __construct(){
		$db = Database::getInstance();
	    $mysqli = $db->getConnection();
	    self::$userDB = $mysqli;

		$query = "SELECT * FROM bo_user";
		

	    if ($result = $mysqli->query($query)) {
		    while ($row = $result->fetch_assoc()) {
		        $this->entries[] = $row;
		    }
		    $result->free();
		}

	}


	/**
	 * Übergibt SQL Query an DB Objekt
	 *
	 * @return Array
	 *
	 *
	 */
	protected function setQuery( $query ){
		return self::$userDB->query($query);
	}


	/**
	 * Gibt alle User zurück.
	 *
	 * @return Array Array von Usern.
	 *
	 *
	 */
	public function getAllUsers(){
		return $this->entries;
	}


	/**
	 * Gibt einen bestimmten User zurück.
	 *
	 * @param int $id Id des gesuchten Users
	 * @return Array Array, dass einen User repräsentiert
	 *
	 */
	public function getSingleUser( $id ){

		$query = "SELECT * FROM bo_user WHERE userID = " . $id;
		$user = $this->setQuery( $query );
		$user = $user->fetch_assoc();
	    return $user;

	}



}



?>



