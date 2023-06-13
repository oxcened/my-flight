<?php

require_once "../utils/base_controller.php";

class AirportsController extends BaseController
{
    function get_airports()
    {
        $result = $this->db->query("SELECT id, name, code FROM airport");

        if (!$result) {
            send(500, "Could not get airports");
        }

        $rows = [];

        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }

        $this->send(200, "Success", $rows);
    }
}

return new AirportsController();
