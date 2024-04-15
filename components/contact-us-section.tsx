import React from "react";
import { Logo } from "./logo";
import {
  Facebook,
  FacebookIcon,
  InstagramIcon,
  Mail,
  Map,
  Phone,
} from "lucide-react";
import Link from "next/link";

const ContactUsSection = () => {
  return (
    <div className="py-12 lg:py-16">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-4 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col justify-center items-start space-y-4">
            <Logo lgSize={true} />
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Contact Us
            </h2>
            <div className="prose prose-gray max-w-[900px]">
              <p>
                If you have any inquiries or would like to know more about our
                publications, please feel free to contact us. We are here to
                assist you on your educational journey.
              </p>
            </div>
          </div>
          <div className="grid max-w-sm gap-2">
            <div className="space-y-1">
              <div className="text-sm font-medium flex gap-x-3">
                <Map size={16} />
                Address :<p>Satungal, Kathmandu, Nepal</p>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium flex gap-x-3">
                <Phone size={16} /> Phone :<p> 1 431 3205</p>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-medium flex gap-x-3">
                <Mail size={16} /> Email :<p>info@swarnimpublication.com</p>
              </div>
            </div>{" "}
            <div className="space-y-1">
              <div className="text-sm font-medium flex gap-x-3">
                <Link
                  href={"https://www.facebook.com/swarnimpublication/"}
                  target="_blank"
                  className="w-8 h-8 rounded-lg bg-blue-500 text-white border-gray-200 dark:border-gray-900 border-2 flex items-center justify-center"
                >
                  <FacebookIcon size={16} />
                </Link>{" "}
                <div className="w-8 h-8 rounded-lg bg-[#962fbf] text-white border-gray-200 dark:border-gray-900 border-2 flex items-center justify-center">
                  <InstagramIcon size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsSection;
