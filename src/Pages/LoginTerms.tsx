export default function StudentTerms() {

    return (

        <div className="flex justify-center items-center min-h-screen py-12">

            <div className="max-w-7xl mx-auto px-4 pb-8 pt-28 bg-white">


                <div className="mb-8 text-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Terms & Conditions for Students (Job Seekers) – StudentsGigs.com</h1>
                    <p className="text-gray-600 mt-2">(Effective Date: {new Date().toLocaleDateString()})</p>
                </div>

                <div className="space-y-8">
                    {/* Section 1 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">1. General Terms</h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>By registering on StudentsGigs.com, you agree to abide by these terms and conditions.</li>
                            <li>StudentsGigs.com serves as a platform connecting students with job opportunities and does not guarantee job placement or employer credibility.</li>
                            <li>StudentsGigs.com is not responsible for salary payments, workplace conditions, or employer actions.</li>
                            <li>Your account may be suspended if found violating these terms.</li>
                        </ul>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Job Application & Workplace Conduct</h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>You must provide accurate details in your profile and job applications.</li>
                            <li>You must not misrepresent your skills, experience, or qualifications.</li>
                            <li>You are expected to maintain professionalism at all times in the workplace.</li>
                            <li>If an employer asks you to perform illegal, unethical, or unsafe tasks, you must report it to authorities and avoid the job.</li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Salary, Payments & Disputes</h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>StudentsGigs.com is not responsible for salary payments, deductions, or delays.</li>
                            <li>Employers are directly responsible for paying students for their work.</li>
                            <li>In case of non-payment, the student must resolve the issue with the employer.</li>
                            <li>StudentsGigs.com does not guarantee employer compliance in making payments.</li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Workplace Conditions & Safety</h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>StudentsGigs.com does not verify the safety, legality, or working conditions of jobs.</li>
                            <li>You are advised to research the employer and workplace before accepting a job.</li>
                            <li>If you face harassment, discrimination, or unsafe conditions, you should report it to the authorities immediately.</li>
                            <li>StudentsGigs.com is not liable for any physical, emotional, or legal harm experienced at a workplace.</li>
                        </ul>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Privacy & Data Protection</h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Your contact details must only be shared for job-related purposes.</li>
                            <li>Employers are prohibited from misusing your personal data, but StudentsGigs.com cannot guarantee their compliance.</li>
                            <li>Do not share login credentials or personal details with third parties.</li>
                        </ul>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Termination of Account</h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>Your account may be suspended or banned for any of the following:
                                <ul className="list-disc pl-6 mt-2 space-y-1">
                                    <li>Providing false information in your profile.</li>
                                    <li>Misbehaving with employers, staff, or co-workers.</li>
                                    <li>Engaging in fraudulent activities using the platform.</li>
                                    <li>Using the platform for non-job-related purposes.</li>
                                </ul>
                            </li>
                        </ul>
                    </section>

                    {/* Section 7 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Legal Disclaimer</h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>StudentsGigs.com is a platform provider and is not responsible for employer actions, payments, or workplace conditions.</li>
                            <li>Students must do their due diligence before accepting jobs.</li>
                            <li>Any disputes must be resolved between the student and employer.</li>
                        </ul>
                    </section>

                    {/* Section 8 */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Agreement & Acknowledgment</h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>By registering, you agree to these terms and acknowledge that StudentsGigs.com is not responsible for employment-related disputes.</li>
                            <li>Click "Agree" to continue using the platform.</li>
                        </ul>
                    </section>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-200 text-center text-gray-600 italic">
                    <p>Note: These terms and conditions are designed to protect both students and employers, ensuring a fair and safe environment on StudentsGigs.com.</p>
                </div>

            </div>
            
        </div>
    );
}