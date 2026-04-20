import { deleteImageFromCLoudinary } from "../../config/cloudinary.config.js";
import { QueryBuilder } from "../../utils/QueryBuilder.js";
import { divisionSearchableFields } from "./division.constant.js";
import { Division } from "./division.model.js";
const createDivision = async (payload) => {
    const existingDivision = await Division.findOne({ name: payload.name });
    if (existingDivision) {
        throw new Error("A division with this name already exists.");
    }
    const division = await Division.create(payload);
    return division;
};
const getAllDivisions = async (query) => {
    const queryBuilder = new QueryBuilder(Division.find(), query);
    const divisionsData = queryBuilder
        .search(divisionSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate();
    const [data, meta] = await Promise.all([
        divisionsData.build(),
        queryBuilder.getMeta(),
    ]);
    return {
        data,
        meta,
    };
};
// slug
const getSingleDivision = async (slug) => {
    const division = await Division.findOne({ slug });
    return {
        data: division,
    };
};
const updateDivision = async (id, payload) => {
    const existingDivision = await Division.findById(id);
    if (!existingDivision) {
        throw new Error("Division not found.");
    }
    const query = {
        _id: { $ne: id },
    };
    if (payload.name) {
        query.name = payload.name;
    }
    const duplicateDivision = await Division.findOne(query);
    if (duplicateDivision) {
        throw new Error("A division with this name already exists.");
    }
    const updatedDivision = await Division.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (payload.thumbnail && existingDivision.thumbnail) {
        await deleteImageFromCLoudinary(existingDivision.thumbnail);
    }
    return updatedDivision;
};
const deleteDivision = async (id) => {
    await Division.findByIdAndDelete(id);
    return null;
};
export const DivisionService = {
    createDivision,
    getAllDivisions,
    getSingleDivision,
    updateDivision,
    deleteDivision,
};
//# sourceMappingURL=division.service.js.map