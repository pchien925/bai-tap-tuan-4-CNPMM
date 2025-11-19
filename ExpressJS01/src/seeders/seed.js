const Product = require('../models/product');
const User = require('../models/user');
const bcrypt = require('bcrypt');

async function seed() {
    try {
        // Seed Users
        const passwordHash = await bcrypt.hash('123456', 10);

        await User.bulkCreate([
            { name: 'Admin', email: 'admin@gmail.com', password: passwordHash, role: 'admin' },
            { name: 'User', email: 'user@gmail.com', password: passwordHash, role: 'user' },
        ], { ignoreDuplicates: true }); 

        // Seed Products
        await Product.bulkCreate([
            { name: 'Iphone 14 Pro', description: 'Điện thoại cao cấp', price: 30000000, stock: 50, category: 'Điện thoại', soldOut: false },
            { name: 'Samsung Galaxy S23', description: 'Điện thoại flagship', price: 25000000, stock: 30, category: 'Điện thoại', soldOut: false },
            { name: 'Macbook Pro 16', description: 'Laptop mạnh mẽ', price: 60000000, stock: 20, category: 'Laptop', soldOut: false },
            { name: 'Dell XPS 13', description: 'Laptop mỏng nhẹ', price: 35000000, stock: 15, category: 'Laptop', soldOut: false },
            { name: 'Ipad Pro', description: 'Tablet cao cấp', price: 25000000, stock: 25, category: 'Tablet', soldOut: false },
            { name: 'Samsung Galaxy Tab S8', description: 'Tablet Android', price: 18000000, stock: 30, category: 'Tablet', soldOut: false },
            { name: 'AirPods Pro', description: 'Tai nghe không dây', price: 6000000, stock: 100, category: 'Phụ kiện', soldOut: false },
            { name: 'Logitech MX Master 3', description: 'Chuột cao cấp', price: 2500000, stock: 60, category: 'Phụ kiện', soldOut: false },
            { name: 'Apple Watch Series 9', description: 'Đồng hồ thông minh', price: 12000000, stock: 40, category: 'Phụ kiện', soldOut: false },
            { name: 'Samsung Galaxy Watch 6', description: 'Đồng hồ thông minh', price: 10000000, stock: 35, category: 'Phụ kiện', soldOut: false },
            { name: 'Sony WH-1000XM5', description: 'Tai nghe chống ồn', price: 9000000, stock: 50, category: 'Phụ kiện', soldOut: false },
            { name: 'Macbook Air M2', description: 'Laptop mỏng nhẹ', price: 45000000, stock: 25, category: 'Laptop', soldOut: false },
            { name: 'Asus ROG Strix G15', description: 'Laptop gaming', price: 40000000, stock: 20, category: 'Laptop', soldOut: false },
            { name: 'HP Spectre x360', description: 'Laptop 2-in-1', price: 38000000, stock: 18, category: 'Laptop', soldOut: false },
            { name: 'Iphone 14', description: 'Điện thoại phổ thông', price: 20000000, stock: 50, category: 'Điện thoại', soldOut: false },
            { name: 'Samsung Galaxy S23 Ultra', description: 'Điện thoại cao cấp', price: 30000000, stock: 30, category: 'Điện thoại', soldOut: false },
            { name: 'Xiaomi Mi 13', description: 'Điện thoại Android', price: 15000000, stock: 40, category: 'Điện thoại', soldOut: false },
            { name: 'Oppo Find X6', description: 'Điện thoại Android', price: 16000000, stock: 35, category: 'Điện thoại', soldOut: false },
            { name: 'Realme GT 3', description: 'Điện thoại tầm trung', price: 12000000, stock: 50, category: 'Điện thoại', soldOut: false },
            { name: 'Lenovo Yoga 9i', description: 'Laptop 2-in-1', price: 36000000, stock: 20, category: 'Laptop', soldOut: false },
            { name: 'Microsoft Surface Pro 9', description: 'Tablet/Laptop 2-in-1', price: 40000000, stock: 25, category: 'Tablet', soldOut: false },
            { name: 'Samsung Galaxy Buds 2', description: 'Tai nghe không dây', price: 3000000, stock: 80, category: 'Phụ kiện', soldOut: false },
            { name: 'Razer DeathAdder V3', description: 'Chuột gaming', price: 1500000, stock: 70, category: 'Phụ kiện', soldOut: false },
            { name: 'Corsair K100 RGB', description: 'Bàn phím cơ cao cấp', price: 5000000, stock: 40, category: 'Phụ kiện', soldOut: false },
            { name: 'Ipad Air', description: 'Tablet phổ thông', price: 18000000, stock: 30, category: 'Tablet', soldOut: false },
            { name: 'Apple Pencil', description: 'Bút cho iPad', price: 4000000, stock: 50, category: 'Phụ kiện', soldOut: false },
            { name: 'Samsung S Pen', description: 'Bút cho Galaxy Tab', price: 2000000, stock: 50, category: 'Phụ kiện', soldOut: false },
            { name: 'Beats Studio3', description: 'Tai nghe cao cấp', price: 7000000, stock: 40, category: 'Phụ kiện', soldOut: false },
            { name: 'Dell Alienware x17', description: 'Laptop gaming cao cấp', price: 90000000, stock: 10, category: 'Laptop', soldOut: false },
            { name: 'HP Omen 17', description: 'Laptop gaming', price: 60000000, stock: 15, category: 'Laptop', soldOut: false },
            { name: 'Mac Mini M2', description: 'Desktop Apple', price: 25000000, stock: 20, category: 'Laptop', soldOut: false },
            { name: 'Google Pixel 8', description: 'Điện thoại Android', price: 22000000, stock: 30, category: 'Điện thoại', soldOut: false },
            { name: 'Sony Xperia 1 V', description: 'Điện thoại Android', price: 24000000, stock: 25, category: 'Điện thoại', soldOut: false },
            { name: 'Amazon Fire HD 10', description: 'Tablet giá rẻ', price: 6000000, stock: 40, category: 'Tablet', soldOut: false },
            { name: 'Huawei MatePad Pro', description: 'Tablet cao cấp', price: 20000000, stock: 25, category: 'Tablet', soldOut: false },
            { name: 'Logitech G502', description: 'Chuột gaming', price: 1200000, stock: 70, category: 'Phụ kiện', soldOut: false },
            { name: 'Anker PowerCore 20000', description: 'Pin sạc dự phòng', price: 800000, stock: 100, category: 'Phụ kiện', soldOut: false },
            { name: 'Samsung Galaxy A54', description: 'Điện thoại tầm trung', price: 10000000, stock: 50, category: 'Điện thoại', soldOut: false },
            { name: 'Iphone SE 2022', description: 'Điện thoại giá rẻ', price: 13000000, stock: 45, category: 'Điện thoại', soldOut: false },
            { name: 'Lenovo Legion 5', description: 'Laptop gaming', price: 45000000, stock: 20, category: 'Laptop', soldOut: false },
            { name: 'Asus Zenbook 14', description: 'Laptop mỏng nhẹ', price: 32000000, stock: 25, category: 'Laptop', soldOut: false },
            { name: 'Samsung Galaxy Tab A8', description: 'Tablet phổ thông', price: 8000000, stock: 35, category: 'Tablet', soldOut: false },
            { name: 'Apple AirTag', description: 'Thiết bị định vị', price: 800000, stock: 100, category: 'Phụ kiện', soldOut: false },
            { name: 'Sony PlayStation 5', description: 'Máy chơi game', price: 15000000, stock: 20, category: 'Phụ kiện', soldOut: false },
            { name: 'Xbox Series X', description: 'Máy chơi game', price: 14000000, stock: 20, category: 'Phụ kiện', soldOut: false },
            { name: 'Nintendo Switch OLED', description: 'Máy chơi game', price: 9000000, stock: 25, category: 'Phụ kiện', soldOut: false },
            { name: 'DJI Mini 3', description: 'Drone nhỏ gọn', price: 12000000, stock: 15, category: 'Phụ kiện', soldOut: false },
            { name: 'GoPro Hero 12', description: 'Camera hành trình', price: 10000000, stock: 20, category: 'Phụ kiện', soldOut: false },
            { name: 'Fitbit Charge 6', description: 'Vòng tay sức khỏe', price: 4500000, stock: 40, category: 'Phụ kiện', soldOut: false }
        ], { ignoreDuplicates: true });

        console.log('🎉 Seed completed');
    } catch (err) {
        console.error('❌ Seed failed:', err);
    }
}

module.exports = seed;
