<?php
/** 
* @author Web Design Rosario
* @version Oct 6 2011
*/

class Security
{
	/**
	 * Authenticates the user
	 *
	 * @param		User		$user
	 * @return		boolean  
	 */
	public static function Login($user){
		if (!isset($_SESSION)) {
			session_start();
		}
		$_SESSION['id'] = $user['id'];
		$_SESSION['first_name'] = $user['first_name'];
		$_SESSION['last_name'] = $user['last_name'];
		$_SESSION['email'] = $user['email'];
		$_SESSION['isLogged'] = true;
		return $_SESSION;
	}
	
	/**
	 *  Closes the session of the user
	 */
	public static function Logout(){
		if (!isset($_SESSION)) {
			session_start();
		}
		unset($_SESSION['id']);
		unset($_SESSION['first_name']);
		unset($_SESSION['last_name']);
		unset($_SESSION['email']);
		$_SESSION['isLogged'] = false;
		session_destroy();
	}


	/**
	 *  Gets the current session if exists
	 */
	public static function GetSession(){
		if (!isset($_SESSION)) {
			session_start();
		}
		return $_SESSION;
	}

	/**
	 *  Gets the current session if exists
	 */
	public static function RestictedAccess(){
		if (!isset($_SESSION)) {
			session_start();
		}
		if (!isset($_SESSION['isLogged']) || !$_SESSION['isLogged']){
			echoResponse(401);
		}
	}
}
