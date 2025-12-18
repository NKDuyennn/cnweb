import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import productModel from './models/productModel.js';
import userModel from './models/userModel.js';
import ChatMessage from './models/chatModel.js';
import connectDB from './config/mongodb.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Sample Products Data
const sampleProducts = [
    {
        name: "Men Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 100,
        image: ["https://via.placeholder.com/400x500?text=Men+Tshirt+1"],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: true,
        date: Date.now()
    },
    {
        name: "Men Slim Fit Jeans",
        description: "Classic slim fit jeans made from premium denim fabric. Perfect for casual wear.",
        price: 150,
        image: ["https://via.placeholder.com/400x500?text=Men+Jeans+1"],
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["M", "L", "XL", "XXL"],
        bestseller: true,
        date: Date.now()
    },
    {
        name: "Men Winter Jacket",
        description: "Warm and stylish winter jacket with premium insulation. Perfect for cold weather.",
        price: 300,
        image: ["https://via.placeholder.com/400x500?text=Men+Jacket+1"],
        category: "Men",
        subCategory: "Winterwear",
        sizes: ["M", "L", "XL"],
        bestseller: false,
        date: Date.now()
    },
    {
        name: "Women Casual Top",
        description: "Comfortable and trendy casual top for women. Perfect for everyday wear.",
        price: 120,
        image: ["https://via.placeholder.com/400x500?text=Women+Top+1"],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        bestseller: true,
        date: Date.now()
    },
    {
        name: "Women Skinny Jeans",
        description: "Stylish skinny fit jeans for women. Made from stretchable denim.",
        price: 140,
        image: ["https://via.placeholder.com/400x500?text=Women+Jeans+1"],
        category: "Women",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: false,
        date: Date.now()
    },
    {
        name: "Women Winter Coat",
        description: "Elegant winter coat for women with modern design and warm lining.",
        price: 350,
        image: ["https://via.placeholder.com/400x500?text=Women+Coat+1"],
        category: "Women",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L"],
        bestseller: true,
        date: Date.now()
    },
    {
        name: "Kids Cotton T-shirt",
        description: "Soft and comfortable cotton t-shirt for kids. Available in vibrant colors.",
        price: 80,
        image: ["https://via.placeholder.com/400x500?text=Kids+Tshirt+1"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        bestseller: false,
        date: Date.now()
    },
    {
        name: "Kids Casual Shorts",
        description: "Comfortable casual shorts for kids. Perfect for playtime.",
        price: 70,
        image: ["https://via.placeholder.com/400x500?text=Kids+Shorts+1"],
        category: "Kids",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L"],
        bestseller: false,
        date: Date.now()
    },
    {
        name: "Kids Winter Hoodie",
        description: "Cozy winter hoodie for kids with soft fleece lining.",
        price: 180,
        image: ["https://via.placeholder.com/400x500?text=Kids+Hoodie+1"],
        category: "Kids",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: true,
        date: Date.now()
    },
    {
        name: "Men Formal Shirt",
        description: "Premium formal shirt for men. Perfect for office and formal occasions.",
        price: 130,
        image: ["https://via.placeholder.com/400x500?text=Men+Shirt+1"],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL", "XXL"],
        bestseller: false,
        date: Date.now()
    },
    {
        name: "Women Floral Dress Top",
        description: "Beautiful floral print top for women. Lightweight and breathable.",
        price: 110,
        image: ["https://via.placeholder.com/400x500?text=Women+Floral+1"],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        bestseller: true,
        date: Date.now()
    },
    {
        name: "Men Cargo Pants",
        description: "Durable cargo pants with multiple pockets. Great for outdoor activities.",
        price: 160,
        image: ["https://via.placeholder.com/400x500?text=Men+Cargo+1"],
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["M", "L", "XL"],
        bestseller: false,
        date: Date.now()
    }
];

// Sample Users Data
const sampleUsers = [
    {
        name: "Test User",
        email: "user@test.com",
        password: "123456",
        cartData: {},
        favoriteProducts: []
    },
    {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        cartData: {},
        favoriteProducts: []
    },
    {
        name: "Jane Smith",
        email: "jane@example.com",
        password: "password123",
        cartData: {},
        favoriteProducts: []
    }
];

// Sample Admin Data
const sampleAdmins = [
    {
        email: "admin@gmail.com",
        password: "admin"
    },
    {
        email: "superadmin@gmail.com",
        password: "superadmin123"
    }
];

// Sample Chat Messages
const sampleChatMessages = [
    {
        sender: "user1", // Will be replaced with actual userId after user insertion
        receiver: "admin",
        message: "Hi, I need help with my order",
        timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
        sender: "admin",
        receiver: "user1",
        message: "Hello! I'd be happy to help. What's your order number?",
        timestamp: new Date(Date.now() - 3500000)
    },
    {
        sender: "user1",
        receiver: "admin",
        message: "It's order #12345",
        timestamp: new Date(Date.now() - 3400000)
    },
    {
        sender: "user2", // Will be replaced with actual userId
        receiver: "admin",
        message: "Do you have this item in stock?",
        timestamp: new Date(Date.now() - 7200000) // 2 hours ago
    },
    {
        sender: "admin",
        receiver: "user2",
        message: "Yes, we have it available. Which color would you prefer?",
        timestamp: new Date(Date.now() - 7100000)
    },
    {
        sender: "user3", // Will be replaced with actual userId
        receiver: "admin",
        message: "What's your return policy?",
        timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
    }
];

// Seed Function
const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...');

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await productModel.deleteMany({});
        await userModel.deleteMany({});
        await ChatMessage.deleteMany({});
        console.log('✅ Existing data cleared');

        // Insert Products
        console.log('📦 Inserting products...');
        const insertedProducts = await productModel.insertMany(sampleProducts);
        console.log(`✅ ${insertedProducts.length} products inserted`);

        // Insert Users with hashed passwords
        console.log('👥 Inserting users...');
        const usersWithHashedPasswords = await Promise.all(
            sampleUsers.map(async (user) => {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(user.password, salt);
                return {
                    ...user,
                    password: hashedPassword
                };
            })
        );
        const insertedUsers = await userModel.insertMany(usersWithHashedPasswords);
        console.log(`✅ ${insertedUsers.length} users inserted`);

        // Insert Chat Messages with actual user IDs
        console.log('💬 Inserting chat messages...');
        const chatMessagesWithUserIds = sampleChatMessages.map(msg => {
            let sender = msg.sender;
            let receiver = msg.receiver;

            // Replace placeholder userIds with actual inserted user IDs
            if (msg.sender === 'user1') sender = insertedUsers[0]._id.toString();
            if (msg.sender === 'user2') sender = insertedUsers[1]._id.toString();
            if (msg.sender === 'user3') sender = insertedUsers[2]._id.toString();

            if (msg.receiver === 'user1') receiver = insertedUsers[0]._id.toString();
            if (msg.receiver === 'user2') receiver = insertedUsers[1]._id.toString();
            if (msg.receiver === 'user3') receiver = insertedUsers[2]._id.toString();

            return {
                sender,
                receiver,
                message: msg.message,
                timestamp: msg.timestamp
            };
        });

        const insertedMessages = await ChatMessage.insertMany(chatMessagesWithUserIds);
        console.log(`✅ ${insertedMessages.length} chat messages inserted`);

        console.log('\n🎉 Database seeding completed successfully!');
        console.log('\n📊 Summary:');
        console.log(`   - Products: ${insertedProducts.length}`);
        console.log(`   - Users: ${insertedUsers.length}`);
        console.log(`   - Chat Messages: ${insertedMessages.length}`);
        
        console.log('\n🔐 Test User Credentials:');
        console.log('   Email: user@test.com');
        console.log('   Password: 123456');
        console.log('\n   Email: john@example.com');
        console.log('   Password: password123');
        
        console.log('\n👨‍💼 Admin Credentials:');
        console.log('   Email: admin@gmail.com');
        console.log('   Password: admin');
        console.log('\n   Email: superadmin@gmail.com');
        console.log('   Password: superadmin123');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

// Run seed function
seedDatabase();