<?php

$app->get('/combo', function() use($app, $db){
	$dbquery = $db->prepare("select * from combos where active=1");
	$dbquery->execute();
	$data = $dbquery->fetchAll(PDO::FETCH_ASSOC);
	echoResponse(200, $data);
});

$app->get('/combo/:id',function($id) use($db){
	$dbquery = $db->prepare("select * from combos where id=:id AND active=1");
	$dbquery->execute(array('id'=>$id));
	$data = $dbquery->fetchAll(PDO::FETCH_ASSOC);
	if(empty($data)){
		echoResponse(404);
	} else {
		echoResponse(200, $data[0]);
	}
});

$app->get('/combo/:param/:value',function($param, $id) use($db){
	$sql = sprintf('select * from combos where %s="%s" AND active=1', $param, $id);
	$dbquery = $db->prepare($sql);
	$dbquery->execute();
	$data = $dbquery->fetchAll(PDO::FETCH_ASSOC);
	if(empty($data)){
		echoResponse(404);
	} else {
		echoResponse(200, $data);
	}
});

$app->post('/combo',function() use($app, $db){
	Security::RestictedAccess('admin');
	$params = $app->request->post();
	$queryValues = array(
		'name'=>$params['name'],
		'description'=>$params['description'],
		'image'=>$params['image'],
		'amount1'=>$params['amount1'],
		'price1'=>$params['price1'],
		'amount2'=>$params['amount2'],
		'price2'=>$params['price2'],
		'amount3'=>$params['amount3'],
		'price3'=>$params['price3'],
		'amount4'=>$params['amount4'],
		'price4'=>$params['price4']
	);
	$dbquery = $db->prepare('INSERT INTO combos(name, description, image, amount1, price1, amount2, price2, amount3, price3, amount4, price4) VALUES (:name, :description, :image, :amount1, :price1, :amount2, :price2, :amount3, :price3, :amount4, :price4)');
	$success = $dbquery->execute($queryValues);
	echoResponse(200, array('success'=>$success));
});

$app->put('/combo/:id',function($id) use($app, $db){
	Security::RestictedAccess('admin');
	$params = $app->request->put();
	$queryValues = array(
		'name'=>$params['name'],
		'description'=>$params['description'],
		'image'=>$params['image'],
		'amount1'=>$params['amount1'],
		'price1'=>$params['price1'],
		'amount2'=>$params['amount2'],
		'price2'=>$params['price2'],
		'amount3'=>$params['amount3'],
		'price3'=>$params['price3'],
		'amount4'=>$params['amount4'],
		'price4'=>$params['price4']
	);
	$dbquery = $db->prepare('UPDATE combos SET name:=name, description=:description, image=:image, amount1:=amount1, price1=:price1, amount2:=amount2, price2=:price2, amount3:=amount3, price3=:price3, amount4:=amount4, price4=:price4 where id=:id');
	$dbquery->execute($queryValues);
	echoResponse(200, array('success'=>$success));
});

$app->delete('/combo/:id',function($id) use($app, $db){
	Security::RestictedAccess('admin');
	$dbquery = $db->prepare('UPDATE combos SET active=0 WHERE id=:id');
	$dbquery->execute(array('id'=>$id));
	echoResponse(200, array('success'=>true));
});
