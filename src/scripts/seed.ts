import "dotenv/config"
import mongoose from "mongoose"
import { connectDB } from "@/lib/db"
import Product from "@/models/Product"
import { createSlug } from "@/lib/slug"

const products = [
  {
    name: "Nike Air Max",
    description: "Comfortable running shoes",
    price: 120,
    image: "/products/nike-air-max.jpg",
  },
  {
    name: "Adidas Ultraboost",
    description: "High performance running shoes",
    price: 150,
    image: "/products/adidas-ultraboost.jpg",
  },
  {
    name: "Apple AirPods Pro",
    description: "Wireless noise cancelling earbuds",
    price: 249,
    image: "/products/airpods-pro.jpg",
  },
  {
    name: "Samsung Galaxy Buds",
    description: "Wireless earbuds with rich sound",
    price: 130,
    image: "/products/galaxy-buds.jpg",
  },
  {
    name: "Logitech MX Master Mouse",
    description: "Professional wireless mouse",
    price: 99,
    image: "/products/mx-master.jpg",
  },
  {
    name: "Mechanical Keyboard RGB",
    description: "Gaming mechanical keyboard",
    price: 110,
    image: "/products/mechanical-keyboard.jpg",
  },
  {
    name: "Sony WH-1000XM5",
    description: "Premium noise cancelling headphones",
    price: 399,
    image: "/products/sony-xm5.jpg",
  },
  {
    name: "Dell 27 Monitor",
    description: "27 inch Full HD monitor",
    price: 220,
    image: "/products/dell-monitor.jpg",
  },
  {
    name: "MacBook Pro M1",
    description: "Powerful laptop for developers",
    price: 1800,
    image: "/products/macbook-m1.jpg",
  },
  {
    name: "iPhone 14",
    description: "Latest Apple smartphone",
    price: 999,
    image: "/products/iphone14.jpg",
  },
]

async function seedProducts() {
  await connectDB()

  await Product.deleteMany()

  const formattedProducts = products.map((p) => ({
    ...p,
    slug: createSlug(p.name),
  }))

  await Product.insertMany(formattedProducts)

  console.log("✅ 10 products seeded successfully")

  await mongoose.connection.close()
}

seedProducts()