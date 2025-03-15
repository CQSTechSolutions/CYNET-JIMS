"use client";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import Image from "next/image";
import Navbar from "../(components)/Navbar";
import Footer from "../(components)/Footer";
// import ComingSoon from '../(components)/ComingSoon'
import { sendContactEmail } from "@/actions/contact.action";

const Page = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const toastId = toast.loading("Sending message...");
			const result = await sendContactEmail(new FormData(e.target));

			if (result.success) {
				toast.dismiss(toastId);
				toast.success("Message sent successfully!");
				setFormData({
					name: "",
					email: "",
					subject: "",
					message: "",
				});
			} else {
				toast.dismiss(toastId);
				toast.error(result.message);
			}
		} catch (error) {
			toast.dismiss(toastId);
			toast.error("Failed to send message. Please try again.");
		}
	};

	return (
		<>
			<div className="min-h-screen relative">
				<div className="absolute inset-0">
					<Image
						src="/extra.png"
						alt="Background"
						fill
						className="object-cover"
						quality={100}
					/>
					<div className="absolute inset-0 bg-black/80" />
				</div>

				<div className="relative z-10">
					<Navbar />
					<div className="py-12 px-4 sm:px-6 lg:px-8">
						<Toaster position="top-center" />
						<div className="max-w-6xl mx-auto space-y-12">
							<h1 className="text-4xl text-center text-white mb-12 font-monot">
								Contact Us
							</h1>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								{/* Contact Form */}
								<div className="bg-white/90 rounded-lg shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
									<div className="px-6 py-8">
										<h2 className="text-3xl text-center text-green-700 mb-8 font-monot">
											Send Us a Message
										</h2>

										<form onSubmit={handleSubmit} className="space-y-6">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
												<div>
													<label
														htmlFor="name"
														className="block text-sm font-medium text-gray-700"
													>
														Name
													</label>
													<input
														type="text"
														id="name"
														name="name"
														value={formData.name}
														onChange={handleChange}
														required
														className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
													/>
												</div>

												<div>
													<label
														htmlFor="email"
														className="block text-sm font-medium text-gray-700"
													>
														Email
													</label>
													<input
														type="email"
														id="email"
														name="email"
														value={formData.email}
														onChange={handleChange}
														required
														className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
													/>
												</div>
											</div>

											<div>
												<label
													htmlFor="subject"
													className="block text-sm font-medium text-gray-700"
												>
													Subject
												</label>
												<input
													type="text"
													id="subject"
													name="subject"
													value={formData.subject}
													onChange={handleChange}
													required
													className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
												/>
											</div>

											<div>
												<label
													htmlFor="message"
													className="block text-sm font-medium text-gray-700"
												>
													Message
												</label>
												<textarea
													id="message"
													name="message"
													value={formData.message}
													onChange={handleChange}
													required
													rows={4}
													className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
												/>
											</div>

											<div className="flex justify-center">
												<button
													type="submit"
													className="bg-green-600 text-white py-3 px-8 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105"
												>
													Send Message
												</button>
											</div>
										</form>
									</div>
								</div>

								{/* Map Section */}
								<div className="bg-white/90 rounded-lg shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
									<div className="px-6 py-8">
										<h2 className="text-3xl text-center text-green-700 mb-8 font-monot">
											Our Location
										</h2>
										<div className="mb-6">
											<div className="flex items-center mb-4">
												<FaMapMarkerAlt className="text-2xl text-green-600 mr-3 flex-shrink-0" />
												<p className="text-gray-700">
													JIMS VK, MOR Pocket, Sector-C, Vasant Kunj, New Delhi,
													Delhi 110070
												</p>
											</div>
										</div>
										<div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
											<iframe
												src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.36581910941!2d77.14742627581693!3d28.52872217572162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1d00e93feae5%3A0xbdbecebed2e17592!2sJagannath%20International%20Management%20School%20(JIMS)%20Vasant%20Kunj!5e0!3m2!1sen!2sin!4v1741756415222!5m2!1sen!2sin"
												width="100%"
												height="100%"
												style={{ border: 0 }}
												allowFullScreen=""
												loading="lazy"
												referrerPolicy="no-referrer-when-downgrade"
												className="rounded-lg"
											/>
										</div>
									</div>
								</div>
							</div>

							{/* Contact Info Cards */}
							{/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <FaPhone className="text-2xl text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl text-center text-gray-800 mb-2">Phone</h3>
                <p className="text-center text-gray-600">+91 98765 43210</p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <FaEnvelope className="text-2xl text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl text-center text-gray-800 mb-2">Email</h3>
                <p className="text-center text-gray-600">info@cynet.com</p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6 transform hover:scale-105 transition-all duration-300 md:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <FaClock className="text-2xl text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl text-center text-gray-800 mb-2">Working Hours</h3>
                <p className="text-center text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                <p className="text-center text-gray-600">Sat: 9:00 AM - 2:00 PM</p>
              </div>
            </div> */}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
		// <ComingSoon/>
		// <ContactForm/>
	);
};

export default Page;
