import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export const CougarAudioPlayer = () => (
    <AudioPlayer
        autoPlay
        layout='horizontal'
        onPlay={e => console.log("onPlay")}
    // other props here
    />
);