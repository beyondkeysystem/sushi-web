<?php

use Respect\Validation\Validator as Validation;

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

/**
 * @param {int} categoryId
 * @param {string} name 		Max length 255
 * @param {int} amount
 * @param {float} price
*/
$app->post('/product',function() use($app, $db){
	Security::RestictedAccess('admin');
	$product = $app->request->post();
	$invalids = validateProduct($product);
	if(empty($invalids)) {
		$queryValues = array(
			'categoryId'=>$product['categoryId'],
			'name'=>$product['name'],
			'amount'=>$product['amount'],
			'price'=>$product['price']
		);
		$dbquery = $db->prepare('INSERT INTO products(categoryId, name, amount, price) VALUES (:categoryId, :name, :amount, :price)');
		$success = $dbquery->execute($queryValues);
		$id = $db->lastInsertId();
		$ds = DIRECTORY_SEPARATOR;
		$fileName = str_pad($id, 5, '0', STR_PAD_LEFT).'.png';
		$dir = __DIR__ .$ds.'..'.$ds.'..'.$ds.'..'.$ds.'img'.$ds.'products';
		if ($success && copy($dir.$ds.'00000.png', $dir.$ds.$fileName)) {
			$dbquery = $db->prepare('UPDATE products SET image="/img/products/'.$fileName.'" where id='.$id);
			$dbquery->execute();
			$product['id'] = $id;
			$product['image'] = '/img/products/'.$fileName;
		}
		echoResponse(200, array('success'=>$success, 'product'=>$product));
	} else {
		$error = 'Unable to save product with invalid params: '.join(', ', $invalids);
		echoResponse(400, null, array('error'=>$error, 'params'=>$product));
	}
});

$app->put('/product/:id',function($id) use($app, $db){
	Security::RestictedAccess('admin');
	$product = $app->request->put();
	$invalids = validateProduct($product);
	if(empty($invalids)) {
		$queryValues = array(
			'categoryId'=>$product['categoryId'],
			'name'=>$product['name'],
			'amount'=>$product['amount'],
			'price'=>$product['price']
		);
		$dbquery = $db->prepare('UPDATE products SET categoryId=:categoryId, name:=name, amount:=amount, price=:price where id=:id');
		$success = $dbquery->execute($queryValues);
		echoResponse(200, array('success'=>$success, 'product'=>$product));
	} else {
		$error = 'Unable to save product with invalid params: '.join(', ', $invalids);
		echoResponse(400, null, array('error'=>$error, 'params'=>$product));
	}
});

$app->delete('/product/:id',function($id) use($app, $db){
	Security::RestictedAccess('admin');
	$dbquery = $db->prepare('UPDATE products SET active=0 WHERE id=:id');
	$dbquery->execute(array('id'=>$id));
	echoResponse(200, array('success'=>true));
});

function validateProduct(&$product) {
	$invalids = array();
	if(empty($product['name']) || !Validation::string()->length(1, 255)->validate($product['name'])) array_push($invalids, 'name');
	if(empty($product['price']) || !Validation::float()->min(0, true)->validate($product['price'])) array_push($invalids, 'price');
	if(empty($product['amount']) || !Validation::int()->min(1, true)->validate($product['amount'])) array_push($invalids, 'amount');
	if(empty($product['categoryId']) || !Validation::int()->max(10, true)->validate($product['categoryId'])) array_push($invalids, 'categoryId');
	return $invalids;
}
