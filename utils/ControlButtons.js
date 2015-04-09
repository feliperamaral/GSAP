function ControlButtons(container, timeline) {
    "use strict";
    var tl = timeline;
    var slider;
    var buttons = {
        play: {fn: 'play'},
        pause: {fn: 'pause'},
        resume: {fn: 'resume'},
        reverse: {fn: 'reverse'},
        restart: {fn: 'restart'}
    };
    var btnInstances = [];
    var btnContainer = document.createElement('div');


    function init() {
        if (typeof container === 'string') {
            container = document.getElementById(container) || document.querySelector(container);
        }

        if (!container) {
            console.error('O parâmetro "container" não é um element DOM');
            return;
        }
        var sliderContainer = document.createElement('div');
        sliderContainer.classList.add('CB-slider');


        container.appendChild(sliderContainer);
        container = sliderContainer;//Overwrite 

        setSlider();
        setButtons();
    }

    function setSlider() {
        slider = document.createElement('div');

        var timeText = document.createElement('div');
        
        container.appendChild(timeText);

        container.appendChild(slider);
        
        var $slider = $(slider).slider({
            slide: function (event, ui) {
                var p = ui.value / 100;
                tl.progress(p);
                tl.stop();

                timeText.innerHTML = p.toFixed(3);
            }
        });

        tl.eventCallback('onUpdate', function () {
            timeText.innerHTML = this.progress().toFixed(3);
            $slider.slider('value', (this.progress() * 100).toFixed(0));
        });
    }

    function setButtons() {
        var btName,
                bt,
                cb = function (e) {
                    tl[this.dataset.fn]();
                };

        for (btName in buttons) {
            bt = document.createElement('button');
            bt.innerHTML = btName + '()';
            bt.dataset.fn = btName;
            btnContainer.appendChild(bt);
            bt.addEventListener('click', cb);
        }

        btnContainer.classList.add('btn-container');
        container.appendChild(btnContainer);
    }

    init();
}