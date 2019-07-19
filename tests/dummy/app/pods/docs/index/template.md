# Installation

## Install Or Upgrade

{{#docs-snippet name="terminal-install" title="Terminal"}}
  ember install ember-data-base-model
{{/docs-snippet}}

## What Happens

1. `ember-data-base-model` is downloaded and added to your project.
1. The latest `ember-data` is downloaded and installed into your project.

<div class="docs-bg-grey-lightest docs-border-l-4 docs-border-grey docs-text-grey-darker docs-p-4" role="alert">
  <p class="docs-font-bold">What If I Already Have These Addons/Packages?</p>
  <p>
    Well the short answer is they will be updated to their latest stable version.
  </p>
  <p>
    If this doesn't work for you, for example, you might want to stay on an older version
    of <code>ember-data</code>.  Then in this case, I would adivse you to go into
    your package.json and revert back to the version of <code>ember-data</code> that
    you need to remain on.  <strong>Will that break this addon?</strong>  Probably not.  We 
    don't do anything experimental or crazy with these additional depenendencies.
  </p>
  <p>
    I'd urge you to be very cautious in staying on old stale versions of NPM packages 
    and Ember addons. 
  </p>
</div>

## Paired Nicely With `ember-api-actions`

This addon pairs nicely with Mike North's [`ember-api-actions`](https://github.com/mike-north/ember-api-actions).
