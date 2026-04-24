import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, AlertTriangle, User, Phone, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';





const enrollmentSchema = z.object({

  fullName: z.string().min(2, 'Full Name is required'),

  phone: z.string().min(10, 'Valid Phone Number is required'),

  whatsapp: z.string().min(10, 'Valid WhatsApp Number is required'),

  age: z.coerce.number().min(10, 'Valid age is required'),

  city: z.string().min(2, 'City is required'),

  status: z.enum(['School Student', 'College Student', 'Working / Other'], {
    required_error: 'Please select your status',
  }),

  parentName: z.string().optional(),

  parentPhone: z.string().optional(),

  informParent: z.boolean().optional(),

  safetyCheck: z.boolean().optional(),

}).superRefine((data, ctx) => {

  if (data.status === 'School Student') {

    if (!data.parentName || data.parentName.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Parent/Guardian Name is required',
        path: ['parentName'],
      });
    }

    if (!data.parentPhone || data.parentPhone.length < 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Parent Phone Number is required',
        path: ['parentPhone'],
      });
    }

    if (data.informParent !== true) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'You must confirm that you have informed your parent/guardian',
        path: ['informParent'],
      });
    }
  }

});



type EnrollmentFormValues = z.infer<typeof enrollmentSchema>;


interface EnrollmentModalProps {
  children: React.ReactNode;
}





const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ children }) => {



  // Modal Open State
  const [isOpen, setIsOpen] = useState(false);


  // Form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnrollmentFormValues>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      informParent: false,
      safetyCheck: false,
    }
  });



  // Watching Status
  const selectedStatus = watch('status');
  const informParent = watch('informParent');
  const safetyCheck = watch('safetyCheck');




  // Form Submit
  const onSubmit = async (data: EnrollmentFormValues) => {

    try {

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Form Submitted:', data);
      toast.success('Enrollment initiated successfully!');
      setIsOpen(false);
      reset();

    } catch (error) {

      toast.error('Something went wrong. Please try again.');

    }

  };



  return (


    <Dialog open={isOpen} onOpenChange={setIsOpen}>


      <DialogTrigger asChild>
        {children}
      </DialogTrigger>


      <DialogContent className="sm:max-w-7xl max-h-[90vh] overflow-y-auto custom-scrollbar p-0 rounded-[2rem] border-0">


        {/* Modal Header */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 md:p-8 relative overflow-hidden">


          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/20 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2"></div>


          <DialogHeader className="relative z-10 text-left">

            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md mb-3 w-fit">
              <CheckCircle2 size={14} className="fill-orange-400 text-gray-900" />
              <span className="uppercase tracking-wider">Step 1 of 2</span>
            </div>

            <DialogTitle className="text-2xl md:text-3xl font-extrabold text-white mb-2">
              Register for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">7-Day Challenge</span>
            </DialogTitle>

            <DialogDescription className="text-gray-300 font-medium">
              Please fill in your details to proceed with enrollment.
            </DialogDescription>

          </DialogHeader>

        </div>


        {/* Modal Form Content */}
        <div className="p-6 md:p-8 bg-gray-50">

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

            {/* Section 1: Basic Details */}
            <div className="space-y-5">

              <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">Basic Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="space-y-2">

                  <Label htmlFor="fullName" className="text-gray-700 font-semibold">Full Name <span className="text-red-500">*</span></Label>

                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input id="fullName" placeholder="John Doe" className="pl-10 bg-white border-gray-200 h-11 rounded-xl" {...register('fullName')} />
                  </div>

                  {errors.fullName && <p className="text-red-500 text-xs font-medium">{errors.fullName.message}</p>}

                </div>


                <div className="space-y-2">

                  <Label htmlFor="age" className="text-gray-700 font-semibold">Age <span className="text-red-500">*</span></Label>

                  <div className="relative">
                    <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input id="age" type="number" placeholder="18" className="pl-10 bg-white border-gray-200 h-11 rounded-xl" {...register('age')} />
                  </div>

                  {errors.age && <p className="text-red-500 text-xs font-medium">{errors.age.message}</p>}

                </div>


                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 font-semibold">Phone Number <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input id="phone" placeholder="+91 XXXXX XXXXX" className="pl-10 bg-white border-gray-200 h-11 rounded-xl" {...register('phone')} />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs font-medium">{errors.phone.message}</p>}
                </div>


                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-gray-700 font-semibold">WhatsApp Number <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <CheckCircle2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input id="whatsapp" placeholder="+91 XXXXX XXXXX" className="pl-10 bg-white border-gray-200 h-11 rounded-xl" {...register('whatsapp')} />
                  </div>
                  {errors.whatsapp && <p className="text-red-500 text-xs font-medium">{errors.whatsapp.message}</p>}
                </div>


                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="city" className="text-gray-700 font-semibold">City <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input id="city" placeholder="Mumbai" className="pl-10 bg-white border-gray-200 h-11 rounded-xl" {...register('city')} />
                  </div>
                  {errors.city && <p className="text-red-500 text-xs font-medium">{errors.city.message}</p>}
                </div>


              </div>

            </div>



            {/* Section 2: Status */}
            <div className="space-y-5">

              <h3 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">Your Status</h3>

              <div className="space-y-3">

                <Label className="text-gray-700 font-semibold mb-2 block">Are you a: <span className="text-red-500">*</span></Label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                  {['School Student', 'College Student', 'Working / Other'].map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setValue('status', option as any, { shouldValidate: true })}
                      className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all ${selectedStatus === option
                          ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-sm'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                        }`}
                    >
                      {option}

                    </button>

                  ))}

                </div>

                {errors.status && <p className="text-red-500 text-xs font-medium mt-1">{errors.status.message}</p>}

              </div>

            </div>


            {/* Conditional Fields: School Student */}
            <AnimatePresence>

              {selectedStatus === 'School Student' && (

                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-5 overflow-hidden"
                >

                  <div className="bg-orange-50/50 p-5 rounded-2xl border border-orange-100 space-y-5">

                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle size={18} className="text-orange-500" />
                      <h4 className="font-bold text-gray-800">Parent/Guardian Details</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="parentName" className="text-gray-700 font-semibold">Parent Name <span className="text-red-500">*</span></Label>
                        <Input id="parentName" placeholder="Guardian Name" className="bg-white border-orange-200 h-11 rounded-xl" {...register('parentName')} />
                        {errors.parentName && <p className="text-red-500 text-xs font-medium">{errors.parentName.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="parentPhone" className="text-gray-700 font-semibold">Parent Phone <span className="text-red-500">*</span></Label>
                        <Input id="parentPhone" placeholder="+91 XXXXX XXXXX" className="bg-white border-orange-200 h-11 rounded-xl" {...register('parentPhone')} />
                        {errors.parentPhone && <p className="text-red-500 text-xs font-medium">{errors.parentPhone.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-4 pt-2">

                      {/* Checkbox 1 (Mandatory) */}
                      <label className="flex items-start gap-3 cursor-pointer group">

                        <div className="relative flex items-start pt-1">
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={informParent || false}
                            onChange={(e) => setValue('informParent', e.target.checked, { shouldValidate: true })}
                          />
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-colors flex items-center justify-center bg-white group-hover:border-orange-400">
                            <Check size={14} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
                          </div>
                        </div>

                        <div className="flex-1">
                          <span className="text-sm text-gray-700 font-medium select-none block">I confirm that I have informed my parent/guardian about this program <span className="text-red-500">*</span></span>
                        </div>

                      </label>

                      {errors.informParent && <p className="text-red-500 text-xs font-medium ml-8">{errors.informParent.message}</p>}


                      {/* Checkbox 2 (Optional) */}
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-start pt-1">
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={safetyCheck || false}
                            onChange={(e) => setValue('safetyCheck', e.target.checked)}
                          />
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-colors flex items-center justify-center bg-white group-hover:border-blue-400">
                            <Check size={14} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <span className="text-sm text-gray-700 font-medium select-none block">I will perform all tasks only in safe and known environments <span className="text-gray-400 font-normal">(Optional)</span></span>
                        </div>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-200">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl h-14 text-lg font-bold shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all duration-300 flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    Proceed to Registration
                    <ChevronRight size={22} className="ml-1 group-hover:translate-x-1.5 transition-transform" />
                  </>
                )}
              </Button>
            </div>

          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollmentModal;
