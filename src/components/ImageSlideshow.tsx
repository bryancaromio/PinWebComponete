'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageMarker, { Marker, MarkerComponentProps } from 'react-image-marker';
import styles from './ImageSlideshow.module.css';

type Pin = {
  x: number;
  y: number;
  label: string;
  action: {
    type: 'navigate' | 'gallery';
    target: number;
    gallery?: string[];
  };
};

type ImageVersions = {
  desktop: string;
  tablet: string;
  mobile: string;
};

type Slide = {
  image: ImageVersions;
  title: string;
  description: string;
  pins: Pin[];
};

const slidesData: Slide[] = [
  {
    image: {
      desktop: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80',
      tablet: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      mobile: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    },
    title: 'Majestic Mountains',
    description: 'Discover the breathtaking beauty of untouched wilderness.',
    pins: [
      {
        x: 50,
        y: 30,
        label: 'Mountain Peak',
        action: {
          type: 'navigate',
          target: 1
        }
      },
      {
        x: 30,
        y: 45,
        label: 'Forest Valley',
        action: {
          type: 'gallery',
          target: -1,
          gallery: [
            'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=2000&q=80',
            'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2000&q=80'
          ]
        }
      },
      {
        x: 70,
        y: 45,
        label: 'Alpine Lake',
        action: {
          type: 'gallery',
          target: -1,
          gallery: [
            'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=2000&q=80',
            'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2000&q=80'
          ]
        }
      },
      {
        x: 50,
        y: 60,
        label: 'Hiking Trail',
        action: {
          type: 'navigate',
          target: 2
        }
      },
      {
        x: 20,
        y: 20,
        label: 'Snow Peak',
        action: {
          type: 'gallery',
          target: -1,
          gallery: [
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2000&q=80',
            'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=2000&q=80'
          ]
        }
      },
      {
        x: 80,
        y: 20,
        label: 'Glacier View',
        action: {
          type: 'gallery',
          target: -1,
          gallery: [
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80',
            'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=2000&q=80'
          ]
        }
      },
      {
        x: 85,
        y: 70,
        label: 'Mountain Stream',
        action: {
          type: 'gallery',
          target: -1,
          gallery: [
            'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=2000&q=80',
            'https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?auto=format&fit=crop&w=2000&q=80'
          ]
        }
      },
      {
        x: 15,
        y: 70,
        label: 'Hidden Valley',
        action: {
          type: 'gallery',
          target: -1,
          gallery: [
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80',
            'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=2000&q=80'
          ]
        }
      }
    ]
  },
  {
    image: {
      desktop: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80',
      tablet: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
      mobile: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80'
    },
    title: 'Forest Dreams',
    description: 'Immerse yourself in the enchanting atmosphere of ancient forests.',
    pins: [
      {
        x: 35,
        y: 40,
        label: 'Ancient Tree',
        action: {
          type: 'gallery',
          target: -1,
          gallery: [
            'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=2000&q=80',
            'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=2000&q=80'
          ]
        }
      },
      {
        x: 65,
        y: 40,
        label: 'Mystical Path',
        action: {
          type: 'navigate',
          target: 0
        }
      },
      {
        x: 50,
        y: 60,
        label: 'Forest Stream',
        action: {
          type: 'gallery',
          target: -1,
          gallery: [
            'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2000&q=80',
            'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2000&q=80'
          ]
        }
      },
      {
        x: 20,
        y: 25,
        label: 'Forest Canopy',
        action: {
          type: 'gallery',
          target: -1,
          gallery: [
            'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=2000&q=80',
            'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=2000&q=80'
          ]
        }
      },
      {
        x: 80,
        y: 25,
        label: 'Sunlit Grove',
        action: {
          type: 'gallery',
          target: -1,
          gallery: [
            'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=80',
            'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2000&q=80'
          ]
        }
      },
      {
        x: 85,
        y: 75,
        label: 'Hidden Waterfall',
        action: {
          type: 'gallery',
          target: -1,
          gallery: [
            'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=2000&q=80',
            'https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?auto=format&fit=crop&w=2000&q=80'
          ]
        }
      },
      {
        x: 15,
        y: 75,
        label: 'Mossy Rocks',
        action: {
          type: 'gallery',
          target: -1,
          gallery: [
            'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2000&q=80',
            'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2000&q=80'
          ]
        }
      },
      {
        x: 50,
        y: 85,
        label: 'Forest Floor',
        action: {
          type: 'gallery',
          target: -1,
          gallery: [
            'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=2000&q=80',
            'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=2000&q=80'
          ]
        }
      }
    ]
  },
  {
    image: {
      desktop: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=2000&q=80',
      tablet: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80',
      mobile: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80'
    },
    title: 'Golden Horizons',
    description: 'Experience the magic of dawn.',
    pins: [
      {
        x: 30,
        y: 40,
        label: 'Dawn Valley',
        action: {
          type: 'gallery',
          target: -1,
          gallery: [
            'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=2000&q=80',
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80'
          ]
        }
      },
      {
        x: 70,
        y: 40,
        label: 'Mountain Ridge',
        action: {
          type: 'navigate',
          target: 1
        }
      },
      {
        x: 50,
        y: 50,
        label: 'Sunrise Point',
        action: {
          type: 'gallery',
          target: -1,
          gallery: [
            'https://images.unsplash.com/photo-1466853817435-05b43fe45b39?auto=format&fit=crop&w=2000&q=80',
            'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=2000&q=80'
          ]
        }
      },
      {
        x: 50,
        y: 70,
        label: 'Morning Mist',
        action: {
          type: 'gallery',
          target: -1,
          gallery: [
            'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=2000&q=80',
            'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=2000&q=80'
          ]
        }
      },
      {
        x: 20,
        y: 20,
        label: 'First Light',
        action: {
          type: 'gallery',
          target: -1,
          gallery: [
            'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=2000&q=80',
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80'
          ]
        }
      },
      {
        x: 80,
        y: 20,
        label: 'Golden Peaks',
        action: {
          type: 'gallery',
          target: -1,
          gallery: [
            'https://images.unsplash.com/photo-1466853817435-05b43fe45b39?auto=format&fit=crop&w=2000&q=80',
            'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=2000&q=80'
          ]
        }
      },
      {
        x: 85,
        y: 70,
        label: 'Morning Lake',
        action: {
          type: 'gallery',
          target: -1,
          gallery: [
            'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=2000&q=80',
            'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=2000&q=80'
          ]
        }
      },
      {
        x: 15,
        y: 70,
        label: 'Dawn Forest',
        action: {
          type: 'gallery',
          target: -1,
          gallery: [
            'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=2000&q=80',
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80'
          ]
        }
      }
    ]
  }
];

export default function ImageSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [galleryMode, setGalleryMode] = useState<{active: boolean, images: string[], currentImage: number}>({
    active: false,
    images: [],
    currentImage: 0
  });
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const [hoveredPin, setHoveredPin] = useState<Pin | null>(null);

  const currentImage = galleryMode.active 
    ? galleryMode.images[galleryMode.currentImage]
    : slidesData[currentIndex].image[deviceType];

  // Función para centrar la imagen
  const centerImage = () => {
    if (containerRef.current && imageWrapperRef.current) {
      const container = containerRef.current;
      const imageWrapper = imageWrapperRef.current;
      const scrollPosition = (imageWrapper.scrollWidth - container.clientWidth) / 2;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Centrar al montar, cambiar imagen o cambiar tamaño de ventana
  useEffect(() => {
    centerImage();
  }, [currentIndex, galleryMode.currentImage, deviceType]);

  // Centrar cuando cambie el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
      centerImage();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Centrar cuando la imagen se cargue
  useEffect(() => {
    const img = new Image();
    img.src = currentImage;
    img.onload = centerImage;
  }, [currentImage]);

  const handleNext = () => {
    if (isTransitioning) return;
    
    if (galleryMode.active) {
      setIsTransitioning(true);
      setGalleryMode(prev => ({
        ...prev,
        currentImage: (prev.currentImage + 1) % prev.images.length
      }));
      setTimeout(() => setIsTransitioning(false), 800);
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
      setTimeout(() => setIsTransitioning(false), 800);
    }
  };

  const calculateZoomPosition = (pinX: number, pinY: number) => {
    const x = (pinX - 50) * -1;
    const y = (pinY - 50) * -1;
    return { x, y };
  };

  const handlePinClick = async (pin: Pin) => {
    if (isTransitioning) return;

    if (pin.action.type === 'gallery') {
      setGalleryMode({
        active: true,
        images: pin.action.gallery || [],
        currentImage: 0
      });
      return;
    }

    setIsZoomed(true);
    const zoomPos = calculateZoomPosition(pin.x, pin.y);
    setZoomPosition(zoomPos);

    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsTransitioning(true);
    setCurrentIndex(pin.action.target);
    
    setTimeout(() => {
      setIsZoomed(false);
      setZoomPosition({ x: 0, y: 0 });
      setIsTransitioning(false);
    }, 800);
  };

  const handleExitGallery = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setGalleryMode({
      active: false,
      images: [],
      currentImage: 0
    });
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const getMarkersForCurrentSlide = (): Marker[] => {
    return slidesData[currentIndex].pins.map((pin, index) => ({
      top: pin.y,
      left: pin.x,
      itemNumber: index + 1
    }));
  };

  const CustomMarker = (props: MarkerComponentProps) => {
    const pinIndex = Number(props.itemNumber) - 1;
    const currentPins = slidesData[currentIndex]?.pins || [];
    const pin = currentPins[pinIndex];

    if (!pin) return null;

    const isCurrentPinHovered = hoveredPin?.x === pin.x && hoveredPin?.y === pin.y;

    return (
      <motion.div
        className={styles.pin}
        initial={{ opacity: 1 }}
        animate={{ 
          scale: isCurrentPinHovered ? 1.8 : 1,
          opacity: hoveredPin ? (isCurrentPinHovered ? 1 : 0.5) : 1,
          transition: { duration: 0.2, ease: "easeOut" }
        }}
        onClick={() => !isTransitioning && handlePinClick(pin)}
        onMouseEnter={() => {
          setHoveredPin(pin);
        }}
        onMouseLeave={() => {
          setHoveredPin(null);
        }}
      >
        <div className={`${styles.pinDot} ${hoveredPin && !isCurrentPinHovered ? styles.pinDotDimmed : ''}`} />
      </motion.div>
    );
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container} ref={containerRef}>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={galleryMode.active ? `gallery-${galleryMode.currentImage}` : `slide-${currentIndex}-${deviceType}`}
            ref={imageWrapperRef}
            initial={{ opacity: 0, scale: 1.2, filter: 'blur(8px)' }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              filter: 'blur(0px)',
              transition: {
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1]
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 1.1, 
              filter: 'blur(8px)',
              transition: {
                duration: 0.6,
                ease: [0.4, 0, 1, 1]
              }
            }}
            className={`${styles.imageWrapper} ${isZoomed ? styles.zoomEffect : ''}`}
            style={{ 
              transform: isZoomed ? `scale(1.5) translate(${zoomPosition.x}px, ${zoomPosition.y}px)` : 'scale(1) translate(0, 0)',
            }}
          >
            {!galleryMode.active && (
              <>
                <ImageMarker
                  src={currentImage}
                  markers={getMarkersForCurrentSlide()}
                  markerComponent={CustomMarker}
                  extraClass={styles.imageMarker}
                />
                <div className={styles.imageOverlay} />
              </>
            )}
            {galleryMode.active && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={currentImage} 
                  alt="Gallery"
                  className={styles.galleryImage}
                />
                <div className={styles.imageOverlay} />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Capa para el título y descripción */}
      {!galleryMode.active && (
        <div className={styles.overlayLayer}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={`content-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }
              }}
              exit={{ 
                opacity: 0, 
                y: 10,
                transition: {
                  duration: 0.5,
                  ease: [0.55, 0.055, 0.675, 0.19]
                }
              }}
              className={styles.textContent}
            >
              <motion.h2 
                className={styles.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.6, 
                    delay: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  y: 10,
                  transition: { duration: 0.3 }
                }}
              >
                {slidesData[currentIndex].title}
              </motion.h2>
              <motion.p 
                className={styles.description}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.6, 
                    delay: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  y: 10,
                  transition: { duration: 0.3 }
                }}
              >
                {slidesData[currentIndex].description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Nueva capa para los controles */}
      <div className={styles.controlsLayer}>
        <AnimatePresence>
          {hoveredPin && (
            <motion.div 
              className={styles.pinLabelOverlay}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.3 }
              }}
              exit={{ 
                opacity: 0, 
                y: 10,
                transition: { duration: 0.2 }
              }}
            >
              {hoveredPin.label}
            </motion.div>
          )}
        </AnimatePresence>

        {galleryMode.active ? (
          <motion.div 
            className={styles.galleryControls}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className={styles.galleryInfo}>
              {galleryMode.currentImage + 1} / {galleryMode.images.length}
            </div>
            <div className={styles.buttonContainer}>
              <motion.button 
                onClick={handleExitGallery}
                className={styles.exitButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Exit
              </motion.button>
              <motion.button 
                onClick={handleNext}
                className={styles.nextButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div className={styles.buttonContainer}>
            <motion.button 
              onClick={handleNext}
              className={styles.nextButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
} 