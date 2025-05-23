"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const Footer = () => {
    const pathname = usePathname();

    // Function to handle smooth scrolling
    const scrollToSection = (sectionId) => {
        if (pathname !== '/') {
            // If not on homepage, navigate to homepage with section hash
            window.location.href = '/#' + sectionId;
            return;
        }

        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <footer className="bg-gradient-to-b from-black to-gray-900 text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and Description */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Image
                                onClick={()=> window.location.href="https://jimsd.org"}
                                src="/jimslogo.webp" 
                                alt="JIMS Logo" 
                                width={50} 
                                height={50}
                                className="rounded-full"
                            />
                            <Link href={"https://jimsd.org"} className="text-lg font-bold font-monot">CYNET</Link>
                        </div>
                        <Link href={"https://jimsd.org"} target={"_blank"} className="text-gray-400 mb-4 font-poppins">
                            The flagship Annual IT Fest of JIMS Vasant Kunj, celebrating technology, 
                            innovation, and creativity.
                        </Link>
                        <div className="flex space-x-4">
                            <Link href="https://www.instagram.com/enigma.jimsvk?igsh=MWUxa3E3aGt4eHRydw==" target="_blank" className="hover:text-pink-500 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </Link>
                            <Link href="https://www.linkedin.com/company/enigma-it-club-jims-vk/" target="_blank" className="hover:text-blue-500 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                            </Link>
                            <Link href="mailto:contact@cynet.com" className="hover:text-red-500 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 font-monot">Quick Links</h4>
                        <ul className="space-y-2 font-poppins">
                            <li>
                                <button 
                                    onClick={() => scrollToSection('events')}
                                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    Events
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => scrollToSection('about')}
                                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    About Us
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => scrollToSection('our-team')}
                                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                                >
                                    Our Team
                                </button>
                            </li>
                            <li>
                                <Link href="/register-for-events" className="text-gray-400 hover:text-white transition-colors">
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 font-monot">Contact Us</h4>
                        <div className="space-y-3 font-poppins">
                            <Link href={"https://jimsd.org"} target={"_blank"} className="text-gray-400">
                                JIMS Vasant Kunj
                                <br />
                                New Delhi, India
                            </Link>
                            <p className="text-gray-400">
                                <a href="tel:+917011880354" className="hover:text-white transition-colors">
                                    +91 7011880354
                                </a>
                            </p>
                            <p className="text-gray-400">
                                <a href="tel:+918920900097" className="hover:text-white transition-colors">
                                    +91 8920900097
                                </a>
                            </p>
                            <p className="text-gray-400">
                                <a href="mailto:itclub.vk@jimsd.org" className="hover:text-white transition-colors">
                                itclub.vk@jimsd.org
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-400 font-poppins">
                            © {new Date().getFullYear()} CYNET. All rights reserved.
                        </p>
                        <p className="text-sm text-gray-400 mt-2 md:mt-0 font-poppins">
                            Website Developed by Enigma IT Club
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
