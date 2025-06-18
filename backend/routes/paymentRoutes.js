import express from 'express';
import {
  placePayment,
  placePaymentStripe,
  allPayments,
  updateStatus,
  userPayments,
  verifyStripe,
  deletePayment
} from '../controllers/paymentController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';
import mongoose from 'mongoose';
import paymentModel from '../models/paymentModel.js';

const paymentRouter = express.Router();

// Admin Features
paymentRouter.post('/list', adminAuth, allPayments);
paymentRouter.post('/status', adminAuth, updateStatus);

// Payment Features
paymentRouter.post('/place', authUser, placePayment);
paymentRouter.post('/stripe', authUser, placePaymentStripe);

// User Feature
paymentRouter.post('/userpayments', authUser, userPayments);

// Verify payment
paymentRouter.post('/verifyStripe', authUser, verifyStripe);

// Delete payment
paymentRouter.delete('/delete/:id', adminAuth, async (req, res) => {
  const { id } = req.params;  // Get the payment ID from the URL parameter

  try {
    // Ensure the id is a valid ObjectId before querying the database
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid payment ID" });
    }

    console.log(`Deleting payment with ID: ${id}`);

    // Try to find the payment by ID
    const payment = await paymentModel.findById(id);  
    if (!payment) {
      console.log("Payment not found");
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    // Delete the payment
    await paymentModel.findByIdAndDelete(id);
    console.log("Payment deleted successfully");

    return res.status(200).json({ success: true, message: "Payment deleted successfully" });
  } catch (error) {
    // Log the error for further inspection
    console.error("Error during payment deletion:", error);
    return res.status(500).json({ success: false, message: "Failed to delete the payment" });
  }
});

export default paymentRouter;