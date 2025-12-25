-- SQL for ChronoWare E-Commerce Website (v2 - Plain Design)
-- Database: revoz_ultra_max

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS revoz_ultra_max;
USE revoz_ultra_max;

-- Drop existing tables to ensure a clean slate
DROP TABLE IF EXISTS `reviews`, `payments`, `order_items`, `orders`, `shipping_addresses`, `wishlist`, `cart_items`, `product_images`, `products`, `categories`, `users`, `roles`;

-- 1. Roles Table
CREATE TABLE `roles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- 2. Users Table
CREATE TABLE `users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `role_id` INT UNSIGNED NOT NULL DEFAULT 2,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3. Categories Table (Smartwatch Theme)
CREATE TABLE `categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(120) NOT NULL UNIQUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- 4. Products Table (Smartwatch Theme)
CREATE TABLE `products` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(275) NOT NULL UNIQUE,
  `description` TEXT,
  `price` DECIMAL(10, 2) NOT NULL,
  `stock` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. Product Images Table
CREATE TABLE `product_images` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` BIGINT UNSIGNED NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `is_featured` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- (The rest of the tables are the same structure as before)
-- 7. Cart Items Table
CREATE TABLE `cart_items` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `product_id` BIGINT UNSIGNED NOT NULL,
  `quantity` INT UNSIGNED NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;
-- 8. Wishlist Table
CREATE TABLE `wishlist` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `product_id` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_product_wish` (`user_id`, `product_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;
-- 9. Shipping Addresses Table
CREATE TABLE `shipping_addresses` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `address_line_1` VARCHAR(255) NOT NULL,
  `address_line_2` VARCHAR(255),
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(100) NOT NULL,
  `postal_code` VARCHAR(20) NOT NULL,
  `country` VARCHAR(50) NOT NULL,
  `is_default` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;
-- 10. Orders Table
CREATE TABLE `orders` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `shipping_address_id` BIGINT UNSIGNED,
  `total_amount` DECIMAL(10, 2) NOT NULL,
  `status` ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`shipping_address_id`) REFERENCES `shipping_addresses` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB;
-- 11. Order Items Table
CREATE TABLE `order_items` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_id` BIGINT UNSIGNED NOT NULL,
  `product_id` BIGINT UNSIGNED NOT NULL,
  `quantity` INT UNSIGNED NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;
-- 12. Payments Table
-- 12a. QRIS Images Table
CREATE TABLE `qris_images` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `image_url` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255),
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- 12. Payments Table
CREATE TABLE `payments` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_id` BIGINT UNSIGNED NOT NULL,
  `amount` DECIMAL(10, 2) NOT NULL,
  `payment_method` ENUM('cod','qris','bank_transfer','e_wallet') NOT NULL,
  `status` ENUM('pending', 'success', 'failed') NOT NULL DEFAULT 'pending',
  `transaction_id` VARCHAR(255),
  `qris_image_id` BIGINT UNSIGNED,
  `payment_proof_url` VARCHAR(255),
  `paid_at` TIMESTAMP,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`qris_image_id`) REFERENCES `qris_images` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB;
-- 13. Reviews Table
CREATE TABLE `reviews` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `product_id` BIGINT UNSIGNED NOT NULL,
  `rating` TINYINT UNSIGNED NOT NULL CHECK (rating >= 1 AND rating <= 5),
  `comment` TEXT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

--
-- DUMMY DATA (SMARTWATCH THEME V2)
--
-- Insert Roles
INSERT INTO `roles` (`id`, `name`) VALUES (1, 'admin'), (2, 'customer');
-- Insert Users
INSERT INTO `users` (`id`, `role_id`, `name`, `email`, `password`, `is_active`) VALUES
(1, 1, 'Admin ChronoWare', 'admin@chronoware.com', '$2a$10$E.ExiZNp632oF6A2m1Gg8uR5A3F0C5DkC3A.HwGjB4B5b.D6E.F7G', TRUE),
(2, 2, 'John Doe', 'john.doe@example.com', '$2a$10$E.ExiZNp632oF6A2m1Gg8uR5A3F0C5DkC3A.HwGjB4B5b.D6E.F7G', TRUE);
-- Insert Categories (Smartwatch Theme)
INSERT INTO `categories` (`id`, `name`, `slug`) VALUES
(1, 'Sport Series', 'sport-series'),
(2, 'Classic Collection', 'classic-collection'),
(3, 'Luxury Edition', 'luxury-edition');
-- Insert Products (Smartwatch Theme)
INSERT INTO `products` (`id`, `category_id`, `name`, `slug`, `description`, `price`, `stock`) VALUES
(1, 1, 'AquaFit Pro', 'aquafit-pro', 'The perfect companion for your swimming and workout sessions. Fully waterproof with advanced fitness tracking.', 199.99, 80),
(2, 1, 'Terra-Hiker', 'terra-hiker', 'Built for the great outdoors. GPS, altimeter, and a rugged case to withstand any adventure.', 249.99, 60),
(3, 2, 'Chrono Classic', 'chrono-classic', 'An elegant, timeless design with a leather strap. Smart notifications meet classic watchmaking.', 299.99, 100),
(4, 2, 'Metro Minimalist', 'metro-minimalist', 'Sleek, simple, and smart. A minimalist face with all the essential smart features for city life.', 279.99, 120),
(5, 3, 'Aetherium Gold', 'aetherium-gold', 'Exquisite craftsmanship with a 24k gold-plated case and sapphire crystal glass. The pinnacle of luxury and technology.', 799.99, 25);

-- Insert Product Images (Using plain, theme-matching placeholders)
INSERT INTO `product_images` (`product_id`, `image_url`, `is_featured`) VALUES
(1, 'https://via.placeholder.com/400x300/2c2c2e/3a3a3c?text=+', 1),
(2, 'https://via.placeholder.com/400x300/2c2c2e/3a3a3c?text=+', 1),
(3, 'https://via.placeholder.com/400x300/2c2c2e/3a3a3c?text=+', 1),
(4, 'https://via.placeholder.com/400x300/2c2c2e/3a3a3c?text=+', 1),
(5, 'https://via.placeholder.com/400x300/2c2c2e/3a3a3c?text=+', 1);

-- Insert sample QRIS image reference (place actual image at `uploads/qris/qris-sample.png` or `public/img/qris.png`)
INSERT INTO `qris_images` (`id`, `image_url`, `description`) VALUES
(1, 'uploads/qris/qris-sample.png', 'Contoh gambar QRIS untuk pembayaran (letakkan file di folder uploads/qris/)');