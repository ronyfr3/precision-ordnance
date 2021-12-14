const { json } = require("body-parser");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryobj = { ...this.queryString };
    const excludeFields = ["page", "sort", "limit"];
    excludeFields.forEach((el) => delete queryobj[el]);
    let querystr = JSON.stringify(queryobj);
    //added regex for search capability
    //http://localhost:8080/api/product?name[regex]=uzi
    querystr = querystr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    this.query.find(JSON.parse(querystr));
    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortby = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortby);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  //http://localhost:5000/api/players?page=1&limit=4
  paginating() {
    const page = this.queryString.page * 1 || 1; //initially its first page
    const limit = this.queryString.limit * 1 || 5; //first page with 4 data
    const skip = (page - 1) * limit; //1st page skip 0 data ,2nd page skip first 4 data
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = APIfeatures;