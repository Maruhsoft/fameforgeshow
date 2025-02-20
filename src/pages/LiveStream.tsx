import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Heart, Share2, Flag, ThumbsUp, MessageSquare, Eye } from 'lucide-react';
import { StreamData, YouTubeStats } from '../types';

interface LiveStreamProps {
  streamData: StreamData;
}

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: typeof YT;
  }
}

const LiveStream: React.FC<LiveStreamProps> = ({ streamData }) => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: '1',
      user: 'FameForgeHost',
      message: "Welcome to Fame Forge Live! Tonight's show starts in a few minutes.",
      timestamp: new Date()
    },
    {
      id: '2',
      user: 'TalentScout',
      message: "Can't wait to see the performances! 🎭",
      timestamp: new Date()
    },
    {
      id: '3',
      user: 'MusicLover',
      message: "The competition is heating up! Who's your favorite contestant? 🔥",
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = React.useState("");
  const chatRef = React.useRef<HTMLDivElement>(null);
  const [isLiked, setIsLiked] = React.useState(false);
  const [youtubeStats, setYoutubeStats] = React.useState<YouTubeStats>({
    viewCount: 0,
    likeCount: 0,
    commentCount: 0
  });
  const playerRef = React.useRef<YT.Player | null>(null);

  React.useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: streamData.videoId,
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          rel: 0
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      });
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [streamData.videoId]);

  const onPlayerReady = (event: YT.PlayerEvent) => {
    fetchVideoStats();
  };

  const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
    // Handle player state changes if needed
  };

  const fetchVideoStats = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${streamData.videoId}&key=YOUR_YOUTUBE_API_KEY`
      );
      const data = await response.json();
      
      if (data.items && data.items[0]) {
        const stats = data.items[0].statistics;
        setYoutubeStats({
          viewCount: parseInt(stats.viewCount),
          likeCount: parseInt(stats.likeCount),
          commentCount: parseInt(stats.commentCount)
        });
      }
    } catch (error) {
      console.error('Error fetching YouTube stats:', error);
    }
  };

  React.useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        user: 'Guest_' + Math.floor(Math.random() * 1000),
        message: newMessage,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMsg]);
      setNewMessage("");
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setYoutubeStats(prev => ({
      ...prev,
      likeCount: isLiked ? prev.likeCount - 1 : prev.likeCount + 1
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="aspect-video bg-gray-800 rounded-2xl overflow-hidden shadow-2xl"
          >
            {streamData.streamStatus ? (
              <div id="youtube-player" className="w-full h-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-900">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">Stream is Offline</h2>
                  <p className="text-gray-400">Check back later for more content!</p>
                </div>
              </div>
            )}
          </motion.div>

          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-purple-500" />
                  <span className="font-medium">{youtubeStats.viewCount.toLocaleString()} views</span>
                </span>
                {streamData.streamStatus && (
                  <span className="bg-red-500 px-3 py-1 rounded-full text-sm font-medium animate-pulse">LIVE</span>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleLike}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                  }`}
                >
                  <ThumbsUp className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{youtubeStats.likeCount.toLocaleString()}</span>
                </button>
                <span className="flex items-center space-x-2 text-gray-400">
                  <MessageSquare className="h-5 w-5" />
                  <span>{youtubeStats.commentCount.toLocaleString()}</span>
                </span>
                <button className="text-gray-400 hover:text-purple-500 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-purple-500 transition-colors">
                  <Flag className="h-5 w-5" />
                </button>
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">Fame Forge Live Show</h1>
            <p className="text-gray-400">Watch our talented contestants compete live on stage!</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-800 rounded-2xl p-6 h-[calc(100vh-2rem)] flex flex-col"
        >
          <div className="flex items-center space-x-2 mb-6">
            <MessageCircle className="h-6 w-6 text-purple-500" />
            <h2 className="text-xl font-bold">Live Chat</h2>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col">
            <div
              ref={chatRef}
              className="flex-1 overflow-y-auto space-y-4 mb-4 pr-4"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="bg-gray-700/50 rounded-xl p-4 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-purple-400">{message.user}</span>
                    <span className="text-xs text-gray-500">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-200">{message.message}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="mt-auto">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-700/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm"
                />
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl transition-colors font-medium"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LiveStream;