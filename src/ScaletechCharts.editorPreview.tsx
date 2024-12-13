import { ReactElement, createElement } from "react";
import DynamicChart from "./components/DynamicChart";

export function preview(): ReactElement {
    return <DynamicChart />;
}

export function getPreviewCss(): string {
    return require("./ui/ScaletechCharts.css");
}
