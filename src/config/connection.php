<?php
require_once __DIR__ . '../config.php';

$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
if($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
