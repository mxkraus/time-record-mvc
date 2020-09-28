<?php 

/*********************
*
* Model class
*
*
********/


class UserTimes{

	private $entries = array();
	private static $userDB = null;


	function __construct(){
		$db = Database::getInstance();
	    $mysqli = $db->getConnection();
	    self::$userDB = $mysqli;

	    $query = "SELECT * FROM bo_usertime";

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
	 * Gibt Zeiten eines bestimmten Users zurück
	 *
	 * @param int $id Id des gesuchten Users
	 * @return Array
	 * 		  
	 */
	public function getUserTimes( $userid ){

		$query = "SELECT ut.usertimeID, ut.ut_date, ut.ut_hours FROM bo_user u LEFT JOIN bo_usertime ut ON u.userID = ut.user_id WHERE u.userID = " . $userid;
		$times = $this->setQuery( $query );

		while ($row = $times->fetch_assoc()) {
			$result[] = $row;
		}
		$times->free();

		return $result;

	}


	/**
	 * Speichert neuen Eintrag für User in Datenbank
	 *
	 * @param int $id Id des Users
	 * @param date $date Datum des Eintrags
	 * @param int $hours Stunden für Eintrag
	 * 		  
	 */
	public function setUserTime( $date, $from, $to, $descr, $hours, $id ){

		$query = "INSERT INTO bo_usertime (ut_date, ut_from, ut_to, ut_description, ut_hours, user_id) VALUES ('".$date."', '".$from."', '".$to."', '".$descr."', '".$hours."', ".$id.")";
		// var_dump($query);
		$db = $this->setQuery( $query );

	}


	/**
	 * Löscht einen Eintrag für bestimmten User aus Datenbank
	 *
	 * @param int $id Id des Users
	 *
	 *		
	 * 		  
	 */
	public function deleteUserTime( $id ){

		$query = "DELETE FROM bo_usertime WHERE usertimeID = " . $id;
		// var_dump($query);
		$db = $this->setQuery( $query );

	}



}



?>



