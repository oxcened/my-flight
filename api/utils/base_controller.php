<?php

class BaseController
{
    public $db;

    function __construct()
    {
        $this->db = require_once "../utils/db.php";

        if ($this->db->connect_error) {
            $this->send(500, "Could not connect to database");
        }
    }

    function send($status, $message, $data = null)
    {
        http_response_code($status);

        echo json_encode([
            "status" => $status,
            "message" => $message,
            "data" => $data,
        ]);

        $this->db->close();
        exit();
    }

    function method_not_allowed()
    {
        $this->send(405, "Method not allowed");
    }
}
