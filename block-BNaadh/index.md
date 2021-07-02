writeCode

Q. write express generator command with varying options to generate express app with following features:

- using ejs as template engine
```js
    express --view=ejs app-1
```
- no views for express application
```js
    express --no-view app-2
```
- express app with gitignore
```js
    express --git app-3
```
- express app with sass support for styling.
```js
    express --css saas app-4
```
- ejs as template engine and sass for styling
```js
    express --view ejs --css sass app-5
```

- pug as template engine and gitignore together
```js
    express --view pug --git app-6
```