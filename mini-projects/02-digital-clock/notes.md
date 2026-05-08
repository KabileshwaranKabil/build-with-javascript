### Asynchronous JS
Asynchronous programming is a technique that enables your program to start a potentially long-running task and still be able to be responsive to other events while that task runs, rather than having to wait until that task has finished. Once that task has finished, your program is presented with the result.

JavaScript program is single-threaded. A thread is a sequence of instructions that a program follows. Because the program consists of a single thread, it can only do one thing at a time: so if it is waiting for our long-running synchronous call to return, it can't do anything else.

What we need is a way for our program to:

1. Start a long-running operation by calling a function.
2. Have that function start the operation and return immediately, so that our program can still be responsive to other events.
3. Have the function execute the operation in a way that does not block the main thread, for example by starting a new thread.
4. Notify us with the result of the operation when it eventually completes.

That's precisely what asynchronous functions enable us to do.


### Callbacks
An event handler is a particular type of callback. A callback is just a function that's passed into another function, with the expectation that the callback will be called at the appropriate time. As we just saw, callbacks used to be the main way asynchronous functions were implemented in JavaScript.

However, callback-based code can get hard to understand when the callback itself has to call functions that accept a callback. This is a common situation if you need to perform some operation that breaks down into a series of asynchronous functions. For example, consider the following:

```js
function doStep1(init) {
  return init + 1;
}

function doStep2(init) {
  return init + 2;
}

function doStep3(init) {
  return init + 3;
}

function doOperation() {
  let result = 0;
  result = doStep1(result);
  result = doStep2(result);
  result = doStep3(result);
  console.log(`result: ${result}`);
}

doOperation();
```
Here we have a single operation that's split into three steps, where each step depends on the last step. In our example, the first step adds 1 to the input, the second adds 2, and the third adds 3. Starting with an input of 0, the end result is 6 (0 + 1 + 2 + 3). As a synchronous program, this is very straightforward. But what if we implemented the steps using callbacks?

```js
function doStep1(init, callback) {
  const result = init + 1;
  callback(result);
}

function doStep2(init, callback) {
  const result = init + 2;
  callback(result);
}

function doStep3(init, callback) {
  const result = init + 3;
  callback(result);
}

function doOperation() {
  doStep1(0, (result1) => {
    doStep2(result1, (result2) => {
      doStep3(result2, (result3) => {
        console.log(`result: ${result3}`);
      });
    });
  });
}

doOperation();
```
Because we have to call callbacks inside callbacks, we get a deeply nested doOperation() function, which is much harder to read and debug. This is sometimes called "callback hell" or the "pyramid of doom" (because the indentation looks like a pyramid on its side).

When we nest callbacks like this, it can also get very hard to handle errors: often you have to handle errors at each level of the "pyramid", instead of having error handling only once at the top level.

For these reasons, most modern asynchronous APIs don't use callbacks. Instead, the foundation of asynchronous programming in JavaScript is the Promise


Perfect — let’s capture detailed notes from your **Digital Clock project** so you can commit them into your GitHub learning journey.  

---

### DOM Manipulation
- The **DOM** is the browser’s live representation of your HTML page.  
- You can grab elements with:
  ```javascript
  const clockElement = document.getElementById("clock");
  ```
- Updating the DOM is done by changing properties like `.textContent` or `.innerHTML`.

---

### `Date` Object
- JavaScript has a built‑in `Date` object for working with time.  
- Common methods:
  ```javascript
  const now = new Date();
  now.getHours();    // 0–23
  now.getMinutes();  // 0–59
  now.getSeconds();  // 0–59
  now.toLocaleTimeString(); // formatted string
  ```

---

###  `setInterval`
- **Definition:** Runs a function repeatedly at a fixed time interval (non‑blocking).  
- Syntax:
  ```javascript
  setInterval(callback, delayInMilliseconds);
  ```
- Example:
  ```javascript
  setInterval(() => {
    console.log("tick");
  }, 1000); // runs every 1 second
  ```
- Difference vs Python/Java:
  - Python: `while True: time.sleep(1)` → blocks execution.
  - Java: `Timer.schedule()` → runs tasks in background.
  - JavaScript: `setInterval` schedules callbacks asynchronously, so the page stays interactive.

---

### Callback Functions
- `setInterval` expects a **function reference**.  
- You can pass:
  ```javascript
  setInterval(timer, 1000); // named function
  ```
  or
  ```javascript
  setInterval(() => {
    // inline anonymous function
  }, 1000);
  ```

---

### Formatting Time
- Raw values give `19:5:7`.  
- To make it user‑friendly, add **leading zeros**:
  ```javascript
  function pad(num) {
    return num.toString().padStart(2, "0");
  }
```