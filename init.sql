-- init.sql

-- Optional: Create and initialize the database if it does not exist
CREATE DATABASE IF NOT EXISTS mydatabase;

USE mydatabase;

-- Create the 'message' table
CREATE TABLE message (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  phoneNumber VARCHAR(15),
  message VARCHAR(1000)
);

-- Insert sample records with emojis
INSERT INTO message (name, email, phoneNumber, message) VALUES 
('John Doe', 'john@example.com', '01234567890', 'Hello there! 😊 How can I help you today?'),
('Jane Smith', 'jane@example.com', '09876543210', 'I have a question about your service. 🤔'),
('Alice Johnson', 'alice@example.com', '04567890123', 'Thank you for your help! 🙌'),
('Bob Brown', 'bob@example.com', '03216549870', 'Great experience so far! 👍'),
('Charlie Davis', 'charlie@example.com', '06543210987', 'Looking forward to your response! 😃');