<?php

use Respect\Validation\Validator as Validation;

$app->post('/upload/image/:table', function($table) use($app, $db){
	$success = false;
	$params = $app->request->post();
	$flowData = parseFlowData($params);
	if (!file_exists($flowData['location']['dir'])) {
		mkdir($flowData['location']['dir']);
	}
	if (!file_exists($flowData['location']['dir'].DIRECTORY_SEPARATOR.'old')) {
		mkdir($flowData['location']['dir'].DIRECTORY_SEPARATOR.'old');
	}
	if ($flowData['location']['file']) {
		copy($flowData['location']['file'], $flowData['location']['backup']);
	}
	if (move_uploaded_file($flowData['location']['temp'], $flowData['location']['file']) === true) {
		$success = true;
	}
	$data = array(
		'success' => $success,
		'files' => $_FILES,
		'post' => $params,
		'flowData' => $flowData
	);
	echoResponse(200, array('params'=>$data));
});

function parseFlowData($flowData) {
	$ds = DIRECTORY_SEPARATOR;
	$flowIdData = explode('--data--', $flowData['flowIdentifier']);
	$idData = explode('--', $flowIdData[1]);
	$table = $idData[0];
	$id = $idData[1];
	$size = $_FILES['file']['size'];
	$name = $flowIdData[0];
	$ext = substr($flowData['flowRelativePath'], strrpos($flowData['flowRelativePath'], '.') + 1);
	$temp = $_FILES['file']['tmp_name'];
	$dir = __DIR__ .$ds.'..'.$ds.'..'.$ds.'..'.$ds.'img'.$ds.$table;
	$file = $dir . $ds . str_pad($id, 5, '0', STR_PAD_LEFT).'.'.$ext;
	$backup = $dir . $ds . 'old' . $ds . str_pad($id, 5, '0', STR_PAD_LEFT).'-'.time().'.'.$ext;
	return array(
		'location' => array(
			'dir' => $dir,
			'file' => $file,
			'backup' => $backup,
			'temp' => $temp
		),
		'table' => $table,
		'id' => $id,
		'file' => array(
			'name' => $name,
			'size' => $size,
			'ext' => $ext
		)
	);
}
