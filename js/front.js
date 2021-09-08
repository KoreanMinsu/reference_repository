function maxLengthCheck(object, length){
	if (object.value.length > length){
		object.value = object.value.slice(0, length);
	}    
}

function number_format(input){ 
	
    var input = String(input); 
    var reg = /(\-?\d+)(\d{3})($|\.\d+)/; 
    if(reg.test(input)){ 
        return input.replace(reg, function(str, p1,p2,p3){ 
                return number_format(p1) + "," + p2 + "" + p3; 
            }     
        ); 
    }else{ 
        return input; 
    } 
}