function locomotiveanimation(){

gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
locomotiveanimation();

function videocaonanimation(){
    let video=document.querySelector(".video-container");
let playbtn=document.querySelector(".play-btn");


video.addEventListener("mouseenter",function(){
    // playbtn.style.opacity=1,
    // playbtn.style.scale=1

    gsap.to(playbtn,{
        opacity:1,
        scale:1
    })
});

video.addEventListener("mouseleave",function(){
    gsap.to(playbtn,{
        opacity:0,
        scale:0
    })
});

video.addEventListener("mousemove",function(dets){
    gsap.to(playbtn,{
        left:dets.x-80,
        top:dets.y-80
    })
});
}
videocaonanimation();

function navbar(){
gsap.to(".nav-part-1 img",{
    transform:"translateY(-100%)",
    scrollTrigger:{
        trigger:".page-1",
        scroller:".main",
        start:"top 0",
        end:"top -5%",
        marker:true,
        scrub:true
    }

})
gsap.to(".nav-part-2 .links",{
    transform:"translateY(-100%)",
    delay:1,
    opacity:0,
    scrollTrigger:{
        trigger:".page-1",
        scroller:".main",
        start:"top 0",
        end:"top -5%",
        scrub:true
    }
});
}
navbar();

function loadinganimation(){

    gsap.from(".page-1 h1",{
        opacity:0,
        y:100,
        delay:0.2,
        duration:0.5,
        stagger:0.4
    })
    gsap.from(".page-1 .video-container",{
        opacity:0,
        scale:0.8,
        delay:1,
        duration:0.2
    })
}
loadinganimation();


function cursor(){
document.addEventListener("mousemove",function(dets){
    gsap.to(".cursor",{
        left:dets.x,
        top:dets.y
    })
})

document.querySelectorAll(".child").forEach(function(elem){
    elem.addEventListener("mouseover",function(){
            gsap.to(".cursor",{
        transform:'translate(-50%,-50%) scale(1)',
        color:"blue"
    })
    })
    elem.addEventListener("mouseleave",function(){
            gsap.to(".cursor",{
        transform:'translate(-50%,-50%) scale(0)',
    })
    })
})
};
cursor();

function changeingcolor(){
const randomcolor=function(){
    const hex="0123456789ABCDEF"
    let color="#";
    for(let i=0;i<6;i++){
        color+=hex[Math.floor(Math.random()*16)];
    }
    return color;
}

const links=document.querySelector("#links");
const body=document.querySelector("body");
const btn=document.querySelector("#btn").addEventListener('click',(btn)=>{
        body.style.backgroundColor=randomcolor();
        if(randomcolor()==='#0000'){
            links.style.color="white";
        }
});
}
changeingcolor();
