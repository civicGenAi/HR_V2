import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className='bg-gray-900 text-white py-12 px-6 sm:px-20 mt-10'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'>
        {/* About */}
        <div>
          <h2 className='text-xl font-semibold mb-4'>CareerNamimi</h2>
          <p className='text-sm text-gray-400'>
            Empowering job seekers and employers across Africa with modern,
            accessible, and intelligent hiring solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
          <ul className='space-y-2 text-sm text-gray-300'>
            <li>
              <a href='/jobs' className='hover:underline'>
                Find Jobs
              </a>
            </li>
            <li>
              <a href='/post-job' className='hover:underline'>
                Post a Job
              </a>
            </li>
            <li>
              <a href='/about' className='hover:underline'>
                About Us
              </a>
            </li>
            <li>
              <a href='/contact' className='hover:underline'>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Contact</h3>
          <ul className='space-y-2 text-sm text-gray-300'>
            <li className='flex items-center gap-2'>
              <MapPin size={16} /> Arusha, Tanzania
            </li>
            <li className='flex items-center gap-2'>
              <Phone size={16} /> +255 617 287 760/673 045 414
            </li>
            <li className='flex items-center gap-2'>
              <Mail size={16} /> info@careernamimi.com
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Join Our Community</h3>
          <div className='flex gap-4'>
            <a
              href='https://facebook.com'
              target='_blank'
              rel='noreferrer'
              className='hover:text-[#FE047F]'>
              <Facebook />
            </a>
            <a
              href='https://x.com/careernamimi'
              target='_blank'
              rel='noreferrer'
              className='hover:text-[#FE047F]'>
              <Twitter />
            </a>
            <a
              href='www.linkedin.com/in/careernamimi'
              target='_blank'
              rel='noreferrer'
              className='hover:text-[#FE047F]'>
              <Linkedin />
            </a>
            <a
              href='https://www.instagram.com/careernamimi'
              target='_blank'
              rel='noreferrer'
              className='hover:text-[#FE047F]'>
              <Instagram />
            </a>
            <a
              href='https://www.youtube.com/channel/UCd9GsfuFDNL36bNVoOPp-Zg'
              target='_blank'
              rel='noreferrer'
              className='hover:text-[#FE047F]'>
              <Youtube />
            </a>
          </div>
        </div>
      </div>

      <div className='border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500'>
        &copy; {new Date().getFullYear()} CareerNamimi. All rights reserved.
      </div>
    </footer>
  );
}
