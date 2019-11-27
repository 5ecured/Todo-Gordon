//This is version 1. New features: 
//- pressing enter in input area is equivalent to clicking the button
//- clicking a todo item toggles it which means the toggle button is removed

let todoList = {
	todos: [],

	addTodo: function(item) {
		this.todos.push({
			name: item,
			completed: false
		});
	},

	changeTodo: function(pos, item) {
		this.todos[pos-1].name = item;
	},

	deleteTodo: function(pos) {
		this.todos.splice(pos, 1);
	},

	toggleCompleted: function(pos) {
		this.todos[pos-1].completed = !this.todos[pos-1].completed;
	},

	toggleAll: function() {
		let total = this.todos.length;
		let count = 0;

		this.todos.forEach(function(todo){
			if(todo.completed === true) count += 1;
		})
	
		this.todos.forEach(function(todo) {
			if(count === total) {
				todo.completed = false;
			} else {
				todo.completed = true;
			}
		})

	}
}

let handlers = {
	addTodo: function() {
		let addInput = document.getElementById('addInput');
		todoList.addTodo(addInput.value);
		addInput.value = '';
		view.displayTodos();
	},

	changeTodo: function() {
		let changeNumber = document.getElementById('changeNumber');
		let changeText = document.getElementById('changeText');
		todoList.changeTodo(changeNumber.valueAsNumber, changeText.value);
		changeNumber.value = '';
		changeText.value = '';
		view.displayTodos();
	},

	deleteTodo: function(pos) {
		todoList.deleteTodo(pos);
		view.displayTodos();
	},
	
	toggleCompleted: function(pos) {
		todoList.toggleCompleted(pos);
		view.displayTodos();
	},

	toggleAll: function() {
		todoList.toggleAll();
		view.displayTodos();
	}
}

let view = {
	displayTodos: function() {
		let ul = document.querySelector('ul');
		ul.textContent = '';

		todoList.todos.forEach((item, index) => {
			let li = document.createElement('li');
			let temp = '';

			if(item.completed === true) {
				temp += '(x)' + ' ' + item.name;
			} else {
				temp += '( )' + ' ' + item.name;
			}

			li.id = index;
			li.textContent = temp;
			li.appendChild(this.createDeleteButton());
			ul.appendChild(li);

			li.addEventListener('click', function(event) {
				handlers.toggleCompleted(index+1);
			})
		})
	},

	createDeleteButton: function() {
		let delButton = document.createElement('button');
		delButton.textContent = 'Delete';
		delButton.className = 'delButtonClass';
		return delButton;
	},

	setupEventListener: function() {
		let ul = document.querySelector('ul');

		ul.addEventListener('click', function(event) {
			if(event.target.className === 'delButtonClass') {
				handlers.deleteTodo(Number(event.target.parentNode.id));
			}
		});
	},

	firstExp1: function() {
		let addInput = document.getElementById('addInput');
		addInput.addEventListener('keyup', function(event) {
			if(event.keyCode === 13) {
				document.getElementById('addButton').click();
			}
		});
	},

	firstExp2: function() {
		let changeText = document.getElementById('changeText');
		changeText.addEventListener('keyup', function(event) {
			if(event.keyCode === 13) {
				document.getElementById('changeButton').click();
			}
		});
	},
}


view.setupEventListener();
view.firstExp1();
view.firstExp2();

// So the first feature I added was to be able to press enter in the input area, instead of having to click the button. This is firstExp1 and firstExp2.
// The logic is simple: add an id to the button. Add eventListener to the input area. On keyup, if the enter key is pressed, then click the button because you added an id
// Second feature is to be able to click on a todo to toggle it. My first thought is to click on the li. Now, li is only available in view.displayTodos as it was created there
// so therefore add the logic there, where else? li was created there. Then, the handlers.toggleCompleted has to be changed to accept an argument.

// tips would be to calm down, work methodically and use proper debugging technique.








