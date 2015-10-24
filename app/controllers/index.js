var todos = Alloy.Collections.toDo;


function openViewDialog() {
	$.dialog.show();
}

// Open the New Task window
function addNewTask() {
	Alloy.createController("newTaskWin").getView().open();
}

function onTaskDialogClick(e){// Display tasks All/Pending/Completed
	if (e.index == 1) {// http://developer.appcelerator.com/question/162130/alloy-collection-data-binding---datafilter-on-tableview#answer-274667
		todos.fetch({
			query : 'SELECT * FROM toDo WHERE taskStatus="false"'
		});
	} else if (e.index == 2) {

		todos.fetch({
			query : 'SELECT * FROM toDo WHERE taskStatus="true"'
		});
	}
}

todos.fetch();// Fetch records in table row
$.mainWindow.open();
