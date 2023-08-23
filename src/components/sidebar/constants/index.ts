import { IconType } from 'react-icons';
import { FiTrendingUp, FiCompass, FiStar, FiSettings, FiLogOut } from 'react-icons/fi';
import { FaDumbbell } from 'react-icons/fa';

export interface LinkItemProps {
  name: string;
  url: string;
  icon: IconType;
}

export const LinkItems: Array<LinkItemProps> = [
  { name: 'Workouts', icon: FaDumbbell, url: '/workouts' },
  { name: 'Evolution', icon: FiTrendingUp, url: '#' },
  { name: 'Gestion', icon: FiCompass, url: '/manage' },
  { name: 'Favourites', icon: FiStar, url: '#' },
  { name: 'Paramètres', icon: FiSettings, url: '#' },
  { name: 'Déconnexion', icon: FiLogOut, url: '/logout' },
];
