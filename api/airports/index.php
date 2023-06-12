<?php

$db = require "../db.php";

$result = $db->query("SELECT id, name, code FROM airport");

$rows = array();

while($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

echo json_encode(["status" => 200, "message" => "Success", "data" => $rows]);

$db->close();
