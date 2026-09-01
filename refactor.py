import re

with open('D:/Lead Intelligence - Performax 1/Claude/Claude/Performax1_Website/services.html', 'r', encoding='utf-8') as f:
    content = f.read()

hero_start = content.find('<section class="hero" id="hero">')
cta_start = content.find('<section class="cta-section">')

if hero_start != -1 and cta_start != -1:
    header = content[:hero_start]
    footer = content[cta_start:]

    new_body = '''
    <!-- Hero Section -->
    <section class="hero" id="hero">
        <div class="hero-background">
            <div class="gradient-orb orb-1"></div>
            <div class="gradient-orb orb-2"></div>
        </div>

        <div class="hero-content">
            <div class="hero-stats reveal">
                <div class="hero-stat">
                    <div class="hero-stat-value">$<span class="counter" data-target="150">0</span>M+</div>
                    <div class="hero-stat-label">Ad Spend Managed</div>
                </div>
                <div class="hero-stat">
                    <div class="hero-stat-value"><span class="counter" data-target="3.4">0</span>X</div>
                    <div class="hero-stat-label">Average ROAS Increase</div>
                </div>
                <div class="hero-stat">
                    <div class="hero-stat-value">$<span class="counter" data-target="500">0</span>M+</div>
                    <div class="hero-stat-label">Client Revenue Generated</div>
                </div>
            </div>

            <h1 class="reveal reveal-delay-1">Scale Your Brand Without Limits</h1>
            <p class="hero-subtitle reveal reveal-delay-2">
                We don't just run ads. We engineer high-converting performance marketing systems that annihilate your competition and scale your revenue aggressively. Explore our core services designed for explosive growth.
            </p>
            <a href="https://calendly.com/performax1-meeting-30" class="btn-primary reveal reveal-delay-3" target="_blank" rel="noopener">
                Claim Your Free Audit
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
            </a>
        </div>
    </section>

    <!-- Brands Banner -->
    <section class="brands-banner" style="padding: 40px 0; background: var(--black-light); border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05);">
        <div class="container">
            <p style="text-align: center; color: var(--gray-500); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 24px;">Trusted by high-growth e-commerce brands</p>
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 40px; opacity: 0.5; align-items: center;">
                <img src="assets/brands/eros.png" alt="Eros" style="height: 30px; object-fit: contain; filter: grayscale(100%) brightness(200%);">
                <img src="assets/brands/aligan.png" alt="Aligan" style="height: 30px; object-fit: contain; filter: grayscale(100%) brightness(200%);">
                <img src="assets/brands/bloomcare.png" alt="Bloomcare" style="height: 30px; object-fit: contain; filter: grayscale(100%) brightness(200%);">
                <img src="assets/brands/gymmawy.png" alt="Gymmawy" style="height: 30px; object-fit: contain; filter: grayscale(100%) brightness(200%);">
                <img src="assets/brands/sultana.png" alt="Sultana" style="height: 30px; object-fit: contain; filter: grayscale(100%) brightness(200%);">
            </div>
        </div>
    </section>

    <!-- Service 1: Deep Account Audit -->
    <section class="services-section">
        <div class="container">
            <div class="section-header reveal">
                <span class="section-tag">01 / Diagnostics</span>
                <h2 class="section-title">Deep Account Audit</h2>
                <p class="section-subtitle">We plug the leaks in your funnel before we pour gasoline on the fire. Stop wasting ad spend on broken setups.</p>
            </div>

            <div class="services-detail-grid">
                <div class="service-detail-card reveal reveal-delay-1">
                    <div class="service-detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                    </div>
                    <h3 class="service-detail-title">Structural Analysis</h3>
                    <p class="service-detail-description">We tear down your Meta, Google, and TikTok ad accounts to identify structural inefficiencies. We fix attribution, campaign hierarchy, and bidding strategies to maximize algorithmic learning.</p>
                </div>
                <div class="service-detail-card reveal reveal-delay-2">
                    <div class="service-detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    </div>
                    <h3 class="service-detail-title">Creative & Offer Teardown</h3>
                    <p class="service-detail-description">An exhaustive review of your top-performing and worst-performing creatives. We map out exactly why your current ads aren\'t converting and identify the angles your competitors are using to steal your market share.</p>
                </div>
                <div class="service-detail-card reveal reveal-delay-3">
                    <div class="service-detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z\"/></svg>
                    </div>
                    <h3 class="service-detail-title">Hidden Profit Leaks</h3>
                    <p class="service-detail-description">We track down invisible money drains: poor audience overlap, wasted budget on underperforming placements, and drop-offs in your post-click journey that are killing your ROAS.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Service 2: High-Converting Ad Creatives -->
    <section class="services-section" style="background: var(--black);">
        <div class="container">
            <div class="section-header reveal">
                <span class="section-tag">02 / Acquisition</span>
                <h2 class="section-title">High-Converting Ad Creatives</h2>
                <p class="section-subtitle">The algorithm is smart, but creative is the targeting. We produce direct-response creatives designed specifically to convert cold traffic into buyers.</p>
            </div>

            <div class="services-detail-grid">
                <div class="service-detail-card reveal reveal-delay-1">
                    <div class="service-detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <h3 class="service-detail-title">UGC & Video Ads</h3>
                    <p class="service-detail-description">Authentic, scroll-stopping video content that's native to the platform. We handle scripting, sourcing creators, editing, and producing hooks that grab attention in the first 3 seconds.</p>
                </div>
                <div class="service-detail-card reveal reveal-delay-2">
                    <div class="service-detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    </div>
                    <h3 class="service-detail-title">Static & Carousel Designs</h3>
                    <p class="service-detail-description">High-impact statics and catalog ads engineered for direct response. We highlight your unique selling propositions, utilize strong psychological triggers, and drive massive click-through rates.</p>
                </div>
                <div class="service-detail-card reveal reveal-delay-3">
                    <div class="service-detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                    </div>
                    <h3 class="service-detail-title">Direct Response Copywriting</h3>
                    <p class="service-detail-description">Words that sell. Our copywriters craft compelling headlines, primary text, and calls to action that agitate pain points and present your product as the ultimate solution.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Service 3: E-commerce CRO -->
    <section class="services-section">
        <div class="container">
            <div class="section-header reveal">
                <span class="section-tag">03 / Optimization</span>
                <h2 class="section-title">E-commerce CRO</h2>
                <p class="section-subtitle">Traffic is useless if it doesn\'t convert. We turn your store into a high-converting machine, extracting every possible dollar from your visitors.</p>
            </div>

            <div class="services-detail-grid">
                <div class="service-detail-card reveal reveal-delay-1">
                    <div class="service-detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    </div>
                    <h3 class="service-detail-title">Heatmapping & User Behavior</h3>
                    <p class="service-detail-description">We implement advanced session recording and heatmaps to see exactly where your customers are getting stuck, clicking away, or losing interest in your funnel.</p>
                </div>
                <div class="service-detail-card reveal reveal-delay-2">
                    <div class="service-detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                    </div>
                    <h3 class="service-detail-title">A/B & Multivariate Testing</h3>
                    <p class="service-detail-description">Data-driven decisions, not guesswork. We rigorously test layouts, offers, pricing models, and checkout flows to systematically increase your Conversion Rate and Average Order Value.</p>
                </div>
                <div class="service-detail-card reveal reveal-delay-3">
                    <div class="service-detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                    </div>
                    <h3 class="service-detail-title">Frictionless Checkout</h3>
                    <p class="service-detail-description">We streamline your cart and checkout process to reduce abandonment rates. We implement trust signals, strategic upsells, and lightning-fast load times to secure the bag.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Service 4: Aggressive Omnichannel Scaling -->
    <section class="services-section" style="background: var(--black);">
        <div class="container">
            <div class="section-header reveal">
                <span class="section-tag">04 / Scale</span>
                <h2 class="section-title">Aggressive Omnichannel Scaling</h2>
                <p class="section-subtitle">Once we hit your target CPA, we don't coast. We scale. We diversify your traffic sources to build a robust, multi-channel empire.</p>
            </div>

            <div class="services-detail-grid">
                <div class="service-detail-card reveal reveal-delay-1">
                    <div class="service-detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                    </div>
                    <h3 class="service-detail-title">Meta & TikTok Mastery</h3>
                    <p class="service-detail-description">Scaling budgets rapidly while maintaining efficiency. We leverage automated rules, advanced broad targeting, and constant creative testing to push volume through social channels.</p>
                </div>
                <div class="service-detail-card reveal reveal-delay-2">
                    <div class="service-detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    </div>
                    <h3 class="service-detail-title">Google Ads Domination</h3>
                    <p class="service-detail-description">Capturing high-intent search traffic and blanketing the web with Performance Max. We ensure that when someone is ready to buy your product category, they find you first.</p>
                </div>
                <div class="service-detail-card reveal reveal-delay-3">
                    <div class="service-detail-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </div>
                    <h3 class="service-detail-title">Retention Systems</h3>
                    <p class="service-detail-description">Acquisition is just the start. We implement sophisticated Email & SMS retention systems (Klaviyo/Postscript) to maximize Customer Lifetime Value and backend profitability.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Why Us Section -->
    <section class="services-section">
        <div class="container">
            <div class="section-header reveal">
                <span class="section-tag">Why Performax 1</span>
                <h2 class="section-title">We Are Your Unfair Advantage</h2>
                <p class="section-subtitle">We operate like an elite special forces unit for your business. Fast execution, data-driven strategy, and ruthless focus on ROI.</p>
            </div>
            
            <div class="process-timeline">
                <div class="process-step reveal reveal-delay-1">
                    <div class="process-number">1</div>
                    <h3 class="process-title">Performance Focused</h3>
                    <p class="process-description">We don't care about vanity metrics. We care about Cost Per Acquisition (CPA), Return on Ad Spend (ROAS), and Net Profit.</p>
                </div>

                <div class="process-step reveal reveal-delay-2">
                    <div class="process-number">2</div>
                    <h3 class="process-title">Full-Funnel Approach</h3>
                    <p class="process-description">From the first ad impression to the final checkout and lifetime retention, we optimize every touchpoint.</p>
                </div>

                <div class="process-step reveal reveal-delay-3">
                    <div class="process-number">3</div>
                    <h3 class="process-title">Data Obsessed</h3>
                    <p class="process-description">Every decision is backed by hard numbers. We track everything to ensure we're constantly iterating and improving.</p>
                </div>

                <div class="process-step reveal reveal-delay-4">
                    <div class="process-number">4</div>
                    <h3 class="process-title">Rapid Execution</h3>
                    <p class="process-description">Speed wins in digital marketing. We launch tests faster, iterate quicker, and scale sooner than traditional agencies.</p>
                </div>
            </div>
        </div>
    </section>
    '''

    new_content = header + new_body + footer

    with open('D:/Lead Intelligence - Performax 1/Claude/Claude/Performax1_Website/services.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Success')
else:
    print('Failed to find markers')
