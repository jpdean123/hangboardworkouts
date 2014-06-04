$('#single').change(function(){
		var selection = $('#single').val();
		if(selection == "Entry") {
			console.log('true');
			messages = entrylevel;

		} else {
			if (selection == "Intermediate") {
				console.log('inter');
				messages = intermediatelevel;
			} else {
				console.log('catch all');
			};
		};
	});

$(document).ready(init());


function init() {
	count = 600;
	startcount = count;
	var minutes = Math.floor(count / 60);
	var seconds = count - minutes * 60;
	if (seconds === 0) {
		$('#timer').html(minutes + ':' + seconds + '0');
	} else {
		$('#timer').html(minutes + ':' + seconds);
	};
	$('#message_current').html("");
	$('#message_next').html("");



};





function starttimer() {
	counter = setInterval(timer,1000); //will run timer every 1 second
	var minutes = Math.floor(count / 60);
	var seconds = count - minutes * 60;
	if (seconds === 0) {
		$('#timer').html(minutes + ':' + seconds + '0');
	} else {
		$('#timer').html(minutes + ':' + seconds);
	};
};


var messagestart = "Let's get started";


var entrylevel = [
	"15 second hang, Jug",
	"1 pull-up, Round Sloper",
	"10 second hang, Medium Edge",
	"15 second hang w/ 3 shrugs, Pocket",
	"20 second hang w/ 2 pull-ups, Large Edge",
	"10 second hang, Round Sloper then 5 knee raises, Pocket",
	"4 pull-ups, Large Edge",
	"10 second hang, Medium Edge",
	"3 pull-ups, Jug",
	"Hang as long as you can, Round Sloper"

];

var intermediatelevel = [
	"15 second hang, 3 pull-ups, Large Edge",
	"2 pull ups, Round Sloper then 20 second hang, Medium Edge",
	"20 second hang, Small Edge then 15 second 90&deg bent arm hang, Pocket",
	"30 second hang, Round Sloper",
	"20 second hang, Large Edge then 4 pull-ups, Pocket",
	"3 offset pulls each arm (high arm jug, low arm small hold), Jug/Small Edge Change hands and repeat",
	"15 knee raises, Jug then 15 second hang, Medium Edge",
	"25 second hang, Medium Edge",
	"15 second hang, Slope then 3 pull-ups, Jug",
	"Hang as long as you can, Round Sloper"
];


var messages = intermediatelevel;



function timer () {
	count = count-1;
	
	
	//convert to minutes/secconds
	var minutes = Math.floor(count / 60);
	var seconds = count - minutes * 60;
	var msgcount = startcount/60 - minutes -1;

	function lessthan10() {
		$('#timer').html(minutes + ":" + "0" + seconds);
	}

	$('#message_current').html(messages[msgcount]);
	$('#message_next').html(messages[msgcount + 1]);


	if (minutes == 0) {
		$('#message_current').html('Your Next Workout');
		$('#message_next').html('All Done');
	};

	if (count <= 0) {
		$('#timer').html(minutes + ':' + seconds + "0");
		clearInterval(counter);
		console.log('timer ended');
		return
	};
	if (seconds < 10) {
			lessthan10();
		} else {
			$('#timer').html(minutes + ':' + seconds);

		}

	
};


function resettimer() {
	clearInterval(counter);
	init();


	//eventually actually reset the timer instead of page reload
	//location.reload();
};

function pausetimer() {
	clearInterval(counter);

}