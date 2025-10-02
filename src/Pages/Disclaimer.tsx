import React from "react";




const Disclaimer: React.FC = () => {


    // Scroll to top when page is loaded
    window.scrollTo({ top: 0, behavior: 'smooth', });


    return (


        <section className="min-h-screen py-16 px-4 sm:px-8 lg:px-16">


            <div className="max-w-7xl mx-auto bg-white p-6 sm:p-10">


                {/* Header */}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">
                    Disclaimer
                </h1>


                <p className="text-sm text-gray-500 mb-6 text-center">February 28, 2025</p>


                {/* Body Content */}
                <div className="space-y-5 text-gray-700 leading-relaxed text-justify">

                    <p>
                        The information provided on the{" "}
                        <a
                            href="https://www.studentsgigs.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800"
                        >
                            StudentsGigs website
                        </a>{" "}
                        and mobile application (collectively referred to as the “Platform”)
                        is intended for general informational purposes only. StudentsGigs is
                        an initiative of Medresearch India Pvt. Ltd., headquartered at
                        RKP/569H, Usha Building, Parammal Road, Ramanattukara, Kozhikode,
                        Kerala, India. PIN 673633. By using our Platform, you acknowledge and
                        agree to the terms of this disclaimer.
                    </p>

                    <p>
                        While we strive to ensure that the information available on the
                        Platform is accurate, up-to-date, and reliable, StudentsGigs makes
                        no representations or warranties of any kind, express or implied,
                        about the completeness, accuracy, reliability, suitability, or
                        availability of the information, services, job listings, or related
                        graphics contained on the Platform. Any reliance you place on such
                        information is strictly at your own risk.
                    </p>

                    <p>
                        StudentsGigs acts solely as an intermediary platform connecting
                        students, job seekers, and service providers with potential
                        employers or task creators. We do not guarantee the authenticity,
                        quality, legality, or safety of any jobs, projects, or services
                        posted on the Platform. StudentsGigs does not take responsibility
                        for verifying the identity, background, or legitimacy of users,
                        employers, or businesses posting opportunities. Users are strongly
                        encouraged to conduct their own due diligence before entering into
                        any agreements, transactions, or engagements.
                    </p>

                    <p>
                        In no event shall StudentsGigs or Medresearch India Pvt. Ltd. be
                        liable for any loss or damage, including but not limited to direct,
                        indirect, incidental, consequential, or punitive damages, arising
                        out of or in connection with the use of the Platform, including but
                        not limited to, reliance on information, loss of data, financial
                        losses, or personal injury resulting from interactions with other
                        users.
                    </p>

                    <p>
                        The Platform may contain links to third-party websites or
                        applications. These external links are provided solely for
                        convenience and informational purposes. StudentsGigs has no control
                        over the content, privacy practices, or accuracy of information on
                        such websites and accepts no responsibility or liability for any
                        damages or issues arising from their use.
                    </p>

                    <p>
                        StudentsGigs does not provide any guarantees regarding employment,
                        job security, project completion, or payments between users. All
                        transactions, negotiations, and communications are solely between
                        the parties involved. Users are responsible for complying with
                        applicable laws, including labor laws, tax obligations, and
                        contractual commitments.
                    </p>

                    <p>
                        The Platform, its features, and content are provided “as is” and “as
                        available” without any warranties of any kind. We reserve the right
                        to modify, update, or discontinue any part of the Platform at any
                        time without prior notice.
                    </p>

                    <p>
                        By using the Platform, you agree to indemnify and hold harmless
                        StudentsGigs, Medresearch India Pvt. Ltd., its directors, employees,
                        and partners from any claims, liabilities, damages, costs, or
                        expenses arising from your use of the Platform or violation of these
                        terms.
                    </p>

                    <p>
                        If you have any questions regarding this disclaimer, you may contact
                        us at{" "}
                        <a
                            href="mailto:studentsgigs@gmail.com"
                            className="text-blue-600 underline hover:text-blue-800"
                        >
                            studentsgigs@gmail.com
                        </a>
                        .
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Disclaimer;
