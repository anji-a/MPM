from django.test import TestCase
from bs4 import BeautifulSoup

# Create your tests here.


def parseHTML():
    html = '<div class="dragSpace" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="" ondragstart="" ondragend="" id="MainDragLayout">  <fieldset class="fldset" data-layout-type="Layout" data-edit="merge"><legend class="fldset" data-edit="remove"><span id="lngTitle">Layout</span></legend><div class="container-fluid" id="layout_zisimi659" data-html="0" data-odisplay="Row Field" data-generate="true"><div data-layout="container_layout" data-edit="merge" id="con_aztgsc6fn"><div class="row" data-layout="row" data-generate="true" data-odisplay="Row Field" id="row_rzyedkndi"><div data-layout="row_layout" data-edit="merge"><div id="col_dbms7xxti" class="col-md-6" data-controlset="{&quot;controlType&quot;:&quot;label&quot;}" data-select="col"><div class="dcol"><label></label></div></div> <div class="col-md-6" data-meta="options" data-odisplay="Column Field" id="col_ir2wraang" data-generate="true"><fieldset class="fldset" data-layout-type="Layout" data-edit="merge"><legend class="fldset" data-edit="remove"><span id="lngTitle">Layout</span></legend><div class="container-fluid" id="layout_b98qit8tq" data-html="0" data-generate="true"><div data-layout="container_layout" data-edit="merge" id="con_o08x84vpi"><div class="row" data-layout="row" data-generate="true" data-odisplay="Row Field" id="row_teztni9p1"><div data-layout="row_layout" data-edit="merge"><div id="col_iyz55ghuq" class="col-md-6" data-controlset="{&quot;controlType&quot;:&quot;label&quot;}" data-select="col"><div class="dcol"><label></label></div></div> <div class="col-md-6 dcol" data-draggable="true" data-edit="remove">Drop Here</div></div></div></div></div></fieldset></div><div class="col-md-6 dcol" data-draggable="true" data-edit="remove">Drop Here</div></div></div></div></div></fieldset></div>'
    soup = BeautifulSoup(html, "lxml")
    generatedhtl=''
    #print(soup.find_all(attrs={"data-layout": "row"}))

    for layout in soup.find_all(attrs={"data-edit": "remove"}):
        print(layout)
        layout.decompose()
        print('----------------------------------------')

    print(soup)
    for layout in soup.find_all(attrs={"data-edit": "merge"}):
        print(layout)
        layout.unwrap()
        print('----------------------------------------')
    print(soup)
if __name__ == '__main__':
    print("Popula Script start")
    parseHTML()
    #get_PyElement()
    print("Popula Script end")