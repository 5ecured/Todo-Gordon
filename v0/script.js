//This is the most basic version. Straight from WatchAndCode

let todoList = {
	todos: [],

	addTodo: function(item) {
		this.todos.push({
			name: item,
			completed: false
		});
	},

	changeTodo: function(pos, item) {
		this.todos[pos].name = item;
	},

	deleteTodo: function(pos) {
		this.todos.splice(pos, 1);
	},

	toggleCompleted: function(pos) {
		if(this.todos[pos].completed === false) {
			this.todos[pos].completed = true;
		} else {
			this.todos[pos].completed = false;
		}
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
	
	toggleCompleted: function() {
		let toggleInput = document.getElementById('toggleInput');
		todoList.toggleCompleted(toggleInput.valueAsNumber);
		toggleInput.value = '';
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

		todoList.todos.forEach(function(todo, position) {
			let li = document.createElement('li');
			let temp = '';

			if(todo.completed === true) {
				temp += '(x)' + ' ' + todo.name;
			} else {
				temp += '( )' + ' ' + todo.name;
			}

			li.id = position;
			li.textContent = temp;
			li.appendChild(this.createDeleteButton());
			ul.appendChild(li);
		}, this)
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
	}
}


view.setupEventListener();











