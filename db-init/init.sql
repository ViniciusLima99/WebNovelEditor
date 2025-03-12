CREATE DATABASE IF NOT EXISTS webnovel_db;
USE webnovel_db;

CREATE TABLE IF NOT EXISTS chapters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    novel VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,  
    content TEXT NOT NULL
);