import { useMacBookStore } from "../store";
import clsx from "clsx";
import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/StudioLights";
import ModelSwitcher from "./three/ModelSwitcher";


const ProductViewer = () => {
    const { color, size, setColor, setSize } = useMacBookStore();

    const handleColorClick = (color: string) => {
        setColor(color);
    }

    const handleSizeClick = (size: string) => {
        setSize(size);
    }

  return (
    <section id="product-viewer">
        <h2 className="text-center">Take a closer look</h2>
        <div className="controls">
            <div className="info">
                {
                  size === "14" ? (
                      <div className="flex-center flex-wrap gap-2">
                            <p>14-inch Liquid Retina XDR display</p>
                      </div>
                  ) : (
                      <div className="flex-center flex-wrap gap-2">
                            <p>16-inch OLED display</p>
                      </div>
                  )
              }
            </div>
            <div className="flex-center gap-5 mt-5">
                <div className="color-control">
                    <div
                        onClick={() => handleColorClick("#adb5bd")}
                        onKeyDown={(e) => e.key === "Enter" && handleColorClick("#adb5bd")}
                        className={clsx("bg-neutral-300", color === "#adb5bd" && "active")}
                        aria-label="Select silver color"
                    />
                    <div
                        onClick={() => handleColorClick("#2e2c2e")}
                        onKeyDown={(e) => e.key === "Enter" && handleColorClick("#2e2c2e")}
                        className={clsx("bg-neutral-900", color === "#2e2c2e" && "active")}
                        aria-label="Select black color"
                    />
                </div>
                <div className="size-control">
                    <div
                        onClick={() => handleSizeClick("14")}
                        onKeyDown={(e) => e.key === "Enter" && handleSizeClick("14")}
                        className={clsx(size === "14" ? "bg-white text-black" : "bg-transparent text-white")}
                        aria-label="Select 14-inch size"
                    >
                        <p>14"</p>
                    </div>
                    <div
                        onClick={() => handleSizeClick("16")}
                        onKeyDown={(e) => e.key === "Enter" && handleSizeClick("16")} 
                        className={clsx(size === "16" ? "bg-white text-black" : "bg-transparent text-white")}
                        aria-label="Select 16-inch size"
                    >
                        <p>16"</p>
                    </div>
                </div>
            </div>
        </div>

          <Canvas id="canvas" camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 1000 }}>
              <StudioLights />
              <ModelSwitcher />
        </Canvas>
    </section>
  )
}

export default ProductViewer