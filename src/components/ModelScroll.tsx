import { useRef, useEffect, Suspense } from "react";
import { Group } from "three";
import { useMediaQuery } from "react-responsive";
import { useMacBookStore } from "../store";
import { featureSequence } from "../constants";
import { useGSAP } from "@gsap/react";
import { Html } from "@react-three/drei";
import { MacbookModel } from "./models/Macbook";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const ModelScroll = () => {
    const groupRef = useRef<Group>(null);
    const isMobile = useMediaQuery({ query: '(max-width: 1024px)'})
    const { setTexture } = useMacBookStore();

    // Pre-load all feature videos during component mount
    useEffect(() => {
        featureSequence.forEach((feature: { videoPath: string }) => {
            const v: HTMLVideoElement = document.createElement('video');

            Object.assign(v, {
                src: feature.videoPath,
                muted: true,
                playsInline: true,
                preload: 'auto',
                crossOrigin: 'anonymous',
            });

            v.load();
        })
    }, []);

    useGSAP(() => {
        // 3D MODEL ROTATION ANIMATION
        const modelTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#f-canvas',
                start: 'top top',
                end: 'bottom  top',
                scrub: 1,
                pin: true,
            }
        });

        // SYNC THE FEATURE CONTENT
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.features-stage',
                start: 'top center',
                end: 'bottom center',
                scrub: isMobile ? 5 : 1,
            }
        })

        // 3D SPIN
        if(groupRef.current) {
            modelTimeline.to(groupRef.current.rotation, { y: Math.PI / 8, ease: 'power1.inOut'})
            modelTimeline.to(groupRef.current.rotation, { y: -Math.PI / 8, ease: 'power1.inOut'})
        }

        // Content & Texture Sync
        timeline
            .call(() => setTexture('/videos/feature-1.mp4'))
            .to('.box1', { opacity: 1, y: 0 })
            .call(() => setTexture('/videos/feature-2.mp4'))
            .to('.box1', { opacity: isMobile ? 0 : 1 })
            .to('.box2', { opacity: 1, y: 0 })

            .call(() => setTexture('/videos/feature-3.mp4'))
            .to('.box2', { opacity: isMobile ? 0 : 1 })
            .to('.box3', { opacity: 1, y: 0 })

            .call(() => setTexture('/videos/feature-4.mp4'))
            .to('.box3', { opacity: isMobile ? 0 : 1 })
            .to('.box4', { opacity: 1, y: 0})

            .call(() => setTexture('/videos/feature-5.mp4'))
            .to('.box4', { opacity: isMobile ? 0 : 1 })
            .to('.box5', { opacity: 1, y: 0 })
            .to('.box5', { opacity: isMobile ? 0 : 1 })
        
    }, {dependencies: [isMobile], revertOnUpdate: true});

    return (
        <group ref={groupRef}>
            <Suspense fallback={<Html><h1 className="text-white text-3xl uppercase"><div className="w-5 h-5 border-2 border-r-transparent border-b-transparent border-l-transparent border-white rounded-full animate-spin" /></h1></Html>}>
                <MacbookModel scale={isMobile ? 0.04 : 0.08} position={[0, -1, 0]} />
            </Suspense>
        </group>
    )
}

export default ModelScroll;