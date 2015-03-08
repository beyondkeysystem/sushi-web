<?php

use Respect\Validation\Validator as Validation;

$app->post('/message',function() use($app){
	$params = $app->request->post();
	$name = empty($params['name']) ? '' : $params['name'];
	$email = empty($params['email']) ? '' : $params['email'];
	$message = empty($params['message']) ? '' : $params['message'];
	$subject = empty($params['subject']) ? '' : $params['subject'];
	$isValidName = Validation::string()->notEmpty()->validate($name);
	$isValidEmail = Validation::email()->validate($email);
	$isValidMessage = Validation::string()->notEmpty()->validate($message);
	if($isValidName && $isValidEmail && $isValidMessage) {
		$success = Email::Send($name, $email, $message, $subject);
		echoResponse(200, array('success'=>$success));
	} else {
		$error = 'Unable to deliver message with invalid param';
		if(!$isValidName) {
			$error .= ' name="'.$name.'"';
		}
		if(!$isValidEmail) {
			$error .= ' email="'.$email.'"';
		}
		if(!$isValidMessage) {
			$error .= ' message="'.$message.'"';
		}
		echoResponse(400, null, array('error'=>$error, 'post'=>$params));
	}
});
