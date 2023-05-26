import React from 'react';
import CurrentTrack from './CurrentTrack';
import PlayerControls from './PlayerControls';
import Volume from './Volume';
import { useStateProvider } from '../utils/StateProvider';

function Player(props) {
    const [{token}] = useStateProvider()
    return (
        <div>
            <CurrentTrack/>
            <PlayerControls />
            {/* <Volume/> */}
        </div>
    );
}

export default Player;