import React, { useEffect } from "react";
import './App.css';
// Import removed since we're using background-image in CSS

export default function App() {
  useEffect(() => {
    // Handle smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .button');
    const navContainer = document.querySelector('.nav-container');
    
    // Variables for scroll-based section navigation
    let isScrolling = false;
    let sections = [];
    let currentSectionIndex = 0;
    
    // Function to reveal sections when they come into view
    const revealSections = () => {
      const contentSections = document.querySelectorAll('.content-section');
      contentSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Reveal the section when it comes into view
        if (sectionTop < windowHeight * 0.85) {
          section.classList.add('revealed');
        }
      });
    };
    
    // Function to get all sections and their positions
    const initSections = () => {
      sections = Array.from(document.querySelectorAll('section'));
      setCurrentSectionByScrollPosition();
    };
    
    // Determine which section is currently visible
    const setCurrentSectionByScrollPosition = () => {
      const scrollPosition = window.scrollY + 150;
      let newIndex = 0;
      
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          newIndex = index;
        }
      });
      
      currentSectionIndex = newIndex;
    };
    
    // Scroll to the next or previous section
    const scrollToSection = (direction) => {
      if (isScrolling) return;
      
      setCurrentSectionByScrollPosition();
      
      let targetIndex = direction === 'down' 
        ? Math.min(currentSectionIndex + 1, sections.length - 1) 
        : Math.max(currentSectionIndex - 1, 0);
      
      if (targetIndex !== currentSectionIndex) {
        isScrolling = true;
        
        window.scrollTo({
          top: sections[targetIndex].offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Update URL without page reload
        if (sections[targetIndex].id) {
          window.history.pushState(null, null, `#${sections[targetIndex].id}`);
        }
        
        // Update active link in navigation
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (sections[targetIndex].id && link.getAttribute('href') === `#${sections[targetIndex].id}`) {
            link.classList.add('active');
          }
        });
        
        // Reset the scrolling flag after animation
        setTimeout(() => {
          isScrolling = false;
        }, 1000);
      }
    };
    
    // Function to handle scroll event
    const handleScroll = () => {
      // Add class to navigation when scrolling down
      if (window.scrollY > 100) {
        navContainer.classList.add('scrolled');
        document.querySelector('.back-to-top').classList.add('visible');
      } else {
        navContainer.classList.remove('scrolled');
        document.querySelector('.back-to-top').classList.remove('visible');
      }
      
      // Highlight the active section in the navigation
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 150;
      
      // Reveal sections when they come into view
      const contentSections = document.querySelectorAll('.content-section');
      contentSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Reveal the section when it comes into view
        if (sectionTop < windowHeight * 0.85) {
          section.classList.add('revealed');
        }
      });
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
      
      // Reveal sections when scrolling
      revealSections();
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initialize sections for wheel-based navigation
    initSections();
    
    // Handle wheel events to navigate between sections
    let wheelTimeout;
    window.addEventListener('wheel', (e) => {
      clearTimeout(wheelTimeout);
      
      wheelTimeout = setTimeout(() => {
        // Only trigger section change on significant scroll
        if (Math.abs(e.deltaY) > 30) {
          scrollToSection(e.deltaY > 0 ? 'down' : 'up');
        }
      }, 50); // Small timeout to avoid rapid multiple scrolls
    });
    
    // Listen for window resize to recalculate section positions
    window.addEventListener('resize', initSections);
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Only apply to links that point to an anchor
        const href = this.getAttribute('href');
        if (href && href.startsWith('#') && href !== '#') {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80, // Offset for the navigation bar
              behavior: 'smooth'
            });
            
            // Update URL without triggering page reload
            window.history.pushState(null, null, targetId);
            
            // Set this link as active
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
          }
        }
      });
    });
    
    // Handle the case when the page is loaded with a hash
    if (window.location.hash) {
      setTimeout(() => {
        const element = document.querySelector(window.location.hash);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth'
          });
          
          // Set the corresponding link as active
          const activeLink = document.querySelector(`.nav-link[href="${window.location.hash}"]`);
          if (activeLink) {
            navLinks.forEach(link => link.classList.remove('active'));
            activeLink.classList.add('active');
          }
        }
      }, 100);
    }
    
    // Initial call to set the correct state based on current scroll position
    handleScroll();
    
    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', () => {});
      window.removeEventListener('resize', initSections);
    };
  }, []);
  
  return (
    <>
      {/* SVG Filters for special effects */}
      <svg width="0" height="0" style={{ position: 'absolute', top: '-9999px' }}>
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      
      {/* Background container with image */}
      <div className="bg-image-container">
        <div className="bg-image updated-bg" style={{ margin: '0 auto' }}></div>
      </div>
      
      {/* Navigation */}
      <nav className="nav-container">
        <a href="#wp-introduction" className="nav-link">Introduction</a>
        <a href="#wp-tokenomics" className="nav-link">Tokenomics</a>
        <a href="#wp-roadmap" className="nav-link">Roadmap</a>
        <a href="#wp-team" className="nav-link">Team</a>
      </nav>

      {/* Content */}
      <div className="content-container">
        <section id="home" className="hero">
          {/* Spray paint splash effects */}
          <div className="splash-effect splash-1"></div>
          <div className="splash-effect splash-2"></div>
          <div className="splash-effect splash-3"></div>
          
          <h1>BHABIT
            {/* Paint drip effects */}
            <div className="drip drip-1"></div>
            <div className="drip drip-2"></div>
            <div className="drip drip-3"></div>
            <div className="drip drip-4"></div>
          </h1>
          <div className="spacer"></div>
          <p className="fbi-text">Profits by Impulse</p>
          <p className="subtitle">WHY BREAK BAD HABITS WHEN YOU CAN MINT THEM?</p>
          <a href="#wp-introduction" className="button">WHITEPAPER</a>
          <div className="scroll-indicator">
            <div className="scroll-arrow"></div>
            <div className="scroll-text">Scroll Down</div>
          </div>
        </section>
        
        <section id="whitepaper" className="content-section whitepaper-section">
          <div className="section-container whitepaper-container">
            <h2>BHABIT (BHT) Whitepaper</h2>
            <p className="wp-subtitle">Embrace the Chaos. Celebrate the Imperfections.</p>
            <div className="splash-effect splash-1" style={{left: '-30px', top: '10px', opacity: '0.5'}}></div>
            <div className="splash-effect splash-2" style={{right: '-20px', bottom: '50px', opacity: '0.5'}}></div>
            
            <div className="whitepaper-toc">
              <h3>Table of Contents</h3>
              <ul className="whitepaper-toc-list">
                <li><a href="#wp-introduction">Introduction</a></li>
                <li><a href="#wp-vision">Vision & Mission</a></li>
                <li><a href="#wp-problem">The Problem</a></li>
                <li><a href="#wp-solution">Our Solution: BHABIT</a></li>
                <li><a href="#wp-tokenomics">Tokenomics</a></li>
                <li><a href="#wp-technology">Technology</a></li>
                <li><a href="#wp-roadmap">Roadmap</a></li>
                <li><a href="#wp-team">Team</a></li>
              </ul>
            </div>
            
            <div id="wp-introduction" className="whitepaper-section">
              <h3>Introduction</h3>
              <div className="wp-content">
                <p>Welcome to BHABIT (BHT), the cryptocurrency that celebrates the beautiful chaos of life's imperfections. In a world obsessed with perfection and order, BHABIT stands out by embracing the quirks, flaws, and bad decisions that make us uniquely human. With a rebellious spirit and a nod to anarchy, BHABIT is more than just a digital asset—it's a movement.</p>
              </div>
            </div>
            
            <div id="wp-vision" className="whitepaper-section">
              <h3>Vision & Mission</h3>
              <div className="wp-content">
                <p className="wp-subheading">Vision</p>
                <p>To create a decentralized community that celebrates individuality, embraces imperfections, and fosters a space where chaos and creativity coexist harmoniously.</p>
                
                <p className="wp-subheading">Mission</p>
                <p>Empower individuals to take control of their financial destiny through decentralized technology. Celebrate the imperfections and unpredictability of life by fostering a community that values authenticity over perfection. Disrupt traditional financial systems by introducing a currency that embodies rebellion and non-conformity.</p>
              </div>
            </div>
            
            <div id="wp-problem" className="whitepaper-section">
              <h3>The Problem</h3>
              <div className="wp-content">
                <p>Many cryptocurrencies aim to present a flawless image, focusing on perfection, security, and predictability. While these are important, they often overlook the human element—the unpredictable nature of individuals and communities.</p>
                <p>Traditional financial systems and even some cryptocurrencies fail to engage communities on a personal level, creating a disconnect between the creators and the users.</p>
                <p>With thousands of cryptocurrencies in existence, many lack a unique identity or purpose, making it difficult for them to stand out and resonate with users.</p>
              </div>
            </div>
            
            <div id="wp-solution" className="whitepaper-section">
              <h3>Our Solution: BHABIT</h3>
              <div className="wp-content">
                <p>BHABIT flips the script by celebrating bad habits and the chaos they bring. By acknowledging that perfection is unattainable, BHABIT fosters a community where authenticity and individuality are prized.</p>
                <p>With an intentionally absurd total supply of 13 trillion BHT, BHABIT reflects the boundless nature of human imperfection and decision-making.</p>
                <p>BHABIT empowers its community to make decisions, ensuring that the direction of the coin aligns with the collective desires and values of its users.</p>
              </div>
            </div>
            
            <div id="wp-tokenomics" className="whitepaper-section">
              <h3>Tokenomics</h3>
              <div className="wp-content">
                <div className="token-bubble-chart">
                  <div className="token-bubble community" style={{width: '30%'}}>30%<span>Community Rewards</span></div>
                  <div className="token-bubble liquidity" style={{width: '25%'}}>25%<span>Liquidity Pool</span></div>
                  <div className="token-bubble development" style={{width: '20%'}}>20%<span>Development</span></div>
                  <div className="token-bubble marketing" style={{width: '15%'}}>15%<span>Marketing</span></div>
                  <div className="token-bubble team" style={{width: '10%'}}>10%<span>Team</span></div>
                </div>
                <div className="grid grid-2">
                  <div className="whitepaper-card">
                    <p className="wp-subheading">Total Supply</p>
                    <p className="token-number">13 trillion BHT</p>
                    <p className="wp-subheading">Distribution</p>
                    <ul>
                      <li>Community Rewards and Airdrops: 30%</li>
                      <li>Liquidity Pool: 25%</li>
                      <li>Development Fund: 20%</li>
                      <li>Marketing and Partnerships: 15%</li>
                      <li>Team and Advisors: 10%</li>
                    </ul>
                  </div>
                  <div className="whitepaper-card">
                    <p className="wp-subheading">Deflationary Mechanism</p>
                    <p>A portion of each transaction is burned to reduce the total supply over time, enhancing scarcity and value.</p>
                    <p className="wp-subheading">Transaction Fees</p>
                    <ul>
                      <li>2% - Redistribution to Holders</li>
                      <li>1% - Charity and Community Projects</li>
                      <li>1% - Liquidity Pool</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div id="wp-technology" className="whitepaper-section">
              <h3>Technology</h3>
              <div className="wp-content">
                <p>BHABIT is built on the Binance blockchain, leveraging its robust infrastructure and widespread adoption to ensure security, scalability, and interoperability.</p>
                <p>Our smart contracts are audited by top security firms to ensure they are free from vulnerabilities and operate as intended.</p>
                <p>BHABIT plans to develop DApps that enhance user experience, including wallets, staking platforms, and community forums.</p>
              </div>
            </div>
            
            <div id="wp-roadmap" className="whitepaper-section">
              <h3>Roadmap</h3>
              <div className="wp-content">
                <div className="roadmap-timeline">
                  <div className="roadmap-item">
                    <div className="roadmap-date">Q2 2025</div>
                    <div className="roadmap-content">
                      <p>Conceptualization and whitepaper development</p>
                      <p>Community building and social media launch</p>
                    </div>
                  </div>
                  <div className="roadmap-item">
                    <div className="roadmap-date">Q3 2025</div>
                    <div className="roadmap-content">
                      <p>Token creation and smart contract deployment</p>
                      <p>Initial DEX offering (IDO) and listing on decentralized exchanges</p>
                    </div>
                  </div>
                  <div className="roadmap-item">
                    <div className="roadmap-date">Q4 2025</div>
                    <div className="roadmap-content">
                      <p>Launch of BHABIT wallet and staking platform</p>
                      <p>Strategic partnerships and collaborations</p>
                    </div>
                  </div>
                  <div className="roadmap-item">
                    <div className="roadmap-date">2026</div>
                    <div className="roadmap-content">
                      <p>Development of BHABIT DApps</p>
                      <p>Expansion to centralized exchanges</p>
                      <p>Continuous community-driven development</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div id="wp-team" className="whitepaper-section">
              <h3>Team</h3>
              <div className="wp-content">
                <div className="team-member">
                  <h4>Tom Petrie</h4>
                  <p className="team-role">CEO & Visionary</p>
                  <p>An entrepreneur with a passion for disruptive technologies and community building. Tom envisions BHABIT as a revolutionary cryptocurrency that challenges norms and celebrates imperfections.</p>
                </div>
              </div>
            </div>
            
            <div className="whitepaper-disclaimer">
              <p>This whitepaper is for informational purposes only and does not constitute financial advice. Potential investors should conduct their own research and consult with a financial advisor before participating.</p>
            </div>
            
            <div className="whitepaper-contact">
              <h3>Contact & Social Channels</h3>
              <div className="grid grid-3">
                <a href="https://www.bhabit.net" target="_blank" rel="noopener noreferrer" className="contact-link">Website</a>
                <a href="https://t.me/bhabitcoin" target="_blank" rel="noopener noreferrer" className="contact-link">Telegram</a>
                <a href="https://discord.gg/bhabitcoin" target="_blank" rel="noopener noreferrer" className="contact-link">Discord</a>
                <a href="https://twitter.com/BHABITcoin" target="_blank" rel="noopener noreferrer" className="contact-link">Twitter</a>
                <a href="https://reddit.com/r/BHABITcoin" target="_blank" rel="noopener noreferrer" className="contact-link">Reddit</a>
                <a href="mailto:contact@bhabit.net" className="contact-link">Email</a>
              </div>
            </div>
            
            <a href="#home" className="button">Back to Top</a>
          </div>
        </section>
        
        <footer>
          <p>© 2025 BHABIT. All rights reserved.</p>
          <p className="copyright-text">© 2025 Tom Petrie - Guisan Design</p>
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms & Conditions</a>
            <a href="#" className="footer-link">Contact Us</a>
          </div>
        </footer>
      </div>
      
      {/* Back to Top Button */}
      <a href="#home" className="back-to-top">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </a>
    </>
  );
}