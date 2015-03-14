<?php

use Respect\Validation\Validator as Validation;

$app->get('/general', function() use($app, $db){
	$dbquery = $db->prepare("select * from general");
	$dbquery->execute();
	$data = $dbquery->fetchAll(PDO::FETCH_ASSOC);
	echoResponse(200, $data);
});

$app->put('/general/:id', function($id) use($app, $db){
	Security::RestictedAccess('admin');
	$params = $app->request->put();
	$invalids = array();
	if(!isset($params['name']) || !Validation::string()->length(null, 256)->validate($params['name'])) array_push($invalids, 'name');
	if(!isset($params['value']) || !Validation::string()->length(null, 256)->validate($params['value'])) array_push($invalids, 'value');
	if(empty($invalids)) {
		$queryValues = array(
			'id'=>$id,
			'name'=>$params['name'],
			'value'=>$params['value']
		);
		$dbquery = $db->prepare('UPDATE general SET name=:name, value=:value where id=:id');
		$success = $dbquery->execute($queryValues);
		echoResponse(200, array('success'=>$success));
	} else {
		$error = 'Unable to update table "General" with invalid params: '.join(', ', $invalids);
		echoResponse(400, null, array('error'=>$error, 'params'=>$params));
	}
});
