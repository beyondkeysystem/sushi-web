<?php

$app->get('/customer', function() use($app, $db){
	Security::RestictedAccess();
	$dbquery = $db->prepare("select * from customers");
	$dbquery->execute();
	$data = $dbquery->fetchAll(PDO::FETCH_ASSOC);
	echoResponse(200, $data);
});

$app->get('/customer/:id',function($id) use($db){
	Security::RestictedAccess();
	$dbquery = $db->prepare("select * from customers where id=:id");
	$dbquery->execute(array('id'=>$id));
	$data = $dbquery->fetchAll(PDO::FETCH_ASSOC);
	if(empty($data)){
		echoResponse(404);
	} else {
		echoResponse(200, $data[0]);
	}
});

$app->get('/customer/:param/:value',function($param, $id) use($db){
	Security::RestictedAccess();
	$sql = sprintf('select * from customers where %s="%s"', $param, $id);
	$dbquery = $db->prepare($sql);
	$dbquery->execute();
	$data = $dbquery->fetchAll(PDO::FETCH_ASSOC);
	if(empty($data)){
		echoResponse(404);
	} else {
		echoResponse(200, $data);
	}
});

$app->post('/customer',function() use($app, $db){
	Security::RestictedAccess();
	$params = $app->request->post();
	$queryValues = array(
		'first_name'=>$params['first_name'],
		'last_name'=>$params['last_name'],
		'email'=>$params['email'],
		'password'=>$params['password'],
		'is_admin'=>$params['is_admin'],
		'address'=>$params['address'],
		'phone'=>$params['phone']
	);
	$dbquery = $db->prepare('INSERT INTO customers(name, email, phone, password, address) VALUES(:name, :email, :phone, :password, :address,)');
	$dbquery->execute($queryValues);
	echoResponse(200, array('success'=>true));
});

$app->put('/customer/:id',function($id) use($app, $db){
	Security::RestictedAccess();
	$params = $app->request->put();
	$queryValues = array(
		'first_name'=>$params['first_name'],
		'last_name'=>$params['last_name'],
		'email'=>$params['email'],
		'password'=>$params['password'],
		'is_admin'=>$params['is_admin'],
		'address'=>$params['address'],
		'phone'=>$params['phone']
	);
	$dbquery = $db->prepare('UPDATE customers SET name=:name, email=:email, phone=:phone, password=:password, address=:address, city=:city where id=:id');
	$dbquery->execute($queryValues);
	echoResponse(200, array('success'=>true));
});

$app->delete('/customer/:id',function($id) use($app, $db){
	Security::RestictedAccess();
	$dbquery = $db->prepare('DELETE FROM customers WHERE id=:id');
	$dbquery->execute(array('id'=>$id));
	echoResponse(200, array('success'=>true));
});
