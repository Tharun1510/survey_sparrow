const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(" DB Error:", err));

const TicketSchema = new mongoose.Schema({
    user: String,
    issue: String,
    status: String,    
    priority: String,   
    created_at: { type: Date, default: Date.now }
});
const Ticket = mongoose.model('Ticket', TicketSchema);

app.post('/webhook', async (req, res) => {
    console.log("Payload Received:", req.body);
    const { contact_name, issue_type, system_status } = req.body;

    let calculatedPriority = "NORMAL";

const statusText = String(system_status || ""); 

if (statusText.includes("Yes") || statusText === "50") {
    calculatedPriority = "URGENT";
}

    const newTicket = new Ticket({
        user: contact_name || "Guest User",
        issue: issue_type,
        status: system_status,
        priority: calculatedPriority
    });

    await newTicket.save();
    
    res.status(200).send("Webhook Processed");
});

app.get('/api/tickets', async (req, res) => {
    const tickets = await Ticket.find().sort({ created_at: -1 });
    res.json(tickets);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));