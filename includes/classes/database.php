<?php
/*
* Mysql database class - only one connection alowed
*/
class Database {
	private $_connection;
	private static $_instance; //The single instance
	private $_result;

	private $_host = "DB_HOST";
	private $_username = "DB_USER";
	private $_password = "DB_PASS";
	private $_database = "DB_NAME"; 

	/*
	Get an instance of the Database
	@return Instance
	*/
	public static function getInstance() {
		if(!self::$_instance) { // If no instance then make one
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	// Constructor
	private function __construct() {

		$this->_connection = new mysqli($this->_host, $this->_username, $this->_password, $this->_database);

	}

	// Magic method clone is empty to prevent duplication of connection
	private function __clone() { }


	// Get mysqli connection
	public function getConnection() {
		return $this->_connection;
	}
	
}
?>