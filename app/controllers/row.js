var args = arguments[0] || {};
var todos = Alloy.Collections.toDo;

// Change certian view attributes according to each task.
if ($model) {
	if ($model.get('taskStatus') === false) {
		$.task.color = 'black';
		// Task not done? text is black and status indicater is red
		$.statusColor.backgroundColor = 'red';
	} else {
		$.task.color = '#ccc';
		// Task is done? text is faint and status indicater is green
		$.statusColor.backgroundColor = 'green';
	}
}

// Delete the task from collection and update the rows.
function onDeleteTask(e) {
	$model.destroy();	
	todos.remove($model);
	// **Unable to delete model from collection.
	// **Backbone model destroy function doesnt seem to work.
	// **http://stackoverflow.com/questions/17290882/how-to-use-localstorage-in-titanium-alloy
}

// Set the "taskStatus" and "compDate" fields for the model.
function statusChange() {
	if ($model.get('taskStatus') === false) {
		$model.set({
			"taskStatus" : true,
			"compDate" : Date().toString().substring(4, 15)
		});
	} else {
		$model.set({
			"taskStatus" : false
		});
	}
}

function openEdit() {
	Alloy.createController("editTask").getView().open();
	// Open the New Task window
}