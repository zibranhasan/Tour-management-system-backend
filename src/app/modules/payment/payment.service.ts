/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import { Booking } from "../booking/booking.model.js";
import { Payment } from "./payment.model.js";
import { PAYMENT_STATUS } from "./payment.interface.js";
import AppError from "../../errorHelpers/AppError.js";
import { BOOKING_STATUS } from "../booking/booking.interface.js";
import type { IInvoiceData } from "../../utils/invoice.js";
import type { ITour } from "../tour/tour.interface.js";
import type { IUser } from "../user/user.interface.js";
import type { ISSLCommerz } from "../sslCommerz/sslCommerz.interface.js";
import { SSLService } from "../sslCommerz/sslCommerz.service.js";

const initPayment = async (bookingId: string) => {
  const payment = await Payment.findOne({ booking: bookingId });

  if (!payment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Payment Not Found. You have not booked this tour",
    );
  }

  const booking = await Booking.findById(payment.booking);

  const userAddress = (booking?.user as any).address;
  const userEmail = (booking?.user as any).email;
  const userPhoneNumber = (booking?.user as any).phone;
  const userName = (booking?.user as any).name;

  const sslPayload: ISSLCommerz = {
    address: userAddress,
    email: userEmail,
    phoneNumber: userPhoneNumber,
    name: userName,
    amount: payment.amount,
    transactionId: payment.transactionId,
  };

  const sslPayment = await SSLService.sslPaymentInit(sslPayload);

  return {
    paymentUrl: sslPayment.GatewayPageURL,
  };
};
const successPayment = async (query: Record<string, string>) => {
  // Update Booking Status to COnfirm
  // Update Payment Status to PAID

  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const transactionId = query.transactionId;

    if (!transactionId || typeof transactionId !== "string") {
      throw new AppError(400, "Invalid transactionId");
    }

    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId }, // ✅ perfect
      { status: PAYMENT_STATUS.PAID },
      { new: true, runValidators: true, session },
    );
    if (!updatedPayment) {
      throw new AppError(401, "Payment not found");
    }

    if (!updatedPayment) {
      throw new AppError(401, "Payment not found");
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      updatedPayment?.booking,
      { status: BOOKING_STATUS.COMPLETE },
      { new: true, runValidators: true, session },
    )
      .populate("tour", "title")
      .populate("user", "name email");

    if (!updatedBooking) {
      throw new AppError(401, "Booking not found");
    }

    const invoiceData: IInvoiceData = {
      bookingDate: updatedBooking.createdAt as Date,
      guestCount: updatedBooking.guestCount,
      totalAmount: updatedPayment.amount,
      tourTitle: (updatedBooking.tour as unknown as ITour).title,
      transactionId: updatedPayment.transactionId,
      userName: (updatedBooking.user as unknown as IUser).name,
    };

    // const pdfBuffer = await generatePdf(invoiceData);

    // const cloudinaryResult = await uploadBufferToCloudinary(
    //   pdfBuffer,
    //   "invoice",
    // );

    // if (!cloudinaryResult) {
    //   throw new AppError(401, "Error uploading pdf");
    // }

    // await Payment.findByIdAndUpdate(
    //   updatedPayment._id,
    //   // { invoiceUrl: cloudinaryResult.secure_url },
    //   { runValidators: true, session },
    // );

    // await sendEmail({
    //   to: (updatedBooking.user as unknown as IUser).email,
    //   subject: "Your Booking Invoice",
    //   templateName: "invoice",
    //   templateData: invoiceData,
    //   attachments: [
    //     {
    //       filename: "invoice.pdf",
    //       content: pdfBuffer,
    //       contentType: "application/pdf",
    //     },
    //   ],
    // });

    await session.commitTransaction(); //transaction
    session.endSession();
    return { success: true, message: "Payment Completed Successfully" };
  } catch (error) {
    await session.abortTransaction(); // rollback
    session.endSession();
    // throw new AppError(httpStatus.BAD_REQUEST, error) ❌❌
    throw error;
  }
};
const failPayment = async (query: Record<string, string>) => {
  // Update Booking Status to FAIL
  // Update Payment Status to FAIL
  const session = await Booking.startSession();
  session.startTransaction();
  try {
    const transactionId = query.transactionId;

    if (!transactionId || typeof transactionId !== "string") {
      throw new AppError(400, "Invalid transactionId");
    }

    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId },
      {
        status: PAYMENT_STATUS.FAILED,
      },
      { new: true, runValidators: true, session: session },
    );
    await Booking.findByIdAndUpdate(
      updatedPayment?.booking,
      { status: BOOKING_STATUS.FAILED },
      { runValidators: true, session },
    );
    await session.commitTransaction(); //transaction
    session.endSession();
    return { success: false, message: "Payment Failed" };
  } catch (error) {
    await session.abortTransaction(); // rollback
    session.endSession();
    // throw new AppError(httpStatus.BAD_REQUEST, error) ❌❌
    throw error;
  }
};
const cancelPayment = async (query: Record<string, string>) => {
  // Update Booking Status to CANCEL
  // Update Payment Status to CANCEL
  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const transactionId = query.transactionId;

    if (!transactionId || typeof transactionId !== "string") {
      throw new AppError(400, "Invalid transactionId");
    }
    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId },
      {
        status: PAYMENT_STATUS.CANCELLED,
      },
      { runValidators: true, session: session },
    );
    await Booking.findByIdAndUpdate(
      updatedPayment?.booking,
      { status: BOOKING_STATUS.CANCEL },
      { runValidators: true, session },
    );
    await session.commitTransaction(); //transaction
    session.endSession();
    return { success: false, message: "Payment Cancelled" };
  } catch (error) {
    await session.abortTransaction(); // rollback
    session.endSession();
    // throw new AppError(httpStatus.BAD_REQUEST, error) ❌❌
    throw error;
  }
};

// const getInvoiceDownloadUrl = async (paymentId: string) => {
//   const payment = await Payment.findById(paymentId).select("invoiceUrl");

//   if (!payment) {
//     throw new AppError(401, "Payment not found");
//   }

//   if (!payment.invoiceUrl) {
//     throw new AppError(401, "No invoice found");
//   }

//   return payment.invoiceUrl;
// };

export const PaymentService = {
  initPayment,
  successPayment,
  failPayment,
  cancelPayment,
  // getInvoiceDownloadUrl,
};
