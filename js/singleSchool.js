// anrop till json-data --> hämta ut data för den aktuella skolan

var xml03 = "data/kvalitetsarbete_skolkvalitet_grundskolan_gr311.xml";
var xml06 = "data/kvalitetsarbete_skolkvalitet_grundskolan_gr611.xml";
var xml09 = "data/kvalitetsarbete_skolkvalitet_grundskolan_gr911.xml";
var questionArray = [];
var year2009 = 1;
var schoolName = "Bankekind";
var schoolID = 0;

if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
}
else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}

xmlhttp.open("GET", xml03, false);
xmlhttp.send();
xmlDoc = xmlhttp.responseXML;

var data = xmlDoc.getElementsByTagName("data")[0].childNodes[1].nodeValue;
var new_data = data.split(" ");
var questionField = xmlDoc.querySelectorAll("[axisId=axisvar1]");
var questions = questionField[0].getElementsByTagName("value");

for (i = 0;i < questions.length;i++) {
    questionArray[i] = questions[i].getElementsByTagName("textlang")[0].childNodes[0].nodeValue;
}

var schoolField = xmlDoc.querySelectorAll("[axisId=axisvar3]");
var schools = schoolField[0].getElementsByTagName("value");

for (i = 0;i < schools.length;i++) {
    if(schools[i].getElementsByTagName("textlang")[0].childNodes[0].nodeValue == schoolName) { // skolor
        schoolID = i;
    }
} 

document.write(questionArray[0]);
document.write(schoolName);
document.write("<br/>");
document.write();

var questionNumber = 0;
var data_id = (schoolID+1)*(questionNumber+1)*(year2009+1)-1;

document.write(new_data[data_id]);