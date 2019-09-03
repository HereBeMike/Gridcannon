
var deck = [];
var slots = [];

window.addEventListener('load', function() {
	window.allowArmour = [];
	initLayout();

	init();

	shuffleDeck();

	dealDeck();
});

function init() {

	var suits = ['hearts', 'diamonds', 'clubs', 'spades'];
	for(var i=0; i<4; i++) {
		for(var n=0; n<13; n++) {
			deck.push(card(n, suits[i]));
		}
	}
	deck.push(card('J', 'Joker1'));
	deck.push(card('J', 'Joker2'));

	var style = document.createElement('style');
	var cardRatio = (3.5/2.5);
	var cardWidth = 98;
	var cardHeight = cardWidth*cardRatio;
	var cardRadius = cardWidth/10;
	var cardSpacing = cardWidth/20;

	var cardBackColor = 'indianred';

	style.innerHTML = `

.card.facedown:after {
	content:' ';
	position:absolute;
	left:0;
	right:0;
	bottom:0;
	top:0;
	border-radius:${cardRadius}px;
	border:1px solid rgba(0,0,0,0.1);
	background-color:white;
	
	background-image:
		radial-gradient(${cardBackColor} ${9*0.25}px, transparent ${10*0.25}px),
		repeating-radial-gradient(${cardBackColor} 0, ${cardBackColor} ${4*0.25}px, transparent ${5*0.25}px, transparent ${20*0.25}px, ${cardBackColor} ${21*0.25}px, ${cardBackColor} ${25*0.25}px, transparent ${26*0.25}px, transparent ${50*0.25}px);
	background-size: ${30*0.25}px ${30*0.25}px, ${90*0.25}px ${90*0.25}px;
	background-position: 0 0;

	box-shadow: inset 0 0 0px ${cardRadius/4}px white,
				inset 0 0 0px ${cardRadius/3}px ${cardBackColor},
				inset 0 0 0px ${cardRadius/2}px white,
				inset 0 0 0px ${cardRadius/2 +1}px ${cardBackColor};
	border: solid 1px black;
}
.card {
	vertical-align:bottom;
	box-sizing:border-box;
	position:relative;
	width:${cardWidth}px;
	height:${cardHeight}px;
	background:white;
	border-radius:${cardRadius}px;
	border:1px solid rgba(0,0,0,0.1);
	box-shadow:0 3px 3px 3px rgba(0,0,0,0.1);
	display:inline-block;
	font-family:sans-serif;
	font-weight:bold;
	margin-left:-${cardWidth-1.25}px;
}
.card:first-child {
	margin-left:initial;
}

.card.hearts:before,
.card.hearts:after {
	content: '\\2665';
    color: red;
}
.card.diamonds:before,
.card.diamonds:after {
	content:'\\2666';
    color: red;
}
.card.spades:before,
.card.spades:after {
	content:'\\2660';
    color: black;
}
.card.clubs:before,
.card.clubs:after {
	content:'\\2663';
    color: black;
}

.card:after,
.card:before {
    text-align: center;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: ${cardHeight*0.9}px;
    overflow: hidden;
}
.card:after {
    color: white !important;
    padding-top:${cardHeight*0.17}px;
    font-size: ${cardHeight*0.64}px;
}

.card.facedown:before,
.card.facedown:after {
	content:' ';
}

.spread .card:first-child,
.slot .card:first-child {
	margin-left:0px !important;
}
.slot .card {
	margin-left:-${cardWidth}px;
}
.spread .card {
	margin-left:-${cardWidth*(5/8)}px;
}
.card .header {
	padding:${cardRadius*0.66}px;
	font-size:${cardRadius*1.5}px;
	text-shadow:0 1px 1px rgba(0,0,0,0.2);
}
.card .header:before {
	margin-right:${cardSpacing}px;
}
.card.diamonds .header,
.card.hearts .header {
	color:red;
}
.card.clubs .header,
.card.spades .header {
	color:black;
}
.card.hearts .header:before {
	content:'\\2665';
}
.card.diamonds .header:before {
	content:'\\2666';
}
.card.clubs .header:before {
	content:'\\2663';
}
.card.spades .header:before {
	content:'\\2660';
}

.slot {
	overflow:hidden;
	position:relative;
	width:${cardWidth+2}px;
	height:${cardHeight+2}px;
	margin:0;
	border:0;
	display:inline-block;

	background-color:silver;
	background-image:
	radial-gradient(circle at 100% 150%, silver 24%, white 25%, white 28%, silver 29%, silver 36%, white 36%, white 40%, transparent 40%, transparent),
	radial-gradient(circle at 0    150%, silver 24%, white 25%, white 28%, silver 29%, silver 36%, white 36%, white 40%, transparent 40%, transparent),
	radial-gradient(circle at 50%  100%, white 10%, silver 11%, silver 23%, white 24%, white 30%, silver 31%, silver 43%, white 44%, white 50%, silver 51%, silver 63%, white 64%, white 71%, transparent 71%, transparent),
	radial-gradient(circle at 100% 50%, white 5%, silver 6%, silver 15%, white 16%, white 20%, silver 21%, silver 30%, white 31%, white 35%, silver 36%, silver 45%, white 46%, white 49%, transparent 50%, transparent),
	radial-gradient(circle at 0    50%, white 5%, silver 6%, silver 15%, white 16%, white 20%, silver 21%, silver 30%, white 31%, white 35%, silver 36%, silver 45%, white 46%, white 49%, transparent 50%, transparent);
	background-size: 100px 50px;
}

.slot:nth-child(odd) {
	background-color:darkgray;
background-image:
radial-gradient(circle at 100% 150%, darkgray 24%, white 25%, white 28%, darkgray 29%, darkgray 36%, white 36%, white 40%, transparent 40%, transparent),
radial-gradient(circle at 0    150%, darkgray 24%, white 25%, white 28%, darkgray 29%, darkgray 36%, white 36%, white 40%, transparent 40%, transparent),
radial-gradient(circle at 50%  100%, white 10%, darkgray 11%, darkgray 23%, white 24%, white 30%, darkgray 31%, darkgray 43%, white 44%, white 50%, darkgray 51%, darkgray 63%, white 64%, white 71%, transparent 71%, transparent),
radial-gradient(circle at 100% 50%, white 5%, darkgray 6%, darkgray 15%, white 16%, white 20%, darkgray 21%, darkgray 30%, white 31%, white 35%, darkgray 36%, darkgray 45%, white 46%, white 49%, transparent 50%, transparent),
radial-gradient(circle at 0    50%, white 5%, darkgray 6%, darkgray 15%, white 16%, white 20%, darkgray 21%, darkgray 30%, white 31%, white 35%, darkgray 36%, darkgray 45%, white 46%, white 49%, transparent 50%, transparent);
background-size: 100px 50px;
}


.slot.outer:hover:after {
	content: attr(data-damage);
	color:white;
	text-shadow:1px 1px 3px rgba(110,112,120,1);
	background-color:rgba(110,112,120,0.3);
	box-shadow:inset 0 0 ${cardWidth/3}px ${cardWidth/10}px rgba(110,112,120,1);
	font-weight:bold;
	position:absolute;
	font-size:${cardHeight/6}px;
	padding-top:${(cardHeight/6)*2}px;
	text-align:center;
	font-family:sans-serif;
	top:0;
	left:0;
	right:0;
	bottom:0;
}
.slot.outer.killable:hover:after {
	content: attr(data-damage);
	color:white;
	text-shadow:1px 1px 3px rgba(255,0,0,1);
	background-color:rgba(200,0,0,0.3);
	box-shadow:inset 0 0 ${cardWidth/3}px ${cardWidth/10}px rgba(255,0,0,1);
	font-weight:bold;
	position:absolute;
	font-size:${cardHeight/6}px;
	padding-top:${(cardHeight/6)*2}px;
	text-align:center;
	font-family:sans-serif;
	top:0;
	left:0;
	right:0;
	bottom:0;
}
.slot.outer.dead.killable:hover:after,
.slot.outer.dead:hover:after,
.slot.outer.killable:empty:hover:after,
.slot.outer:empty:hover:after {
	display:none;
}

.slot.clearable:after {
	content: attr(data-returnmsg);
	color:white;
	text-shadow:1px 1px 3px rgba(60,130,255,1);
	background-color:rgba(60,130,255,0.2);
	box-shadow:inset 0 0 ${cardWidth/3}px ${cardWidth/10}px rgba(60,130,255,0.3);
	font-weight:bold;
	position:absolute;
	font-size:${cardHeight/8}px;
	padding-top:${(cardHeight/6)*2}px;
	text-align:center;
	font-family:sans-serif;
	top:0;
	left:0;
	right:0;
	bottom:0;
}
.slot[data-armour]:before {
	position:absolute;
	z-index:10;
	top:0;
	right:0;
	padding:${cardRadius}px;
	content:attr(data-armour);
	color:blue;
	font-family:sans-serif;
	font-size:${cardRadius*1.5}px;
	font-weight:bold;
}
.slot.dead[data-armour]:before {
	display:none;
}

#shamePile.option:after,
.slot.option:after {
	content:' ';
	position:absolute;
	background-color:rgba(50,255,180,0.3);
	top:0;
	left:0;
	right:0;
	bottom:0;
}

#shamePile {
	background-color:crimson;
	background-image:
	radial-gradient(circle at 100% 150%, crimson 24%, white 25%, white 28%, crimson 29%, crimson 36%, white 36%, white 40%, transparent 40%, transparent),
	radial-gradient(circle at 0    150%, crimson 24%, white 25%, white 28%, crimson 29%, crimson 36%, white 36%, white 40%, transparent 40%, transparent),
	radial-gradient(circle at 50%  100%, white 10%, crimson 11%, crimson 23%, white 24%, white 30%, crimson 31%, crimson 43%, white 44%, white 50%, crimson 51%, crimson 63%, white 64%, white 71%, transparent 71%, transparent),
	radial-gradient(circle at 100% 50%, white 5%, crimson 6%, crimson 15%, white 16%, white 20%, crimson 21%, crimson 30%, white 31%, white 35%, crimson 36%, crimson 45%, white 46%, white 49%, transparent 50%, transparent),
	radial-gradient(circle at 0    50%, white 5%, crimson 6%, crimson 15%, white 16%, white 20%, crimson 21%, crimson 30%, white 31%, white 35%, crimson 36%, crimson 45%, white 46%, white 49%, transparent 50%, transparent);
	background-size: 100px 50px;
}

#draw, #hold, #activeCard, #shamePile {
	display:inline-block;
	margin-right:8px;
	min-width:${cardWidth+2}px;
}
#shamePile {
	position:relative;
	min-width:${cardWidth+2}px;
	height:${cardHeight+2}px;
	padding-right:${cardWidth*(5/8)}px;
}

#field {
	width:${5*(cardWidth+4)}px;
}

`;
	document.body.appendChild(style);
}


function cardValue(value) {
	if(value == 'J') return 'Joker';
	if(value==0) return 'A';
	if(value<10) return value+1;
	var royals = ['J', 'Q', 'K'];
	return royals[value-10];
}
function card(value, suit) {
	var result = document.createElement('div');
	result.classList.add('card', suit, 'value-'+value);
	result.dataset.value = value=="J"?0:value;
	result.dataset.suit = suit;
	result.dataset.v = Number(value=="J"?0:value)+1;

	var header = document.createElement('div');
	header.classList.add('header');
	header.textContent = cardValue(value);

	result.appendChild(header);
	result.addEventListener('dragstart', dragstart);
	result.addEventListener('dragend', dragend);
	return result;
}

function shuffleDeck() {
	function shuffler(a,b){ return Math.random()>0.5?1:-1; }

	deck.sort(shuffler);
	deck.sort(shuffler);
	deck.sort(shuffler);
	deck.sort(shuffler);
	deck.sort(shuffler);
	deck.sort(shuffler);
}

function initLayout() {
	var draw = document.createElement('div');
	draw.id = 'draw';
	var hold = document.createElement('div');
	hold.id='hold';
	var activeCard = document.createElement('div');
	activeCard.id='activeCard';
	var shamePile = document.createElement('div');
	shamePile.id='shamePile';
	shamePile.classList.add('spread');
	var field = document.createElement('div');
	field.id = 'field';

	
	for(var y=0; y<5;y++) {
		slots[y] = [];
		for(var x=0; x<5; x++) {
			if(!((x==0&&y==0) || (x==4&&y==0) || (x==0&&y==4) || (x==4&&y==4))) {
				//skip corners, they aren't slots.
				slots[y][x] = document.createElement('div');
				slots[y][x].classList.add('slot');
				slots[y][x].dataset.x=x;
				slots[y][x].dataset.y=y;
			} else {
				slots[y][x] = document.createElement('div');
				slots[y][x].classList.add('slot','disabled');
				slots[y][x].dataset.x=x;
				slots[y][x].dataset.y=y;
			}
			field.appendChild(slots[y][x]);

			if((y==0||y==4) && x>0&&x<4)slots[y][x].classList.add('outer');
			if((x==0||x==4) && y>0&&y<4)slots[y][x].classList.add('outer');

			slots[y][x].addEventListener('dragover', dragover);
			slots[y][x].addEventListener('dragenter', dragenter);
			slots[y][x].addEventListener('drop', drop);
		}
	}
	for(var y=1; y<4;y++) {
		for(var x=1; x<4;x++) {
			slots[y][x].addEventListener('click', completeClearSlot);
		}
	}

	shamePile.addEventListener('dragover', dragover);
	shamePile.addEventListener('dragenter', dragenter);
	shamePile.addEventListener('drop', drop);

	document.body.appendChild(draw);
	document.body.appendChild(activeCard);
	document.body.appendChild(hold);
	document.body.appendChild(shamePile);
	document.body.appendChild(field);



}

function findBestSlot(c) {
	var royalSlots = [
		slots[0][1],slots[0][2],slots[0][3],
		slots[4][1],slots[4][2],slots[4][3],
		slots[1][0],slots[2][0],slots[3][0],
		slots[1][4],slots[2][4],slots[3][4]
	];
	var suitToMatch = [c.dataset.suit];
	var foundSlots = false;
	var tries = 0;
	while(!foundSlots) {
		tries++;
		if(tries>4){
			console.error("Unable to find a good slot for Royal... bug...");
			break;
		}
		var bestScore = 0;
		var bestSlot = [];
		for(var s=0;s<royalSlots.length; s++) {
			if(royalSlots[s].childElementCount>0) continue; //can't place a card in an occupied slot
			var adjacent = getAdjacent(royalSlots[s]);
			
			var ac = adjacent.lastElementChild;
			if(ac) {
				if(suitToMatch.indexOf(ac.dataset.suit)>=0) {
					if(Number(ac.dataset.value)>bestScore) {
						bestScore = Number(ac.dataset.value);
						bestSlot = [royalSlots[s]];
					} else if(Number(ac.dataset.value)==bestScore) {
						//add another:
						bestScore = Number(ac.dataset.value);
						bestSlot.push(royalSlots[s]);
					}
				}
			}
		}
		if(bestSlot.length == 0) {
			//try again with the other suit:
			if(tries==1) {
				suitToMatch.push({"hearts":"diamonds", "diamonds":"hearts", "clubs":"spades","spades":"clubs"}[suitToMatch[0]]);
			} else {
				suitToMatch.push("hearts"); 
				suitToMatch.push("diamonds"); 
				suitToMatch.push("clubs"); 
				suitToMatch.push("spades");
				suitToMatch.push("Joker1");
				suitToMatch.push("Joker2");
			}
		} else {
			foundSlots = true;
		}
	}


	
	return bestSlot;
}

function dragstart(e) {
	var c = this.parentNode.lastElementChild;
	if(c!=this || this.parentNode.id=="shamePile") {
		e.preventDefault();
		return;
	}
	if(c!=this || this.parentNode.classList.contains("slot")) {
		e.preventDefault();
		return;
	}
	e.dataTransfer.setData('text', '.card[data-value="'+e.target.dataset.value + '"][data-suit="'+e.target.dataset.suit+'"]');
	window.dragCard = e.target;

	if(c.dataset.value>9) {

		var bestSlot = findBestSlot(c);
		
		for(var i=0; i<bestSlot.length; i++) {
			bestSlot[i].classList.add("option");
		}
	} else {
		//console.log('here', c.dataset.value);
		var fountOption = false;
		for(var y=1; y<4; y++) {
			for(var x=1; x<4; x++) {
				var sc = slots[y][x].lastElementChild;
				console.log(sc);
				if(sc) {
					if(sc.dataset.value<=c.dataset.value || c.dataset.value==0) {
						slots[y][x].classList.add('option');
						fountOption = true;
					}
				} else {
					slots[y][x].classList.add('option');
					fountOption = true;
				}
			}
		}
		document.getElementById('shamePile').classList.add('option');
		if(!fountOption) {
			var royalSlots = [
				slots[0][1],slots[0][2],slots[0][3],
				slots[4][1],slots[4][2],slots[4][3],
				slots[1][0],slots[2][0],slots[3][0],
				slots[1][4],slots[2][4],slots[3][4]
			];
			for(var i=0; i<royalSlots.length; i++) {
				//Todo: the rule is that the armour must be applied to the royal most like it.
				/*That means: 
					1 - matching suit jack
					2 - matching suit queen
					3 - matching suit king
					4 - matching colour jack
					5 - matching colour queen
					6 - matching colour king
					7 - any jack
					8 - any queen
					9 - any king
				*/
				if(!royalSlots[i].classList.contains('dead') && royalSlots[i].childElementCount == 1) {
					royalSlots[i].classList.add('option');
					window.allowArmour.push(royalSlots[i]);
				}
			}
		}
	}

}
function dragover(e){
	e.preventDefault();
}
function dragenter(e) {
  e.preventDefault()
}
function dragend(e) {
	var options = document.querySelectorAll('.slot.option');
	for(var i=0; i<options.length; i++) {
		options[i].classList.remove('option');
	}
	document.getElementById('shamePile').classList.remove('option');
}
function drop(e) {
	//Figure out how to append the dragged card...
	//console.log(e);
	//console.log(e.dataTransfer.getData('text'));

	var allowArmour = [].concat(window.allowArmour); //copy the list. I hate javascript...
	window.allowArmour = [];

e.preventDefault();

	var c = window.dragCard;//document.querySelector(e.dataTransfer.getData('text'));
	if(c) {
		if(c.dataset.value==0 && this.id=="shamePile") return;//Don't accept an ace or joker in the pile of shame
		var isRoyal = c.dataset.value>=10;
		if(this.id=="shamePile" && !isRoyal) {
			this.appendChild(c);
			startClearSlot();
			//tryDrawCard();
			return;
		}
		if(!isRoyal && (this.dataset.x==0 || this.dataset.x==4 || this.dataset.y==0 || this.dataset.y==4)) {
			if(allowArmour.indexOf(this)>=0) {
				//If we have no other choice we can armour a royal, and then chose a slot to empty
				this.insertBefore(c, this.lastElementChild);
				this.dataset.armour = ["+",Number(c.dataset.value)+1].join('');
				//Getting armour doesn't clear a stack! startClearSlot();
				//remember to calculate damage, since we just added armour:
				calculateDamages();
				tryDrawCard();
			} else {
				//Can't drop here
				console.warn("Can't put a low card on a royal slot");
			}
			return;
		} else if(isRoyal && !(this.dataset.x==0 || this.dataset.x==4 || this.dataset.y==0 || this.dataset.y==4)){
			console.warn("Can't put a royal card on a cannon slot");
			return;
		}

		if(!isRoyal) {
			//Only place a card on a slot with a lower or equal value (unless this is an ace or joker)
			var currentValue = 0;
			if(this.lastElementChild) {
				currentValue = this.lastElementChild.dataset.value;
			}
			if(c.dataset.value<currentValue || c.dataset.value == 0) {
				//var isJoker = c.dataset.suit[0]=="J";
				if(c.dataset.value == 0 || this.id=="shamePile") {
					//joker or ace
					console.log("Moving stack to bottom of deck, due to jack or ace");
					var draw = document.getElementById('draw');
					var items = this.querySelectorAll('.card');
					for(var i=items.length-1; i>=0; i--) {
						if(draw.getElementsByClassName('card').length==0) {
							draw.appendChild(items[i]);
						} else {
							draw.insertBefore(items[i], draw.firstElementChild);
						}
						items[i].classList.add('facedown');
					}
				} else {
					//reject because it's to low a value:
					console.warn("Can't place a card of a lower value into a cannon slot");
					return;
				}
			}

		} else {
			
			var bestSlot = findBestSlot(c);
			console.log(bestSlot);

			if(!(bestSlot.indexOf(this)>=0)) {
				console.warn("Can't put Royal in non-optimal position");
				return;
			}
		}

		this.appendChild(c);

		calculateDamages();

		if(this.dataset.x==1 && Number(this.dataset.y)>0 && Number(this.dataset.y)<4) {
			resolveDamage(4, this.dataset.y);
		}
		if(this.dataset.x==3 && Number(this.dataset.y)>0 && Number(this.dataset.y)<4) {
			resolveDamage(0, this.dataset.y);
		}
		if(this.dataset.y==1 && Number(this.dataset.x)>0 && Number(this.dataset.x)<4) {
			resolveDamage(this.dataset.x, 4);
		}
		if(this.dataset.y==3 && Number(this.dataset.x)>0 && Number(this.dataset.x)<4) {
			resolveDamage(this.dataset.x, 0);
		}

		tryDrawCard();
	}
  //this.append()
}

function getAdjacent(slot) {
	if(slot.dataset.x==0) return slots[slot.dataset.y][Number(slot.dataset.x)+1];
	if(slot.dataset.x==4) return slots[slot.dataset.y][Number(slot.dataset.x)-1];
	if(slot.dataset.y==0) return slots[Number(slot.dataset.y)+1][slot.dataset.x];
	if(slot.dataset.y==4) return slots[Number(slot.dataset.y)-1][slot.dataset.x];
}

function tryDrawCard() {
	var draw = document.getElementById('draw');
	var activeCard = document.getElementById('activeCard');
	if(document.querySelectorAll('#hold .card').length>0 || activeCard.childElementCount>0) {
		return;
		//can't draw until all held cards are done
	}
	if(draw.childElementCount>0) {
		var c = draw.lastElementChild;
		c.classList.remove('facedown');
		c.setAttribute('draggable',true);

		document.getElementById('activeCard').appendChild(c);
	} else {
		startClearSlot(true);
	}
}


function startClearSlot(shame) {
	if(shame) {
		window.shame=true;
	}
	function howMany(n) {
		if(n<5) return 'A few';
		if(n<9) return 'Several';
		return "Lots"
	}
	for(var y=1; y<4;y++) {
		for(var x=1; x<4;x++) {
			slots[y][x].classList.add('clearable');
			slots[y][x].dataset.returnmsg = 'Click to return to deck (' + howMany(slots[y][x].childElementCount) + ')';
		}
	}
}
function completeClearSlot(e) {
	if(this.classList.contains('clearable')) {
		if(window.shame===true) {
			window.shame=false;
			document.getElementById('shamePile').appendChild(this.lastElementChild);
		}
		var cards = this.querySelectorAll('.card');
		var draw = document.getElementById('draw');
		for(var i=cards.length-1; i>=0; i--) {
			if(draw.childElementCount==0) {
				draw.appendChild(cards[i]);
			} else {
				draw.insertBefore(cards[i], draw.firstElementChild);
			}
			cards[i].classList.add('facedown');
		}
		var clearable = document.querySelectorAll('.clearable');
		for(var i=0; i<clearable.length; i++) {
			clearable[i].classList.remove('clearable');
		}
	}

	calculateDamages();
	tryDrawCard();
}


function dealDeck() {
	hold.classList.add('spread');
	for(var i=0; i<deck.length; i++) {
		draw.appendChild(deck[i]);
		deck[i].classList.add('facedown');
	}

	var atx = 1;
	var aty = 1;
	for(var i=0; i<9; i++) {
		
		var c;
		var gotCard = false;
		
		while(!gotCard) {
			c=document.querySelector('#draw .card:last-child');
			c.classList.remove('facedown');
			c.setAttribute('draggable',true);
			gotCard = c.dataset.value<10;
			if(!gotCard) hold.appendChild(c);
		}
		slots[aty][atx].appendChild(c);
		atx++;
		if(aty==2 && atx==2) { atx++; i++; }
		if(atx>3) {
			atx=1;
			aty++;
		}
	}

	tryDrawCard();
}

function resolveDamage(x,y) {
	//if slot has a king, must match suit
	//if slot has a queen, must match color
	//if slot has a jack, just killem.
	var c = slots[y][x].lastElementChild;
	if(c==null) {
		console.warn("No damage to resolve");
		return;
	}
	var isKing = c.dataset.value == 12;
	var isQueen = c.dataset.value == 11;
	var isJack = c.dataset.value == 10;
	var damageTotal = 0;
	var slotCards =	slots[y][x].querySelectorAll('.card');
	for(var i=0; i<slotCards.length; i++) {
		damageTotal += Number(slotCards[i].dataset.value)+1
	}

	if(Number(slots[y][x].dataset.damage)<Number(damageTotal)) {
		//can't kill this one
		console.log("Can't kill Royal because there is not enough damage",Number(slots[y][x].dataset.damage),Number(damageTotal));
		return;
	}

	var kill = false;
	if(isKing) {
		if(x==0) {
			kill = slots[y][x+1].lastElementChild.dataset.suit == c.dataset.suit;
			kill = kill & slots[y][x+2].lastElementChild.dataset.suit == c.dataset.suit;
		}
		if(x==4) {
			kill = slots[y][x-1].lastElementChild.dataset.suit == c.dataset.suit;
			kill = kill & slots[y][x-2].lastElementChild.dataset.suit == c.dataset.suit;
		}
		if(y==0) {
			kill = slots[y+1][x].lastElementChild.dataset.suit == c.dataset.suit;
			kill = kill & slots[y+2][x].lastElementChild.dataset.suit == c.dataset.suit;
		}
		if(y==4) {
			kill = slots[y-1][x].lastElementChild.dataset.suit == c.dataset.suit;
			kill = kill & slots[y-2][x].lastElementChild.dataset.suit == c.dataset.suit;
		}
	} else if(isQueen) {
		var suits = {
			'clubs':['clubs','spades'],
			'spades':['clubs','spades'],
			'diamonds':['diamonds','hearts'],
			'hearts':['diamonds','hearts'],
		};
		var matchSuits = suits[c.dataset.suit];
		if(x==0) {
			kill = matchSuits.indexOf(slots[y][x+1].lastElementChild.dataset.suit)>=0;
			kill = kill & matchSuits.indexOf(slots[y][x+2].lastElementChild.dataset.suit)>=0;
		}
		if(x==4) {
			kill = matchSuits.indexOf(slots[y][x-1].lastElementChild.dataset.suit)>=0;
			kill = kill & matchSuits.indexOf(slots[y][x-2].lastElementChild.dataset.suit)>=0;
		}
		if(y==0) {
			kill = matchSuits.indexOf(slots[y+1][x].lastElementChild.dataset.suit)>=0;
			kill = kill & matchSuits.indexOf(slots[y+2][x].lastElementChild.dataset.suit)>=0;
		}
		if(y==4) {
			kill = matchSuits.indexOf(slots[y-1][x].lastElementChild.dataset.suit)>=0;
			kill = kill & matchSuits.indexOf(slots[y-2][x].lastElementChild.dataset.suit)>=0;
		}
	} else {
		kill = true;
	}
	if(kill) {
		c.classList.add('facedown');
		slots[y][x].classList.add('dead');
	}
}

function calculateDamages() {
	
	function getCardDamage(x,y, suits) {
		var result =  {damage:0, match:false };
		//slots are y,x for no reason
		var c = slots[y][x].lastElementChild;
		if(c) {
			if(c.dataset.suit[0]=='J') {
				result.damage = 0;
				result.match = suits.indexOf(c.dataset.suit)>=0;
			} else {
				result.damage = Number(c.dataset.value)+1;
				result.match = suits.indexOf(c.dataset.suit)>=0;
			}
		}
		return result;
	}

	function slotKillable(x,y, x1,y1, x2,y2) {

		var suit = [];
		var childCard = slots[y][x].lastElementChild;
		if(childCard) {
			
			if(childCard.dataset.value==11) {
				//queen
				suit = [childCard.dataset.suit , 
					{"hearts":"diamonds", "diamonds":"hearts", "clubs":"spades","spades":"clubs"}[childCard.dataset.suit]];
			} else if(childCard.dataset.value==12) {
				//king
				suit = [childCard.dataset.suit];
			} else {
				suit = ['hearts', 'diamonds', 'clubs', 'spades'];
			}
		}

		var damage1 = getCardDamage(x1,y1, suit);
		var damage2 = getCardDamage(x2,y2, suit);
		var damage = Number(damage1.damage) + Number(damage2.damage);
		var canKillTarget = damage1.match && damage2.match;

		if(canKillTarget) {

			var damageTotal = 0;
			var slotCards =	slots[y][x].querySelectorAll('.card');
			for(var i=0; i<slotCards.length; i++) {
				damageTotal += Number(slotCards[i].dataset.value)+1
			}

			if(childCard && damageTotal <= damage) {
				slots[y][x].classList.add('killable');
			} else {
				slots[y][x].classList.remove('killable');
			}
		} else {
			slots[y][x].classList.remove('killable');
		}

		return damage;
	}

	var y=0, x=1;
	slots[y][x].dataset.damage = 
		slotKillable(x,y, x,y+1, x,y+2);
	x++;
	slots[y][x].dataset.damage = 
		slotKillable(x,y, x,y+1, x,y+2);
	x++;
	slots[y][x].dataset.damage = 
		slotKillable(x,y, x,y+1, x,y+2);

	y=4, x=1;
	slots[y][x].dataset.damage = 
		slotKillable(x,y, x,y-1, x,y-2);
	x++;
	slots[y][x].dataset.damage = 
		slotKillable(x,y, x,y-1, x,y-2);
	x++;
	slots[y][x].dataset.damage = 
		slotKillable(x,y, x,y-1, x,y-2);

	y=1, x=0;
	slots[y][x].dataset.damage = 
		slotKillable(x,y, x+1,y, x+2,y);
	y++;
	slots[y][x].dataset.damage = 
		slotKillable(x,y, x+1,y, x+2,y);
	y++;
	slots[y][x].dataset.damage = 
		slotKillable(x,y, x+1,y, x+2,y);

	y=1, x=4;
	slots[y][x].dataset.damage = 
		slotKillable(x,y, x-1,y, x-2,y);
	y++;
	slots[y][x].dataset.damage = 
		slotKillable(x,y, x-1,y, x-2,y);
	y++;
	slots[y][x].dataset.damage = 
		slotKillable(x,y, x-1,y, x-2,y);
}

