function TestInput() {

    var countInstances = 0;
    var inputInstances = {};
    var eases = {
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
            ease: RoughEase.ease
        },
        'SlowMo': {
            ease: SlowMo.ease
        },
        'Stepped': {
            ease: SteppedEase.config(6)
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
        }
    };
    var types = {
        slider: {
            events: {change: 'slidechange'},
            factory: function (params, allOptions) {
                var defaultParam = {
                    value: allOptions.value !== undefined ? allOptions.value : 0,
                    valueOnSlider: false,
                    showValue: true
                };
                var params = $.extend(defaultParam, params);
                var slider = $('<div></div>');

                slider[0].getInputVal = function () {
                    var $e = $(this.slider || this);
                    var value = $e.slider('values');
                    if (value.length === 0) {
                        value = $e.slider('value');
                    }
                    return value;
                };
                var updateShowValue = function (e, ui) {
                    sliderContainer
                            .find(params.valueOnSlider ? '.ui-slider-handle' : '.ti-slider-value')
                            .html(ui.value);
                };
                if (params.showValue) {
                    var sliderContainer = $('<div class="ti-container-slider"><div class="ti-slider-value"></div></div>').prepend(slider);
                    sliderContainer[0].slider = slider[0];
                    sliderContainer[0].getInputVal = slider[0].getInputVal;

                    slider.on('slide', updateShowValue);
                }

                slider.slider(params);

                if (params.showValue) {
                    updateShowValue(undefined, {value: slider.slider('value')});
                    slider = sliderContainer;
                }
                return slider;
            }
        },
        ease: {
            factory: function (params, allOptions) {
                var options = '<option></option>';
                for (var easeName in eases) {
                    for (var easeFn in eases[easeName]) {
                        if (easeFn === 'ease') {
                            easeValue = easeName;
                        } else {
                            easeValue = easeName + '.' + easeFn;
                        }
                        options += '<option>' + easeValue + '</option>';
                    }

                }
                var select = $('<select class="ti-input-ease">' + options + '</select>');

                select[0].getInputVal = function () {
                    if (this.value === '') {
                        return {
                            string: '',
                            fn: null
                        };
                    }
                    var easeName = this.value.split('.');
                    if (easeName.length === 1) {
                        easeName.push('ease');
                    }
                    return {
                        string: this.value,
                        fn: eases[easeName[0]][easeName[1]]
                    };
                };
                return select;
            }
        },
        checkbox: {
            factory: function (params, allOptions) {
                var paramsDefault = {
                    checked: false,
                    value: allOptions.value !== undefined ? allOptions.value : 1
                };
                params = $.extend(paramsDefault, params);

                var checkbox = $('<input type="checkbox">')
                        .val(params.value)
                        .prop('checked', params.checked);

                checkbox[0].getInputVal = function () {
                    return $(this).prop('checked') ? this.value : undefined;
                };
                return checkbox;



            }
        }
    };
    var getEventsByType = function (type) {

        if (types[type] !== undefined && types[type].events !== undefined) {
            return types[type].events;
        }
        return {change: 'change'};
    };
    var createElementInput = function (type, paramsType, allOptions) {

        if (types[type]) {
            return types[type].factory(paramsType, allOptions);
        }
        var input = $('<input type="' + type + '">');
        input[0].getInputVal = function () {
            return this.value;
        };
        return input;
    };

    var applyJqueryFns = function ($element, options) {
        a = $element;
        for (var i in options) {
            fn = options[i].fn;
            params = options[i].params || [];
            if ($element[fn]) {
                $element[fn].apply($element, params);
            }
        }
    };
    var ctx = this;

    this.createInput = function (options) {
        var optionsDefault = {
            container: document.body,
            type: 'text',
            typeParams: {},
            label: '',
            namespace: 'bt_' + (countInstances++),
            id: 'bt_' + (countInstances++),
            append: true,
            value: undefined,
            onChange: false,
            jQueryFn: []
        };
        options = $.extend(optionsDefault, options);

        var bt = createElementInput(options.type, $.extend({}, options.typeParams), options);
        bt.attr('id', options.id);

        inputInstances[options.namespace] = bt[0];

        if (options.value != undefined) {
            bt.val(options.value);
        }
        if (options.onChange !== false) {
            bt.on(getEventsByType(options.type).change, options.onChange);
        }
        var elementToInsert = $('<div></div>')
                .attr('id', 'container-for-' + options.id)
                .append(bt);
        if (typeof options.label == 'string' && options.label != '') {
            elementToInsert = elementToInsert
                    .prepend($('<label for="' + options.id + '">' + options.label + '</label>'))


                    ;

        }
        $(options.container)[options.append ? 'append' : 'prepend'](elementToInsert);



        if (!Array.isArray(options.jQueryFn) && typeof options.jQueryFn === 'object') {
            options.jQueryFn = [options.jQueryFn];
        }
        if (Array.isArray(options.jQueryFn) && options.jQueryFn.length > 0) {
            applyJqueryFns(bt, options.jQueryFn);
        }
    };

    this.createInputs = function (options, commonParams) {
        for (var i = 0; i < options.length; i++) {
            ctx.createInput($.extend(commonParams, options[i]));
        }
    };


    this.getVal = function (namespace) {
        if (inputInstances[namespace] === undefined)
            return undefined;
        if (inputInstances[namespace].getInputVal !== undefined)
            return inputInstances[namespace].getInputVal();

        return inputInstances[namespace].value;
    };
    this.get = function (namespace) {
        return inputInstances[namespace] || false;
    };
    this.$ = function (namespace) {
        return $(inputInstances[namespace]) || false;
    };
}