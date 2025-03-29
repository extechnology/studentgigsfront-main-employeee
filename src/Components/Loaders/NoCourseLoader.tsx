import  { useState } from 'react';
import { BookOpen } from 'lucide-react';

export default function NoCourseLoader() {


  const [hovered, setHovered] = useState(false);


  return (


    <>

      <div className="w-full max-w-md mx-auto p-4">
        <div
          className="flex flex-col items-center justify-center rounded-xl border border-gray-100 p-10 text-center transition-all duration-300"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Icon with animated elements */}
          <div className="relative mb-8 w-20 h-20 flex items-center justify-center">
            {/* Pulsing background */}
            <div className={`absolute inset-0 bg-orange-50 rounded-full transition-all duration-500 ${hovered ? 'scale-110 bg-orange-100' : ''}`}></div>

            {/* Icon */}
            <BookOpen
              size={40}
              className={`text-orange-500 relative z-10 transition-all duration-300 ${hovered ? 'text-orange-600 scale-110' : ''}`}
            />

            {/* Subtle rotating ring */}
            <div className="absolute inset-0 border-2 border-dashed border-orange-200 rounded-full animate-[spin_12s_linear_infinite] opacity-60"></div>
          </div>

          {/* Text content */}
          <h2 className={`text-xl font-medium text-gray-800 mb-2 transition-all duration-300 ${hovered ? 'text-orange-700' : ''}`}>
            No courses available!
          </h2>
          <p className="text-gray-500 text-sm max-w-xs">
            Check back later for new learning opportunities
          </p>
        </div>
      </div>


    </>


  )


}
