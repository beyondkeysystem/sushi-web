<?php

$app->get('/customer/session', function() use($app, $db){
	Security::RestictedAccess();
	echoResponse(200, Security::GetSession());
});

$app->post('/customer/session',function() use($app, $db){
	$params = $app->request->post();
	$queryValues = array(
		'email'=>$params['email'],
		'password'=>$params['password']
	);
	$dbquery = $db->prepare("select * from customers where email=:email AND password=:password");
	$dbquery->execute($queryValues);
	$data = $dbquery->fetchAll(PDO::FETCH_ASSOC);
	if(empty($data)){
		echoResponse(401, '', array('message' => 'Invalid email or password'));
	} else {
		$session = Security::Login($data[0]);
		echoResponse(200, $session);
	}
});

$app->delete('/customer/session',function() use($app, $db){
	$session = Security::Logout();
});
