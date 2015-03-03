<?php

require_once('../libs/Slim/Slim.php');
require_once('../libs/Slim/Middleware.php');
require_once('../libs/Respect/Validation/Validatable.php');
require_once('../libs/Respect/Validation/Rules/AbstractRule.php');
require_once('../libs/Respect/Validation/Rules/AbstractComposite.php');
require_once('../libs/Respect/Validation/Rules/AllOf.php');
require_once('../libs/Respect/Validation/Validator.php');
require_once('config/config.php');
require_once('utils/response.php');
require_once('utils/security.php');
require_once('utils/email.php');

use \Slim\Slim as Slim;

Slim::registerAutoloader();
$app = new Slim();
$db = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset=utf8', DB_USERNAME, DB_PASSWORD);
Security::SaveLastAccess();

require_once('routes/session.php');
require_once('routes/user.php');
require_once('routes/category.php');
require_once('routes/product.php');
require_once('routes/combo.php');
require_once('routes/message.php');

$app->run();
