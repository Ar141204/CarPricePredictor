import carMakesModels from '../data/carMakesModels.json';

export const getCarMakes = () => {
  return Object.keys(carMakesModels).sort();
};

export const getCarModels = (make) => {
  if (!make || !carMakesModels[make]) return [];
  return carMakesModels[make];
};

export const getDefaultCarModels = () => [];

export default carMakesModels;
