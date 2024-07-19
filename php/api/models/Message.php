<?php
require_once 'config/Database.php';

class Message
{
    private $pdo;

    public function __construct()
    {
        $database = new Database();
        $this->pdo = $database->getConnection();
    }

    public function createMessage($name, $email, $phoneNumber, $message)
    {
        $stmt = $this->pdo->prepare("INSERT INTO message (name, email, phoneNumber,message) VALUES (:name, :email, :phoneNumber, :message)");
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':phoneNumber', $phoneNumber);
        $stmt->bindParam(':message', $message);
        $stmt->execute();

        return $this->pdo->lastInsertId();
    }

    public function getMessages($page, $limit)
    {
        $offset = ($page - 1) * $limit;
        $stmt = $this->pdo->prepare("SELECT id, name, email, phoneNumber, message FROM message LIMIT :limit OFFSET :offset");
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Get total count of users for pagination metadata
        $totalUsersStmt = $this->pdo->query("SELECT COUNT(*) AS total FROM message");
        $totalUsers = $totalUsersStmt->fetch(PDO::FETCH_ASSOC)['total'];

        return [
            'data' => $users,
            'pagination' => [
                'current_page' => $page,
                'per_page' => $limit,
                'total' => (int)$totalUsers,
                'total_pages' => ceil($totalUsers / $limit)
            ]
        ];
    }
}
?>
