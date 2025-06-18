import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    items: { type: Array, required: true },  
    amount: { type: Number, required: true }, 
    address: { type: Object, required: true }, 
    status: { type: String, required: true, default: 'Booking Placed' }, 
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, required: true, default: false },  
    date: { type: Number, required: true },
});

const paymentModel = mongoose.models.payment || mongoose.model('payment', paymentSchema);

export default paymentModel;