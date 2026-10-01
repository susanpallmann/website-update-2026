class Menu {
    constructor() {
        this.button = $('.menu-button');
        this.menu = $('#mobile-menu');
        this.state = 'closed';
        this.bindClicks();
    }

    open() {
        this.state = 'transitioning';
        let animationInterval = null
        let timestamp = Date.now();

        this.button.addClass('transition');

        animationInterval = setInterval(() => {
            if (timestamp === null) {
                clearInterval(animationInterval);
            } else {
                const currentTime = Date.now();

                if (currentTime - timestamp >= 250) {
                    this.button.removeClass('transition').addClass('opened');
                    this.menu.fadeIn(300);

                    this.state = 'open';
                    clearInterval(animationInterval);
                }
            }
        }, 100);
    }

    close() {
        this.state = 'transitioning';
        let animationInterval = null
        let timestamp = Date.now();

        this.button.addClass('transition').removeClass('opened');

        animationInterval = setInterval(() => {

            if (timestamp === null) {
                clearInterval(animationInterval);

            } else {
                const currentTime = Date.now();

                if (currentTime - timestamp >= 250) {
                    this.button.removeClass('transition');
                    this.menu.fadeOut(300);

                    this.state = 'closed';
                    clearInterval(animationInterval);
                }
            }
        }, 100);
    }

    bindClicks() {
        this.button.on('click', () => {
            if (this.state === 'open') {
                this.close();
            } else if (this.state === 'closed') {
                this.open();
            }
        });
    }
}

class AnimationController {
    constructor() {
        this.state = 'enabled';
        this.button = $('#no-animation');
        this.bindClicks();
    }

    bindClicks() {
        if (this.button) {
            this.button.on('click', () => {

               if (this.state === 'enabled') {
                   $('body').addClass('no-animation');
                   this.state = 'disabled';
                   this.button.text('Enable animation');

               } else if (this.state === 'disabled') {
                   $('body').removeClass('no-animation');
                   this.state = 'enabled';
                   this.button.text('Disable animation');
               }
            });
        }
    }
}

const websiteState = (function() {
    const UI = {
        menu: null,
        animationController: null
    };

    window.getUI = function() {
        return UI;
    };
})();

$(document).ready(function() {
    const UI = getUI();
    UI.menu = new Menu();
    UI.animationController = new AnimationController();
});
