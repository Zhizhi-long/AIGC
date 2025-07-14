<template>
  <div class="app">
      <!-- Header -->
      <header class="header">
          <nav class="nav container">
              <div class="logo"> <img class="logo-img" src="../assets/logo.jpeg" alt="" /> ArchiFuture AI</div>
              <ul class="nav-links">
                  <li><a href="#demo">Product Demo</a></li>
                  <li><a href="#features">Core Features</a></li>
                  <li><a href="#cases">Use Cases</a></li>
                  <li><a href="#technology">Technology</a></li>
              </ul>
              <a href="/architectural-render-n" class="cta-button">Try for Free</a>
          </nav>
      </header>
      <div class="slider-container">
          <ImageComparisonSlider :items="comparisonImages" />
      </div>

      <!-- Hero Banner -->
      <section class="hero">
          <div class="container">
              <div class="hero-content">
                  <h1>AI-Powered Architectural Revolution</h1>
                  <p class="hero-subtitle">From concept to visualization in 15 minutes instead of 20 days. Intelligent
                      land optimization and one-click professional 3D rendering for the future of architectural
                      planning.</p>

                  <div class="hero-stats">
                      <div class="stat-item">
                          <div class="stat-number">99%</div>
                          <div class="stat-label">Workflow Acceleration</div>
                      </div>
                      <div class="stat-item">
                          <div class="stat-number">80%</div>
                          <div class="stat-label">Cost Reduction</div>
                      </div>
                      <div class="stat-item">
                          <div class="stat-number">35%</div>
                          <div class="stat-label">Land Utilization Boost</div>
                      </div>
                  </div>

                  <a href="/architectural-render-n" class="cta-button" style="font-size: 1.1rem; padding: 1rem 2rem;">Experience Demo
                      Now</a>
              </div>
          </div>
      </section>

      <!-- Technology -->
      <section id="technology" class="technology">
          <div class="container">
              <h2 class="technology-title">Technical Advantages</h2>
              <div class="tech-grid">
                  <div class="tech-item">
                      <h4>🤖 Core AI Algorithms</h4>
                      <p>Stable Diffusion + ControlNet<br>Meta SAM + CLIP + Faiss<br>Siamese Networks<br>Latent
                          Diffusion Transformer</p>
                  </div>
                  <div class="tech-item">
                      <h4>⚡ High-Performance Computing</h4>
                      <p>GPU Cluster Parallel Processing<br>Load Balancing Gateway<br>30-60s Rendering Complete</p>
                  </div>
                  <div class="tech-item">
                      <h4>📊 Data Foundation</h4>
                      <p>10+ CCF-A Conference Papers<br>5+ Proprietary LoRA Models<br>1000+ Building Prototype
                          Database</p>
                  </div>
                  <div class="tech-item">
                      <h4>🛡️ Enterprise-Grade Security</h4>
                      <p>End-to-End Encryption<br>Private Cloud Deployment<br>Isolated Server Architecture</p>
                  </div>
              </div>
          </div>
      </section>

      <!-- Demo Section -->
      <section id="demo" class="demo-section">
          <div class="container">
              <h2 class="section-title">Product Demonstration</h2>
              <div class="demo-container">
                  <div class="demo-video">
                      <div>AI Land Planning Demo Video</div>
                  </div>
                  <div class="demo-text">
                      <h3>From Photo to Planning Solution, One Click Complete</h3>
                      <p>Upload your land photos and input basic parameters. Our AI will generate for you within
                          minutes:</p>
                      <ul class="demo-features">
                          <li>Intelligent land segmentation and layout optimization</li>
                          <li>Regulatory-compliant architectural solution matching</li>
                          <li>Real-time commercial value calculation</li>
                          <li>Multi-style 3D visualization rendering</li>
                          <li>Detailed investment return analysis</li>
                      </ul>
                      <a href="#" class="cta-button">Watch Full Demo</a>
                  </div>
              </div>
          </div>
      </section>

      <!-- Features -->
      <section id="features" class="features">
          <div class="container">
              <h2 class="section-title">Core Features</h2>
              <div class="features-grid">
                  <div class="feature-card">
                      <div class="feature-icon-container">
                        <img class="feature-icon" src="../assets/AI-Powered-Planning.png" alt="">
                      </div>
                      <h3>AI-Powered Planning</h3>
                      <p>Deep learning-based land segmentation algorithms automatically calculate optimal building
                          layouts, ensuring regulatory compliance while maximizing commercial value.</p>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon-container">
                        <img class="feature-icon" src="../assets/One-Click-3D-Rendering_PhotoGrid.png" alt="">
                      </div>
                      <h3>One-Click 3D Rendering</h3>
                      <p>Professional-grade 3D visualization engine supporting multiple architectural styles, from
                          modern minimalism to neoclassicism, generating high-quality renders in 15 seconds.</p>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon-container">
                        <img class="feature-icon" src="../assets/Real-Time-Value-Calculation_PhotoGrid.png" alt="">
                      </div>
                      <h3>Real-Time Value Calculation</h3>
                      <p>Integrated market data and construction cost models provide real-time ROI calculations,
                          helping developers make more informed investment decisions.</p>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon-container">
                        <img class="feature-icon" src="../assets/Green-Building-Optimization.png" alt="">
                      </div>
                      <h3>Green Building Optimization</h3>
                      <p>Built-in BEAM Plus and LEED certification standards automatically optimize green ratios and
                          sustainable design, facilitating green building certification.</p>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon-container">
                        <img class="feature-icon" src="../assets/Rapid-Iteration.png" alt="">
                      </div>
                      <h3>Rapid Iteration</h3>
                      <p>Traditional planning takes 20 days, we need only 15 minutes. Support real-time parameter
                          adjustments with instant preview of different scenarios and revenue comparisons.</p>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon-container">
                        <img class="feature-icon" src="../assets/Seamless-Integration.png" alt="">
                      </div>
                      <h3>Seamless Integration</h3>
                      <p>Support API integration with mainstream design software like AutoCAD and Revit, no need to
                          change existing workflows, easy to get started.</p>
                  </div>
              </div>
          </div>
      </section>

      <!-- Use Cases -->
      <section id="cases" class="use-cases">
          <div class="container">
              <h2 class="section-title">Application Scenarios</h2>
              <div class="cases-grid">
                  <div class="case-card">
                      <div class="case-image">
                        <img class="case-image-item" src="../assets/Real-estate-developer_PhotoGrid.png"></img>
                      </div>
                      <div class="case-content">
                          <h3 class="case-title">Real Estate Developers</h3>
                          <p>Rapidly assess land investment value, generate multiple development schemes, improve
                              early-stage decision efficiency, and reduce investment risks.</p>
                      </div>
                  </div>
                  <div class="case-card">
                    <div class="case-image">
                        <img class="case-image-item" src="../assets/government_PhotoGrid.png"></img>
                      </div>
                      <div class="case-content">
                          <h3 class="case-title">Government Planning Departments</h3>
                          <p>Rapid generation and comparison of urban planning schemes, visualization for public
                              consultation, improving planning approval efficiency and transparency.</p>
                      </div>
                  </div>
                  <div class="case-card">
                    <div class="case-image">
                        <img class="case-image-item" src="../assets/architecture_PhotoGrid.png"></img>
                      </div>
                      <div class="case-content">
                          <h3 class="case-title">Architectural Designers</h3>
                          <p>Rapid visualization of conceptual designs, more intuitive client communication,
                              significantly shortening design cycles and enhancing client satisfaction.</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
          <div class="container">
              <h2>Ready to Revolutionize Your Architectural Planning Process?</h2>
              <p>Join the leading architecture firms and developers already using ArchiFuture AI</p>
              <div class="cta-buttons">
                  <a href="#" class="btn-primary">Start Free Trial</a>
                  <a href="#" class="btn-secondary">Schedule Demo</a>
              </div>
          </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
          <div class="container">
              <div class="footer-content">
                  <div class="footer-section">
                      <h4>Product</h4>
                      <a href="#">Features</a>
                      <a href="#">Pricing Plans</a>
                      <a href="#">API Documentation</a>
                  </div>
                  <div class="footer-section">
                      <h4>Solutions</h4>
                      <a href="#">Real Estate Development</a>
                      <a href="#">Architectural Design</a>
                      <a href="#">Urban Planning</a>
                  </div>
                  <div class="footer-section">
                      <h4>Support</h4>
                      <a href="#">Help Center</a>
                      <a href="#">Technical Support</a>
                      <a href="#">Contact Us</a>
                  </div>
                  <div class="footer-section">
                      <h4>Company</h4>
                      <a href="#">About Us</a>
                      <a href="#">Our Team</a>
                      <a href="#">Partners</a>
                  </div>
              </div>
              <hr style="border: 1px solid rgba(255,255,255,0.2); margin: 2rem 0;">
              <p>&copy; 2025 ArchiFuture AI. All rights reserved.</p>
          </div>
      </footer>
  </div>
</template>

<script setup>
// 这里可以添加Vue 3的响应式数据和逻辑
import { ref } from 'vue'

import ImageComparisonSlider from '@/components/Slider.vue'
import before1 from '../assets/before1.png'
import after1 from '../assets/after1.png'
import before2 from '../assets/before2.png'
import after2 from '../assets/after2.png'
import before3 from '../assets/before3.png'
import after3 from '../assets/after3.png'
import before4 from '../assets/before4.png'
import after4 from '../assets/after4.png'

const comparisonImages = ref([
  {
      before: before1,
      after: after1,
  },
  {
    before: before2,
    after: after2,
  },
  {
    before: before3,
    after: after3,
  },
  {
    before: before4,
    after: after4,
  },
])

// 示例响应式数据
const stats = ref([
  { value: '99%', label: 'Workflow Acceleration' },
  { value: '80%', label: 'Cost Reduction' },
  { value: '35%', label: 'Land Utilization Boost' }
])

// 示例方法
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style>
/* 将原CSS样式复制到这里 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: #333;
  font-weight: 400;
  background: linear-gradient(135deg, #0d0d4b 0%, #1a1a6b 50%, #2d2d8f 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header */
.header {
  background: rgba(13, 13, 75, 0.95);
  color: white;
  padding: 1rem 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff6b35;
  display: flex;
  align-items: center;
}

.logo-img {
  height: 30px;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #ff6b35;
}

/* 添加以下样式 */
.slider-container {
  width: 70%; /* 调整为需要的宽度百分比或固定值 */
  max-width: 1200px; /* 可选：添加最大宽度限制 */
  overflow: hidden;
  position: relative;
  left: 50%; /* 配合transform实现精确居中 */
  transform: translateX(-50%); /* 向左平移自身宽度的50% */
  margin-top: 30px;
}

/* 确保ImageComparisonSlider组件内部元素也全宽 */
.slider-container >>> .comparison-slider {
  width: 100%;
}

.cta-button {
  background: linear-gradient(45deg, #ff6b35, #f7931e);
  color: white;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.3s;
}

.cta-button:hover {
  transform: translateY(-2px);
}

/* Hero Banner */
.hero {
  background: linear-gradient(135deg, #0d0d4b 0%, #1a1a6b 50%, #2d2d8f 100%);
  color: white;
  padding: 120px 0 80px;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  opacity: 0.3;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ff6b35, #f7931e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 3rem 0;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ff6b35;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Demo Section */
.demo-section {
  padding: 80px 0;
  background: #f8f9fa;
}

.technology-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #ff6b35;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #0d0d4b;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.demo-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.demo-video {
  background: #ddd;
  height: 400px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #666;
  position: relative;
  overflow: hidden;
}

.demo-video::before {
  content: '🎬';
  font-size: 3rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.demo-text h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #0d0d4b;
}

.demo-features {
  list-style: none;
  margin: 2rem 0;
}

.demo-features li {
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
}

.demo-features li::before {
  content: '✓';
  color: #28a745;
  font-weight: bold;
  margin-right: 1rem;
}

/* Features Section */
.features {
  padding: 80px 0;
  background: white;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.feature-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon {
  height: 100px;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #0d0d4b;
}

/* Use Cases */
.use-cases {
  padding: 80px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.case-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.case-card:hover {
  transform: translateY(-5px);
}

.case-image {
  height: 200px;
  background: linear-gradient(45deg, #ff6b35, #f7931e);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
}
.case-image-item {
  height: 150px;
}

.case-content {
  padding: 1.5rem;
}

.case-title {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #0d0d4b;
}

/* Technology */
.technology {
  padding: 80px 0;
  background: #0d0d4b;
  color: white;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.tech-item {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.tech-item h4 {
  color: #ff6b35;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

/* CTA Section */
.cta-section {
  padding: 80px 0;
  background: linear-gradient(45deg, #ff6b35, #f7931e);
  color: white;
  text-align: center;
}

.cta-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.btn-primary {
  background: white;
  color: #ff6b35;
  padding: 1rem 2rem;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.3s;
}

.btn-secondary {
  background: transparent;
  color: white;
  padding: 1rem 2rem;
  border: 2px solid white;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-primary:hover,
.btn-secondary:hover {
  transform: translateY(-2px);
}

.btn-secondary:hover {
  background: white;
  color: #ff6b35;
}

/* Footer */
.footer {
  background: #0d0d4b;
  color: white;
  padding: 40px 0 20px;
  text-align: center;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h4 {
  color: #ff6b35;
  margin-bottom: 1rem;
}

.footer-section a {
  color: white;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  transition: color 0.3s;
}

.footer-section a:hover {
  color: #ff6b35;
}

/* Responsive */
@media (max-width: 768px) {
  .hero h1 {
      font-size: 2.5rem;
  }

  .hero-stats {
      flex-direction: column;
      gap: 1rem;
  }

  .demo-container {
      grid-template-columns: 1fr;
      gap: 2rem;
  }

  .nav-links {
      display: none;
  }

  .cta-buttons {
      flex-direction: column;
      align-items: center;
  }
}
</style>