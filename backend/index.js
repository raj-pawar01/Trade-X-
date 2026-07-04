require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { UserModel } = require("./model/UserModel");
const { OrdersModel } = require("./model/OrdersModel");
const { TransactionModel } = require("./model/TransactionModel");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;
const URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET || "zerodha_clone_secret_key_12345";

// Middleware to verify JWT token
const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

// Sign Up Route
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password, mobile } = req.body;

    if (!username || !email || !password || !mobile) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ $or: [{ email }, { username }, { mobile }] });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email, username, or mobile number" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      username,
      email,
      password: hashedPassword,
      mobile,
    });
    await user.save();

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.get("/holdings", async (req, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   tempHoldings.forEach((item) => {
//     let newHolding = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//     });

//     newHolding.save();
//   });
//   res.send("Done!");
// });

// app.get("/positions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempPositions.forEach((item) => {
//     let newPosition = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newPosition.save();
//   });
//   res.send("Done!");
// });

app.get("/allHoldings", requireAuth, async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", requireAuth, async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

// Place New Order Route (Buy / Sell)
app.post("/newOrder", requireAuth, async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    if (!name || !qty || !price || !mode) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const numericQty = Number(qty);
    const numericPrice = Number(price);

    if (isNaN(numericQty) || numericQty <= 0) {
      return res.status(400).json({ error: "Quantity must be a positive number" });
    }

    if (isNaN(numericPrice) || numericPrice <= 0) {
      return res.status(400).json({ error: "Price must be a positive number" });
    }

    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const orderValue = numericQty * numericPrice;
    let currentFunds = user.funds !== undefined && user.funds !== null ? user.funds : 100000.00;

    if (mode.toUpperCase() === "SELL") {
      let holding = await HoldingsModel.findOne({ name });
      let position = await PositionsModel.findOne({ name });

      if (!holding && !position) {
        return res.status(400).json({ error: "Insufficient stock quantity in holdings/positions to sell." });
      }

      const totalQty = (holding?.qty || 0) + (position?.qty || 0);
      if (totalQty < numericQty) {
        return res.status(400).json({ error: "Insufficient stock quantity to sell." });
      }

      // Add funds to user
      currentFunds += orderValue;
      await UserModel.findByIdAndUpdate(req.user.id, { funds: currentFunds });

      // Deduct from holding first, then from position
      let remainingQtyToSell = numericQty;
      if (holding) {
        if (holding.qty >= remainingQtyToSell) {
          holding.qty -= remainingQtyToSell;
          holding.price = numericPrice;
          remainingQtyToSell = 0;
          if (holding.qty === 0) {
            await HoldingsModel.deleteOne({ _id: holding._id });
          } else {
            await holding.save();
          }
        } else {
          remainingQtyToSell -= holding.qty;
          await HoldingsModel.deleteOne({ _id: holding._id });
        }
      }

      if (remainingQtyToSell > 0 && position) {
        position.qty -= remainingQtyToSell;
        position.price = numericPrice;
        if (position.qty === 0) {
          await PositionsModel.deleteOne({ _id: position._id });
        } else {
          await position.save();
        }
      }
    } else if (mode.toUpperCase() === "BUY") {
      if (currentFunds < orderValue) {
        return res.status(400).json({ error: "Insufficient funds in your account to place this order." });
      }

      // Deduct funds from user
      currentFunds -= orderValue;
      await UserModel.findByIdAndUpdate(req.user.id, { funds: currentFunds });

      let holding = await HoldingsModel.findOne({ name });
      if (holding) {
        const totalCost = (holding.avg * holding.qty) + (numericPrice * numericQty);
        const totalQty = holding.qty + numericQty;
        holding.qty = totalQty;
        holding.avg = totalCost / totalQty;
        holding.price = numericPrice;
        await holding.save();
      } else {
        const newHolding = new HoldingsModel({
          name,
          qty: numericQty,
          avg: numericPrice,
          price: numericPrice,
          net: "+0.00%",
          day: "+0.00%",
        });
        await newHolding.save();
      }
    }

    // Save order record
    const newOrder = new OrdersModel({
      name,
      qty: numericQty,
      price: numericPrice,
      mode,
    });
    await newOrder.save();

    res.status(201).json({ message: "Order executed successfully", order: newOrder });
  } catch (err) {
    console.error("Order placement error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch All Orders Route
app.get("/allOrders", requireAuth, async (req, res) => {
  try {
    const orders = await OrdersModel.find({}).sort({ _id: -1 }); // Show newest first
    res.json(orders);
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Live stock prices aggregator from Yahoo Finance API
app.get("/api/live-prices", async (req, res) => {
  const symbols = req.query.symbols ? req.query.symbols.split(",") : [
    "INFY.NS", "ONGC.NS", "TCS.NS", "KPITTECH.NS", "QUICKHEAL.NS", 
    "WIPRO.NS", "M&M.NS", "RELIANCE.NS", "HINDUNILVR.NS",
    "BHARTIARTL.NS", "HDFCBANK.NS", "ITC.NS", "SBIN.NS", "TATAPOWER.NS",
    "EVEREADY.NS", "JUBLFOOD.NS", "^NSEI", "^BSESN"
  ];
  
  try {
    const fetchPromises = symbols.map(async (symbol) => {
      try {
        const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}`, {
          headers: { "User-Agent": "Mozilla/5.0" }
        });
        if (!response.ok) return null;
        const data = await response.json();
        const meta = data.chart?.result?.[0]?.meta;
        if (!meta) return null;
        
        const price = meta.regularMarketPrice;
        const prevClose = meta.chartPreviousClose || price;
        const change = price - prevClose;
        const changePercent = (change / prevClose) * 100;
        
        return {
          symbol: symbol.replace(".NS", "").replace("^", ""),
          price,
          changePercent,
          isDown: changePercent < 0,
        };
      } catch (err) {
        console.error(`Error fetching ${symbol}:`, err);
        return null;
      }
    });

    const results = await Promise.all(fetchPromises);
    const validResults = results.filter(Boolean);
    
    const priceMap = {};
    validResults.forEach(item => {
      priceMap[item.symbol.toUpperCase()] = item;
    });

    // Special mappings
    if (priceMap["HINDUNILVR"]) {
      priceMap["HUL"] = { ...priceMap["HINDUNILVR"], symbol: "HUL" };
    }
    
    res.json(priceMap);
  } catch (error) {
    console.error("Live prices fetch error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch user funds
app.get("/userFunds", requireAuth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.funds === undefined || user.funds === null) {
      await UserModel.findByIdAndUpdate(req.user.id, { funds: 100000.00 });
      return res.json({ funds: 100000.00 });
    }
    res.json({ funds: user.funds });
  } catch (err) {
    console.error("Fetch user funds error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add user funds
app.post("/addFunds", requireAuth, async (req, res) => {
  try {
    const { amount } = req.body;
    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    let currentFunds = user.funds !== undefined && user.funds !== null ? user.funds : 100000.00;
    currentFunds += numericAmount;
    
    await UserModel.findByIdAndUpdate(req.user.id, { funds: currentFunds });
    
    // Save transaction to MongoDB
    const transaction = new TransactionModel({
      userId: req.user.id,
      type: "DEPOSIT",
      amount: numericAmount,
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      status: "SUCCESS"
    });
    await transaction.save();
    
    res.json({ message: "Funds added successfully", funds: currentFunds });
  } catch (err) {
    console.error("Add funds error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Withdraw user funds
app.post("/withdrawFunds", requireAuth, async (req, res) => {
  try {
    const { amount } = req.body;
    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    let currentFunds = user.funds !== undefined && user.funds !== null ? user.funds : 100000.00;
    
    if (currentFunds < numericAmount) {
      return res.status(400).json({ error: "Insufficient funds" });
    }
    
    currentFunds -= numericAmount;
    await UserModel.findByIdAndUpdate(req.user.id, { funds: currentFunds });
    
    // Save transaction to MongoDB
    const transaction = new TransactionModel({
      userId: req.user.id,
      type: "WITHDRAW",
      amount: numericAmount,
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      status: "SUCCESS"
    });
    await transaction.save();
    
    res.json({ message: "Funds withdrawn successfully", funds: currentFunds });
  } catch (err) {
    console.error("Withdraw funds error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch all transactions for a user
app.get("/allTransactions", requireAuth, async (req, res) => {
  try {
    let transactions = await TransactionModel.find({ userId: req.user.id }).sort({ _id: -1 });
    if (transactions.length === 0) {
      // Seed initial deposit of 100000.00
      const initialTx = new TransactionModel({
        userId: req.user.id,
        type: "DEPOSIT",
        amount: 100000.00,
        date: "2026-06-20 10:15",
        status: "SUCCESS",
      });
      await initialTx.save();
      transactions = [initialTx];
    }
    
    // Map _id to id for frontend compatibility
    const mappedTransactions = transactions.map(tx => ({
      id: tx._id,
      type: tx.type,
      amount: tx.amount,
      date: tx.date,
      status: tx.status
    }));

    res.json(mappedTransactions);
  } catch (err) {
    console.error("Fetch transactions error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(8080, async () => {
  console.log("App is running");
  await mongoose.connect(URL);
  console.log("Database connected");

  try {
    const holdingsCount = await HoldingsModel.countDocuments();
    if (holdingsCount === 0) {
      const tempHoldings = [
        { name: "BHARTIARTL", qty: 2, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%" },
        { name: "HDFCBANK", qty: 2, avg: 1383.4, price: 1522.35, net: "+10.04%", day: "+0.11%" },
        { name: "HINDUNILVR", qty: 1, avg: 2335.85, price: 2417.4, net: "+3.49%", day: "+0.21%" },
        { name: "INFY", qty: 1, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%", isLoss: true },
        { name: "ITC", qty: 5, avg: 202.0, price: 207.9, net: "+2.92%", day: "+0.80%" },
        { name: "KPITTECH", qty: 5, avg: 250.3, price: 266.45, net: "+6.45%", day: "+3.54%" },
        { name: "M&M", qty: 2, avg: 809.9, price: 779.8, net: "-3.72%", day: "-0.01%", isLoss: true },
        { name: "RELIANCE", qty: 1, avg: 2193.7, price: 2112.4, net: "-3.71%", day: "+1.44%" },
        { name: "SBIN", qty: 4, avg: 324.35, price: 430.2, net: "+32.63%", day: "-0.34%", isLoss: true },
        { name: "SGBMAY29", qty: 2, avg: 4727.0, price: 4719.0, net: "-0.17%", day: "+0.15%" },
        { name: "TATAPOWER", qty: 5, avg: 104.2, price: 124.15, net: "+19.15%", day: "-0.24%", isLoss: true },
        { name: "TCS", qty: 1, avg: 3041.7, price: 3194.8, net: "+5.03%", day: "-0.25%", isLoss: true },
        { name: "WIPRO", qty: 4, avg: 489.3, price: 577.75, net: "+18.08%", day: "+0.32%" }
      ];
      await HoldingsModel.insertMany(tempHoldings);
      console.log("Holdings seeded successfully");
    }

    const positionsCount = await PositionsModel.countDocuments();
    if (positionsCount === 0) {
      const tempPositions = [
        { product: "CNC", name: "EVEREADY", qty: 2, avg: 316.27, price: 312.35, net: "+0.58%", day: "-1.24%", isLoss: true },
        { product: "CNC", name: "JUBLFOOD", qty: 1, avg: 3124.75, price: 3082.65, net: "+10.04%", day: "-1.35%", isLoss: true }
      ];
      await PositionsModel.insertMany(tempPositions);
      console.log("Positions seeded successfully");
    }
  } catch (err) {
    console.error("Error seeding database:", err);
  }
});
