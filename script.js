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
  duration: 0.5,
  onComplete: () => {
    // Delay counter slightly to ensure h5 is painted
    setTimeout(startCounter, 50);
  }
});


  tl.from(".Now", {
    opacity: 0,
    ease: "power2.inOut",
  });

  function startCounter() {
  const h5 = document.querySelector(".h5");
  let count = 0;

  const interval = setInterval(() => {
    // Format number as two digits using padStart
    h5.textContent = String(count).padStart(2, '0');

    if (count >= 100) {
      clearInterval(interval);
    }

    count++;
  }, 30);
}

  tl.to(".loader", {
    opacity: 0,
    duration: 0.3,
    delay: 2.9,
  });

  tl.from(".page1", {
    y: 1200,
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
  }, "-=0.5");


}

function cursorAnime() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to(".cursor", {
      left: dets.x,
      top: dets.y,
      duration: 0.3,
    });
  });

  Shery.makeMagnet(".nav-part2 h4,.menu");

  let videocon = document.querySelector('.video-con');
  let videocursor = document.querySelector('.video-cursor');
  let videoconimg = document.querySelector('.video-con img');
  // Hide default cursor inside video container
  videocon.addEventListener('mouseenter', function () {
    gsap.to('.cursor', {
      opacity: 0,
      ease: "power2.out",
      duration: 0.3
    });
  });

  // Restore default cursor
  videocon.addEventListener('mouseleave', function () {
    gsap.to('.cursor', {
      opacity: 1,
      ease: "power2.out",
      duration: 0.3
    });

    // Reset position
    gsap.to(videocursor, {
      left: "75%",
      top: "-15%",
      duration: 0.5,
      ease: "power2.out"
    });
  });

  // Mouse move listener (attach once only!)
  videocon.addEventListener('mousemove', function (e) {
    const bounds = videocon.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    // Move the custom video cursor to the center of mouse
    gsap.to(videocursor, {
      left: x - videocursor.offsetWidth / 2,
      top: y - videocursor.offsetHeight / 2,
      duration: 0.3,
      ease: "power3.out"
    });
  });

  videocon.addEventListener('click', function () {
    // Toggle the video play/pause state
    gsap.to(videoconimg, {
      // display: 'none', // Hide the image when video is clicked
      scale: 0,
      duration: 0.5,
    })
    const video = document.querySelector('.video-con video');
    if (video.paused) {
      video.play();
      videocursor.style.scale = '0.7';
      videocursor.innerHTML = '<svg class="w-[2vw] h-[2vw]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5H8V19H6V5ZM16 5H18V19H16V5Z"></path></svg>'; // Change SVG to pause icon
    } else {
      video.pause();
      gsap.to(videoconimg, {
        // display:'block',
        scale: 1,
        duration: 0.5,
      });
      videocursor.style.scale = '1';
      videocursor.innerHTML = '<svg class="w-[2vw] h-[2vw] " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"> <path d="M6 20.1957V3.80421C6 3.01878 6.86395 2.53993 7.53 2.95621L20.6432 11.152C21.2699 11.5436 21.2699 12.4563 20.6432 12.848L7.53 21.0437C6.86395 21.46 6 20.9812 6 20.1957Z"></path></svg>';
    }
  })



}

function sheryanimetion() {
  Shery.imageEffect('.imgdiv', {
    style: 5,
    config: { "a": { "value": 2.29, "range": [0, 30] }, "b": { "value": 0.94, "range": [-1, 1] }, "zindex": { "value": -9996999, "range": [-9999999, 9999999] }, "aspect": { "value": 0.7666557722625823 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": true }, "infiniteGooey": { "value": false }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1.5, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": true }, "maskVal": { "value": 1.4, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 0 }, "noise_speed": { "value": 0.38, "range": [0, 10] }, "metaball": { "value": 0.4, "range": [0, 2] }, "discard_threshold": { "value": 0.6, "range": [0, 1] }, "antialias_threshold": { "value": 0, "range": [0, 0.1] }, "noise_height": { "value": 0.56, "range": [0, 2] }, "noise_scale": { "value": 10.69, "range": [0, 100] } },
    gooey: true,
  })

}

function hoverAnime() {
  let page3circle = document.querySelectorAll('.page3circle');

  page3circle.forEach(function (circle) {

    circle.addEventListener('mouseenter', function () {
      let circletext = this.querySelector('.circletext');
      let p = this.querySelector('.circletext p');

      gsap.to([circletext, p], {
        scale: 1,
        duration: 0.5,
        ease: "power2.inOut"
      });
    });

    circle.addEventListener('mouseleave', function () {
      let circletext = this.querySelector('.circletext');
      let p = this.querySelector('.circletext p');

      gsap.to([circletext, p], {
        scale: 0,
        duration: 0.5,
        ease: "power2.inOut"
      });
    });
  });


  const texth1 = document.querySelector('.texth1');
  let split = new SplitType(texth1, { types: 'chars' });

  function animateIn() {
    texth1.style.fontFamily = 'SilkSerif';
    texth1.style.webkitTextStroke = '1px white';
    texth1.style.webkitTextFillColor = 'transparent';
    texth1.style.fontWeight = '500';

    gsap.fromTo(split.chars, {
      opacity: 0,
      x: -20,
    }, {
      opacity: 1,
      x: 0,
      duration: 0.5,
      stagger: 0.04,
      ease: 'power2.out'
    });
  }

  function animateOut() {
    gsap.to(split.chars, {
      opacity: 0,
      x: 20,
      duration: 0.4,
      stagger: 0.04,
      ease: 'power2.in',
      onComplete: () => {
        // Restore normal font
        texth1.style.fontFamily = 'PlainLight';
        texth1.style.webkitTextStroke = 'none';
        texth1.style.webkitTextFillColor = 'white';
        texth1.style.fontWeight = '800';

        // Revert and re-split
        split.revert();
        split = new SplitType(texth1, { types: 'chars' });

        // Animate back in with normal font
        gsap.fromTo(split.chars, {
          opacity: 0,
          x: -20
        }, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: 'power2.out'
        });
      }
    });
  }

  texth1.addEventListener('mouseenter', animateIn);
  texth1.addEventListener('mouseleave', animateOut);

  let orangecircle= document.querySelector(".orangecrc");
  orangecircle.addEventListener('mouseenter',function(){
    orangecircle.style.scale = '0.9';
  })
  orangecircle.addEventListener('mouseleave',function(){
    orangecircle.style.scale = '1';
  })
  
}

function flaganimation() {


  let hero3 = document.querySelector('#hero3');
  let flag = document.querySelector('.flag');
  hero3.addEventListener("mouseenter", function () {
    gsap.to(flag, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power2.inOut",
    })
  })
  hero3.addEventListener("mouseleave", function () {
    gsap.to(flag, {
      opacity: 0,
      scale: 0,
      duration: 0.5,
      ease: "power2.inOut",
    })
  })

  hero3.addEventListener("mousemove", function (dets) {
    gsap.to('.flag', {
      x: dets.x,
      y: dets.y,
      duration: 0.3,
    })
  })



}
document.addEventListener("DOMContentLoaded", function () {
  sheryanimetion();
  hoverAnime();
  loadingAnime();
  cursorAnime();
  locomotiveScroll();
  flaganimation();
});