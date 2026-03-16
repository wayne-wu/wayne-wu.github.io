;(function () {
	
	'use strict';

	var closeMenu = function() {
		if ( $('body').hasClass('offcanvas') ) {

			$('body').removeClass('offcanvas');
			$('.js-fh5co-nav-toggle').removeClass('active');
			
		}
	}

	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
			var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				closeMenu();
			}
		});

	};

	var offcanvasMenu = function() {

		$('#page').prepend('<div id="fh5co-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#fh5co-offcanvas').append(clone1);

		$('#fh5co-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#fh5co-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');				
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');				
		});


		$(window).resize(function(){
			closeMenu();
		});
	};

	var menuLinkClick = function() {
		$('#fh5co-offcanvas a').click(function (e) {
			closeMenu();
		});
	}

	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};

	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var escapeHtml = function(value) {
		return String(value)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');
	};

	var normalizeSearchText = function(value) {
		return String(value || '')
			.toLowerCase()
			.replace(/[^a-z0-9+#]+/g, ' ')
			.trim();
	};

	var normalizeTagId = function(value) {
		return String(value || '')
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '');
	};

	var buildSearchIndex = function(project) {
		var tags = Array.isArray(project.tags) ? project.tags : [];
		var freeText = [
			project.title || '',
			project.summary || '',
			Array.isArray(project.search) ? project.search.join(' ') : ''
		].join(' ');

		var textTokens = normalizeSearchText(freeText).split(/\s+/).filter(Boolean);
		var tagIds = [];
		for (var i = 0; i < tags.length; i++) {
			var rawTag = tags[i];
			var tagId = normalizeTagId(rawTag);
			if (tagId) {
				tagIds.push(tagId);
				tagIds.push(tagId.replace(/-/g, ''));
			}
			var splitTagTokens = normalizeSearchText(rawTag).split(/\s+/).filter(Boolean);
			for (var j = 0; j < splitTagTokens.length; j++) {
				tagIds.push(splitTagTokens[j]);
			}
		}

		return {
			text: textTokens,
			tags: tagIds
		};
	};

	var lazyLoadProjectImages = function() {
		var grids = document.querySelectorAll('.work-grid[data-image]');
		if (!grids.length) {
			return;
		}

		var loadGridImage = function(node) {
			if (!node || !node.getAttribute('data-image')) {
				return;
			}

			node.style.backgroundImage = 'url(' + node.getAttribute('data-image') + ')';
			node.removeAttribute('data-image');
			node.classList.add('project-image-loaded');
		};

		if (!('IntersectionObserver' in window)) {
			for (var i = 0; i < grids.length; i++) {
				loadGridImage(grids[i]);
			}
			return;
		}

		var observer = new IntersectionObserver(function(entries, activeObserver) {
			for (var j = 0; j < entries.length; j++) {
				if (!entries[j].isIntersecting) {
					continue;
				}

				loadGridImage(entries[j].target);
				activeObserver.unobserve(entries[j].target);
			}
		}, {
			rootMargin: '300px 0px'
		});

		for (var k = 0; k < grids.length; k++) {
			observer.observe(grids[k]);
		}
	};

	var renderProjects = function(projectsToRender) {
		var grid = document.getElementById('project-grid');
		var projects = Array.isArray(projectsToRender) ? projectsToRender : window.PROJECTS;
		if (!grid || !Array.isArray(projects)) {
			return;
		}

		var html = [];
		for (var i = 0; i < projects.length; i++) {
			var project = projects[i];
			var tags = Array.isArray(project.tags) ? project.tags : [];
			var searchIndex = buildSearchIndex(project);

			html.push(
				'<div class="col-md-4 text-center animate-box project-card" data-search="' + escapeHtml(searchIndex.text.join(' ')) + '" data-tags="' + escapeHtml(searchIndex.tags.join(' ')) + '">' +
					'<a class="work" href="' + escapeHtml(project.href) + '">' +
						'<div class="work-grid" data-image="' + escapeHtml(project.image) + '">' +
							'<div class="inner">' +
								'<div class="desc">' +
									'<h3>' + escapeHtml(project.title) + '</h3>' +
									'<span class="cat">' + escapeHtml(tags.map(function(tag) { return '#' + tag; }).join(' ')) + '</span>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</a>' +
				'</div>'
			);
		}

		grid.innerHTML = html.join('');
		lazyLoadProjectImages();
		contentWayPoint();
	};

	var projectMatchesQuery = function(project, queryTerms) {
		if (!queryTerms.length) {
			return true;
		}

		var searchIndex = buildSearchIndex(project);
		var haystack = searchIndex.text.join(' ');
		var tagIndex = searchIndex.tags.join(' ');

		for (var i = 0; i < queryTerms.length; i++) {
			var term = queryTerms[i];
			var termMatchesText = haystack.indexOf(term) !== -1;
			var normalizedTagTerm = normalizeTagId(term);
			var termMatchesTag = tagIndex.indexOf(term) !== -1 ||
				tagIndex.indexOf(normalizedTagTerm) !== -1 ||
				tagIndex.indexOf(normalizedTagTerm.replace(/-/g, '')) !== -1;

			if (!termMatchesText && !termMatchesTag) {
				return false;
			}
		}

		return true;
	};

	var setupProjectSearch = function() {
		var input = document.getElementById('project-search');
		var summary = document.getElementById('project-search-summary');
		var emptyState = document.getElementById('project-search-empty');
		var projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
		if (!input || !summary || !emptyState) {
			return;
		}

		var total = projects.length;
		var updateResults = function() {
			var query = normalizeSearchText(input.value);
			var terms = query ? query.split(/\s+/) : [];
			var matches = [];

			for (var i = 0; i < projects.length; i++) {
				if (projectMatchesQuery(projects[i], terms)) {
					matches.push(projects[i]);
				}
			}

			renderProjects(matches);

			if (query) {
				summary.textContent = matches.length + ' of ' + total + ' projects match "' + input.value.trim() + '".';
			} else {
				summary.textContent = 'Showing all ' + total + ' projects.';
			}

			emptyState.hidden = matches.length !== 0;
		};

		input.addEventListener('input', updateResults);
		updateResults();
	};

	var isVideoIframe = function(node) {
		if (!node || node.tagName !== 'IFRAME') {
			return false;
		}

		var src = node.getAttribute('src') || '';
		return src.indexOf('player.vimeo.com') !== -1 ||
			src.indexOf('youtube.com/embed/') !== -1 ||
			src.indexOf('youtube-nocookie.com/embed/') !== -1;
	};

	var getProjectHeroMedia = function(container) {
		var iframeNodes = container.querySelectorAll('iframe');
		for (var i = 0; i < iframeNodes.length; i++) {
			if (isVideoIframe(iframeNodes[i])) {
				return iframeNodes[i];
			}
		}

		var videoNode = container.querySelector('video');
		if (videoNode) {
			return videoNode;
		}

		return container.querySelector('img');
	};

	var normalizeVimeoSrc = function(src) {
		if (src.indexOf('player.vimeo.com') === -1) {
			return src;
		}

		var nextSrc = src;
		if (nextSrc.indexOf('autoplay=1') === -1) {
			nextSrc += (nextSrc.indexOf('?') === -1 ? '?' : '&') + 'autoplay=1';
		}
		if (nextSrc.indexOf('loop=1') === -1) {
			nextSrc += '&loop=1';
		}
		if (nextSrc.indexOf('autopause=0') === -1) {
			nextSrc += '&autopause=0';
		}
		if (nextSrc.indexOf('muted=1') === -1) {
			nextSrc += '&muted=1';
		}
		if (nextSrc.indexOf('background=1') === -1) {
			nextSrc += '&background=1';
		}

		return nextSrc;
	};

	var updateHeroMediaSource = function(node) {
		if (node.tagName !== 'IFRAME') {
			return;
		}

		var src = node.getAttribute('src') || '';
		if (src.indexOf('player.vimeo.com') !== -1) {
			node.setAttribute('src', normalizeVimeoSrc(src));
			return;
		}

		if (src.indexOf('youtube.com/embed/') === -1 && src.indexOf('youtube-nocookie.com/embed/') === -1) {
			return;
		}

		if (src.indexOf('autoplay=1') === -1) {
			src += (src.indexOf('?') === -1 ? '?' : '&') + 'autoplay=1';
		}
		if (src.indexOf('mute=1') === -1) {
			src += '&mute=1';
		}
		if (src.indexOf('controls=0') === -1) {
			src += '&controls=0';
		}
		if (src.indexOf('loop=1') === -1) {
			src += '&loop=1';
		}

		var idMatch = src.match(/\/embed\/([^?&]+)/);
		if (idMatch && src.indexOf('playlist=') === -1) {
			src += '&playlist=' + idMatch[1];
		}

		node.setAttribute('src', src);
	};

	var getProjectHeroSourceWrapper = function(mediaSource, mediaColumn) {
		var current = mediaSource;
		var candidate = mediaSource;

		while (current && current.parentElement && current.parentElement !== mediaColumn) {
			var parent = current.parentElement;
			var visibleSiblings = [];

			for (var i = 0; i < parent.children.length; i++) {
				if (parent.children[i].tagName !== 'SCRIPT') {
					visibleSiblings.push(parent.children[i]);
				}
			}

			if (visibleSiblings.length !== 1 || visibleSiblings[0] !== current) {
				break;
			}

			candidate = parent;
			current = parent;
		}

		return candidate;
	};

	var getClosestRow = function(node) {
		var current = node;
		while (current) {
			if (current.classList && current.classList.contains('row')) {
				return current;
			}
			current = current.parentElement;
		}

		return null;
	};

	var getLegacyProjectHeroConfig = function(about) {
		var container = null;
		for (var i = 0; i < about.children.length; i++) {
			if (about.children[i].classList && about.children[i].classList.contains('container')) {
				container = about.children[i];
				break;
			}
		}
		if (!container) {
			return null;
		}

		var headingRow = null;
		for (var j = 0; j < container.children.length; j++) {
			if (container.children[j].classList && container.children[j].classList.contains('row') && container.children[j].classList.contains('top-line')) {
				headingRow = container.children[j];
				break;
			}
		}
		if (!headingRow) {
			return null;
		}

		var mediaRow = headingRow.nextElementSibling;
		if (!mediaRow || !mediaRow.classList.contains('row')) {
			return null;
		}

		var mediaColumn = mediaRow.querySelector('.col-md-8, .col-md-10, .col-md-12');
		if (!mediaColumn) {
			return null;
		}

		var mediaSource = getProjectHeroMedia(mediaColumn);
		if (!mediaSource) {
			return null;
		}

		return {
			container: container,
			headingRow: headingRow,
			mediaRow: mediaRow,
			mediaColumn: mediaColumn,
			mediaSource: mediaSource,
			sourceWrapper: getProjectHeroSourceWrapper(mediaSource, mediaColumn)
		};
	};

	var getHookedProjectHeroConfig = function(about) {
		var headingRow = about.querySelector('.project-hero-content');
		var sourceWrapper = about.querySelector('.project-hero-media-source');
		if (!headingRow || !sourceWrapper) {
			return null;
		}

		var container = null;
		for (var i = 0; i < about.children.length; i++) {
			if (about.children[i].classList && about.children[i].classList.contains('container')) {
				container = about.children[i];
				break;
			}
		}
		if (!container) {
			return null;
		}

		var mediaSource = getProjectHeroMedia(sourceWrapper);
		if (!mediaSource) {
			return null;
		}

		return {
			container: container,
			headingRow: headingRow,
			mediaRow: getClosestRow(sourceWrapper),
			mediaColumn: sourceWrapper.parentElement,
			mediaSource: mediaSource,
			sourceWrapper: sourceWrapper
		};
	};

	var normalizeEmbeddedMedia = function() {
		var iframes = document.querySelectorAll('iframe');
		for (var i = 0; i < iframes.length; i++) {
			var src = iframes[i].getAttribute('src') || '';
			if (src.indexOf('player.vimeo.com') !== -1) {
				iframes[i].setAttribute('src', normalizeVimeoSrc(src));
			}
		}
	};

	var projectHero = function() {
		var about = document.getElementById('about');
		if (!about || about.querySelector('.project-hero')) {
			return;
		}

		var config = getHookedProjectHeroConfig(about) || getLegacyProjectHeroConfig(about);
		if (!config) {
			return;
		}

		var hero = document.createElement('div');
		hero.className = 'project-hero';

		var heroMedia = document.createElement('div');
		heroMedia.className = 'project-hero-media';

		var heroContainer = document.createElement('div');
		heroContainer.className = 'container';

		var heroClone = config.mediaSource.cloneNode(true);
		updateHeroMediaSource(heroClone);
		if (heroClone.tagName === 'VIDEO') {
			heroClone.setAttribute('autoplay', '');
			heroClone.setAttribute('loop', '');
			heroClone.setAttribute('muted', '');
			heroClone.setAttribute('playsinline', '');
		}
		heroClone.removeAttribute('width');
		heroClone.removeAttribute('height');
		heroClone.removeAttribute('style');

		heroMedia.appendChild(heroClone);
		hero.appendChild(heroMedia);
		heroContainer.appendChild(config.headingRow);
		hero.appendChild(heroContainer);
		about.insertBefore(hero, about.firstChild);

		if (config.sourceWrapper) {
			config.sourceWrapper.classList.add('project-hero-source');
		}

		config.container.classList.add('project-content');

		if (config.mediaColumn) {
			var hasVisibleChild = false;
			for (var k = 0; k < config.mediaColumn.children.length; k++) {
				if (!config.mediaColumn.children[k].classList.contains('project-hero-source')) {
					hasVisibleChild = true;
					break;
				}
			}
			if (!hasVisibleChild && config.mediaRow) {
				config.mediaRow.remove();
			}
		}
	};

	
	$(function(){
		mobileMenuOutsideClick();
		offcanvasMenu();
		menuLinkClick();
		burgerMenu();
		contentWayPoint();
		dropdown();
		goToTop();
		loaderPage();
		setupProjectSearch();
		normalizeEmbeddedMedia();
		projectHero();
	});


}());
