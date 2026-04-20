import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/StudioLights";
import { features } from "../constants";
import clsx from "clsx";
import ModelScroll from "./ModelScroll";

const Features = () => {
    return (
        <section id="features">
            <h2>See it all in a new light.</h2>
            <div className="features-stage relative">
                <Canvas id="f-canvas" camera={{ position: [0, 1, 5], fov: 50, near: 0.1, far: 1000 }}>
                    <StudioLights />
                    <ambientLight intensity={1} />
                    <ModelScroll />
                </Canvas>

                <div className="absolute inset-0">
                    {features.map((feature, index) => (
                        <div key={feature.id} className={clsx('box', `box${index + 1}`, feature.styles)}>
                            <img src={feature.icon} alt={feature.highlight} />
                            <p>
                                <span className="text-white">{feature.highlight}</span>
                                {feature.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;