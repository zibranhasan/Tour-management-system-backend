import { model, Schema } from "mongoose";
const divisionSchema = new Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    thumbnail: { type: String },
    description: { type: String },
}, {
    timestamps: true,
});
divisionSchema.pre("save", async function () {
    if (this.isModified("name")) {
        const baseSlug = this.name.toLowerCase().split(" ").join("-");
        let slug = `${baseSlug}-division`;
        let counter = 0;
        while (await Division.exists({ slug })) {
            slug = `${baseSlug}-division-${counter++}`; // ✅ fixed
        }
        this.slug = slug;
    }
});
divisionSchema.pre("findOneAndUpdate", async function () {
    const update = this.getUpdate();
    const name = update.name || update.$set?.name;
    if (name) {
        const baseSlug = name.toLowerCase().split(" ").join("-");
        let slug = `${baseSlug}-division`;
        let counter = 0;
        while (await Division.exists({ slug })) {
            slug = `${baseSlug}-division-${counter++}`; // ✅ fixed
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
export const Division = model("Division", divisionSchema);
//# sourceMappingURL=division.model.js.map