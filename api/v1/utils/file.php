<?php
/** 
* @author David Curras
* @version Oct 26 2014
*/

class File {

	/**
	 * Writes a message on a file location
	 */
	public static function Write($message, $fileName) {
		echo($fileName); die();
		$myfile = fopen('../../'.$fileName, 'a') or die("Unable to open file!");
		fwrite($myfile, $message);
		fclose($myfile);
		return true;
	}

}
