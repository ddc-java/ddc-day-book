---
title: Repository
subtitle: "Structure and configuration of documentation repositories."
order: 10
---

{% include ddc-abbreviations.md %}

## Page contents
{:.no_toc.tight}

{:.collapsible.collapsed}
- ToC
{:toc}

## Structure

Repositories used for curriculum GitHub Pages sites follow one primary structure, with an alternative structure permitted.

### Primary

* `/` (repository root)
    * `docs/`
        * `assets/` (Include only if needed.)
            * *{Subdirectories and files for repository-specific graphic assets, attachments, etc.}*
        * `api/` (Include only if needed.)
            * *{Subdirectories and files for generated Javadoc documentation.}*
        * `_config.yml`
        * `index.md`
        * *{Additional Markdown or HTML files, as needed}*
    * `README.md` (Not used in GitHub Pages website, but displayed in GitHub repository view.)
    * *{Subdirectories and files containing Java code, resources, IntelliJ metadata, etc.}*

In this structure, the `docs` directory must be specified as the GitHub Pages source directory in the GitHub repository settings.

### Alternative

If a repository does not contain any Java code, but only the instructional content to be published via GitHub Pages, then this structure is permitted:

* `/` (repository root)
    * `assets/` (Include only if needed.)
        * *{Subdirectories and files for repository-specific graphic assets, attachments, etc.}*
    * `_config.yml`
    * `index.md`
    * `README.md` (Not used as default page in GitHub Pages website, but displayed in GitHub repository view.)
    * *{Additional Markdown or HTML files, as needed}*

Here, the repository root must be configured as the GitHub Pages source directory.

## Documentation

Each site repository must include a `README.md` file, containing:

* A short summary of the subject of the site content.

* A credits section, listing 

    * author(s) of the instructional content;
    * CNMI copyright assertion on instructional content, with all rights reserved;
    * author(s) of any included source code (Java, Kotlin, Groovy, SQL, Python, XML, etc.);
    * CNMI copyright assertion on code content (if any), with Apache 2.0 license.

### Example

This is the Markdown content of the `README.md` file in the [Recursion](https://ddc-java.github.io/recursion/basic-tasks.html) module (note that since there is no source code in the repository, there is no Apache 2.0 license statement):

```markdown
# Recursion

## Overview

An introduction to recursion in Java, using two well-known problems:

* Computing factorials.

* Testing strings to determine whether they are palindromes.

This is a curriculum module of the [Deep Dive Coding](https://deepdivecoding.com/) [Java + Android bootcamp](https://deepdivecoding.com/java-android/).

## Credits & copyright

This curriculum module was written by Nick Bennett, with Todd Nordquist and Rishita Hariyani.

&copy; 2024 CNM Ingenuity, Inc. All rights reserved.
```

When viewing the repository in GitHub, this is displayed as

> # Recursion
> {:.no_toc}
> 
> ## Overview
> {:.no_toc}
>
> An introduction to recursion in Java, using two well-known problems:
> 
> * Computing factorials.
> 
> * Testing strings to determine whether they are palindromes.
> 
> This is a curriculum module of the [Deep Dive Coding](https://deepdivecoding.com/) [Java + Android bootcamp](https://deepdivecoding.com/java-android/).
> 
> ## Credits & copyright
> {:.no_toc}
> 
> This curriculum module was written by Nick Bennett, with Todd Nordquist and Rishita Hariyani.
> 
> &copy; 2024 CNM Ingenuity, Inc. All rights reserved.
{:.render-example}

## License

### Open source 

If the repository includes any source code (apart, that is, from the Markdown sources of the site pages), the current DDC position is to permit use of the source code under the Apache 2.0 license. Thus, if there is any such source code in the repository, the Apache 2.0 license must be referenced in `README.md` (see above), and as a header comment in all source files; also, the full license text must be included in the repository in a `LICENSE` file.

### Closed source

For instructional content that isn't source code, CNMI reserves all rights, without any license granted. This copyright notice is automatically displayed in the footer of all pages using this theme. As noted above, it must also be included in `README.md`. Since no license is granted, there's no need to include an additional license file in the repository.

## Settings

- In general, the visibility of any repository using this theme (in fact, of _any_ repository with CNMI curricular content other than programming source code) should be set to **private**, _unless_ the repository is being used as a fork source for student repositories.

- The [site structure](#structure) dictates the GitHub Pages root of the repository.
