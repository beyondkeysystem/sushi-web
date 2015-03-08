<?php
/** 
* @author David Curras
* @version Oct 6 2011
*/

class Email {

	/**
	 * Send a SMTP email
	 * @param {string} $name
	 * @param {string} $email
	 * @param {string} $message
	 * @param {string} $subject
	 */
	public static function Send($name, $email, $message, $subject=null) {
		$header = 'From: ' . $email . " \r\n";
		$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
		$header .= "Mime-Version: 1.0 \r\n";
		$header .= "Content-Type: text/plain";

		$body = "Este mensaje fue enviado por " . $name . "\r\n";
		$body .= "e-mail: " . $email . " \r\n";
		$body .= "Mensaje: " . $message . " \r\n";
		$body .= "Enviado el " . date('d/m/Y', time());

		if(empty($subject)) {
			$subject = 'Consulta de '.$name.' desde el Sitio Web';
		}
		
		return mail(EMAIL, $subject, $body, $header);
	}
}
