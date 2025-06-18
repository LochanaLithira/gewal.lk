import React from 'react';
import { 
  ShieldCheckIcon,
  CreditCardIcon,
  HomeIcon,
  ScaleIcon
} from '@heroicons/react/24/outline';

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>

      {/* Property Warranty */}
      <div>
        <ShieldCheckIcon className='w-12 h-12 m-auto mb-5 text-purple-600' />
        <p className='font-semibold'>Property Warranty</p>
        <p className='text-gray-400'>We offer a 5-year warranty on new properties for your peace of mind.</p>
      </div>

      {/* Flexible Payment Plan */}
      <div>
        <CreditCardIcon className='w-12 h-12 m-auto mb-5 text-purple-600' />
        <p className='font-semibold'>Flexible Payment Plan</p>
        <p className='text-gray-400'>We provide flexible payment plans to help you own your dream home.</p>
      </div>

      {/* Property Viewing */}
      <div>
        <HomeIcon className='w-12 h-12 m-auto mb-5 text-purple-600' />
        <p className='font-semibold'>Free Property Viewing</p>
        <p className='text-gray-400'>We offer free property viewings to help you find your perfect home.</p>
      </div>

      {/* Legal Support */}
      <div>
        <ScaleIcon className='w-12 h-12 m-auto mb-5 text-purple-600' />
        <p className='font-semibold'>Legal Support</p>
        <p className='text-gray-400'>Our team provides legal support throughout the property buying process.</p>
      </div>

    </div>
  );
}

export default OurPolicy;
