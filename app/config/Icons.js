import Svg, {Path} from "react-native-svg";
import React from "react";
import colors from "./colors";
import {COLORS} from "../constants/theme";
export function Icon1(props) {
    return (
        <Svg width={40} height={40} viewBox="0 0 24 24" fill="none" {...props}>
            <Path
                d="m24 8.48v11.52a1 1 0 0 1 -2 0v-8.248l-7.4 3.536a5 5 0 0 1 -2.577.694 5.272 5.272 0 0 1 -2.7-.739l-7.38-3.513a3.691 3.691 0 0 1 -.084-6.455c.027-.016.056-.031.084-.045l7.457-3.558a5.226 5.226 0 0 1 5.282.045l7.375 3.513a3.767 3.767 0 0 1 1.943 3.25zm-11.978 9.5a7.26 7.26 0 0 1 -3.645-.972l-4.377-2.089v2.7a5.007 5.007 0 0 0 3.519 4.778 15.557 15.557 0 0 0 4.481.603 15.557 15.557 0 0 0 4.481-.607 5.007 5.007 0 0 0 3.519-4.778v-2.691l-4.459 2.13a6.983 6.983 0 0 1 -3.519.928z"
                fill={props.color || COLORS.primary}
            />
        </Svg>
    );
}

export function Icon2(props) {
    return (
        <Svg width={40} height={40} viewBox="0 0 24 24" fill="none" {...props}>
            <Path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                fill={props.color || "#000"}
            />
        </Svg>
    );
}