const Property = require('../../models/Property');
const asyncHandler = require('../../utils/asyncHandler');
const createError = require('../../utils/ApiError');
const ApiFeatures = require('../../utils/ApiFeatures');

const listProperties = asyncHandler(async (req, res) => {
  const baseQuery = Property.find({ isActive: true });
  const features = new ApiFeatures(baseQuery, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const properties = await features.query.populate('owner', 'name phone');
  const total = await Property.countDocuments({ isActive: true });
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;

  res.status(200).json({
    success: true,
    count: properties.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    properties,
  });
});

const getPropertyById = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id).populate('owner', 'name phone email');

  if (!property) {
    throw createError('Property not found.', 404);
  }

  res.status(200).json({
    success: true,
    property,
  });
});

const createProperty = asyncHandler(async (req, res) => {
  req.body.owner = req.user._id;

  if (req.body.street || req.body.city) {
    req.body.address = {
      street: req.body.street || '',
      city: req.body.city || '',
      state: req.body.state || '',
      pincode: req.body.pincode || '',
      landmark: req.body.landmark || '',
    };
  }

  if (typeof req.body.rules === 'string') {
    try {
      req.body.rules = JSON.parse(req.body.rules);
    } catch {
      req.body.rules = req.body.rules.split('\n').filter(Boolean).map((r) => r.trim());
    }
  }

  if (req.files && req.files.length > 0) {
    req.body.images = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));
  }

  const property = await Property.create(req.body);

  res.status(201).json({
    success: true,
    property,
  });
});

const updateProperty = asyncHandler(async (req, res) => {
  let property = await Property.findById(req.params.id);

  if (!property) {
    throw createError('Property not found.', 404);
  }

  if (property.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw createError('Not authorized to update this property.', 403);
  }

  if (req.body.street || req.body.city) {
    req.body.address = {
      street: req.body.street || property.address.street,
      city: req.body.city || property.address.city,
      state: req.body.state || property.address.state,
      pincode: req.body.pincode || property.address.pincode,
      landmark: req.body.landmark || property.address.landmark || '',
    };
  }

  if (typeof req.body.rules === 'string') {
    try {
      req.body.rules = JSON.parse(req.body.rules);
    } catch {
      req.body.rules = req.body.rules.split('\n').filter(Boolean).map((r) => r.trim());
    }
  }

  if (req.files && req.files.length > 0) {
    req.body.images = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));
  }

  property = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    property,
  });
});

const deleteProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    throw createError('Property not found.', 404);
  }

  if (property.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw createError('Not authorized to delete this property.', 403);
  }

  await property.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Property deleted successfully.',
  });
});

const getMyProperties = asyncHandler(async (req, res) => {
  const properties = await Property.find({ owner: req.user._id }).sort('-createdAt');

  res.status(200).json({
    success: true,
    count: properties.length,
    properties,
  });
});

module.exports = {
  listProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getMyProperties,
};