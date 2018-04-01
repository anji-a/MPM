from .models import MPM_element
import datetime
from .Logging import logError
import sys,os
from bs4 import BeautifulSoup
import json
from django.template.loader import render_to_string


class MM_Utiliy:

    def getElementTypes(self,request):
        """
        Used to get distinct types from the table
        :return:
        """
        element_types = []

        distinct_types = MPM_element.objects.distinct('element_type').values('element_type')

        for element in list(distinct_types):
            element_types.append(element['element_type'])

        return element_types

    def getListofElementsbasedonType(self,request):
        """
        used to get the list of items based on type
        :return:
        """
        element_type = request.POST['element_type']
        elements = []

        ele_obj = MPM_element.objects.filter(element_type=element_type,element_mode="Development").values('element_displayname')

        for element in list(ele_obj):
            elements.append(element['element_displayname'])


        return elements


    def getElementData(self,request):
        """
        This function will return the element data
        :param request:
        :return:
        """
        element_type = request.POST['element_type']
        ele_obj = MPM_element.objects.filter(element_name=element_type).values('element_name','element_stream')

        return list(ele_obj)

    def UISave(self,request):
        """
        Used to save the UI Screen
        :param request:
        :return:
        """
        try:
            print(request.POST)
            # print(request.POST['element_dev_stream'])
            # web_page = WebPage.objects.get_or_create(topic=top, url=fakeurl, name=fake_name)[0]
            # Setup defaults
            element = {}
            element['element_name'] = request.POST['element_name']
            element['element_createddatetime'] = datetime.datetime.now()
            element['element_updatedatetime'] = datetime.datetime.now()
            # element['element_dev_stream'] = request.POST['element_stream']
            element['element_stream'] = MM_Utiliy.parseHtml(self,request.POST['element_stream'],"Save")
            element['element_displayname'] = request.POST['element_name']
            element['element_mode'] = "Development"
            element['element_type'] = request.POST['element_type']

            status = self.ElementDBSave(self, element, request)
            if status == "DBSucess":
                element['element_name'] = request.POST['element_name']
                fileSatatus = self.ElementFileSaveOrUpdate(self, element)
                if fileSatatus == "Element Files save Sucess":
                 return "File Save Sucess"
                else:
                    return "File Save Failed"
                return "Save Sucess"
            else:
                return "DBFail"

        except:
            logError(sys.exc_info())
            return "Save failed"


    def ElementDBSave(self,element,request):

            try:
                print(request.POST)
                ElementObject =  MPM_element.objects.get_or_create(element_name=element['element_name'], defaults=element)[0]
                ElementObject.element_updatedatetime = datetime.datetime.now()
                if (ElementObject.element_createddatetime == ""):
                    ElementObject.element_createddatetime = datetime.datetime.now()

                ElementObject.element_stream = element['element_stream']
                ElementObject.element_displayname = element['element_name']
                ElementObject.element_mode = "Original"
                ElementObject.element_type = element['element_type']

                ElementObject.save()
                element['element_name']=element['element_name']+"_Dev"
                ElementObject = MPM_element.objects.get_or_create(element_name=element['element_name'], defaults=element)[0]
                ElementObject.element_updatedatetime = datetime.datetime.now()
                if (ElementObject.element_createddatetime == ""):
                    ElementObject.element_createddatetime = datetime.datetime.now()

                ElementObject.element_stream = request.POST['element_stream']
                ElementObject.element_displayname = request.POST['element_name']
                ElementObject.element_mode = "Development"
                ElementObject.element_type = element['element_type']

                ElementObject.save()
                return "DBSucess"
            except:
                logError(sys.exc_info())
                return "DBFail"

    def ElementFileSaveOrUpdate(self,element):

        try:
            rootdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            if element['element_type'] == "Section":
                tempplatespath = os.path.join(os.path.join(rootdir, "templates"),"MM")
                filePath = os.path.join(tempplatespath,element['element_name']+".html")

                f = open(filePath, "w+")
                f.write(element['element_stream'])
                f.close()
            return "Element Files save Sucess"
        except:
            logError(sys.exc_info())
            return "Element Save Fail"


    def DickUpdate(self,key,originalData,updateData):

        try:
            if key in originalData:
                originalData[key].update(updateData)

            else:
                originalData[key] = updateData
            return originalData
        except:
            logError(sys.exc_info())
            return originalData

    def getTeplatePath(self,filename):
        """
        It will return the path of the file
        :param filename:
        :return:
        """

        rootdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        tempplatespath = os.path.join(os.path.join(rootdir, "templates"), "MM")
        filePath = os.path.join(tempplatespath,filename+".html")

        return filePath

    def parseHtml(self,html,action):
        """
        Used to parse HTML
        :param html:
        :return:
        """
        soup = BeautifulSoup(html, "lxml")
        generatedhtl = ''
        #print(soup)

        for tag in soup.find_all(attrs={"data-edit": "remove"}):
            tag.decompose()

        for tag in soup.find_all(attrs={"data-edit": "merge"}):
            tag.unwrap()

        for tag in soup.find_all(attrs={"data-edit": "regenerate"}):
            data_controlset = json.loads(tag['data-controlset'])

            #print(".......................",data_controlset.get('layout_class','Hello'))
            if data_controlset.get("controlType", '') == "label":
                new_col_tag = soup.new_tag("div")
                new_col_tag['class'] = data_controlset.get("column_class", '')
                new_col_tag['style'] = data_controlset.get("column_style", '')
                new_label_tag = soup.new_tag("label")
                new_label_tag.string = "{{ "+data_controlset.get("label_property_property", '')+" }}"
                new_label_tag['class'] = data_controlset.get("label_property_class", '')
                new_label_tag['style'] = data_controlset.get("label_property_style", '')
                #new_label_tag.string='{% include "MM/UIOptions.html" %}'
                new_col_tag.append(new_label_tag)
                tag.replace_with(new_col_tag)

            if data_controlset.get("controlType", '') == "input":
                new_col_tag = soup.new_tag("div")
                new_col_tag['class'] = data_controlset.get("column_class", '')
                new_col_tag['style'] = data_controlset.get("column_style", '')
                new_label_tag = soup.new_tag("label")
                new_label_tag.string = "{{ " + data_controlset.get("input_property_label", '') + " }}"
                new_label_tag['for'] = data_controlset.get("input_property_property", '')
                new_label_tag['class'] = data_controlset.get("label_property_class", '')
                new_label_tag['style'] = data_controlset.get("label_property_style", '')
                new_input_tag = soup.new_tag("input")
                new_input_tag['name'] = data_controlset.get("input_property_property", '')
                new_input_tag['class'] = data_controlset.get("property_property_class", '')
                new_input_tag['style'] = data_controlset.get("property_property_style", '')
                new_input_tag['value'] = "{{" + data_controlset.get("input_property_property", '') + "}}"
                new_label_tag.append(new_input_tag)
                new_col_tag.append(new_label_tag)
                tag.replace_with(new_col_tag)

            if data_controlset.get("controlType", '') == "button":
                new_col_tag = soup.new_tag("div")
                new_col_tag['class'] = data_controlset.get("column_class", '')
                new_col_tag['style'] = data_controlset.get("column_style", '')
                new_input_tag = soup.new_tag("input")
                new_input_tag['type'] = "button"
                new_input_tag['value'] = data_controlset.get("button_property_value", '')
                new_input_tag['class'] = data_controlset.get("button_property_class", '')
                new_input_tag['style'] = data_controlset.get("button_property_style", '')
                new_input_tag['onclick'] = data_controlset.get("button_property_click", '')
                new_col_tag.append(new_input_tag)
                tag.replace_with(new_col_tag)

            if data_controlset.get("controlType", '') == "layout":
                tag['class'] = data_controlset.get("layout_class", '')
                tag['style'] = data_controlset.get("layout_style", '')

            if data_controlset.get("controlType",'') == "emptycontol":
                new_col_tag = soup.new_tag("div")
                new_col_tag['class'] = data_controlset.get("column_class", '')
                new_col_tag['style'] = "height:20px;" + data_controlset.get("column_style", '')
                #new_span_tag = soup.new_tag("span")
                #new_span_tag['style'] = "height:20px"
                #new_col_tag.append(new_span_tag)
                tag.replace_with(new_col_tag)



        if action == "Preview":
            try:
                """ReviewfilePath = MM_Utiliy.getTeplatePath(MM_Utiliy, "UIPreview_MPM")
                rf = open(ReviewfilePath, "r+")
                phtml = rf.read()

                Psoup = BeautifulSoup(phtml, "lxml")

                ptag = Psoup.find_all(id="previewID")
                new_tag=soup.new_tag("div")
                new_tag['id']='previewID'
                #print(soup.prettify())
                new_tag.append(soup)


                for el in ptag:
                    el.replace_with(new_tag)

                rf.seek(0)
                rf.write(Psoup.prettify())
                rf.close()"""

                Psoup = BeautifulSoup(soup.prettify(formatter="html"), 'lxml')
                htmlTag = Psoup.body
                headTag = Psoup.new_tag("head")
                linkTag1 = Psoup.new_tag("link")
                linkTag1['href'] = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                linkTag1['rel'] = 'stylesheet'
                linkTag2 = Psoup.new_tag("link")
                linkTag2['href'] = "static/css/Portal.css"
                linkTag2['rel'] = 'stylesheet'
                headTag.append(linkTag1)
                headTag.append(linkTag2)
                #headTag.wrap(' <head><meta charset="utf-8"/><title>Preview</title><link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"/><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script><script src="static/js/Portal.js" type="text/javascript"></script><link href="static/css/Portal.css" rel="stylesheet"/></head>')
                htmlTag.insert_before(headTag)
                print(Psoup)
                return Psoup.prettify(formatter="html")
            except:

                logError(sys.exc_info())


        return soup.prettify(formatter="html")


    def createNewElement(self,request):
        """
        Used to crate new Element
        :param request:
        :return:
        """
        requestData = request.POST.dict()
        print(requestData)
        resdata = {"html": render_to_string("MM/NewHTMLWorkArea.html", requestData), 'responseData': requestData}
        # return JsonResponse(resdata)
        return resdata

    def UI_Preview(self,request):
        parsehtml = MM_Utiliy.parseHtml(MM_Utiliy, request.POST.get('element_stream',''),'Preview')
        rootdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        tempplatespath = os.path.join(os.path.join(rootdir, "templates"), "MM")
        filename = request.POST.get('element_name','')+"_Preview"
        filePath = os.path.join(tempplatespath, filename + ".html")

        f = open(filePath, "w+")
        f.write(parsehtml)
        f.close()

        return filename