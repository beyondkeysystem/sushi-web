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
	$combo = $app->request->post();
	$invalids = validateCombo($combo);
	if(empty($invalids)) {
		$queryValues = array(
			'name'=>$combo['name'],
			'description'=>$combo['description'],
			'amount1'=>$combo['amount1'],
			'price1'=>$combo['price1'],
			'amount2'=>$combo['amount2'],
			'price2'=>$combo['price2'],
			'amount3'=>$combo['amount3'],
			'price3'=>$combo['price3'],
			'amount4'=>$combo['amount4'],
			'price4'=>$combo['price4']
		);
		$dbquery = $db->prepare('INSERT INTO combos(name, description, amount1, price1, amount2, price2, amount3, price3, amount4, price4) VALUES (:name, :description, :amount1, :price1, :amount2, :price2, :amount3, :price3, :amount4, :price4)');
		$success = $dbquery->execute($queryValues);
		$id = $db->lastInsertId();
		$ds = DIRECTORY_SEPARATOR;
		$fileName = str_pad($id, 5, '0', STR_PAD_LEFT).'.png';
		$dir = __DIR__ .$ds.'..'.$ds.'..'.$ds.'..'.$ds.'img'.$ds.'combos';
		if ($success && copy($dir.$ds.'00000.png', $dir.$ds.$fileName)) {
			$dbquery = $db->prepare('UPDATE combos SET image="/img/combos/'.$fileName.'" where id='.$id);
			$dbquery->execute();
			$combo['id'] = $id;
			$combo['image'] = '/img/combos/'.$fileName;
		}
		echoResponse(200, array('success'=>$success, 'combo'=>$combo));
	} else {
		$error = 'Unable to save combo with invalid params: '.join(', ', $invalids);
		echoResponse(400, null, array('error'=>$error, 'params'=>$combo));
	}
});

$app->put('/combo/:id',function($id) use($app, $db){
	Security::RestictedAccess('admin');
	$combo = $app->request->put();
	$invalids = validateCombo($combo);
	if(empty($invalids)) {
		$queryValues = array(
			'id'=>$id,
			'name'=>$combo['name'],
			'description'=>$combo['description'],
			'amount1'=>$combo['amount1'],
			'price1'=>$combo['price1'],
			'amount2'=>$combo['amount2'],
			'price2'=>$combo['price2'],
			'amount3'=>$combo['amount3'],
			'price3'=>$combo['price3'],
			'amount4'=>$combo['amount4'],
			'price4'=>$combo['price4']
		);
		$dbquery = $db->prepare('UPDATE combos SET name=:name, description=:description, amount1=:amount1, price1=:price1, amount2=:amount2, price2=:price2, amount3=:amount3, price3=:price3, amount4=:amount4, price4=:price4 where id=:id');
		$success = $dbquery->execute($queryValues);
		echoResponse(200, array('success'=>$success, 'combo'=>$combo));
	} else {
		$error = 'Unable to save combo with invalid params: '.join(', ', $invalids);
		echoResponse(400, null, array('error'=>$error, 'params'=>$combo));
	}
});

$app->delete('/combo/:id',function($id) use($app, $db){
	Security::RestictedAccess('admin');
	$dbquery = $db->prepare('UPDATE combos SET active=0 WHERE id=:id');
	$dbquery->execute(array('id'=>$id));
	echoResponse(200, array('success'=>true));
});

function validateCombo(&$combo) {
	$invalids = array();
	if(empty($combo['name']) || !Validation::string()->length(1, 255)->validate($combo['name'])) array_push($invalids, 'name');
	if(empty($combo['description']) || !Validation::string()->length(4, 1023)->validate($combo['description'])) array_push($invalids, 'description');
	if(empty($combo['price1']) || !Validation::float()->min(0, true)->validate($combo['price1'])) array_push($invalids, 'price1');
	if(empty($combo['amount1']) || !Validation::int()->min(1, true)->validate($combo['amount1'])) array_push($invalids, 'amount1');
	//check if combos 2, 3 or 4 are given
	if(!empty($combo['price2']) || !empty($combo['amount2']) || !empty($combo['price3']) || !empty($combo['amount3']) || !empty($combo['price4']) || !empty($combo['amount4'])) {
		if(empty($combo['price2']) || !Validation::float()->min(0, true)->validate($combo['price2'])) array_push($invalids, 'price2');
		if(empty($combo['amount2']) || !Validation::int()->min(1, true)->validate($combo['amount2'])) array_push($invalids, 'amount2');	
	} else {
		$combo['price2'] = $combo['amount2'] = null;
	}
	//check if combos 3 or 4 are given
	if(!empty($combo['price3']) || !empty($combo['amount3']) || !empty($combo['price4']) || !empty($combo['amount4'])) {
		if(empty($combo['price3']) || !Validation::float()->min(0, true)->validate($combo['price3'])) array_push($invalids, 'price3');
		if(empty($combo['amount3']) || !Validation::int()->min(1, true)->validate($combo['amount3'])) array_push($invalids, 'amount3');
	} else {
		$combo['price3'] = $combo['amount3'] = null;
	}
	//check if combo 4 is given
	if(!empty($combo['price4']) || !empty($combo['amount4'])) {
		if(empty($combo['price4']) || !Validation::float()->min(0, true)->validate($combo['price4'])) array_push($invalids, 'price4');
		if(empty($combo['amount4']) || !Validation::int()->min(1, true)->validate($combo['amount4'])) array_push($invalids, 'amount4');
	} else {
		$combo['price4'] = $combo['amount4'] = null;
	}
	return $invalids;
}
