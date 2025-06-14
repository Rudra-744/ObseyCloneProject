function locomotiveScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function loadingAnime() {
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
    onComplete: startCounter,
  });

  tl.from(".Now", {
    opacity: 0,
    ease: "power2.inOut",
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
    delay: 0,
  });

  tl.from(".page1", {
    y: 1600,
    delay: 0.3,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out",
    onComplete: function () {
      tl.to(".loader", {
        display: "none",
      });
    },
  });
  tl.from("nav, .first1 , .page2 ", {
    opacity: 0,
    duration: 0.7,
    ease: "power2.inOut",
  });

  tl.from("#hero1 h1, #hero2 h1, #hero3 h1, #hero4 h1", {
    y: 130,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "power3.out",
  });
  

}

function cursorAnime() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to(".cursor", {
      left: dets.x,
      top: dets.y,
      duration: 0.3,
    });
  });

  Shery.makeMagnet(".nav-part2 h4");
}

loadingAnime();
cursorAnime();
locomotiveScroll();
