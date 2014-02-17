Intoduction to Client Side Application
===============================

This is a repo that supports a talk titled Introduction to Client Side Application with AngularJS 



## First Demo
This demo follows from the todo demo on anuglar's website. I have broken the project up into 7 steps
adding a little bit of functionality with each step. The process is outlined below.


#### Todo 1 - Static markup

In this step we start off with static markup. I decided to start with this so you can see what our
end product will look like. As we continue through each iteration we will take parts of our layout
and hand them off to anuglar. Our markup will look as follows:

	<h2>Todo List</h2>
	<div>
		<div>
			<input type="text" placeholder="Find Todo item">
		</div>
		<span>3 of 4 Remaining - [ archive ]</span>
		<ul>
			<li><input type="checkbox"><span> Todo Item 1 </span></li>
			<li><input type="checkbox"><span> Todo Item 1 </span></li>
			<li><input type="checkbox"><span class="done-true"> Todo Item 1 </span></li>
			<li><input type="checkbox"><span> Todo Item 1 </li>
		</ul>
		<form>
	        <input type="text"  size="30"
	               placeholder="add new todo here">
	    	<input class="btn-primary" type="submit">
	   	</form>
	</div>

Next I will run through each piece in our layout. To start we have a place to search for a todo item. This will be a great feature
for those long todo list. Next you will find a short status telling you how many todo items are left in the total list. On the
same line there will be a button to allow you to archive all of the completed todo items. After that we have the list itself. This list has a checkbox for completion and the todo text next to it. Finally we have the input and button to add a new todo item to our
list.

I feel that is clean simple layout. It will allow us to simple add and archive todo items, mark them complete, and search for an item.

#### Todo 2 - Bootstrap our app and controllers

Bootstrapping an Angular project is handel through the directive `ng-app`. `ng-app` tells Angular this is the part of the application or file I want you to controller. I often place `ng-app` in the opening `html` tag (eg. `<html ng-app>` ) 
so all child nodes are included in the applications. 

I think the next logical step is to allow Angular to handel our todo items. The best way to start is to create a controller
that will provide information from the model to the view. Angular allows use to define a controller for a DOM node and its
childern. To do this simple place `ng-contoller="nameCtrl"` in the html tag you want that controller to support. In our case it
will be the div tag below our h2 tag.

	<div ng-controller="TodoCtrl">
		...
	</div>

Once we have completed that we will need to define the function that will map our div tag to our controller. We do this by simple define a function with the name TodoCtrl.

	function TodoCtrl() {
		...
	}

After we define our function it would be nice to have it manage our todo items and sycn them with our model. The last part of
that previous statement is out of the context of this demo, so we will define an array in our controller that acts like are model.

	function TodoCtrl() {
		todos = [
			{ text: "This is a Todo", done:true },
			{ text: "This is another Todo", done:false },
			{ text: "This is one more Todo", done:true },
			{ text: "This is the last Todo", done:true },
		];
	}


Great job! We are getting closer to have a functioning todo list.

#### Todo 3 - Scope and directives

So great! We have our controller linked up to our div tag. Next we want to replace the static list of todo items with the list
in our controller. Once again Angular comes through for us. The directive `ng-repeat` acts as a foreach loop. Below is our new
list item.

	<ul>
		<li ng-repeat="todo in todos">
			<input type="checkbox"><span class="done-{{ todo.done }}"> {{ todo.text }} </span>
		</li>
	</ul>

All we are doing here is looping through all of our todo items and evaluating their contents. That's awesome right? Well refresh your broswer. No todo items... Where are they at? I forgot to tell you Angular is super modular. The controller is a controller which has no idea of anything else unless you tell it about soemthing eles. We do this through dependence injection. In this case
we want the controller scope to know about the view scope. We can achive this by injecting the view scope into the controller and binding our objects to that scope. Our controller from Todo 2 will change to the following.

	function TodoCtrl($scope) {
		$scope.todos = [
			{ text: "This is a Todo", done:false },
			{ text: "This is another Todo", done:false },
			{ text: "This is one more Todo", done:true },
			{ text: "This is the last Todo", done:false },
		];
	}

#### Todo 4 - Adding a todo item

Well at this point we have Angular managing out todo items, but they are still static. It would be nice if we could add a todo item to our list. We will do this by exploring two more directives: `ng-model` and `ng-submit`. `ng-model` allows us to bind a
data model to an input and `ng-submit` tells angular how to handle a submit event on a form. In our case we want the submit event to call a function that will then update our list.  We will first update our html.

	<form ng-submit="addTodo()">
	    <input type="text"  size="30" ng-model="todoText"
	           placeholder="add new todo here">
		<input class="btn-primary" type="submit" value="add">
	</form>

The next obvious step is to write our `addTodo()` function.

	function TodoCtrl($scope) {
		... 
		$scope.addTodo = function () {
			$scope.todos.push({text:$scope.todoText, done:false });
			$scope.todoText = '';
		}
	}

You will notice we are pushing the text from our `input` definded by `todoText` onto our todo list. After that we define our todoText model as an empty string.

#### Todo 5 - Status update

We are at the point where our application is starting to come together. However, I am not happy our completion status is not updating when adding new items or marking an item as complete. This should not be to hard. We can handle the total number of items by using the javaScript `length` function. Then we will use a function to return the count of unclicked todo items. First we will update our html.

	<span>{{ remaining() }} of {{ todos.length }} Remaining - [ archive ]</span>

I hope at this point you have an idea of what is happening here. We are evaluating the returned value of the function `remaining()` and the value of `todos.length`. Next we will write the function `remaining()`. This function will loop over all of the todo's in the view's scope. If the value of done is false we increment count. When we are finished we return count.

	function TodoCtrl($scope) {
		...
		$scope.remaining = function() {
		    var count = 0;
		    angular.forEach($scope.todos, function(todo) {
		      count += todo.done ? 0 : 1;
		    });
		    return count;
	  	};
	}
	


#### Todo 6 - Archive old todo items.

Dang. I have added a ton of todo items to our list now and most of them are complete. I really would like to get rid of the old todo items. We will do this by using the ng-click directive. Much like the ng-submit it tells angular what to do on a click event. In our case we will want to call a function that removes all of the old todo items. Lets update our markup first.

	<span>{{ remaining() }} of {{ todos.length }} Remaining - [ <a href="" ng-click="archive()">archive</a>]</span>

All we did here was wrap archive in an `a` tag with the ng-click directive calling the function `archive()`. Now lets write our function.

	function TodoCtrl($scope) {
		...
	  	$scope.archive = function() {
	  		var oldTodos = $scope.todos;
		    $scope.todos = [];
		    angular.forEach(oldTodos, function(todo) {
		      if (!todo.done) $scope.todos.push(todo);
	    	});
	  	};
	}

In this function we create a new todo list off of the one in our current scope and set the view's list to an empty array. We then iterator through each of our items pushing uncompleted items onto our view scope list. Not to bad eh?

#### Todo 7 - Searching for an item

Our final step is make the todo items searchable. This is very easy using Angular filters. We will create a model and filter our list base on that model. All we need to do it update our html.

	<input type="text" placeholder="Find Todo item" ng-model="searchText">

	<li ng-repeat="todo in todos | filter:searchText">
		...
	</li>


This is a simple example to show you some of the basic features of Angular. We will dig in a little be deeper in the second demo app.