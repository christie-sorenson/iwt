# Flexbook

Flexbook IWT R&D

## Install GitBook CLI

[Install the CLI](http://toolchain.gitbook.com/setup.html)

---

## Clone the Repo

`git@github.com:PINT/flexbook.git`

---

## Run the book locally

`gitbook serve`

View locally at `http://localhost:4000/`
 
---

## Pushing changes to GitBook

[Instructions](https://help.gitbook.com/books/how-can-i-use-git.html)

    git remote add gitbook https://git.gitbook.com/{{UserName}}/{{Book}}.git
    git push -u -f gitbook master

---

## Structure

    .
    |--- _book
    |--- app
    |--- book.json

* **_book** Automatically generated source when you run `gitbook serve`.
* **app** Bundled book source. Modify the files here to update `_book`
* **book.json** The config file for the book. Includes `root` command since `/app` is not the default file structure

---

## Further Reading

* [API](http://developer.gitbook.com/http.html)
* [CLI Doc](http://toolchain.gitbook.com/)
* [Plugins](http://developer.gitbook.com/plugins/index.html)
* [Webhooks](http://developer.gitbook.com/webhooks/index.html)