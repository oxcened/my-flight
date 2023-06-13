<?php

$db = require_once "../utils/db.php";
require_once "../utils/send.php";

$code_departure = $_GET["departure"];
$code_arrival = $_GET["arrival"];

if (!$code_departure || !$code_arrival) {
    send(400, "You must specify code_departure and code_arrival");
    $db->close();
}

# Query for either the cheapest direct flight or the cheapest two-flight combination
$query = $db->prepare(
    "
    SELECT
    a.code_departure AS first_departure,
    a.code_arrival AS first_arrival,
    a.price AS first_price,
    b.code_departure AS second_departure,
    b.code_arrival AS second_arrival,
    b.price AS second_price,
    a.price + COALESCE(b.price, 0) AS total_price
    FROM flight AS a LEFT JOIN flight AS b
    ON a.code_arrival = b.code_departure AND a.code_arrival != ?
    WHERE (a.code_departure = ? AND a.code_arrival = ?) OR (a.code_departure = ? AND b.code_arrival = ?)
    ORDER BY total_price LIMIT 1
    "
);

$query->bind_param("sssss", $code_arrival, $code_departure, $code_arrival, $code_departure, $code_arrival);
$query->execute();

$result = $query->get_result();
$query -> close();

if (!$result) {
    send(500, "Could not get flights");
    $db->close();
}

if ($result->num_rows === 0) {
    send(404, "No flight was found");
    $db->close();
}

while ($row = $result->fetch_assoc()) {
    send(200, "Success", $row);
}

$db->close();
