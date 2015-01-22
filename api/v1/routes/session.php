<?php

$app->get('/user/session', function() use($app, $db){
	echoResponse(200, Security::GetSession());
});

$app->get('/user/session/expiration', function() use($app, $db){
	Security::RestictedAccess();
	echoResponse(200, Security::GetSession()['expires']);
});

$app->post('/user/session',function() use($app, $db){
	$params = $app->request->post();
	$queryValues = array(
		'email'=>$params['email'],
		'password'=>$params['password']
	);
	$dbquery = $db->prepare("select * from customers where email=:email AND password=:password");
	$dbquery->execute($queryValues);
	$data = $dbquery->fetchAll(PDO::FETCH_ASSOC);
	if(empty($data)){
		echoResponse(200);
	} else {
		$session = Security::Login($data[0]);
		echoResponse(200, $session);
	}
});

$app->delete('/user/session',function() use($app, $db){
	Security::RestictedAccess();
	$session = Security::Logout();
});
