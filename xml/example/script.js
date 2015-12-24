
var numPages;
var tableColor = 0x80FFFF;
var nonActHeaderColor = 0xC0C0C0;
var numCols = 5;

function TabString(sBox, sName, sMeasure, sPrice, sText){
    this.checkbox = sBox;
    this.goodName = sName;
    this.measure = sMeasure;
    this.price = sPrice; 
    this.number = sText;
    this.billRow = null;
    this.curPrice = 0;
}

var tabSheets = new Array();
var headers;
var curSheet = 0;
var tabStrings;

var allPrice = 0;
var selected = 0;
////////////////////////////////////////////////////////////////////

function PageLoad(){
    numPages = 0;
    while(document.all("tabSheet" + numPages) != null){
        tabSheets[numPages] = document.all("tabSheet" + numPages);
        numPages++;
    }
    
    headers = new Array(numPages);
    for (i = 0; i < numPages; i++){
        headers[i] = document.all("header" + i);
        headers[i].number = i;
    }
    
    tabSheets[0].style.visibility = "visible";
    headers[0].style.backgroundColor = tableColor;
    headers[0].style.borderBottomColor = tableColor;
        
    tabStrings = new Array(numPages - 1);
    for (i = 0; i < numPages - 1; i++){
        tabStrings[i] = new Array();
        var j = 0;
        while(document.all("checkbox" + i + "_" + j)){
            tabStrings[i][j] = 
                new TabString(document.all("checkbox" + i + "_" + j),
                              document.all("goodName" + i + "_" + j),
                              document.all("measure" + i + "_" + j),
                              document.all("price" + i + "_" + j),
                              document.all("numberGoods" + i + "_" + j));
            tabStrings[i][j].checkbox.checked = false;
            tabStrings[i][j].checkbox.parString = tabStrings[i][j];
            tabStrings[i][j].number.value = 1;
            tabStrings[i][j].curPrice = tabStrings[i][j].price.innerText;
            tabStrings[i][j].number.parString = tabStrings[i][j];
            j++;
        }
    }
}
////////////////////////////////////////////////////////////////////

function HeaderClick(){
    if (event.srcElement.number != curSheet){
        if (curSheet == numPages - 1){
            if (selected != 0){
                for (i = 0; i < numCols; i++)
                    billStrings.rows(selected).cells(i).style.backgroundColor = 0xFFFF80;
            }
            selected = 0;
        }
    
        headers[curSheet].style.backgroundColor = nonActHeaderColor;
        headers[curSheet].style.borderBottomColor = 0x000000;
        tabSheets[curSheet].style.visibility = "hidden";
        
        if (event.srcElement.tagName == "P")
            curSheet = event.srcElement.parentElement.number;
        else
            curSheet = event.srcElement.number;
        tabSheets[curSheet].style.visibility = "visible";
        headers[curSheet].style.backgroundColor = tableColor;
        headers[curSheet].style.borderBottomColor = tableColor;
    }
}
////////////////////////////////////////////////////////////////////

function RowClick(){
    var curObject = event.srcElement;
    while (curObject.tagName != "TR")
        curObject = curObject.parentElement;
    if (selected != 0){
        for (i = 0; i < numCols; i++)
            billStrings.rows(selected).cells(i).style.backgroundColor = 0xFFFF80;
    }
    selected = 0;
    while(billStrings.rows(selected) != curObject)
        selected++;
    if (selected != 0){
        for (i = 0; i < numCols; i++)
            billStrings.rows(selected).cells(i).style.backgroundColor = 0x808080;
    }    
}
////////////////////////////////////////////////////////////////////

function CheckboxClick(){
    var curString = event.srcElement.parString;
    
    if (curString.checkbox.checked){
        var newRow = billStrings.insertRow(-1);
        var newCell = newRow.insertCell(-1);
        
        newRow.onclick = RowClick;
        
        newCell.innerHTML = "<p>" + curString.goodName.innerText + "</p>";
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "<p>" + curString.measure.innerText + "</p>";
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "<p>" + curString.price.innerText + "</p>";
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "<p>" + curString.number.value + "</p>";
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "<p>" + String(curString.curPrice) + "</p>"; 
        for (i = 0; i < numCols; i++)
            newRow.cells(i).className = "tabStringCell";
            
        curString.billRow = newRow;
        newRow.sourString = curString;
        
        curString.number.disabled = false; 
        allPrice += Number(curString.curPrice);
        priceForAll.innerHTML = String(allPrice);
    }  
    else {
        allPrice -= curString.curPrice;
        curString.curPrice = Number(curString.price.innerText);
        curString.number.disabled = true;
        curString.number.value = 1;
        var i = 0;
        while (billStrings.rows(i) != curString.billRow)
            i++;
        billStrings.deleteRow(i);
        curString.billRow = null;
        priceForAll.innerHTML = String(allPrice);
    }               
}
////////////////////////////////////////////////////////////////////

function NumberKeyUp(){
    var curString = event.srcElement.parString;
    var newNumber;

    if (null == event.srcElement.value.match(/^\d+(\.\d+){0,1}$/) 
        || Number(event.srcElement.value) == 0)
    {
        newNumber = -1;
    }
    else
        newNumber = Number(event.srcElement.value);
    

    allPrice -= curString.curPrice;
    curString.curPrice 
        = Math.round(Number(curString.price.innerText) * newNumber * 100) / 100;
    curString.billRow.cells(3).innerHTML 
        = "<p>" + String(newNumber) + "</p>";
    curString.billRow.cells(4).innerHTML 
        = "<p>" + String(curString.curPrice) + "</p>";
    allPrice += curString.curPrice;
    priceForAll.innerHTML = String(allPrice);
}
////////////////////////////////////////////////////////////////////

function ButtonClick(){
    if (event.srcElement == buyBtn){
        window.alert("Thank you!");
        window.close();
        return;
    }
    if (selected != 0){
        var curString = billStrings.rows(selected).sourString;
        allPrice -= curString.curPrice;
        curString.checkbox.checked = false;
        curString.curPrice = Number(curString.price.innerText);
        curString.number.disabled = true;
        curString.number.value = 1;
        var i = 0;
        while (billStrings.rows(i) != curString.billRow)
            i++;
        billStrings.deleteRow(i);
        curString.billRow = null;
        priceForAll.innerHTML = String(allPrice);
        selected = 0;
   }
}