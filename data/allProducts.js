import { mobileProducts } from '../Screens/MobileScreen';
import { tvProducts } from '../Screens/TVScreen';
import { carProducts } from '../Screens/CarScreen';
import { bikeProducts } from '../Screens/BikeScreen';
import { headphonesProducts } from '../Screens/HeadphonesScreen';
import { cameraProducts } from '../Screens/CameraScreen';
import { realestateProducts } from '../Screens/RealEstateScreen';
import { gamesProducts } from '../Screens/GamesScreen';
// add other categories as needed

export const allProducts = [
  ...mobileProducts,
  ...tvProducts,
  ...carProducts,
  ...bikeProducts,
  ...headphonesProducts,
  ...cameraProducts,
  ...realestateProducts,
  ...gamesProducts,
];
