import type { ITour, ITourType } from "./tour.interface.js";
export declare const TourService: {
    createTour: (payload: ITour) => Promise<import("mongoose").Document<unknown, {}, ITour, {}, import("mongoose").DefaultSchemaOptions> & ITour & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    createTourType: (payload: ITourType) => Promise<import("mongoose").Document<unknown, {}, ITourType, {}, import("mongoose").DefaultSchemaOptions> & ITourType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    deleteTourType: (id: string) => Promise<(import("mongoose").Document<unknown, {}, ITourType, {}, import("mongoose").DefaultSchemaOptions> & ITourType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    updateTourType: (id: string, payload: ITourType) => Promise<(import("mongoose").Document<unknown, {}, ITourType, {}, import("mongoose").DefaultSchemaOptions> & ITourType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    getAllTourTypes: (query: Record<string, string>) => Promise<{
        data: (import("mongoose").Document<unknown, {}, ITourType, {}, import("mongoose").DefaultSchemaOptions> & ITourType & {
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
    getSingleTourType: (id: string) => Promise<{
        data: (import("mongoose").Document<unknown, {}, ITourType, {}, import("mongoose").DefaultSchemaOptions> & ITourType & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }) | null;
    }>;
    getSingleTour: (slug: string) => Promise<{
        data: (import("mongoose").Document<unknown, {}, ITour, {}, import("mongoose").DefaultSchemaOptions> & ITour & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }) | null;
    }>;
    getAllTours: (query: Record<string, string>) => Promise<{
        data: (import("mongoose").Document<unknown, {}, ITour, {}, import("mongoose").DefaultSchemaOptions> & ITour & {
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
    updateTour: (id: string, payload: Partial<ITour>) => Promise<(import("mongoose").Document<unknown, {}, ITour, {}, import("mongoose").DefaultSchemaOptions> & ITour & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteTour: (id: string) => Promise<(import("mongoose").Document<unknown, {}, ITour, {}, import("mongoose").DefaultSchemaOptions> & ITour & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
};
//# sourceMappingURL=tour.service.d.ts.map