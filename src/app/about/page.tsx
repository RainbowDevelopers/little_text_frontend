'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import Card from '@/components/ui/Card';
import { BookOpen, Users, Target, Heart, Zap, Shield } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Quality First',
    description:
      'Every article is thoroughly researched, carefully written, and meticulously edited to ensure the highest quality content.',
  },
  {
    icon: Heart,
    title: 'Reader-Focused',
    description:
      'Our readers come first. We write with clarity, respect their time, and deliver value in every piece we publish.',
  },
  {
    icon: Zap,
    title: 'Timeless Design',
    description:
      'We embrace minimalism and timeless design principles, ensuring our content remains accessible and beautiful.',
  },
  {
    icon: Shield,
    title: 'Continuous Learning',
    description:
      "We're committed to growth, constantly improving our craft and staying curious about the world around us.",
  },
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & Editor-in-Chief',
    bio: 'Former journalist with 15+ years of experience in digital publishing.',
  },
  {
    name: 'Michael Chen',
    role: 'Lead Writer',
    bio: 'Award-winning author specializing in technology and culture.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Creative Director',
    bio: 'Designer passionate about creating beautiful, user-centered experiences.',
  },
  {
    name: 'David Kim',
    role: 'Senior Editor',
    bio: 'Editor with expertise in long-form content and narrative storytelling.',
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-900 dark:to-black py-20 md:py-32 lg:py-40">
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
                About Us
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-6 leading-tight"
            >
              Stories Worth Reading
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8"
            >
              We craft thoughtful content that inspires, informs, and makes a
              lasting impact.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto"
            >
              In a world of information overload, we focus on quality over
              quantity. Each piece is crafted with intention, combining
              thoughtful research with clear, accessible writing.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-6">
                Our Mission
              </h2>
              <div className="space-y-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  We believe in the power of well-crafted stories. Every piece
                  we publish is thoughtfully written, carefully edited, and
                  designed to provide value to our readers.
                </p>
                <p>
                  In a world of endless content, we champion depth over brevity,
                  substance over sensationalism. Our commitment is to create a
                  space where ideas can breathe, where nuance is celebrated, and
                  where readers can trust what they are reading.
                </p>
                <p>
                  Our goal is simple: deliver content that matters, in a format
                  that is easy to read and beautiful to experience.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <BookOpen className="w-24 h-24 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      Mission Image Placeholder
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-4">
              What We Stand For
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our core values guide everything we do, from content creation to
              community building.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card padding="lg" className="h-full hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-black dark:bg-gray-950 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white mb-3">
                          {value.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Passionate storytellers dedicated to bringing you the best content
              every day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card padding="lg" className="text-center h-full">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-3 uppercase tracking-wider">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

