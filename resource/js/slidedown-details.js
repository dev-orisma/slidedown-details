_slidedownArray = [];
function SlidedownDetails() {
    var element = arguments[0];
    var options = arguments[1];

    this.selector = 'slidedown-details';

    if (typeof element === 'object' && element.nodeType !== undefined) {

        this.opts = this.extend({
            duration: 400,
            easing: 'ease-in-out',
            class: 'default-theme'
        }, options);

        this.init(element);

    } else {

        options = arguments[0];
        var selector = document.querySelectorAll('[' + this.selector + ']');
        if (element.length) {
            selector = element;
        }
        if (!selector.length) 
            return;

        selector.forEach(function(elements) {
            var slidedown = new SlidedownDetails(elements, options);
            _slidedownArray.push(slidedown);
            return slidedown;
        });

    }
}

SlidedownDetails.prototype.init = function (element) {
    if (!this.isValidAttribute(element))
        return;

    element.classList.add(this.opts.class);
    this.el = element.querySelector('details');
    this.summary = this.el.querySelector('summary');
    this.content = this.el.querySelector('.content');
    this.animate = null;
    this.isClose = false;
    this.isOpen = false;
    this.summary.addEventListener('click', function(e) { 
        this.onClick(e); 
    }.bind(this));
};
SlidedownDetails.prototype.onClick = function(event) {
    event.preventDefault();
    this.toggle();
};
SlidedownDetails.prototype.onChange = function() {
    this.el.style.overflow = 'hidden';
};
SlidedownDetails.prototype.toggle = function() {
    this.onChange();
    if (this.isClose || !this.el.open) {
        this.slidedown();
    } else if (this.isOpen || this.el.open) {
        this.slideup();
    }
};
SlidedownDetails.prototype.open = function() {
    this.onChange();
    this.slidedown();
};
SlidedownDetails.prototype.close = function() {
    this.onChange();
    this.slideup();
};
SlidedownDetails.prototype.slideup = function() {
    var that = this;
    this.isClose = true;

    var startHeight = this.el.offsetHeight + 'px';
    var endedHeight = this.summary.offsetHeight + 'px';

    if (this.animate) {
        this.animate.cancel();
    }

    this.animate = this.el.animate({
        height: [startHeight, endedHeight]
    }, {
        duration: that.opts.duration,
        easing: that.opts.easing
    });

    this.animate.onfinish = function() {
        that.onAnimationFinish(false);
    };
    this.animate.oncancel = function() {
        that.isClose = false;
    };
};
SlidedownDetails.prototype.slidedown = function() {
    var that = this;
    this.el.style.height = `${this.el.offsetHeight}px`;
    this.el.open = true;
    window.requestAnimationFrame(() => that.onOpen());
};
SlidedownDetails.prototype.onOpen = function() {
    var that = this;
    this.isOpen = true;

    var startHeight = this.el.offsetHeight + 'px';
    var endedHeight = this.summary.offsetHeight + this.content.offsetHeight + 'px';

    if (this.animate) {
        this.animate.cancel();
    }
    this.animate = this.el.animate({
        height: [startHeight, endedHeight]
    }, {
        duration: that.opts.duration,
        easing: that.opts.easing
    });

    this.animate.onfinish = function() {
        that.onAnimationFinish(true);
    };
    this.animate.oncancel = function() {
        that.isOpen = false;
    };
};
SlidedownDetails.prototype.onAnimationFinish = function(open) {
    this.el.open = open;
    this.animate = null;
    this.isClose = false;
    this.isOpen = false;
    this.el.style.height = '';
    this.el.style.overflow = '';
};
SlidedownDetails.prototype.isValidAttribute = function(selector) {
    return selector.hasAttribute('slidedown-details');
};
SlidedownDetails.prototype.extend = function(options) {
    if (typeof options === 'undefined' || typeof options !== 'object') 
        options = {};

    for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];

        if (!obj) continue;

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === "object" && obj[key] !== null) {
                    if (obj[key] instanceof Array) {
                        options[key] = obj[key].slice(0);
                    } else {
                        options[key] = this.extend(options[key], obj[key]);
                    }
                } else {
                    options[key] = obj[key];
                }
            }
        }
    }
    return options;
};
