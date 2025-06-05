import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCarMakes, getCarModels } from '../utils/carData';

const API_BASE_URL = 'http://localhost:5000';

const Predict = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear().toString(),
    mileage: '',
    engine_size: '',
    transmission_type: 'AUTOMATIC',
    fuelType: 'Petrol',
    engine_hp: '',
    engine_cylinders: '4',
    driven_wheels: 'front_wheel_drive',
    number_of_doors: '4',
    vehicle_size: 'Compact',
    vehicle_style: 'Sedan',
    highway_mpg: '',
    city_mpg: '',
    popularity: '1000'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [carMakes, setCarMakes] = useState(getCarMakes());
  const [carModels, setCarModels] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data for other dropdowns
  const vehicleSizes = ['Compact', 'Midsize', 'Large'];
  const vehicleStyles = ['Sedan', 'SUV', 'Truck', 'Van', 'Coupe', 'Convertible', 'Wagon'];
  const transmissionTypes = ['AUTOMATIC', 'MANUAL', 'AUTOMATED_MANUAL', 'DIRECT_DRIVE', 'UNKNOWN'];
  const drivenWheels = ['front_wheel_drive', 'rear_wheel_drive', 'all_wheel_drive', 'four_wheel_drive'];

  // Update models when make changes
  useEffect(() => {
    if (formData.make) {
      const models = getCarModels(formData.make);
      setCarModels(models);
      
      // Reset model selection if the current model is not in the new make's models
      if (formData.model && !models.includes(formData.model)) {
        setFormData(prev => ({
          ...prev,
          model: ''
        }));
      }
    } else {
      setCarModels([]);
      setFormData(prev => ({
        ...prev,
        model: ''
      }));
    }
  }, [formData.make]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || '' : value
    }));
    
    // Clear prediction when form changes
    if (prediction) setPrediction(null);
    if (error) setError(null);
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear prediction when form changes
    if (prediction) setPrediction(null);
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setPrediction(null);
    
    try {
      // Prepare the request data to match backend expectations
      const requestData = {
        make: formData.make,
        model: formData.model,
        year: parseInt(formData.year),
        mileage: parseFloat(formData.mileage) || 0,
        // Convert engine size to horsepower (approximate conversion: 1L ≈ 75hp)
        engine_hp: Math.round(parseFloat(formData.engine_size) * 75) || 0,
        engine_cylinders: parseInt(formData.engine_cylinders) || 4,
        transmission_type: formData.transmission_type,
        driven_wheels: formData.driven_wheels,
        number_of_doors: parseInt(formData.number_of_doors) || 4,
        vehicle_size: formData.vehicle_size,
        vehicle_style: formData.vehicle_style,
        highway_mpg: parseFloat(formData.highway_mpg) || 0,
        city_mpg: parseFloat(formData.city_mpg) || 0,
        popularity: parseInt(formData.popularity) || 1000
      };

      console.log('Sending request data:', requestData);

      // Make the actual API call
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Update the prediction state with the API response
      setPrediction({
        price: data.prediction,
        formattedPrice: data.formatted_prediction,
        status: data.status
      });
      
    } catch (err) {
      setError('Failed to get prediction. Please check your connection and try again.');
      console.error('Prediction error:', err);
      console.error('Error details:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background transition-colors duration-200`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`shadow-lg overflow-hidden sm:rounded-xl p-6 mb-8 border ${darkMode ? 'border-gray-700 bg-card' : 'border-gray-200 bg-white'}`}
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Car Price Prediction</h1>
            <p className="text-muted-foreground">Fill in the details below to get an accurate price estimate for your vehicle</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Make */}
              <div>
                <label htmlFor="make" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Make <span className="text-red-500">*</span>
                </label>
                <select
                  id="make"
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full py-2.5 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white text-base"
                >
                  <option value="">Select Make</option>
                  {carMakes.map(make => (
                    <option key={make} value={make} className="dark:bg-gray-800">{make}</option>
                  ))}
                </select>
              </div>

              {/* Model */}
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Model <span className="text-red-500">*</span>
                </label>
                <select
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  disabled={!formData.make}
                  className="mt-1 block w-full py-2.5 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white text-base disabled:opacity-50"
                >
                  <option value="">Select Model</option>
                  {carModels.map(model => (
                    <option key={model} value={model} className="dark:bg-gray-800">{model}</option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full py-2.5 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white text-base"
                />
              </div>

              {/* Mileage */}
              <div>
                <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mileage (miles) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="mileage"
                  name="mileage"
                  min="0"
                  value={formData.mileage}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full py-2.5 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white text-base"
                />
              </div>

              {/* Engine Size */}
              <div>
                <label htmlFor="engineSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Engine Size (L) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="engine_size"
                  name="engine_size"
                  step="0.1"
                  min="0.5"
                  max="10"
                  value={formData.engine_size || ''}
                  onChange={handleChange}
                  placeholder="e.g., 2.0"
                  required
                  className="mt-1 block w-full py-2.5 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white text-base"
                />
              </div>

              {/* Transmission */}
              <div>
                <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Transmission
                </label>
                <select
                  id="transmission_type"
                  name="transmission_type"
                  value={formData.transmission_type}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2.5 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white text-base"
                >
                  <option value="AUTOMATIC">Automatic</option>
                  <option value="MANUAL">Manual</option>
                  <option value="AUTOMATED_MANUAL">Automated Manual</option>
                  <option value="DIRECT_DRIVE">Direct Drive</option>
                  <option value="UNKNOWN">Unknown</option>
                </select>
              </div>

              {/* Fuel Type */}
              <div>
                <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fuel Type
                </label>
                <select
                  id="fuelType"
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2.5 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white text-base"
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                  <option value="LPG">LPG</option>
                </select>
              </div>

              {/* MPG */}
              <div>
                <label htmlFor="mpg" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  MPG (Miles Per Gallon)
                </label>
                <input
                  type="number"
                  id="highway_mpg"
                  name="highway_mpg"
                  min="0"
                  value={formData.highway_mpg}
                  onChange={handleChange}
                  placeholder="Highway MPG"
                  className="mt-1 block w-full py-2.5 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white text-base"
                />
                <input
                  type="number"
                  id="city_mpg"
                  name="city_mpg"
                  min="0"
                  value={formData.city_mpg}
                  onChange={handleChange}
                  placeholder="City MPG"
                  className="mt-3 block w-full py-2.5 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white text-base"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Get Price Estimate'}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Prediction Result */}
          {prediction && prediction.status === 'success' && !isLoading && !error && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg border border-green-100 dark:border-green-800/50"
            >
              <h3 className="text-lg font-medium text-green-800 dark:text-green-200 mb-2">Estimated Price</h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-300">
                {prediction.formattedPrice || `$${prediction.price.toLocaleString()}`}
              </p>
              <div className="mt-4 pt-4 border-t border-green-100 dark:border-green-800/50">
                <p className="text-sm text-green-700 dark:text-green-300">
                  Based on current market data
                </p>
              </div>
            </motion.div>
          )}
          
          {/* Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800/50"
            >
              <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">Error</h3>
              <p className="text-red-700 dark:text-red-300">
                {error}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Predict;
