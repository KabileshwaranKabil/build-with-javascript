document.getElementById('increment').addEventListener('click',function(){
    let counter = document.getElementById('counter-display');
    let count = parseInt(counter.textContent);
    count++;
    counter.textContent = count;
});
document.getElementById('decrement').addEventListener('click',function(){
	let counter = document.getElementById('counter-display');
	let count = parseInt(counter.textContent);
	count --;
	counter.textContent=count;
});

document.getElementById('reset').addEventListener('click',function(){
	let counter = document.getElementById('counter-display')
	counter.textContent=0;
});