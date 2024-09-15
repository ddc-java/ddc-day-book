---
title: Site
subtitle: "Enabling and configuring theme on a GitHub Pages site."
order: 20
---

{% include ddc-abbreviations.md %}

## Page contents
{:.no_toc.tight}

{:.collapsible.collapsed}
- ToC
{:toc}

## Properties

Site-level configuration is done in `_config.yml`, and supports the following properties (listed in alphabetical order, not in order of importance):

`author.copyright`

: If a "truthy" value is provided for this property, then it will be assumed that CNM Ingenuity is not the owner of the copyright on the repository content. **Important**: If this property is set to a truthy value, then `author.name` **must** be set as well, because the value of that property will be rendered as the copyright holder in the copyright notice.

`author.email`

: If a value is provided, it will be used in a `mailto` link, with `author.name` as the displayed text; if `author.name` is not specified, then this property is ignored.

`author.href`

: This property is used in conjunction with `author.copyright` and `author.name`. If this property is set, then the value of `author.name` included in the copyright notice will be rendered as a link with an `href` attribute set to the value of this property; otherwise, the value of `author.name` will be included in the copyright notice, but not as a link.

`author.name`

: If a value is provided, it will be displayed in a "Written by" credit in the site's page footers.

`description`

: Description displayed under the page heading. Setting this property at the page level overrides the site-level setting. If not set at the site or page level, the GitHub repository description (if any) is displayed.

: For a single-page site (e.g. a practical exam problem), the description can be set at the page or site level---but it must be set, in any event. For a multi-page site, the description should be set in each page.

`favicon`

: URL (absolute or site-relative) of site icon displayed by the browser for bookmarks and tabs for the site's pages. If omitted or left blank, the Deep Dive Coding diving helmet logo is used.

`google_analytics`

: If Google Analytics are to be used for tracking site/page visits, specify the tracking ID for this property; otherwise, it may be left blank or omitted altogether.

`icon`

: URL (absolute or site-relative) of graphic displayed at the right end of divider between the header and body content of the site's pages. If omitted or left blank, the Deep Dive Coding diving bell logo is used.

`page_navigator.enabled`

: This is a Boolean-valued property, used to control the generation of a left sidebar displaying the table of contents with links to all pages in the site that do not specify `exclude_from_toc` properties. If omitted, left without a value, or set to `false`, the navigator bar will not be generated.

: For a single-page site (e.g. a practical exam problem), this should be omitted or set to `false`. For a multi-page site, this should be explicitly set to `true`.

`remote_theme` (**required**)

: To use this theme, this property must be assigned the value `ddc-java/ddc-day-book@v1`.

`repository_link.enabled`

: This is a Boolean-valued property, used to control the display of the GitHub logo as a link to the repository in GitHub. Note that even if the value is set to `true` (or something  other than `false` or empty), the logo & link will not be displayed if the repository is private.

`title`

: Site-wide title, included in the heading display of each page. If present, this will be concatenated with a page-level title (if present); if neither this nor a page-level title is set, the repository name is used. (Note that a page-level title may be set by the `titles_from_headings` option, described below.)

{:#titles-from-headings} `titles_from_headings.enabled`

: This is a Boolean-valued property used by the Jekyll SEO plug-in. It is only relevant when there are one or more pages that do not specify a `title` property in the front matter, in which case the first heading in such a page will be used as the value of a generated `title` property.

Additional properties may be defined in `_config.yml`, and referenced (with the `site.` prefix) from [Liquid](https://shopify.github.io/liquid/) expressions in any page of the site. For example, in a module containing a practical exam problem, the GitHub Classroom assignment URL can be assigned to an `assignment_url` property in `_config.yml`. A Liquid conditional expression can then be used in a page to display a link if (and only if) a value has been assigned to `site.assignment_url`. 

## Example

Of course, values of the above properties must be specified as properly formatted YAML. Below is an example `_config.yml` file for a site based on this theme. (Note that some properties are not specified, and thus take their default values, or are specified at the page level, as described above.)

```yaml
remote_theme: ddc-java/ddc-day@v1
title: Recursion
author:
  name: Nick Bennett
  email: nick@nickbenn.com
repository_link:
  enabled: false
page_navigator:
  enabled: true
titles_from_headings:
  enabled: false
```

## Guidelines

* Single-page sites should have `page_navigator.enabled` omitted or set to `false` in `_config.yml`.

* Sites with multiple pages should have `page_navigator.enabled` set to `true` (implicitly or explicitly) in `_config.yml`.
