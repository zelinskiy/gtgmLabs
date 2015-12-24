
MYORDER=[]




function init(){


	jQuery.get("lol.xml", function(data){
		A = new XMLSerializer().serializeToString(data.documentElement);
		jQuery.get("schema.xsd", function(data){
			B = new XMLSerializer().serializeToString(data.documentElement);
			/*
			console.log(A)
			console.log(B)
			*/

			var Module = {
				xml: A,
				schema: B,
				arguments: ["--noout", "--schema", "schema.xsd", "lol.xml"]
			};

			var xmllint = validateXML(Module);
			console.log(xmllint)
		}) 
	}) 


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

		text+=name + "\n" + "$" + price + " * " + quantity  + "  == $" + thissum + "\n--------------\n"

	}
	text+= "===============\nTOTAL: \t\t$" + total
	console.log(text)
	alert(text)
}

function replaceURL(obj){
	if(!obj.passed){
		obj.src = obj.parentNode.childNodes[1].innerHTML
		obj.passed = true
	}


}



function loadXML(fileName){
  var xmlFile = null;
  
  if ("ActiveXObject" in window){
    xmlFile = new ActiveXObject("Microsoft.XMLDOM");
  }
  else if(document.implementation && document.implementation.createDocument){
    xmlFile = document.implementation.createDocument("", "", null)
  }
  else alert ("ERROR");

  xmlFile.async = false;
  try{
    xmlFile.load(fileName);
  }
  catch(e){
    alert("ERROR");
  }

  return(xmlFile);
}

function getStylingResult(xmlFileName, xslFileName){
  var xmlContent = loadXML(xmlFileName);
  var xslContent = loadXML(xslFileName);

  if ("ActiveXObject" in window){return xmlContent.transformNode(xslContent)}

  else if (window.XSLTProcessor){
    var xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xslContent);

    var resultDocument = xsltProcessor.transformToDocument(xmlContent);
    var xmls = new XMLSerializer();
    return xmls.serializeToString(resultDocument);
  }

}

