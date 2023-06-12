<?php

$db = require "../db.php";

$code_departure = $_GET["departure"];
$code_arrival = $_GET["arrival"];

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
    FROM flight AS a LEFT JOIN flight AS b ON a.code_arrival = b.code_departure
    WHERE (a.code_departure = ? AND a.code_arrival = ?) OR (a.code_departure = ? AND b.code_arrival = ?)
    ORDER BY total_price LIMIT 1
    "
);

$query->bind_param("ssss", $code_departure, $code_arrival, $code_departure, $code_arrival);
$query->execute();
$result = $query->get_result();
$query -> close();

if ($result->num_rows === 0) {
    var_dump(http_response_code(404));
    echo json_encode([
        "status" => 404,
        "message" => "No flight was found",
        "payload" => null,
    ]);
}

while ($row = $result->fetch_assoc()) {
    echo json_encode(["status" => 200, "message" => "Success", "data" => $row]);
}

$db->close();
