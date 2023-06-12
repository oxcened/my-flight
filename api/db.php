<?php

# Set your own local mysql configuration
$db = new mysqli("localhost", "root", "", "myflight");

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

return $db;
