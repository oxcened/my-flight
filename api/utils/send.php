<?php

function send($status, $message, $data = null) {
    http_response_code($status);
    echo json_encode([
       "status" => $status,
       "message" => $message,
       "data" => $data,
    ]);
}
