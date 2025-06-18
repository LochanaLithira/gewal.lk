import paymentModel from "../models/paymentModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';

const currency = 'usd';
const deliveryCharge = 10;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place payment using COD method
const placePayment = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;

        if (!userId) {
            return res.json({ success: false, message: "User ID is required" });
        }

        const paymentData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "cod",
            payment: false,
            date: Date.now()
        };

        const newPayment = new paymentModel(paymentData);
        await newPayment.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Pending" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Place payment using Stripe method
const placePaymentStripe = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;
        const { origin } = req.headers;

        if (!userId) {
            return res.json({ success: false, message: "User ID is required" });
        }

        const paymentData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        };

        const newPayment = new paymentModel(paymentData);
        await newPayment.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round(item.price * 100)
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Service Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&paymentId=${newPayment._id}`,
            cancel_url: `${origin}/verify?success=false&paymentId=${newPayment._id}`,
            line_items,
            mode: 'payment'
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Verify Stripe payment
const verifyStripe = async (req, res) => {
    const { paymentId, success, userId } = req.body;

    try {
        if (success === "true") {
            await paymentModel.findByIdAndUpdate(paymentId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true });
        } else {
            await paymentModel.findByIdAndDelete(paymentId);
            res.json({ success: false });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// All payments for admin panel
const allPayments = async (req, res) => {
    try {
        const payments = await paymentModel.find({});
        res.json({ success: true, payments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// User payments for admin panel
const userPayments = async (req, res) => {
    try {
        const { userId } = req.body;
        const payments = await paymentModel.find({ userId });
        res.json({ success: true, payments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update payment status from admin panel
const updateStatus = async (req, res) => {
    try {
        const { paymentId, status } = req.body;
        await paymentModel.findByIdAndUpdate(paymentId, { status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Delete payment
const deletePayment = async (req, res) => {
    const { paymentId } = req.body;

    try {
        const payment = await paymentModel.findById(paymentId);
        if (!payment) {
            return res.status(404).json({ success: false, message: "Payment not found" });
        }
        await paymentModel.findByIdAndDelete(paymentId);
        return res.status(200).json({ success: true, message: "Payment deleted successfully" });
    } catch (error) {
        console.error("Error deleting payment:", error);
        return res.status(500).json({ success: false, message: "Failed to delete the payment" });
    }
};

export {
    placePayment,
    placePaymentStripe,
    updateStatus,
    allPayments,
    userPayments,
    verifyStripe,
    deletePayment
};






