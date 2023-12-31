export interface IMovie {
    id: number;
    url: string;
    title: string;
    title_english: string;
    title_long: string;
    year: number;
    rating: number;
    runtime: number;
    genres: string[];
    summary: string;
    description_full: string;
    language: string;
    background_image: string;
    background_image_original: string;
    small_cover_image: string;
    medium_cover_image: string;
    large_cover_image: string;
    download_count: number;
    like_count: number;
    torrents: {
      url: string;
      quality: string;
      type: string;
      is_repack: string;
      video_codec: string;
      bit_depth: string;
      audio_channels: string;
      size: string;
      size_bytes: number;
      date_uploaded: string;
    }[];
  };