import React from 'react';
import { specialityData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SpecialityMenu = () => {
  const navigate = useNavigate();

  return (
    <section 
      className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden relative"
      id="speciality"
    >
      {/* Decorative Background */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find by <span className="text-blue-600">Speciality in 1 second</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
          </p>
        </motion.div>

        {/* Grid — Using YOUR specialityData */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {specialityData.map((item, index) => (
            <motion.div
              key={item.speciality}  // ✅ Use speciality as key (more stable than index)
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                // ✅ Exact same routing logic as your original
                navigate(`/doctors/${item.speciality}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group overflow-hidden"
            >
              {/* Image */}
              <div className="h-32 bg-gray-50 flex items-center justify-center p-4">
                <img
                  src={item.image}
                  alt={item.speciality}
                  className="h-16 w-16 sm:h-20 sm:w-20 object-contain transition-transform group-hover:scale-110"
                  // Optional: add fallback if image fails
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<div class="text-3xl text-gray-300">${item.speciality.charAt(0)}</div>`;
                  }}
                />
              </div>

              {/* Text */}
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-900">{item.speciality}</h3>
                <p className="text-gray-500 text-sm mt-1">
                  {/* Optional: Add count if available, e.g., item.count && `${item.count} doctors` */}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialityMenu;