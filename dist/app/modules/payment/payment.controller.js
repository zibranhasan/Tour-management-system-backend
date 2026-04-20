import { catchAsync } from "../../utils/catchAsync.js";
import { envVars } from "../../config/env.js";
import { PaymentService } from "./payment.service.js";
import { sendResponse } from "../../utils/sendResponse.js";
import AppError from "../../errorHelpers/AppError.js";
import { SSLService } from "../sslCommerz/sslCommerz.service.js";
const initPayment = catchAsync(async (req, res) => {
    const bookingId = req.params.bookingId;
    const result = await PaymentService.initPayment(bookingId);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Payment done successfully",
        data: result,
    });
});
const successPayment = catchAsync(async (req, res) => {
    const result = await PaymentService.successPayment(req.query);
    if (result.success) {
        res.redirect(`${envVars.SSL.SSL_SUCCESS_FRONTEND_URL}?transactionId=${req.query.transactionId}&message=${result.message}&amount=${req.query.amount}&status=${req.query.status}`);
    }
});
const failPayment = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await PaymentService.failPayment(query);
    if (!result.success) {
        res.redirect(`${envVars.SSL.SSL_FAIL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`);
    }
});
const cancelPayment = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await PaymentService.cancelPayment(query);
    if (!result.success) {
        res.redirect(`${envVars.SSL.SSL_CANCEL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`);
    }
});
const getInvoiceDownloadUrl = catchAsync(async (req, res) => {
    const { paymentId } = req.params;
    if (typeof paymentId !== "string") {
        throw new AppError(400, "Invalid paymentId");
    }
    const result = await PaymentService.getInvoiceDownloadUrl(paymentId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Invoice download URL retrieved successfully",
        data: result,
    });
});
const validatePayment = catchAsync(async (req, res) => {
    console.log("sslcommerz ipn url body", req.body);
    await SSLService.validatePayment(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Payment Validated Successfully",
        data: null,
    });
});
export const PaymentController = {
    initPayment,
    successPayment,
    failPayment,
    cancelPayment,
    getInvoiceDownloadUrl,
    validatePayment,
};
//# sourceMappingURL=payment.controller.js.map