<?php

$app->get('/category', function() use($app, $db){
	$dbquery = $db->prepare("select * from categories where active=1");
	$dbquery->execute();
	$data = $dbquery->fetchAll(PDO::FETCH_ASSOC);
	echoResponse(200, $data);
});

$app->get('/category/:id',function($id) use($db){
	$dbquery = $db->prepare("select * from categories where id=:id AND active=1");
	$dbquery->execute(array('id'=>$id));
	$data = $dbquery->fetchAll(PDO::FETCH_ASSOC);
	if(empty($data)){
		echoResponse(404);
	} else {
		echoResponse(200, $data[0]);
	}
});

$app->get('/category/:param/:value',function($param, $id) use($db){
	$sql = sprintf('select * from categories where %s="%s" AND active=1', $param, $id);
	$dbquery = $db->prepare($sql);
	$dbquery->execute();
	$data = $dbquery->fetchAll(PDO::FETCH_ASSOC);
	if(empty($data)){
		echoResponse(404);
	} else {
		echoResponse(200, $data);
	}
});

$app->post('/category',function() use($app, $db){
	Security::RestictedAccess('admin');
	$params = $app->request->post();
	$queryValues = array(
		'name'=>$params['name'],
		'parent'=>$params['parent'],
		'description'=>$params['description'],
		'order'=>$params['order']
	);
	$dbquery = $db->prepare('INSERT INTO categories(name, parent, description, order) VALUES (:name, :parent, :description, :order)');
	$dbquery->execute($queryValues);
	echoResponse(200, array('success'=>$success));
});

$app->put('/category/:id',function($id) use($app, $db){
	Security::RestictedAccess('admin');
	$params = $app->request->put();
	$queryValues = array(
		'name'=>$params['name'],
		'parent'=>$params['parent'],
		'description'=>$params['description'],
		'order'=>$params['order']
	);
	$dbquery = $db->prepare('UPDATE categories SET name:=name, parent=:parent, description=:description, order=:order where id=:id');
	$dbquery->execute($queryValues);
	echoResponse(200, array('success'=>$success));
});

$app->delete('/category/:id',function($id) use($app, $db){
	Security::RestictedAccess('admin');
	$dbquery = $db->prepare('UPDATE categories SET active=0 WHERE id=:id');
	$dbquery->execute(array('id'=>$id));
	echoResponse(200, array('success'=>true));
});
