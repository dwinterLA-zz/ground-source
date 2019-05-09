# GroundSource Website

## About

GroundSource was built with <a href="https://jekyllrb.com/" target="_blank">Jekyll</a>, a ruby-based static site generator, and is hosted via Github pages.

We're using Jekyll's default templating language: <a href="https://shopify.github.io/liquid/" target="_blank">Liquid</a>.

<a href="https://forestry.io/" target="_blank">Forestry.io</a> has been setup as the CMS for the site.

## Developing
Note: This project is using the Jekyll version 3.5.2 and was setup with Ruby version 2.3.
You should have RVM installed. RVM will ensure that you're running the correct Ruby version (thanks to the .ruby-version file).

1. Clone and `cd` into this repo.
2. Install the Jekyll and Bundler ruby gems: `gem install jekyll bundler`.
3. `bundle exec jekyll serve` (installs required ruby gems and starts the dev server).
4. The website will be served here: `http://localhost:4000`.
5. Create a feature branch off of `master`. Note: `groundsource-dev` and `gh-pages` branches are special (see below), so don't use either as your feature branch.
6. When you're ready, create a pull request back into `master`.

## Deploying
- The production branch for this project is: `groundsouce-dev`. A poor name for a production branch, but Forestry
   doesn't allow us to change the deployment branch (yet... they're working on it).

- Merge the latest `master` into `groundsource-dev`. Forestry will:
    - Automatically detect any changes made to `groundsource-dev`.
    - Build the site and commit to the Github Pages branch: `gh-pages`.

- Within a few minutes, your changes should be live at <a href="https://groundsource.net">groundsource.net</a>. If not, logging into Forestry should illuminate potential build errors (look for the status indicator at the top of the left navigation bar).


## Managing Content

<a href="https://forestry.io/" target="_blank">Forestry.io</a> is a CMS for static sites. Below is a brief technical overview of how Jekyll/Forestry handles content.

Christian's also created some <a href="https://www.groundsource.net/documentation/forestry-documentation.pdf">literature</a> that describes the data entry process.


Jekyll has two main content concepts:

- Pages:
> A Page includes contents (mostly text, some images) that are specific to that specific page on the website, either: index/home, about, listings, listing, or experience.

> To edit,look for the `Pages` link within the left navigation on Forestry.

- Collections:

> Collections are arrays of data that can be consumed on any page. Collections can also be setup so that an item in the collection maps to a specific page via the `layout` key in the front matter.
> For example, the `Agents` collection is used on the `About` page like this: `{% for agent in site.agents %}`, while each `listing` within the `Listings` collection
  is the primary data used within the `listing.html` and `newsletter.html`.

> If you want to create a new collection, you'll need to add it to the `collections` list in `_config.yml`. You can read more about collections here: <a href="https://jekyllrb.com/docs/collections/">jekyll collections</a>.

> Data (markdown files) for existing collections can be found at the root (left-hand navigation) menu within Forestry.

## Front Matter

Front matter in Jekyll projects consist of a YAML block of variables at the top of content file (we use MD, but they can also be HTML). Essentially, these variables make up the context that will be available within your Liquid templates. Front matter also dictates which fields /options will be available for data entry within the CMS.

An admin section of Forestry (`Site -> Front matter` within the left navigation) gives us the ability to create "Front Matter Templates". These templates allow us to control the data that users of the CMS are able to upload for each page / collection.

For example, an "agent" front matter template exists, and has been designated as the front matter template for the Agent collection. The template dictates the following fields:

  - First Name: Text Field
  - Last Name: Text Field
  - Email: Text Field
  - Highlights: Sortable List
  - Avatar: Image / File Upload
    ... ...

If I were to add an Agent to the collection (Agents -> Create New), I'd then see all of the fields above as options, and be able to enter data and upload files for each.

The front matter template section should really only be used by devs. Adding fields here is pointless if you can't update the codebase to actually set the pages up to utilize these fields.

If GroundSouce were to upgrade their Forestry account, I'd recommend hiding this section from non-devs.

Note: Jankiness can sometimes happen when adding or removing fields for existing collections. For example, you might add a new field for the front matter template for `listing` but then not see it as a valid, editable field within the CMS itself. When this has happened in the past, I've directly edited
the corresponding markdown file, and committed to `groundsource-dev`. Collection are included as folders at the root of the repo.

## Newsletter & Flyer

A 'newsletter' template was setup that utilizes the listing collection, meaning Jekyll generates a newsletter for each listing. You can
access a listing's newsletter by visiting: `https://www.groundsource.net/listings/{LISTING_LABEL}/newsletter.html .

The newsletter shares the same page data as `listing.html`. This has been made possible by the `jekyll-multipost` gem.

The newsletter was intended to be hooked into Mailchimp (styling and markup is email-friendly), so there aren't any links to the newsletter from the website.

Potential point of confusion: There's also a print layout on the `listing.html` page. The GroundSouce team often creates a PDF from the print layout and (manually) attaches this to emails. They usually refer to this as the 'flyer'. The flyer and newsletter contain mostly the same information, but
are sourced from completely different HTML files.

## Google Maps API integration

To load a map via the Google maps api, a valid api key is required.

The key has been generated based on the same Google account that's been setup for the
newsletter: `groundsourcemailer@gmail.com`. To maintain these keys, login to the
<a href="https://console.cloud.google.com/google/maps-apis/">Google Cloud Platform console</a> (then
APIs -> Credentials).

The api key is used for the javascript api (used on the home and inner listing page)
as well as the static api (used on the email newsletter).

To prevent abuse of our token, the referer has been restricted to groundsource.net and localhost.


## Site Data

Jekyll has a concept of 'site data'. Any `.yml` file you place within the `_data` folder becomes
accessible on the `site.data` key with the name of the folder included in the path.

So far we only have `contact.yml`. You can edit the values via the `Data` link on the left-nav
in Forestry, or by directly editing this file: `/ground-source/_data/contact.yml`.
Site data is accessible within the liquid templates in the following manner: `site.data.contact.instagram`.

## The Contact Us form

An interesting implementation. The form that's part of the 'Contact Us' modal makes a POST request to a Google script
that is 'deployed as web app'.

The script lives within this gmail account: `groundsourcemailer@gmail.com` . As of this writing, the script does two things:

1. Adds a row to this associated google sheet: 'GroundSource - Request`
2. Sends an email to: `info@groundsource.net` with the information from the form


If you need to update the Google script:
1. Login to `groundsourcemailer@gmail.com`
2. Go to Drive, and click on `GroundSource - Request`
3. Select `Tools -> Script Editor
4. After you make your edits:
  - Publish -> Deploy as Web App
  - Under `Project Version`, select `New`
  - Make sure that `Execute the app as` = `Me`
  - Make sure that `Who has access to the app` = `Anyone, even anonymous`
  - Press `Update` .. you'll then be presented with a new app URL, copy it
  - Now, you need to update the `POST` url within this repository:
    - Within `formSubmit.js` you'll find this constant at the top of the file: `GOOGLE_WEB_APP_URL`,
       update it with the new URL that Google provided when you updated the script

Note that if the mailer ever stops working, we may need to increment the version (steps 4A - 4E) and republish to
get it working again.


