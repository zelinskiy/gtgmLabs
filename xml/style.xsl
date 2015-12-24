<?xml version="1.0" encoding="UTF-8"?>

<html xsl:version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<script type = "text/javascript" src = "libs/xml/xmllint.js"></script>
<script type = "text/javascript" src = "j.js"></script>
<script type = "text/javascript" src = "http://syssgx.github.com/xml.js/js/xmllint.js
"></script>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>

<script>
	init()

</script>

<body style="font-family:Arial;font-size:12pt;background-color:#EEEEEE">

<center><h1 style="color:teal">CAFE MENU</h1></center>

<xsl:for-each select="breakfast_menu/food">
	<div name="item" style="background-color:teal;color:white;padding:4px">

		<input type="checkbox" />

		<span  style="font-weight:bold"><xsl:value-of select="name"/> - </span>
		<xsl:value-of select="price"/>

		<input style="float:right;" type="text" onkeyup="this.value=this.value.replace(/[^\d]/,'')" size="2" float="right"/>
		</div>

	<div style="margin-left:20px;margin-bottom:1em;font-size:10pt">
		<p>
		<xsl:value-of select="description"/>
		<span style="font-style:italic"> (<xsl:value-of select="calories"/> calories per serving)</span>
		</p>
		<p>
		<img onload="replaceURL(this)" src="http://www.definitivetech.com/images/products/product_image_not_available.gif" width="100"/>
		<span style="display:none;"><xsl:value-of select="image"/></span>
		</p>


  </div>
</xsl:for-each>


<button id="btn1" onclick="buttonHandler()" >make order</button>



</body>
</html>