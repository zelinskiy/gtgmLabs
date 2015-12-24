
<xsl:stylesheet version = "1.0"
                xmlns:xsl = "http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html"/>                
  
  <xsl:template match = "/">
    <script type = "text/javascript" src = "script.js"></script>
    
    <style>
      table.goodsTable {background-color: #FFFF80;
                        border-style: solid; border-width: 1px; border-color: Black;
                        text-align: center;
			}

      td.tabSheetHdr {background-color: #FF8000;
                      border-style: solid; border-width: 1px;
                      border-color: Black;
		       }
      td.header {border-style: solid; border-width: 1px;
                 border-color: Black; 		      
		 cursor:hand;}
      td.tabStringCell {background-color: #FFFF80; border-style: solid; 
                        border-width: 1px; border-color: Black;}
      td.selectedCell {border-style: solid; border-width: 1px;
                        border-color: Black; background-color: Aqua;}
      p.tabStringText {color: Black}
      input.buttons {width: 150px; height: 30px; margin-bottom: 0px; margin-top: 25px;}
    </style>
    
    <body style = "background-color: Black; 
                   text-align: left;"
          onload = "PageLoad()">
    
    <title>
      <xsl:value-of select = "/navMenu/titleMenu"/>
    </title>
    
    <p style = "font-family: Arial; font-size: 15pt; color: White;
                margin-top: 25px; text-align: center">
      <xsl:value-of select = "/navMenu/tabHeader"/>
    </p>

    <table style = "background-color: Silver; margin-left: 30px;
                    text-align: center; margin-bottom: 0px"
           cellspacing = "0" cellpadding = "5">
      <tr>
        <xsl:for-each select = "/navMenu/headers/header">
          <td class = "header" onclick = "HeaderClick()">
            <xsl:attribute name = "id">
              <xsl:value-of select = "@id"/>
            </xsl:attribute>
            <p>
              <xsl:value-of select = "headerText"/>
            </p>
          </td>
        </xsl:for-each>
        <td class = "header" onclick = "HeaderClick()">
          <xsl:attribute name = "id">
            <xsl:value-of select = "/navMenu/headers/billHeader/@id"/>
          </xsl:attribute>
          <xsl:value-of select = "/navMenu/headers/billHeader"/>
        </td>
      </tr>
    </table>

    <table style = "background-color: #80FFFF; margin-top: 0px; margin-left: 30px;
                    border-style: solid; border-width: 1px; border-color: White; 
                    border-top-color: #80FFFF;
                    height: 250px">
      <tr>
        <td style = "vertical-align: top">
          <xsl:for-each select = "/navMenu/tabSheets/tabSheet">
            <div>
              <xsl:attribute name = "style">
                <xsl:text>
                  visibility: hidden; position: absolute; 
                  top: 120px; left: 60px; z-index:
                </xsl:text>
                <xsl:value-of select = "@zIndex"/>
              </xsl:attribute>
              <xsl:attribute name = "id">
                <xsl:value-of select = "@id"/>
              </xsl:attribute>
              <table class = "goodsTable"
                     cellspacing = "0"
                     cellpadding = "5">
                <tr>
                  <td class = "tabSheetHdr">
                    <p style = "color: #FF8000">a</p>
                  </td>
                  <td class = "tabSheetHdr">
                    <p class = "tabStringText">№</p>
                  </td>
                  <td class = "tabSheetHdr">
                    <p class = "tabStringText">Наименование</p>
                  </td>
                  <td class = "tabSheetHdr">
                    <p class = "tabStringText">Мера</p>
                  </td>
                  <td class = "tabSheetHdr">
                    <p class = "tabStringText">Цена</p>
                  </td>
                  <td class = "tabSheetHdr">
                    <p class = "tabStringText">Количество</p>
                  </td>
                </tr>
                  <xsl:for-each select = "tabString">
                  <tr>
                    <td class = "tabStringCell">
                      <xsl:element name = "input">
                        <xsl:attribute name = "type">
                          <xsl:text>checkbox</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name = "checked">
                          <xsl:text>false</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name = "id">
                          <xsl:text>checkbox</xsl:text>
                          <xsl:value-of select = "@index"/>
                        </xsl:attribute>
                        <xsl:attribute name = "onclick">
                          <xsl:text>CheckboxClick()</xsl:text>
                        </xsl:attribute>
                        <xsl:value-of select = "checkbox"/>
                      </xsl:element>   
                    </td>
                    <td class = "tabStringCell">
                      <p class = "tabStringText">
                        <xsl:value-of select = "number"/>
                      </p>
                    </td>
                    <td class = "tabStringCell">
                      <p class = "tabStringText">
                        <xsl:attribute name = "id">
                          <xsl:text>goodName</xsl:text>
                          <xsl:value-of select = "@index"/>
                        </xsl:attribute>
                        <xsl:value-of select = "goodName"/>
                      </p>
                    </td>
                    <td class = "tabStringCell">
                      <p class = "tabStringText">
                        <xsl:attribute name = "id">
                          <xsl:text>measure</xsl:text>
                          <xsl:value-of select = "@index"/>
                        </xsl:attribute>
                        <xsl:value-of select = "measure"/>
                      </p>
                    </td>
                    <td class = "tabStringCell">
                      <p class = "tabStringText">
                        <xsl:attribute name = "id">
                          <xsl:text>price</xsl:text>
                          <xsl:value-of select = "@index"/>
                        </xsl:attribute>
                        <xsl:value-of select = "price"/>
                      </p>
                    </td>
                    <td class = "tabStringCell">
                      <xsl:element name = "input">
                        <xsl:attribute name = "type">
                          <xsl:text>text</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name = "value">
                          <xsl:text>1</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name = "maxlength">
                          <xsl:text>5</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name = "size">
                          <xsl:text>7</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name = "id">
                          <xsl:text>numberGoods</xsl:text>
                          <xsl:value-of select = "@index"/>
                        </xsl:attribute>
                        <xsl:attribute name = "disabled">
                          <xsl:text>true</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name = "onkeyup">
                          <xsl:text>NumberKeyUp()</xsl:text>
                        </xsl:attribute>
                        <xsl:value-of select = "numberGoods"/>
                      </xsl:element>
                    </td>
                  </tr>
                </xsl:for-each>
              </table>
            </div>
          </xsl:for-each>
          <div style = "position: relative; top: 15px; left: 15px; 
                        z-index: 100; visibility: hidden;">
            <xsl:attribute name = "id">
              <xsl:value-of select = "/navMenu/tabSheets/billSheet/@id"/>
            </xsl:attribute>
            <table>
              <tr>
                <td style = "vertical-align: top">
                  <table class = "goodsTable" style="cursor:hand" id = "billStrings" cellspacing = "0" cellpadding = "5">
                    <tr>
                      <xsl:for-each select = "/navMenu/tabSheets/billSheet/billStrings/billStringHdr">
                        <td class = "tabSheetHdr">
                          <p class = "tabStringText">
                            <xsl:value-of select = "."/>
                          </p>
                        </td>
                      </xsl:for-each>
                    </tr>
                  </table>
                </td>
                <td align = "center" width = "400">
                  <label style = "color: Black; margin-left: 60px; margin-top: 5px; margin-right: 0px;
                                  font-size: 20px; text-align: left">
                    <xsl:value-of select = "/navMenu/tabSheets/billSheet/priceForAll"/>
                  </label>
                  <label id = "priceForAll"
                     style = "color: Black; margin-left: 0px; margin-top: 5px; margin-right: 80px;
                              font-size: 20px;">
                    0
                  </label>
                  <br/>
                  <xsl:for-each select = "/navMenu/tabSheets/billSheet/button">
                    <xsl:element name = "input">
                      <xsl:attribute name = "id">
                        <xsl:value-of select = "@id"/>
                      </xsl:attribute>
                      <xsl:attribute name = "type">
                        <xsl:text>button</xsl:text>
                      </xsl:attribute>
                      <xsl:attribute name = "class">
                        <xsl:text>buttons</xsl:text>
                      </xsl:attribute>
                      <xsl:attribute name = "value">
                        <xsl:value-of select = "."/>
                      </xsl:attribute>
                      <xsl:attribute name = "onclick">
                        <xsl:text>ButtonClick()</xsl:text>
                      </xsl:attribute>
                    </xsl:element>
                    <br/>
                  </xsl:for-each>  
                </td>
              </tr>
            </table>
          </div>
          <br/>
        </td>
      </tr>
    </table>
  </body>
  </xsl:template>
    
</xsl:stylesheet>