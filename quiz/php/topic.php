<?php

require "db.php";



$entityBody = file_get_contents('php://input');

try {
    $testJSONOBJ = json_decode($entityBody);
  echo  getTopicByIndex($testJSONOBJ->index);
} catch (\Throwable $th) {
    throw $th;
}
?>