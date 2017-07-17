CREATE DATABASE name_here;
CREATE USER 'name_here'@'localhost' IDENTIFIED BY 'name_here';
GRANT ALL PRIVILEGES ON name_here.* TO 'name_here'@'localhost';
FLUSH PRIVILEGES;
