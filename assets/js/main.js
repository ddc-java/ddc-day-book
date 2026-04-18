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
  $('.collapsible').prev().each(function(index) {
    const checkbox = document.createElement('input');
    const checkboxId = this.id + '-checkbox';
    checkbox.id = checkboxId;
    checkbox.className = 'collapser';
    checkbox.setAttribute('type', 'checkbox');
    const label = document.createElement('label');
    label.id = this.id;
    label.setAttribute('for', checkboxId);
    label.appendChild(document.createTextNode(this.innerText));
    copyNodeStyle(this, label);
    $(this).replaceWith($([checkbox, label]));
  });
  $('.collapsible:not(.collapsed)').prev().prev().each(function(index) {
    this.setAttribute('checked', '');
  });
}

function initLangSwitchers() {
  const storageKey = 'ddc-day-book-lang';
  const candidates = Array.from(document.querySelectorAll('[data-lang-group]'));
  const groups = collectLangGroups(candidates);
  const allButtons = [];

  groups.forEach((group, index) => {
    if (group.blocks.length > 1) {
      const { buttons } = enhanceLangGroup(group, index, storageKey);
      allButtons.push(...buttons);
    }
  });

  if (allButtons.length > 0) {
    const initialLang = selectInitialLang(allButtons, storageKey);
    if (initialLang) {
      storeLangPreference(storageKey, initialLang);
      document.dispatchEvent(new CustomEvent('ddc-lang-switch', {
        detail: { lang: initialLang }
      }));
    }
  }
}

function collectLangGroups(candidates) {
  const groups = [];
  const consumed = new Set();

  candidates.forEach((block) => {
    if (consumed.has(block)) {
      return;
    }
    const groupName = block.dataset.langGroup?.trim();
    if (!groupName) {
      return;
    }
    const group = {
      groupName: groupName,
      parent: block.parentElement,
      blocks: [block]
    };
    consumed.add(block);
    let sibling = nextRelevantSibling(block);
    while (sibling && sibling.dataset.langGroup?.trim() === groupName &&
        sibling.parentElement === group.parent) {
      group.blocks.push(sibling);
      consumed.add(sibling);
      sibling = nextRelevantSibling(sibling);
    }
    groups.push(group);
  });
  return groups;
}

function nextRelevantSibling(element) {
  let sibling = element.nextSibling;
  while (sibling) {
    if (sibling.nodeType === Node.TEXT_NODE && sibling.textContent.trim() === '') {
      sibling = sibling.nextSibling;
      continue;
    }
    if (sibling.nodeType === Node.COMMENT_NODE) {
      sibling = sibling.nextSibling;
      continue;
    }
    return sibling.nodeType === Node.ELEMENT_NODE ? sibling : null;
  }
  return null;
}

function enhanceLangGroup(group, groupIndex, storageKey) {
  const switcher = document.createElement('div');
  const tabs = document.createElement('div');
  const panels = [];
  const buttons = [];

  switcher.className = 'lang-switcher';
  if (group.blocks.some((block) => block.classList.contains('copyable'))) {
    switcher.classList.add('copyable');
  }
  switcher.dataset.langGroup = group.groupName;
  tabs.className = 'lang-switcher__tabs';
  tabs.setAttribute('role', 'tablist');
  tabs.setAttribute('aria-label', 'Language examples');
  switcher.appendChild(tabs);
  group.blocks[0].before(switcher);

  group.blocks.forEach((block, blockIndex) => {
    const lang = getLang(block, blockIndex);
    const key = slugify(group.groupName + '-' + lang + '-' + groupIndex + '-' + blockIndex);
    const tabId = 'lang-switcher-tab-' + key;
    const panelId = 'lang-switcher-panel-' + key;
    const button = document.createElement('button');
    const panel = document.createElement('div');

    button.type = 'button';
    button.className = 'lang-switcher__tab';
    button.id = tabId;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', panelId);
    button.dataset.lang = lang;
    button.textContent = lang;

    panel.className = 'lang-switcher__panel';
    panel.id = panelId;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabId);
    if (block.classList.contains('highlighter-rouge')) {
      panel.classList.add('lang-switcher__panel--code');
    }

    block.removeAttribute('data-lang-group');
    block.removeAttribute('data-lang-label');
    panel.appendChild(block);

    button.addEventListener('click', () => {
      storeLangPreference(storageKey, lang);
      document.dispatchEvent(new CustomEvent('ddc-lang-switch', { detail: { lang } }));
    });
    button.addEventListener('keydown',
        (event) => handleLangTabKeydown(event, lang, buttons, storageKey));

    buttons.push({lang: lang, element: button});
    panels.push({lang: lang, element: panel});
    tabs.appendChild(button);
    switcher.appendChild(panel);
  });

  const updateView = (lang) => {
    const langInGroup = buttons.some(b => b.lang === lang);
    if (!langInGroup) {
      return;
    }
    buttons.forEach((button) => {
      const isSelected = button.lang === lang;
      button.element.classList.toggle('is-active', isSelected);
      button.element.setAttribute('aria-selected', String(isSelected));
      button.element.tabIndex = isSelected ? 0 : -1;
    });
    panels.forEach((panel) => {
      panel.element.hidden = panel.lang !== lang;
    });
  };

  document.addEventListener('ddc-lang-switch', (e) => updateView(e.detail.lang));

  return { buttons, switcher };
}

function handleLangTabKeydown(event, lang, buttons, storageKey) {
  const currentIndex = buttons.findIndex((button) => button.lang === lang);
  let nextIndex = currentIndex;

  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      nextIndex = (currentIndex + buttons.length - 1) % buttons.length;
      break;
    case 'ArrowRight':
    case 'ArrowDown':
      nextIndex = (currentIndex + 1) % buttons.length;
      break;
    case 'Home':
      nextIndex = 0;
      break;
    case 'End':
      nextIndex = buttons.length - 1;
      break;
    default:
      return;
  }

  event.preventDefault();
  const nextLang = buttons[nextIndex].lang;
  storeLangPreference(storageKey, nextLang);
  document.dispatchEvent(new CustomEvent('ddc-lang-switch', { detail: { lang: nextLang } }));
  buttons[nextIndex].element.focus();
}

function selectInitialLang(buttons, storageKey) {
  const storedLang = loadLangPreference(storageKey);
  const availableLangs = [...new Set(buttons.map(b => b.lang))];
  if (storedLang && availableLangs.includes(storedLang)) {
    return storedLang;
  }
  return availableLangs.length > 0 ? availableLangs[0] : null;
}

function getLang(block, blockIndex) {
  return block.dataset.langLabel?.trim() ||
      detectLang(block) ||
      'Option ' + (blockIndex + 1);
}

function detectLang(block) {
  const classNames = [
    block.className,
    block.querySelector('code')?.className ?? ''
  ].join(' ');
  const match = classNames.match(/language-([a-z0-9_-]+)/i);
  return match ? normalizeLangName(match[1]) : '';
}

function normalizeLangName(languageName) {
  return languageName
      .split(/[-_]/)
      .filter((part) => part.length > 0)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
}

function slugify(value) {
  return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
}

function createCopyButton(label) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'copy-btn';
  btn.setAttribute('aria-label', label);
  btn.innerHTML = '<i class="fa fa-copy" aria-hidden="true"></i>';
  return btn;
}

function copyToClipboard(btn, text) {
  navigator.clipboard.writeText(text).then(function() {
    btn.classList.add('copied');
    btn.querySelector('i').className = 'fa fa-check';
    setTimeout(function() {
      btn.classList.remove('copied');
      btn.querySelector('i').className = 'fa fa-copy';
    }, 1500);
  });
}

function getTableAsTsv(table) {
  return Array.from(table.querySelectorAll('tr')).map(function(row) {
    return Array.from(row.querySelectorAll('th, td'))
        .map(function(cell) { return cell.innerText.replace(/[\t\n]+/g, ' ').trim(); })
        .join('\t');
  }).join('\n');
}

function initCopyableTables() {
  document.querySelectorAll('table.copyable').forEach(function(table) {
    const wrapper = document.createElement('div');
    wrapper.className = 'copyable-table-wrapper';
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
    const btn = createCopyButton('Copy table as tab-separated values');
    btn.addEventListener('click', function() {
      copyToClipboard(btn, getTableAsTsv(table));
    });
    wrapper.appendChild(btn);
  });
}

function initCopyableCodeBlocks() {
  // Multi-language switchers: button goes in the tabs bar, always visible
  document.querySelectorAll('.lang-switcher.copyable').forEach(function(switcher) {
    const tabs = switcher.querySelector('.lang-switcher__tabs');
    const btn = createCopyButton('Copy code');
    btn.addEventListener('click', function() {
      const activePanel = switcher.querySelector('.lang-switcher__panel:not([hidden])');
      const code = activePanel && activePanel.querySelector('code');
      if (code) copyToClipboard(btn, code.innerText);
    });
    tabs.appendChild(btn);
  });

  // Standalone copyable code blocks: wrap and add floating button
  document.querySelectorAll('div.copyable').forEach(function(block) {
    if (block.closest('.lang-switcher')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'copyable-code-wrapper';
    block.parentNode.insertBefore(wrapper, block);
    wrapper.appendChild(block);
    const btn = createCopyButton('Copy code');
    btn.addEventListener('click', function() {
      const code = block.querySelector('code');
      if (code) copyToClipboard(btn, code.innerText);
    });
    wrapper.appendChild(btn);
  });
}

function loadLangPreference(storageKey) {
  try {
    return window.localStorage.getItem(storageKey);
  } catch (error) {
    return null;
  }
}

function storeLangPreference(storageKey, lang) {
  try {
    window.localStorage.setItem(storageKey, lang);
  } catch (error) {
  }
}

$(document).ready(function() {
  setNavClosedByDefault();
  buildCollapsibles();
  initLangSwitchers();
  addTargetToExternalLinks();
  initCopyableTables();
  initCopyableCodeBlocks();
});
