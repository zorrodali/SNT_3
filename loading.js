document.addEventListener("DOMContentLoaded", function() {
  let container = document.querySelector(".container");
  let progressBar = new Progress(15, 0, 100, {parent : ".progress"});
  progressBar.startTo(5, 500);
  setTimeout(() => {
    container.style.opacity = "0";
    container.style.pointerEvents = "none";
    container.style.transition = "opacity 500ms";
    setTimeout(() => {
      container.style.display = "none";
      let nav = document.querySelector(".nav");
      let p = document.querySelector("p");
      nav.style.opacity = "1";
      nav.style.transition = "opacity 500ms";
      setTimeout(() => {
        p.style.opacity = "1";
        p.style.transition = "opacity 500ms";
      }, 3000); // Ajoutez un délai de 3 secondes ici
    }, 1000);
  }, 9000); // Ajoutez un délai de 9 secondes ici  
});

class Progress {
  constructor(now, min, max, options) {
    this.dom = elt("div", {
      className: "progress-bar"
    });
    this.min = min;
    this.max = max;
    this.intervalCode = 0;
    this.now = now;
    this.syncState();
    if(options.parent){
      document.querySelector(options.parent).appendChild(this.dom);
    } 
    else {
      // Change the selector to #progress
      document.querySelector('#progress').appendChild(this.dom)
    }
  }
  
  syncState() {
    this.dom.style.width = this.now + "%";
  }

  startTo(stepLength, time) {
    const delta = (this.max - this.min) * stepLength / 100;
    this.intervalCode = setInterval(() => {
      this.now = Math.min(this.now + delta, this.max);
      this.syncState();
      if (this.now === this.max) {
        clearInterval(this.intervalCode);
      }
    }, time);
  }

  end() {
    clearInterval(this.intervalCode);
  }
}

//helper function-> return <DOMelement>
function elt(type, prop, ...childrens) {
  let elem = document.createElement(type);
  if (prop) Object.assign(elem, prop);
  for (let child of childrens) {
    if (typeof child == "string") elem.appendChild(document.createTextNode(child));
    else elem.appendChild(child);
  }
  return elem;
}