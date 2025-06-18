import { usePlayerStore } from "@/stores/usePlayer.Store";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);
  const isLoadingRef = useRef<boolean>(false);

  const { currentSong, isPlaying, nextSong } = usePlayerStore();
  
  // Функция для безопасного воспроизведения
  const safePlay = async () => {
    if (!audioRef.current || isLoadingRef.current) return;
    
    try {
      await audioRef.current.play();
    } catch (error : any) {
      if (error.name !== 'AbortError') {
        console.error('Ошибка воспроизведения:', error);
      }
    }
  };

  // Функция для безопасной паузы
  const safePause = () => {
    if (!audioRef.current) return;
    
    try {
      audioRef.current.pause();
    } catch (error) {
      console.error('Ошибка паузы:', error);
    }
  };

  // Обработка play/pause
  useEffect(() => {
    if (isPlaying) {
      safePlay();
    } else {
      safePause();
    }
  }, [isPlaying]);

  // Обработка окончания трека
  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      nextSong();
    };

    audio?.addEventListener('ended', handleEnded);

    return () => audio?.removeEventListener('ended', handleEnded);
  }, [nextSong]);

  // Обработка смены трека
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;
    const isSongChange = prevSongRef.current !== currentSong?.audioUrl;
    
    if (isSongChange) {
      isLoadingRef.current = true;
      
      // Останавливаем текущее воспроизведение
      safePause();
      
      // Устанавливаем новый источник
      audio.src = currentSong?.audioUrl;
      audio.currentTime = 0;
      
      prevSongRef.current = currentSong?.audioUrl;

      // Обработчики загрузки
      const handleCanPlay = () => {
        isLoadingRef.current = false;
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('error', handleError);
        
        if (isPlaying) {
          safePlay();
        }
      };

      const handleError = (error : any) => {
        isLoadingRef.current = false;
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('error', handleError);
        console.error('Ошибка загрузки аудио:', error);
      };

      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('error', handleError);
      
      // Загружаем аудио
      audio.load();
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} preload="metadata" />;
};

export default AudioPlayer;