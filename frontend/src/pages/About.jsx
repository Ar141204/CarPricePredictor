import { motion } from 'framer-motion';

const About = ({ darkMode }) => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl md:text-6xl">
              About <span className="text-primary">CarPricePredictor</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground">
              Empowering your car buying and selling decisions with AI-powered price predictions
            </p>
          </div>

          {/* Mission Section */}
          <div className={`${darkMode ? 'bg-card' : 'bg-white'} shadow-xl rounded-2xl overflow-hidden`}>
            <div className="px-6 py-8 sm:p-10">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/50 mb-6">
                  <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
                  Our Mission
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                  At CarPricePredictor, we're revolutionizing the used car market by bringing transparency and fairness through data-driven insights. 
                  Our advanced machine learning models analyze millions of data points to deliver accurate and unbiased price predictions for any vehicle.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-16">
            <h2 className="text-3xl font-extrabold text-center text-foreground sm:text-4xl mb-12">
              How It Works
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ),
                  title: 'Data Collection',
                  description: 'We aggregate and analyze data from thousands of sources including dealership listings, private sales, and auction results to ensure our predictions reflect real market conditions.'
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: 'AI-Powered Analysis',
                  description: 'Our sophisticated machine learning models evaluate hundreds of factors including make, model, year, mileage, condition, location, and market trends to generate precise price estimates.'
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14v7m-7-9l7-7m-7 18l7-7" />
                    </svg>
                  ),
                  title: 'Continuous Learning',
                  description: 'Our system continuously learns from new market data and user feedback, constantly improving prediction accuracy and adapting to changing market dynamics.'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-6 mx-auto">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-indigo-700 rounded-xl shadow-lg overflow-hidden max-w-3xl mx-auto">
            <div className="px-6 py-8 sm:px-10 sm:py-10 text-center">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Ready to get started?
              </h2>
              <p className="mt-2 text-indigo-100 max-w-xl mx-auto">
                Try our car price prediction tool today and make informed decisions with confidence.
              </p>
              <div className="mt-6">
                <a
                  href="/predict"
                  className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition-colors duration-200"
                >
                  Predict Car Price
                </a>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Have questions?</h3>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
              We're here to help! Contact us at{' '}
              <a 
                href="mailto:support@carpricepredictor.com" 
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium transition-colors duration-200"
              >
                support@carpricepredictor.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
