import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { SignatureBrews } from '@/entities/signaturebrews';
import { Events } from '@/entities/events';
import { Link } from 'react-router-dom';
import { 
  Moon, 
  Sun, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook,
  Clock,
  Star,
  Users,
  Music,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import WhatsAppFloat from '@/components/ui/whatsapp-float';

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [signatureBrews, setSignatureBrews] = useState<SignatureBrews[]>([]);
  const [events, setEvents] = useState<Events[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '',
    message: '',
    reservationDate: '',
    reservationTime: ''
  });

  // Hero slideshow images
  const heroImages = [
    "https://static.wixstatic.com/media/e69b47_2e92d1255cf14e88b729a2f2a0560a3b~mv2.jpg",
    "https://static.wixstatic.com/media/e69b47_031668e8babe40a9a8926bd60331fafe~mv2.jpg",
    "https://static.wixstatic.com/media/e69b47_2e2fc5f0d2e641dc826b42873abe2a69~mv2.jpg",
    "https://static.wixstatic.com/media/4d5d5f_279dd881ed3f43cb822793e35d1c5098~mv2.jpeg",
    "https://static.wixstatic.com/media/4d5d5f_a7536e045e91432386d47db6026ab401~mv2.jpeg",
    "https://static.wixstatic.com/media/4d5d5f_3dfa678f9c144b24989849f50c8a1a1a~mv2.jpeg",
    "https://static.wixstatic.com/media/4d5d5f_416d4fc3ae184d08b31031fb665d96a2~mv2.jpg"
  ];

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#000000';
      document.body.style.color = '#FFFFFF';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#FFFFFF';
      document.body.style.color = '#000000';
    }

    // Fetch data
    fetchData();

    // Auto-advance slideshow
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(slideInterval);
  }, [isDarkMode, heroImages.length]);

  const fetchData = async () => {
    try {
      const [brewsResponse, eventsResponse] = await Promise.all([
        BaseCrudService.getAll<SignatureBrews>('signaturebrews'),
        BaseCrudService.getAll<Events>('events')
      ]);
      setSignatureBrews(brewsResponse.items.slice(0, 4));
      setEvents(eventsResponse.items.slice(0, 6));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create email content
      const emailSubject = `Reservation Request from ${formData.name}`;
      const emailBody = `
New Reservation Request:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Number of Guests: ${formData.guests || 'Not specified'}
Date: ${formData.reservationDate}
Time: ${formData.reservationTime}

Message:
${formData.message}

Please contact the customer to confirm their reservation.
      `.trim();

      // Create mailto link
      const mailtoLink = `mailto:itsashu1974@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Reset form
      setFormData({ name: '', email: '', phone: '', guests: '', message: '', reservationDate: '', reservationTime: '' });
      
      // Show success message (you could add a toast notification here)
      alert('Reservation request sent! Your email client should open with the request details.');
      
    } catch (error) {
      console.error('Error sending reservation request:', error);
      alert('There was an error sending your reservation request. Please try again.');
    }
  };

  const themeClasses = isDarkMode 
    ? 'bg-background text-foreground' 
    : 'bg-white text-gray-900';

  const navigationItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Brews', href: '#brews' },
    { label: 'Menu', href: '#menu' },
    { label: 'Experience', href: '#experience' },
    { label: 'Events', href: '#events' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <div className={`min-h-screen ${themeClasses} transition-colors duration-500`}>
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${
        isDarkMode 
          ? 'bg-background/95 backdrop-blur-md border-b border-gray-800' 
          : 'bg-white/95 backdrop-blur-md border-b border-gray-200'
      } transition-all duration-300`}>
        <div className="max-w-[120rem] mx-auto px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center"
            >
              <Image
                src="https://static.wixstatic.com/media/4d5d5f_f5ac964b85534ad6850fa320f3b6c1ac~mv2.jpg"
                className="h-12 w-auto border-[0px] border-[#ebe5e8] border-solid shadow-[inset_0px_0px_4px_0px_#bfbfbf] -ml-2 rounded-[49px]"
                width={200}
                alt="Escape by Brewklyn logo" />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.href.substring(1))}
                  className={`font-paragraph text-sm font-medium transition-colors duration-300 hover:text-primary ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Desktop Theme Toggle & CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${
                  isDarkMode 
                    ? 'bg-secondary text-primary hover:bg-primary hover:text-primary-foreground' 
                    : 'bg-gray-100 text-gray-700 hover:bg-primary hover:text-primary-foreground'
                } transition-all duration-300`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
              
              <Button
                onClick={() => scrollToSection('contact')}
                className={`${
                  isDarkMode 
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                    : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                } transition-all duration-300 px-8 py-3 text-lg`}
              >
                Reserve Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3">
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${
                  isDarkMode 
                    ? 'bg-secondary text-primary' 
                    : 'bg-gray-100 text-gray-700'
                } transition-all duration-300`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
              
              <motion.button
                onClick={toggleMobileMenu}
                className={`p-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-secondary text-white hover:bg-primary' 
                    : 'bg-gray-100 text-gray-700 hover:bg-primary hover:text-white'
                } transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden border-t ${
                isDarkMode ? 'border-gray-800 bg-background' : 'border-gray-200 bg-white'
              }`}
            >
              <div className="px-8 py-6 space-y-4">
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => scrollToSection(item.href.substring(1))}
                    className={`block w-full text-left font-paragraph text-lg font-medium py-2 transition-colors duration-300 hover:text-primary ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navigationItems.length * 0.05 }}
                  className="pt-4 border-t border-gray-600"
                >
                  <Button
                    onClick={() => scrollToSection('contact')}
                    className={`w-full ${
                      isDarkMode 
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                        : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                    } transition-all duration-300`}
                  >
                    Reserve Now
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Hero Section */}
      <section id="hero" className="relative h-screen overflow-hidden pt-20">
        {/* Background Slideshow */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={heroImages[currentSlide]}
                alt={`Craft beer pub atmosphere - slide ${currentSlide + 1}`}
                className="w-full h-full object-cover"
                width={1920}
              />
            </motion.div>
          </AnimatePresence>
          {/* Slideshow Navigation Dots */}

        </div>



        
        {/* Overlay */}
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-b from-transparent via-black/30 to-black/70' 
            : 'bg-gradient-to-b from-white/20 via-white/40 to-white/60'
        }`} />
        
        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center text-center p-[0px]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`font-paragraph text-xl md:text-2xl mb-8 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Crafted brews. Urban vibes. Your escape awaits.
            </motion.p>
            
            <h1 className={`font-display text-7xl md:text-8xl lg:text-9xl font-black mb-6 tracking-wider ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
               Escape By Brewklyn
            </h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection('contact')}
                className={`px-8 py-4 text-lg font-semibold ${
                  isDarkMode 
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25' 
                    : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                } transition-all duration-300`}
              >
                Reserve a Table
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('menu')}
                className={`px-8 py-4 text-lg font-semibold ${
                  isDarkMode 
                    ? 'border-primary text-primary hover:bg-primary hover:text-primary-foreground' 
                    : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                } transition-all duration-300`}
              >
                View Menu
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className={`py-24 px-8 ${isDarkMode ? 'bg-secondary' : 'bg-gray-50'}`}>
        <div className="max-w-[120rem] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="https://static.wixstatic.com/media/4d5d5f_8cab8d9b072a45389a86c17b7a1a572f~mv2.jpeg"
                  alt="Modern brewery interior with BREWSCAPE signage and industrial design elements"
                  className="w-full h-[500px] object-cover"
                  width={800}
                />
                <div className={`absolute inset-0 ${
                  isDarkMode 
                    ? 'bg-gradient-to-t from-black/60 via-transparent to-transparent' 
                    : 'bg-gradient-to-t from-black/30 via-transparent to-transparent'
                }`} />
                
                {/* Floating Stats Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className={`text-center p-4 rounded-lg backdrop-blur-md ${
                      isDarkMode ? 'bg-black/40' : 'bg-white/20'
                    }`}>
                      <div className={`text-2xl font-bold ${isDarkMode ? 'text-primary' : 'text-white'}`}>
                        5+
                      </div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-200' : 'text-white'}`}>
                        Signature Brews
                      </div>
                    </div>
                    <div className={`text-center p-4 rounded-lg backdrop-blur-md ${
                      isDarkMode ? 'bg-black/40' : 'bg-white/20'
                    }`}>
                      <div className={`text-2xl font-bold ${isDarkMode ? 'text-primary' : 'text-white'}`}>
                        5★
                      </div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-200' : 'text-white'}`}>
                        Rated Experience
                      </div>
                    </div>
                    <div className={`text-center p-4 rounded-lg backdrop-blur-md ${
                      isDarkMode ? 'bg-black/40' : 'bg-white/20'
                    }`}>
                      <div className={`text-2xl font-bold ${isDarkMode ? 'text-primary' : 'text-white'}`}>
                        24/7
                      </div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-200' : 'text-white'}`}>
                        Fresh Brewing
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className={`w-16 h-1 ${isDarkMode ? 'bg-primary' : 'bg-gray-900'} rounded`} />
              
              <h2 className={`font-heading text-5xl md:text-6xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Where Craft Meets Culture
              </h2>
              
              <div className="space-y-6 font-paragraph text-lg leading-relaxed">
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Escape by Brewklyn isn't just another brewpub—it's a portal to a world where 
                  exceptional craft beer meets the raw energy of urban nightlife. Born from a 
                  passion for brewing excellence and a love for Brooklyn's vibrant culture.
                </p>
                
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Every pour tells a story. Every sip is an escape. From our signature brews 
                  crafted with precision to our atmosphere designed for connection, we've created 
                  a space where flavor and community collide.
                </p>
                
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Step inside and leave the ordinary behind. This is your escape.
                </p>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${isDarkMode ? 'text-primary' : 'text-primary'}`}>
                    5+
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Signature Brews
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${isDarkMode ? 'text-primary' : 'text-primary'}`}>
                    5★
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Rated Experience
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${isDarkMode ? 'text-primary' : 'text-primary'}`}>
                    EveryDay
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Urban Vibes
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Signature Brews Section */}
      <section id="brews" className="py-24 px-8">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`font-heading text-5xl md:text-6xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Signature Brews
            </h2>
            <p className={`font-paragraph text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Each brew is a masterpiece, crafted with passion and precision to deliver 
              an unforgettable flavor journey.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['Belgium wheat', 'Belgium triple', 'Belgium Pilsner', 'hefeweizen', 'weizen bock', 'Mango wheat', 'Saison'].map((brewName, index) => (
              <motion.div
                key={brewName}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className={`overflow-hidden ${
                  isDarkMode 
                    ? 'bg-secondary border-gray-700 hover:border-primary/50' 
                    : 'bg-white border-gray-200 hover:border-primary/50'
                } transition-all duration-300 ${
                  isDarkMode ? 'hover:shadow-lg hover:shadow-primary/10' : 'hover:shadow-xl'
                }`}>
                  {brewName === 'Belgium Pilsner' && (
                    <div className="relative overflow-hidden">
                      <Image
                        src="https://static.wixstatic.com/media/4d5d5f_6680e1ebce28417abfaa671831ed1141~mv2.png"
                        alt="Belgium Pilsner"
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        width={400}
                      />
                    </div>
                  )}
                  {brewName === 'Belgium wheat' && (
                    <div className="relative overflow-hidden">
                      <Image
                        src="https://static.wixstatic.com/media/4d5d5f_e362700cc8e34bac81e249a3a67a9870~mv2.png"
                        alt="Belgium wheat"
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        width={400}
                      />
                    </div>
                  )}
                  {brewName === 'Belgium triple' && (
                    <div className="relative overflow-hidden">
                      <Image
                        src="https://static.wixstatic.com/media/4d5d5f_40345416c2b7474eb3e95aafd7121fb0~mv2.png"
                        alt="Belgium triple"
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        width={400}
                      />
                    </div>
                  )}
                  {brewName === 'hefeweizen' && (
                    <div className="relative overflow-hidden">
                      <Image
                        src="https://static.wixstatic.com/media/4d5d5f_a9a9979c7fea4e1e83699815fdcaef81~mv2.png"
                        alt="hefeweizen"
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        width={400}
                      />
                    </div>
                  )}
                  {brewName === 'weizen bock' && (
                    <div className="relative overflow-hidden">
                      <Image
                        src="https://static.wixstatic.com/media/4d5d5f_426b163950a64ba189ddfcd49bdf20c7~mv2.png"
                        alt="weizen bock"
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        width={400}
                      />
                    </div>
                  )}
                  {brewName === 'Mango wheat' && (
                    <div className="relative overflow-hidden">
                      <Image
                        src="https://static.wixstatic.com/media/4d5d5f_ceeb8dadc5f34cd79d0b72e7b68a9422~mv2.png"
                        alt="Mango wheat"
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        width={400}
                      />
                    </div>
                  )}
                  {brewName === 'Saison' && (
                    <div className="relative overflow-hidden">
                      <Image
                        src="https://static.wixstatic.com/media/4d5d5f_9675d25df37649d496e4af1674c9d84b~mv2.png"
                        alt="Saison"
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        width={400}
                      />
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    <h3 className={`font-heading text-xl font-bold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {brewName}
                    </h3>
                    <p className={`font-paragraph text-sm mb-3 ${
                      isDarkMode ? 'text-primary' : 'text-primary'
                    }`}>
                      Craft Beer
                    </p>
                    <p className={`font-paragraph text-sm mb-4 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {brewName === 'Belgium wheat'
                        ? 'Immerse yourself in the timeless elegance of Belgian Wheat Beer — a gracefully crafted Witbier born from centuries of brewing mastery. Its signature golden haze glows softly in the glass, releasing delicate waves of sun-kissed citrus, crushed coriander, and subtle floral spice. Each sip is silky and refreshing, unfolding with a gentle wheat sweetness and a crisp, airy finish that lingers like a summer breeze. A beer that feels light yet refined, smooth yet expressive — the perfect harmony of tradition, craftsmanship, and pure refreshment.'
                        : brewName === 'Belgium triple' 
                        ? 'A Belgian Tripel is a strong, pale ale from Belgium, known for its complex flavors from specialty yeast strains. It\'s typically golden in color with a moderate to high alcohol content (7-7.5% ABV, 23-26 IBU) and features a balance of spicy, fruity, and grainy-sweet notes.'
                        : brewName === 'Belgium Pilsner'
                        ? 'Pilsner is a pale lager characterized by a pale, golden color, crisp taste, and floral, spicy hop aroma, originating from the city of Plzeň (Pilsen) in the Czech Republic in 1842. It\'s a bottom-fermented beer that uses a longer, cold aging process (lagering), and is known for its clarity, fine carbonation, and moderate alcohol content. (5-5.5 ABV, 18-22 IBU)'
                        : brewName === 'hefeweizen'
                        ? 'Hefeweizen is a traditional German wheat beer that is cloudy, pale, and highly carbonated, known for its distinct flavors of banana and clove, created by a specific yeast strain. It has a creamy texture and fresh aroma\'s. (4.5-5% ABV, 13-15% IBU)'
                        : brewName === 'weizen bock'
                        ? 'Weizenbock is a strong German wheat beer that combines the rich maltiness of a bock with the fruity and spicy notes of a Weissbier. It is characterized by a malty, bready flavor profile and a balanced aroma of clove and banana, along with hints of dark fruit like plum and raisin. (5.5-6% ABV, 15-17 IBU)'
                        : brewName === 'Mango wheat'
                        ? 'Mango with beer, often called mango ale, is a fruity beer that combines the taste of beer with the sweet, sometimes tart, flavor of mangoes. It can range from a light, crisp ale perfect for summer to a creamy, milkshake-style ale, and is often low in bitterness with a pleasant aroma and refreshing finish. (4.5-5 ABV, 8-10 IBU)'
                        : brewName === 'Saison'
                        ? 'Saison is a pale, dry, and highly carbonated Belgian farmhouse ale, traditionally brewed for seasonal farm workers. It is known for its complex, spicy, and fruity flavors, often with a peppery yeast character and a high level of attenuation. (5.5-6% ABV, 26-28% IBU)'
                        : 'A carefully crafted brew with unique flavors and character.'
                      }
                    </p>

                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Menu Section */}
      <section id="menu" className={`py-24 px-8 ${isDarkMode ? 'bg-secondary' : 'bg-gray-50'}`}>
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`font-heading text-5xl md:text-6xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Our Menu
            </h2>
            <p className={`font-paragraph text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover our carefully curated selection of main courses, burgers, pizzas, 
              and desserts that perfectly complement your escape.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Main Course */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full ${
                isDarkMode 
                  ? 'bg-background border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <CardContent className="p-8">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${
                    isDarkMode ? 'bg-primary/20' : 'bg-primary/10'
                  }`}>
                    <span className={`text-2xl ${isDarkMode ? 'text-primary' : 'text-primary'}`}>🍛</span>
                  </div>
                  
                  <h3 className={`font-heading text-2xl font-bold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Main Course
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className={`font-heading text-lg font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Paneer Tikka Masala
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Rich & creamy tomato gravy
                      </p>
                    </div>
                    
                    <div>
                      <h4 className={`font-heading text-lg font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Chicken Tikka Masala
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Tender chicken in spiced gravy
                      </p>
                    </div>
                    
                    <div>
                      <h4 className={`font-heading text-lg font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Mutton Rogan Josh
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Aromatic Kashmiri specialty
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Burgers */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full ${
                isDarkMode 
                  ? 'bg-background border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <CardContent className="p-8">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${
                    isDarkMode ? 'bg-primary/20' : 'bg-primary/10'
                  }`}>
                    <span className={`text-2xl ${isDarkMode ? 'text-primary' : 'text-primary'}`}>🍔</span>
                  </div>
                  
                  <h3 className={`font-heading text-2xl font-bold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Burgers
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className={`font-heading text-lg font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Classic Veg
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Fresh veggies & cheese
                      </p>
                    </div>
                    
                    <div>
                      <h4 className={`font-heading text-lg font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Two Cheese Burger
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Double cheese delight
                      </p>
                    </div>
                    
                    <div>
                      <h4 className={`font-heading text-lg font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Lamb Burger
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Juicy lamb patty
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pizza */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full ${
                isDarkMode 
                  ? 'bg-background border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <CardContent className="p-8">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${
                    isDarkMode ? 'bg-primary/20' : 'bg-primary/10'
                  }`}>
                    <span className={`text-2xl ${isDarkMode ? 'text-primary' : 'text-primary'}`}>🍕</span>
                  </div>
                  
                  <h3 className={`font-heading text-2xl font-bold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Pizza
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className={`font-heading text-lg font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Margherita
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Classic tomato & mozzarella
                      </p>
                    </div>
                    
                    <div>
                      <h4 className={`font-heading text-lg font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Escape House
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Signature house special
                      </p>
                    </div>
                    
                    <div>
                      <h4 className={`font-heading text-lg font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Paneer Tikka Pizza
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Indian fusion delight
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Desserts */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full ${
                isDarkMode 
                  ? 'bg-background border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <CardContent className="p-8">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${
                    isDarkMode ? 'bg-primary/20' : 'bg-primary/10'
                  }`}>
                    <span className={`text-2xl ${isDarkMode ? 'text-primary' : 'text-primary'}`}>🍰</span>
                  </div>
                  
                  <h3 className={`font-heading text-2xl font-bold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Desserts
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className={`font-heading text-lg font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Escape Tres Leches
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Three milk cake delight
                      </p>
                    </div>
                    
                    <div>
                      <h4 className={`font-heading text-lg font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Apple Crumble
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        With vanilla ice cream
                      </p>
                    </div>
                    
                    <div>
                      <h4 className={`font-heading text-lg font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Salted Caramel Brownie
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Rich & indulgent
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/food-menu">
              <Button
                size="lg"
                className={`px-8 py-4 text-lg font-semibold ${
                  isDarkMode 
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25' 
                    : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                } transition-all duration-300`}
              >
                View Full Menu
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      {/* Experience Section */}
      <section id="experience" className={`relative py-32 px-8 overflow-hidden ${
        isDarkMode ? 'bg-black' : 'bg-gray-900'
      }`}>
        {/* Parallax Background */}
        <div className="absolute inset-0">
          <Image
            src="https://static.wixstatic.com/media/4d5d5f_4f416df402a54789bc14c6262e504e3f~mv2.png?originWidth=1920&originHeight=1024"
            alt="Live music and social atmosphere at the brewpub"
            className="w-full h-full object-cover opacity-30"
            width={1920}
          />
        </div>
        
        {/* Glow Effect */}
        {isDarkMode && (
          <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent" />
        )}
        
        <div className="relative max-w-[120rem] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-6xl md:text-7xl font-black text-white mb-8">
              Not Just a Pub.{' '}
              <span className={`${isDarkMode ? 'text-primary' : 'text-primary'} ${
                isDarkMode ? 'drop-shadow-[0_0_30px_rgba(255,140,0,0.8)]' : ''
              }`}>
                An Escape.
              </span>
            </h2>
            
            <p className="font-paragraph text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Where live music meets craft beer, where strangers become friends, 
              and where every night is an adventure waiting to unfold.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Music className={`w-12 h-12 mx-auto mb-4 ${
                  isDarkMode ? 'text-primary' : 'text-primary'
                }`} />
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  Live Music
                </h3>
                <p className="font-paragraph text-gray-400">
                  Local artists, electric atmosphere
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Users className={`w-12 h-12 mx-auto mb-4 ${
                  isDarkMode ? 'text-primary' : 'text-primary'
                }`} />
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  Community
                </h3>
                <p className="font-paragraph text-gray-400">
                  Where connections are made
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Sparkles className={`w-12 h-12 mx-auto mb-4 ${
                  isDarkMode ? 'text-primary' : 'text-primary'
                }`} />
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  Experience
                </h3>
                <p className="font-paragraph text-gray-400">
                  Unforgettable nights, every time
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Events & Offers Section */}
      <section id="events" className={`py-24 px-8 ${isDarkMode ? 'bg-secondary' : 'bg-gray-50'}`}>
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`font-heading text-5xl md:text-6xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Events & Offers
            </h2>
            <p className={`font-paragraph text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Don't miss out on our special events and exclusive offers. 
              Your next great night starts here.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* Monday */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className={`overflow-hidden ${
                isDarkMode 
                  ? 'bg-background border-gray-700' 
                  : 'bg-white border-gray-200'
              } transition-all duration-300 hover:scale-105`}>
                <div className="relative">
                  <Image
                    src="https://static.wixstatic.com/media/4d5d5f_9a1dcd520738479c81ccf51ab6bf5582~mv2.png"
                    alt="Monday drink offers"
                    className="w-full h-48 object-cover"
                    width={400}
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className={`font-heading text-xl font-bold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Monday
                  </h3>
                  <p className={`font-paragraph text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    drink related offers(happy hours, CRAFT CHUG CHALLENGE).
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tuesday */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className={`overflow-hidden ${
                isDarkMode 
                  ? 'bg-background border-gray-700' 
                  : 'bg-white border-gray-200'
              } transition-all duration-300 hover:scale-105`}>
                <div className="relative">
                  <Image
                    src="https://static.wixstatic.com/media/4d5d5f_5ab145ca432b479da506d5c7fd90030f~mv2.png?originWidth=384&originHeight=192"
                    alt="Tuesday taco special"
                    className="w-full h-48 object-cover"
                    width={400}
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className={`font-heading text-xl font-bold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Tuesday
                  </h3>
                  <p className={`font-paragraph text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Taco Tuesday and craft beer pairings.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Wednesday */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2 * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className={`overflow-hidden ${
                isDarkMode 
                  ? 'bg-background border-gray-700' 
                  : 'bg-white border-gray-200'
              } transition-all duration-300 hover:scale-105`}>
                <div className="relative">
                  <Image
                    src="https://static.wixstatic.com/media/4d5d5f_896c7f734cae4a9ca6f644549392d677~mv2.jpg"
                    alt="Wednesday ladies night"
                    className="w-full h-48 object-cover"
                    width={400}
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className={`font-heading text-xl font-bold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Wednesday
                  </h3>
                  <p className={`font-paragraph text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Grab your girl gang and step into mid-week magic. 💃 Free shots for ladies 🎶 DJ spinning your favorite beats 🍹 Signature cocktails at irresistible prices Make your Wednesday feel like a Saturday
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Thursday */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 3 * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className={`overflow-hidden ${
                isDarkMode 
                  ? 'bg-background border-gray-700' 
                  : 'bg-white border-gray-200'
              } transition-all duration-300 hover:scale-105`}>
                <div className="relative">
                  <Image
                    src="https://static.wixstatic.com/media/4d5d5f_925786643b4c47f4a25b4b084f2f118b~mv2.avif"
                    alt="Thursday food offers"
                    className="w-full h-48 object-cover"
                    width={400}
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className={`font-heading text-xl font-bold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Thursday
                  </h3>
                  <p className={`font-paragraph text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Food related offers (spicy wings challenge, limited meal veg|non veg|seafood|) Sunday-gaming combo |screening night|
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Friday */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 4 * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className={`overflow-hidden ${
                isDarkMode 
                  ? 'bg-background border-gray-700' 
                  : 'bg-white border-gray-200'
              } transition-all duration-300 hover:scale-105 ring-2 ring-primary shadow-lg ${
                isDarkMode ? 'shadow-primary/20' : ''
              }`}>
                <div className="relative">
                  <Image
                    src="https://static.wixstatic.com/media/4d5d5f_2afeef18c6a74a208eec6e5542af349e~mv2.png?originWidth=384&originHeight=192"
                    alt="Friday night live music"
                    className="w-full h-48 object-cover"
                    width={400}
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className={`font-heading text-xl font-bold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Friday
                  </h3>
                  <p className={`font-paragraph text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    🍺 Brews • Beats • Friday Heat<br />
                    Your favorite DJ + your favorite pint.<br />
                    ✨ Happy hour till 9<br />
                    🎵 Floor-shaking mixes<br />
                    🍔 Late-night bites<br />
                    Friday feels better with good music.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Saturday */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 5 * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className={`overflow-hidden ${
                isDarkMode 
                  ? 'bg-background border-gray-700' 
                  : 'bg-white border-gray-200'
              } transition-all duration-300 hover:scale-105 ring-2 ring-primary shadow-lg ${
                isDarkMode ? 'shadow-primary/20' : ''
              }`}>
                <div className="relative">
                  <Image
                    src="https://static.wixstatic.com/media/4d5d5f_77d51b331b214719b758114fb2b349fd~mv2.png?originWidth=384&originHeight=192"
                    alt="Saturday night DJ party"
                    className="w-full h-48 object-cover"
                    width={400}
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className={`font-heading text-xl font-bold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Saturday
                  </h3>
                  <p className={`font-paragraph text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Saturday Holly Bolly Night 🔥 Dance to the biggest Bollywood bangers! 🎧 DJ spinning Bollywood + Tollywood + Punjabi hits 💃 Hook-step dance-offs 🍻 Brews, cocktails & full desi vibe Saturday = Masala + Music + Masti
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sunday */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 6 * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className={`overflow-hidden ${
                isDarkMode 
                  ? 'bg-background border-gray-700' 
                  : 'bg-white border-gray-200'
              } transition-all duration-300 hover:scale-105`}>
                <div className="relative">
                  <Image
                    src="https://static.wixstatic.com/media/4d5d5f_62b61628ce7149ffa147c8552643a59e~mv2.png?originWidth=384&originHeight=192"
                    alt="Sunday brunch"
                    className="w-full h-48 object-cover"
                    width={400}
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className={`font-heading text-xl font-bold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Sunday
                  </h3>
                  <p className={`font-paragraph text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    🎷 Sunday Jazz & Billboard Karaoke Unwind with soulful jazz and chart-topping hits. 🎤 Open mic for all 🍸 Smooth cocktails 🪄 Easy, cozy, Sunday vibes Sing it slow. Sing it loud. Sing it your way.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Contact & Reservations Section */}
      <section id="contact" className="py-24 px-8">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className={`font-heading text-4xl md:text-5xl font-bold mb-8 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Reserve Your Escape
              </h2>
              
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`mt-1 ${
                        isDarkMode 
                          ? 'bg-secondary border-gray-600 text-white focus:border-primary' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                      }`}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`mt-1 ${
                        isDarkMode 
                          ? 'bg-secondary border-gray-600 text-white focus:border-primary' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                      }`}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className={`mt-1 ${
                        isDarkMode 
                          ? 'bg-secondary border-gray-600 text-white focus:border-primary' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                      }`}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="guests" className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Number of Guests
                    </Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      max="100"
                      value={formData.guests}
                      onChange={(e) => setFormData({...formData, guests: e.target.value})}
                      className={`mt-1 ${
                        isDarkMode 
                          ? 'bg-secondary border-gray-600 text-white focus:border-primary' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                      }`}
                      placeholder="2"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reservationDate" className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Reservation Date
                    </Label>
                    <Input
                      id="reservationDate"
                      type="date"
                      value={formData.reservationDate}
                      onChange={(e) => setFormData({...formData, reservationDate: e.target.value})}
                      className={`mt-1 ${
                        isDarkMode 
                          ? 'bg-secondary border-gray-600 text-white focus:border-primary' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                      }`}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="reservationTime" className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Preferred Time
                    </Label>
                    <Input
                      id="reservationTime"
                      type="time"
                      value={formData.reservationTime}
                      onChange={(e) => setFormData({...formData, reservationTime: e.target.value})}
                      className={`mt-1 ${
                        isDarkMode 
                          ? 'bg-secondary border-gray-600 text-white focus:border-primary' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                      }`}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="message" className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    className={`mt-1 ${
                      isDarkMode 
                        ? 'bg-secondary border-gray-600 text-white focus:border-primary' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-primary'
                    }`}
                    placeholder="Tell us about your reservation or any special requests..."
                  />
                </div>
                
                <Button
                  type="submit"
                  size="lg"
                  className={`w-full ${
                    isDarkMode 
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25' 
                      : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  } transition-all duration-300`}
                >
                  Send Reservation Request
                </Button>
              </form>
            </motion.div>
            
            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className={`font-heading text-2xl font-bold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Find Your Escape
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className={`w-5 h-5 ${isDarkMode ? 'text-primary' : 'text-primary'}`} />
                    <span className={`font-paragraph ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Bheemaneni Towers, 78/1, 14th Cross Rd, Chanakya Layout, Nagavara, Bengaluru, Karnataka 560045
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className={`w-5 h-5 ${isDarkMode ? 'text-primary' : 'text-primary'}`} />
                    <span className={`font-paragraph ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      6364456513
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className={`w-5 h-5 ${isDarkMode ? 'text-primary' : 'text-primary'}`} />
                    <span className={`font-paragraph ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      chayanaa.brewcraft@gmail.com
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className={`relative h-64 rounded-lg overflow-hidden ${
                isDarkMode ? 'bg-secondary' : 'bg-gray-200'
              }`}>
                <Image
                  src="https://static.wixstatic.com/media/4d5d5f_80b5d708a83f4ff2884807182a17452e~mv2.png?originWidth=576&originHeight=384"
                  alt="Map showing location of Escape by Brewklyn"
                  className="w-full h-full object-cover"
                  width={600}
                />
                <button 
                  onClick={() => window.open('https://maps.app.goo.gl/Smq36oFJgqAQ4SDT7', '_blank')}
                  className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 ${
                    isDarkMode ? 'bg-black/50 hover:bg-black/60' : 'bg-white/50 hover:bg-white/60'
                  }`}
                  aria-label="Open location in Google Maps"
                >
                  <div className={`p-4 rounded-full transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-primary shadow-lg shadow-primary/50 hover:shadow-primary/75' 
                      : 'bg-primary shadow-lg hover:shadow-xl'
                  }`}>
                    <MapPin className="w-8 h-8 text-primary-foreground" />
                  </div>
                </button>
              </div>
              
              {/* Social Media */}
              <div>
                <h4 className={`font-heading text-lg font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Follow the Escape
                </h4>
                
                <div className="flex gap-4">
                  {[
                    { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/ESCAPE.BREWKLYN' },
                    { icon: Facebook, label: 'Facebook', url: 'https://www.facebook.com/share/17QCwzdsYr/' }
                  ].map(({ icon: Icon, label, url }) => (
                    <button
                      key={label}
                      onClick={() => window.open(url, '_blank')}
                      className={`p-3 rounded-full ${
                        isDarkMode 
                          ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25' 
                          : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                      } transition-all duration-300 hover:scale-110`}
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className={`py-16 px-8 ${
        isDarkMode ? 'bg-black border-t border-gray-800' : 'bg-gray-900'
      }`}>
        <div className="max-w-[120rem] mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className={`font-heading text-xl font-bold mb-4 ${
                isDarkMode ? 'text-primary' : 'text-primary'
              }`}>
                Escape by Brewklyn
              </h3>
              <p className="font-paragraph text-gray-400 text-sm">
                Where craft meets culture. Your escape awaits.
              </p>
            </div>
            
            <div>
              <h4 className="font-heading text-lg font-bold mb-4 text-white">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                {['Menu', 'Events', 'Reservations', 'About'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading text-lg font-bold mb-4 text-white">
                Hours
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Life's too short for closed doors - that's why we're open 7 days in a week, 12 pm to 12 am.</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading text-lg font-bold mb-4 text-white">
                Contact
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Bheemaneni Towers, 78/1, 14th Cross Rd, Chanakya Layout, Nagavara, Bengaluru, Karnataka 560045</li>

                <li>63644 56513</li>
              </ul>
            </div>
          </div>
          
          <div className={`pt-8 border-t ${
            isDarkMode ? 'border-gray-800' : 'border-gray-700'
          } flex flex-col md:flex-row justify-between items-center`}>
            <p className="font-paragraph text-gray-400 text-sm">
              © 2025 Escape by Brewklyn. All rights reserved.
            </p>
            <p className="font-paragraph text-gray-400 text-sm mt-2 md:mt-0">
              Crafted with passion in Brooklyn
            </p>
          </div>
        </div>
      </footer>
      {/* WhatsApp Float Button */}
      <WhatsAppFloat phoneNumber="6364456513" />
    </div>
  );
}