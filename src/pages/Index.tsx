import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  isRead: boolean;
  isFreezing: boolean;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  avatar: string;
  status: 'online' | 'offline' | 'frozen';
}

const Index = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! Как дела в тайге?',
      sender: 'Михаил',
      timestamp: new Date(Date.now() - 300000), // 5 минут назад
      isRead: true,
      isFreezing: false
    },
    {
      id: '2', 
      text: 'Ничётак, на рыбалку собираемся. Ты как?',
      sender: 'me',
      timestamp: new Date(Date.now() - 180000), // 3 минуты назад
      isRead: true,
      isFreezing: false
    },
    {
      id: '3',
      text: 'Зябко сегодня, медведи где-то рядом...',
      sender: 'Михаил', 
      timestamp: new Date(Date.now() - 120000), // 2 минуты назад
      isRead: false,
      isFreezing: true
    }
  ]);

  const [chats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Михаил Сибиряк',
      lastMessage: 'Зябко сегодня, медведи где-то рядом...',
      timestamp: '2 мин',
      unreadCount: 1,
      avatar: 'МС',
      status: 'online'
    },
    {
      id: '2', 
      name: 'Анна Таёжная',
      lastMessage: 'Шаман сказал - будет снег',
      timestamp: '15 мин',
      unreadCount: 0,
      avatar: 'АТ',
      status: 'frozen'
    },
    {
      id: '3',
      name: 'Группа: Байкальские рыбаки',
      lastMessage: 'Кто на лёд завтра?',
      timestamp: '1 ч',
      unreadCount: 3,
      avatar: 'БР',
      status: 'online'
    }
  ]);

  const menuItems = [
    { icon: 'MessageCircle', label: 'Чаты', active: true },
    { icon: 'User', label: 'Избушка' },
    { icon: 'Trees', label: 'Тайга' },
    { icon: 'Calendar', label: 'События' },
    { icon: 'MapPin', label: 'Медведи' },
    { icon: 'Archive', label: 'Ледяной ящик' },
    { icon: 'Book', label: 'Словарь' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages(prev => prev.map(msg => {
        if (!msg.isRead && Date.now() - msg.timestamp.getTime() > 60000) {
          return { ...msg, isFreezing: true };
        }
        return msg;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'me',
      timestamp: new Date(),
      isRead: true,
      isFreezing: false
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-siberian-frost to-white">
      {/* Заголовок */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-siberian-blue/20 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-siberian-green to-siberian-teal rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <h1 className="text-2xl font-bold text-siberian-black" style={{ fontFamily: 'Montserrat' }}>
            SibCHAT
          </h1>
          <Badge variant="secondary" className="bg-siberian-green/10 text-siberian-green border-siberian-green/20">
            ❄️ Морозостойкий мессенджер
          </Badge>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Боковое меню */}
        <div className="w-64 bg-white/60 backdrop-blur-sm border-r border-siberian-blue/20 p-4">
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant={item.active ? "default" : "ghost"}
                className={`w-full justify-start gap-3 ${
                  item.active 
                    ? 'bg-gradient-to-r from-siberian-green to-siberian-teal text-white' 
                    : 'hover:bg-siberian-blue/10'
                }`}
              >
                <Icon name={item.icon as any} size={18} />
                {item.label}
              </Button>
            ))}
          </div>

          {/* Статистика */}
          <Card className="mt-6 p-4 bg-gradient-to-br from-siberian-purple/10 to-siberian-blue/10 border-siberian-purple/20">
            <h3 className="font-semibold text-siberian-black mb-2" style={{ fontFamily: 'Montserrat' }}>
              🌨️ Морозная статистика
            </h3>
            <div className="space-y-1 text-sm text-siberian-black/70">
              <div>• Замороженных: 12</div>
              <div>• В тайге: 5 друзей</div>
              <div>• Температура: -25°C</div>
            </div>
          </Card>
        </div>

        {/* Список чатов */}
        <div className="w-80 bg-white/40 backdrop-blur-sm border-r border-siberian-blue/20">
          <div className="p-4 border-b border-siberian-blue/20">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-siberian-black/50" size={16} />
              <Input 
                placeholder="Поиск в избушках..." 
                className="pl-10 bg-white/80 border-siberian-blue/30 focus:border-siberian-green"
              />
            </div>
          </div>
          
          <div className="overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-4 border-b border-siberian-blue/10 cursor-pointer hover:bg-siberian-green/5 transition-colors ${
                  selectedChat === chat.id ? 'bg-siberian-green/10' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-r from-siberian-yellow to-siberian-green text-white font-semibold">
                        {chat.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                      chat.status === 'online' ? 'bg-siberian-green' :
                      chat.status === 'frozen' ? 'bg-siberian-blue' : 'bg-gray-400'
                    }`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-siberian-black truncate">{chat.name}</h3>
                      <span className="text-xs text-siberian-black/60">{chat.timestamp}</span>
                    </div>
                    <p className="text-sm text-siberian-black/70 truncate">{chat.lastMessage}</p>
                  </div>
                  
                  {chat.unreadCount > 0 && (
                    <Badge className="bg-siberian-red text-white text-xs">
                      {chat.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Область чата */}
        <div className="flex-1 flex flex-col bg-white/30 backdrop-blur-sm">
          {selectedChat ? (
            <>
              {/* Заголовок чата */}
              <div className="p-4 border-b border-siberian-blue/20 bg-white/60">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-r from-siberian-purple to-siberian-blue text-white">
                      МС
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold text-siberian-black">Михаил Сибиряк</h2>
                    <p className="text-sm text-siberian-green">🟢 В сети • Где медведи: Тайга</p>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Icon name="Phone" size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Video" size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="MoreVertical" size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Сообщения */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl transition-all duration-300 ${
                        message.sender === 'me'
                          ? 'bg-gradient-to-r from-siberian-green to-siberian-teal text-white'
                          : message.isFreezing
                          ? 'bg-siberian-frost border border-siberian-blue animate-freeze opacity-60 blur-[1px]'
                          : 'bg-white border border-siberian-blue/20 text-siberian-black'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {message.sender === 'me' && (
                          <Icon 
                            name={message.isRead ? "CheckCheck" : "Check"} 
                            size={12} 
                            className={message.isRead ? "text-siberian-cyan" : "opacity-50"}
                          />
                        )}
                        {message.isFreezing && (
                          <span className="text-xs opacity-50 ml-1">❄️</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Поле ввода */}
              <div className="p-4 border-t border-siberian-blue/20 bg-white/60">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm">
                    <Icon name="Paperclip" size={16} />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Написать сообщение..."
                      className="bg-white border-siberian-blue/30 focus:border-siberian-green pr-12"
                    />
                    <Button 
                      onClick={sendMessage}
                      size="sm" 
                      className="absolute right-1 top-1/2 -translate-y-1/2 bg-gradient-to-r from-siberian-green to-siberian-teal hover:from-siberian-teal hover:to-siberian-green"
                    >
                      <Icon name="Send" size={14} />
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Icon name="Mic" size={16} />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-siberian-black/60">
                <Icon name="MessageCircle" size={64} className="mx-auto mb-4 text-siberian-blue/30" />
                <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Montserrat' }}>
                  Выберите чат
                </h2>
                <p>Начните общение в сибирском стиле</p>
                <Badge className="mt-4 bg-siberian-yellow/20 text-siberian-black border-siberian-yellow/30">
                  🌨️ Морозостойкие чаты ждут вас
                </Badge>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;