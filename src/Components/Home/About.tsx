import { Link } from 'react-router-dom';
import BlurFade from '../ui/blur-fade';
import styled from 'styled-components';

export default function About() {
    return (


        <>

            <main className=" px-0 md:px-32 py-5 min-h-screen">

                <BlurFade delay={0.25} duration={0.5} inView className='w-full flex justify-center items-center'>

                    <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[80px] w-full max-w-7xl p-2">

                        {/* Left Section: Images */}
                        <div className="lg:col-span-5 md:col-span-6">

                            <div className="grid grid-cols-12 gap-6 items-center">
                                <div className="col-span-6">
                                    <div className="grid grid-cols-1 gap-6">
                                        <img
                                            src="https://jobstack-shreethemes.vercel.app/static/media/ab03.2b6e24b09b3690407ec5.jpg"
                                            loading="lazy"
                                            alt="Professional Woman"
                                            className="shadow rounded-md"
                                        />
                                        <img
                                            src="https://jobstack-shreethemes.vercel.app/static/media/ab02.f851a3dde08585493f97.jpg"
                                            loading="lazy"
                                            alt="Smiling Woman"
                                            className="shadow rounded-md"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <div className="grid grid-cols-1 gap-6">
                                        <img
                                            src="https://jobstack-shreethemes.vercel.app/static/media/ab01.016884c7bf778010e79c.jpg"
                                            loading="lazy"
                                            alt="Conference Room"
                                            className="shadow rounded-md"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Right Section: Text and CTA */}
                        <div className="lg:col-span-7 md:col-span-6">

                            <div className="text-center md:text-left">

                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-7 sm:mb-4">
                                    Get The Job of your Dreams <br /> Quick & Easy.
                                </h1>


                                <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-600 mb-6 text-md">
                                    <p>“Empowering Students: Bridging Education with Real-World Experience”</p>
                                    <p>Our mission is to make students independent, responsible, and equipped with practical exposure
                                        while learning. By connecting them with meaningful gigs, we aim to reduce the gap between
                                        academic knowledge and real-world skills, preparing them for a smarter future.
                                    </p>
                                </blockquote>



                                <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-600 mb-6 text-md">
                                    <p>“Our Vision: Empowering India’s Students”</p>
                                    <p>We aim to bridge the gap between academic learning and practical application
                                        by providing students with opportunities that enhance their independence,
                                        responsibility, and readiness for the workforce.
                                    </p>
                                </blockquote>



                                <StyledWrapper>
                                    <Link to={'/contact'}>
                                        <button className="learn-more">
                                            <span className="circle" aria-hidden="true">
                                                <span className="icon arrow" />
                                            </span>
                                            <span className="button-text">Contact Us</span>
                                        </button>
                                    </Link>
                                </StyledWrapper>

                            </div>

                        </div>
                    </div>

                </BlurFade>


                <BlurFade delay={0.25 * 2} duration={0.5} inView>

                    <section className="sm:pt-32 py-12 px-2 sm:px-0">

                        <div className="relative max-w-screen-xl mx-auto px-4 md:text-center md:px-8 border border-gray-200 p-10 shadow-md">

                            <div className="max-w-xl md:mx-auto">
                                <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                                    Explore Your job now!
                                </h3>
                                <p className="mt-3 text-gray-600">
                                    Explore a wide range of job opportunities tailored to your skills and interests. Browse by industry, location, or role, and discover positions that match your career goals
                                </p>
                            </div>


                            <div className="flex gap-3 items-center mt-4 md:justify-center">
                                <Link to={'/jobfilter'} className="inline-block py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg shadow-md hover:shadow-none">
                                    Apply Now
                                </Link>
                                <a  className="inline-block py-2 px-4 text-gray-800 font-medium duration-150 border hover:bg-gray-50 active:bg-gray-100 rounded-lg">
                                    Learn more
                                </a>
                            </div>

                            <div className="hidden sm:block h-32 w-32 text-gray-600 absolute a-z-10 top-5">
                                <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='b' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.5) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='none' /><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' stroke-width='1' stroke='none' fill='currentColor' /></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#b)' /></svg>
                            </div>

                            <div className="hidden sm:block h-32 w-32 text-gray-600 absolute a-z-10  right-5 bottom-5">
                                <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='b' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.5) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='none' /><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' stroke-width='1' stroke='none' fill='currentColor' /></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#b)' /></svg>
                            </div>


                        </div>

                    </section>


                </BlurFade>

            </main>


        </>



    )
}



const StyledWrapper = styled.div`
  button {
   position: relative;
   display: inline-block;
   cursor: pointer;
   outline: none;
   border: 0;
   vertical-align: middle;
   text-decoration: none;
   background: transparent;
   padding: 0;
   font-size: inherit;
   font-family: inherit;
  }

  button.learn-more {
   width: 12rem;
   height: auto;
  }

  button.learn-more .circle {
   transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
   position: relative;
   display: block;
   margin: 0;
   width: 3rem;
   height: 3rem;
   background: #000;
   border-radius: 1.625rem;
  }

  button.learn-more .circle .icon {
   transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
   position: absolute;
   top: 0;
   bottom: 0;
   margin: auto;
   background: #fff;
  }

  button.learn-more .circle .icon.arrow {
   transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
   left: 0.625rem;
   width: 1.125rem;
   height: 0.125rem;
   background: none;
  }

  button.learn-more .circle .icon.arrow::before {
   position: absolute;
   content: "";
   top: -0.29rem;
   right: 0.0625rem;
   width: 0.625rem;
   height: 0.625rem;
   border-top: 0.125rem solid #fff;
   border-right: 0.125rem solid #fff;
   transform: rotate(45deg);
  }

  button.learn-more .button-text {
   transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   padding: 0.75rem 0;
   margin: 0 0 0 1.85rem;
   color: #282936;
   font-weight: 700;
   line-height: 1.6;
   text-align: center;
   text-transform: uppercase;
  }

  button:hover .circle {
   width: 100%;
  }

  button:hover .circle .icon.arrow {
   background: #fff;
   transform: translate(1rem, 0);
  }

  button:hover .button-text {
   color: #fff;
  }`;
