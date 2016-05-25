function validateBrowser(){
	/*This function determines how the variables will be passed between html pages.*/
		if(typeof(Storage) !== "undefined") {
		// Code for localStorage/sessionStorage.
			localStorage.validbrowser = "True";
		} else {
		// Sorry! No Web Storage support..
			localStorage.validbrowser = "False";
			alert("Please update your web browser to the newest version for compatibility and security reasons."); 
		}
	}
	
function loadApptForm(){
	if(localStorage.getItem("customer") !== null) {
	// Populate barber field if chosen from index.html page
		$('#name').val(localStorage.getItem("customer"));
	}
	if(localStorage.getItem("email") !== null) {
	// Populate barber field if chosen from index.html page
		$('#email').val(localStorage.getItem("email"));
	}
	if(localStorage.getItem("phone") !== null) {
	// Populate barber field if chosen from index.html page
		$('#phone').val(localStorage.getItem("phone"));
	}
	if(localStorage.getItem("zipcode") !== null) {
	// Populate barber field if chosen from index.html page
		$('#zipcode').val(localStorage.getItem("zipcode"));
	}
	
	if(localStorage.getItem("barberchoice") != null) {
	// Populate barber field if chosen from index.html page
		populateBarber(false)
	}
	document.getElementById('apptDate').valueAsDate = new Date()
	sessionStorage.clear();
}

function populateBarber(sameBarber, addPersonId) {
	//These variable are from the additional people being added
	var currentPerson = $('#' + addPersonId).parents('div').eq( 2 ).attr('id');
	var sameBarberId = $('#' + currentPerson).find('select').attr('id');
	var indexBarber = localStorage.getItem("barberchoice");

	if(indexBarber.substring(0,3) == "btn") {
		indexBarber = indexBarber.substring(7);
	}  
	
	switch(indexBarber) {
		case "Dave":
			(sameBarber) ? $('#' + sameBarberId).val("Dave") : $('#chosenBarber').val("Dave");
			break;
		case "Brian":
			(sameBarber) ? $('#' + sameBarberId).val("Brian") : $('#chosenBarber').val("Brian");
			break;
		case "Jere":
			(sameBarber) ? $('#' + sameBarberId).val("Jere") : $('#chosenBarber').val("Jere");
			break;
		case "Clinton":
			(sameBarber) ? $('#' + sameBarberId).val("Clinton") : $('#chosenBarber').val("Clinton");
			break;
		case "Amanda":
			(sameBarber) ? $('#' + sameBarberId).val("Amanda") : $('#chosenBarber').val("Amanda");
			break;
		case "Sam":
			(sameBarber) ? $('#' + sameBarberId).val("Sam") : $('#chosenBarber').val("Sam");
			break;
		default:
	}
	
	if (sameBarber){
		if ($('#' + addPersonId).prop('checked')) {
			$('#' + sameBarberId).attr('disabled', true);
		}
		else {
			$('#' + sameBarberId).attr('disabled', false);
			$('#' + sameBarberId).val("default");
		}
	}
		
}
	
function validateAddedPeople(isValid) {
	var currentPerson = $('#addPeopleDiv').children().last().attr('id');
	var strMessage = ""

	isValid = true;   
	
	if($('#' + currentPerson).find('input').val() == ""){

		strMessage = "Please enter the persons name that you would like to schedule for an appointment.";
		
		setCSSValidation($('#' + currentPerson).find('input:text').attr('id'));
		$('#' + currentPerson).find('input:text').focus();
		
		isValid = false;
	}
	else{
		clearCSSValidation($('#' + currentPerson).find('input:text').attr('id'));
	}
	
	if ($('#' + currentPerson).find(":selected").text() == "Choose Available Barber"){
		
		if (strMessage == "") {
			strMessage = "Please select a barber for " + $('#' + currentPerson).find('input').val() + ".";
		}
		else {
			strMessage = "Please enter the persons name and the barber you would like to schedule for an appointment."
		}
		
		setCSSValidation($('#' + currentPerson).find('select').attr('id'));
		
		isValid = false;
	}
	else {
		clearCSSValidation($('#' + currentPerson).find('select').attr('id'))
	}

	if (strMessage != "") {
		alert(strMessage);
	}
	
	return isValid;
}

function setCSSValidation(elementId){
	$('#' + elementId).css({
		"border": "1px solid #68ace3", 
		"box-shadow": "0 0 10px #68ace3", 
		"-webkit-transition": "box-shadow linear 1s", 
		"transition": "box-shadow linear 1s"
	});
}

function clearCSSValidation(elementId){
	$('#' + elementId).css({
		"border": "", 
		"box-shadow": "", 
		"-webkit-transition": "", 
		"transition": ""
	});;
}

function setupAddPerson(totalPeople) {
//This function will setup the id's for the html content in the add person section
	var isValid = true;

	switch(totalPeople) {
		case 1:
			jQuery('<div/>', {
				id: 'firstPerson'
			}).appendTo('#addPeopleDiv');
	
			break;
		case 2:
			jQuery('<div/>', {
				id: 'secondPerson'
			}).appendTo('#addPeopleDiv');

			break;
		case 3:
			jQuery('<div/>', {
				id: 'thirdPerson'
			}).appendTo('#addPeopleDiv');

			break;
		case 4:
		jQuery('<div/>', {
			id: 'fourthPerson'
		}).appendTo('#addPeopleDiv');
			
			break;
		default:
			alert("There has been a error in the system.");

		isValid = false;
	}
	
	if(isValid){
		if (sessionStorage.clickcount) {
			sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;
		} 
		else {
			sessionStorage.clickcount = 1;	
		}
		addPersonTemplate()
	}
	
	return isValid;
} 

function addPersonTemplate() {
	var personTemplateId = "personTemplate" + sessionStorage.clickcount;
	var nameId = "person" + sessionStorage.clickcount;
	var barberOptionId = "personBarberOption" + sessionStorage.clickcount;
	var chkSameBarber = "sameBarber" + sessionStorage.clickcount;
	var removePersonId = "removePerson" + sessionStorage.clickcount;
	
	$(function() {
	  // Grab the template script
	  var theTemplateScript = $("#addPersonScript").html();

	  // Compile the template
	  var theTemplate = Handlebars.compile(theTemplateScript);

	  // Define our data object
	  var content={personTemplate:personTemplateId, name:nameId, additionalbarber:barberOptionId, sameBarberId:chkSameBarber, removePersonObject:removePersonId}; 
  

	  // Add the compiled html to the page
	 $('#addPeopleDiv').append(theTemplate(content));
	 //alert($('#addPeopleDiv').html());
	});  
}





