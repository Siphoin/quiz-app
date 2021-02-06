<?php

require "db.php";

error_reporting(E_ERROR | E_PARSE);

$entityBody = file_get_contents('php://input');

try {
    $testJSONOBJ = json_decode($entityBody);
echo  createQuestrions($entityBody);
  http_response_code(200);
} catch (\Throwable $th) {
    throw $th;
}
?>