import { createAction, props } from '@ngrx/store';
import { Song } from 'src/app/services/data-types/common.types';
import { PlayMode } from 'src/app/shares/wy-ui/wy-player/player-model';

export const SetPlaying = createAction('[player] Set playing', props<{playing: boolean}>());
export const SetPlayList = createAction('[player] Set playList', props<{playList: Array<Song>}>());
export const SetSongList = createAction('[player] Set songList', props<{songList: Array<Song>}>());
export const SetPlayMode = createAction('[player] Set playMode', props<{playMode: PlayMode}>());
export const SetCurrentIndex = createAction('[player] Set currentIndex', props<{currentIndex: number}>());