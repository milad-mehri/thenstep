[High Quality Demo](https://youtu.be/mIPAovu09cM)

![Demo](0121.gif)

# NextStep

## Inspiration

Our inspiration came from wanting a better, more flexible digital mapping experience—one that not only shows routes from A to B but also weaves in health, safety, and environmental considerations. We saw potential for a tool that can:

- Suggest scenic, well-lit walking paths for exercise or leisurely strolls.
- Surface environmentally friendly commute options (e.g. bike routes, green corridors).
- Keep travelers informed of safety conditions, like night visibility or road closures.

We set out to create a map-based “search engine” that uses natural language queries (“find me a scenic walking route” or “what community events are happening this weekend?”) and places everything on an interactive map.

## What it does

**NextStep** is a versatile map application that:

- **Searches Anything**: Use natural language to find normal driving routes, scenic alternatives with better night visibility, or local news articles.
- **Emphasizes Health & Safety**: Offers route variants factoring in healthier, safer, or well-lit areas at night.
- **Focuses on Environment**: Surfaces eco-friendly transit options, scenic hiking spots, or low-emission routes.

## How we built it

- **Backend**: Built with JavaScript and Bun.
- **Frontend**: Built with Next.js.
- **Word Processing**: Powered by Chat Completions API.
- **Web Scraping**: Performed using Puppeteer.
- **Maps**: Created with OpenStreetMap and Google Maps API.

## Challenges we ran into

- **Rate Limiting & API Quotas**: We quickly hit our Google search tokens cap, pushing us to explore new methods of data retrieval.
- **Data Complexity**: Integrating environment- and health-related data (like well-lit routes, scenic viewpoints) required creative scraping and filtering.
- **Balancing Multiple Sources**: Merging local event boards, safety reports, and route info into one cohesive UI.

## Accomplishments that we're proud of

Incorporating environmental data, we've integrated scenic route recommendations, bridging the gap between digital maps and user-focused needs like health and safety. Our natural language approach handles everything from “Plan a day hike near me” to “Find the best lit route for a late jog,” delivering relevant map results on the fly. Despite API rate limits, we adapted our methods and stayed true to creating a more holistic mapping experience. Users gain a healthier, safer, and more flexible mapping tool—designed to fit their everyday needs.

## What we learned

We discovered the complexity of integrating data from multiple sources—especially balancing APIs, web scraping, and AI-driven query processing for routes. Along the way, we gained deeper insights into handling environmental and safety-focused datasets, aligning them with user-centric design principles. We also learned how to adapt quickly when facing rate limits or changing requirements, ensuring our final solution remained both flexible and people-focused.

## What's next for NextStep

NextStep aims to expand its reach by incorporating more specialized data—such as crowd-sourced safety reports, updated environmental impact scores, or real-time public transit conditions. We plan to refine the AI-driven query handling to offer even more nuanced route suggestions (e.g., “scenic route with the fewest hills”). Ultimately, we envision NextStep as a holistic travel companion—encouraging healthier and greener journeys.

