import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';

const BirthdayPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    wish: '',
    email: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, wish, email, date } = formData;

    if (!name || !wish || !email || !date) {
      toast.error('Please fill in all fields!');
      return;
    }

    // Prepare EmailJS parameters
    const emailParams = {
      to_name: name,
      message: wish,
      user_email: email,
      date,
    };

    // Send email using EmailJS
    emailjs
      .send(
        'service_ptwi5xf', // Replace with your EmailJS service ID
        'template_d77yt2p', // Replace with your EmailJS template ID
        emailParams,
        'uNQTqUtcbqd8iCvSy' // Replace with your EmailJS public key
      )
      .then(
        (response) => {
          toast.success('Birthday email scheduled successfully!');
          setFormData({ name: '', wish: '', email: '', date: '' }); // Reset form
        },
        (error) => {
          toast.error('Failed to schedule email. Please try again.');
          console.error('EmailJS Error:', error);
        }
      );
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Schedule a Birthday Wish</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name of the Person
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="Enter the person's name"
          />
        </div>

        {/* Wish Input */}
        <div>
          <label htmlFor="wish" className="block text-sm font-medium text-gray-700">
            Birthday Wish
          </label>
          <textarea
            id="wish"
            name="wish"
            value={formData.wish}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="Write your birthday wish"
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="Enter the email address"
          />
        </div>

        {/* Date Input */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Birthday Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Schedule Wish
          </button>
        </div>
      </form>
    </div>
  );
};

export default BirthdayPage;
