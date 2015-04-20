<?php

$app->get('/article', function() use($app, $db){
	$dbquery = $db->prepare("select * from articles");
	$dbquery->execute();
	$data = $dbquery->fetchAll(PDO::FETCH_ASSOC);
	echoResponse(200, $data);
});