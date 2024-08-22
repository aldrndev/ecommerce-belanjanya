# Belanjanya E-commerce Platform

Welcome to **Belanjanya**, an innovative online marketplace designed for seamless transactions between buyers and sellers of second-hand goods. Built with cutting-edge web technologies, Belanjanya offers a user-friendly experience tailored to meet the needs of both consumers and sellers alike.

## Features

### 🌟 Core Features

- **User Authentication**: Secure user registration and login with email verification and OTP support.
- **Real-Time Messaging**: Buyers can chat directly with sellers using a private messaging system powered by Socket.IO.
- **Product Listings**: Browse through various categories of products with detailed descriptions, pricing, and seller information.
- **Advanced Search & Filters**: Easily find the right products with search functionalities and filters based on categories, conditions, and more.
- **Product Reviews & Discussions**: Engage in discussions, read reviews, and leave feedback on products to build trust and improve the shopping experience.
- **Dynamic Cart System**: Add products to your cart with options to select or deselect all items by seller, ensuring smooth checkout processes.
- **Checkout with Validation**: The system validates product quantities against available stock before proceeding with checkout, preventing over-ordering.
- **Payment Integration**: Integrated with Midtrans payment gateway for secure and seamless payment processing.

### 💬 Messaging and Notifications

- **Private Chats**: One-on-one messaging system between buyers and sellers.
- **Read Receipts**: Keep track of whether your messages have been read by the other party.
- **Seller Notifications**: Automatic notifications for sellers when buyers make new inquiries or place orders.

### 📦 Order Management

- **Order Status Updates**: Track your order's journey from purchase to delivery with real-time status updates.
- **Auto-Cancelation**: Orders are automatically canceled if sellers do not confirm within 24 hours.
- **Flexible Cart Management**: Manage your cart items efficiently, with real-time stock checking and error handling for over-ordered products.

### 🎨 UI/UX Features

- **Responsive Design**: Optimized for both desktop and mobile experiences.
- **Smooth Animations**: Powered by AOS (Animate on Scroll) for a dynamic and engaging user experience.
- **Skeleton Loading**: Users get a visually appealing loading experience while waiting for product details to load.

## Technologies Used

- **Frontend**: React with Vite for blazing-fast development and a responsive user interface.
  - **State Management**: Zustand for simple yet powerful global state management.
  - **Animations**: AOS (Animate on Scroll) for beautiful animations.
  - **Forms**: `react-hook-form` for form handling.
  - **UI Libraries**: `@nextui-org/react` and Ant Design for elegant and consistent UI components.
  - **Data Fetching**: `@tanstack/react-query` for efficient data fetching, caching, and synchronization.

- **Backend**: Node.js with Express for handling server-side logic and APIs.
  - **Database**: PostgreSQL with Sequelize ORM for managing data models and relationships.
  - **Real-Time Communication**: Socket.IO for real-time private chat functionality.
  - **Job Queue Management**: BullMQ (with Redis) for handling background jobs like order cancellations.

- **Payment Gateway**: Midtrans integrated for secure and efficient online payments.

