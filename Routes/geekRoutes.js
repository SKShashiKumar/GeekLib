// import schema
const Geek = require("../Models/GeekSchema");

const express = require("express");

// import route() for routers
const router = express.Router();

// Root route
router.get("/", async (req, res) => {
  await Geek.find()
    .then((datas) => {
      let tst = req.query.tst;
      res.render("home", { datas: datas, tst: tst });
    })
    .catch((e) => console.log(e));
});

// Add Routes to form
router.get("/add", (req, res) => {
  res.render("addBook");
});

// SaveRoute
router.post("/saveBook", async (req, res) => {
  let { name } = req.body;
  let { author } = req.body;
  let { genere } = req.body;
  let { edition } = req.body;
  let sno = 0;

  // set Serial numbers
  await Geek.findOne()
    .sort({ $natural: -1 })
    .limit(1)
    .then((r) => {
      if (r === null) {
        sno = sno + 1;
      } else {
        sno = r.sn + 1;
      }
    })
    // save to db
    .then(async () => {
      const Geeks = new Geek({ sn: sno, name, author, genere, edition });
      await Geeks.save()
        .then(console.log("Saved"))
        .catch((e) => e);
    })
    // redirect to home
    .then((r) => {
      let string = "Book_added";
      res.redirect("/?tst=" + string);
    })
    .catch((e) => console.log(e.name));
});

// Update Routes
// Getting clicked data for update
router.get("/updateBook/:id/edit", async (req, res) => {
  const id = req.params.id;
  const data = await Geek.find({ sn: id });
  res.render("updateBooks", { data: data });
});

// Update after getting back data
router.post("/updateBook/:id", (req, res) => {
  const { id } = req.params;
  Geek.updateOne(
    { sn: id },
    {
      $set: {
        name: req.body.name,
        author: req.body.author,
        genere: req.body.genere,
        edition: req.body.edition,
      },
    }
  )
    .then((r) => {
      let string = "Changes_saved";
      res.redirect("/?tst=" + string);
    })
    .catch((e) => console.log(e));
});

// Delete Routes
// Getting clicked data for confirmation
router.get("/deleteBook/:id/delete", async (req, res) => {
  const name = req.params.id;
  res.render("deletePop", { name: name });
});

// Update after getting back data
router.post("/deleteBook/:id", (req, res) => {
  const { id } = req.params;
  Geek.deleteOne({ name: id })
    // .then(r => res.redirect('/',{id, tst :'delete'}))
    .then((r) => {
      let string = "Book_deleted";
      res.redirect("/?tst=" + string);
    })
    .catch((e) => console.log(e));
});

// Export router
module.exports = router;
