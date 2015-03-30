function EaseButtons(container) {


    var easeNames = [
        'Power0',
        'Power1',
        'Power2',
        'Power3',
        'Power4',
        'Back',
        'Elastic',
        'Bounce',
        'Rough',
        'SlowMo',
        'Stepped',
        'Circ',
        'Expo',
        'Sine'
    ];
    var easeTypes = [
        'easeIn',
        'easeInOut',
        'easeOut',
    ];
    var easeFuncs = {
        'Power0': {
            ease: function () {
                return Power0.easeNone;
            }
        },
        'Power1': {
            easeIn: Power1.easeIn,
            easeInOut: Power1.easeInOut,
            easeOut: Power1.easeOut
        },
        'Power2': {
            easeIn: Power2.easeIn,
            easeInOut: Power2.easeInOut,
            easeOut: Power2.easeOut
        },
        'Power3': {
            easeIn: Power3.easeIn,
            easeInOut: Power3.easeInOut,
            easeOut: Power3.easeOut
        },
        'Power4': {
            easeIn: Power4.easeIn,
            easeInOut: Power4.easeInOut,
            easeOut: Power4.easeOut
        },
        'Back': {
            easeIn: Back.easeIn,
            easeInOut: Back.easeInOut,
            easeOut: Back.easeOut
        },
        'Elastic': {
            easeIn: Elastic.easeIn,
            easeInOut: Elastic.easeInOut,
            easeOut: Elastic.easeOut
        },
        'Bounce': {
            easeIn: Bounce.easeIn,
            easeInOut: Bounce.easeInOut,
            easeOut: Bounce.easeOut
        },
        'Rough': {
            ease: function () {
                return RoughEase.ease;
            }
        },
        'SlowMo': {
            ease: function () {
                return SlowMo.ease;
            }
        },
        'Stepped': {
            ease: function () {
                return SteppedEase.config(6);
            }
        },
        'Circ': {
            easeIn: Circ.easeIn,
            easeInOut: Circ.easeInOut,
            easeOut: Circ.easeOut
        },
        'Expo': {
            easeIn: Expo.easeIn,
            easeInOut: Expo.easeInOut,
            easeOut: Expo.easeOut
        },
        'Sine': {
            easeIn: Sine.easeIn,
            easeInOut: Sine.easeInOut,
            easeOut: Sine.easeOut
        },
    }
    var buttonsInstances = {
        ease: [],
        type: []
    };
    this.buttonsInstances = buttonsInstances;

    var init = function () {
        if (typeof container == 'string') {
            container = document.getElementById(container) || document.querySelector(container);
        }

        if (!container) {
            console.error('O parâmetro "container" não é um element DOM');
            return;
        }
        var buttons = {ease: easeNames, type: easeTypes};
        for (var ii in buttons) {

            for (var i in buttons[ii]) {
                var button = document.createElement('button');
                buttonsInstances[ii].push(button);
                if (i == 0) {
                    button.classList.add('active');
                }
                button.classList.add('btn');
                button.classList.add('btn-default');
                button.classList.add('btn-sm');
                button.innerHTML = buttons[ii][i];
                button.value = buttons[ii][i];
                button.dataset.namespace = ii;

                button.addEventListener('click', selectOnClick);

                container.appendChild(button);
            }
            container.appendChild(document.createElement('br'));


        }
    };

    var selectOnClick = function (e) {

        for (var i in buttonsInstances[e.target.dataset.namespace]) {
            var bt = buttonsInstances[e.target.dataset.namespace][i];
            if (bt == e.target) {
                bt.classList.add('active');
            } else {
                bt.classList.remove('active');
            }
        }
    };

    this.getEase = function () {
        var data = {
            ease: '',
            type: '',
            easeFn: null
        };
        for (var namespace in buttonsInstances) {
            for (var i in  buttonsInstances[namespace]) {
                var bt = buttonsInstances[namespace][i];
                if (bt.classList.contains('active')) {
                    data[namespace] = bt.value;
                    break;
                }
            }
        }
        if (easeFuncs[data.ease][data.type] != undefined) {
            data.easeFn = easeFuncs[data.ease][data.type];
        } else {
            data.easeFn = easeFuncs[data.ease]['ease']();
        }
        return data;
    };




    init();
};


