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
  Twitter,
  Clock,
  Star,
  Users,
  Music,
  Sparkles,
  Menu,
  X
} from 'lucide-react';

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [signatureBrews, setSignatureBrews] = useState<SignatureBrews[]>([]);
  const [events, setEvents] = useState<Events[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    reservationDate: ''
  });

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
  }, [isDarkMode]);

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
    setFormData({ name: '', email: '', message: '', reservationDate: '' });
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
                src="https://static.wixstatic.com/media/4d5d5f_3242c608bf5748fcbd9ad43c3b8c9acd~mv2.jpeg"
                alt="Escape by Brewklyn Logo"
                className="h-12 w-auto"
                width={200}
              />
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
                } transition-all duration-300`}
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
        {/* Background Video Placeholder */}
        <div className="absolute inset-0">
          <Image
            src="https://static.wixstatic.com/media/4d5d5f_6ad4c8669f5a4461a75ced2370e8f0fb~mv2.png?originWidth=1920&originHeight=1024"
            alt="Craft beer pub atmosphere with neon lighting"
            className="w-full h-full object-cover"
            width={1920}
          />
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
            <h1 className={`font-display text-7xl md:text-8xl lg:text-9xl font-black mb-6 tracking-wider ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
               Escape By Brewklyn
            </h1>
            
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
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
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
            >
              <Image
                src="https://static.wixstatic.com/media/4d5d5f_3321cbf9c832490a9192855617c86091~mv2.png?originWidth=768&originHeight=576"
                alt="Modern bar interior with craft beer taps and urban design"
                className="w-full h-[600px] object-cover rounded-lg"
                width={800}
              />
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
                    15+
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
                    24/7
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
            {signatureBrews.map((brew, index) => (
              <motion.div
                key={brew._id}
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
                  <div className="relative overflow-hidden">
                    <Image
                      src={brew.beerImage || "https://static.wixstatic.com/media/4d5d5f_531895c85ac24c06be160a524c126a6e~mv2.png?originWidth=384&originHeight=256"}
                      alt={brew.name || "Signature brew"}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      width={400}
                    />
                    <div className={`absolute inset-0 ${
                      isDarkMode 
                        ? 'bg-gradient-to-t from-black/60 to-transparent' 
                        : 'bg-gradient-to-t from-black/30 to-transparent'
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className={`font-heading text-xl font-bold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {brew.name}
                    </h3>
                    
                    <p className={`font-paragraph text-sm mb-3 ${
                      isDarkMode ? 'text-primary' : 'text-primary'
                    }`}>
                      {brew.beerStyle}
                    </p>
                    
                    <p className={`font-paragraph text-sm mb-4 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {brew.flavorDescription}
                    </p>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className={`w-full ${
                        isDarkMode 
                          ? 'border-primary text-primary hover:bg-primary hover:text-primary-foreground' 
                          : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                      } transition-all duration-300`}
                    >
                      View Full Brew
                    </Button>
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
                    <div className="flex justify-between items-start">
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
                      <span className={`font-bold ${isDarkMode ? 'text-primary' : 'text-primary'}`}>
                        ₹395
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-start">
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
                      <span className={`font-bold ${isDarkMode ? 'text-primary' : 'text-primary'}`}>
                        ₹450
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-start">
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
                      <span className={`font-bold ${isDarkMode ? 'text-primary' : 'text-primary'}`}>
                        ₹520
                      </span>
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
                    <div className="flex justify-between items-start">
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
                      <span className={`font-bold ${isDarkMode ? 'text-primary' : 'text-primary'}`}>
                        ₹365
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-start">
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
                      <span className={`font-bold ${isDarkMode ? 'text-primary' : 'text-primary'}`}>
                        ₹375
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-start">
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
                      <span className={`font-bold ${isDarkMode ? 'text-primary' : 'text-primary'}`}>
                        ₹445
                      </span>
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
                    <div className="flex justify-between items-start">
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
                      <span className={`font-bold ${isDarkMode ? 'text-primary' : 'text-primary'}`}>
                        ₹495
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-start">
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
                      <span className={`font-bold ${isDarkMode ? 'text-primary' : 'text-primary'}`}>
                        ₹525
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-start">
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
                      <span className={`font-bold ${isDarkMode ? 'text-primary' : 'text-primary'}`}>
                        ₹595
                      </span>
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
                    <div className="flex justify-between items-start">
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
                      <span className={`font-bold ${isDarkMode ? 'text-primary' : 'text-primary'}`}>
                        ₹310
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-start">
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
                      <span className={`font-bold ${isDarkMode ? 'text-primary' : 'text-primary'}`}>
                        ₹340
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-start">
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
                      <span className={`font-bold ${isDarkMode ? 'text-primary' : 'text-primary'}`}>
                        ₹335
                      </span>
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className={`overflow-hidden ${
                  isDarkMode 
                    ? 'bg-background border-gray-700' 
                    : 'bg-white border-gray-200'
                } transition-all duration-300 hover:scale-105 ${
                  event.isHappyHour 
                    ? (isDarkMode 
                        ? 'ring-2 ring-primary shadow-lg shadow-primary/20' 
                        : 'ring-2 ring-primary shadow-lg')
                    : ''
                }`}>
                  {event.eventImage && (
                    <div className="relative">
                      <Image
                        src={event.eventImage}
                        alt={event.eventName || "Event"}
                        className="w-full h-48 object-cover"
                        width={400}
                      />
                      {event.isHappyHour && (
                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                          isDarkMode 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-primary text-primary-foreground'
                        } ${isDarkMode ? 'shadow-lg shadow-primary/50' : ''}`}>
                          Happy Hour
                        </div>
                      )}
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className={`w-4 h-4 ${
                        isDarkMode ? 'text-primary' : 'text-primary'
                      }`} />
                      <span className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {event.eventDate ? new Date(event.eventDate).toLocaleDateString() : 'TBA'}
                      </span>
                      {event.eventTime && (
                        <>
                          <Clock className={`w-4 h-4 ml-2 ${
                            isDarkMode ? 'text-primary' : 'text-primary'
                          }`} />
                          <span className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {event.eventTime}
                          </span>
                        </>
                      )}
                    </div>
                    
                    <h3 className={`font-heading text-xl font-bold mb-3 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {event.eventName}
                    </h3>
                    
                    <p className={`font-paragraph text-sm mb-4 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {event.description}
                    </p>
                    
                    {event.ctaText && (
                      <Button
                        size="sm"
                        className={`w-full ${
                          event.isHappyHour 
                            ? (isDarkMode 
                                ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25' 
                                : 'bg-primary hover:bg-primary/90 text-primary-foreground')
                            : (isDarkMode 
                                ? 'bg-secondary-foreground hover:bg-gray-600 text-background' 
                                : 'bg-gray-900 hover:bg-gray-800 text-white')
                        } transition-all duration-300`}
                      >
                        {event.ctaText}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
                      123 Craft Street, Brooklyn, NY 11201
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className={`w-5 h-5 ${isDarkMode ? 'text-primary' : 'text-primary'}`} />
                    <span className={`font-paragraph ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      (555) 123-BREW
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className={`w-5 h-5 ${isDarkMode ? 'text-primary' : 'text-primary'}`} />
                    <span className={`font-paragraph ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      hello@escapebybrewklyn.com
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
                <div className={`absolute inset-0 flex items-center justify-center ${
                  isDarkMode ? 'bg-black/50' : 'bg-white/50'
                }`}>
                  <div className={`p-4 rounded-full ${
                    isDarkMode 
                      ? 'bg-primary shadow-lg shadow-primary/50' 
                      : 'bg-primary shadow-lg'
                  }`}>
                    <MapPin className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
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
                    { icon: Instagram, label: 'Instagram' },
                    { icon: Facebook, label: 'Facebook' },
                    { icon: Twitter, label: 'Twitter' }
                  ].map(({ icon: Icon, label }) => (
                    <button
                      key={label}
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
                <li>Mon-Thu: 4PM - 12AM</li>
                <li>Fri-Sat: 2PM - 2AM</li>
                <li>Sun: 2PM - 11PM</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading text-lg font-bold mb-4 text-white">
                Contact
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>123 Craft Street</li>
                <li>Brooklyn, NY 11201</li>
                <li>(555) 123-BREW</li>
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
    </div>
  );
}