---
title: Page sections
subtitle: "Typical sections included in assignments, tutorials, and exam problems."
order: 10
---

{% include ddc-abbreviations.md %}

## Page contents
{:.no_toc}

{:.collapsible.collapsed}
- ToC
{:toc}

## Overview

The content of a typical web pages (whether written originally in HTML, Markdown, or another markup language), is organized into sections, using one or more heading tags.

The kramdown parser used by default in this theme supports the usual Markdown headings: lines starting with 1--6 hash chatacters (`#`), followed immediately by a space, then the heading text. In addition, the default kramdown configuration enables _auto IDs_: An HTML `id` attribute is automatically generated for each Markdown heading converted to HTML; the value of the `id` attribute is the "sluggified" form (converted to lower-case, with spaces replaced by `-`) of the heading text. This `id` may be included in the anchor portion of a link.

## No level-1 headings

* As a rule, any HTML page should have only a single level-1 heading. In this theme, the header at the top of every page includes an `<h1>` tag generated automatically using the page- and/or site-level `title` property; thus, _none_ of the source pages (whether Markdown or HTML) should include a level-1 heading in the page content. 

## Table of contents

For pages with more than a handful of headings, or with a deeply-nested headline structure, a table of contents (TOC) for the page should be considered.

### Inclusion

To include a TOC in a Markdown page using the kramdown processor, assign the `toc` reference name to an unordered (bulleted) or ordered (numbered) list:

```markdown
* TOC
{:toc}
```

When converted to HTML by kramdown, the contents of the `toc`-referencing list will be replaced by links to the headings on the page, and the list expanded as necessary; thus, the text of the list item (`TOC` in the example above) isn't included in the rendered result.

The table of contents at the top of this page was produced in this fashion.

To include only a specified range of heading levels in the table of contents, set the `toc_levels` kramdown option after the front matter, but before the `toc` macro is referenced. For example, the following specifies that only heading levels 3, 4, and 5 should be included in the table of contents:

```markdown
{::options toc_levels="3..5" /}
```

Note that the `<H1>` (level-1 heading) displaying the site and/or page title is not included in the table of contents, even if the `toc_levels` open does not exclude level-1 headings.

### Exclusion

To omit a heading from the table of contents, use the `no_toc` CSS class. This can be done in kramdown Markdown with an IAL:

```markdown
## Not included in the TOC
{:.no_toc}
```
In fact, the Markdown shown above is used to define the headline rendered immediately below, and the result is not included in the table of contents at the top of this page.

> ## Not included in the TOC
> {:.no_toc}
{:.render-example}

## Guidelines for specific sections

The actual sections used in curriculum module site pages will vary greatly, depending on the type of module (practical exam problem, homework assignment, extra-credit opportunity, guided tutorial, lecture notes, etc.). Nonetheless, consistency should be an aim; to that end, here are some typical section headings, with explanatory text for how each section might be used.

### Introductory content

Most modules benefit from some kind of introductory content. However, there are subtle differences between an _introduction_, an _overview_, and a _summary_.

#### Introduction

This is most relevant to a tutorial or homework assignment. It should include only general information, without any in-depth instructional content; if there's content the student will be expected to recall for an exam or exercise later, it should not be in this section. 

This section should appear no more than once in a module (even if there are multiple pages), and it should not be very long: 1--3 paragraphs is usually enough.

#### Overview

The key differences between this section and [Introduction](#introduction) is that the content in **Overview** should be re-presented (in more detail) later in the module, and an **Overview** section may appear on multiple pages (though no more than once per page) in a module, always at or near the top. Its purpose is to provide a high-level introduction to the content that will be covered by the rest of the page.

If a module needs **Introduction** and **Overview** sections, they should not appear on the same page. In that case, it is sometimes best to make the site default page (`index.md` or `README.md`) an introduction page; if such a page contains only an introduction section, then leave the section heading out.

#### Summary

This section is very similar to [Overview](#overview), and the same guidelines apply. In most cases, they can be used interchangeably; however, **Summary** should be favored when the section provides a high-level view of tasks to be performed---especially when those tasks are organized in a list.

Alternatively, **Summary** may be used at the end of a page or module, recapitulating the key elements covered previously in that page or module.

### Detailed content

#### Assignment value

If the module is an assignment or practical exam problem, this section (at or near the top---usually even above an [overview](#overview) or [summary](#summary)) can be used to show the point value---broken down into separate components, if appropriate.

The `data-list.html` include file is well-suited for use in this section of a page. The script code in this include reads the specified property from `_config.yml`, rendering the key-value pairs in an unordered, potentially nested list.

For example, assume that `_config.yml` contains the following `assignment` property:

```text
assignment:
- Format: Java Gradle project
- Value:
  - Basic goals:
    - Pseudocode: 5
    - Implementation: 10
    - Tests: 5
  - Stretch goals:
    - Implementation:
      - Functionality: 10
      - Efficiency: 10
    - Tests: 5
```

Further, assume the following script statement in a page of the site:

{% raw %}
```liquid
{% include data-list.html hash_list=site.assignment %}
```
{% endraw %}

This will result in the following rendered content when the page is processed:

<blockquote class="render-example">
{% include data-list.html hash_list=site.assignment %}
</blockquote>

#### Requirements or specifications

If the page specifies some deliverable task(s) the student is expected to perform, include functional and technical specifications in a clearly identified section. Include code fragments and test cases in this section, as appropriate.

#### Assumptions

This section may be used to expand on the [requirements or specifications](#requirements-or-specifications), listing key assumptions that the student may make regarding inputs, environment, etc. 

#### Hints or tips

If the module is for an assignment, practical exam problem, or extra-credit opportunity---particularly if it's especially challenging or requires an approach that's not very obvious---it may be a good idea to include some general tips.

#### Attachments

If the module includes multiple `.pdf` or other attachments, include this section near the bottom of the page, and link to the attachments here---as well as in the first inline reference (if appropriate). These should be formatted as an ordered or unordered list. 

In a multi-page module, it is generally preferable to have a single **Attachments** section (e.g., on a resources page), rather than one or more page-specific **Attachments** sections.

#### Links

Any links to content outside the module should appear here, as well as in the first inline reference (if appropriate). If there is more than one link, an ordered or unordered list should be used.

In a multi-page module, it is generally preferable to have a single **Links** section (e.g., on a resources page), rather than one or more page-specific **Links** sections.
