<?php

use Respect\Validation\Validator as Validation;

$app->get('/order', function() use($app, $db){
	$dbquery = $db->prepare("select * from orders where active=1");
	$dbquery->execute();
	$data = $dbquery->fetchAll(PDO::FETCH_ASSOC);
	echoResponse(200, $data);
});

$app->get('/order/:id/detail',function($id) use($db){
	$query = 'select p.*, c.image as category from `order-item` oi ';
	$query .= 'join products p on oi.productId = p.id ';
	$query .= 'join categories c on p.categoryId = c.id ';
	$query .= 'where orderId=:id';
	$dbquery = $db->prepare($query);
	$dbquery->execute(array('id'=>$id));
	$data = $dbquery->fetchAll(PDO::FETCH_ASSOC);
	echoResponse(200, $data);
});

/**
 * @param {string} phone 		Max length 15
 * @param {string} address 		Max length 50
 * @param {string} name 		Max length 50
 * @param {boolean} deliver 	"S" / "N"
 * @param {string} dateFrom 	"dd/MM/aaaa"
 * @param {string} timeFrom 	"HH:mm"
 * @param {string} datoTo 		"dd/MM/aaaa"
 * @param {string} timeTo 		"HH:mm"
 * @param {boolean} paid 		"S" / "N"
 * @param {number} plu 			Max length 6
 * @param {number} amount
*/
$app->post('/order',function() use($app, $db) {
	Security::RestictedAccess();
	$params = $app->request->post();
	$invalids = array();
	if(!isset($params['userId']) || !Validation::int()->min(0, true)->validate($params['userId'])) array_push($invalids, 'userId');
	if(!isset($params['name']) || !Validation::string()->length(null, 50)->validate($params['name'])) array_push($invalids, 'name');
	if(!isset($params['phone']) || !Validation::string()->length(null, 15)->validate($params['phone'])) array_push($invalids, 'phone');
	if(!isset($params['address']) || !Validation::string()->length(null, 50)->validate($params['address'])) array_push($invalids, 'address');
	if(!isset($params['deliver']) || !Validation::int()->min(0, true)->max(1, true)->validate($params['deliver'])) array_push($invalids, 'deliver');
	if(!isset($params['timeFrom']) || !Validation::date('H:i')->validate($params['timeFrom'])) array_push($invalids, 'timeFrom');
	if(!isset($params['timeTo']) || !Validation::date('H:i')->validate($params['timeTo'])) array_push($invalids, 'timeTo');
	if(!isset($params['paid']) || !Validation::int()->min(0, true)->max(1, true)->validate($params['paid'])) array_push($invalids, 'paid');
	if(!isset($params['items']) || !Validation::arr()->length(1, null)->validate($params['items'])) array_push($invalids, 'items');
	foreach ($params['items'] as $index => $product) {
		if(!isset($product['productId']) || !Validation::int()->min(0, true)->validate($product['productId'])) array_push($invalids, 'productId-'.$index);
		if(!isset($product['plu']) || !Validation::int()->max(999999)->validate($product['plu'])) array_push($invalids, 'plu-'.$index);
		if(!isset($product['amount']) || !Validation::int()->validate($product['amount'])) array_push($invalids, 'amount-'.$index);
	}
	if(empty($invalids)) {
		$queryValues = array(
			'userId'=>$params['userId'],
			'name'=>$params['name'],
			'phone'=>$params['phone'],
			'address'=>$params['address'],
			'dateFrom'=>date('Y-m-d'),
			'timeFrom'=>$params['timeFrom'],
			'dateTo'=>date('Y-m-d'),
			'timeTo'=>$params['timeTo'],
			'paid'=>$params['paid'],
			'deliver'=>$params['deliver'],
			'src'=>'orders/'.date('Y-m-d-H-i-U').'.txt'
		);
		$dbquery = $db->prepare('INSERT INTO orders(userId, name, phone, address, dateFrom, timeFrom, dateTo, timeTo, paid, deliver, src) VALUES (:userId, :name, :phone, :address, :dateFrom, :timeFrom, :dateTo, :timeTo, :paid, :deliver, :src)');
		$success = $dbquery->execute($queryValues);
		$orderId = $db->lastInsertId();
		foreach ($params['items'] as $index => $product) {
			$subQueryValues = array(
				'orderId'=>$orderId,
				'productId'=>$product['productId'],
				'amount'=>$product['amount']
			);
			$dbquery = $db->prepare('INSERT INTO `order-item`(orderId, productId, amount) VALUES (:orderId, :productId, :amount)');
			$success = $dbquery->execute($subQueryValues);
			/*
			$message = $queryValues['phone'].'|'.$queryValues['address'].'|'.$queryValues['name'].'|';
			$message .= $queryValues['deliver'] ? 'S|' : 'N|';
			$message .= $queryValues['dateFrom'].'|'.$queryValues['timeFrom'].'|'.$queryValues['dateTo'].'|'.$queryValues['timeTo'].'|';
			$message .= $queryValues['paid'] ? 'S|' : 'N|';
			$message .= $product['plu'].'|'.$product['amount']."\n";
			$success = File::Write($message, $queryValues['src']);
			*/
		}
		echoResponse(200, array('success'=>$success));
	} else {
		$error = 'Unable to write order with invalid params: '.join(', ', $invalids);
		echoResponse(400, null, array('error'=>$error, 'params'=>$params));
	}
});
