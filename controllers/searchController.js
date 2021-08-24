

function render(req,res){
    let searchString = req.query.searchString.toLowerCase();
    const allCategories = req.allCategories;
    const possibleCategories = [];
    const menStrings = ["men","mens","man","mans"];
    const womenStrings = ["women","womens","woman","womans"];
    
    if(menStrings.includes(searchString)){
        res.redirect('/men');
    }else if(womenStrings.includes(searchString)){
        res.redirect('/women');
    }
    
    for(let category of allCategories){
        category.id = category.id.toLowerCase();
        if(category.id.includes(searchString)){
            const splitCategory = category.id.split("-");
            if(splitCategory.length == 3){
                if(splitCategory[2].includes(searchString)){
                    res.redirect(`/${splitCategory[0].replace("s","")}/${category.id}`);
                }
            }else if(splitCategory.length == 2){
                if(splitCategory[1].includes(searchString)){
                    res.redirect(`/${splitCategory[0].replace("s","")}#${splitCategory[1].charAt(0).toUpperCase()}${splitCategory[1].substring(1)}`);
                }
            }
            possibleCategories.push(category.id);
        }
    }
    res.redirect("back");
    
}

module.exports = {
    render
}