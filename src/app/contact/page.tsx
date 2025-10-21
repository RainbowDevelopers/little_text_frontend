'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import { Input, TextArea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { contactAPI } from '@/lib/api';
import { Mail, Send, Clock, MapPin, Phone, Users, FileText, Lightbulb } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    description: 'hello@littletext.com',
    link: 'mailto:hello@littletext.com',
  },
  {
    icon: Clock,
    title: 'Response Time',
    description: 'Within 24-48 hours',
    link: null,
  },
  {
    icon: MapPin,
    title: 'Location',
    description: 'Remote-first team',
    link: null,
  },
  {
    icon: Phone,
    title: 'Social Media',
    description: 'Follow us on Twitter',
    link: '#',
  },
];

const reasons = [
  {
    icon: Users,
    title: 'Collaborations',
    description: 'Partner with us on content projects and guest contributions.',
  },
  {
    icon: FileText,
    title: 'Press Inquiries',
    description: 'Media requests and press-related questions.',
  },
  {
    icon: Lightbulb,
    title: 'Feedback',
    description: 'Share your thoughts and help us improve.',
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await contactAPI.submit(data);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-900 dark:to-black py-20 md:py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-black dark:bg-gray-950 text-white text-sm font-semibold uppercase tracking-wider rounded-full">
                Contact Us
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-6 leading-tight"
            >
              Let's Talk
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed"
            >
              Have a question, collaboration idea, or just want to say hello? We
              would love to hear from you.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Contact Methods */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card padding="lg" className="text-center h-full hover:shadow-xl transition-shadow">
                    <Icon className="w-10 h-10 text-black dark:text-white mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                      {method.title}
                    </h3>
                    {method.link ? (
                      <a
                        href={method.link}
                        className="text-gray-600 dark:text-gray-400 hover:text-black dark:text-white transition-colors"
                      >
                        {method.description}
                      </a>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">{method.description}</p>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Reasons to Contact */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-4">
              How Can We Help?
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Whether you have a question, feedback, or a collaboration idea, we
              are here to listen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card padding="lg" className="text-center h-full">
                    <div className="w-14 h-14 bg-black dark:bg-gray-950 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white mb-3">
                      {reason.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {reason.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <Container>
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-4">
                Send Us a Message
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
                Fill out the form below and we will get back to you as soon as
                possible.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card padding="lg" className="shadow-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <Input
                    label="Name"
                    placeholder="Your name"
                    {...register('name')}
                    error={errors.name?.message}
                  />

                  {/* Email */}
                  <Input
                    label="Email"
                    type="email"
                    placeholder="your.email@example.com"
                    {...register('email')}
                    error={errors.email?.message}
                  />

                  {/* Subject */}
                  <Input
                    label="Subject"
                    placeholder="What is this about?"
                    {...register('subject')}
                    error={errors.subject?.message}
                  />

                  {/* Message */}
                  <TextArea
                    label="Message"
                    rows={6}
                    placeholder="Tell us more..."
                    {...register('message')}
                    error={errors.message?.message}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full"
                    icon={<Send className="w-5 h-5" />}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                    >
                      <p className="text-green-800 dark:text-green-300 text-center font-medium">
                        Thank you! Your message has been sent successfully. We will get
                        back to you soon.
                      </p>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                    >
                      <p className="text-red-800 dark:text-red-300 text-center font-medium">
                        Oops! Something went wrong. Please try again later or email us
                        directly.
                      </p>
                    </motion.div>
                  )}
                </form>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black dark:bg-gray-950">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Prefer Email?
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed">
              You can reach us directly at{' '}
              <a
                href="mailto:hello@littletext.com"
                className="text-white font-semibold hover:underline"
              >
                hello@littletext.com
              </a>
            </p>
            <Button href="mailto:hello@littletext.com" variant="secondary" size="lg">
              Send Email
            </Button>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
