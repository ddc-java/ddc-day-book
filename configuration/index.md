---
title: Introduction
subtitle: "Configuration of DDC Day Book-based sites for Jekyll/GitHub Pages."
order: 0
layout: section
---

{% include ddc-abbreviations.md %}

## Page contents
{:.no_toc}

{:.collapsible.collapsed}
- ToC
{:toc}

## Overview

DDC Day Book is a GitHub Pages _remote theme_. In other words, it's not one of the standard dozen (or so) themes that can be selected in the GitHub Pages theme chooser; nonetheless, it can be selected as a theme for a GitHub Pages site, simply by making a change to the `_config.yml` file in the repository, committing the change, and---if the change was committed to a local clone---pushing the commit to GitHub. 

For any GitHub Pages site, `_config.yml` is not only used to specify a theme for a site, but also to set a number of site-level configuration properties. The properties supported in this theme are listed below.

## Use cases

This theme is intended for sites with one or more pages; in practice, the upper limits on pages will depend on the depth of the page hierarchy, the lengths of page titles, and the number of pages: displaying a large number of entries with long titles, or entries that are deeply nested, in the page navigator sidebar implemented in this theme may not give &aelig;sthetically pleasing results.

## Configuration

By default, site generation for GitHub Pages relies heavily on Jekyll (which depends, in turn, on Shopify's Liquid scripting language), and a set of Jekyll plugins. 

For most practical purposes, we can view the `_config.yml` file (which is, as the file extension would indicate, a YAML file) as the Jekyll entry point: Site-level configuration elements read from this file drive much of the subsequent site generation process.

A significant subset of Jekyll's behavior, configured at the site level in `_config.yml`, can be overridden at the page level by including _front matter_ in the page. Front matter is a YAML section that---if present---must be located at the start of a file (the rest of the file content will generally be written in Markdown or HTML), and must be enclosed within two delimiter lines; these delimiter lines must contain exactly three hyphen characters (`---`), with no whitespace appearing before or between the hyphens, and no other non-whitespace characters allowed.

## Section contents