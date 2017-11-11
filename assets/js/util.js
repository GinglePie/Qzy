var parseDateClientToServer = function(date){
	var arrDate = date.split("/");
	return arrDate[2]+"-"+arrDate[1]+"-"+arrDate[0];
}

var parseDateServerToClient = function(date){
	var arrDate = date.split("-");
	return arrDate[2]+"/"+arrDate[1]+"/"+arrDate[0];
}

var parseDateThToEnNotSeperator = function(date){
	console.log(date);
	if(date == undefined || date == NaN || date == ''){
		return "";
	}else{
		var arrDate = date.split("/");
		return (arrDate[2]>2500?arrDate[2]-543:arrDate[2])+arrDate[1]+arrDate[0];	
	}
}