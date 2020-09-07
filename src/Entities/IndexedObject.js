export const IndexedObject = class IndexedObject{
    constructor(type, name, depth, belongsTo) {
        this.Type = type;
        this.Name = name;
        this.Depth = depth;
        this.BelongsTo = belongsTo;
    }
}

export default IndexedObject;
