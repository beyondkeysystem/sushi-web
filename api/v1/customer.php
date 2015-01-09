<?php
$app->get('/customer', function() use($app, $db){
	$dbquery = $db->prepare("select * from customers");
	$dbquery->execute();
	$data["customers"] = $dbquery->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($data);
});

$app->get('/customer/:id',function($id) use($db){
	$dbquery = $db->prepare("select * from customers where uid=:id");
	$dbquery->execute(array('id'=>$id));
	$data["customer"] = $dbquery->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($data);
});

$app->get('/customer/:param/:value',function($param, $id) use($db){
	$sql = sprintf('select * from customers where %s="%s"', $param, $id);
	$dbquery = $db->prepare($sql);
	$dbquery->execute();
	$data["customer"] = $dbquery->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($data);
});

$app->post('/customer',function() use($app, $db){
	$allPostVars = $app->request->post();
	$dbquery = $db->prepare('INSERT INTO customers(name, email, phone, password, address, city) VALUES(:name, :email, :phone, :password, :address, :city)');
	$dbquery->execute(array('name'=>$allPostVars['name'], 'email'=>$allPostVars['email'], 'phone'=>$allPostVars['phone'], 'password'=>$allPostVars['password'], 'address'=>$allPostVars['address'], 'city'=>$allPostVars['city']));	
});

$app->put('/customer/:id',function($id) use($app, $db){
	$allPutVars = $app->request->put();
	$dbquery = $db->prepare('UPDATE customers SET name=:name, email=:email, phone=:phone, password=:password, address=:address, city=:city where uid=:id');
	$dbquery->execute(array('name'=>$allPutVars['name'], 'email'=>$allPutVars['email'], 'phone'=>$allPutVars['phone'], 'password'=>$allPutVars['password'], 'address'=>$allPutVars['address'], 'city'=>$allPutVars['city'], 'id'=>$id));	
});

$app->delete('/customer/:id',function($id) use($app, $db){
	$dbquery = $db->prepare('DELETE FROM customers WHERE uid=:id');
	$dbquery->execute(array('id'=>$id));	
});