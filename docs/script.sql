DROP DATABASE IF EXISTS pd_andersson_vargas_caiman;
CREATE DATABASE pd_andersson_vargas_caiman;
USE pd_andersson_vargas_caiman;
-- customers table
DROP TABLE IF EXISTS customers;
CREATE TABLE customers (
    customer_id INT NOT NULL AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    id_number VARCHAR(20) NOT NULL UNIQUE,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (customer_id)
);

-- platforms table
DROP TABLE IF EXISTS platforms;
CREATE TABLE platforms (
    platform_id INT NOT NULL AUTO_INCREMENT,
    platform_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (platform_id)
);
-- invoice table
DROP TABLE IF EXISTS invoices;
CREATE TABLE invoices (
    invoice_id INT NOT NULL AUTO_INCREMENT,
    invoice_number VARCHAR(20) NOT NULL UNIQUE,
    billing_period CHAR(7) NOT NULL,
    amount_billed DECIMAL(10,2) NOT NULL,
    amount_paid DECIMAL(10,2) NOT NULL,
    customer_id INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (invoice_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- transactions table
DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions (
    transaction_id INT NOT NULL AUTO_INCREMENT,
    transaction_code VARCHAR(20) NOT NULL UNIQUE,
    transaction_date DATETIME NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status ENUM('pendiente', 'fallido', 'completado') NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,
    platform_id INT NULL,
    invoice_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (transaction_id),
    FOREIGN KEY (platform_id) REFERENCES platforms(platform_id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (invoice_id) REFERENCES invoices(invoice_id) ON DELETE SET NULL ON UPDATE CASCADE
);
