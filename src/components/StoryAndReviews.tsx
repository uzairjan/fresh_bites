import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Flame, CheckCircle, Sparkles, MessageSquare, Heart } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/menuData';
import { CustomerReview } from '../types';
import { playSound } from '../utils/sound';
import { defaultViewport, smoothEase, fadeInUp, staggerContainer } from '../utils/animations';

export const StoryAndReviews: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>(CUSTOMER_REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [name, setName] = useState('');
  const [orderedItem, setOrderedItem] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('success');

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      name: name.trim() || 'Food Enthusiast',
      role: 'Gondomar Food Lover',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating,
      text: reviewText.trim(),
      date: 'Agora mesmo',
      orderedItem: orderedItem.trim() || 'Artisanal Comfort Food Feast',
      verified: true,
    };

    setReviews([newRev, ...reviews]);
    setShowReviewForm(false);
    setSubmitted(true);
    setName('');
    setReviewText('');
    setOrderedItem('');
  };

  return (
    <section id="reviews" className="w-full py-16 md:py-24 bg-[#0A0A0A] border-t border-[#2A2A2A] relative">
      <div className="max-w-[1240px] mx-auto px-4 md:px-6">
        
        {/* Story / Craft Manifesto Grid with staggered scroll animations */}
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 pb-16 border-b border-[#2A2A2A]"
        >
          
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -4 }}
            className="bg-[#141414] border border-[#2A2A2A] p-6 rounded-[2px] relative overflow-hidden group hover:border-[#D4AF37] transition-all shadow-xl"
          >
            <div className="w-12 h-12 rounded-none border border-[#D4AF37]/50 flex items-center justify-center bg-[#0A0A0A] text-[#D4AF37] mb-4">
              <Flame className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-display-lg text-xl text-[#F5F5F0] uppercase mb-2">
              450°C Stone Hearth
            </h3>
            <p className="font-body-md text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
              Our artisanal sourdough undergoes a 48-hour cold fermentation process, resulting in an airy, leopard-spotted crust with complex aroma and supreme digestibility.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -4 }}
            className="bg-[#141414] border border-[#2A2A2A] p-6 rounded-[2px] relative overflow-hidden group hover:border-[#D4AF37] transition-all shadow-xl"
          >
            <div className="w-12 h-12 rounded-none border border-[#D4AF37]/50 flex items-center justify-center bg-[#0A0A0A] text-[#D4AF37] mb-4">
              <Sparkles className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-display-lg text-xl text-[#F5F5F0] uppercase mb-2">
              Lacy Crisp Smash
            </h3>
            <p className="font-body-md text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
              100% aged Black Angus beef pressed hard onto blazing cast-iron flat tops to create that coveted Maillard caramelization and crunchy lacy burger edges.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -4 }}
            className="bg-[#141414] border border-[#2A2A2A] p-6 rounded-[2px] relative overflow-hidden group hover:border-[#D4AF37] transition-all shadow-xl"
          >
            <div className="w-12 h-12 rounded-none border border-[#D4AF37]/50 flex items-center justify-center bg-[#0A0A0A] text-[#D4AF37] mb-4">
              <Heart className="w-6 h-6 text-[#4ADE80]" />
            </div>
            <h3 className="font-display-lg text-xl text-[#F5F5F0] uppercase mb-2">
              Authentic Spices & Toum
            </h3>
            <p className="font-body-md text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
              Rotisserie marinated with 12 Levantine spices, wrapped in hot saj bread with house-whipped garlic toum, pickles, and crispy spiced fries.
            </p>
          </motion.div>

        </motion.div>

        {/* Reviews Section Header with scroll reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] border border-[#D4AF37]/40 text-[#D4AF37] font-label-caps text-xs tracking-[0.2em] mb-3">
              <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
              <span>COMMUNITY LOVE</span>
            </div>
            <h2 className="font-display-lg text-3xl sm:text-4xl md:text-5xl text-[#F5F5F0] uppercase font-bold tracking-tight">
              What Diners Say in <span className="text-[#D4AF37] font-headline-script capitalize">Gondomar & Porto</span>
            </h2>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playSound('click');
              setShowReviewForm(!showReviewForm);
            }}
            className="bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/15 font-label-caps text-xs px-5 py-3 rounded-[2px] transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer tracking-wider"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WRITE A REVIEW</span>
          </motion.button>
        </motion.div>

        {/* Review Form (Conditional with AnimatePresence) */}
        <AnimatePresence>
          {showReviewForm && (
            <motion.form
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: smoothEase }}
              onSubmit={handleSubmitReview}
              className="mb-10 bg-[#141414] border border-[#D4AF37]/50 p-6 rounded-[2px] shadow-2xl space-y-4 overflow-hidden"
            >
              <h3 className="font-menu-item-title text-lg text-[#F5F5F0]">
                Share Your Fresh Bites Experience
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-label-caps text-[11px] text-[#A0A0A0] block mb-1">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Diogo Ramos"
                    className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#F5F5F0] px-3.5 py-2.5 text-xs font-body-md rounded-[2px] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-label-caps text-[11px] text-[#A0A0A0] block mb-1">
                    DISH ENJOYED *
                  </label>
                  <input
                    type="text"
                    required
                    value={orderedItem}
                    onChange={(e) => setOrderedItem(e.target.value)}
                    placeholder="e.g. The Godfather Pizza & Double Smash"
                    className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#F5F5F0] px-3.5 py-2.5 text-xs font-body-md rounded-[2px] focus:outline-none"
                  />
                </div>
              </div>

              {/* Rating Stars */}
              <div>
                <label className="font-label-caps text-[11px] text-[#A0A0A0] block mb-1.5">
                  RATING (STARS) *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        playSound('click');
                        setRating(star);
                      }}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? 'fill-[#D4AF37] text-[#D4AF37]'
                            : 'text-[#2A2A2A]'
                        }`}
                      />
                    </motion.button>
                  ))}
                  <span className="font-label-caps text-xs text-[#D4AF37] ml-2">
                    {rating} of 5 Stars
                  </span>
                </div>
              </div>

              {/* Review text */}
              <div>
                <label className="font-label-caps text-[11px] text-[#A0A0A0] block mb-1">
                  YOUR FEEDBACK *
                </label>
                <textarea
                  required
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Tell us about the crust, crunch, flavor, or delivery speed..."
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#D4AF37] text-[#F5F5F0] p-3 text-xs font-body-md rounded-[2px] focus:outline-none"
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="font-label-caps text-xs px-4 py-2.5 text-[#A0A0A0] hover:text-[#F5F5F0] cursor-pointer"
                >
                  CANCEL
                </button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#E5C358] text-[#0A0A0A] font-bold font-label-caps text-xs px-6 py-2.5 rounded-[2px] transition-all tracking-wider cursor-pointer"
                >
                  POST REVIEW
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-[#4ADE80]/15 border border-[#4ADE80] rounded-[2px] mb-8 text-[#4ADE80] text-xs font-label-caps flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Thank you for sharing your experience! Your review has been published.</span>
          </motion.div>
        )}

        {/* Reviews Cards Grid with Staggered Scroll Motion */}
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {reviews.map((rev) => (
            <motion.div
              key={rev.id}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-[#141414] border border-[#2A2A2A] hover:border-[#D4AF37] p-6 rounded-[2px] flex flex-col justify-between transition-all duration-300 relative group shadow-xl"
            >
              <div>
                {/* Header Profile with Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#D4AF37]"
                  />
                  <div>
                    <h4 className="font-menu-item-title text-base text-[#F5F5F0]">
                      {rev.name}
                    </h4>
                    <p className="font-body-md text-[11px] text-[#A0A0A0]">
                      {rev.role} • {rev.date}
                    </p>
                  </div>
                </div>

                {/* Rating Stars with subtle delay */}
                <div className="flex text-[#D4AF37] items-center gap-0.5 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                  ))}
                </div>

                {/* Ordered Item Tag */}
                <span className="inline-block font-label-caps text-[10px] text-[#D4AF37] bg-[#0A0A0A] px-2.5 py-1 border border-[#2A2A2A] mb-3">
                  Ordered: {rev.orderedItem}
                </span>

                {/* Review Text */}
                <p className="font-body-md text-xs sm:text-sm text-[#A0A0A0] leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#2A2A2A] flex items-center justify-between text-[10px] font-label-caps text-[#4ADE80]">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Verified Diner
                </span>
                <span className="text-[#8E8E8E]">Gondomar, Portugal</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
