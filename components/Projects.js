import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Anime List',
    description: 'Search for anime you want to watch.',
    image: 'https://media.discordapp.net/attachments/1075624019988058172/1254078062900023339/image.png?ex=66782eb5&is=6676dd35&hm=d51985ea6c46f1c4fb0df241fc6a019d853ca456e07338ec5c7531fdba5ba942&=&format=webp&quality=lossless&width=889&height=556',
    link: 'https://horizonn.nojin.site/'
  },
  {
    title: 'Re-create Sitara',
    description: 'Recreation of the official Sitara.tapera.go.id website.',
    image: 'https://media.discordapp.net/attachments/1075624019988058172/1254078063172517898/image.png?ex=66782eb5&is=6676dd35&hm=29e84efef39347ae61c1d38b386ccade0279e27bcd154c0e9b20582bd5ec04cd&=&format=webp&quality=lossless&width=889&height=556',
    link: 'https://sitara.tapera.nojin.site/'
  },
  {
    title: 'Luminous Shop',
    description: 'An e-commerce website.',
    image: 'https://media.discordapp.net/attachments/1075624019988058172/1254078063457599559/image.png?ex=66782eb5&is=6676dd35&hm=70c7a295ba5681752e9c69846cb5dfba5a40f6c508185181458e2884e62abe68&=&format=webp&quality=lossless&width=889&height=556',
    link: 'https://shop.nojinjourney.com/'
  },
  {
    title: 'Card',
    description: 'A Linktree alternative.',
    image: 'https://media.discordapp.net/attachments/1075624019988058172/1254078063709392926/image.png?ex=66782eb6&is=6676dd36&hm=2d770b2d1d9b0935baa90a93c25fceec7a0866e40ef8d7b109f5d10d7d3a9edc&=&format=webp&quality=lossless&width=889&height=556',
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