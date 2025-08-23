# easy-key-plotter 

## Features

Select EASY key in an editor (e.g. python or R code or csv metadata) --> press hotkey (`F1`) --> selected EASY key is plotted.

Conseptually the extension is general and doesn't restrict itself to plotting.
The selection is passed alonside the user-defined code (see settings below) as the `SELECTION` variable.
The code is executed in the Python Interactive window.

## Requirements

You'll need the standard `Python` + `Jupyter` extensions in VSCode.

## Extension Settings

This extension contributes the following settings:

* `easy-key-plotter.plotSelection`: the code to execute in the Python Interactive window. The selection is passed to the function as the `SELECTION` variable.


## Known Issues

...

## Release Notes

### 0.0.1

Initial release passing over the selection to a user-defined function.