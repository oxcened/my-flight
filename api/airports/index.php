<?php

$db = require_once "../utils/db.php";
require_once "../utils/send.php";

$result = $db->query("SELECT id, name, code FROM airport");

if (!$result) {
    send(500, "Could not get airports");
    $db->close();
}

$rows = array();

while($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

send(200, "Success", $rows);

$db->close();
