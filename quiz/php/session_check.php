<?php
$response =  new stdClass();
$response->status = isset($_COOKIE["PHPSESSID"]);

echo json_encode($response);
?>