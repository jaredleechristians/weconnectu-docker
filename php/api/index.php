<?php
require 'controllers/MessageController.php';

$requestPath = isset($_GET['path']) ? $_GET['path'] : '';
$requestMethod = $_SERVER['REQUEST_METHOD'];

$controller = new MessageController();

// handle cors
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

switch ($requestPath) {
    case 'message':
        if ($requestMethod === 'POST') {
            $controller->createMessage();
        } elseif ($requestMethod === 'GET') {
            $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
            $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
            $controller->getMessages();
        } else {
            header("HTTP/1.1 405 Method Not Allowed");
            echo json_encode(['error' => 'Method not allowed']);
        }
        break;
    default:
        header("HTTP/1.1 404 Not Found");
        echo json_encode(['error' => 'Endpoint not found']);
        break;
}
?>
