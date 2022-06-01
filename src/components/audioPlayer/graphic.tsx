import React, { useContext, useEffect, useState } from "react";

import PlayerContext from "./provider/context";

import Chart from "./chart";

const Graphic = () => {
	const { buffer, audioContext } = useContext<any>(PlayerContext);
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

			// setTimeout(() => {
			//   chartDrawer.moveCursor(30);
			//
			//   setTimeout(() => {
			//     chartDrawer.moveCursor(20);
			//   }, 1500);
			// }, 2000);

			// setInterval(() => {
			// 	if (buffer.duration === audioContext.currentTime)
			// 		clearInterval();

			// 	chartDrawer.moveCursor(
			// 		(audioContext.currentTime * 100) / buffer.duration
			// 	);
			// }, buffer.duration / 10);
			setDrawer(chartDrawer);
		};
		init();
	}, [buffer]);

	if (!buffer) {
		return null;
	}

	return <div id={"chart"} style={{ width: "100%", height: 400 }} />;
};

export default Graphic;
