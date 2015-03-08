<?php
/** 
* @author David Curras
* @version Oct 26 2014
*/

class File {

	/**
	 * Writes a message on a file location
	 */
	public static function Write() {
		$myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
		$txt = "John Doe\n";
		fwrite($myfile, $txt);
		$txt = "Jane Doe\n";
		fwrite($myfile, $txt);
		fclose($myfile);
	}

}
