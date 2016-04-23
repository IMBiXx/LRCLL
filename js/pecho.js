var x,
	y,
	zouz,
	pechotageLvl,
	duration,
	posX,
	posY,
	tween,
	pechoted,
  MILLE = 1000;

(function() {
	 init();
	 move();
	 window.onresize = function () {
	 	var w = getWindowSize();
		x = w.x;
		y = w.y;
	 }
})();

function init() {
	var w;

	zouz = document.getElementById('chloe');
	zouz.onclick = function () {
		pecho();
	}

	pechotageLvl = document.getElementById('score');
	pechotageLvl.innerHTML = '0';

	w = getWindowSize();
	x = w.x;
	y = w.y;
}

function move () {
	posX = random(0, x);
	posY = random(0, y);
	duration = random(2, 20) / 10,
  rotation = random(MILLE, 2*MILLE);

	tween = TweenMax.to(zouz, duration, {
		y: posY,
		x: posX,
    rotation:rotation,
		ease: 'Bounce.easeIn',
		onComplete: function() {
			move();
		}
	});
}

function pecho () {
	var t = parseInt(pechotageLvl.innerHTML);

	if(pechoted) return;
	pechoted = true;

	if(tween) tween.kill();

	t++;
	pechotageLvl.innerHTML = ''+t;

	var tl = new TimelineMax({
		repeat:1,
		yoyo:true,
		repeatDelay:1.5,
		onComplete: function() {

			pechoted = false;
			move();
		}
	});
  TweenMax.to(zouz, 2, {
    rotation:MILLE
  });

	tl.append(TweenMax.to(zouz, .5, {
			scaleX:3,
			ease: 'Bounce.easeIn'
		})
	);
	tl.append(TweenMax.to(zouz, .5, {
			scaleX:.5,
			scaleY:3,
			ease: 'Bounce.easeIn'
		})
	);
	tl.append(TweenMax.to(zouz, .7, {
			y: y - 100,
			ease: 'Back.easeIn'
		})
	);
	tl.append(TweenMax.to(zouz, 1, {
			scaleX:3,
			scaleY:.1,
			ease: 'Expo.easeOut'
		})
	);
	tl.play();
}

function random(a, b) {
	return Math.floor(Math.random() * b) + a;
}

function getWindowSize() {
	var w = window,
	    d = document,
	    e = d.documentElement,
	    g = d.getElementsByTagName('body')[0];

    return {
    	x: w.innerWidth || e.clientWidth || g.clientWidth,
    	y: w.innerHeight|| e.clientHeight|| g.clientHeight
    };
}
