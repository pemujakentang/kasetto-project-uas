import { reducerCases } from "./Constants";

export const initialState = {
    token: null,
    playlists: [],
    userInfo: null,
    selectedPlaylistId: '37i9dQZEVXbObFQZ3JLcXt',
    selectedPlaylist: null,
    searchResults: null,
    currentlyPlaying: null,
    playerState: false,
    playerStatus: null,
    shuffleState: false,
    deviceId: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case reducerCases.SET_TOKEN: {
            return {
                ...state,
                token: action.token
            }
        }
        case reducerCases.SET_PLAYLISTS: {
            return {
                ...state,
                playlists: action.playlists
            }
        }
        case reducerCases.SET_USER: {
            return {
                ...state,
                userInfo: action.userInfo
            }
        }
        case reducerCases.SET_PLAYLIST: {
            return {
                ...state,
                selectedPlaylist: action.selectedPlaylist
            }
        }
        case reducerCases.SET_SEARCH_RESULTS: {
            return {
                ...state,
                searchResults: action.searchResults
            }
        }
        case reducerCases.SET_PLAYING: {
            return {
                ...state,
                currentlyPlaying: action.currentlyPlaying
            }
        }
        case reducerCases.SET_PLAYER_STATE: {
            return {
                ...state,
                playerState: action.playerState
            }
        }
        case reducerCases.SET_PLAYLIST_ID: {
            return {
                ...state,
                selectedPlaylistId: action.selectedPlaylistId
            }
        }
        case reducerCases.SET_PLAYER_STATUS: {
            return {
                ...state,
                playerStatus: action.playerStatus
            }
        }
        case reducerCases.SET_SHUFFLE_STATE: {
            return {
                ...state,
                shuffleState: action.shuffleState
            }
        }
        case reducerCases.SET_DEVICE_ID: {
            return{
                ...state,
                deviceId: action.deviceId
            }
        }
        default: return state;
    }
}

export default reducer;