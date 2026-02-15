import mongoose from 'mongoose';

const validateId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ message: 'Invalid ID format' });
    }
    next();
};

export default validateId;
