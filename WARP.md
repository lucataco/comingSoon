# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Overview
- This is a static “Coming Soon” site based on the HTML5 UP “Dimension” template. There is no Node/packager, build system, linter, or test harness configured in this repo.

Common commands
- Preview locally (serve current directory):
  - macOS/Linux: python3 -m http.server 8000
  - Then open: http://localhost:8000
- Optional: Rebuild CSS from SCSS when editing assets/sass/
  - One-off (no local project config): npx sass assets/sass/main.scss assets/css/main.css --style=compressed
  - Watch mode while developing: npx sass assets/sass/main.scss assets/css/main.css --watch
  - Note: Using npx here avoids requiring a package.json; it will download the Sass CLI ad hoc.

Architecture and structure (big picture)
- Entry point: index.html
  - Loads assets/css/main.css and a noscript fallback (assets/css/noscript.css)
  - Includes scripts: assets/js/jquery.min.js, browser.min.js, breakpoints.min.js, util.js, and main.js
- Styling pipeline
  - Source styles live in assets/sass/ with clear layers:
    - libs/: _vars.scss, _functions.scss, _mixins.scss, _vendor.scss, _breakpoints.scss
    - base/: _reset.scss, _page.scss, _typography.scss
    - components/: _form.scss, _box.scss, _icon.scss, _image.scss, _list.scss, _actions.scss, _icons.scss, _table.scss, _button.scss
    - layout/: _bg.scss, _wrapper.scss, _header.scss, _main.scss, _footer.scss
  - assets/sass/main.scss composes these layers and imports FontAwesome CSS and Google Fonts; compiled output is checked in at assets/css/main.css (no project build tooling).
- Client-side behavior (hash-routed single-page sections)
  - assets/js/main.js (jQuery-based) implements showing/hiding <article> sections (#intro, #work, #about, #contact, #elements) by listening to location.hash changes and user interactions.
  - Uses breakpoints.min.js to manage responsive behavior and browser.min.js for UA quirks; util.js provides small jQuery utilities (navList, panel, placeholder polyfill, prioritize, etc.).
- Assets
  - Images under images/ are referenced by index.html and CSS (e.g., bg.jpg, overlay.png, pic01-03.jpg).
  - assets/webfonts/ contains FontAwesome files used by the template.

Notes for changes
- If you modify SCSS under assets/sass/, recompile to assets/css/main.css using the Sass commands above. If you aren’t changing SCSS, no build step is needed.
- There is no test or lint setup in this repository as of now.

