const mongoose = require('mongoose');

const FileSchema = mongoose.Schema({
    original_name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    password: String,
    download_count: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

const FileModel = mongoose.model("File", FileSchema);

module.exports = FileModel;