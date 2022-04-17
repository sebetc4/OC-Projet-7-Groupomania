import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import Model from "./components/Model";
import Texture from "./components/Texture";

export default function Logo(props) {


    let cursorPos = {
        axeX: 0,
        axeY: 0,
    };

    const myMesh = useRef();
    useFrame((state) => {
        cursorPos.axeX = (props.mousePos.x - window.innerWidth / 2) / (window.innerWidth / 2);
        cursorPos.axeY = (props.mousePos.y - window.innerHeight / 2) / (window.innerHeight / 2);
        const t = state.clock.getElapsedTime();

        myMesh.current.rotation.y = cursorPos.axeX / 1.5 + Math.sin(t / 4) / 8;
        myMesh.current.rotation.x = 90 + cursorPos.axeY / 1.5 - Math.PI / 1.75 + Math.cos(t / 4) / 8;
        myMesh.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20;
        myMesh.current.position.y = 0.5 + (1 + Math.sin(t / 1.5)) / 10;
    });

    return (
        <group>
            <mesh ref={myMesh}>
                <Texture attach="material" mouseOnButton={props.mouseOnButton} />
                <Model />
            </mesh>
        </group>
    );
}