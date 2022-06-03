import React, { useContext, useEffect, useState } from "react";

import PlayerContext from "./provider/context";

import Chart from "./chart";
import playerEvents from "./events";

const Graphic = () => {
	const { buffer } = useContext<any>(PlayerContext);
	const [drawer, setDrawer] = useState<Chart>();

	// const [cursor, setCursor] = useState<number>(audioContext.currentTime);

	useEffect(() => {
		if (!buffer) {
			return;
		}

		const init = async () => {
			const chartDrawer = new Chart(
				{
					buffer,
					container: document.getElementById("chart") as HTMLElement,
				},
				{
					margin: {
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
					},
				}
			);

			chartDrawer.drawGrid();

			chartDrawer.drawWaveform();
			chartDrawer.drawBands();
			chartDrawer.drawCursor();
			chartDrawer.showSVG();

			const moveCursor = (props = 0) => {
				chartDrawer.moveCursor(props);
			};

			playerEvents.on("cursorPosition", moveCursor);

			setDrawer(chartDrawer);
		};
		init();
	}, [buffer]);

	if (!buffer) {
		return null;
	}

	return <div id={"chart"} style={{ width: "100%", height: "50px" }} />;
};

export default Graphic;
