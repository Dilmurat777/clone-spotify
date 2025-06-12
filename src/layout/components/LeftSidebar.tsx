import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SignedIn } from '@clerk/clerk-react';
import { HomeIcon, Library, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import PLayListSkeleton from '@/components/skeletons/PLayListSkeleton';
import { useMusicStore } from '@/stores/useMusicStore';
import { useEffect } from 'react';

const LeftSidebar = () => {
  const { isLoading, albums, fetchAlbums } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

console.log('albums', albums);


  return (
    <div className="flex flex-col h-full gap-2">
      {/* Navigation menu */}
      <div className="rounded-lg bg-zinc-900 p-4">
        <div className="space-y-2">
          <Link
            to={'/'}
            className={cn(
              buttonVariants({
                variant: 'ghost',
                className: 'w-full justify-start text-white hover:bg-zinc-800',
              }),
            )}>
            <HomeIcon className="w-6 h-6 text-white mr-2" />
            <span className="hidden md:inline">Home</span>
          </Link>
          <SignedIn>
            <Link
              to={'/chat'}
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                  className: 'w-full justify-start text-white hover:bg-zinc-800',
                }),
              )}>
              <MessageCircle className="w-6 h-6 text-white mr-2" />
              <span className="hidden md:inline">Messages</span>
            </Link>
          </SignedIn>
        </div>
      </div>
      {/* library section*/}
      <div className="flex-1 rounded-lg bg-zinc-900 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white px-2">
            <Library className="size-5 mr-2" />
            <span className="hidden md:inline">PlayList</span>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {isLoading ? (
              <PLayListSkeleton />
            ) : albums.length > 0 ? (
              albums.map((album) => (
                <Link
                  key={album._id}
                  to={`/albums/${album._id}`}
                  className="block hover:bg-zinc-800 p-2 rounded-md flex items-center gap-3 cursor-pointer">
                  <img
                    src={album.imageUrl}
                    alt="Playlist img"
                    className="w-12 h-12 rounded-md flex-shrink-0 object-cover"
                  />
                  <div className="flex-1 min-w-0 hidden md:block">
                    <p className='font-medium truncate'> {album.title}</p>
                    <p className='text-sm text-zinc-400 truncate'>Album ~ {album.artist}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-white text-center">No albums found</div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;
