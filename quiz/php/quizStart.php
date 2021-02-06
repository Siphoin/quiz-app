<?php
function falledRequest()
{
    http_response_code(500);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
falledRequest();
}
$entityBody = file_get_contents('php://input');
ini_set('session.cookie_path', '/');
session_set_cookie_params(0);
session_start(['cookie_path' => '/']);
    $_SESSION['data'] = $entityBody;

        $data = json_decode($_SESSION['data']);

       $getedData = json_decode($data->data);
 
       $questions = (array)json_decode($getedData->questions);
       $_SESSION['countQuestions'] = count($questions);

    

    $_SESSION['countCorrentQuestions'] = 0;
    http_response_code(200);
?>