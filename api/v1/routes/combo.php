<?php

use Respect\Validation\Validator as Validation;

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

/**
 * @param {string} name 		Max length 255
 * @param {string} description 	Max length 1023
 * @param {string} image 		Max length 255
 * @param {int} amount1
 * @param {float} price1
 * @param {int} amount2
 * @param {float} price2
 * @param {int} amount3
 * @param {float} price3
 * @param {int} amount4
 * @param {float} price4
*/
$app->post('/combo',function() use($app, $db){
	Security::RestictedAccess('admin');
	$params = $app->request->post();
	$invalids = array();
	if(!isset($params['name']) || !Validation::string()->length(1, 255)->validate($params['name'])) array_push($invalids, 'name');
	if(!isset($params['description']) || !Validation::string()->length(4, 1023)->validate($params['description'])) array_push($invalids, 'description');
	if(!isset($params['image']) || !Validation::string()->length(1, 255)->validate($params['image'])) array_push($invalids, 'image');
	if(!isset($params['price1']) || !Validation::float()->min(0, true)->validate($params['price1'])) array_push($invalids, 'price1');
	if(!isset($params['amount1']) || !Validation::int()->min(1, true)->validate($params['amount1'])) array_push($invalids, 'amount1');
	if(!isset($params['price2']) || !Validation::float()->min(0, true)->validate($params['price2'])) array_push($invalids, 'price2');
	if(!isset($params['amount2']) || !Validation::int()->min(1, true)->validate($params['amount2'])) array_push($invalids, 'amount2');
	if(!isset($params['price3']) || !Validation::float()->min(0, true)->validate($params['price3'])) array_push($invalids, 'price3');
	if(!isset($params['amount3']) || !Validation::int()->min(1, true)->validate($params['amount3'])) array_push($invalids, 'amount3');
	if(!isset($params['price4']) || !Validation::float()->min(0, true)->validate($params['price4'])) array_push($invalids, 'price4');
	if(!isset($params['amount4']) || !Validation::int()->min(1, true)->validate($params['amount4'])) array_push($invalids, 'amount4');
	if(empty($invalids)) {
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
	} else {
		$error = 'Unable to save combo with invalid params: '.join(', ', $invalids);
		echoResponse(400, null, array('error'=>$error, 'params'=>$params));
	}
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
