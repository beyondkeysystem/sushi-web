<?php

use Respect\Validation\Validator as Validation;

/**
 * @param {string} phone 		Max length 15
 * @param {string} address 		Max length 50
 * @param {string} name 		Max length 50
 * @param {boolean} deliver 	"S" / "N"
 * @param {string} dateFrom 	"dd/MM/aaaa"
 * @param {string} timeFrom 	"HH:mm"
 * @param {string} datoTo 		"dd/MM/aaaa"
 * @param {string} timeTo 		"HH:mm"
 * @param {boolean} paid 		"S" / "N"
 * @param {number} plu 			Max length 6
 * @param {number} amount
*/

$app->post('/order',function() use($app) {
	Security::RestictedAccess();
	$params = $app->request->post();
	$isValid = Validation::string()->length(null, 15)->validate($params['phone']) &&
		Validation::string()->length(null, 50)->validate($params['address']) &&
		Validation::string()->length(null, 50)->validate($params['name']) &&
		Validation::bool()->validate($params['deliver']) &&
		Validation::date('H:i')->validate($params['dateFrom']) &&
		Validation::date('Y-m-d')->validate($params['timeFrom']) &&
		Validation::date('H:i')->validate($params['datoTo']) &&
		Validation::date('Y-m-d')->validate($params['timeTo']) &&
		Validation::bool()->validate($params['paid']) &&
		Validation::int()->max(999999)->validate($params['plu']) &&
		Validation::int()->validate($params['amount']);
	if($isValid) {
		$message = $params['phone'].'|'.$params['address'].'|'.$params['name'].'|';
		$message .= $params['deliver'] ? 'S' : 'N';
		$message .= $params['dateFrom'].'|'.$params['timeFrom'].'|'.$params['datoTo'].'|'.$params['timeTo'].'|';
		$message .= $params['paid'] ? 'S' : 'N';
		$message .= $params['plu'].'|'.$params['amount'];
		$success = File::Write($message);
		echoResponse(200, array('success'=>$success));
	} else {
		$error = 'Unable to write order with invalid params.';
		echoResponse(400, null, array('error'=>$error));
	}
});
