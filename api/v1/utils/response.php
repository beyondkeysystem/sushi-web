<?php

function echoResponse($code=200, $data=null, $error=null){
	if ($code == 400) {
		header("HTTP/1.1 400 Bad Request");
		$data = $error;
	} elseif ($code == 401) {
		header("HTTP/1.1 401 Unauthorized");
		$data = $error;
	} elseif ($code == 404) {
		header("HTTP/1.1 404 Not Found");
		$data = $error;
	}
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($data);
	exit;
};
