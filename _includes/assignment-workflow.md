{% assign state = site.publication_states | where: "id", page.publishing_state | first %}
{% unless state.current %}{% assign show_next = true %}{% endunless %}
{% assign context = include.context | default: "overview" %}
{% assign work_done_text = include.work_done_text | default: "your implementation and tests are complete" %}

{% if context == "overview" %}

{% if site.creator_view or state.current %}

<aside class="assignment-workflow assignment-workflow--overview" markdown="1">

## Repository Access

  <p>After this exercise is released, use GitHub to find and clone your individual repository, then choose either the Java or Kotlin assignment branch.</p>
  <details>
    <summary>Individual repository and website steps</summary>
    <ol>
      <li>After this exercise is released by the instructor, you can find your repository by clicking <a href="https://{{ site.github.hostname }}/orgs/{{ site.github.owner_name }}/repositories?q={{ site.github.repository_name }}">this link</a> to search your cohort's GitHub org (<code>{{ site.github.owner_name }}</code>) for repository names containing "<code>{{ site.github.repository_name }}</code>".</li>
      <li>The name of your repository will be <code>{{ site.github.repository_name }}-</code>, followed by your GitHub username.</li>
      <li>Click on your repository name in the list to navigate to its GitHub landing page.</li>
      <li>Clone your repository to your local system as usual.</li>
      <li>Check out the <code>assignment/java</code> branch to complete the exercise in Java, or the <code>assignment/kotlin</code> branch to complete the exercise in Kotlin. In most coding exercises in this bootcamp, <code>assignment/java</code> is the default branch, and will be checked out when the repository is first cloned.</li>
      <li>Access your individual website for the exercise via the link at the top of the "About" section, located in the right sidebar of the repository landing page.</li>
    </ol>
  </details>
</aside>

{% endif %}

{% if site.creator_view or show_next %}

<aside class="assignment-workflow assignment-workflow--overview" markdown="1">

## Repository and Workflow

  <p>Your repository and workflow status are available from the navigation sidebar; these will open in separate tabs from this one, so that the assignment instructions remain readily available.</p>
  <details>
    <summary>Automated workflow details</summary>
    <p>When you push committed changes from your local repository to GitHub, 2--3 workflow jobs will start automatically:</p>
    <ol>
      <li>The first job attempts to compile your implementation and tests; if successful, it then runs your tests and reports on the results.</li>
      <li>In parallel with the first job, the second job runs a series of prepackaged tests against your implementation.</li>
      <li>If the second job runs successfully, without any test failures, a third workflow job is triggered, updating your individual website for the exercise. If there are additional goals to be completed, the instructions for the next set of goals will be published as part of this update.</li>
    </ol>
    <p>The "GitHub/Actions" link in the left sidebar is a direct link to the GitHub <a href="{{ site.github.repository_url | absolute_url }}/actions">workflow actions page for the repository</a>, where you can monitor the progress of the workflow jobs described above.</p>
  </details>
</aside>

## Exercise contents

{% include navigation-section.html %}

{% endif %}

{% elsif context == "next" %}

{% if site.creator_view or state.current %}

<aside class="assignment-workflow assignment-workflow--submission" markdown="1">

## Submitting Your Work

  <p>When {{ work_done_text }}, commit your work and push to GitHub, even if you've been committing along the way.</p>
  <details>
    <summary>Submission and workflow details</summary>
    <p>As described in <a href="index.html#repository-and-workflow">Repository and Workflow</a>, pushing committed changes triggers automated workflow jobs in GitHub. These jobs build your implementation, build and run your tests (if any), and run grading tests against your implementation. If the grading tests pass, this website is updated.</p>
    <p>The "GitHub/Actions" link in the left sidebar is a direct link to the GitHub <a href="{{ site.github.repository_url | absolute_url }}/actions">workflow actions page for the repository</a>, where you can monitor the progress of the workflow jobs described above.</p>
    <p>If all of your tests are passing locally, but the automated workflow jobs are failing, contact an instructor for assistance.</p>
  </details>

</aside>

{% endif %}

{% if site.creator_view or show_next %}

<aside class="assignment-workflow assignment-workflow--next" markdown="1">

## Next Steps

  <p>{{ include.next_text | default: "Your implementation code has passed the grading tests for the basic goals, and the stretch goal specifications are now available." }}</p>

</aside>

{% endif %}

{% elsif context == "complete" %}

{% if site.creator_view or state.current %}

<aside class="assignment-workflow assignment-workflow--submission" markdown="1">

## Submitting Your Work

  <p>When {{ work_done_text }}, commit your work and push to GitHub, even if you've been committing along the way.</p>
  <details>
    <summary>Submission and workflow details</summary>
    <p>As described in <a href="index.html#repository-and-workflow">"Repository and Workflow"</a>, pushing committed changes triggers automated workflow jobs in GitHub. These jobs build your implementation, build and run your tests (if any), and run grading tests against your implementation. If the grading tests pass, this website is updated.</p>
    <p>The "GitHub/Actions" link in the left sidebar is a direct link to the GitHub <a href="{{ site.github.repository_url | absolute_url }}/actions"> workflow actions page for the repository</a>, where you can monitor the progress of the workflow jobs described above.</p>
    <p>If all of your tests are passing locally, but the automated workflow jobs are failing, contact an instructor for assistance.</p>
  </details>

</aside>

{% endif %}

{% if site.creator_view or show_next %}

<aside class="assignment-workflow assignment-workflow--complete" markdown="1">

## Congratulations!

  <p>{{ include.complete_text | default: "Your implementation code has passed the grading tests for the basic and stretch goals! (The instructor will review the code to verify the correctness and completeness of your unit tests.)" }}</p>

</aside>

{% endif %}

{% endif %}
