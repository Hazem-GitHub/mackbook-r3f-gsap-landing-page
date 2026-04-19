import { PresentationControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Macbook14Model } from "../models/Macbook-14";
import { useMacBookStore } from "../../store";
import { Macbook16Model } from "../models/Macbook-16";
import { useMediaQuery } from "react-responsive";
import { Group } from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ModelSwitcher = () => {
    const { color, size } = useMacBookStore();
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const largeMacbookRef = useRef<Group>(null);
    const smallMacbookRef = useRef<Group>(null);
    const showLargeMacbook = useMemo(() => size === "16", [size]);
    const controlsConfig = {
        global: true,
        speed: 1.5,
        snap: true,
        zoom: 0,
        polar: [-Math.PI, Math.PI] as [number, number],
        azimuth: [-Math.PI, Math.PI] as [number, number],
        config: {
            mass: 1,
            damping: 20,
            stiffness: 300,
            tension: 0,
            friction: 26,
            restLength: 0,
            restDelta: 0,
            restSpeed: 0,
            restTime: 0,
            restPosition: 0,
            restRotation: 0,
            restScale: 0,
        },
    };
    const ANIMATION_DURATION = 1;
    const OFFSET_DISTANCE = 5;

    const fadeMeshes = (group, opacity) => {
        if(!group) return;
        group.traverse((child) => {
            if (child.isMesh) {
                child.material.transparent = true;
                gsap.to(child.material, {
                    opacity: opacity,
                    duration: ANIMATION_DURATION,
                    ease: "power2.inOut",
                })
            }
         })
    }

    const moveGroup = (group, x) => {
        if(!group) return;
        gsap.to(group.position, {
            x: x,
            duration: ANIMATION_DURATION,
            ease: "power2.inOut",
        })
    }
    
    useGSAP(() => {
        if (showLargeMacbook) { 
            fadeMeshes(smallMacbookRef.current, 0);
            moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
            fadeMeshes(largeMacbookRef.current, 1);
            moveGroup(largeMacbookRef.current, 0);
        } else {
            fadeMeshes(largeMacbookRef.current, 0);
            moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);
            fadeMeshes(smallMacbookRef.current, 1);
            moveGroup(smallMacbookRef.current, 0);
        }
    }, [size])

    return (
        <>
            <PresentationControls {...controlsConfig}>
                <group ref={largeMacbookRef}>
                    <Macbook16Model scale={isMobile ? 0.055: 0.068} position={[0, 0.2, 0]} color={color} />
                </group>
            </PresentationControls>
            <PresentationControls {...controlsConfig}>
                <group ref={smallMacbookRef}>
                    <Macbook14Model scale={isMobile ? 0.05: 0.06} position={[0, 0.2, 0]} color={color} />
                </group>
            </PresentationControls>
        </>
    );
};

export default ModelSwitcher;
