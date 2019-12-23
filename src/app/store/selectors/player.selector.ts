import { PlayState } from "../reducers/play.reducer";
import { createSelector } from '@ngrx/store';

const selectPlayStates = (state: PlayState) => state;

export const getPlaying = createSelector(selectPlayStates, (state: PlayState) => state.playing);
export const getPlayList = createSelector(selectPlayStates, (state: PlayState) => state.playList);
export const getSongList = createSelector(selectPlayStates, (state: PlayState) => state.songList);
export const getPlayMode = createSelector(selectPlayStates, (state: PlayState) => state.playMode);
export const getCurrentIndex = createSelector(selectPlayStates, (state: PlayState) => state.cunrentIndex);
export const getCurrentSong = createSelector(selectPlayStates, ({playList, cunrentIndex}: PlayState) => playList[cunrentIndex]);
