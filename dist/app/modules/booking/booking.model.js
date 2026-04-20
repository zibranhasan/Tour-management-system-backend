import { model, Schema } from "mongoose";
import { BOOKING_STATUS } from "./booking.interface.js";
const bookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tour: {
        type: Schema.Types.ObjectId,
        ref: "Tour",
        required: true,
    },
    payment: {
        type: Schema.Types.ObjectId,
        ref: "Payment",
    },
    status: {
        type: String,
        enum: Object.values(BOOKING_STATUS),
        default: BOOKING_STATUS.PENDING,
    },
    guestCount: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
export const Booking = model("Booking", bookingSchema);
//# sourceMappingURL=booking.model.js.map