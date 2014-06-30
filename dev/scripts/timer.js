
var workout
var countdown;
var totalSteps;
var currentStep = 0;
var repStep = -1;
var steptime;


function initWorkout() {
	workout = {{selectedWorkout}};
	console.log(workout);
	console.log(workout.get('hangboard'));
	title = workout.get('title');
	hangboard = workout.get('hangboard');
	description = workout.get('description');
	reps = workout.get('reps');
	totalSteps = reps.length;
	countdown = 4;
};



function startWorkout() {
	workoutCounter = setInterval(workoutTimer, 1000);

};



function workoutTimer() {
	countdown = countdown-1;
	if (currentStep == 0 ) {
		//convert to minutes and secconds
		var minutes = Math.floor(countdown / 60);
		var seconds = countdown - minutes * 60;
	
	//put minutes and seconds on the view
	$('#timer').html(minutes + ':' + seconds);
		console.log('get ready:' + countdown);
		$('#message_current').html('Get Ready!');
		$('#message_next').html(reps[0].message);
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
			$('#message_next').html("You're All Done!");
		} else {
			$('#message_next').html(reps[repStep + 1].message);
		};
		console.log('RepStep is ' + repStep);
		steptime = reps[repStep].time;
		$('#message_current').html(reps[repStep].message);
		



	console.log(steptime);
	var steptimeStart = steptime;
	stepCounter = setInterval(stepTimer, 1000);
	//convert to minutes/secconds
	var minutes = Math.floor(steptime / 60);
	var seconds = steptime - minutes * 60;
	
	//put minutes and seconds on the view
	$('#timer').html(minutes + ':' + seconds);




};

function stepTimer(){
	steptime = steptime -1;
	console.log(steptime);

	//convert to minutes/secconds
	var minutes = Math.floor(steptime / 60);
	var seconds = steptime - minutes * 60;

	console.log(minutes + ':' + seconds);
	
	//put minutes and seconds on the view
	$('#timer').html(minutes + ':' + seconds);
	

	if (steptime <= 0) {
		clearInterval(stepCounter);
		var audio = $('#beepsound')[0];
			audio.play();
			if (repStep >= totalSteps -1) {
				$('#message_current').html('You Done');
				$('#message_next').html('');
				$('#timer').html("0:00");
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