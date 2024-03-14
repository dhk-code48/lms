import React from "react";

const ContactUsSection = () => {
  return (
    <div className="py-12 lg:py-16">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-4 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Contact Us
            </h2>
            <div className="prose prose-gray max-w-[900px]">
              <p>
                If you have any inquiries or would like to know more about our publications, please
                feel free to contact us. We are here to assist you on your educational journey.
              </p>
            </div>
          </div>
          <div className="grid max-w-sm gap-2">
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Address</h3>
              <p>Lamachaur - 16, Pokhara, Nepal</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Phone</h3>
              <p>+977 61-440476</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Email</h3>
              <p>info@swarnimpublication.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsSection;
