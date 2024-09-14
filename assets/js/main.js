function copyNodeStyle(sourceNode, targetNode) {
  const computedStyle = window.getComputedStyle(sourceNode);
  Array.from(computedStyle).forEach((key) => 
      targetNode.style.setProperty(key, computedStyle.getPropertyValue(key), 
                                   computedStyle.getPropertyPriority(key)));
}

var sectionHeight = function() {
  const total = $(window).height();
  const $section = $('section');

  if ($section.outerHeight(true) < total) {
    const margin = $section.outerHeight(true) - $section.height();
    $section.height(total - margin - 20);
  } else {
    $section.css('height','auto');
  }
}

$(window).resize(sectionHeight);

$(function() {
  sectionHeight();
  $('img').on('load', sectionHeight);
  $("*[autolink][href]").wrap(function() {
    return "<a href='" + $(this).attr("href") + "'></a>";
  });
});

$(document).ready(function() {
  // Select all absolute links (starting with http or https)
  $('a[href^="http"], a.external').each(function() {
    // Check if the link doesn't already have a target attribute
    if (!$(this).attr('target')) {
      // Set the target attribute to "_blank"
      $(this).attr('target', '_blank');
    }
  });
  if ($('#nav-default-closed-flag').css('display') == 'none') {
    $('nav.toc > input[type="checkbox"]').prop('checked', false);
  }
  $('.collapsible').prev().each(function(index, element) {
    const html = `<input id="${element.id}" type="checkbox"><label for="${element.id}" aria-label="Expand/collapse">${element.innerText}</label>`;
    $(this).replaceWith(html);
  });
});
