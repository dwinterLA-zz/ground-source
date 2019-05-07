# GroundSource Website

## About

GroundSource was built with <a href="https://jekyllrb.com/" target="_blank">Jekyll</a>, a ruby-based static site generator, and is hosted via Github pages.

We're using Jekyll's default templating language: <a href="https://shopify.github.io/liquid/" target="_blank">Liquid</a>.

<a href="https://forestry.io/" target="_blank">Forestry.io</a> has been setup as the CMS for the site.

## Running Locally

1. Clone and `cd` into this repo.
2. `git checkout groundsource-dev`. Consider `groundsource-dev` as the `master` branch for this project.
3. Install the Jekyll and bundler ruby gems: `gem install jekyll bundler`.
4. `bundle exec jekyll serve`.
5. The website will be served here: `http://localhost:4000`.

## Developing

1. Branch off of `groundsource-dev`.
2. When you create a pull request, remember to create it into `groundsource-dev`, not master!
3. After you push the branch, Forestry will automatically detect any changes, build and deploy.
  The deploy usually only takes a few minutes, but I've seen it take up to 30. You can check the status of the deploy
  by logging into <a href="https://forestry.io/" target="_blank">Forestry.io</a>. There will be a spinner icon in the upper-left hand corner of the page if it's still working, or potentially an error message.

## Managing Content

<a href="https://forestry.io/" target="_blank">Forestry.io</a> is a CMS for static sites. Below is a basic overview of how content and data is
structured within Jekyll/Forestry, with a dev focus.
However, Christian's created some literature that describes the actual content (what should go where and how), from a CMS user's perspective. You can find that here: `ground-source/documentation/forestry-documentation.pdf`.

....

Jekyll has two main content concepts: pages and collections.

Pages includes contents (mostly text, some images) that are specific to one of the main pages: index (home), services, about, experience, listing, and listings. To edit,look for the `Pages` link within the left navigation on Forestry.

Collections are arrays of data that can be consumed on any page. Collections can also be setup so that an item in the collection maps to a specific page via the `layout` key in the front matter.

For example, the `Agents` collection is used on the `About` page like this: `{% for agent in site.agents %}`, while each `listing` within the `Listings` collection
is the primary data used within the `listing.html` and `newsletter.html` templates:

`ground-source/_listings/2.md`

```
layout:
- newsletter
- listing
```

If you want to create a new collection, you'll need to add it to the `collections` list in `_config.yml`, and there may be some
additional setup as well. You can read more about collections here: <a href="https://jekyllrb.com/docs/collections/">jekyll collections</a>.

Data (markdown files) for existing collections can by found at the root (left-hand navigation) menu within Forestry.

## Front Matter

Front matter are a special kind of file that dictates the type of data a page or collection can support.
Front matter templates exist in Forestry, which allow you to easily add, remove, or change the data fields available to pages and collections.

Go to `Site -> Front matter` (on left-nav) if you'd like to make a change to any of the existing templates. You can also add new templates on this page.

Jankiness can sometimes happen when adding or removing fields for existing collections. For example, you might add a new field for the front matter template for `listing`, but then not see it as a valid editable field within the CMS itself. When this has happened in the past, I've directly edited
the corresponding markdown file, and committed to `groundsource-dev`. Every collection is included as a folder at the root of the repo. Within each collection folder, each item is represented by a markdown file. Example path for Listing number 3: `ground-source/_listings/3.md`.

## Newsletter & Flyer

A 'newsletter' template was setup that utilizes the listing collection, meaning Jekyll generates a newsletter for each listing. You can
access a listing's newsletter by visiting: `https://www.groundsource.net/listings/{LISTING_LABEL}/newsletter.html .

The newsletter was intended to be hooked into Mailchimp (styling and markup is email-friendly), so there aren't any links to the newsletter from the website.

To clarify some potential confusion: There's also a print layout on the `listing.html` page. The GroundSouce team often creates a PDF from the print layout and (manually) attaches this to emails. They usually refer to this as the 'flyer'. The flyer and newsletter contain mostly the same information, but
are sourced from completely different HTML files.

## Google Maps API integration

To load a map via the Google maps api, a valid api key is required.

The key has been generated based on the same Google account that's been setup for the
newsletter: `groundsourcemailer@gmail.com`. To maintain these keys, login to the
<a href="https://console.cloud.google.com/google/maps-apis/">Google Cloud Platform console</a>. Then
APIs -> Credentials.

The same api key is used for the javascript maps api (used on the home and inner listing page)
as well as the static map api (used on the email newsletter).

To prevent abuse of our token, the refferer has been restricted to groundsource.net and localhost.


## Site Data

Jekyll has a concept of 'site data'. Any `.yml` file you place within the `_data` folder becomes
accessible on the `site.data` key with the name of the folder included in the path.

So far we only have `contact.yml`. You can edit the values via the `Data` link on the left-nav
in Forestry, or by directly editing this file: `/ground-source/_data/contact.yml`.
Site data is accessible within the liquid templates in the following manner: `site.data.contact.instagram`.

## The Contact Us form

An interesting implementation. The form that's part of the 'Contat Us' modal makes a POST request to a Google script
that is 'deployed as web app'.

The script lives within this gmail account: `groundsourcemailer@gmail.com` . As of this writing, the script does two things:

1. Adds a row to this associated google sheet: 'GroundSource - Request`
2. Sends an email to: `info@groundsource.net` with the information from the form


If you need to update the Google script:
1. Login to `groundsourcemailer@gmail.com`
2. Go to Drive, and click on `GroundSource - Request`
3. Select `Tools -> Script Editor
4. After you make your edits:
  A. Publish -> Deploy as Web App
  B. Under `Project Version`, select `New`
  C. Make sure that `Execute the app as` = `Me`
  D. Make sure that `Who has access to the app` = `Anyone, even anonymous`
  E. Press `Update` .. you'll then be presented with a new app URL, copy it
  F. Now, you need to update the `POST` url within this repository:
    1. Within `formSubmit.js` you'll find this constant at the top of the file: `GOOGLE_WEB_APP_URL`,
       update it with the new URL that Google provided when you updated the script

Note that if the mailer ever stops working, we may need to increment the version (steps 4A - 4E) and republish to
get it working again.


