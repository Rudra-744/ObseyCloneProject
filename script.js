let tl = gsap.timeline();

tl.from(".line h1", {
    y: 100,
    stagger: 0.25,
    opacity: 0,
    duration: 0.5,
    delay: 0.5,
});

tl.from(".number", {
    opacity: 0,
    onComplete: startCounter 
});

tl.from(".Now", {
  opacity: 0,
  ease: "power2.inOut"
});

function startCounter() {
    let h5 = document.querySelector(".number h5");
    let count = 0;
    let interval = setInterval(function () {
      if (count < 100) {
        h5.textContent = count++;
      } else {
        h5.textContent = count;
        clearInterval(interval);
      }
    }, 33);
}

tl.to(".loader", {
  opacity: 0,
  duration: 0.3,
  delay: 3.5,
});

tl.from('.page1', {
    y: 1600,
    delay: 0.3,
    opacity: 0,
    duration: 2,
    ease: "power4.out",
    onComplete: function () {
      tl.to('.loader', {
          display: "none"
      });
    }
});

