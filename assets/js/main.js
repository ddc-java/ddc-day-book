var sectionHeight = function() {
  var total = $(window).height();
  var $section = $('section').css('height','auto');
  if ($section.outerHeight(true) < total) {
    var margin = $section.outerHeight(true) - $section.height();
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
  if ($('div#banner > a.repo').css('display') == 'none') {
    $('nav.toc > input[type="checkbox"]').prop('checked', false);
  }
  var config = {
    theme: 'forest',
    flowchart:{
      useMaxWidth:false,
      htmlLabels:true
    }
  };
  mermaid.initialize(config);
  window.mermaid.init(undefined, document.querySelectorAll('.language-mermaid'));
});
