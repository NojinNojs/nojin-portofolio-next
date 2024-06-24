import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Anime List',
    description: 'Search for anime you want to watch.',
    image: '/ss-animelist.png',
    link: 'https://horizonn.nojin.site/'
  },
  {
    title: 'Re-create Sitara',
    description: 'Recreation of the official Sitara.tapera.go.id website.',
    image: '/ss-sitara.png',
    link: 'https://sitara.tapera.nojin.site/'
  },
  {
    title: 'Luminous Shop',
    description: 'An e-commerce website.',
    image: '/ss-ecommerce.png',
    link: 'https://shop.nojinjourney.com/'
  },
  {
    title: 'Card',
    description: 'A Linktree alternative.',
    image: '/ss-card.png',
    link: 'https://card.nojin.site/'
  },
  // Add more projects here
];

const Projects = () => (
  <section id="projects" className="container mx-auto py-20 px-4 md:px-0">
    <h2 className="text-4xl font-bold mb-8 text-center">My Projects</h2>
    <div className="flex flex-wrap justify-center gap-8">
      {projects.map((project, index) => (
        <div
          key={index}
          className="relative card glasseffect shadow-xl cursor-pointer w-full sm:w-72 md:w-80 lg:w-96"
        >
          <figure className="overflow-hidden flex items-center justify-center h-60">
            <img src={project.image} alt={project.title} className="object-cover w-full h-full transition-all duration-300" />
          </figure>
          <div className="card-body p-4">
            <h2 className="card-title text-white">{project.title}</h2>
            <p className="text-white">{project.description}</p>
            <div className="card-actions justify-end">
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                View Project
              </motion.a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Projects;