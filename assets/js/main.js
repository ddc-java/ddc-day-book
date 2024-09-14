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

function addTargetToExternalLinks() {
  // Select all absolute links (starting with http or https)
  $('a[href^="http"], a.external').each(function() {
    // Check if the link doesn't already have a target attribute
    if (!$(this).attr('target')) {
      // Set the target attribute to "_blank"
      $(this).attr('target', '_blank');
    }
  });
}

function setNavClosedByDefault() {
  if ($('#nav-default-closed-flag').css('display') == 'none') {
    $('nav.toc > input[type="checkbox"]').prop('checked', false);
  }
}

function buildCollapsibles() {
  $('.collapsible').each(function(index) {
    const collapsible = this;
    const facade = $(collapsible).prev().get(0);
    const id = facade.id;
    const text = facade.innerText;
    const checkbox = document.createElement('input');
    checkbox.id = id;
    checkbox.className = 'collapser';
    checkbox.setAttribute('type', 'checkbox');
    if (!collapsible.classList.contains('collapsed')) {
      checkbox.setAttribute('checked', '');
    }
    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.appendChild(document.createTextNode(text));
    copyNodeStyle(facade, label);
    $(facade).replaceWith($([checkbox, label]));
  });
}

$(document).ready(function() {
  setNavClosedByDefault();
  buildCollapsibles();
  addTargetToExternalLinks();
});
