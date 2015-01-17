<?php

function echoResponse($code=200, $data=null, $error=null){
	$response = array(
		'status' => $code,
		'error' => $error
	);
	if ($code == 401) {
		header("HTTP/1.1 401 Unauthorized");
		$response['data'] = null;
	} elseif ($code == 404) {
		header("HTTP/1.1 404 Not Found");
		$response['data'] = null;
	} else {
		$response['data'] = $data;
	}
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($response);
	exit;
};
