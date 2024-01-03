import React from 'react';
import logo from "../../assets/logo.png"
import { Link as ScrollLink } from 'react-scroll';
import { NavbarLinks } from '../../data/navbarLinks';

const Footer = () => {
  return (
    <footer className="bg-indigo-500 text-white py-20 mt-20 text-white-25 font-semibold">
      <div className="container mx-auto grid sm:grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Column 1 */}
        <div className='flex flex-col lg:items-start gap-3 items-center'>
            <img src={logo} loading='lazy' alt='Hireup logo' className='h-16 w-20 rounded-full'/>
            <h3 className="text-xl font-bold uppercase">HireUp</h3>
          <p className='text-base max-w-[300px]'>Making Hiring easy for content creators.</p>
        </div>

          {/* Column 2 */}
         <div className='lg:flex lg:justify-between grid grid-cols-2 lg:gap-16 gap-8'>
          <div className='lg:flex flex-col gap-2 place-content-end grid'>
              <h3 className="text-lg font-bold mb-4">Menu</h3>
              {NavbarLinks.map((link, index) => (
                <p key={index} className='cursor-pointer'>
                  <ScrollLink
                    to={link.path}
                    smooth={true}
                    duration={1000}
                    offset={-70}
                    spy={true}
                    exact="true"
                    activeClass="active"
                  >
                    {link.title}
                  </ScrollLink>
                </p>
              ))} 
            </div>
            
            <div className='flex flex-col gap-2'>
              <h3 className="text-lg font-bold mb-4">Services</h3>
                <a href="#PrivacyPolicy">Privacy Policy</a> 
                <a href="#TermOfuse">Term of use</a>  
                
            </div>
         </div>

        {/* Column 3 */}
        <div className='flex flex-col gap-2 sm:items-center md:items-center'>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p>Email: support@hireup.com</p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-16">
        <p> Copyright &copy; 2023 HireUp. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
