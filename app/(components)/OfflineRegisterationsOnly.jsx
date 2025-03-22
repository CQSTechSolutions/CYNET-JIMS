"use client";

import React from "react";
import { FaExclamationTriangle, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import Navbar from "@/app/(components)/Navbar";
import Footer from "@/app/(components)/Footer";

const OfflineRegistrationsOnly = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-800 pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-3xl w-full bg-white rounded-lg shadow-xl overflow-hidden border border-green-100 my-12">
          <div className="bg-red-600 p-6 text-white text-center">
            <FaExclamationTriangle className="text-5xl mx-auto mb-4" />
            <h1 className="text-2xl md:text-3xl font-bold">Online Registration Closed</h1>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="mb-8 text-center">
              <p className="text-lg md:text-xl font-semibold mb-4 text-green-800">
                We are now accepting registrations at the venue only
              </p>
              <p className="text-gray-600 mb-6">
                Thank you for your interest in Cynet 2025. Online registration is now closed, 
                but you can still register in person at our registration desk.
              </p>
              <div className="inline-block bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
                <p className="font-medium">On-desk registration is available throughout the event days.</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold mb-4 text-center text-green-700">Visit Us</h2>
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <div className="bg-green-50 p-4 rounded-lg flex-1 shadow-sm">
                  <div className="flex items-center mb-3">
                    <FaMapMarkerAlt className="text-green-600 mr-2 text-xl" />
                    <h3 className="font-semibold text-green-800">Registration Desk</h3>
                  </div>
                  <p className="text-gray-600">
                  JIMS Vasant Kunj
                  OCF Pocket 9, Sector B, Vasant Kunj, New Delhi - 110070
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg flex-1 shadow-sm">
                  <h3 className="font-semibold mb-3 text-green-800">Need Assistance?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <FaPhoneAlt className="text-green-600 mr-2" />
                      <span>+91 70118 80354</span>
                    </li>
                    <li className="flex items-center">
                      <FaEnvelope className="text-green-600 mr-2" />
                      <span>itclub.vk@jimsd.org</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link 
                href="/"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors shadow-sm"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 text-center text-gray-600 text-sm border-t border-green-100">
            <p>For any urgent queries, please contact our support team.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OfflineRegistrationsOnly;
