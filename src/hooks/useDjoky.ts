import { useContext } from 'react';
import AppContext from '@/contexts/app-context';

const useDjoky = () => {
  return useContext(AppContext);
};

export default useDjoky;
