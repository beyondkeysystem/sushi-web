<?php

$app->get('/general', function() use($app, $db){
	$dbquery = $db->prepare("select * from general");
	$dbquery->execute();
	$data = $dbquery->fetchAll(PDO::FETCH_ASSOC);
	echoResponse(200, $data);
});
