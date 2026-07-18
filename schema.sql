-- Create Database
CREATE DATABASE IF NOT EXISTS api_monitor;
USE api_monitor;

--  Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--  APIs Table
CREATE TABLE IF NOT EXISTS apis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    api_name VARCHAR(100) NOT NULL,
    endpoint_url VARCHAR(255) NOT NULL,
    http_method ENUM('GET','POST','PUT','DELETE') DEFAULT 'GET',
    expected_status INT DEFAULT 200,
    monitoring_interval INT DEFAULT 60,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

--  Monitoring History Table
CREATE TABLE IF NOT EXISTS monitoring_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    api_id INT NOT NULL,
    status_code INT,
    response_time INT,
    availability ENUM('UP','DOWN'),
    error_message TEXT,
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (api_id) REFERENCES apis(id) ON DELETE CASCADE
);
