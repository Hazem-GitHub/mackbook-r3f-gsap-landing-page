import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    useGSAP(() => {
        ScrollTrigger.create({
            trigger: videoRef.current,
            start: "top center",
            end: "bottom top",
            scrub: true,
            onEnter: () => {
                videoRef.current?.play();
            },
            onLeaveBack: () => {
                videoRef.current?.pause();
            },
            onEnterBack: () => {
                videoRef.current?.play();
            },
            onLeave: () => {
                videoRef.current?.pause();
            },
        });
    });

    useEffect(() => {
        if (videoRef.current)  videoRef.current.playbackRate = 2;
     }, [])
    return (
        <section id="hero">
            <div>
                <h1>MacBook Pro</h1>
                <img src="/title.png" alt="MacBook Pro Title" />
            </div>
            <video ref={videoRef} src="/videos/hero.mp4" muted playsInline autoPlay />
            <button>Buy</button>
            <p>From $1999 or $166.58/mo. for 12 mo.</p>
            <p>AppleCare+ for $99 or $8.25/mo. for 12 mo.</p>
            <p>Apple Card Monthly Installments</p>
        </section>
    );
};

export default Hero;
