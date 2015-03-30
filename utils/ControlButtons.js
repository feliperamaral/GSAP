function ControlButtons(container, timeline) {
    var tl = timeline;
    var buttons = {
        play: {fn: 'play'},
        pause: {fn: 'pause'},
        resume: {fn: 'resume'},
        reverse: {fn: 'reverse'},
        restart: {fn: 'restart'},
    };
    var slider;
    var btnInstances = [];
    var btnContainer = document.createElement('div');
    ;



    var init = function () {
        if (typeof container == 'string') {
            container = document.getElementById(container) || document.querySelector(container);
        }

        if (!container) {
            console.error('O parâmetro "container" não é um element DOM');
            return;
        }
        setSlider();
        setButtons();

    };


    var setSlider = function () {
        var slider = document.createElement('div');
        slider.classList.add('CB-slider');

        container.appendChild(slider);
        var $slider = $(slider).slider({
            slide: function (event, ui) {
                tl.progress(ui.value / 100);
                tl.stop();
            }
        });

        tl.eventCallback('onUpdate', function () {
            $slider.slider('value', (this.progress() * 100).toFixed(0));
        });
    };
    var setButtons = function () {

        for (var btName in buttons) {
            var bt = document.createElement('button');
            bt.innerHTML = btName + '()';
            bt.dataset.fn = btName;
            btnContainer.appendChild(bt);
            bt.addEventListener('click',function(e){
                
                tl[this.dataset.fn]();
            });
        }

        btnContainer.classList.add('btn-container');
        container.appendChild(btnContainer);
    };
    init();
}