// 轮播
export interface Banner {
    targetId: number;
    url: string;
    imageUrl: string;
}

// 热门标签
export interface HotTag {
    id: number;
    name: string;
    position: number;
}

// 歌单
export interface SongSheet {
    id: number;
    name: string;
    picUrl: string;
    playCount: number;
}

export interface Singer {
    id: number;
    name: string;
    picUrl: string;
    albumSize: number;
}
