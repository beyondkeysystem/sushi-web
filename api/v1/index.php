<?php
require '../libs/Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$db = new PDO('mysql:host=localhost;dbname=sushiweb;charset=utf8','root','');

require 'customer.php';

$app->run();
