import type { IDivision } from "./division.interface.js";
export declare const DivisionService: {
    createDivision: (payload: IDivision) => Promise<import("mongoose").Document<unknown, {}, IDivision, {}, import("mongoose").DefaultSchemaOptions> & IDivision & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getAllDivisions: (query: Record<string, string>) => Promise<{
        data: (import("mongoose").Document<unknown, {}, IDivision, {}, import("mongoose").DefaultSchemaOptions> & IDivision & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
    }>;
    getSingleDivision: (slug: string) => Promise<{
        data: (import("mongoose").Document<unknown, {}, IDivision, {}, import("mongoose").DefaultSchemaOptions> & IDivision & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }) | null;
    }>;
    updateDivision: (id: string, payload: Partial<IDivision>) => Promise<(import("mongoose").Document<unknown, {}, IDivision, {}, import("mongoose").DefaultSchemaOptions> & IDivision & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteDivision: (id: string) => Promise<null>;
};
//# sourceMappingURL=division.service.d.ts.map