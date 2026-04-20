// User - Booking(Pending) -> Payment (Unpaid) -> SSLCommerz -> Booking update = confirm -> Payment update = Paid
import { Types } from "mongoose";
export var BOOKING_STATUS;
(function (BOOKING_STATUS) {
    BOOKING_STATUS["PENDING"] = "PENDING";
    BOOKING_STATUS["CANCEL"] = "CANCEL";
    BOOKING_STATUS["COMPLETE"] = "COMPLETE";
    BOOKING_STATUS["FAILED"] = "FAILED";
})(BOOKING_STATUS || (BOOKING_STATUS = {}));
//# sourceMappingURL=booking.interface.js.map