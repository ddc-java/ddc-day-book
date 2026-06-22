# Navigation Sidebar Disclosure With Nested Details

## Recommendation

Migrating the nested navigation sidebar hierarchy from hidden checkbox/label controls to nested
`details`/`summary` elements is a good long-term direction. The section hierarchy is semantically a
set of disclosure widgets, and native disclosure elements provide that behavior more directly than
custom checkbox state.

The migration should be scoped to the nested sidebar sections first. The top-level mobile/sidebar
open-close affordance controls the visibility of the entire navigation area, not a subsection of
content, so it should be evaluated separately.

## Why It Makes Sense

1. `details` and `summary` express disclosure behavior directly in HTML.

2. Native disclosure elements provide keyboard and assistive-technology semantics with less custom
   markup.

3. The theme already uses `details`/`summary` for assignment workflow panels, so the navigation
   sidebar could share the same disclosure idiom and chevron indicator pattern.

4. The generated navigation markup would no longer need hidden checkbox inputs, generated checkbox
   IDs, `for` attributes, or checked-state sibling selectors for each section.

## Risks And Tradeoffs

1. The existing CSS depends on selectors such as `input:checked ~ ul` and `label::after`. These
   would need to become selectors such as `details[open] > summary::after`.

2. Browser-native disclosure markers must be suppressed consistently so the theme chevrons do not
   appear alongside native markers.

3. Nested `details` can become visually noisy without careful spacing, indentation, and summary
   styling.

4. The current default-open/default-closed behavior maps to generated `checked` attributes and some
   viewport-aware JavaScript. This behavior would need to be re-expressed with `open` attributes and,
   if needed, small JavaScript adjustments.

5. CSS animation may be less straightforward. The current checkbox implementation uses sibling
   selectors and transform/height changes; native `details` toggling may be best left unanimated, or
   animated later with a focused JavaScript enhancement.

## Suggested First Pass

Update `_includes/navigation-toc.html` so each nested section changes from this general shape:

```html
<li class="toc-section">
  <input type="checkbox" id="...">
  <label for="...">Section title</label>
  <ul>...</ul>
</li>
```

to this shape:

```html
<li class="toc-section">
  <details open>
    <summary>Section title</summary>
    <ul>...</ul>
  </details>
</li>
```

Then update `_sass/ddc-day-book.scss` to style:

1. `nav.toc li.toc-section details`

2. `nav.toc li.toc-section summary`

3. `nav.toc li.toc-section summary::after`

4. `nav.toc li.toc-section details[open] > summary::after`

The existing chevron images should continue to be used:

1. `assets/images/chevron-down.svg` for collapsed sections.

2. `assets/images/chevron-up.svg` for expanded sections.

## Defer For Later

Keep the top-level sidebar toggle separate for the first pass. It currently controls whether the
entire navigation sidebar is visible, especially on narrower layouts, and may be better represented
as a button plus JavaScript or as a separate `details` element after the nested-section migration is
working well.
