import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMusicStore } from '@/stores/useMusicStore';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Button } from '@/components/ui/button';
import { Clock, Music, Pause, Play } from 'lucide-react';
import { usePlayerStore } from '@/stores/usePlayer.Store';

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  useEffect(() => {
    if (albumId) {
      fetchAlbumById(albumId);
    }
  }, [fetchAlbumById, albumId]);

  if (isLoading) {
    return null;
  }

  const handlePlayAlbum = () => {
    if (!currentAlbum) return;

    const isCurrentAlbumPlaying = currentAlbum?.songs.some((song) => song._id === currentSong?._id);
    if (isCurrentAlbumPlaying) togglePlay();
    else {
      // start playing the album from the beginning
      playAlbum(currentAlbum?.songs, 0);
    }
  };

  const handlePlaySong = (index: number) => {
    if (!currentAlbum) return;
    playAlbum(currentAlbum.songs, index);
  };

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = (duration % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="h-full">
      <ScrollArea className="h-full">
        {/* Main Content */}
        <div className="relative min-h-full">
          {/* bg gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900  rounded-md"
            aria-hidden="true">
            {/* content */}
            <div className="relative z-10">
              <div className="flex p-6 gap-6 pb-8">
                <img
                  className="w-[240px] h-[240px] shadow-xl rounded"
                  src={currentAlbum?.imageUrl}
                  alt={currentAlbum?.title}
                />
                <div className="flex flex-col justify-end">
                  <p className="text-sm font-medium">Album</p>
                  <h1 className="text-7xl font-bold my-4">{currentAlbum?.title}</h1>
                  <div className="flex items-center text-sm gap-2 text-zinc-100">
                    <span className="font-medium text-white">{currentAlbum?.artist}</span>
                    <span>• {currentAlbum?.songs.length} Song</span>
                    <span className="text-sm text-zinc-400">• {currentAlbum?.releaseYear}</span>
                  </div>
                </div>
              </div>
              {/* play button */}
              <div className="px-6 pb-6 flex items-center gap-6">
                <Button
                  onClick={handlePlayAlbum}
                  className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
                  size="icon">
                  {isPlaying && currentAlbum?.songs.some((song) => song._id === currentSong?._id) ? (
                    <Pause className="w-7 h-7 text-black" />
                  ) : (
                    <Play className="w-7 h-7 text-black" />
                  )}
                </Button>
              </div>
              {/* Table section */}
              <div className="bg-black/20 backdrop-blur-sm">
                {/* Table header */}
                <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                  <div>#</div>
                  <div>Title</div>
                  <div>Released Date</div>
                  <div>
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                {/* Table body */}
                <div className="px-6">
                  <div className="space-y-2 py-4">
                    {currentAlbum?.songs.map((song, index) => {
                      const isCurrentSongPlaying = currentSong?._id === song._id;
                      return (
                        <div
                          key={song._id}
                          onClick={() => handlePlaySong(index)}
                          className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 text-sm py-2 px-4 text-zinc-400 hover:bg-white/9 transition-colors rounded-md group cursor-pointer">
                          <div className="flex items-center justify-center">
                            {isCurrentSongPlaying && isPlaying ? (
                              <div className="w-3 h-3 text-green-500 rounded-full">
                                <Music className="w-3 h-3" />
                              </div>
                            ) : (
                              <span className="group-hover:hidden">{index + 1}</span>
                            )}
                            {!isCurrentSongPlaying && (
                              <Play className="w-4 h-4 hidden group-hover:block" />
                            )}
                          </div>

                          <div className="flex items-center gap-3">
                            <img
                              className="w-10 h-10 rounded"
                              src={song.imageUrl}
                              alt={song.title}
                            />
                            <div>
                              <div className="font-medium text-white">{song.title}</div>
                              <div>{song.artist}</div>
                            </div>
                          </div>

                          <div className="flex items-center">{song.createdAt.split('T')[0]}</div>

                          <div>{formatDuration(song.duration)}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;
