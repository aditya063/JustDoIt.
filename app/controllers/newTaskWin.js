var args = arguments[0] || {};

// Add a new task in collection.
function onAddTask() {
	// Task textbox validation.
	if ($.taskTextField.value == '') {
		alert("Please Type Task Name.");
	} else {
		var todos = Alloy.Collections.toDo;
		$.taskDateField.value = Date().toString().substring(4, 15);
		//Create a new model for the todo collection
		var task = Alloy.createModel('toDo', {// creates an instance of a backbone model. (i.e. creates a new todo task to add in collection)
			task : $.taskTextField.value,
			dueDate : $.taskDateField.value,
			taskStatus : "false",
		});
		// Save the model to persistent storage, it refreshes the data in row automaticaly.
		task.save();
		todos.add(task);
		// Close window and clean memory.
		$.newTaskWin.close();
		$.destroy();
		Ti.API.info("Added a task.");
	}
}

function onFocusTextField() {
	$.taskTextField.focus();
}

function onCloseKeyboard(e) {
	e.source.blur();
	Ti.API.info("close keyboard.");
}

function onCloseWindow() {
	$.newTaskWin.close();
}

// Create and view Date Picker when click event of taskDateField is fired.
function onTaskDateField() {

	var picker = Ti.UI.createPicker({
		top : 5, // Create Picker object.
		type : Ti.UI.PICKER_TYPE_DATE,
		useSpinner : true,
		minDate : new Date(2000, 0, 1),
		maxDate : new Date(2025, 11, 31),
		value : new Date(),
	});

	var set = Ti.UI.createButton({// Button to Select date.
		title : 'Select',
		top : 10,
	});

	set.addEventListener('click', function(e) {// Set the value of text field with choosen date and hide the picker view.
		$.taskDateField.setValue('' + picker.value.toString().substring(4, 15));
		$.pickerView.setVisible(false);
	});

	$.pickerView.add(picker);
	// Add Picker to view.
	$.pickerView.add(set);
	// Add select button to view.
	$.pickerView.setVisible(true);
	// Make the view visible.
}

// Open Gallery
// http://appcodingeasy.com/Titanium-Mobile/Choosing-picture-from-gallery-or-camera
function onClickButtonGallery() {
	//open image gallery
	Ti.Media.openPhotoGallery({
		success : function(event) {
			//getting media
			var image = event.media;
			// set image view

			//checking if it is photo
			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				// Display the image and save its path.
				$.taskImage.image = image;

			}
		},
		cancel : function() {

		}
	});

}

// Open Camera
function onClickButtonCamera() {

	//then we are getting image from camera
	Titanium.Media.showCamera({
		//we got something
		success : function(event) {
			//getting media
			var image = event.media;

			//checking if it is photo
			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				//we may create image view with contents from image variable
				//or simply save path to image
				//Ti.App.Properties.setString("image", image.nativePath);
				$.taskImage.image = image;
			}
		},
		cancel : function() {
			//do somehting if user cancels operation
		},
		error : function(error) {
			//error happend, create alert
			var a = Titanium.UI.createAlertDialog({
				title : 'Camera'
			});
			//set message
			if (error.code == Titanium.Media.NO_CAMERA) {
				a.setMessage('Device does not have camera');
			} else {
				a.setMessage('Unexpected error: ' + error.code);
			}

			// show alert
			a.show();
		},
		allowImageEditing : true,
		saveToPhotoGallery : true
	});

}
