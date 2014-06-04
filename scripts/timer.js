$(document).ready(init());


function init() {
	count = 600;
	startcount = count;
	var minutes = Math.floor(count / 60);
	var seconds = count - minutes * 60;
	console.log(minutes + " " + seconds);
	$('#timer').html(minutes + ':' + seconds);
}




function starttimer() {
	counter = setInterval(timer,1000); //will run timer every 1 second
	var minutes = Math.floor(count / 60);
	var seconds = count - minutes * 60;
	$('#timer').html(minutes + ':' + seconds);
};


var messagestart = "Let's get started";
var messages = [
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