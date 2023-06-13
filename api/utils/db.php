<?php

# Don't want to leak errors on the client for security
mysqli_report(MYSQLI_REPORT_OFF);

$db = new mysqli("localhost", "root", "", "myflight");

return $db;
