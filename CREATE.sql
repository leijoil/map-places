CREATE TABLE place
(
    title VARCHAR(255),
    description VARCHAR(255),
    openfrom TIMESTAMP,
    openuntil TIMESTAMP,
    lat DECIMAL(10, 8) NOT NULL,
	lng DECIMAL(11, 8) NOT NULL
    
);