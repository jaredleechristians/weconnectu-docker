<?php
require_once 'models/Message.php';

class MessageController
{
    private $messageModal;

    public function __construct()
    {
        $this->messageModal = new Message();
    }

    public function createMessage()
    {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);

        $name = $data['name'] ?? '';
        $email = $data['email'] ?? '';
        $phoneNumber = $data['phoneNumber'] ?? '';
        $message = $data['message'] ?? '';

        if (empty($name) || empty($email) || empty($phoneNumber)  || empty($message)){
            return $this->renderJson(['error' => 'All fields are required.'], 400);
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->renderJson(['error' => 'Invalid email address.'], 400);
        }

        if (!preg_match('/^(\+27|0)[6-8][0-9]{8}$/', $phoneNumber)) {
            return $this->renderJson(['error' => 'Invalid South African phone number.'], 400);
        }

        $messageId = $this->messageModal->createMessage($name, $email, $phoneNumber, $message);

        if ($messageId) {
            return $this->renderJson(['id' => $messageId,'success' => 'Message saved successfully.'], 201);
        } else {
            return $this->renderJson(['error' => 'Failed to save message.'], 500);
        }
    }

    public function getMessages()
    {
        
        $page = $_GET['page'] ?? 1;
        $limit = $_GET['limit'] ?? 10;

        $page = (int) $page;
        $limit = (int) $limit;

        $users = $this->messageModal->getMessages($page, $limit);
        return $this->renderJson($users);
    }

    private function renderJson($data, $statusCode = 200)
    {
        header("Content-Type: application/json");
        http_response_code($statusCode);
        echo json_encode($data);
    }
}
?>
