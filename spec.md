# Himalayan Hush Expeditions

## Current State
New project — no existing code.

## Requested Changes (Diff)

### Add
- Full marketing website for Himalayan Hush Expeditions (HHE), a specialized student tour operator
- Hero/landing section with immersive scrollytelling aesthetic for the Spiti Valley brand
- "Spiti: The Silent Time Capsule" 10-day itinerary page with day-by-day breakdown
- About section covering vision, mission, thematic pillars (Geological Deep Time, Climate Resilience, Spiritual Neuroscience)
- Pricing section showing per-student cost breakdown (₹33,338 final price with GST)
- Carbon calculator widget: user inputs group size, app shows estimated carbon footprint and offset cost
- Booking inquiry form: school name, contact person, email, phone, preferred dates, group size, curriculum board (IB/CBSE/ICSE/Other), submit to backend
- Sustainability & Ethics section covering zero waste, carbon neutrality, cultural ethics
- Safety & Risk Management section (AMS protocol, evacuation, insurance)
- Team/org structure section
- Testimonials/Guardian Stories placeholder section
- FAQ section
- Backend stores booking inquiries

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend: Motoko canister stores booking inquiry submissions (school, contact, email, phone, dates, group size, board)
2. Frontend: Multi-section single-page website with navigation
   - Nav bar with links to all sections
   - Hero: full-screen with tagline and CTA
   - About/concept section
   - Three thematic pillars cards
   - 10-day itinerary timeline
   - Pricing breakdown table with carbon calculator
   - Sustainability section
   - Safety section
   - Team org chart
   - Booking inquiry form wired to backend
   - FAQ accordion
   - Footer
