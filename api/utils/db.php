<?php

require_once "db_config.php";

# Don't want to leak errors on the client for security
mysqli_report(MYSQLI_REPORT_OFF);

$db = new mysqli(DB_HOST, DB_USER, DB_PWD, DB_NAME);

return $db;
