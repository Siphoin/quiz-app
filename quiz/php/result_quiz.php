
<?php
error_reporting(E_ERROR | E_PARSE);
session_start(['cookie_path' => '/']);

$data = new stdClass();

$data->correntCount = $_SESSION['countCorrentQuestions'];


$data_session = json_decode($_SESSION['data']);

$getedData = json_decode($data_session->data);

$data->title = $getedData->title;

$data->countQuestions = $_SESSION['countQuestions'];

$data->timer = $_SESSION['timer']->format('D M d Y H:i:s O');

echo json_encode($data);
?>