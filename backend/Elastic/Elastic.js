// class APIfeatures {
//   constructor(query, queryString) {
//     this.query = query;
//     this.queryString = queryString;
//   }
//   filtering() {
//     const queryobj = { ...this.queryString };
//     const excludeFields = ["page", "sort", "limit"];
//     excludeFields.forEach((el) => delete queryobj[el]);
//     let querystr = JSON.stringify(queryobj);
//     //added regex for search capability
//     //http://localhost:8080/api/product?name[regex]=uzi
//     querystr = querystr.replace(
//       /\b(gte|gt|lt|lte|regex)\b/g,
//       (match) => "$" + match
//     );
//     this.query.find(JSON.parse(querystr));
//     return this;
//   }
//   sorting() {
//     if (this.queryString.sort) {
//       const sortby = this.queryString.sort.split(",").join(" ");
//       this.query = this.query.sort(sortby);
//     } else {
//       this.query = this.query.sort("-createdAt");
//     }
//     return this;
//   }
//   //http://localhost:5000/api/players?page=1&limit=4
//   paginating() {
//     const page = this.queryString.page * 1 || 1; //initially its first page
//     const limit = this.queryString.limit * 1 || 5; //first page with 4 data
//     const skip = (page - 1) * limit; //1st page skip 0 data ,2nd page skip first 4 data
//     this.query = this.query.skip(skip).limit(limit);
//     return this;
//   }
// }
// module.exports = APIfeatures;
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  //http://localhost:8080/api/product?keyword=ANYNAME it will find this query from name, brand and category field
  search() {
    // console.log(`keyword`,this.queryString.keyword);
    const keyword = this.queryString.keyword
      ? {
          $or: [
            {
              "productInfo.title": {
                $regex: this.queryString.keyword,
                $options: "i",
              },
            },
            { brand: { $regex: this.queryString.keyword, $options: "i" } },
            { category: { $regex: this.queryString.keyword, $options: "i" } },
            {
              subcategory: { $regex: this.queryString.keyword, $options: "i" },
            },
          ],
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  //http://localhost:8080/api/product?rating[gt]=2&rating[lte]=10
  //http://localhost:8080/enmedium?brand[regex]=hello
  //filter for price and rating
  //added regex for search capability on a specific field such as brand. regex is not allowed to use with date
  filtering() {
    const queryobj = { ...this.queryString };
    const removeFields = ["keyword", "page", "sort", "limit"];
    removeFields.forEach((key) => delete queryobj[key]);
    let querystr = JSON.stringify(queryobj);
    querystr = querystr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    this.query.find(JSON.parse(querystr));
    return this;
  }
  //http://localhost:8080/api/product?sort=rating
  //http://localhost:8080/api/product?sort=-rating
  //FRONTEND
  // <select value={sort} onChange={e => setSort(e.target.value)} >
  //   <option value=''>Newest</option>
  //   <option value='sort=oldest'>Oldest</option>
  //   <option value='sort=-sold'>Best sales</option>
  //   <option value='sort=-price'>Price: Hight-Low</option>
  //   <option value='sort=price'>Price: Low-Hight</option>
  // </select>
  sorting() {
    console.log(this.queryString.sort);
    if (this.queryString.sort) {
      const sortby = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortby);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  //http://localhost:8080/api/product?page=2
  paginating(resultPerPage) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}
module.exports = APIfeatures;
