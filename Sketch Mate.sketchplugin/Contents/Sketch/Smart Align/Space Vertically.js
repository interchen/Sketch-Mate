// (command Ä)

 /**
 * Distributes the selected elements vertically, with the same distante beetween them.
 * If only one layer is selected, the layer will be moved by the spacing that has been input.
 *
 * Florian Schulz Copyright 2014, MIT License
 */


@import '../sketchSelect.js'

var onRun = function (context) {

    // old school variable
    doc = context.document;
    selection = context.selection;

    // action

    var elements = [];
    var top = 0;

    if (selection.count() > 1) {
        var spacing = [[doc askForUserInput:"Vertical Spacing" ofType:1 initialValue:"0"] integerValue];

        // convert selection to standard array
        for (var i = 0; i < selection.count(); i++) {
            elements.push(selection[i]);
        }

        // sort elements by top position
        elements.sort(sortTop);

        // get the first position
        top = elements[0].frame().top();

        elements.each(function () {
            this.frame().setTop(top);
            top += this.frame().height() + spacing;
        })
    } else if (selection.count() == 1) {
        var spacing = [[doc askForUserInput:"Shift by" ofType:1 initialValue:"0"] integerValue];
        top = selection[0].frame().top() + spacing;
        selection[0].frame().setTop(top);
    }

}

function sortTop(a, b){
  return a.frame().top() - b.frame().top();
}


