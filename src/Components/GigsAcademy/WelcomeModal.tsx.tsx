import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogClose } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, X, ChevronRight, User, Mail, Phone, GraduationCap } from "lucide-react";
import toast from "react-hot-toast";
import { SubmitEnroll } from "@/Hooks/EntrollHook";



const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    course: z.string().min(1, "Please select a course")
});


export default function WelcomeModal() {


    // State to manage modal visibility
    const [isOpen, setIsOpen] = useState(false);


    // Submit Enroll
    const { mutate } = SubmitEnroll()


    useEffect(() => {

        // Check if user has already seen modal in this session
        const hasSeenModal = sessionStorage.getItem("hasSeenWelcomeModal");

        if (!hasSeenModal) {
            // Show modal after a short delay for better UX
            const timer = setTimeout(() => {
                setIsOpen(true);
                // Mark that user has seen modal in this session
                sessionStorage.setItem("hasSeenWelcomeModal", "true");
            }, 1500);

            return () => clearTimeout(timer);
        }

    }, []);



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            course: "",
        },
    });



    // Function to handle form submission
    function onSubmit(values: z.infer<typeof formSchema>) {

        const formData = new FormData()

        formData.append("name", values.name)
        formData.append("email", values.email)
        formData.append("phone", values.phone)
        formData.append("interested_course", values.course)

        mutate(formData, {

            onSuccess: (response) => {

                if (response.status >= 200 && response.status < 300) {

                    toast.success("Form submitted successfully! We will get back to you soon.");
                    setIsOpen(false);

                } else {

                    toast.error("Something went wrong. Please try again Later.");
                    setIsOpen(false);
                }

            }

        })

    }


    return (

        <Dialog open={isOpen} onOpenChange={setIsOpen}>


            <DialogContent className="p-0  max-w-5xl overflow-hidden rounded-3xl bg-white border-0 animate-scale-in">


                <DialogClose className="absolute right-5 top-5 rounded-full w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-md z-50 text-gray-500 hover:text-gray-900 hover:bg-gray-100 shadow-md transition-all duration-300">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </DialogClose>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">


                    {/* Left side - Image and Accent Content */}
                    <div className="relative h-full w-full overflow-hidden md:min-h-[600px] group">


                        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-orange-400 opacity-90"></div>


                        <div className="absolute inset-0 mix-blend-overlay opacity-20">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMxLjIzIDAgMi4xOTguOTY5IDIuMTk4IDIuMTk5VjM2YzAgMS4yMy0uOTY5IDIuMTk5LTIuMTk4IDIuMTk5SDE4QTIuMTk4IDIuMTk4IDAgMCAxIDE1LjgwMSAzNlYyMC4xOTljMC0xLjIzLjk2OS0yLjE5OSAyLjE5OC0yLjE5OWgxOG0wLTJIMThhNC4xOTggNC4xOTggMCAwIDAtNC4xOTggNC4xOTlWMzZjMCAyLjMyIDEuODc4IDQuMTk5IDQuMTk4IDQuMTk5aDE4QTQuMTk4IDQuMTk4IDAgMCAwIDQwLjE5OSAzNlYyMC4xOTlBNC4xOTggNC4xOTggMCAwIDAgMzYgMTYiIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-40 animate-grid"></div>
                        </div>


                        {/* Main image */}
                        <div className="absolute inset-0 overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Student learning"
                                className="absolute w-full h-full object-cover object-center opacity-40 scale-110 group-hover:scale-105 transition-transform duration-10000"
                            />
                        </div>


                        {/* Content overlay */}
                        <div className="relative z-10 h-full flex flex-col justify-between p-10 md:p-12">


                            <div className="animate-fade-in">

                                <div className="flex items-center">

                                    <div className="w-16 h-16 backdrop-blur-md bg-white/20 rounded-2xl flex items-center justify-center mb-8 shadow-lg border border-white/30 animate-float">
                                        <GraduationCap className="w-8 h-8 text-white" />
                                    </div>

                                    <h2 className="text-3xl font-bold text-white leading-tight mb-6 ms-2 max-w-xs">
                                        Gigs Skill Academy
                                    </h2>

                                </div>


                                <h2 className="text-4xl font-bold text-white leading-tight mb-4 max-w-xs">
                                    Start Your Learning Journey Today
                                </h2>

                                <p className="text-white/90 mt-4 leading-relaxed max-w-md">
                                    Join thousands of successful students who have transformed their careers through our expert-led programs.
                                </p>
                            </div>


                            {/* Feature bullets */}
                            <div className="space-y-4 mt-auto">

                                <div className="flex items-center gap-3 animate-fade-in animation-delay-500">
                                    <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-white/90">Industry-recognized certifications</span>
                                </div>


                                <div className="flex items-center gap-3 animate-fade-in animation-delay-700">
                                    <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-white/90">Flexible learning schedules</span>
                                </div>


                                <div className="flex items-center gap-3 animate-fade-in animation-delay-1000">
                                    <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-white/90">1-on-1 career coaching</span>
                                </div>

                            </div>


                        </div>


                    </div>

                    {/* Right side - Form */}
                    <div className="bg-white p-8 md:p-12 relative z-10 overflow-hidden">

                        <div className="max-w-md mx-auto">


                            <div className="mb-8 animate-fade-in">
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-2">Get Your Free Consultation</h3>
                                <p className="text-gray-600">Fill out this short form to start your learning journey.</p>
                            </div>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="animate-fade-in animation-delay-300">
                                                <FormLabel className="text-gray-700 font-medium">Full Name</FormLabel>
                                                <FormControl>
                                                    <div className="relative group">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-orange-500 transition-colors">
                                                            <User className="h-5 w-5" />
                                                        </span>
                                                        <Input
                                                            placeholder="John Doe"
                                                            {...field}
                                                            className="pl-10 border-gray-200 bg-gray-50 focus-visible:ring-orange-500 h-12 rounded-xl text-gray-800 shadow-sm hover:border-orange-200 transition-all"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="animate-fade-in animation-delay-500">
                                                <FormLabel className="text-gray-700 font-medium">Email Address</FormLabel>
                                                <FormControl>
                                                    <div className="relative group">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-orange-500 transition-colors">
                                                            <Mail className="h-5 w-5" />
                                                        </span>
                                                        <Input
                                                            placeholder="johndoe@example.com"
                                                            {...field}
                                                            className="pl-10 border-gray-200 bg-gray-50 focus-visible:ring-orange-500 h-12 rounded-xl text-gray-800 shadow-sm hover:border-orange-200 transition-all"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem className="animate-fade-in animation-delay-700">
                                                <FormLabel className="text-gray-700 font-medium">Phone Number</FormLabel>
                                                <FormControl>
                                                    <div className="relative group">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-orange-500 transition-colors">
                                                            <Phone className="h-5 w-5" />
                                                        </span>
                                                        <Input
                                                            placeholder="(123) 456-7890"
                                                            {...field}
                                                            className="pl-10 border-gray-200 bg-gray-50 focus-visible:ring-orange-500 h-12 rounded-xl text-gray-800 shadow-sm hover:border-orange-200 transition-all"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="course"
                                        render={({ field }) => (
                                            <FormItem className="animate-fade-in animation-delay-900">
                                                <FormLabel className="text-gray-700 font-medium">Course of Interest</FormLabel>
                                                <FormControl>
                                                    <div className="relative group">
                                                        <select
                                                            className="w-full pl-10 h-12 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 appearance-none outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-200 pr-10 shadow-sm"
                                                            {...field}
                                                        >
                                                            <option disabled value="">Select a course</option>
                                                            <option value="workspace-essentials">Workspace Essentials</option>
                                                            <option value="professional-excellence">Professional Excellence</option>

                                                        </select>
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-orange-500 transition-colors">
                                                            <GraduationCap className="h-5 w-5" />
                                                        </span>
                                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                            <ChevronRight className="h-4 w-4 rotate-90" />
                                                        </span>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        className="w-full mt-8 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 animate-fade-in animation-delay-1100 btn-shine overflow-hidden font-semibold text-base"
                                    >
                                        <span className="relative flex items-center gap-2">
                                            Request Free Consultation
                                        </span>
                                    </Button>

                                    <p className="text-center text-xs text-gray-500 mt-6 animate-fade-in animation-delay-1300">
                                        Your data is secure and will only be used to contact you about your inquiry.
                                    </p>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
