import { mobileProducts } from '../Screens/MobileScreen';
import { tvProducts } from '../Screens/TVScreen';
import { carProducts } from '../Screens/CarScreen';
// add other categories as needed

export const allProducts = [
  ...mobileProducts,
  ...tvProducts,
  ...carProducts,
];
