import { useContext } from 'react';
import FormMultiStepContext from '../contexts/form-multistep.context';

const useForm = () => {
  return useContext(FormMultiStepContext);
};

export default useForm;
