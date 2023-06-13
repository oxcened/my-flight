<?php

require_once "../utils/base_controller.php";

class FlightsController extends BaseController
{
    function get_flights()
    {
        $code_departure = $_GET["departure"];
        $code_arrival = $_GET["arrival"];

        if (!$code_departure || !$code_arrival) {
            $this->send(
                400,
                "You must specify code_departure and code_arrival"
            );
        }

        # Query for either the cheapest direct flight or the cheapest two-flight combination
        $query = $this->db->prepare(
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

        $query->bind_param(
            "sssss",
            $code_arrival,
            $code_departure,
            $code_arrival,
            $code_departure,
            $code_arrival
        );

        $query->execute();

        $result = $query->get_result();
        $query->close();

        if (!$result) {
            $this->send(500, "Could not get flights");
        }

        if ($result->num_rows === 0) {
            $this->send(404, "No flight was found");
        }

        while ($row = $result->fetch_assoc()) {
            $this->send(200, "Success", $row);
        }
    }
}

return new FlightsController();
