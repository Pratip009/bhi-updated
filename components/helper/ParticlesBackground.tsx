"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

const ParticlesBackground = () => {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="tsparticles-hero"
            init={particlesInit}
            className="absolute inset-0 w-full h-full"
            options={{
                fullScreen: { enable: false },
                background: { color: "transparent" },
                fpsLimit: 120,
                particles: {
                    number: { value: 60, density: { enable: true, area: 800 } },
                    color: { value: "#FFFFFFFF" }, // soft purple to match indigo theme
                    shape: { type: "circle" },
                    opacity: { value: 0.5, random: true },
                    size: { value: { min: 1, max: 4 } },
                    links: {
                        enable: true,
                        distance: 140,
                        color: "#c4b5fd",
                        opacity: 0.3,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: "none",
                        random: false,
                        straight: false,
                        outModes: "bounce"
                    }
                },
                interactivity: {
                    events: {
                        onHover: { enable: true, mode: "grab" },
                        resize: true
                    },
                    modes: { repulse: { distance: 100, duration: 0.4 } }
                },
                detectRetina: true
            }}
        />
    );
};

export default ParticlesBackground;