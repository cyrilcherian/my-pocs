# Gulp tasks

Various gulp tasks are defined to concat, replace, minify and inject into JavaSript and HTML files.

The gulp tasks also include compile SASS files to CSS, concat and minify the css files.


## Basic tasks

* **clean**

    Removes old scripts and styles before generating new ones.

* **concat-dev-scripts**

    Concat all scripts of DEV environment to a single script file('all-dev.js').

* **concat-local-scripts**

    Concat all scripts of LOCAL environment to a single script file('all-local.js').

* **concat-mobomo-scripts**

    Concat all scripts of MOBOMO environment to single script file('all-mobomo.js').

* **concat-prod-scripts**

    Concat all scripts of PROD environment to single script file('all-prod.js').

* **styles-prod**

    Compiles all the sass files to css files and concatenates the generated css files to a single style sheet. Then, minify the concatenated css and create new minified css file('app.min.css').
    Executed on Prod environments.

* **styles-dev**

    Compiles all the sass files to css files and concatenates the generated css files to a single style sheet('app.css').
    Executed for all environments except PROD.

* **minify-prod-scripts**

    Minify the concatenated scripts file('all-prod.js').

* **asco**

    Minify HTML templates.
    Replace keywords in views(minified HTML template) with replacements defined in 'asco.json' file.
  eg. Text on a button is given as '@submitReview@' in HTML template and 'asco.json' file contains an entry ["@submitReview@", "Save"].
  Then the text on the button is changed to 'Save'.

* **apa**

    Minify HTML templates.
    Replace keywords in views(minified HTML template) with replacements defined in 'apa.json' file.
  eg. Text on a button is given as '@submitReview@' in HTML template and 'apa.json' file contains an entry ["@submitReview@", "Save me"].
  Then the text on the button is changed to 'Save me'.
* **asco-prod-replace**

    Replace keywords in concatenated script('all-prod.js') with replacements defined in 'asco.json' file.

* **apa-prod-replace**

    Replace keywords in concatenated script('all-prod.js') with replacements defined in 'apa.json' file.

## Intermediate tasks

They call the  basic gulptasks required sequentially and inject the appropriate stylesheet and script into 'index.html'.

* **asco-dev-basic**

    Executes basic tasks 'clean', 'concat-dev-scripts', 'styles-dev', 'asco'.
    Injects 'all-dev.js' and 'app.css'

* **apa-dev-basic**

    Executes basic tasks 'clean', 'concat-dev-scripts', 'styles-dev', 'apa'.
    Injects 'all-dev.js' and 'app.css'

* **asco-local-basic**

    Executes basic tasks 'clean', 'concat-local-scripts', 'styles-dev', 'asco'.
    Injects 'all-local.js' and 'app.css'

* **apa-local-basic**

    Executes basic tasks 'clean', 'concat-local-scripts', 'styles-dev', 'apa'.
    Injects 'all-local.js' and 'app.css'

* **asco-mobomo-basic**

    Executes basic tasks 'concat-mobomo-scripts', 'styles-dev', 'asco'.
    Injects 'all-mobomo.js' and 'app.css'.

* **apa-mobomo-basic**

    Executes basic tasks 'concat-mobomo-scripts', 'styles-dev', 'apa'.
    Injects 'all-mobomo.js' and 'app.css'.

* **asco-prod-basic**

    Executes basic tasks 'clean', 'asco', 'concat-prod-scripts', 'styles-prod', 'asco-prod-replace', 'minify-prod-scripts.

* **apa-prod-basic**

    Executes basic tasks 'clean', 'apa', 'concat-prod-scripts', 'styles-prod', 'apa-prod-replace', 'minify-prod-scripts'.

## High level tasks
They call intermediate tasks and perform final replacement in scripts.

* **asco-local**

    Executes 'asco-local-basic'.
    Perform final replacement in the injected script('all-local.js') by referring 'asco.json' file.

* **apa-local**

    Executes 'apa-local-basic'.
    Perform final replacement in the injected script('all-local.js') by referring 'apa.json' file.

* **asco-mobomo**

    Executes 'asco-mobomo-basic'.
    Perform final replacement in the injected script('all-mobomo.js') by referring 'asco.json' file.

* **apa-mobomo**

    Executes 'apa-mobomo-basic'.
    Perform final replacement in the injected script('all-mobomo.js') by referring 'apa.json' file .

* **asco-dev**

    Executes 'asco-dev-basic'.
    Perform final replacement in the injected script('all-dev.js') by referring 'asco.json' file.

* **apa-dev**

    Executes 'apa-dev-basic'.
    Perform final replacement in the injected script('all-dev.js') by referring 'apa.json' file.

* **asco-prod**

    Executes 'asco-prod-basic'.
    Injects 'all-prod.js' and 'app.min.css' into index html.

* **apa-prod**

    Executes 'apa-prod-basic'.
    Injects 'all-prod.js' and 'app.min.css' into index html.

## Watch tasks

These tasks watch scripts, styles and views continuously and execute corresponding high level task on change in any of the files during development process.

* **asco-local-be**

    Executes 'asco-local' on change in any file.

* **apa-local-be**

    Executes 'apa-local' on change in any file.

* **asco-remote-be**

    Executes 'asco-mobomo' on change in any file.

* **apa-remote-be**

    Executes 'apa-mobomo' on change in any file.

* **asco-qc-be**

    Executes 'asco-dev' on change in any file.

* **apa-qc-be**

    Executes 'apa-dev' on change in any file.
