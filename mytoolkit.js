import { SVG } from './svg.min.js';

var MyToolkit = (function() {
    var draw = SVG().addTo('body').size('100%','100%');
    var dark_pink = '#cd5e77';
    var pink = '#e17f93';
    var light_pink = '#eba7ac';

    var Button = function(){
        var group = draw.group();
        var rect = group.rect(100,50).attr({
            fill: pink,
            stroke: 'black',
            'stroke-width': 2
        });
        var text = group.text("Button").font({
            fill: 'black',
            family: 'Montserrat, sans-serif',
            size: 18,
            leading: '1.5em',
            anchor: 'middle'
        }).center(rect.width()/2, rect.height()/2);

        var clickEvent = null;
        var widgetChange = null;

        group.mouseover(function(event) {
            rect.fill({ color: light_pink })
            if (widgetChange != null)
                widgetChange(event);
        });
        group.mouseout(function(event){
            rect.fill({ color: pink })
            if (widgetChange != null)
                widgetChange(event);
        });
        group.mouseup(function(event){
            rect.fill({ color: pink })
            if (widgetChange != null)
                widgetChange(event);
        });
        group.mousedown(function(event){
            rect.fill({ color: dark_pink });
            if (widgetChange != null)
                widgetChange(event);
        });
        group.click(function(event){
            if(clickEvent != null)
                clickEvent(event)
        });

        return {
            /** Moves button by upper left corner to any position.
             * @param {number} x - X coordinate.
             * @param {number} y - Y coordinate.
             */
            move: function(x, y) {
                group.move(x, y);
            },
            /** Event handler listens to when button is clicked.
             * @param {Event} eventHandler - Click event.
             */
            onclick: function(eventHandler){
                clickEvent = eventHandler;
            },
            /** Sets text on button.
             * @param {string} new_text - New button text from user.
             */
            setText: function(new_text) {
                text.text(new_text);
            },
            /** Event handler listens for when widget state changes.
             * @param {Event} eventHandler - Widget state change event.
             */
            onWidgetStateChange: function(eventHandler) {
                widgetChange = eventHandler;
            }
        };
    };

    var Checkbox = function(){
        var group = draw.group();

        var rect = group.rect(50,50).attr({
            fill: 'white',
            stroke: 'black',
            'stroke-width': 2,
            radius: 3
        });

        var text = group.text("Checkbox").font({
            fill: 'black',
            family: 'Montserrat, sans-serif',
            size: 18,
            leading: '1.5em',
            anchor: 'left'
        }).attr({
            x: rect.attr("x") + 70,
            y: rect.attr("y") + 2
        });

        var clickEvent = null;
        var widgetChange = null;
        var checked = false;

        rect.mouseover(function(event) {
            this.stroke({ color: light_pink });
            if (widgetChange != null)
                widgetChange(event);
        });

        rect.mouseout(function(event) {
            this.stroke({ color: pink });
            if (widgetChange != null)
                widgetChange(event);
        });

        rect.mouseup(function(event){
            this.stroke({ color: pink });
            if (widgetChange != null)
                widgetChange(event);
        });

        rect.mousedown(function(event){
            if (widgetChange != null)
                widgetChange(event);
        });

        rect.click(function(event) {
            if (!checked) {
                this.fill({ color: light_pink});
                checked = true;
            } else {
                this.fill({ color: 'white' });
                checked = false;
            }

            if (clickEvent != null) {
                if (!checked) {
                    clickEvent("Checkbox is unchecked");
                } else {
                    clickEvent("Checkbox is checked");
                }
            }
        });

        return {
            /** Moves button by upper left corner to any position.
             * @param {number} x - X coordinate.
             * @param {number} y - Y coordinate.
             */
            move: function(x, y) {
                group.move(x, y);
            },
            /** Event handler listens to when button is clicked.
             * @param {Event} eventHandler - Click event.
             */
            onclick: function(eventHandler) {
                clickEvent = eventHandler;
            },
            /** Sets text to right of checkbox.
             * @param {string} new_text - New checkbox text from user.
             */
            setText: function(new_text) {
                text.text(new_text);
            },
             /** Event handler listens for when widget state changes.
             * @param {Event} eventHandler - Widget state change event.
             */
            onWidgetStateChange: function(eventHandler) {
                widgetChange = eventHandler;
            }
        };
    };

    /** create group of user-specified amount of radio buttons (min 2), vertically positioned
     * @param {button_quantity}
     */
    var RadioButton = function(button_quantity = 2){
        var group = draw.group();

        var clickEvent = null;
        var widgetChange = null;
        var checked = false;

        for (var i = 0; i < button_quantity; i++) {
            var radio = group.group();

            var button = radio.circle(15).attr({
                fill: 'white',
                stroke: 'black',
                'stroke-width': 1
            }).data('index', i);

            var text = radio.text("Radio button " + i).font({
                fill: 'black',
                family: 'Montserrat, sans-serif',
                size: 15
            }).attr({
                x: 30,
                y: -5
            });
            radio.y(i * 30);

            button.click(function(event) {
                var button_index = this.data('index') + 1;

                if (checked == false) {
                    this.fill({ color: dark_pink });
                    checked = true;
                } else {
                    for (var j = 0; j < button_quantity; j++) {
                        var button_circle = group.children()[j].get(0);

                        if (button_circle.data('index') != button_index - 1) {
                            button_circle.fill('white');
                        } else {
                            button_circle.fill({ color: dark_pink });
                        }
                    }
                }
    
                if (clickEvent != null) {
                    var index_display = button_index;
                    clickEvent("Radio button " + index_display + " was checked");
                }

            });

            button.mouseover(function(event) {
                this.stroke({ color: light_pink });
                if (widgetChange != null)
                    widgetChange(event);
            });
    
            button.mouseout(function(event) {
                this.stroke({ color: 'black' });
                if (widgetChange != null)
                    widgetChange(event);
            });
    
            button.mouseup(function(event) {
                this.stroke({ color: pink });
                if (widgetChange != null)
                    widgetChange(event);
            });
    
            button.mousedown(function(event) {
                if (widgetChange != null)
                    widgetChange(event);
            });
        }

        return {
            /** Moves button by upper left corner to any position.
             * @param {number} x - X coordinate.
             * @param {number} y - Y coordinate.
             */
            move: function(x, y) {
                group.move(x, y);
            },
            /** Event handler listens to when button is clicked.
             * @param {Event} eventHandler - Click event.
             */
            onclick: function(eventHandler) {
                clickEvent = eventHandler;
            },
            /** Sets text to right of checkbox.
             * @param {index} - Index of button text to change.
             * @param {new_text} - New text label.
             */
            setText: function(index, new_text) {
                var radio_buttons = group.children();
                for (var i = 0; i < button_quantity; i++) {
                    var button_text = radio_buttons[i].get(1);
                    if (i == index - 1) {
                        button_text.text(new_text);
                    }
                }
            },
            /** Event handler listens for when widget state changes.
             * @param {Event} eventHandler - Widget state change event.
             */
            onWidgetStateChange: function(eventHandler) {
                widgetChange = eventHandler;
            }
        };
    }

    var TextBox = function() {
        var text_string = "";
        var clicked = false;
        var mouse = false;

        var text_update = null;
        var widgetChange = null;

        var group = draw.group();
        var rect = group.rect(350, 75).fill('white').stroke("black");
        var text = group.text("|").move(5,2).attr({
            fill: 'black',
            'font-family': 'Montserrat, sans-serif',
            'font-size': '18px'
        });

        group.click(function(event) {
            if (clicked == false) {
                clicked = true;
                console.log("The textbox is now ready for input");
                SVG.on(document, "keyup", function(e) {
                    if (e.key === "Backspace") {
                        if (text_string.length <= 1) {
                            text_string = "";
                            update();
                        }
                        else {
                            text_string = text_string.substr(0, text_string.length - 1);
                            update();
                        }
                    } 
                    else if (e.key === "Shift" || e.key === "Enter") {
                        
                    }
                    else {
                        var letter = e.key;
                        text_string = text_string + letter;
                        update();
                    }

                    if (text_update != null) {
                        text_update("User has updated text");
                    }
                });
            } else {
                console.log("User has already clicked on the textbox");
            }
            if (widgetChange != null) {
                widgetChange(event);
            }     
        })

        var update = function() {
            if (mouse == true) {
                text.text(text_string + "|");   
            } else {
                text.text(text_string);
            }
                  
        }

        group.mouseover(function(event) {
            mouse = true;
            text.text(text_string + "|");
            if (widgetChange != null) {
                widgetChange(event);
            } 
        })

        group.mouseout(function(event) {
            mouse = false;
            text.text(text_string);
            if (widgetChange != null) {
                widgetChange(event);
            } 
        })

        return {
            /** Moves button by upper left corner to any position.
             * @param {number} x - X coordinate.
             * @param {number} y - Y coordinate.
             */
            move: function(x, y) {
                group.move(x, y);
            },
            /** Returns the user's text.
             * @return {string} - Value of the textbox text.
             */
            getText: function() {
                return text.text();
            },
            /** Event handler listens for when the text changes.
             * @param {Event} eventHandler - Text change event.
             */
            onTextUpdate: function(eventHandler) {
                text_update = eventHandler;
            },
            /** Event handler listens for when widget state changes.
             * @param {Event} eventHandler - Widget state change event.
             */
            onWidgetStateChange: function(eventHandler) {
               widgetChange = eventHandler;
           }
        }
    }

    var ScrollBar = function() {
        var group = draw.group();
        var height = 400;

        var outside_scrollbar = group.rect(40,height).attr({
            fill: 'grey',
            stroke: 'rgb(0,0,0)',
            'stroke-width': 2,
            'radius': 5
        })

        var thumb = group.rect(34,height/4).attr({
            fill: 'pink',
            stroke: 'rgb(0,0,0)',
            'stroke-width': 2,
            'radius': 5,
            cx: 10,
            cy: 2
        })

        var drag = false;
        var thumb_movement = null;
        var widgetChange = null;

        thumb.mousedown(function(event) {
            drag = true;
            thumb.fill({ color: 'pink'});
            if (widgetChange != null)
                widgetChange(event);
        })

        thumb.mouseover(function(event) {
            if (widgetChange != null)
                widgetChange(event);
        });

        thumb.mouseout(function(event) {
            if (widgetChange != null)
                widgetChange(event);
        });

        thumb.mouseup(function(event) {
            if (widgetChange != null)
                widgetChange(event);
        });

        SVG.on(document, 'mousemove', function(event) {
            if (drag) {
                if (event.offsetY > outside_scrollbar.y() && event.offsetY < outside_scrollbar.height() + 101) {
                    thumb.y(event.offsetY);
                }
                if (thumb_movement != null) {
                    thumb_movement("Scrollbar thumb has moved");
                }
            }
        });

        SVG.on(document, 'mouseup', function(event) {
            drag = false;
            thumb.fill({ color: 'pink' });
        });

        return {
            /** Moves button by upper left corner to any position.
             * @param {number} x - X coordinate.
             * @param {number} y - Y coordinate.
             */
            move: function(x, y) {
                outside_scrollbar.move(x, y);
                thumb.move(x + 3,y + 3);
            },
             /** Event handler listens when scrollbar thumb moves.
             * @param {Event} eventHandler - Scrollbar thumb move event.
             */
            onThumbMove: function(eventHandler) {
                thumb_movement = eventHandler;
            },
            /** Return the current scrollbar thumb position.
             * @return {string} - Current thumb position.
             */
            getThumbPosition: function() {
                return thumb.x() + ", " + thumb.y();
            },
            /** Change height of the scrollbar.
             * @param {number} new_height - User inputted scrollbar height.
             */
            setHeight: function(new_height) {
                outside_scrollbar.attr({
                    'height': new_height
                })
            },
            /** Event handler listens for when widget state changes.
             * @param {Event} eventHandler - Widget state change event.
             */
            onWidgetStateChange: function(eventHandler) {
                widgetChange = eventHandler;
            }
        }
    }

    var ProgressBar = function() {
        var group = draw.group();
        var width = 400;

        var previous_value = 0;
        var increment_value = 50;

        var incrementChange = null;
        var widgetChange = null;

        var outside_container = group.rect(width,30).attr({
            fill: 'lightgrey',
            stroke: 'rgb(0,0,0)',
            'stroke-width': 2
        });

        var progress = group.rect(0, 24).attr({
            fill: 'pink',
            stroke: 'rgb(0,0,0)',
            'stroke-width': 2
        });

        group.mouseout(function(event) {
            if (widgetChange != null)
                widgetChange(event);
        });

        group.mouseup(function(event) {
            if (widgetChange != null)
                widgetChange(event);
        });

        group.mousedown(function(event) {
            if (widgetChange != null)
                widgetChange(event);
        });

        group.mouseover(function(event) {
            if (widgetChange != null)
                widgetChange(event);
        });

        return {
            /** Moves button by upper left corner to any position.
             * @param {number} x - X coordinate.
             * @param {number} y - Y coordinate.
             */
            move: function(x, y) {
                outside_container.move(x, y);
                progress.move(x + 3,y + 3);
            },
            /** Change the width of the progress bar.
             * @param {number} new_width - User inputted progress bar height.
             */
            setWidth: function(new_width) {
                outside_container.attr({
                    'width': new_width
                });
            },
            /** User can set the value to increment the progress bar by.
             * @param {number} new_increment - User inputted increment value.
             */
            setIncrementValue: function(new_increment) {
                if (new_increment > 0 && new_increment <= 100) {
                    increment_value = new_increment - 1;
                } else {
                    console.log("Increment values must be <= 100");
                }
            },
            /** Return the current increment value.
             * @return {number} - Current increment value.
             */
            getIncrementValue: function() {
                return increment_value;
            },
            /** Increment progress bar by a value from 1-100.
             * @param {number} new_increment - Increment value.
             */
            incrementProgress: function(new_increment) {
                progress.width((outside_container.attr("width") * (new_increment * 0.01)) - 6);
                if (new_increment > previous_value && new_increment <= 100) {
                    console.log("Progress has been incremented to " + new_increment);
                } else if (new_increment == previous_value) {
                    console.log("Progress has stayed the same");
                } else if (new_increment < previous_value) {
                    console.log("Progress has decreased to " + new_increment);
                } else {
                    if (previous_value != 0) {
                        progress.width((outside_container.attr("width") * (previous_value * 0.01)) - 6);
                    } else {
                        progress.width(0);
                    }
                    console.log("Increment values must be 0 <= x <= 100");
                }
                previous_value = new_increment;
            },
            /** Event handler listens for when the progress incrementation changes.
             * @param {Event} eventHandler - Incrementation event.
             */
            onIncrement: function(eventHandler) {
                incrementChange = eventHandler;
            },
            /** Event handler listens for when widget state changes.
             * @param {Event} eventHandler - Widget state change event.
             */
            onWidgetStateChange: function(eventHandler) {
                widgetChange = eventHandler;
            }
        }
    }

    var ToggleButton = function() {
        var group = draw.group();

        var toggleChange = null;
        var widgetChange = null;
        var toggled = false;

        var toggle_container = group.rect(50,30).attr({
            fill: light_pink,
            stroke: 'black',
            rx: 10,
            ry: 10
        });

        var toggle_button = group.rect(25, 25).attr({
            fill: 'white',
            stroke: 'black',
            x: toggle_container.attr("x") + 2,
            y: toggle_container.attr("y") + 2.5,
            rx: 10,
            ry: 10
        });

        toggle_button.click(function(event) {
            if (toggled == false) {
                toggle_button.animate({
                    duration: 100,
                    when:'now',
                }).dx(21);
                toggle_container.animate({
                    duration: 100,
                    when:'now'
                }).fill(dark_pink);
                toggled = true;
            } else {
                toggle_button.animate({
                    duration: 100,
                    when:'now',
                }).dx(-21);
                toggle_container.animate({
                    duration: 200,
                    when:'now'
                }).fill(light_pink);
                toggled = false;
            }

            if (toggleChange != null) {
                if (toggled == false) {
                    toggleChange("Toggle is off");
                } else {
                    toggleChange("Toggle is on");
                }
            }
        });

        toggle_button.mouseup(function(event){
            if (widgetChange != null)
                widgetChange(event);
        });

        toggle_button.mousedown(function(event){
            if (widgetChange != null)
                widgetChange(event);
        });

        toggle_button.mouseout(function(event){
            if (widgetChange != null)
                widgetChange(event);
        });

        toggle_button.mouseover(function(event){
            if (widgetChange != null)
                widgetChange(event);
        });

        return {
            /** Moves button by upper left corner to any position.
             * @param {number} x - X coordinate.
             * @param {number} y - Y coordinate.
             */
            move: function(x, y) {
                group.move(x, y);
            },
            /** Event handler listens for when the toggle changes.
             * @param {Event} eventHandler - Toggle change event.
             */
            onAction: function(eventHandler) {
                toggleChange = eventHandler;
            },
            /** Event handler listens for when widget state changes.
             * @param {Event} eventHandler - Widget state change event.
             */
            onWidgetStateChange: function(eventHandler) {
                widgetChange = eventHandler;
            }
        }
    }

return {Button, Checkbox, RadioButton, TextBox, ScrollBar, ProgressBar, ToggleButton}
}());

export{MyToolkit}