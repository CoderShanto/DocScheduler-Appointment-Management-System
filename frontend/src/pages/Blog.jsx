import React, { useState } from 'react';

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Maintaining a Healthy Heart",
    excerpt: "Discover essential lifestyle changes and habits that can significantly improve your cardiovascular health and reduce the risk of heart disease.",
    author: "Dr. Sarah Johnson",
    authorImage: "👩‍⚕️",
    category: "Cardiology",
    date: "Dec 1, 2024",
    readTime: "5 min read",
    image: "🫀",
    likes: 234,
    comments: 45
  },
  {
    id: 2,
    title: "Understanding Mental Health: Breaking the Stigma",
    excerpt: "Mental health is just as important as physical health. Learn about common mental health conditions and how to seek help.",
    author: "Dr. Michael Chen",
    authorImage: "👨‍⚕️",
    category: "Mental Health",
    date: "Nov 28, 2024",
    readTime: "7 min read",
    image: "🧠",
    likes: 189,
    comments: 67
  },
  {
    id: 3,
    title: "Nutrition Guide: Eating for Optimal Health",
    excerpt: "A comprehensive guide to understanding nutrition, macronutrients, and how to build a balanced meal plan.",
    author: "Dr. Emily Rodriguez",
    authorImage: "👩‍⚕️",
    category: "Nutrition",
    date: "Nov 25, 2024",
    readTime: "6 min read",
    image: "🥗",
    likes: 312,
    comments: 89
  },
  {
    id: 4,
    title: "The Importance of Regular Health Checkups",
    excerpt: "Prevention is better than cure. Learn why regular health screenings can save your life.",
    author: "Dr. James Williams",
    authorImage: "👨‍⚕️",
    category: "Preventive Care",
    date: "Nov 22, 2024",
    readTime: "4 min read",
    image: "🩺",
    likes: 267,
    comments: 34
  },
  {
    id: 5,
    title: "Sleep Better: A Guide to Improving Sleep Quality",
    excerpt: "Quality sleep is crucial for overall health. Discover proven strategies to improve your sleep hygiene.",
    author: "Dr. Lisa Thompson",
    authorImage: "👩‍⚕️",
    category: "Sleep Medicine",
    date: "Nov 20, 2024",
    readTime: "5 min read",
    image: "😴",
    likes: 445,
    comments: 92
  },
  {
    id: 6,
    title: "Diabetes Management: Living Well with Diabetes",
    excerpt: "Managing diabetes effectively requires knowledge and commitment. Learn practical tips for daily diabetes care.",
    author: "Dr. Robert Martinez",
    authorImage: "👨‍⚕️",
    category: "Endocrinology",
    date: "Nov 18, 2024",
    readTime: "8 min read",
    image: "💉",
    likes: 198,
    comments: 56
  },
  {
    id: 7,
    title: "Yoga and Meditation for Stress Relief",
    excerpt: "Learn how ancient practices can help you manage modern stress and improve your overall wellbeing.",
    author: "Dr. Amanda Lee",
    authorImage: "👩‍⚕️",
    category: "Wellness",
    date: "Nov 15, 2024",
    readTime: "6 min read",
    image: "🧘",
    likes: 378,
    comments: 71
  },
  {
    id: 8,
    title: "Childhood Vaccinations: What Parents Need to Know",
    excerpt: "A comprehensive guide to understanding the importance of childhood vaccines and the recommended immunization schedule.",
    author: "Dr. Peter Kim",
    authorImage: "👨‍⚕️",
    category: "Pediatrics",
    date: "Nov 12, 2024",
    readTime: "7 min read",
    image: "💉",
    likes: 156,
    comments: 43
  },
  {
    id: 9,
    title: "Women's Health: Understanding Hormonal Changes",
    excerpt: "Navigate the different stages of hormonal changes in a woman's life with expert guidance and practical advice.",
    author: "Dr. Jennifer Brown",
    authorImage: "👩‍⚕️",
    category: "Women's Health",
    date: "Nov 10, 2024",
    readTime: "9 min read",
    image: "🌸",
    likes: 289,
    comments: 64
  }
];

const categories = ["All", "Cardiology", "Mental Health", "Nutrition", "Preventive Care", "Sleep Medicine", "Endocrinology", "Wellness", "Pediatrics", "Women's Health"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Health & Wellness Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert medical advice, health tips, and wellness insights from our team of healthcare professionals
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
            <svg className="absolute right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-blue-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl overflow-hidden shadow-2xl cursor-pointer transform hover:scale-[1.02] transition-transform duration-300">
          <div className="p-8 md:p-12 text-white">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-1 bg-white/20 rounded-full text-sm font-semibold backdrop-blur-sm">
                ⭐ Featured Article
              </span>
              <span className="text-sm opacity-90">{featuredPost.category}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{featuredPost.title}</h2>
            <p className="text-lg mb-6 opacity-90 max-w-3xl">{featuredPost.excerpt}</p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{featuredPost.authorImage}</span>
                <span className="font-medium">{featuredPost.author}</span>
              </div>
              <span className="opacity-90">{featuredPost.date}</span>
              <span className="opacity-90">{featuredPost.readTime}</span>
              <button className="ml-auto px-6 py-2 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                Read More →
              </button>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
              >
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                  {post.image}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold border border-blue-100">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{post.authorImage}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{post.author}</p>
                        <p className="text-xs text-gray-500">{post.date}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-xl">No articles found matching your criteria.</p>
            <p className="text-gray-400 text-sm mt-2">Try a different search term or category.</p>
          </div>
        )}

        {/* Newsletter Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl p-8 md:p-12 text-center border border-blue-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get the latest health tips, medical insights, and wellness advice delivered straight to your inbox every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-8 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;