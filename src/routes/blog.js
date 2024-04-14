const RouterBlog = (router) => 
    router.get('/blog', (req, res) => {
        res.json({"message": "This is Home Page"})
    });

module.exports = { RouterBlog };