<?php

$controller = require_once "controller.php";

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    case "GET":
        $controller->get_airports();
        break;
    default:
        $controller->method_not_allowed();
        break;
}
