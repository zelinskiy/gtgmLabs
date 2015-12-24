
MYORDER=[]

function init(){
	/*
	var ID = 0;

	var errs = xmllint.validateXML({
	    "xml": "lol.xml",
		"schema": "schema.xsd"
	}).errors
	for (i=0;i<errs.length;i++ ){
		error = errs[i]
		console.log(error)
		console.log("==============================")

	}*/
}

function buttonHandler(){

		MYORDER=[]

		I = document.getElementsByName("item")
		for(i=0;i<I.length;i++){
			item = I[i]
			isselected = item.childNodes[0].checked
			name = item.childNodes[1].textContent.slice(0,-3)
			price = parseFloat(item.childNodes[2].textContent.slice(1))
			quantity = parseFloat(item.childNodes[3].value)
			/*
			console.log(name)
			console.log(isselected)			
			console.log(price)
			console.log(quantity)
			*/

			if(isselected){
				order = [name, price, quantity]
				MYORDER.push(order)
			}
			
		}
		formOrder()	
}



function formOrder(){
	text = "YOUR ORDER:\n===============\n"
	total = 0

	for(i=0;i<MYORDER.length;i++){
		item = MYORDER[i]
		name = item[0]
		price = item[1]
		quantity = item[2]
		thissum = price*quantity
		total+=thissum

		text+=name + "\n" + "$" + price + " * " + quantity  + "  == $" + thissum.toFixed(2) + "\n--------------\n"

	}
	text+= "===============\nTOTAL: \t\t$" + total.toFixed(2)
	console.log(text)
	alert(text)
}

function replaceURL(obj){
	obj.src = obj.parentNode.childNodes[1].innerHTML

}