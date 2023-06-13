<?php

require_once "send.php";

# Don't want to leak errors on the client for security
mysqli_report(MYSQLI_REPORT_OFF);

$db = new mysqli("localhost", "root", "", "myflight");

if ($db->connect_error) {
    send(500, "Could not connect to database");
}

return $db;
