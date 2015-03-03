<?php

use Respect\Validation\Validator as Validation;

$app->post('/message',function() use($app){
	$params = $app->request->post();
	$isValidName = Validation::string()->notEmpty()->validate($params['name']);
	$isValidEmail = Validation::email()->validate($params['email']);
	$isValidMessage = Validation::string()->notEmpty()->validate($params['message']);
	if($isValidName && $isValidEmail && $isValidMessage) {
		$success = Email::Send($params['name'], $params['email'], $params['message']);
		echoResponse(200, array('success'=>$success));
	} else {
		$error = 'Unable to deliver message with invalid params "name", "email" and "message".';
		echoResponse(400, null, array('error'=>$error));
	}
});
