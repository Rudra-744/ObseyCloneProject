let tl = gsap.timeline();

tl.from(".line h1", {
    y: 100,
    stagger: 0.25,
    opacity: 0,
    duration: 0.8,
    delay: 0.5,
});

tl.from(".Now", {
  opacity: 0,
  ease: "power1.inOut"
});

 let h5 = document.querySelector(".number h5");
    let count = 0;
    setInterval(function () {
      if (count < 100) {
        h5.innerHTML = count++;
      } else {
        h5.innerHTML = count;
      }
    }, 35);

tl.to(".loader", {
  opacity: 0,
  duration: 0.5,
  delay: 2,
});

tl.from('.page1',{
    y:1600,
    delay:0.3,
    opacity:0,
    duration:1,
    ease: "expo.out"
})
tl.to('.loader',{
    display:"none"
})