/*
	Dimension by HTML5 UP - Vanilla JS version
	html5up.net | @ajlkn
	Optimized for performance - jQuery removed
*/

(function() {
	'use strict';

	const body = document.body;
	const wrapper = document.getElementById('wrapper');
	const header = document.getElementById('header');
	const footer = document.getElementById('footer');
	const main = document.getElementById('main');
	const articles = main ? main.querySelectorAll('article') : [];

	// Breakpoints
	breakpoints({
		xlarge:   [ '1281px',  '1680px' ],
		large:    [ '981px',   '1280px' ],
		medium:   [ '737px',   '980px'  ],
		small:    [ '481px',   '736px'  ],
		xsmall:   [ '361px',   '480px'  ],
		xxsmall:  [ null,      '360px'  ]
	});

	// Play initial animations on page load
	window.addEventListener('load', function() {
		setTimeout(function() {
			body.classList.remove('is-preload');
		}, 100);
	});

	// Fix: Flexbox min-height bug on IE
	if (browser.name === 'ie') {
		let flexboxFixTimeoutId;

		window.addEventListener('resize', function() {
			clearTimeout(flexboxFixTimeoutId);

			flexboxFixTimeoutId = setTimeout(function() {
				if (wrapper.scrollHeight > window.innerHeight)
					wrapper.style.height = 'auto';
				else
					wrapper.style.height = '100vh';
			}, 250);
		});

		// Trigger initial resize
		window.dispatchEvent(new Event('resize'));
	}

	// Nav
	const nav = header ? header.querySelector('nav') : null;
	const navItems = nav ? nav.querySelectorAll('li') : [];

	// Add "middle" alignment classes if even number of items
	if (navItems.length % 2 === 0 && nav) {
		nav.classList.add('use-middle');
		navItems[navItems.length / 2].classList.add('is-middle');
	}

	// Main
	const delay = 325;
	let locked = false;

	function showArticle(id, initial) {
		const article = main.querySelector('#' + id);

		if (!article) return;

		// Handle lock - speed through if locked or initial
		if (locked || initial === true) {
			body.classList.add('is-switching');
			body.classList.add('is-article-visible');

			articles.forEach(function(a) {
				a.classList.remove('active');
			});

			header.style.display = 'none';
			footer.style.display = 'none';

			main.style.display = '';
			article.style.display = '';
			article.classList.add('active');

			locked = false;

			setTimeout(function() {
				body.classList.remove('is-switching');
			}, initial ? 1000 : 0);

			return;
		}

		locked = true;

		// Article already visible? Swap
		if (body.classList.contains('is-article-visible')) {
			const currentArticle = main.querySelector('article.active');

			if (currentArticle) {
				currentArticle.classList.remove('active');

				setTimeout(function() {
					currentArticle.style.display = 'none';
					article.style.display = '';

					setTimeout(function() {
						article.classList.add('active');
						window.scrollTo(0, 0);

						setTimeout(function() {
							locked = false;
						}, delay);
					}, 25);
				}, delay);
			}
		} else {
			body.classList.add('is-article-visible');

			setTimeout(function() {
				header.style.display = 'none';
				footer.style.display = 'none';

				main.style.display = '';
				article.style.display = '';

				setTimeout(function() {
					article.classList.add('active');
					window.scrollTo(0, 0);

					setTimeout(function() {
						locked = false;
					}, delay);
				}, 25);
			}, delay);
		}
	}

	function hideArticle(addState) {
		const article = main.querySelector('article.active');

		if (!body.classList.contains('is-article-visible')) return;

		if (addState === true) {
			history.pushState(null, null, '#');
		}

		// Speed through if locked
		if (locked) {
			body.classList.add('is-switching');

			if (article) {
				article.classList.remove('active');
				article.style.display = 'none';
			}
			main.style.display = 'none';

			footer.style.display = '';
			header.style.display = '';

			body.classList.remove('is-article-visible');
			locked = false;
			body.classList.remove('is-switching');
			window.scrollTo(0, 0);

			return;
		}

		locked = true;

		if (article) {
			article.classList.remove('active');

			setTimeout(function() {
				article.style.display = 'none';
				main.style.display = 'none';

				footer.style.display = '';
				header.style.display = '';

				setTimeout(function() {
					body.classList.remove('is-article-visible');
					window.scrollTo(0, 0);

					setTimeout(function() {
						locked = false;
					}, delay);
				}, 25);
			}, delay);
		}
	}

	// Setup articles
	articles.forEach(function(article) {
		// Add close button
		const closeBtn = document.createElement('div');
		closeBtn.className = 'close';
		closeBtn.textContent = 'Close';
		closeBtn.addEventListener('click', function() {
			location.hash = '';
		});
		article.appendChild(closeBtn);

		// Prevent clicks inside from bubbling
		article.addEventListener('click', function(event) {
			event.stopPropagation();
		});
	});

	// Body click handler
	body.addEventListener('click', function() {
		if (body.classList.contains('is-article-visible')) {
			hideArticle(true);
		}
	});

	// Escape key handler
	window.addEventListener('keyup', function(event) {
		if (event.keyCode === 27 && body.classList.contains('is-article-visible')) {
			hideArticle(true);
		}
	});

	// Hash change handler
	window.addEventListener('hashchange', function(event) {
		if (location.hash === '' || location.hash === '#') {
			event.preventDefault();
			event.stopPropagation();
			hideArticle();
		} else {
			const targetId = location.hash.substr(1);
			const targetArticle = main.querySelector('#' + targetId);

			if (targetArticle) {
				event.preventDefault();
				event.stopPropagation();
				showArticle(targetId);
			}
		}
	});

	// Scroll restoration
	if ('scrollRestoration' in history) {
		history.scrollRestoration = 'manual';
	} else {
		let oldScrollPos = 0;
		let scrollPos = 0;

		window.addEventListener('scroll', function() {
			oldScrollPos = scrollPos;
			scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
		});

		window.addEventListener('hashchange', function() {
			window.scrollTo(0, oldScrollPos);
		});
	}

	// Initialize - hide main and articles
	if (main) main.style.display = 'none';
	articles.forEach(function(a) {
		a.style.display = 'none';
	});

	// Initial article from hash
	if (location.hash !== '' && location.hash !== '#') {
		window.addEventListener('load', function() {
			showArticle(location.hash.substr(1), true);
		});
	}

})();
