import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { DivisionService } from "./division.service.js";
const createDivision = catchAsync(async (req, res) => {
    // console.log("{ file: req.file, body: req.body }", {
    //   file: req.file,
    //   body: req.body,
    // });
    const payload = {
        ...req.body,
        thumbnail: req?.file?.path,
    };
    const result = await DivisionService.createDivision(payload);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Division created",
        data: result,
    });
});
const getAllDivisions = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await DivisionService.getAllDivisions(query);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Divisions retrieved",
        data: result.data,
        meta: result.meta,
    });
});
// slug
const getSingleDivision = catchAsync(async (req, res) => {
    const slug = req?.params?.slug;
    const result = await DivisionService.getSingleDivision(slug);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Divisions retrieved",
        data: result.data,
    });
});
const updateDivision = catchAsync(async (req, res) => {
    const id = req.params.id;
    const payload = {
        ...req.body,
        thumbnail: req.file?.path,
    };
    const result = await DivisionService.updateDivision(id, payload);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Division updated",
        data: result,
    });
});
const deleteDivision = catchAsync(async (req, res) => {
    const result = await DivisionService.deleteDivision(req?.params?.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Division deleted",
        data: result,
    });
});
export const DivisionController = {
    createDivision,
    getAllDivisions,
    getSingleDivision,
    updateDivision,
    deleteDivision,
};
//# sourceMappingURL=division.controller.js.map