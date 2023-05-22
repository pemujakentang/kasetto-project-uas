import React from 'react';
import CurrentTrack from './CurrentTrack';
import PlayerControls from './PlayerControls';
import Volume from './Volume';

function Player(props) {
    return (
        <div>
            <CurrentTrack/>
            <PlayerControls />
            <Volume/>
        </div>
    );
}

export default Player;