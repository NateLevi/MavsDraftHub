# Dallas Mavericks Draft Hub

A NBA Draft management application built for the Dallas Mavericks Front Office decision makers and scouts.

## Features

- **Interactive Big Board**: Sortable draft board with player info and scout rankings
- **Player Profiles**: Comprehensive player bio section with tab seclection and accordians
- **Scout Rankings Integration**: Visual representation in cards, rank determined by a consensus rank ignoring null values (acting as missing scout grades) and calculated the overall rank by the mean of all scout ranks + espns.
    Green chip = scout ranks **higher** than average (with their own vote removed).  
    Red chip = scout ranks **lower** than average.
- **Dynamic Scouting Reports**: Add and manage new scouting reports with the list of current reports
- **Player Comparison Tool**: Side-by-side player analysis tool to compare player data
- **Navigation**: Added simple navbar at top and sidebar for quick access to players when on player profile or comparison tool 
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Data Handling
- Converted JSON data into merged structured objects ( mergePlayers function with react context/provider )
- Separated the helper functions and board styles into a separate file to honor separation of concerns.
- Added a teamdata file containing college and pro teams colors and logos ( I decided to keep these for the project to make it visually appealing. However I probably would adjust the data or add more dependent on the json or database.)

## Tech Stack
- **Frontend**: React Vite
- **UI Library**: Material-UI
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS + MUI
- **Icons**: Material-UI Icons
- **Animations**: Framer Motion

## Live Demo

[View Live Application](https://mavsdrafthub.netlify.app/)

## Potential future enhancements and features

This section outlines potential future features or ideas I would consider integreting into the Draft hub application. 

### Advanced Analytics & Visualization

*   **Data Filtering & Sorting**: Implement highly specific filtering options (e.g., "guards under 6'3" with >38% 3PT shooting and >3 assists per game") and multi-column sorting.
*   **Interactive Data Charts & Dashboards**:
    *   Dynamic charts for player statistics, physical attributes, and combine metrics.
    *   Trend analysis for player performance over time.
    *   Visual comparisons of multiple players across key metrics.
*   **NBA Combine Metrics Deep Dive**:
    *   Full integration of all NBA Combine data
    *   Visualizations for athletic testing results (e.g., spider charts for agility, speed, strength).
*   **Player Video Integration & Analysis**:
    *   Embeddable player highlights and full game footage.
    *   (Future AI) Movement tracking analysis from game film to assess biomechanics, court coverage, and defensive positioning.

### AI-Powered Intelligence & Simulation

*   **Full AI Mock Draft Simulator**:
    *   AI-driven draft simulation based on team needs, player projections, historical draft data, and scout consensus.
    *   Real-time updates and "what-if" scenario planning as the draft unfolds.
    *   Probability analysis for player availability at specific pick slots.
*   **Roster Fit & Team Impact Simulation**:
    *   Simulate how a prospect fits into the current Mavericks roster
    *   Interactive tool to add/remove/swap players.
    *   Automated indication of how well a player meets Mavericks needs.
*   **NBA Player Archetype Comparison Engine**:
    *   Utilize a historical player API to compare prospects to past and current NBA players based on statistical profiles, physical attributes, and playing styles.

### Player Development & Performance Engine

*   **AI-Driven Strengths & Weaknesses Analysis**:
    *   Analyze player performance data (stats, film breakdown, combine results, scout reports) to identify specific skill gaps and areas of excellence.
    *   Detailed breakdown of offensive (e.g., shooting zones, shot types, finishing ability) and defensive (e.g., on-ball, off-ball, rim protection) capabilities.
*   **Personalized Training & Development Plans**:
    *   Generate customized training regimens and G-League development plans based on AI analysis.
    *   Skill progression tracking with visualized milestones and timelines.
    *   Recommendations for specific coaching focuses and drills.

### Financial & Contractual Management

*   **Comprehensive Salary Cap Integration**:
    *   Calculate rookie contract implications and their impact on the Mavericks' multi-year salary cap outlook.
    *   Model financial impact of draft decisions
*   **International Player Management**:
    *   Track buyout clauses, contract statuses, and transfer complexities for international prospects.
    *   Maintain a database of international league quality and translation factors for statistics.

### Injury and Character Assessment

*   **Medical & Character Evaluation Hub**:
    *   Centralized tracking of player injury histories with detailed timelines.
    *   Consolidated character evaluations from interviews, background checks, and scout reports.

### Strategic & Long-Term Planning

*   **Multi-Year Draft & Prospect Database**:
    *   Ability to view and analyze prospects for future draft classes (e.g., 2025, 2026).
    *   Long-term roster planning based on evolving team needs and future talent pools.
*   **Personalized Scout Analysis Dashboard**:
    *   Secure, individual dashboards for scouts to record private notes, rankings, and player evaluations.
    *   Tools for scouts to compare their evaluations against team consensus and AI-generated insights.

### Platform & UX Enhancements

*   **Codebase Modernization & Performance**:
    *   Potential migration to TypeScript for enhanced type safety and maintainability.
    *   Advanced Framer Motion animations for a more fluid and premium user experience.
    *   Exploration of Material-UI Pro features for sophisticated data grids and UI components.
*   **Accessibility & Cross-Platform Experience**:
    *   Enhanced keyboard navigation
    *   Further optimization of mobile and tablet user experience.
*   **Data Exportability**:
    *   Allow users to export draft board data, player profiles, and statistical analyses to PDF or CSV formats.
