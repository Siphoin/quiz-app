<?php
session_start(['cookie_path' => '/']);


$countCorrentVariants = $_SESSION['countCorrentQuestions'];


error_reporting(E_ERROR | E_PARSE);

function falledRequest()
{
    http_response_code(500);
    exit();
}
$entityBody = file_get_contents('php://input');
$obj = json_decode($entityBody);

$lastData = json_decode($_SESSION['data']);

$getedData = json_decode($lastData->data);
 
$questions = (array)json_decode($getedData->questions);


array_splice($questions, $obj->index, 1);


$newData = $getedData;

$newData->questions = json_encode($questions);

$newDataJSON = new stdClass();

$newDataJSON->data = json_encode($newData);

$_SESSION['data'] = json_encode($newDataJSON);


if ($obj->corrent) {
  $countCorrentVariants++;
}


if ($countCorrentVariants <= 0) {
returnCorrentToNull();
}

$_SESSION['countCorrentQuestions'] = $countCorrentVariants;

echo $countCorrentVariants;
function returnCorrentToNull()
{
  $countCorrentVariants = 0;
}


 
?>