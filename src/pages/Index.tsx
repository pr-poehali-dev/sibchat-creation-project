import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  isRead: boolean;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  type: 'chat' | 'group';
}

const Index = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'chats' | 'groups'>('chats');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! Как дела в тайге?',
      sender: 'Михаил',
      timestamp: new Date(Date.now() - 300000),
      isRead: true
    },
    {
      id: '2', 
      text: 'Отлично! На рыбалку собираемся. Ты как?',
      sender: 'me',
      timestamp: new Date(Date.now() - 180000),
      isRead: true
    },
    {
      id: '3',
      text: 'Хорошо сегодня, медведи спят зимой)',
      sender: 'Михаил', 
      timestamp: new Date(Date.now() - 120000),
      isRead: true
    }
  ]);

  const [chats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Михаил Сибиряк',
      lastMessage: 'Хорошо сегодня, медведи спят зимой)',
      timestamp: '2 мин',
      unreadCount: 0,
      avatar: 'МС',
      status: 'online',
      type: 'chat'
    },
    {
      id: '2', 
      name: 'Анна Таёжная',
      lastMessage: 'Шаман сказал - будет снег',
      timestamp: '15 мин',
      unreadCount: 0,
      avatar: 'АТ',
      status: 'away',
      type: 'chat'
    },
    {
      id: '3',
      name: 'Семья Медведевых',
      lastMessage: 'Мама: Ужин готов!',
      timestamp: '30 мин',
      unreadCount: 2,
      avatar: 'СМ',
      status: 'online',
      type: 'group'
    }
  ]);

  const [groups] = useState<Chat[]>([
    {
      id: '4',
      name: 'Байкальские рыбаки',
      lastMessage: 'Кто на лёд завтра?',
      timestamp: '1 ч',
      unreadCount: 3,
      avatar: 'БР',
      status: 'online',
      type: 'group'
    },
    {
      id: '5',
      name: 'Новосибирские охотники',
      lastMessage: 'Нашли следы лося у реки',
      timestamp: '2 ч',
      unreadCount: 1,
      avatar: 'НО',
      status: 'online',
      type: 'group'
    },
    {
      id: '6',
      name: 'IT в Сибири',
      lastMessage: 'React хорош, но мороз лучше!',
      timestamp: '3 ч',
      unreadCount: 5,
      avatar: 'IT',
      status: 'online',
      type: 'group'
    }
  ]);



  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'me',
      timestamp: new Date(),
      isRead: true
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const getCurrentData = () => {
    return activeTab === 'chats' ? chats : groups;
  };

  const selectedChatData = [...chats, ...groups].find(chat => chat.id === selectedChat);

  return (
    <div className="min-h-screen bg-gradient-to-br from-siberian-frost to-white">
      {/* Верхняя панель */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-siberian-blue/20 p-4">
        <div className="flex items-center justify-between">
          {/* Логотип и название */}
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gradient-to-r from-siberian-green to-siberian-teal rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <h1 className="text-2xl font-bold text-siberian-black" style={{ fontFamily: 'Montserrat' }}>
              SibCHAT
            </h1>
            
            {/* Прогноз погоды */}
            <Card className="px-3 py-1 bg-gradient-to-r from-siberian-blue/10 to-siberian-cyan/10 border-siberian-blue/20">
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Snowflake" size={14} className="text-siberian-blue" />
                <span className="text-siberian-black font-medium">-18°C</span>
                <span className="text-siberian-black/60">Новосибирск</span>
              </div>
            </Card>
          </div>

          {/* Основные вкладки */}
          <div className="flex items-center gap-2">
            <Button
              variant={activeTab === 'chats' ? "default" : "ghost"}
              onClick={() => setActiveTab('chats')}
              className={`${
                activeTab === 'chats' 
                  ? 'bg-gradient-to-r from-siberian-green to-siberian-teal text-white' 
                  : 'hover:bg-siberian-blue/10'
              }`}
            >
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Чаты
            </Button>
            <Button
              variant={activeTab === 'groups' ? "default" : "ghost"}
              onClick={() => setActiveTab('groups')}
              className={`${
                activeTab === 'groups' 
                  ? 'bg-gradient-to-r from-siberian-green to-siberian-teal text-white' 
                  : 'hover:bg-siberian-blue/10'
              }`}
            >
              <Icon name="Users" size={16} className="mr-2" />
              Группы
            </Button>
          </div>

          {/* Правая панель с доп. меню и профилем */}
          <div className="flex items-center gap-3">
            {/* Дополнительное меню */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Icon name="MoreHorizontal" size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Icon name="Calendar" size={16} className="mr-2" />
                  События
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="MapPin" size={16} className="mr-2" />
                  Карта медведей
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="Archive" size={16} className="mr-2" />
                  Ледяной ящик
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="Book" size={16} className="mr-2" />
                  Сибирский словарь
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="Trees" size={16} className="mr-2" />
                  Тайга
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Профиль */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-r from-siberian-purple to-siberian-blue text-white text-sm">
                      Ю
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left hidden md:block">
                    <div className="text-sm font-medium text-siberian-black">Юрий</div>
                    <div className="text-xs text-siberian-green">🟢 В избушке</div>
                  </div>
                  <Icon name="ChevronDown" size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Icon name="User" size={16} className="mr-2" />
                  Моя избушка
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="Settings" size={16} className="mr-2" />
                  Настройки
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="HelpCircle" size={16} className="mr-2" />
                  Помощь
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="LogOut" size={16} className="mr-2" />
                  Выйти из чума
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-88px)]">
        {/* Список чатов/групп */}
        <div className="w-80 bg-white/40 backdrop-blur-sm border-r border-siberian-blue/20">
          <div className="p-4 border-b border-siberian-blue/20">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-siberian-black/50" size={16} />
              <Input 
                placeholder={`Поиск ${activeTab === 'chats' ? 'чатов' : 'групп'}...`}
                className="pl-10 bg-white/80 border-siberian-blue/30 focus:border-siberian-green"
              />
            </div>
          </div>
          
          <div className="overflow-y-auto">
            {getCurrentData().map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedChat(item.id)}
                className={`p-4 border-b border-siberian-blue/10 cursor-pointer hover:bg-siberian-green/5 transition-colors ${
                  selectedChat === item.id ? 'bg-siberian-green/10' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-r from-siberian-yellow to-siberian-green text-white font-semibold">
                        {item.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                      item.status === 'online' ? 'bg-siberian-green' :
                      item.status === 'away' ? 'bg-siberian-yellow' : 'bg-gray-400'
                    }`} />
                    {item.type === 'group' && (
                      <Icon name="Users" size={10} className="absolute top-0 right-0 bg-siberian-blue text-white rounded-full p-0.5" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-siberian-black truncate">{item.name}</h3>
                      <span className="text-xs text-siberian-black/60">{item.timestamp}</span>
                    </div>
                    <p className="text-sm text-siberian-black/70 truncate">{item.lastMessage}</p>
                  </div>
                  
                  {item.unreadCount > 0 && (
                    <Badge className="bg-siberian-red text-white text-xs">
                      {item.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Область чата */}
        <div className="flex-1 flex flex-col bg-white/30 backdrop-blur-sm">
          {selectedChat && selectedChatData ? (
            <>
              {/* Заголовок чата */}
              <div className="p-4 border-b border-siberian-blue/20 bg-white/60">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-r from-siberian-purple to-siberian-blue text-white">
                      {selectedChatData.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold text-siberian-black">{selectedChatData.name}</h2>
                    <p className="text-sm text-siberian-green">
                      🟢 {selectedChatData.status === 'online' ? 'В сети' : 'Недавно был'} 
                      {selectedChatData.type === 'group' && ' • Участников: 12'}
                    </p>
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
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl transition-all duration-300 ${
                        message.sender === 'me'
                          ? 'bg-gradient-to-r from-siberian-green to-siberian-teal text-white'
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
                  Выберите {activeTab === 'chats' ? 'чат' : 'группу'}
                </h2>
                <p>Начните общение в сибирском стиле</p>
                <Badge className="mt-4 bg-siberian-yellow/20 text-siberian-black border-siberian-yellow/30">
                  ❄️ Морозостойкие {activeTab === 'chats' ? 'чаты' : 'группы'} ждут вас
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