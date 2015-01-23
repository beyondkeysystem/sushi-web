<?php

$app->get('/user', function() use($app, $db){
	Security::RestictedAccess();
	$dbquery = $db->prepare("select * from customers where active=1");
	$dbquery->execute();
	$data = $dbquery->fetchAll(PDO::FETCH_ASSOC);
	echoResponse(200, $data);
});

$app->get('/user/:id',function($id) use($db){
	Security::RestictedAccess();
	$dbquery = $db->prepare("select * from customers where id=:id AND active=1");
	$dbquery->execute(array('id'=>$id));
	$data = $dbquery->fetchAll(PDO::FETCH_ASSOC);
	if(empty($data)){
		echoResponse(404);
	} else {
		echoResponse(200, $data[0]);
	}
});

$app->get('/user/:param/:value',function($param, $id) use($db){
	Security::RestictedAccess();
	$sql = sprintf('select * from customers where %s="%s" AND active=1', $param, $id);
	$dbquery = $db->prepare($sql);
	$dbquery->execute();
	$data = $dbquery->fetchAll(PDO::FETCH_ASSOC);
	if(empty($data)){
		echoResponse(404);
	} else {
		echoResponse(200, $data);
	}
});

$app->post('/user',function() use($app, $db){
	Security::RestictedAccess();
	$params = $app->request->post();
	$queryValues = array(
		'firstName'=>$params['firstName'],
		'lastName'=>$params['lastName'],
		'email'=>$params['email'],
		'address'=>$params['address'],
		'phone'=>$params['phone'],
		'password'=>$params['password'],
		'isAdmin'=>$params['isAdmin']
	);
	$dbquery = $db->prepare('INSERT INTO customers(firstName, lastName, email, address, phone, password, isAdmin) VALUES (:firstName, :lastName, :email, :address, :phone, :password, :isAdmin)');
	$dbquery->execute($queryValues);
	$session = Security::Login($queryValues);
	echoResponse(200, $session);
});

$app->put('/user/:id',function($id) use($app, $db){
	Security::RestictedAccess('admin');
	$params = $app->request->put();
	$queryValues = array(
		'firstName'=>$params['firstName'],
		'lastName'=>$params['lastName'],
		'email'=>$params['email'],
		'address'=>$params['address'],
		'phone'=>$params['phone'],
		'password'=>$params['password'],
		'isAdmin'=>$params['isAdmin']
	);
	$dbquery = $db->prepare('UPDATE customers SET firstName=:firstName, lastName:=lastName, email=:email, address=:address, phone=:phone, password=:password, isAdmin=:isAdmin where id=:id');
	$success = $dbquery->execute($queryValues);
	echoResponse(200, array('success'=>$success));
});

$app->delete('/user/:id',function($id) use($app, $db){
	Security::RestictedAccess('admin');
	$dbquery = $db->prepare('UPDATE customers SET active=0 WHERE id=:id');
	$dbquery->execute(array('id'=>$id));
	echoResponse(200, array('success'=>true));
});
