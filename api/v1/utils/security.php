<?php
/** 
* @author Web Design Rosario
* @version Oct 6 2011
*/

class Security {

	/**
	 * Starts the session and saves the 
	 * last access for the current user.
	 * Logs out the user if session has expired.
	 */
	public static function SaveLastAccess(){
		if (!isset($_SESSION)) {
			session_start();
		}
		if (isset($_SESSION['isLogged']) && $_SESSION['isLogged']){
			$now = time();
			if($now - $_SESSION['expires'] > TIMEOUT){
				self::Logout();
			} else {
				$_SESSION['expires'] = time() + TIMEOUT;
			}
		}
		return $_SESSION;
	}

	/**
	 * Authenticates the user
	 *
	 * @param		User		$user
	 * @return		boolean  
	 */
	public static function Login($user){
		$_SESSION['id'] = $user['id'];
		$_SESSION['firstName'] = $user['firstName'];
		$_SESSION['lastName'] = $user['lastName'];
		$_SESSION['email'] = $user['email'];
		$_SESSION['phone'] = $user['phone'];
		$_SESSION['address'] = $user['address'];
		$_SESSION['isAdmin'] = $user['isAdmin'];
		$_SESSION['isLogged'] = true;
		$_SESSION['expires'] = time() + TIMEOUT;
		return $_SESSION;
	}
	
	/**
	 *  Closes the session of the user
	 */
	public static function Logout(){
		unset($_SESSION['id']);
		unset($_SESSION['firstName']);
		unset($_SESSION['lastName']);
		unset($_SESSION['email']);
		unset($_SESSION['phone']);
		unset($_SESSION['address']);
		unset($_SESSION['isAdmin']);
		unset($_SESSION['isLogged']);
		unset($_SESSION['expires']);
		session_destroy();
	}


	/**
	 *  Gets the current session if exists
	 */
	public static function GetSession(){
		return $_SESSION;
	}

	/**
	 *  Gets the current session if exists
	 */
	public static function RestictedAccess($level=false){
		if (!isset($_SESSION['isLogged']) || !$_SESSION['isLogged']){
			echoResponse(401);
		}
		//TODO: change hardcoded level name
		if($level === 'admin' && !$_SESSION['isAdmin']){
			echoResponse(401);
		}
	}
}
