<?php

require_once('../libs/Slim/Slim.php');
require_once('../libs/Slim/Middleware.php');
require_once('config/config.php');
require_once('utils/response.php');
require_once('utils/security.php');

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$db = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset=utf8', DB_USERNAME, DB_PASSWORD);
Security::SaveLastAccess();

require_once('routes/session.php');
require_once('routes/user.php');

$app->run();
