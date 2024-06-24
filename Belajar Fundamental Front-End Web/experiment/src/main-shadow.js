// // Membuat shadow Host dengan <div>
// const divElement = document.createElement('div');
 
// // Membuat elemen untuk dimasukkan dalam shadow tree
// const headingElement = document.createElement('h1');
// headingElement.innerText = 'Ini adalah konten <h1> dalam shadow DOM';
 
// // Membuat/melampirkan shadow root pada shadow host
// // Caranya: mengatur mode shadow dengan `open`
// const divElementShadowRoot = divElement.attachShadow({ mode: 'open' });
 
// // Memasukkan element ke dalam shadow tree
// // Menjadi child element dari shadow root. Shadow root seperti <html>
// divElementShadowRoot.appendChild(headingElement);
 
// // Memasukkan shadow host (elemen) ke regular DOM (DOM utama)
// document.body.appendChild(divElement);
 
// // Tampilkan object shadow root
// console.log(divElement);
// console.log(headingElement);
// console.log(divElementShadowRoot);



// /* OPEN MODE */
// const openedDivElement = document.createElement('div');
// const openedDivElementShadowRoot = openedDivElement.attachShadow({ mode: 'open' });
// openedDivElementShadowRoot.innerHTML = '<p>I have an open shadow root</p>';
// document.body.appendChild(openedDivElement);
 
// /* CLOSED MODE */
// const closedDivElement = document.createElement('div');
// const closedDivElementShadowRoot = closedDivElement.attachShadow({ mode: 'closed' });
// closedDivElementShadowRoot.innerHTML = '<p>I have a closed shadow root</p>';
// document.body.appendChild(closedDivElement);
 
// window.addEventListener('click', (event) => {
//   console.log(event.target.shadowRoot);
//   console.log(event.composedPath());
// });



// const divElement = document.createElement('div');
 
// const headingElement = document.createElement('h1');
// headingElement.innerText = 'Ini adalah konten <h1> dalam shadow DOM';
 
// const divElementShadowRoot = divElement.attachShadow({ mode: 'open' });
// divElementShadowRoot.appendChild(headingElement);
 
// document.body.appendChild(divElement);

// Membuat shadow Host dengan <div>
const divElement = document.createElement('div');

// Membuat element untuk dimasukkan dalam shadow tree
const headingElement = document.createElement('h1');
headingElement.textContent = 'Ini adalah konten <h1> dalam shadow DOM';

// Membuat/melampirkan shadow root pada shadow host
// Caranya: mengatur mode shadow dengan `open`
const divElementShadowRoot = divElement.attachShadow({ mode: 'open' });

// Membuat element <style> untuk styling elemen dari dalam shadow tree
const styleElement = document.createElement('style');
styleElement.textContent = 'h1 { color: green; }';

// Memasukkan element ke dalam shadow tree
// Menjadi child element dari shadow root. Shadow root seperti <html>
divElementShadowRoot.append(styleElement, headingElement);

// Memasukkan shadow host (elemen) ke regular DOM (DOM utama)
document.body.appendChild(divElement);

// Tampilkan object shadow root
console.log(divElement);
console.log(headingElement);
console.log(styleElement);
console.log(divElementShadowRoot);
