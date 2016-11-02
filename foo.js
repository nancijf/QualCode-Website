    var windim = new Array();
    var images = new Array();
    var maxImages = 5;
    var opacityOut = 100;
    var opacityIn = 0;
    var step = 5;
    var sdly = 5;
    var ssDelay = 5000;
    var next = 2;
    var toggle=false;
    var intervalTimer;
    var debug;

    function getBrowserStr() {
        return (navigator.userAgent.toLowerCase());
    }
    
 	function getobj(o){

	    if (document.getElementById)
	        return document.getElementById(o)
	    else if (document.all)
	        return document.all.o
	}
    
    function isImageLoaded(img) {
        if (!img.complete) {
            return false;
        }

        if (typeof img.naturalWidth != "undefined" && img.naturalWidth == 0) {
            return false;
        }

        return true;
    }
        
	function truebody(){
	  return (!window.opera && document.compatMode && document.compatMode!="BackCompat")? document.documentElement : 	document.body
	}

    function getwinsize() {
        
        if( typeof( window.innerWidth ) == 'number' ) {
            //Non-IE
            windim[0] = window.innerWidth;
            windim[1] = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
            //IE 6+ in 'standards compliant mode'
            windim[0] = document.documentElement.clientWidth;
            windim[1] = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            //IE 4 compatible
            windim[0] = document.body.clientWidth;
            windim[1] = document.body.clientHeight;
        }
    }

	var effects = {
	    fadeout : function (id) {
	        this.fadeOutLoop(id, opacityOut);
	    },
	    fadeOutLoop : function (id, opacityOut) {
	        var o = getobj(id);
	        if (opacityOut >= step) {
	            effects.setOpacity(o, opacityOut);
	            opacityOut -= step;
	            setTimeout("effects.fadeOutLoop('" + id + "', " + opacityOut + ")", sdly);
	        }else{
	            setTimeout("effects.setOpacity(document.getElementById('"+id+"'), 0)",sdly);
	     	}
	    },
	    fadein : function (id) {
	        this.fadeInLoop(id, opacityIn);
	    },
	    fadeInLoop : function (id, opacityIn) {
	        var o = getobj(id);
	        if (opacityIn < 100) {
	            effects.setOpacity(o, opacityIn);
	            opacityIn += step;
	            setTimeout("effects.fadeInLoop('" + id + "', " + opacityIn + ")", sdly);
	     	}else{
	            setTimeout("effects.setOpacity(document.getElementById('"+id+"'), 100)",sdly);
	     	}
	    },
	    setOpacity : function (o, opacity) {
	        o.style.filter = "alpha(style=0,opacity:" + opacity + ")"; // IE
	        o.style.KHTMLOpacity = opacity / 100; // Konqueror
	        o.style.MozOpacity = opacity / 100; // Mozilla (old)
	        o.style.opacity = opacity / 100; // Mozilla (new)
	    },
	    init : function() {
	    	opacityOut = 100;
	    	opacityIn  = 0;
	    }
	}

    function preload() {
       images[0] = new Image();
       images[1] = new Image();
       images[2] = new Image();
       images[3] = new Image();
       images[4] = new Image();
       images[0].src = "images/codingsupport.jpg";
       images[1].src = "images/education.jpg";
       images[2].src = "images/drgaudit.jpg";
       images[3].src = "images/racmanagement.jpg";
       images[4].src = "images/profpractice.jpg";
    }
    
    function runit() {
        preload();
        effects.setOpacity(getobj('image2'),0);
        getobj('image2').style.display='';
        getobj('holder1').src = images[1].src;        
        intervalTimer = setInterval("nextimage();",ssDelay);
    }
        
    function nextimage() {
        var imgA='image2';
        var imgB='image1';

        if (toggle) {
            imgA='image1';
            imgB='image2';
        }
        
        
        if(next >= maxImages) next = 0;
                
        getobj(imgA).src = getobj('holder1').src;
        getobj('holder1').src = images[next].src;
        effects.fadeout(imgB);
        effects.fadein(imgA);

        toggle = !toggle;

        next++;
        
    }
 