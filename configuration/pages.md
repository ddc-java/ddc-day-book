---
title: Pages
subtitle: "Defining and configuring one or more pages."
order: 30
---

{% include ddc-abbreviations.md %}

## Page contents
{:.no_toc}

{:.collapsible.collapsed}
- ToC
{:toc}

## Overview

This theme may be used for a site with a single page, or multiple pages. Optionally, a site-level table of contents, containing links to one or more pages of the site may be displayed in a sidebar. 

## Configuration

### Properties

Page-level configuration is done in the front matter (a YAML block preceding the page content), and supports the following properties (listed in alphabetical order, not in order of importance):

`content_dir`

: In this theme, some pages may be used to define a hierarchical section (i.e., group of pages) within the module site, rather than including any Markdown content themselves. This type of page must include a `content_dir` property and a `title` property (described below). 

: `content_dir` specifies the name of a subdirectory, which must be located in the same directory as the page (in particular, to prevent circular, invalid, or dangerous references, it must not contain a `/`); the contents of that subdirectory will be displayed nested below the given page in the table of contents.

`description`

: Description displayed under the page heading. Setting this property at the page level overrides the site-level setting. If not set at the site or page level, the GitHub repository description (if any) is displayed.

: For a single-page site (e.g., a practical exam problem), the description can be set at the page or site level---but it must be set, in any event. For a multipage site, the description should be set in each page. 

: Note that this text should be limited to 80--90 characters; long text should be checked carefully after publication, at various screen/browser window widths, to make sure it displays as desired.

`exclude_from_toc`

: This is a Boolean-valued property, used to control the inclusion (by default) or exclusion of the page from a sidebar displaying the table of contents of the site. If omitted, left without a value, or set to `false`, the page will be included in the table of contents (assuming that `site.page_navigator.enabled` is set to `true`); if explicitly set to `false`, the page will be excluded from the table of contents.

`order`

: This is the sort order for pages listed in the page navigator. Pages with an empty value for this property (or with the property omitted altogether) are sorted at the start of the list.

`subtitle`

: This property is essentially synonymous with the page-level `description` property (above). If both are set, this property takes priority over `description`.

`title`

: Page title, included in the heading display. If present, this will be concatenated to the site-level title (if present); if neither this nor a site-level title is set, then the repository name is used. (Note that a page-level title may be set by the `titles_from_headings` option, described in [Configuration](site.md#titles-from-headings).)

: In general, this property should be set in every page.

Additional properties may be defined in the front matter, and referenced (with the `page.` prefix) from Liquid expressions in the page.

### Example

Of course, values of the above properties must be specified as properly formatted `YAML` in the page front matter. Here is an example page front matter, with some of the above properties set:

```yaml
---
title: Lists & links
description: "Creating unordered lists and links in Markdown"
order: 30
---
```

## Table of contents

For information on creating a table of contents within a page, see ["Page sections: Table of contents"]({{ "/content/sections#table-of-contents" | relative_url }})

## Guidelines

* On a multi-page site, `title` and `subtitle` (or `description`) property values should be set explicitly on all pages.

* In a multi-page site with `page_navigator.enabled` set to `true` at the site level, all pages should have the `order` properties set, and none should be excluded from the page navigation sidebar using `exclude_from_toc: true`. 

    One permissible exception to this rule is the site default page, `index.md`: If the site has 5+ pages, and if the default page is just a short introduction, with little (if any) instructional content, it may be left out of the page navigator by setting `exclude_from_toc: true` in the front matter. The default page will still be reachable from other pages on the site, by clicking on the main header text at the top of the page. 
    
* In a multi-page site with `page_navigator.enabled` set to `true` at the site level, a page with `href` property set will have a corresponding link in the page navigator, but the link will go to the address specified by the `href` property. For example, the front matter below will result in a link to the Mozilla Developer Network (MDN) site appearing in the page navigator.

    ```yaml
    ---
    title: "Mozilla Developer Network"
    order: 100
    href: "https://developer.mozilla.org"
    ---
    ```
    
    Note that when the `href` property is set, any content below the front matter will generally not be displayed (since the page navigator link will go to the page specified in `href`). Thus, pages using `href` should generally not contain content after the front matter.
