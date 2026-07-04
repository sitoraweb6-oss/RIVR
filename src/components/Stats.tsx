import { motion } from 'motion/react';

export default function Stats() {
  const statsData = [
    { title: 'Total Value Locked', value: '$420.5M' },
    { title: '24H Volume', value: '$54.2M' },
    { title: 'Total Users', value: '125K+' },
    { title: 'RIVR Staked', value: '85.4%' },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="stats" className="w-full max-w-[1536px] mx-auto px-6 py-16 md:py-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
      >
        {statsData.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="flex flex-col relative pl-4 md:pl-6 border-l border-[rgba(30,50,90,0.15)] group hover:border-[rgba(30,50,90,0.4)] transition-colors"
          >
            <span className="text-[11px] md:text-[12px] font-semibold text-[rgba(30,50,90,0.55)] uppercase tracking-widest mb-1.5">
              {stat.title}
            </span>
            <span className="text-4xl md:text-5xl lg:text-6xl font-light text-[rgba(30,50,90,0.9)] tracking-tight font-sans transition-all group-hover:translate-x-1 duration-300">
              {stat.value}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
