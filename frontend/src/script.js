
window.addEventListener('DOMContentLoaded', () => {
  transition();
});


function transition(redirectUrl = null) {
  const tl = gsap.timeline({
    onComplete: () => {
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
      document.querySelector("main").style.display = "flex";
    }
  });

  tl.to('.overlay.top', {
    duration: 0.2,
    top: '0%',
    ease: "power2.out"
  }, 'close')
    .to('.overlay.bottom', {
      duration: 0.2,
      bottom: '0%',
      ease: "power2.out"
    }, 'close')
    .to('.loader', {
      duration: 0.2,
      opacity: 1
    })
    .to('.overlay.top', {
      duration: 0.2,
      top: '-50vh',
      ease: "power2.out"
    }, '+=1.5', 'open')
    .to('.overlay.bottom', {
      duration: 0.2,
      bottom: '-50vh',
      ease: "power2.out"
    }, '-=0.2', 'open')
    .to('.loader', {
      duration: 0.2,
      opacity: 0
    }, '-=0.2');
}

