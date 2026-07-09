class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const { city, type, gender, minPrice, maxPrice, ac, food, sharing, minRating, search, ...rest } = this.queryString;
    const conditions = [];

    if (city) conditions.push({ 'address.city': { $regex: new RegExp(city, 'i') } });
    if (type) conditions.push({ type: type.toLowerCase() });
    if (gender) conditions.push({ gender: gender.toLowerCase() });
    if (minPrice || maxPrice) {
      const priceFilter = {};
      if (minPrice) priceFilter.$gte = Number(minPrice);
      if (maxPrice) priceFilter.$lte = Number(maxPrice);
      conditions.push({ price: priceFilter });
    }
    const amenityFilters = [];
    if (ac === 'true') amenityFilters.push('ac');
    if (food === 'true') amenityFilters.push('food');
    if (sharing === 'true') amenityFilters.push('sharing');
    if (amenityFilters.length) conditions.push({ amenities: { $all: amenityFilters } });
    if (minRating) conditions.push({ rating: { $gte: Number(minRating) } });
    if (search) {
      conditions.push({
        $or: ['title', 'description'].map((f) => ({ [f]: { $regex: new RegExp(search, 'i') } })),
      });
    }

    if (conditions.length) this.query = this.query.find({ $and: conditions });
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      this.query = this.query.sort(this.queryString.sort.split(',').join(' '));
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      this.query = this.query.select(this.queryString.fields.split(',').join(' '));
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 10;
    this.query = this.query.skip((page - 1) * limit).limit(limit);
    return this;
  }
}

module.exports = ApiFeatures;
