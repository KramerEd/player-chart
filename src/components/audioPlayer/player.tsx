import React, {
	ChangeEvent,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import PlayerContext from "./provider/context";
import AudioDriver from "./driver";
import playerEvents from "./events";
import Chart from "./chart";

const Player = () => {
	const { buffer, audioContext } = useContext<any>(PlayerContext);
	const [driver, setDriver] = useState<AudioDriver>();
	const [isMoving, setIsMoving] = useState(false);

	useEffect(() => {
		const onDrag = (props?: any) => {
			driver?.drag(props);
		};

		playerEvents.on("dragCursor", onDrag);
		return () => {
			playerEvents.off("dragCursor", onDrag);
		};
	});

	useEffect(() => {
		if (!buffer) {
			return;
		}

		const init = async () => {
			const audioDriver = new AudioDriver(buffer, audioContext);
			setDriver(audioDriver);
		};

		init();
	}, [buffer, audioContext]);

	const play = useCallback(() => {
		setIsMoving(true);

		driver?.play();
	}, [driver]);

	const pause = useCallback(() => {
		driver?.pause();
	}, [driver]);

	const stop = useCallback(() => {
		driver?.pause(true);
	}, [driver]);

	const onVolumeChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			driver?.changeVolume(Number(event.target.value));
		},
		[driver]
	);

	if (!buffer) {
		return null;
	}

	if (!driver) {
		return <div>Loading</div>;
	}

	return (
		<div className={"player"}>
			<button onClick={play}>Play</button>

			<button onClick={pause}>Pause</button>

			<button onClick={stop}>Stop</button>

			<input
				type="range"
				onChange={onVolumeChange}
				defaultValue={1}
				min={-1}
				max={1}
				step={0.01}
			/>
		</div>
	);
};

export default Player;
