# NBA Draft Hub

A NBA Draft management application built for the NBA Front Office decision makers

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

*   **Data Filtering & Sorting**:

    * Implement highly specific filtering options (e.g., "guards under 6'3" with >38% 3PT shooting and >3 assists per game") and multi-column sorting.
    *   Dynamic charts for player statistics, physical attributes, and nba combine metrics.
    *   Improved and more detailed player comparison tool. 
    *   Ehanced Data table that can be converted/changed with a button to a list of individual player cards. 
    *   Full integration of all NBA Combine data.
    *   Visual graphics of players strengths and weaknesses based on data like hot or cold shooting zones or spider charts.
    *   Embedded player highlights and full game footage.
    *   Add medical or injury data to profiles

*   **Personalized Decison maker Analysis Dashboard**:

    *   Personal individual dashboards to record private notes, rankings, and player evaluations.
    *   Add login authentication

### AI-Powered Draft Simulation

*   **Full AI Mock Draft Simulator**:
    *   AI-driven draft simulation based on team needs, player projections, historical draft data, and scout consensus.
*   **Roster**:
    *   Simulate how a prospect fits into the current Mavericks roster
    *   Interactive tool to add/remove/swap players.
    *   Automated indication of how well a player meets Mavericks needs.
    *   Ability to view and analyze prospects for future draft classes (e.g., 2025, 2026).
*   **Historic NBA Player Archetype Comparison**:
    *   Utilize a historical player API to compare prospects to past and current NBA players based on statistical profiles.

### Financial & Contractual Management

*   **Comprehensive Salary Cap Integration**:
    *   Calculate rookie contract implications and their impact on the Mavericks' salary cap.
    *   Model financial impact of draft decisions
    *   Track buyout clauses, contract statuses, and transfer complexities for international prospects.

### Platform & UX Enhancements

*   **Codebase Modernization & Performance**:
    *   Potential migration to TypeScript for enhanced type safety and maintainability.
    *   Advanced Framer Motion animations for a more fluid and premium user experience.
    *   Exploration of Material-UI Pro features for sophisticated data grids and UI components.
*   **Accessibility & Cross-Platform Experience**:
    *   Enhanced keyboard navigation
    *   Further optimization of mobile and tablet user experience.
*   **Data Exportability**:
    *   Allow exporting draft board data, player profiles, and statistical analyses to PDF or CSV formats.
