# DFW.cz

Personal blog of David František Wagner — books, writing, games, cats.

Bilingual (CZ/EN) static site built with [Hugo](https://gohugo.io/) and hosted on Netlify.

## Local development

```bash
hugo server -D
```

## Structure

```
content/
  cs/           # Czech content
    knihy/       # Book reviews
    texty/       # Essays & opinions
    hry/         # Games
    kocky/       # Cats
    o-mne/       # About
  en/           # English content
    books/
    writing/
    games/
    cats/
    about/
```

## Deploy

Push to `main` branch → Netlify auto-deploys.
