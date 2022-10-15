const express = require("express")

const db = require("../data/database");

const router = express.Router();

router.get("/", function(req,res) {
  res.redirect("/posts")  
});

router.get("/posts",async function (req,res) {
    const [posts] = await db.query("select posts.*, authors.name as author_name from posts inner join authors on posts.author_id=authors.id")
    res.render("posts-list", {posts:posts});
});

router.get('/new-post', async function(req, res) {
    const [authors] = await db.query('SELECT * FROM authors');
    res.render('create-post', { authors: authors });
  });

router.get("/posts/:id", async function (req,res) {
    const query = "SELECT posts.*, authors.name AS author_name, authors.email AS author_email FROM posts INNER JOIN authors ON authors.id = posts.author_id WHERE posts.id = ?"
    const [posts] = await db.query(query,[req.params.id])

    const postData = {
        ...posts[0],
        date: posts[0].date.toISOString(),
        humanReadableDate: posts[0].date.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      };

    // Before using postData
    // [
    //     {
    //       id: 2,
    //       title: 'testing2',
    //       summary: 'hello world',
    //       body: 'test',
    //       date: 2022-10-14T22:01:57.000Z,
    //       author_id: 1,
    //       author_name: 'Irvan',
    //       author_email: 'arverix@gmail.com'
    //     }
    //   ]

    if (!posts || posts.length === 0) {
        return res.status(404).render("404")
    }
    console.log(postData)
    res.render("post-detail", {post: postData})
});

router.get("/posts/:id/edit",async function (req,res){
    const [posts] = await db.query("SELECT * FROM posts WHERE id = ?", [req.params.id])
    if (!posts || posts.length === 0) {
    res.status(404).render("404")
    } else {
    res.render("update-post", {post: posts[0]})
}
})

router.post("/posts", function(req,res) {
    const data = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author
    ]
    db.query("insert into posts (title, summary, body, author_id) values(?)",[data])
    res.redirect("/posts")
})

router.post("/posts/:id/edit",async function(req,res) {
    const query = "UPDATE posts SET title=?,summary=?,body=? WHERE id=?";
    await db.query(query,[
        req.body.title,
        req.body.summary,
        req.body.content,
        req.params.id        
    ]);
    res.redirect("/posts");
})

router.post("/posts/:id/delete", async function(req,res){
    const query = "DELETE FROM posts WHERE id=?"
    db.query(query,[req.params.id])
    res.redirect("/posts")
})

module.exports = router;