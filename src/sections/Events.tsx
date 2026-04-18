import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Calendar, Ticket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Event {
  id: number;
  city: string;
  state: string;
  date: string;
  venue: string;
  time: string;
  note: string;
}

const events: Event[] = [
  {
    id: 1,
    city: 'Los Angeles',
    state: 'CA',
    date: 'March 15, 2025',
    venue: 'The Hollywood Bowl',
    time: '8:00 PM',
    note: 'Homecoming.',
  },
  {
    id: 2,
    city: 'New York',
    state: 'NY',
    date: 'April 2, 2025',
    venue: 'Madison Square Garden',
    time: '7:30 PM',
    note: 'The city that nearly broke him.',
  },
  {
    id: 3,
    city: 'Miami',
    state: 'FL',
    date: 'April 20, 2025',
    venue: 'American Airlines Arena',
    time: '9:00 PM',
    note: 'Where the heat meets the soul.',
  },
];

interface EventCardProps {
  event: Event;
  index: number;
}

const EventCard = ({ event }: EventCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;

    setTransform(`rotateX(${-rotateX}deg) rotateY(${-rotateY}deg) translateY(-8px)`);
  };

  const handleMouseLeave = () => {
    setTransform('rotateX(0deg) rotateY(0deg) translateY(0px)');
  };

  return (
    <div
      ref={cardRef}
      className="event-card relative"
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative bg-white/[0.02] border border-white/[0.08] p-6 md:p-8 transition-all duration-300 hover:border-amber-800/30"
        style={{
          transform: transform,
          transitionTimingFunction: 'var(--ease-spring)',
          transformOrigin: 'center center',
        }}
      >
        {/* Date */}
        <div className="absolute -top-3 left-6 px-4 py-1.5 bg-amber-800 text-amber-100">
          <span className="font-oswald text-sm font-bold">{event.date.split(' ')[0]}</span>
          <span className="font-inter text-[10px] uppercase tracking-wider ml-1">
            {event.date.split(' ')[1]} {event.date.split(' ')[2]}
          </span>
        </div>

        {/* Location */}
        <div className="mt-5 mb-6">
          <h3 className="font-oswald text-2xl md:text-3xl font-bold text-white uppercase tracking-wide">
            {event.city}
          </h3>
          <span className="font-inter text-sm text-white/40">{event.state}</span>
        </div>

        {/* Note */}
        <p className="font-inter text-xs text-amber-500/60 italic mb-6">
          {event.note}
        </p>

        {/* Details */}
        <div className="space-y-2.5 mb-8">
          <div className="flex items-center gap-3 text-white/50">
            <MapPin className="w-3.5 h-3.5 text-amber-700" />
            <span className="font-inter text-sm">{event.venue}</span>
          </div>
          <div className="flex items-center gap-3 text-white/50">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span className="font-inter text-sm">{event.time}</span>
          </div>
          <div className="flex items-center gap-3 text-white/50">
            <Calendar className="w-3.5 h-3.5 text-amber-700" />
            <span className="font-inter text-sm">{event.date}</span>
          </div>
        </div>

        {/* CTA */}
        <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-amber-800 text-amber-100 font-inter text-xs font-semibold uppercase tracking-[0.1em] hover:bg-amber-700 transition-colors duration-300">
          <Ticket className="w-3.5 h-3.5" />
          Get Tickets
        </button>
      </div>
    </div>
  );
};

const Events = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      '.events-header',
      { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      {
        clipPath: 'inset(0 0% 0 0)',
        opacity: 1,
        duration: 0.7,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      '.events-subtext',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'smooth',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        delay: 0.2,
      }
    );

    gsap.fromTo(
      '.event-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 bg-black overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-900/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="events-header font-oswald text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-[0.05em] mb-4">
            On the Road
          </h2>
          <p className="events-subtext font-inter text-base md:text-lg text-white/50 max-w-xl mx-auto">
            Every city holds a memory. Every stage, a reckoning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
