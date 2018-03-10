import $ from './jquery-3.1.1.min';

export function entry() {
    $(document).ready(() => {

        console.log('I am ready to animate!');

        applyEvents();
        animateAll();
    });
}

$(document).bind('mousewheel', () => {
    checkScrolled();
});

export function applyEvents() {
    $('body').on('click', '.menu-icon', () => {
        if ($('.anima-navbar').css('margin-top') == '0px') {
            Anima().animateBlock(
				".anima-navbar",
				{
					delay : '1s',
					visibility: "visible",
					swipePath: $('.header').height() + 'px'
				}
			);
        } else {
            Anima().animateBlock(
				".anima-navbar",
				{ 
					delay : '0.3s',
					visibility: "hidden",
					swipePath: '0px'
				}
			);
        }
    });
    
    $('body').on('click', '.view-footer', () => {
        if ($('.footer').css('margin-top') == '0px') {
            Anima().animateBlock(
				".footer",
				{
					delay : '1s',visibility: "visible",
					swipePath: -$('.header').height()/1.5 + 'px'
				}
			);
        } else {
            Anima().animateBlock(
				".footer",
				{
					delay : '0.3s',
					visibility: "hidden",
					swipePath: '0px'
				}
			);
        }  
    });
    
    $('body').on('click', '.redirect-link', () => {
        console.log('redirected');
    });
    
}



export const setupMainBg = img => {
    
    return {
        height: window.innerHeight,
        backgroundImage: "url(" + img + ")"
   }
}

export const setupHeader = color => {
    
    return {
        marginTop: '-100%',
        backgroundColor: color,
   }
}

export const setupBlankBlock = _ => {
    
    return {
        height: window.innerHeight,
   }
}

export function checkScrolled() {
    if (window.event.deltaY > 0) {
        deAnimateAll();
		
        Anima().animateBlock(
			".reg-wrapper",
			{
				delay : '2s',visibility: 
				"visible",
				swipePath: -$('.reg-wrapper').height() + 'px'
			}
		);
		
        Anima().animateBlock(
			".header",
			{
				delay : '0.5s', 
				visibility: "visible",
				swipePath: '0%'
			}
		);
    } else {
        animateAll();
		
        Anima().animateBlock(
			".reg-wrapper", 
			{ 
				delay : '0.5s', 
				visibility: "hidden",
				swipePath: window.innerHeight + 'px'
			}
		);
    
        Anima().animateBlock(
			".header", 
			{ 
				delay : '0.5s', 
				visibility: "hidden",
				swipePath: '-100%'
			}
		);
        
        Anima().animateBlock(
			".anima-navbar", 
			{ 
				delay : '0s', 
				visibility: "hidden",
				swipePath: '0px'
			}
		);
        
        Anima().animateBlock(
			".footer", 
			{ 
				delay : '0.3s', 
				visibility: "hidden",
				swipePath: '0px'
			}
		);
    }
}


export function animateAll() {
    Anima().animateText(
		".greetings", 
		{ 
			delay : '1s', 
			visibility: "visible", 
			color: 'white', 
			swipePath: window.innerHeight/2.5 + 'px'
		}
	);
    
    Anima().animateText(
		".customer-text", 
		{ 
			delay : '2s', 
			visibility: "visible", 
			color: 'white', 
			swipePath: window.innerHeight/3.5 + 'px'
		}
	);
    
    Anima().animateText(
		".swipe-text", 
		{ 
			delay : '2s', 
			visibility: "visible",
			color: '#ffb6c9',
			swipePath: '1px',
			shadowOpacity: '1'
		}
	);
}


function deAnimateAll() {
    Anima().animateText(
		".greetings", 
		{ 
			delay : '1s', 
			visibility: "visible", 
			color: 'white', 
			swipePath: -window.innerHeight/2.5 + 'px'
		}
	);
    
    Anima().animateText(
		".customer-text", 
		{ 
			delay : '2s', 
			visibility: "visible", 
			color: 'white', 
			swipePath: -window.innerHeight/3.5 + 'px'
		}
	);
    
    Anima().animateText(
		".swipe-text", 
		{ 
			delay : '2s', 
			visibility: "visible",
			color: '#ffb6c9',
			swipePath: -'1px',
			shadowOpacity: '1'
		}
	);
}


export const Anima = _ => ({
    
    animateText: (targetClass, options) => {
        
        $(targetClass).css({
            "transition": "all " + (options.delay || '5s') + " ease"
        });

        $(targetClass).css({
            "text-shadow": "0 0 10px rgba(0, 0, 0, " + (options.shadowOpacity || '0.3') + ")"
        });

        $(targetClass).css({
            "visibility": options.visibility || 'hidden'
        });

        $(targetClass).css({
            "color": options.color || 'black'
        });

        $(targetClass).css({
            "margin-top": options.swipePath || '100px'
        });
        
    },
    
    animateBlock: (targetClass, options) => {
        $(targetClass).css({
            "transition": "all " + (options.delay || '5s') + " ease"
        });
        
        $(targetClass).css({
            "visibility": options.visibility || 'hidden'
        });
        
        $(targetClass).css({
            "margin-top": options.swipePath || '100px'
        });
        
        $(targetClass).css({
            "box-shadow": "0 0 10px black"
        });
    }
})