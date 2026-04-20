import { model, Schema } from "mongoose";
const tourTypeSchema = new Schema({
    name: { type: String, required: true, unique: true },
}, {
    timestamps: true,
});
export const TourType = model("TourType", tourTypeSchema);
const tourSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String },
    images: { type: [String], default: [] },
    location: { type: String },
    costFrom: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    departureLocation: { type: String },
    arrivalLocation: { type: String },
    included: { type: [String], default: [] },
    excluded: { type: [String], default: [] },
    amenities: { type: [String], default: [] },
    tourPlan: { type: [String], default: [] },
    maxGuest: { type: Number },
    minAge: { type: Number },
    division: {
        type: Schema.Types.ObjectId,
        ref: "Division",
        required: true,
    },
    tourType: {
        type: Schema.Types.ObjectId,
        ref: "TourType",
        required: true,
    },
}, {
    timestamps: true,
});
// 🔹 PRE SAVE
tourSchema.pre("save", async function () {
    if (this.isModified("title")) {
        const baseSlug = this.title.toLowerCase().split(" ").join("-");
        let slug = baseSlug;
        let counter = 0;
        while (await Tour.exists({ slug })) {
            slug = `${baseSlug}-${counter++}`; // ✅ fixed
        }
        this.slug = slug;
    }
});
// 🔹 PRE UPDATE
tourSchema.pre("findOneAndUpdate", async function () {
    const update = this.getUpdate();
    // handle both direct and $set updates
    const title = update.title || update.$set?.title;
    if (title) {
        const baseSlug = title.toLowerCase().split(" ").join("-");
        let slug = baseSlug;
        let counter = 0;
        while (await Tour.exists({ slug })) {
            slug = `${baseSlug}-${counter++}`; // ✅ fixed
        }
        if (update.$set) {
            update.$set.slug = slug;
        }
        else {
            update.slug = slug;
        }
    }
    this.setUpdate(update);
});
export const Tour = model("Tour", tourSchema);
//# sourceMappingURL=tour.model.js.map