<?php

$app->get('/product', function() use($app, $db){
	$dbquery = $db->prepare("select * from products where active=1");
	$dbquery->execute();
	$data = $dbquery->fetchAll(PDO::FETCH_ASSOC);
	echoResponse(200, $data);
});

$app->get('/product/:id',function($id) use($db){
	$dbquery = $db->prepare("select * from products where id=:id AND active=1");
	$dbquery->execute(array('id'=>$id));
	$data = $dbquery->fetchAll(PDO::FETCH_ASSOC);
	if(empty($data)) {
		echoResponse(200, null);
	} else {
		echoResponse(200, $data[0]);
	}
});

$app->get('/product/:param/:value',function($param, $id) use($db){
	$sql = sprintf('select * from products where %s="%s" AND active=1', $param, $id);
	$dbquery = $db->prepare($sql);
	$dbquery->execute();
	$data = $dbquery->fetchAll(PDO::FETCH_ASSOC);
	if(empty($data)){
		echoResponse(200, array());
	} else {
		echoResponse(200, $data);
	}
});

$app->post('/product',function() use($app, $db){
	Security::RestictedAccess('admin');
	$params = $app->request->post();
	$queryValues = array(
		'categoryId'=>$params['categoryId'],
		'name'=>$params['name'],
		'plu'=>$params['plu'],
		'description'=>$params['description'],
		'image'=>$params['image'],
		'amount'=>$params['amount'],
		'price'=>$params['price']
	);
	$dbquery = $db->prepare('INSERT INTO products(categoryId, name, plu, description, image, amount, price) VALUES (:categoryId, :name, :plu, :description, :image, :amount, :price)');
	$success = $dbquery->execute($queryValues);
	echoResponse(200, array('success'=>$success));
});

$app->put('/product/:id',function($id) use($app, $db){
	Security::RestictedAccess('admin');
	$params = $app->request->put();
	$queryValues = array(
		'categoryId'=>$params['categoryId'],
		'name'=>$params['name'],
		'plu'=>$params['plu'],
		'description'=>$params['description'],
		'image'=>$params['image'],
		'amount'=>$params['amount'],
		'price'=>$params['price']
	);
	$dbquery = $db->prepare('UPDATE products SET categoryId=:categoryId, name:=name, plu:=plu, description=:description, image=:image, amount:=amount, price=:price where id=:id');
	$dbquery->execute($queryValues);
	echoResponse(200, array('success'=>$success));
});

$app->delete('/product/:id',function($id) use($app, $db){
	Security::RestictedAccess('admin');
	$dbquery = $db->prepare('UPDATE products SET active=0 WHERE id=:id');
	$dbquery->execute(array('id'=>$id));
	echoResponse(200, array('success'=>true));
});
