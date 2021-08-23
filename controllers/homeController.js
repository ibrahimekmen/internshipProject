function render(req,res){
    res.render('home',{
        gender: "Women",
        categories: req.womenNavbar[0],
        subcategories: req.womenNavbar[1],
        currentRoute: "women",
        breadcrumbs: req.breadcrumbs
    });
}

module.exports = {
    render
}