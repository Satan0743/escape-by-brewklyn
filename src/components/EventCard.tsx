import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';

interface EventCardProps {
  day: string;
  description: string;
  imageUrl: string;
  delay: number;
  isDarkMode: boolean;
  isFeatured?: boolean;
}

export default function EventCard({
  day,
  description,
  imageUrl,
  delay,
  isDarkMode,
  isFeatured = false,
}: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="group h-full"
    >
      <Card
        className={`overflow-hidden h-full flex flex-col ${
          isDarkMode
            ? 'bg-background border-gray-700'
            : 'bg-white border-gray-200'
        } transition-all duration-300 hover:scale-105 ${
          isFeatured
            ? `ring-2 ring-primary shadow-lg ${isDarkMode ? 'shadow-primary/20' : ''}`
            : ''
        }`}
      >
        <div className="relative h-48 flex-shrink-0">
          <Image
            src={imageUrl}
            alt={`${day} event`}
            className="w-full h-full object-cover"
            width={400}
          />
        </div>
        <CardContent className="p-6 flex-1 flex flex-col">
          <h3
            className={`font-heading text-xl font-bold mb-3 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {day}
          </h3>
          <p
            className={`font-paragraph text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
