Meteor.startup(function (){

var Jazz = document.getElementById("Jazz");
var once = true;
Meteor.setInterval(function(){

  var Sec = ind[sec];
  var Min = ind[min];
  //console.log(sec);
  //console.log(min);
  var sh = chr[Sec].s;
  var mh = chr[Min].s;
  var hh = hind[hour];
  var sl = chr[Sec].l;
  var sm = chr[Sec].m;
  var ml = chr[Min].l;
  var mm = chr[Min].m;

  if (once == true){
    exe(message, 0xc1, 82, 0);
    exe(message, 0xc2, 50, 0);
    hour_min();
    function hour_min(){
      exe(message, 0xe1, ml, mm);
      exe(message, 0x91, mh, 87);
      exe(message, 0x92, hh, 86);
  	 }
  	 once = false;
  } 
    	
  	 exe(message, 0xC0, 45, 0);
    exe(message, 0xe0, sl, sm);
    exe(message, 0x90, sh, 127);
   
  if (Sec == 0){
 	 //console.log(Min);
 	 //console.log(hour);
    exe(message, 0xb1, 121, 0);
    exe(message, 0xb1, 123, 0);
    exe(message, 0xb2, 123, 0);
    hour_min();
  }
  Session.set('time', new Date);
}, 1000);

function message(x,y,z){
  Jazz.MidiOut(x,y,z);
}
function exe(some,x,y,z){
  some(x,y,z);
}

});

UI.body.helpers({
 
  hours: _.range(0, 12),

  degrees: function (){
    return 30 * this;
  },

  handData: function (){
    time = Session.get('time') || new Date;
    sec = time.getSeconds();
    min = time.getMinutes();
    hour = time.getHours();
    return {
    	Hours: hour, 
      hourDegrees: hour * 30,
      Minutes: min,
      minuteDegrees: min * 6,
      Seconds: sec,
      secondDegrees: sec * 6 };
  },

  radial: function (angleDegrees, startFraction, endFraction){
    var r = 100;
    var radians = (angleDegrees-90) / 180 * Math.PI;

    return {
      x1: r * startFraction * Math.cos(radians),
      y1: r * startFraction * Math.sin(radians),
      x2: r * endFraction * Math.cos(radians),
      y2: r * endFraction * Math.sin(radians)
    };
  }
});
