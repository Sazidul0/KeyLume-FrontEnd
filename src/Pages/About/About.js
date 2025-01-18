import React, { useEffect } from 'react';
import './About.css';
import avaterImg from '../../images/mf-avatar.svg';
import webImg from '../../images/hero.svg';
import webDevImg from '../../images/webdev.svg';
import cyberSecurityImg from '../../images/cyberSec.png';
import mobileDev from '../../images/mobileDev.png';
import { motion, useAnimation } from "framer-motion"
import { useInView } from 'react-intersection-observer'


const About = () => {


    const Card = ({ title, description, languages, tools, contact, imgSrc }) => {
        const { ref, inView } = useInView({
            threshold: 0,
        });
        const animation = useAnimation();

        useEffect(() => {
            if (inView) {
                animation.start({
                    scale: 1,
                    transition: {
                        type: 'spring', duration: 1, bounce: 0.3
                    }
                });
            } else {
                animation.start({ scale: 0.9 });
            }
        }, [inView, animation]);

        return (
            <motion.div
                ref={ref}
                className="card w-96 bg-base-100 shadow-xl mx-auto my-4 "
                animate={animation}
            >
                <figure><img className='w-100 mt-8' src={imgSrc} alt={title} /></figure>
                <div className="card-body text-center">
                    <h2 className="card-title flex justify-center text-2xl">{title}</h2>
                    <p>{description}</p>

                    <p className='text-blue-500 mt-5'>Languages I speak:</p>
                    <p>{languages}</p>

                    <p className='text-blue-500 mt-5'>Tools:</p>
                    <p>{tools}</p>

                    <p className='text-blue-500 mt-5'>Contact:</p>
                    <p>Email: <small>{contact}</small></p>
                </div>
            </motion.div>
        );
    };


    return (
        <motion.div
            animate={{ x: 0 }}
            initial={{ x: -100 }}
        >
            <h2 className='protfolio-heading mt-10 flex justify-center'>Web Developer | App Developer | Cyber Security Specialist</h2>
            <div className='body-container'>
                <p className='flex justify-center'>I design and code beautifully simple things, and I love what I do.</p>
                <div className="card w-48  mx-auto my-10">
                    <figure><img src={avaterImg} alt="Avater" /></figure>
                </div>

                <div className='flex justify-center'>
                    <figure><img className='w-100' src={webImg} alt="Web" /></figure>
                </div>


                <div className='' >
                    <div className='text-center bg-blue-500 pt-16  text-white pb-8'>
                        <div className='card w-3/4 lg:w-1/2 mx-auto'>
                            <h3 className='text-xl'>Hi, I’m Sazidul. Nice to meet you.</h3>
                            <p>
                                I am an Engineering student specializing in Computer Science and Engineering (CSE). With a passion for technology, I am quietly confident and naturally curious, always eager to learn and explore new challenges. I enjoy crafting seamless user experiences as a Web Developer, building intuitive mobile applications, and ensuring robust security measures as a Cyber Security Specialist. I am dedicated to continuously improving my skills and tackling design and development problems, striving to create innovative solutions that make a difference.
                            </p>
                        </div>
                    </div>




                    <div className='lg:relative lg:mb-96'>
                        <div className=' bg-blue-500 pb-40 mb-10'>

                        </div>
                        <div className="flex flex-wrap justify-center ">
                            <div className='lg:absolute -top-1'>
                                <Card
                                    title="Web Developer"
                                    description="I like to code things from scratch, and enjoy bringing ideas to life in the browser."
                                    languages="HTML, CSS, Javascript"
                                    tools="Bootstrap, Tailwind, Firebase, MongoDB, NodeJs"
                                    contact="sazidulislam.mail@gmail.com"
                                    imgSrc={webDevImg}
                                />
                            </div>
                            <div className='lg:absolute -top-1 left-11'>
                                <Card
                                    title="Mobile App Developer"
                                    description="I build beautiful and functional mobile applications using Flutter."
                                    languages="Dart, Java, Swift"
                                    tools="Flutter, Firebase, REST APIs"
                                    contact="your_email@example.com"
                                    imgSrc={mobileDev}
                                />
                            </div>
                            <div className='lg:absolute -top-1 right-11'>
                                <Card
                                    title="Cyber Security Specialist"
                                    description="I ensure the security of systems and networks using various tools."
                                    languages="Python, Bash, JavaScript"
                                    tools="Wazuh, Metasploit, Nmap, Burp Suite"
                                    contact="your_email@example.com"
                                    imgSrc={cyberSecurityImg}
                                />
                            </div>
                        </div>
                    </div>








                </div>





            </div>
        </motion.div>
    );
};

export default About;

