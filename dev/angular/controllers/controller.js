var hbworkoutsApp = angular.module('hbworkoutsApp', ['ngRoute', 'angular-growl', 'ngAnimate', 'angulartics', 'angulartics.google.analytics']);

hbworkoutsApp.config(function ($routeProvider, $locationProvider) {
 
  $routeProvider
    .when('/',
      {
      	//controller: 'homeCtrl',
        templateUrl: './views/home.html'

      })
    .when('/search',
      {
      	controller: 'searchCtrl',
        templateUrl: './views/search.html'

      })
    .when('/search/:searchterms',
    {
    	controller: 'searchCtrl',
    	templateUrl: './views/search.html'
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
     .when('/help',
      {
        controller: 'helpCtrl',
        templateUrl: './views/help.html'

      })
     .when('/thankyou',
      {
        controller: 'thankyouCtrl',
        templateUrl: './views/thankyou.html'

      })
    .when('/testpage',
    {
    	controller: 'testCtrl',
    	templateUrl: './views/testpage.html'
    })
    .otherwise({ redirectTo: '/' });

});


hbworkoutsApp.config(['growlProvider',
	function (growlProvider){
		growlProvider.globalTimeToLive(5000);
	}]);

hbworkoutsApp.controller('testCtrl',
	['$scope', 'growl', 
	function ($scope, growl) {
		


		
	}]);

hbworkoutsApp.controller('navCtrl',
	['$scope', '$http', '$location',
	function ($scope, $http, $location) {
		$scope.workoutSearch = function () {
			var searchTerms = $('#navbarInput-01').val();
			$location.path('/search/' + searchTerms);

		};

		$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

	}]);


hbworkoutsApp.controller('searchCtrl', 
	['$scope', '$http', '$location', 'growl', '$routeParams', 
	function ($scope, $q, $location, growl, $routeParams) {

	$scope.searchText = $routeParams.searchterms;
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

hbworkoutsApp.controller('addwWorkoutCtrl', 
	['$scope', '$http', '$location', 'growl',
	function ($scope, $q, $location, $http, growl) {
		$scope.workoutAddedMsg = function() {
			growl.addSuccessMessage("Workout Was Added");
		};
}]);



hbworkoutsApp.controller('workoutCtrl', 
	['$scope', '$routeParams', 
	function ($scope, $routeParams) {

	var chime = $('#workoutChime')[0];
	//var audio = new Audio('assets/beep-02.mp3');
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

	//check if its a custom workout
	$scope.isCustom = false;
	if (workoutID == "fG6r7ImwJH") {
		$scope.isCustom = true;
	} else {
		$scope.isCustom = false;
	};

	$scope.lastthree = false;

	//if custom timer, build the array here
	var onelistener;
	var twolistener;
	var threelistener;
	var fourlistener;
	var fivelistener;
	var customWorkout = [];

	function buildTheCustomWorkout (){
		
		//get values from the form
		customSets = $('#sets').val();
		customReps = $('#reps').val();
		customHang = $('#hangtime').val();
		customRest = $('#resttime').val();
		customLongRest = $('#longresttime').val();
		var hangmsg = "Hang";
		var restmsg = "Rest";
		var customSetOfReps = [];
		console.log(customRest);
		clearInterval(onelistener);
		clearInterval(twolistener);
		clearInterval(threelistener);
		clearInterval(fourlistener);
		clearInterval(fivelistener);

		for (var i =  1 ; i <= customSets; i++) {
			for (var x = 1; x <= customReps; x++) {
				var thisHang = {};
				var thisRest = {};
				var repHangTime = customHang;
				var repRestTime = customRest;
				
				thisHang.message = hangmsg;
				thisHang.time = repHangTime;
				customSetOfReps.push(thisHang);

				thisRest.message = restmsg;
				thisRest.time = repRestTime;
				customSetOfReps.push(thisRest);

			};
			var thisLongRest = {};
			thisLongRest.message = restmsg;
			thisLongRest.time = customLongRest;
			customSetOfReps.push(thisLongRest);


		};
		customWorkout.reps = customSetOfReps;
		customWorkout.title = "Custome Workout";
		customWorkout.hangboard = "Any";
		customWorkout.descriptoin = "Well.... you built it";
		console.log(customWorkout);


		initWorkout();
	};

	$scope.custommodel1 = 1;
	$scope.custommodel2 = 6;
	$scope.custommodel3 = 7;
	$scope.custommodel4 = 3;
	$scope.custommodel5 = 120;


	$scope.$watch('custommodel1', function (newVal, oldVal){
		onelistener = setInterval(function(){buildTheCustomWorkout()}, 1);
		
	});
	$scope.$watch('custommodel2', function (newVal, oldVal){
		twolistener = setInterval(function(){buildTheCustomWorkout()}, 1);
		
	});
	$scope.$watch('custommodel3', function (newVal, oldVal){
		threelistener = setInterval(function(){buildTheCustomWorkout()}, 1);
		
	});
	$scope.$watch('custommodel4', function (newVal, oldVal){
		fourlistener = setInterval(function(){buildTheCustomWorkout()}, 1);
		
	});
	$scope.$watch('custommodel5', function (newVal, oldVal){
		fivelistener = setInterval(function(){buildTheCustomWorkout()}, 1);
		
	});



	var workout
	var countdown;
	var totalSteps;
	var currentStep = 0;
	var repStep = -1;
	var steptime;

	function initWorkout(sel) {
		console.log('intiated the function');
	chime.load();
	var custom = true;
	if (workoutID == "fG6r7ImwJH") {
		workout = customWorkout;
		title = workout.title;
		hangboard = workout.hangboard;
		description = workout.description;
		reps = workout.reps;
		totalSteps = reps.length;
		countdown = 4;
		currentStep = 0;
		repStep = -1;


	} else {
	workout = sel;
	console.log('this is the sel');
	console.log(sel);
	title = workout.get('title');
	hangboard = workout.get('hangboard');
	description = workout.get('description');
	reps = workout.get('reps');
	totalSteps = reps.length;
	countdown = 4;
	}};

$scope.startWorkout = function () {
	initWorkout();
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
		console.log($scope.timerSeconds);
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
	$scope.lastthree = false;
	currentStep = currentStep + 1;

		repStep = repStep + 1;

		if (repStep == totalSteps - 1) {
			$scope.nextMsg = "You're All Done!";
			$scope.$apply();
		} else {
			$scope.nextMsg = reps[repStep + 1].message;
			$scope.$apply();
		};
		steptime = reps[repStep].time;
		$scope.currentMsg = reps[repStep].message;
		$scope.$apply();


	console.log(steptime);
	var steptimeStart = steptime;
	stepCounter = setInterval(stepTimer, 1000);
};

function stepTimer() {
	steptime = steptime -1;

	//convert to minutes/secconds
	var minutes = Math.floor(steptime / 60);
	var seconds = steptime - minutes * 60;
	
	//put minutes and seconds on the view
	$scope.timerMinutes = minutes;
	$scope.timerSeconds = seconds;
	$scope.$apply();
	
	console.log('steptime = ' + steptime);
	if (steptime <=3){
		$scope.lastthree = true;
		$scope.$apply();
	};


	if (steptime <= 0) {
		clearInterval(stepCounter);
		console.log('this sound should play');
		 chime.play();
		 console.log('did it play? It should have played');
		

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