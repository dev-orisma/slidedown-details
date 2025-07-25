# Slidedown

<p align="left">
     <a href="https://github.com/dev-orisma/slidedown-details//blob/main/LICENSE">
        <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-green.svg" />
    </a>
    <a href="https://github.com/dev-orisma/slidedown-details/blob/main/CHANGELOG.md">
        <img alt="version" src="https://img.shields.io/github/package-json/v/dev-orisma/slidedown-details" />
    </a>
</p>

## Introduction
Make slidedown with native HTML tag `<details>`

[Reference](https://css-tricks.com/how-to-animate-the-details-element/)

**pros**
- Native HTML
- No Javascript Requieded to toggle open/close event

<br>

**Cons**
- No fancy UI - Must custom UI

<br>

## Feature
- `<details>` can access offsetHeight, include tag `<summary>`.
- support [events](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#events) <code>toggle</code>
    ```javascript
    details.addEventListener("toggle", event => {
        if (details.open) {
            /* the element was toggled open */
        } else {
            /* the element was toggled closed */
        }
    });
    ```

<br>

## Browser Support
- [HTML `<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#browser_compatibility)
- [HTML `<summary>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary#browser_compatibility)
- [Javascript - requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame#browser_compatibility)

<br>

## Example
### HTML
This example shows a simple `<details>` element with a `<summary>`
```html
<details>
    <summary>Heading</summary>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
</details>
```
![Native HTML tag details!](/images/native.gif "San Juan Mountains")

<br>

---
## Use Library Javascript
Manual init
```javascript
var slidedowns = document.querySelectorAll('[slidedown-details]');
var options = {
    duration: 300,
    easing: 'ease'
}
slidedowns.forEach((el) => {
    new SlidedownDetails(el, options);
});
```

Auto init
```javascript
var options = {
    duration: 300,
}
new SlidedownDetails(options);
// or
new SlidedownDetails();
```

Auto init - Custom selector
```javascript
var slidedowns = document.querySelectorAll('[element-details]');
var options = {
    duration: 300,
}
new SlidedownDetails(slidedowns);
// or
new SlidedownDetails(slidedowns, options);
```
![Add Javascript with tag details!](/images/libs.gif "San Juan Mountains")
<br>

## Access Value
*`_slidedownArray`* - Array

Access with globla value: `_slidedownArray`.

<br>

## Methods
Available methods:
#### [`Open`](#open)

```javascript
_slidedownArray[0].open();
```
open slide



#### [`Close`](#close)

```javascript
_slidedownArray[0].close();
```
Close slide


#### [`Toggle`](#toggle)
```javascript
_slidedownArray[0].toggle();
```
Toggle open/close

