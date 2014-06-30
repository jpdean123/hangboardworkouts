var hbworkoutsApp = angular.module('hbworkoutsApp', ['ngRoute', 'ngAudio']);

hbworkoutsApp.config(function ($routeProvider, $locationProvider) {
 
  $routeProvider
    .when('/',
      {
      	controller: 'homeCtrl',
        templateUrl: './views/home.html'

      })
    .when('/addworkout',
      {
        controller: 'addwWorkoutCtrl',
        templateUrl: './views/addworkout.html'

      })
    .when('/workout/:selID',
      {
        controller: 'workoutCtrl',
        templateUrl: './views/workout.html'

      })
    .otherwise({ redirectTo: '/' });

});


hbworkoutsApp.controller('homeCtrl', ['$scope', '$http', '$location', function ($scope, $q, $location, $http) {


	$scope.headline = "Hangboard Workouts";
	var foundWorkouts={};
	var Workouts = Parse.Object.extend("Workouts");
	var query = new Parse.Query(Workouts);

	query.descending("createdAt");
	query.find({
 		 success: function(workoutList) {
  		  $scope.listOfWorkouts = workoutList;
  		  foundWorkouts = workoutList;
  		  $scope.$apply();
  		  setExpandStatus();


  		},
  		error: function(object, error) {
   		 // The object was not retrieved successfully.
   		 // error is a Parse.Error with an error code and description.
  }
});//end query
	$scope.goToPage = function(path){
		console.log(path);
		$location.path(path);
		
	};

//handles the hide/showing in the workout holders
$scope.isExpanded = [];
	function setExpandStatus(){
		
		for (var i = foundWorkouts.length - 1; i >= 0; i--) {
			$scope.isExpanded.push(false);

		};
	};

	$scope.toggle = function(toggleIndex) {
		console.log(toggleIndex);
		console.log($scope.isExpanded[toggleIndex]);
		$scope.isExpanded[toggleIndex] = !$scope.isExpanded[toggleIndex];	
		console.log($scope.isExpanded[toggleIndex]);
	};

}]);//end controller

hbworkoutsApp.controller('addwWorkoutCtrl', ['$scope', '$http', '$location', function ($scope, $q, $location, $http) {

}]);



hbworkoutsApp.controller('workoutCtrl', 
	['$scope', '$routeParams', 
	function ($scope, $routeParams) {

	var audio = new Audio('assets/beep-02.mp3');
	var selectedWorkout;
	var workoutID = $routeParams.selID;

	var Workouts = Parse.Object.extend("Workouts");
	var query = new Parse.Query(Workouts);

	query.equalTo("objectId", workoutID);
	query.find({
 		 success: function(result) {
  		  selectedWorkout = result[0];
  		  initWorkout(selectedWorkout);

  		  $scope.$apply();
  		
  		  

  		},
  		error: function(object, error) {
   		 // The object was not retrieved successfully.
   		 // error is a Parse.Error with an error code and description.
  }
});//end query

	var workout
	var countdown;
	var totalSteps;
	var currentStep = 0;
	var repStep = -1;
	var steptime;

	function initWorkout(sel) {
	workout = sel;
	title = workout.get('title');
	hangboard = workout.get('hangboard');
	description = workout.get('description');
	reps = workout.get('reps');
	totalSteps = reps.length;
	countdown = 4;
	};

$scope.startWorkout = function () {
	console.log('workout started');
	workoutCounter = setInterval(workoutTimer, 1000);

};



function workoutTimer() {
	countdown = countdown-1;
	if (currentStep == 0 ) {
		//convert to minutes and secconds
		var minutes = Math.floor(countdown / 60);
		var seconds = countdown - minutes * 60;
	
	//put minutes and seconds on the view
		$scope.timerMinutes = minutes;
		$scope.timerSeconds = seconds;
		console.log('get ready: ' + countdown);
		$scope.currentMsg = "Get Ready!";
		$scope.nextMsg = reps[0].message;
		$scope.$apply();
		
	};

	if (countdown <= 0) {
		clearInterval(workoutCounter);
		if (currentStep <= totalSteps-1) {
			runWorkout();
		} else {
			console.log('workout over');
		};

	};
};

function runWorkout() {
	currentStep = currentStep + 1;

		repStep = repStep + 1;

		if (repStep == totalSteps - 1) {
			$scope.nextMsg = "You're All Done!";
			$scope.$apply();
		} else {
			$scope.nextMsg = reps[repStep + 1].message;
			$scope.$apply();
		};
		console.log('RepStep is ' + repStep);
		steptime = reps[repStep].time;
		$scope.currentMsg = reps[repStep].message;
		$scope.$apply();


	console.log(steptime);
	var steptimeStart = steptime;
	stepCounter = setInterval(stepTimer, 1000);
};

function stepTimer() {
	steptime = steptime -1;
	console.log(steptime);

	//convert to minutes/secconds
	var minutes = Math.floor(steptime / 60);
	var seconds = steptime - minutes * 60;

	console.log(minutes + ':' + seconds);
	
	//put minutes and seconds on the view
	$scope.timerMinutes = minutes;
	$scope.timerSeconds = seconds;
	$scope.$apply();
	

	if (steptime <= 0) {
		clearInterval(stepCounter);
		console.log('play sounds');
		audio.play();
		

			if (repStep >= totalSteps -1) {
				$scope.currentMsg = "You're Done!";
				$scope.nextMsg = "";
				$scope.timerMinutes = "";
				$scope.timerSeconds = "";
				$scope.$apply();
				
			} else {
				runWorkout();
			};
		
	};

};

function resettimer() {
	location.reload();


	//eventually actually reset the timer instead of page reload
	//location.reload();
};

function pausetimer() {
	clearInterval(stepCounter);

};


}]);