var args = arguments[0] || {};

function onEditTask() {

}

function onFocusTextField() {
	$.editTaskTextField.focus();
}

function onCloseKeyboard(e) {
	e.source.blur();
}

function onCloseWindow() {
	$.editTask.close();
	$.destroy();
}