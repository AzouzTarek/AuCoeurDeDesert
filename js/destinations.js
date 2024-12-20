$(document).ready(function () {
	"use strict";
  
	/* 
	
	1. Vars and Inits
	
	*/
  
	var header = $(".header");
	var headerSocial = $(".header_social");
	var menu = $(".menu");
	var menuActive = false;
	var burger = $(".hamburger");
  
	setHeader();
  
	$(window).on("resize", function () {
	  setHeader();
  
	  setTimeout(function () {
		$(window).trigger("resize.px.parallax");
	  }, 375);
	});
  
	$(document).on("scroll", function () {
	  setHeader();
	});
  
	initMenu();
	initInput();
	initIsotope();
	initSubtitleTruncate(); // Nouvelle fonction appelée ici
	initLoadMore(); // Initialisation de la fonctionnalité "Load More"
  
	/* 
	
	2. Set Header
	
	*/
  
	function setHeader() {
	  if ($(window).scrollTop() > 127) {
		header.addClass("scrolled");
		headerSocial.addClass("scrolled");
	  } else {
		header.removeClass("scrolled");
		headerSocial.removeClass("scrolled");
	  }
	}
  
	/* 
	
	3. Init Menu
	
	*/
  
	function initMenu() {
	  if ($(".menu").length) {
		var menu = $(".menu");
		if ($(".hamburger").length) {
		  burger.on("click", function () {
			if (menuActive) {
			  closeMenu();
			} else {
			  openMenu();
			}
		  });
		}
	  }
	  if ($(".menu_close").length) {
		var close = $(".menu_close");
		close.on("click", function () {
		  if (menuActive) {
			closeMenu();
		  }
		});
	  }
	}
  
	function openMenu() {
	  menu.addClass("active");
	  menuActive = true;
	}
  
	function closeMenu() {
	  menu.removeClass("active");
	  menuActive = false;
	}
  
	/* 
	
	4. Init Input
	
	*/
  
	function initInput() {
	  if ($(".newsletter_input").length) {
		var inpt = $(".newsletter_input");
		inpt.each(function () {
		  var ele = $(this);
		  var border = ele.next();
  
		  ele.focus(function () {
			border.css({ visibility: "visible", opacity: "1" });
		  });
		  ele.blur(function () {
			border.css({ visibility: "hidden", opacity: "0" });
		  });
  
		  ele.on("mouseenter", function () {
			border.css({ visibility: "visible", opacity: "1" });
		  });
  
		  ele.on("mouseleave", function () {
			if (!ele.is(":focus")) {
			  border.css({ visibility: "hidden", opacity: "0" });
			}
		  });
		});
	  }
	}
  
	/* 
	
	5. Init Isotope
	
	*/
  
	function initIsotope() {
	  var sortingButtons = $(".product_sorting_btn");
  
	  if ($(".item_grid").length) {
		var grid = $(".item_grid").isotope({
		  itemSelector: ".item",
		  getSortData: {
			price: function (itemElement) {
			  var priceEle = $(itemElement)
				.find(".destination_price")
				.text()
				.replace("From $", "");
			  return parseFloat(priceEle);
			},
			name: ".destination_title a",
		  },
		  animationOptions: {
			duration: 750,
			easing: "linear",
			queue: false,
		  },
		});
  
		// Sort based on the value from the sorting_type dropdown
		sortingButtons.each(function () {
		  $(this).on("click", function () {
			var parent = $(this).parent().parent().find(".sorting_text");
			parent.text($(this).text());
			var option = $(this).attr("data-isotope-option");
			option = JSON.parse(option);
			grid.isotope(option);
		  });
		});
	  }
	}
  
	/* 
	
	6. Truncate Subtitle
	
	*/
  
	function initSubtitleTruncate() {
		const maxLengthDescription = 150; // Nombre maximum de caractères avant "..."
		const maxLengthTitle = 57;
		// Truncate Subtitle
		$(".destination_subtitle p").each(function () {
			const fullText = $(this).text();
			if (fullText.length > maxLengthDescription) {
				const truncatedText = fullText.substring(0, maxLengthDescription) + "...";
				$(this).text(truncatedText);
			}
		});
	  
		// Truncate Title
		$(".destination_title a").each(function () {
			const fullText = $(this).text();
			if (fullText.length > maxLengthTitle) {
				const truncatedText = fullText.substring(0, maxLengthTitle) + "...";
				$(this).text(truncatedText);
			}
	  });
	}
  
	/* 
	
	7. Init Load More
	
	*/
  
	// function initLoadMore() {
	// 	const destinations = $(".destination"); // Sélectionner toutes les destinations
	// 	const loadMoreButton = $("#loadMore"); // Bouton "Load More"
	// 	const itemsPerClick = 6; // Nombre de blocs à afficher par clic
	// 	let currentVisible = 6; // Nombre initial de blocs visibles
		
	// 	// Initialiser en cachant les destinations au-delà du nombre visible
	// 	destinations.slice(currentVisible).hide(); // Cacher les éléments au-delà de `currentVisible`
		
	// 	// Ajouter un événement de clic sur le bouton
	// 	loadMoreButton.on("click", function (e) {
	// 	  e.preventDefault();
		  
	// 	  // Afficher les destinations supplémentaires
	// 	  const newDestinations = destinations.slice(currentVisible, currentVisible + itemsPerClick);
	// 	  newDestinations.fadeIn(); // Afficher les blocs supplémentaires avec une animation
		  
	// 	  // Mettre à jour le nombre visible
	// 	  currentVisible += newDestinations.length;
		  
	// 	  // Si tous les blocs sont visibles, masquer le bouton
	// 	  if (currentVisible >= destinations.length) {
	// 		loadMoreButton.hide();
	// 	  }
	// 	});
	//   }
})  