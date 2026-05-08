## Learnt Concepts


### 🧩 DOM (Document Object Model)
Think of the DOM as the **live tree structure** of your webpage.  
- In JavaScript (browser), the DOM is like a giant object that represents every HTML element.  

Example:  
```html
<div id="counter">0</div>
<button id="increment">+</button>
```

JavaScript sees this as:
```javascript
document.getElementById("counter")  // → gives you the <div> element
```

So instead of printing to console, you **grab the element** and change its properties (`textContent`, `innerHTML`, `style`, etc.).

---

## ⚡ addEventListener
This is how you tell the browser:  
“Whenever this event happens on this element, run this function.”

Syntax:
```javascript
button.addEventListener("click", () => {
  console.log("Button clicked!");
});
```

Key points:
- `"click"` is the event type. Others: `"keydown"`, `"mouseover"`, `"submit"`.
- The second argument is a **callback function**.  
  - It doesn’t run immediately.  
  - It runs **only when the event happens**.  
- This is **event-driven architecture**: instead of controlling flow like in Python/Java, you wait for user actions.


