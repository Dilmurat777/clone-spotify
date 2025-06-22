import { useMusicStore } from '@/stores/useMusicStore';
import { Library, ListMusic, Users2, PlayCircle } from 'lucide-react';
import StatsCard from './StatsCard';
import { useEffect } from 'react';

const DashBoardStats = () => {
   const { stats, fetchStats, isLoading } = useMusicStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);


    const statsData = [
    {
      icon: ListMusic,
      label: 'Total Songs',
      value: (stats?.totalSongs || 0).toString(),
      bgColor: 'bg-emerald-500/10',
      iconColor: 'text-emerald-500',
    },
    {
      icon: Library,
      label: 'Total Albums',
      value: (stats?.totalAlbums || 0).toString(),
      bgColor: 'bg-violet-500/10',
      iconColor: 'text-violet-500',
    },
    {
      icon: Users2,
      label: 'Total Artists',
      value: (stats?.totalArtists || 0).toString(),
      bgColor: 'bg-orange-500/10',
      iconColor: 'text-orange-500',
    },
    {
      icon: PlayCircle,
      label: 'Total Users',
      value: (stats?.totalUsers || 0).toLocaleString(),
      bgColor: 'bg-sky-500/10',
      iconColor: 'text-sky-500',
    },
  ];

   if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-6 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-700 rounded-lg"></div>
              <div>
                <div className="w-20 h-4 bg-zinc-700 rounded mb-2"></div>
                <div className="w-16 h-6 bg-zinc-700 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statsData.map((stat) => (
        <StatsCard
          key={stat.label}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          bgColor={stat.bgColor}
          iconColor={stat.iconColor}
        />
      ))}
    </div>
  );
};

export default DashBoardStats;
