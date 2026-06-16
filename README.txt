NOTRADING APPAREL — WEBSITE
===========================
4-page streetwear site. Plain HTML/CSS/JS — no build step.

FILES
  index.html ... home (hero, drops, trust, reviews, FAQ, CTA)
  shop.html .... full catalog with category filters
  about.html ... brand story + founder Court GotEm
  contact.html . form (mailto), details, Atlanta map
  style.css .... all styling + brand colors
  script.js .... nav, scroll reveals, counters, FAQ, filters, form
  *.jpg ........ logo, founder photo, product images

VIEW IT
  Double-click index.html, or run:  python3 -m http.server 8000

EASY EDITS
  Colors ....... top of style.css, the :root block (logo gradient stops)
  Prices/names . the .card blocks in index.html and shop.html
  Contact info . search "notradingapparel@gmail.com" / "478-251-4437"
  Products ..... drop a new image in the folder, copy a .card block,
                 swap the src and the data-cat (varsity / zip / stone)

NOTES
  - The contact form opens the visitor's email app (mailto). For a
    direct-to-inbox form, connect Formspree or Getform (swap the submit
    handler in script.js).
  - The Google map loads on any real host; it only shows an error inside
    sandboxed previews that block google.com.
