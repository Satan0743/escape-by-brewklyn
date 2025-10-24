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
  ChefHat,
  ShoppingCart,
  Plus,
  Minus
} from 'lucide-react';
import WhatsAppFloat from '@/components/ui/whatsapp-float';

export default function FoodMenuPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [cart, setCart] = useState<{[key: string]: number}>({});

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

  const addToCart = (itemName: string) => {
    setCart(prev => ({
      ...prev,
      [itemName]: (prev[itemName] || 0) + 1
    }));
  };

  const removeFromCart = (itemName: string) => {
    setCart(prev => ({
      ...prev,
      [itemName]: Math.max((prev[itemName] || 0) - 1, 0)
    }));
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [itemName, quantity]) => {
      const item = foodItems.find(item => item.name === itemName);
      return total + (item ? parseInt(item.price.replace('₹', '')) * quantity : 0);
    }, 0);
  };

  const themeClasses = isDarkMode 
    ? 'bg-background text-foreground' 
    : 'bg-white text-gray-900';

  const foodItems = [
    // Main Course
    {
      name: "Paneer Tikka Masala",
      description: "Rich & creamy tomato gravy with tender paneer cubes",
      price: "₹395",
      category: "Main Course",
      rating: 4.8,
      prepTime: "15-20 min",
      image: "https://static.wixstatic.com/media/4d5d5f_2b02fd0ab63c4deba211d42e09c05a6a~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Chicken Tikka Masala",
      description: "Tender chicken in spiced gravy with aromatic herbs",
      price: "₹450",
      category: "Main Course",
      rating: 4.9,
      prepTime: "20-25 min",
      image: "https://static.wixstatic.com/media/4d5d5f_b31eed01ce3e4daea3bc92e438874337~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Mutton Rogan Josh",
      description: "Aromatic Kashmiri specialty with tender mutton pieces",
      price: "₹520",
      category: "Main Course",
      rating: 4.7,
      prepTime: "25-30 min",
      image: "https://static.wixstatic.com/media/4d5d5f_680c48b2f2984dc1994c828b704f4925~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Dal Makhani",
      description: "Creamy black lentils slow-cooked with butter and cream",
      price: "₹325",
      category: "Main Course",
      rating: 4.6,
      prepTime: "15-20 min",
      image: "https://static.wixstatic.com/media/4d5d5f_1d36dde4e732446a92eb2c6e9914306c~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Butter Chicken",
      description: "Classic creamy tomato-based curry with succulent chicken",
      price: "₹475",
      category: "Main Course",
      rating: 4.9,
      prepTime: "20-25 min",
      image: "https://static.wixstatic.com/media/4d5d5f_0bfc408e42c0461ba1cca416adb97911~mv2.png?originWidth=384&originHeight=256"
    },
    // Burgers
    {
      name: "Classic Veg Burger",
      description: "Fresh veggies, cheese, and our special sauce",
      price: "₹365",
      category: "Burgers",
      rating: 4.5,
      prepTime: "10-15 min",
      image: "https://static.wixstatic.com/media/4d5d5f_3bc4d37ba73141d0b25fd4a54eccc9ed~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Two Cheese Burger",
      description: "Double cheese delight with crispy lettuce",
      price: "₹375",
      category: "Burgers",
      rating: 4.6,
      prepTime: "10-15 min",
      image: "https://static.wixstatic.com/media/4d5d5f_a62e4ffb5c6a47a8884777876a54f44f~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Lamb Burger",
      description: "Juicy lamb patty with caramelized onions",
      price: "₹445",
      category: "Burgers",
      rating: 4.8,
      prepTime: "15-20 min",
      image: "https://static.wixstatic.com/media/4d5d5f_90674b26a7094b98816455bcf1df8167~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Chicken Deluxe",
      description: "Grilled chicken breast with avocado and bacon",
      price: "₹425",
      category: "Burgers",
      rating: 4.7,
      prepTime: "15-20 min",
      image: "https://static.wixstatic.com/media/4d5d5f_3cd559821cf34bf18a10dcbc77a5d72b~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "BBQ Bacon Burger",
      description: "Smoky BBQ sauce with crispy bacon strips",
      price: "₹465",
      category: "Burgers",
      rating: 4.8,
      prepTime: "15-20 min",
      image: "https://static.wixstatic.com/media/4d5d5f_7e8f375c8d55431095b8a8182073b1b6~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Peri Peri Chicken Burger",
      description: "Spicy peri peri chicken with fresh lettuce and tomato",
      price: "₹390",
      category: "Burgers",
      rating: 4.6,
      prepTime: "12-15 min",
      image: "https://static.wixstatic.com/media/4d5d5f_b47fce5b09a942b48f5fe31ba765766e~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Escape Chicken Burger",
      description: "Signature chicken burger with our special escape sauce",
      price: "₹380",
      category: "Burgers",
      rating: 4.7,
      prepTime: "12-15 min",
      image: "https://static.wixstatic.com/media/4d5d5f_37bac7c617364090a96b3a81f6715efd~mv2.png?originWidth=384&originHeight=256"
    },
    // Pizza
    {
      name: "Margherita",
      description: "Classic tomato sauce, mozzarella, and fresh basil",
      price: "₹495",
      category: "Pizza",
      rating: 4.6,
      prepTime: "15-20 min",
      image: "https://static.wixstatic.com/media/4d5d5f_b49b4fec0d6e498c86447458955d926d~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Escape House Special",
      description: "Our signature pizza with premium toppings",
      price: "₹525",
      category: "Pizza",
      rating: 4.9,
      prepTime: "20-25 min",
      image: "https://static.wixstatic.com/media/4d5d5f_5d739f559bea4db09bb9a2b190b892a8~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Paneer Tikka Pizza",
      description: "Indian fusion with marinated paneer and bell peppers",
      price: "₹595",
      category: "Pizza",
      rating: 4.7,
      prepTime: "20-25 min",
      image: "https://static.wixstatic.com/media/4d5d5f_14f2b2e94f17473b881fcd9b9ddbc0f4~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Pepperoni Classic",
      description: "Traditional pepperoni with extra cheese",
      price: "₹545",
      category: "Pizza",
      rating: 4.8,
      prepTime: "15-20 min",
      image: "https://static.wixstatic.com/media/4d5d5f_4a9ca305cccd4b71a7e54d5fc80acade~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Veggie Supreme",
      description: "Loaded with fresh vegetables and herbs",
      price: "₹515",
      category: "Pizza",
      rating: 4.5,
      prepTime: "18-22 min",
      image: "https://static.wixstatic.com/media/4d5d5f_b670d52289aa4ccb939b16dc5d4198d8~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Hawaiian",
      description: "Classic combination of ham, pineapple, and mozzarella",
      price: "₹490",
      category: "Pizza",
      rating: 4.4,
      prepTime: "16-20 min",
      image: "https://static.wixstatic.com/media/4d5d5f_e1a23007671848e993e7c9a95091da68~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Thai Ground Chicken",
      description: "Spicy Thai-style ground chicken with fresh herbs and chili",
      price: "₹580",
      category: "Pizza",
      rating: 4.6,
      prepTime: "18-22 min",
      image: "https://static.wixstatic.com/media/4d5d5f_f31a9b5e32854dfe9d024ae3b4501a2f~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "BBQ Chicken",
      description: "Smoky BBQ sauce with tender chicken and red onions",
      price: "₹590",
      category: "Pizza",
      rating: 4.7,
      prepTime: "18-22 min",
      image: "https://static.wixstatic.com/media/4d5d5f_06e8f478474145fd85938ae030f97eb8~mv2.png?originWidth=384&originHeight=256"
    },
    // Desserts
    {
      name: "Escape Tres Leches",
      description: "Three milk cake with caramel drizzle",
      price: "₹310",
      category: "Desserts",
      rating: 4.9,
      prepTime: "5-8 min",
      image: "https://static.wixstatic.com/media/4d5d5f_aa71c60289ee4d58afb7708982c0daa5~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Apple Crumble",
      description: "Warm apple crumble with vanilla ice cream",
      price: "₹340",
      category: "Desserts",
      rating: 4.7,
      prepTime: "8-10 min",
      image: "https://static.wixstatic.com/media/4d5d5f_0cb1dcc3c6f945e98376cc1741427d89~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Salted Caramel Brownie",
      description: "Rich chocolate brownie with salted caramel sauce",
      price: "₹335",
      category: "Desserts",
      rating: 4.8,
      prepTime: "5-8 min",
      image: "https://static.wixstatic.com/media/4d5d5f_1a9142b14afe47b4a3ab87f5b39b7caa~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Tiramisu",
      description: "Classic Italian dessert with coffee and mascarpone",
      price: "₹365",
      category: "Desserts",
      rating: 4.8,
      prepTime: "5-8 min",
      image: "https://static.wixstatic.com/media/4d5d5f_e8cd188113854d86b704efd7356c0cf2~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with molten center",
      price: "₹355",
      category: "Desserts",
      rating: 4.9,
      prepTime: "10-12 min",
      image: "https://static.wixstatic.com/media/4d5d5f_91f96a2e3df0444aafd4621941ea98bf~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Philadelphia Cheesecake",
      description: "Classic New York style cheesecake with berry compote",
      price: "₹340",
      category: "Desserts",
      rating: 4.8,
      prepTime: "5-8 min",
      image: "https://static.wixstatic.com/media/4d5d5f_7c3ddb311ce54e4e9601e3a98e07de6b~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Coorgi Coffee Brûlée",
      description: "Traditional crème brûlée infused with aromatic Coorgi coffee",
      price: "₹340",
      category: "Desserts",
      rating: 4.7,
      prepTime: "8-10 min",
      image: "https://static.wixstatic.com/media/4d5d5f_aa566582d0aa40f390552977bcd8dcba~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Ice Cream",
      description: "Premium vanilla ice cream with seasonal toppings",
      price: "₹290",
      category: "Desserts",
      rating: 4.5,
      prepTime: "3-5 min",
      image: "https://static.wixstatic.com/media/4d5d5f_d1d49ce403af4db59b519797e05b21ec~mv2.png?originWidth=384&originHeight=256"
    },
    // Brew Bites
    {
      name: "Buffalo Wings",
      description: "Crispy chicken wings tossed in spicy buffalo sauce",
      price: "₹425",
      category: "Brew Bites",
      rating: 4.8,
      prepTime: "12-15 min",
      image: "https://static.wixstatic.com/media/4d5d5f_d4fa20bdeb674fa0a868abca33c9787a~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Beer Battered Fish & Chips",
      description: "Fresh fish in our signature beer batter with crispy fries",
      price: "₹485",
      category: "Brew Bites",
      rating: 4.7,
      prepTime: "15-18 min",
      image: "https://static.wixstatic.com/media/4d5d5f_7fcb9c5c17b14494b91fa663cb33d985~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Loaded Nachos",
      description: "Crispy tortilla chips with cheese, jalapeños, and sour cream",
      price: "₹365",
      category: "Brew Bites",
      rating: 4.6,
      prepTime: "8-10 min",
      image: "https://static.wixstatic.com/media/4d5d5f_50990c3e6bb446638850ac6614f169e9~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Craft Beer Sliders",
      description: "Mini beef sliders with beer-infused sauce and pickles",
      price: "₹445",
      category: "Brew Bites",
      rating: 4.9,
      prepTime: "12-15 min",
      image: "https://static.wixstatic.com/media/4d5d5f_2763340a70ab41ae8fe51945cfd9d702~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Pretzel Bites",
      description: "Warm soft pretzel bites with beer cheese dip",
      price: "₹295",
      category: "Brew Bites",
      rating: 4.5,
      prepTime: "6-8 min",
      image: "https://static.wixstatic.com/media/4d5d5f_f54ab8b106044c34b1a239f9c3a18da9~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Spicy Jalapeño Poppers",
      description: "Cream cheese stuffed jalapeños wrapped in bacon",
      price: "₹385",
      category: "Brew Bites",
      rating: 4.7,
      prepTime: "10-12 min",
      image: "https://static.wixstatic.com/media/4d5d5f_b183a557bb554e5197017ef8ece72afe~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "Craft Cheese Board",
      description: "Selection of artisanal cheeses with crackers and nuts",
      price: "₹525",
      category: "Brew Bites",
      rating: 4.8,
      prepTime: "5-7 min",
      image: "https://static.wixstatic.com/media/4d5d5f_86b035255fdb4f3da40bb5fada5e5e96~mv2.png?originWidth=384&originHeight=256"
    },
    {
      name: "BBQ Pork Ribs",
      description: "Tender pork ribs glazed with smoky BBQ sauce",
      price: "₹565",
      category: "Brew Bites",
      rating: 4.9,
      prepTime: "18-20 min",
      image: "https://static.wixstatic.com/media/4d5d5f_b157497af3b14495a39fae97b0b2ef31~mv2.png?originWidth=384&originHeight=256"
    }
  ];

  const categories = ["All", "Main Course", "Burgers", "Pizza", "Desserts", "Brew Bites"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = selectedCategory === "All" 
    ? foodItems 
    : foodItems.filter(item => item.category === selectedCategory);

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
            {/* Back Button & Logo */}
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-primary hover:bg-secondary' 
                      : 'text-gray-700 hover:text-primary hover:bg-gray-100'
                  } transition-all duration-300`}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              
              <Image
                src="https://static.wixstatic.com/media/4d5d5f_3242c608bf5748fcbd9ad43c3b8c9acd~mv2.jpeg"
                alt="Escape by Brewklyn Logo"
                className="h-12 w-auto"
                width={200}
              />
            </div>

            {/* Cart & Theme Toggle */}
            <div className="flex items-center gap-4">
              {/* Cart Button */}
              <Button
                variant="outline"
                size="sm"
                className={`relative ${
                  isDarkMode 
                    ? 'border-primary text-primary hover:bg-primary hover:text-primary-foreground' 
                    : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                } transition-all duration-300`}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {Object.values(cart).reduce((sum, qty) => sum + qty, 0) > 0 && (
                  <span className={`absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs flex items-center justify-center ${
                    isDarkMode ? 'bg-primary text-primary-foreground' : 'bg-primary text-primary-foreground'
                  }`}>
                    {Object.values(cart).reduce((sum, qty) => sum + qty, 0)}
                  </span>
                )}
              </Button>

              {/* Theme Toggle */}
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
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-8 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://static.wixstatic.com/media/4d5d5f_3321cbf9c832490a9192855617c86091~mv2.png?originWidth=768&originHeight=576"
            alt="Food menu background"
            className="w-full h-full object-cover opacity-20"
            width={1920}
          />
        </div>
        
        <div className="relative max-w-[120rem] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={`font-display text-6xl md:text-7xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Food Menu
            </h1>
            <p className={`font-paragraph text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover our carefully crafted selection of dishes with authentic flavors 
              and premium ingredients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-8">
        <div className="max-w-[120rem] mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category
                    ? (isDarkMode 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-primary text-primary-foreground')
                    : (isDarkMode 
                        ? 'border-gray-600 text-gray-300 hover:border-primary hover:text-primary' 
                        : 'border-gray-300 text-gray-700 hover:border-primary hover:text-primary')
                } transition-all duration-300`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Food Items Grid */}
      <section className="py-8 px-8">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className={`h-full ${
                  isDarkMode 
                    ? 'bg-secondary border-gray-700 hover:border-primary/50' 
                    : 'bg-white border-gray-200 hover:border-primary/50'
                } transition-all duration-300 ${
                  isDarkMode ? 'hover:shadow-lg hover:shadow-primary/10' : 'hover:shadow-xl'
                }`}>
                  <div className="relative overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      width={400}
                    />
                    <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-bold ${
                      isDarkMode ? 'bg-black/70 text-white' : 'bg-white/90 text-gray-900'
                    }`}>
                      {item.category}
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className={`font-heading text-lg font-bold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {item.name}
                      </h3>
                      <span className={`text-xl font-bold ${
                        isDarkMode ? 'text-primary' : 'text-primary'
                      }`}>
                        {item.price}
                      </span>
                    </div>
                    
                    <p className={`font-paragraph text-sm mb-4 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center gap-1">
                        <Star className={`w-4 h-4 fill-current ${
                          isDarkMode ? 'text-primary' : 'text-primary'
                        }`} />
                        <span className={`font-medium ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {item.rating}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Clock className={`w-4 h-4 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                        <span className={`${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {item.prepTime}
                        </span>
                      </div>
                    </div>
                    
                    {/* Add to Cart Controls */}
                    {cart[item.name] > 0 ? (
                      <div className="flex items-center justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromCart(item.name)}
                          className={`${
                            isDarkMode 
                              ? 'border-primary text-primary hover:bg-primary hover:text-primary-foreground' 
                              : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                          }`}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        
                        <span className={`font-bold text-lg ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {cart[item.name]}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addToCart(item.name)}
                          className={`${
                            isDarkMode 
                              ? 'border-primary text-primary hover:bg-primary hover:text-primary-foreground' 
                              : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                          }`}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => addToCart(item.name)}
                        className={`w-full ${
                          isDarkMode 
                            ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                            : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                        } transition-all duration-300`}
                        size="sm"
                      >
                        Add to Cart
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Summary (Fixed Bottom) */}
      {Object.values(cart).reduce((sum, qty) => sum + qty, 0) > 0 && (
        <div className={`fixed bottom-0 left-0 right-0 z-40 ${
          isDarkMode ? 'bg-secondary border-t border-gray-700' : 'bg-white border-t border-gray-200'
        } p-4`}>
          <div className="max-w-[120rem] mx-auto flex items-center justify-between">
            <div>
              <span className={`font-heading text-lg font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Total: ₹{getCartTotal()}
              </span>
              <span className={`ml-2 text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                ({Object.values(cart).reduce((sum, qty) => sum + qty, 0)} items)
              </span>
            </div>
            
            <Button
              size="lg"
              className={`${
                isDarkMode 
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25' 
                  : 'bg-primary hover:bg-primary/90 text-primary-foreground'
              } transition-all duration-300`}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className={`py-16 px-8 ${isDarkMode ? 'bg-secondary' : 'bg-gray-50'} ${
        Object.values(cart).reduce((sum, qty) => sum + qty, 0) > 0 ? 'mb-20' : ''
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <ChefHat className={`w-16 h-16 mx-auto mb-6 ${
              isDarkMode ? 'text-primary' : 'text-primary'
            }`} />
            <h2 className={`font-heading text-4xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Ready to Order?
            </h2>
            <p className={`font-paragraph text-lg mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Reserve your table now and experience the perfect combination of 
              exceptional food and craft beer.
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

      {/* Footer */}
      <footer className={`py-12 px-8 ${
        isDarkMode ? 'bg-black border-t border-gray-800' : 'bg-gray-900'
      }`}>
        <div className="max-w-[120rem] mx-auto text-center">
          <p className="font-paragraph text-gray-400 text-sm">
            © 2024 Escape by Brewklyn. All rights reserved.
          </p>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <WhatsAppFloat phoneNumber="6364456513" />
    </div>
  );
}