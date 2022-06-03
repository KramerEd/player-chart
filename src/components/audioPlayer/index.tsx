import React from "react";
import PlayerProvider from "./provider";
import FilePicker from "./filePicker";
import Player from "./player";
import Graphic from "./graphic";

const AudioPlayer = () => {
	return (
		<PlayerProvider>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-end",
					height: "100vh",
				}}
			>
				<FilePicker />
				<Player />
				<Graphic />
			</div>
		</PlayerProvider>
	);
};

export default AudioPlayer;
