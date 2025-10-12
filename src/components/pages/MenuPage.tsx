import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Moon, 
  Sun, 
  Star,
  Clock,
  Users,
  Menu,
  X
} from 'lucide-react';

export default function MenuPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

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
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const themeClasses = isDarkMode 
    ? 'bg-background text-foreground' 
    : 'bg-white text-gray-900';

  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#about' },
    { label: 'Brews', href: '/#brews' },
    { label: 'Menu', href: '/menu' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Events', href: '/#events' },
    { label: 'Contact', href: '/#contact' }
  ];

  const menuCategories = [
    { id: 'all', label: 'All Items' },
    { id: 'food', label: 'Food' },
    { id: 'liquor', label: 'Liquor' },
    { id: 'soft-drinks', label: 'Soft Drinks' },
    { id: 'beer', label: 'Beer' },
    { id: 'brewklyn-special', label: 'Brewklyn Special' }
  ].slice(0, 5); // Limit to 5 items

  const menuItems = [
    // Craft Beers
    {
      id: 1,
      category: 'beers',
      name: 'Brooklyn IPA',
      description: 'Hoppy, citrusy, bold with notes of grapefruit and pine',
      price: '₹660',
      image: 'https://static.wixstatic.com/media/4d5d5f_64c7dc92a6db4d168a86b39f7d8e6f83~mv2.png?originWidth=384&originHeight=256',
      featured: true,
      abv: '6.5%'
    },
    {
      id: 2,
      category: 'beers',
      name: 'Midnight Stout',
      description: 'Rich, smooth, dark with chocolate and coffee undertones',
      price: '₹745',
      image: 'https://static.wixstatic.com/media/4d5d5f_5606c39576bf4fe38be33c92f6fc4c21~mv2.png?originWidth=384&originHeight=256',
      abv: '7.2%'
    },
    {
      id: 3,
      category: 'beers',
      name: 'Golden Wheat',
      description: 'Light, crisp, refreshing with citrus and wheat notes',
      price: '₹580',
      image: 'https://static.wixstatic.com/media/4d5d5f_1e869299fa854ebda562fa9f8c185eab~mv2.png?originWidth=384&originHeight=256',
      abv: '4.8%'
    },
    {
      id: 4,
      category: 'beers',
      name: 'Escape Lager',
      description: 'Clean, balanced, smooth with a crisp finish',
      price: '₹580',
      image: 'https://static.wixstatic.com/media/4d5d5f_dab6a2d6cf81407f86cf460652d6bf69~mv2.png?originWidth=384&originHeight=256',
      abv: '5.0%'
    },
    // Appetizers
    {
      id: 5,
      category: 'appetizers',
      name: 'Craft Pretzel',
      description: 'House-made pretzel with beer cheese and spicy mustard',
      price: '₹995',
      image: 'https://static.wixstatic.com/media/4d5d5f_480bc07023a54d9fbd447b18c37e2ba8~mv2.png?originWidth=384&originHeight=256',
      featured: true
    },
    {
      id: 6,
      category: 'appetizers',
      name: 'Wings & Things',
      description: 'Choice of Buffalo, BBQ, or dry rub with celery and ranch',
      price: '₹1325',
      image: 'https://static.wixstatic.com/media/4d5d5f_fdce50afb4fc415d829134ddf6166a41~mv2.png?originWidth=384&originHeight=256'
    },
    {
      id: 7,
      category: 'appetizers',
      name: 'Loaded Nachos',
      description: 'House-made chips, cheese, jalapeños, sour cream, guac',
      price: '₹1160',
      image: 'https://static.wixstatic.com/media/4d5d5f_ee85ece9970d465387088e52d0dbb40e~mv2.png?originWidth=384&originHeight=256'
    },
    {
      id: 8,
      category: 'appetizers',
      name: 'Beer Battered Onion Rings',
      description: 'Crispy rings made with our signature beer batter',
      price: '₹830',
      image: 'https://static.wixstatic.com/media/4d5d5f_1b9540397aee40cdab6813008a98308d~mv2.png?originWidth=384&originHeight=256'
    },
    // Main Dishes
    {
      id: 9,
      category: 'mains',
      name: 'Brewklyn Burger',
      description: 'Angus beef, beer-braised onions, aged cheddar, brioche bun',
      price: '₹1490',
      image: 'https://static.wixstatic.com/media/4d5d5f_89735e50b827433eae3e193894f25481~mv2.png?originWidth=384&originHeight=256',
      featured: true
    },
    {
      id: 10,
      category: 'mains',
      name: 'Fish & Chips',
      description: 'Beer-battered cod, hand-cut fries, mushy peas, tartar sauce',
      price: '₹1820',
      image: 'https://static.wixstatic.com/media/4d5d5f_a032f82d73384e8c8a6982fdd28eedcf~mv2.png?originWidth=384&originHeight=256'
    },
    {
      id: 11,
      category: 'mains',
      name: 'BBQ Ribs',
      description: 'Stout-glazed baby back ribs, coleslaw, cornbread',
      price: '₹2150',
      image: 'https://static.wixstatic.com/media/4d5d5f_8dbc4a0a34e346b29d5e7ceab0d6e168~mv2.png?originWidth=384&originHeight=256'
    },
    {
      id: 12,
      category: 'mains',
      name: 'Craft Mac & Cheese',
      description: 'Three-cheese blend, beer reduction, crispy breadcrumbs',
      price: '₹1325',
      image: 'https://static.wixstatic.com/media/4d5d5f_c882218282194c77aa224603058089f5~mv2.png?originWidth=384&originHeight=256'
    },
    // Desserts
    {
      id: 13,
      category: 'desserts',
      name: 'Stout Brownie',
      description: 'Rich chocolate brownie made with our midnight stout',
      price: '₹660',
      image: 'https://static.wixstatic.com/media/4d5d5f_9e9b2c4fb7494b0892087bc7d87bc222~mv2.png?originWidth=384&originHeight=256'
    },
    {
      id: 14,
      category: 'desserts',
      name: 'Beer Float',
      description: 'Vanilla ice cream with your choice of beer',
      price: '₹830',
      image: 'https://static.wixstatic.com/media/4d5d5f_4700c4320a134a36b9cb52ca1a505da6~mv2.png?originWidth=384&originHeight=256'
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? menuItems.slice(0, 5)
    : menuItems.filter(item => item.category === selectedCategory).slice(0, 5);

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
              <Link to="/" className="flex items-center">
                <Image
                  src="https://static.wixstatic.com/media/4d5d5f_3242c608bf5748fcbd9ad43c3b8c9acd~mv2.jpeg"
                  alt="Escape by Brewklyn Logo"
                  className="h-12 w-auto"
                  width={200}
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {item.href.startsWith('/') ? (
                    <Link
                      to={item.href}
                      className={`font-paragraph text-sm font-medium transition-colors duration-300 hover:text-primary ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      } ${item.href === '/menu' ? (isDarkMode ? 'text-primary' : 'text-primary') : ''}`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className={`font-paragraph text-sm font-medium transition-colors duration-300 hover:text-primary ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      {item.label}
                    </a>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Desktop Theme Toggle & Back Button */}
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
              
              <Link to="/">
                <Button
                  variant="outline"
                  className={`${
                    isDarkMode 
                      ? 'border-primary text-primary hover:bg-primary hover:text-primary-foreground' 
                      : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                  } transition-all duration-300`}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
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
      </nav>

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src="https://static.wixstatic.com/media/4d5d5f_cfd8b0d647574a02817e900dcb88f54e~mv2.png?originWidth=1920&originHeight=704"
            alt="Delicious craft beer and food spread"
            className="w-full h-full object-cover"
            width={1920}
          />
          {/* Appetizers Label */}
          <div className={`absolute top-8 left-8 px-4 py-2 rounded-lg ${
            isDarkMode 
              ? 'bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25' 
              : 'bg-primary/90 text-primary-foreground'
          } backdrop-blur-sm`}>
            <span className="font-heading text-lg font-bold">Appetizers</span>
          </div>
        </div>
        
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-b from-transparent via-black/50 to-black/80' 
            : 'bg-gradient-to-b from-white/20 via-white/50 to-white/70'
        }`} />
        
        <div className="absolute inset-0 flex items-center justify-center text-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <h1 className={`font-heading text-5xl md:text-6xl lg:text-7xl font-black mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Our Menu
            </h1>
            
            <p className={`font-paragraph text-xl md:text-2xl mb-8 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Crafted with passion, served with pride
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-12 px-8">
        <div className="max-w-[120rem] mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12 max-w-5xl mx-auto">
            {menuCategories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-paragraph font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? (isDarkMode 
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                        : 'bg-primary text-primary-foreground')
                    : (isDarkMode 
                        ? 'bg-secondary text-gray-300 hover:bg-primary hover:text-primary-foreground' 
                        : 'bg-gray-100 text-gray-700 hover:bg-primary hover:text-primary-foreground')
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="pb-24 px-8">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Card className={`overflow-hidden ${
                  isDarkMode 
                    ? 'bg-secondary border-gray-700 hover:border-primary/50' 
                    : 'bg-white border-gray-200 hover:border-primary/50'
                } transition-all duration-300 ${
                  isDarkMode ? 'hover:shadow-lg hover:shadow-primary/10' : 'hover:shadow-xl'
                } ${item.featured ? (isDarkMode ? 'ring-2 ring-primary/50' : 'ring-2 ring-primary/50') : ''}`}>
                  <div className="relative overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      width={400}
                    />
                    {item.featured && (
                      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                        isDarkMode 
                          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/50' 
                          : 'bg-primary text-primary-foreground'
                      }`}>
                        <Star className="w-3 h-3 inline mr-1" />
                        Featured
                      </div>
                    )}
                    {item.abv && (
                      <div className={`absolute top-4 left-4 px-2 py-1 rounded text-xs font-bold ${
                        isDarkMode ? 'bg-black/70 text-white' : 'bg-white/90 text-gray-900'
                      }`}>
                        {item.abv}
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className={`font-heading text-xl font-bold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Main Course
                      </h3>
                      <span className={`font-heading text-xl font-bold ${
                        isDarkMode ? 'text-primary' : 'text-primary'
                      }`}>
                        {item.price}
                      </span>
                    </div>
                    
                    <p className={`font-paragraph text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`py-16 px-8 ${isDarkMode ? 'bg-secondary' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className={`font-heading text-3xl md:text-4xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Ready to Escape?
            </h2>
            <p className={`font-paragraph text-lg mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Reserve your table now and experience the perfect blend of craft beer and culinary excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#contact">
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
              </Link>
              <Link to="/">
                <Button
                  variant="outline"
                  size="lg"
                  className={`px-8 py-4 text-lg font-semibold ${
                    isDarkMode 
                      ? 'border-primary text-primary hover:bg-primary hover:text-primary-foreground' 
                      : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                  } transition-all duration-300`}
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}