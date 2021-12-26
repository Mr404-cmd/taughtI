const express = require("express");
const data = require("./data");



const   paginator = (data, page, per_page)=> {

  var page = page || 1,
  per_page = per_page || 10,
  offset = (page - 1) * per_page,

  paginateddata = data.slice(offset).slice(0, per_page),
  total_pages = Math.ceil(data.length / per_page);
  return {
  page: page,
  per_page: per_page,
  pre_page: page - 1 ? page - 1 : null,
  next_page: (total_pages > page) ? page + 1 : null,
  total: data.length,
  total_pages: total_pages,
  data: paginateddata
  };
}

const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.get("/records", (req, res) => {

  res.send({
    code: 200,
    data:data
  });
});
app.get("/:id", (req, res) => {
  const result = paginator(data, 1, req.params.id)
  res.send({
    code: 200,
    data:result
  });
});
app.get("/", (req, res) => {

  res.send({
    code: 200,
    data:data
  });
});
app.listen(process.env.PORT || 8080, () => {
  console.log(`Listning ${process.env.PORT || 8080}`);
});
