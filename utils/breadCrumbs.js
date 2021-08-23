get_breadcrumbs = function(url) {
    var rtn = [{name: "HOME", url: "/"}];
    var acc = ""; 
    var arr = url.substring(1).split("/");

    for (i=0; i<arr.length; i++){
        if(arr[i] === "product"){
            continue;
        }
        if(arr[i].includes('home?gender=')){
            arr[i] = arr[i].replace('home?gender=','');
        }
        acc = i != arr.length-1 ? acc+"/"+arr[i] : null;
        arr[i] = arr[i].replaceAll("%20"," ");
        arr[i] = arr[i].replaceAll("?","");
        arr[i] = arr[i].replaceAll("-"," ");
        rtn[i+1] = {name: arr[i].toUpperCase(), url: acc};
    }
    return rtn;
};

module.exports = {
    get_breadcrumbs
}