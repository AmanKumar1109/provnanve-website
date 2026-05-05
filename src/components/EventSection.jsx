import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MapPin, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';

import eminanceInPromptImg from '../assets/event thumbnails/EminenceInPrompt_Promptathon_Helix.png';
import shinobiScriptImg from '../assets/event thumbnails/ShinobiScript_DSA_Helix.png';
import mangakasEdgeImg from '../assets/event thumbnails/MangakasEdge_GraphicDesign_Helix.png';
import hunterRankProImg from '../assets/event thumbnails/HunterRankPro_ResumeMaking_Helix.png';
import fragOpsImg from '../assets/event thumbnails/FragOpsCSGOELite_EGamingPC_Helix.png';
import triggerPointImg from '../assets/event thumbnails/TriggerPointBGMIArena_EGamingMobile_Helix.png';
import colorsOfKonohaImg from '../assets/event thumbnails/ColorsOfKonoha_RangoliMaking_Helix.png';
import sageModeImg from '../assets/event thumbnails/SageMode_Quiz_Helix.png';

import paperDanceImg from '../assets/event thumbnails/ORIGAMIRYTHM_PAPERDANCE_TARANGINI.png';
import streetReloadedImg from '../assets/event thumbnails/DANDADANCE_STREETRELOADED_TARANGINI.png';
import soloSongImg from '../assets/event thumbnails/KAROKE-ON_SOLO_DUOSinging_TARANGINI.png';
import cutTheCrapImg from '../assets/event thumbnails/DRESSINGMYDARLING_PAPERDRESSMAKING_TARANGINI.png';
import soloGroupDanceImg from '../assets/event thumbnails/MYDANCEACADEMIA_SOLOGROUPDANCE_TARANGINI.png';
import facePaintingImg from '../assets/event thumbnails/KOMICANPAINT_FACEPAINTING_TARANGINI.png';
import rampWalkImg from '../assets/event thumbnails/JOJOSBIZARREWALK_RAMPWALK_TARANGINI.png';

import photographyImg from '../assets/event thumbnails/SHARINGANLENS_PHOTOGRAPHYCOMPETITION_XPECTRA.png';
import reelMakingImg from '../assets/event thumbnails/INFINITESCROLL_REELMAKINGCOMPETITION_XPECTRA.png';
import aiFilmMakingImg from '../assets/event thumbnails/AIXFILM_AIFILMMAKING_XPECTRA.png';
import khanaKhazanaImg from '../assets/event thumbnails/FOODWARS_KHANAKHAZANA_XPECTRA.png';

import gullyCricketImg from '../assets/event thumbnails/STREETSTRIKERS_GULLYCRICKET_RVSPANTHERS.png';
import basketballImg from '../assets/event thumbnails/SLAMDUNK_BASKETBALL3X3_RVSPANTHERS.png';
import volleyballImg from '../assets/event thumbnails/KARASUNOSMASH_VOLLEYBALL_RVSPANTHERS.png';
import footballImg from '../assets/event thumbnails/BLUELOCK_FOOTBALL_RVSPANTHERS.png';
import tugOfWarImg from '../assets/event thumbnails/TUGOFTITANS_TUGOFWAR_RVSPANTHERS.png';
import armWrestlingImg from '../assets/event thumbnails/IRONGRIP_ARMWRESTLING_RVSPANTHERS.png';
import musicalChairImg from '../assets/event thumbnails/ATTACKONCHAIRS_MUSICALCHAIR_RVSPANTHERS.png';

import iotDesignImg from '../assets/event thumbnails/GUNDAMFRAMEARCHITECTURE_IOTDESIGN_CIRCUITRON.png';
import rubiksCubeImg from '../assets/event thumbnails/SHIKAMARUSCUBE_RUBIKSCUBE_CIRCUITRON.png';
import roboRaceImg from '../assets/event thumbnails/CYBERRUNNEREDGE_ROBORACE_CIRCUITRON.png';
import roboSoccerImg from '../assets/event thumbnails/FULLMETALKICKOFF_ROBOSOCCER_CIRCUITRON.png';
import roboWarImg from '../assets/event thumbnails/GUNDAMLASTSTAND_ROBOWAR_CIRCUITRON.png';
import balloonPopImg from '../assets/event thumbnails/SHINOBIBALLOONSMASH_BALLOONPOP_CIRCUITRON.png';
import treasureHuntImg from '../assets/event thumbnails/FINDINGONEPIECE_TREASUREHUNT_CIRCUITRON.png';
import bridgeTheGapImg from '../assets/event thumbnails/SENKUSBRIDGE_BRIDGETHEGAP_CIRCUITRON.png';

/* ═══════════════════════════════════
    EVENT DATA
   ═══════════════════════════════════ */
const categories = [
  {
    id: 'helix',
    name: 'HELIX',
    label: 'Tech & AI Club',
    color: '#38bdf8',
    events: [
      { title: 'Eminence in Prompt', desc: "Step into the role of a world-builder in this Isekai-inspired AI generation challenge. As the master of 'Divine Command,' you are tasked with manifesting high-quality visuals from another realm using state-of-the-art Generative AI tools. This is not just about clicking buttons; it is a rigorous test of your Prompt Engineering skills and your ability to guide a machine toward a coherent artistic vision. Only the most visionary architects will claim their place on the throne.", icon: '🎨', image: eminanceInPromptImg, prize: 'Exciting Prizes', time: '60 min', venue: 'TCS Lab, 1st Floor, B2 Block', rules: ['Permitted tools: Nano Banana', "Participants must document their prompt engineering iterations (the 'Prompt Chain')", 'Final output must be generated on-site within the 45-minute window', 'Use of pre-generated images or external storage devices is strictly prohibited', 'Images must strictly adhere to the theme revealed at the start'], coordinators: [{ 'name': 'Satish Verma', 'contact': '6204477023' }, { 'name': 'Umang Sharma', 'contact': '7979807498' }, { 'name': 'Rishi Raj', 'contact': '9953534520' }, { 'name': 'Priyanshu Ghosh', 'contact': '7549141757' }] },
      { title: 'Shinobi Script', desc: "In the high-stakes world of competitive programming, only those with the swiftest logic and most refined 'syntax-jutsu' will survive. Shinobi Script is a grueling test of your Data Structures and Algorithms knowledge, requiring you to solve complex problems under immense pressure. Much like a ninja navigating a hidden village, you must choose the most efficient path—optimizing for time and space complexity to bypass logical traps. Plagiarism is the ultimate taboo here; only your individual logic and problem-solving prowess will lead you to victory.", icon: '🥷', image: shinobiScriptImg, prize: 'Exciting Prizes', time: '90 min', venue: 'TCS Lab, 1st Floor, B2 Block', rules: ['Supported Languages: C, C++, Java, and Python', 'All solutions must pass the hidden test cases within the specified time and memory limits', 'No internet access is allowed except for the official competition portal', 'Use of any AI-based coding assistants (GitHub Copilot, ChatGPT) results in instant ban', 'In case of a tie, the participant with the lowest total submission time wins'], coordinators: [{ 'name': 'Satish Verma', 'contact': '6204477023' }, { 'name': 'Subrata Paul', 'contact': '6206126172' }, { 'name': 'Umag Sharma', 'contact': '7979807498' }, { 'name': 'Dhanraj Kumar', 'contact': '6205442077' }, { 'name': 'Aditi Kumari', 'contact': '9031494973' }] },
      { title: "Mangaka's Edge", desc: "Sharpen your digital pen and prepare to illustrate the future in Mangaka's Edge. This event is a high-stakes battle of brand identity and visual narrative, challenging designers to create viral posters and logos from an entirely blank canvas. Without the crutch of pre-made templates, you must rely solely on your understanding of Typography, Color Theory, and Composition. Every stroke must be intentional and every pixel must serve the story. Your work will be judged on its originality, impact, and its ability to capture the soul of the Anime theme.", icon: '🖌️', image: mangakasEdgeImg, prize: 'Exciting Prizes', time: '90 min', venue: 'AI Skills Lab, 2nd Floor, B2 Block', rules: ['Tools allowed: Adobe Creative Suite (Photoshop/Illustrator), Figma, or Canva (Empty Canvas only)', 'Direct copy-pasting of existing anime artwork is considered plagiarism', 'Final design must be submitted in PDF and PNG formats', 'Participants must be prepared to present their layer structure to verify authenticity', "Design must include the specific 'Provenance 6.0' branding elements provided"], coordinators: [{ 'name': 'Sumit Ghosh', 'contact': '6207036484' }, { 'name': 'T. Sasi Kiran', 'contact': '8000547922' }, { 'name': 'Abhijeet Ghosh', 'contact': '6299390773' }, { 'name': 'Prince', 'contact': '—' }] },
      { title: 'Hunter Rank: PRO', desc: 'Embark on a professional RPG quest to level up your career standing in Hunter Rank: PRO. Powered by the HireTip platform, this event challenges participants to build an S-Rank professional resume capable of defeating the most advanced Applicant Tracking Systems (ATS). Your resume is your primary weapon; mastering its keywords and structural formatting is essential for survival. Prove that you possess the technical qualifications and strategic mindset to stand out in the global talent marketplace.', icon: '📜', image: hunterRankProImg, prize: 'Exciting Prizes', time: '90 min', venue: 'AI Skills Lab, 2nd Floor, B2 Block', rules: ['Resumes must be generated or uploaded strictly through the HireTip platform', 'Evaluation is based on ATS compatibility score, keyword density, and professional layout', 'Participants must use their official college email ID for registration', 'Graphical resumes (heavy images/multiple columns) that are not ATS-friendly will be penalized'], coordinators: [{ 'name': 'Rupesh Mahakud', 'contact': '8709136459' }, { 'name': 'Murli Agarwal', 'contact': '9241992335' }, { 'name': 'Neha Kumari', 'contact': '—' }, { 'name': 'Aryan Raj', 'contact': '8210113313' }] },
      { title: 'Frag-Ops: PC Gaming', desc: 'Welcome to the tactical arena of Frag-Ops, a high-octane 5v5 FPS tournament where strategy meets lightning-fast reflexes. This is a battleground where squad coordination and map awareness are the only keys to survival. Under the cyberpunk atmosphere of Provenance 6.0, teams must navigate the competitive map pool, executing precise strategies to outmaneuver the opposition. Only raw skill and ironclad discipline will determine which squad remains the last one standing.', icon: '🔫', image: fragOpsImg, prize: 'Exciting Prizes', time: '2 hrs', venue: 'TCS Lab, 1st Floor, B2 Block', rules: ['Tournament Format: 5v5 Tactical (Competitive Settings)', 'Participants must provide their own Laptops, Mouse, and Headsets', 'Use of scripts, wall-hacks, aim-assist, or external overlays results in a permanent ban', 'Map pool: Dust II, Mirage, Inferno, Nuke, Overpass (Veto system applies)', 'Standard timeout and technical pause rules will be followed'], coordinators: [{ 'name': 'Aman Kumar Jha', 'contact': '6206804326' }, { 'name': 'Shubham Prajapati', 'contact': '9006099575' }, { 'name': 'Dharmender Singh', 'contact': '—' }] },
      { title: 'Trigger-Point: BGMI Arena', desc: 'Trigger-Point is a high-stakes Battle Royale survival sprint designed for the elite mobile squads of the campus. Dropping into a hostile environment, your team must demonstrate unparalleled tactical superiority and survival instincts to secure victory. Every decision—from your drop location to your final rotation—must be calculated with precision. Only those with the fastest fingers will prevail.', icon: '📱', image: triggerPointImg, prize: 'Exciting Prizes', time: '2 hrs', venue: 'TCS Lab, 1st Floor, B2 Block', rules: ['Platform: Mobile smartphones only', 'Strictly no emulators, iPads, or gaming tablets allowed', 'External triggers, cooling fans with software integration, or GFX tools are banned', 'Points system: Survival (Placement) points + Finish (Kill) points', 'Teams must maintain a stable internet connection; organizers are not responsible for lag'], coordinators: [{ 'name': 'Aman Kumar Jha', 'contact': '6206804326' }, { 'name': 'Asish', 'contact': '—' }, { 'name': 'Aman Kumar', 'contact': '6206939304' }] },
      { title: 'Colors of Konoha', desc: 'Experience a stunning fusion of Indian heritage and the Anime Protocol in Colors of Konoha. This traditional Rangoli competition challenges teams of artists to blend intricate cultural patterns with iconic anime visual elements. It is a celebration of creativity where the floor becomes your canvas and colored powders become your medium. Teams must work within a strict time limit and boundary size, manifesting a vision that bridges two different worlds.', icon: '🌸', image: colorsOfKonohaImg, prize: 'Exciting Prizes', time: '90 min', venue: 'TBA', rules: ['Theme: Fusion of Traditional Indian Patterns and Anime Lore', 'Participants must bring their own colors, stencils, and cleaning materials', 'Use of printed references is allowed, but direct tracing is prohibited'], coordinators: [{ 'name': 'Khusboo Kumari', 'contact': '9142406515' }, { 'name': 'Jyoti Kumari', 'contact': '8521500846' }, { 'name': 'Keshav Raj', 'contact': '6201479730' }] },
      { title: 'Sage Mode: Trivia', desc: 'Enter the ultimate realm of knowledge in Sage Mode: Trivia. This comprehensive tech quiz is designed to test your deep understanding of IT, Artificial Intelligence, Hardware history, and Anime lore. The competition begins with a grueling written preliminary round, filtering out all but the most enlightened minds for the high-speed buzzer finals. Prove that your wisdom transcends the ordinary and achieve the coveted S-Rank status.', icon: '🧠', image: sageModeImg, prize: 'Exciting Prizes', time: '90 min', venue: 'TBA', rules: ['Rounds: Written Prelims followed by Stage-based Buzzer Finals', 'Strictly no smartwatches or smartphones allowed during the quiz', "Topics: IT Trends, Computer History, AI, Hardware, and 'Otaku' Tech Lore", "The Quizmaster's decision is final in all scoring disputes"], coordinators: [{ 'name': 'Satish Verma', 'contact': '6204477023' }, { 'name': 'Gaurav', 'contact': '7857024380' }, { 'name': 'Priya Mandal', 'contact': '9934750671' }, { 'name': 'Swati', 'contact': '—' }, { 'name': 'Shaiqua Parween', 'contact': '9608447769' }] },
    ],
  },
  {
    id: 'tarangini',
    name: 'TARANGINI',
    label: 'Cultural Club',
    color: '#fb923c',
    events: [
      { title: 'Paper Dance', desc: 'Paper Dance is a lively and entertaining partner event that combines dancing with a fun elimination challenge. Pairs dance together on a sheet of newspaper, and with each round, the paper gets folded smaller and smaller. The goal is to keep both feet on the paper without stepping off while the music plays. As the paper shrinks, the challenge intensifies, testing balance, coordination, and teamwork between partners.', icon: '👣', image: paperDanceImg, prize: 'Exciting Prizes', time: '90 min', venue: 'Auditorium', rules: ['Each pair must stand on a newspaper sheet placed on the floor', 'Must dance without stepping off the paper while music plays', "If any player's foot goes outside the paper, the pair is eliminated", 'After each round, paper is folded in half', 'Unsportsmanlike behaviour will result in elimination'], coordinators: [{ 'name': 'Palak', 'contact': '9142693551' }, { 'name': 'Ritika Tigga', 'contact': '7970867238' }, { 'name': 'Aditi Raj', 'contact': '6204520617' }, { 'name': 'Ankit Oraon', 'contact': '7903726710' }] },
      { title: 'Street Reloaded', desc: "Street Reloaded is a fast-paced and spontaneous dance challenge that puts participants' freestyle skills to the ultimate test. A random song is played on the spot, and participants must perform an energetic and creative routine within a short time limit of 30 to 50 seconds. There is no room for preparation — only raw talent, confidence, and stage presence matter. It's the perfect platform for dancers who thrive under pressure.", icon: '🕺', image: streetReloadedImg, prize: 'Exciting Prizes', time: '90 min', venue: 'Basketball Court', rules: ['Time limit: 30–50 seconds per performance', 'Song will be randomly selected and played on the spot', 'No prior knowledge of the song is given'], coordinators: [{ 'name': 'Sneha Kumari', 'contact': '9798356931' }, { 'name': 'Meghna Kumari', 'contact': '9332343696' }] },
      { title: 'Solo Song', desc: 'Solo and Duo Singing is a captivating vocal talent showcase that gives individual singers and pairs the spotlight to perform their chosen songs on the main stage. Participants are encouraged to bring their personality and emotion to their performance, with self-accompaniment on instruments like guitar or keyboard warmly welcomed. The event celebrates musical talent in its purest form, rewarding those who can connect with the audience through their voice and stage presence.', icon: '🎤', image: soloSongImg, prize: 'Exciting Prizes', time: '90 min', venue: 'Main Stage', rules: ['Lyrics must be decent and non-offensive', 'Time limit: 2:30 – 3:00 minutes', 'Self-accompaniment allowed (guitar, keyboard, etc.)'], coordinators: [{ 'name': 'Muskan Xalxo', 'contact': '6202293536' }, { 'name': 'Sweta Kumari', 'contact': '9060108628' }, { 'name': 'Riya Singh', 'contact': '9102582006' }, { 'name': 'Sushmita Kumari', 'contact': '9229770206' }, { 'name': 'Puja Modi', 'contact': '9229856879' }] },
      { title: 'Dressing My Darling', desc: 'Paper Dress Making is a creative and imaginative design competition where individuals or teams craft stunning wearable outfits using nothing but newspaper provided by the college. Participants must bring their artistic vision to life within a time limit of 1 to 1.5 hours, designing outfits based on the themes of Saree or Fancy Dress. The event concludes with an exciting ramp walk accompanied by music, where one team member proudly showcases the handcrafted paper outfit on the runway.', icon: '👗', image: cutTheCrapImg, prize: 'Exciting Prizes', time: '90 min', venue: 'Civil Building', rules: ['Only newspaper provided by the college can be used', 'Use of stapler is prohibited', 'Any other required items must be brought by participants', 'One member must wear the paper dress for the ramp walk', 'Time limit: 1 – 1.5 hours', 'Theme: Saree / Fancy Dress'], coordinators: [{ 'name': 'Moon Dutta', 'contact': '8789097624' }, { 'name': 'Puja Mahato', 'contact': '6202038034' }, { 'name': 'Madhubashi', 'contact': '9153899849' }, { 'name': 'Riya Singh', 'contact': '9102582006' }] },
      { title: 'My Dance Academia', desc: 'Solo, Duo, and Group Dance is a versatile and celebrated stage event that welcomes dancers of all formats to showcase their choreography and performance skills. Whether performing alone, with a partner, or as part of a group, participants get the opportunity to express their artistry through movement on the main stage. Music must be submitted in advance, and participants are expected to deliver polished, energetic, and well-rehearsed routines that captivate the audience.', icon: '💃', image: soloGroupDanceImg, prize: 'Exciting Prizes', time: '90 min', venue: 'Main Stage', rules: ['Solo performance: 2–3 minutes', 'Duo performance: 3–5 minutes', 'Group performance: 4–6 minutes', 'Music must be submitted in advance (MP3 / Pen drive)'], coordinators: [{ 'name': 'Deepal Kumari', 'contact': '8581915569' }, { 'name': 'Anshu Sharma', 'contact': '8709618562' }] },
      { title: 'Komi Can Paint', desc: "Face Painting is a theme-based artistic competition where teams of two bring creativity and skill together to paint a striking design on a partner's face. The theme is announced by the college on the day of the event, challenging participants to think on their feet and execute their concept within a time limit of 1 to 1.5 hours. It's a wonderful blend of art, imagination, and teamwork that celebrates visual creativity.", icon: '🎨', image: facePaintingImg, prize: 'Exciting Prizes', time: '90 min', venue: 'Civil Building', rules: ['Theme will be given by the college on the day of the event', 'Painting must be designed according to the given theme', 'Participants must bring their own materials', 'Time limit: 1 – 1.5 hours', 'Painting must be done on the spot', 'Participants may be asked to explain their concept'], coordinators: [{ 'name': 'Isha Mahato', 'contact': '9942911020' }, { 'name': 'Komal Kumari', 'contact': '6200854439' }, { 'name': 'Palak Kumari', 'contact': '9341900590' }] },
      { title: "Jojo's Bizarre Walk", desc: 'Ramp Walk is a glamorous fashion and modeling event where individuals or groups take to the main stage to showcase their outfits, confidence, and walking skills based on a pre-determined theme. With a diverse range of themes — from Garden of Time and Futuristic Fantasy to Retro Glamour, Cultural wear, and Junk to Funk — the event celebrates style, self-expression, and creativity.', icon: '✨', image: rampWalkImg, prize: 'Exciting Prizes', time: '90 min', venue: 'Main Stage', rules: ['Costume and walk must match the given theme', 'Music track must be submitted in advance (MP3 / Pen drive)', 'No vulgar, offensive, or inappropriate content allowed', 'Available Themes: Garden of Time, Futuristic Fantasy (Cyberpunk), Social Awareness, Retro Glamour, Culture Based, Cartoon/Comic Characters, Junk to Funk, FreeStyle'], coordinators: [{ 'name': 'Prayog Priyanshu', 'contact': '7870114888' }, { 'name': 'Gaurav Singh', 'contact': '7857024380' }, { 'name': 'Pushkar Priyadarshi', 'contact': '7371091715' }, { 'name': 'Govind Kumar Sharma', 'contact': '9060239209' }, { 'name': 'Pallavi Kumari', 'contact': '9508827905' }] },
    ],
  },
  {
    id: 'xpectra',
    name: 'XPECTRA',
    label: 'Media Club',
    color: '#c084fc',
    events: [
      { title: 'Sharingan Lens', desc: 'The Photography Competition at Xpectra-Provenance 6.0 invites college students to capture compelling visual stories through their lenses. Open to individuals only, it tests creativity, composition, and technical skills around a specific theme. Only basic editing is allowed to preserve authenticity, and all photographs must be original and high-resolution.', icon: '📸', image: photographyImg, prize: 'Exciting Prizes', time: '90 min', venue: 'TBA', rules: ['Open to all college students', 'Follow the given theme or open category if not specified', 'Submission format: JPG or PNG, minimum HD resolution', 'Basic editing allowed; no heavy manipulation', 'Photos must be original and taken by the participant', 'No plagiarism, copied images, or offensive content'], coordinators: [{ 'name': 'Kaif Ansari', 'contact': '8969290599' }, { 'name': 'Navin Pradhan', 'contact': '9334863034' }] },
      { title: 'Infinite Scroll', desc: 'The Reel Making Competition challenges individuals to produce engaging vertical videos of 30 to 60 seconds that resonate with current trends while delivering a strong message. Original content, modern editing tools, and creative execution are key to standing out. Submissions must be uploaded on Instagram by tagging the official page and using the event hashtag.', icon: '📱', image: reelMakingImg, prize: 'Exciting Prizes', time: '90 min', venue: 'TBA', rules: ['Video duration: 30 to 60 seconds only', 'Format: Vertical video in 9:16 ratio, MP4 format', 'Content must be original; no copyright violations for music or video', 'Use of AI tools allowed if the category permits', 'Upload on Instagram, tag the official page, and use the given hashtag', 'Keep profile public until results are announced'], coordinators: [{ 'name': 'Saksham Kumar', 'contact': '7004352665' }, { 'name': 'Sumit Kumar', 'contact': '9341523834' }] },
      { title: 'Ai X Film', desc: "AI Film Making invites individuals or teams of up to 3 to produce a short film of 1 to 3 minutes using generative AI tools, blending original prompts into a cohesive cinematic narrative. It's a chance to push creative boundaries and showcase how artificial intelligence can reshape storytelling without traditional cameras.", icon: '🎬', image: aiFilmMakingImg, prize: 'Exciting Prizes', time: '90 min', venue: 'TBA', rules: ['Film duration: 1 to 3 minutes', 'All visual assets must be AI-generated', 'Royalty-free music and voiceovers are permitted', 'Prompts must be original', 'Submission format: MP4, minimum 1080p resolution'], coordinators: [{ 'name': 'Rishi Raj', 'contact': '9955334520' }, { 'name': 'Roshan Kumar', 'contact': '8084495001' }] },
      { title: 'Food Wars', desc: 'Khana Khazana is a unique culinary challenge where teams of exactly 3 members prepare and present creative no-cook dishes — such as salads, sushi rolls, wraps, and fruit platters — within 35 minutes, followed by 10 minutes for plating. Judging is based on creativity, flavor combinations, presentation, and strict adherence to the no-fire rule.', icon: '🥗', image: khanaKhazanaImg, prize: 'Exciting Prizes', time: '90 min', venue: 'TBA', rules: ['Time limit: 35 minutes for preparation + 10 minutes for dressing and plating', 'All ingredients and utensils must be brought by participants; only a working table is provided', 'No pre-cooked, boiled, or pre-heated items allowed', 'Teams must present a chart with the dish name and full list of ingredients', 'All participants must clean their working area after preparation'], coordinators: [{ 'name': 'Prem Shaw', 'contact': '6206735402' }, { 'name': 'Aniket Kumar', 'contact': '6202888056' }] },
    ],
  },
  {
    id: 'panthers',
    name: 'RVS PANTHERS',
    label: 'Sports Club',
    color: '#f87171',
    events: [
      { title: 'Street Strikers', desc: "Gully Cricket brings the raw energy of street cricket to the main stage ground. This fast-paced 6-over match uses a COSCO ball and tests players' precision, as hitting the ball over the boundary results in an automatic out. The unique rule allowing a lone remaining batsman to continue fighting adds a thrilling climax to the game.", icon: '🏏', image: gullyCricketImg, prize: 'Exciting Prizes', time: '90 min', venue: 'TBA', rules: ['6-over match; bowlers limited to 2, 2, 1, and 1 over respectively', 'Hitting over the boundary results in automatic out', 'Overthrow runs will be counted', 'If only one batsman is left, they can continue batting alone', 'If a fielder touches an air ball, it counts as four runs', 'Match played using a COSCO ball', "Arguing with the umpire leads to team disqualification; umpire's decision is final"], coordinators: [{ 'name': 'Ashmit Sinha', 'contact': '7033937944' }, { 'name': 'Shafaque Aftab', 'contact': '8541096062' }, { 'name': 'Saaraswati Kumari', 'contact': '8235494562' }] },
      { title: 'Slam Dunk', desc: 'This high-energy 3-on-3 basketball tournament demands agility, quick decision-making, and teamwork across three intense 5-minute quarters. Teams must push the pace within a 12-24 second shot clock and manage fouls carefully. If scores are tied at the end, a sudden-death overtime decides the winner.', icon: '🏀', image: basketballImg, prize: 'Exciting Prizes', time: '90 min', venue: 'Basketball Court', rules: ['After a score, the defending team gets possession', 'Ball must be passed beyond the three-point line to restart play (Check Ball Rule)', 'Ball must be cleared beyond the three-point line after every defensive rebound, steal, or airball', 'Duration: 3 quarters of 5 minutes each', 'Shot clock: 12–24 seconds per possession', 'Personal fouls result in possession; team fouls (after 5) result in free throws', "Referee's decision is final with no further arguments allowed"], coordinators: [{ 'name': 'Sushil Kumar Saw', 'contact': '7349973504' }, { 'name': 'Vishnu Sharma', 'contact': '6204701599' }] },
      { title: 'Karasuno Smash', desc: 'This highly competitive volleyball match requires exceptional coordination, powerful spikes, and solid defensive blocks from teams of six. Played in a best-of-three sets format with each set racing to 15 points, teams must establish momentum early and minimize errors. Discipline is just as important as athleticism — arguing with the referee carries the heaviest penalty: complete team disqualification.', icon: '🏐', image: volleyballImg, prize: 'Exciting Prizes', time: '90 min', venue: 'Volleyball Court', rules: ['Match consists of 3 sets; each set played to 15 points', "The referee's decision is final", 'Any player arguing with the referee results in entire team disqualification'], coordinators: [{ 'name': 'Priyanshu Raj', 'contact': '7979731599' }, { 'name': 'Anshu Kumari', 'contact': '8210348067' }, { 'name': 'Saniya Parveen', 'contact': '8825255542' }] },
      { title: 'Bluelock', desc: "This action-packed 20-minute boys' football match is designed for non-stop excitement on the football ground. With nine players on the field and no offside rule, attackers have full freedom to push forward. The fast-paced format demands intense stamina and smart tactical substitutions. If teams are deadlocked at a 3-3 tie, a penalty shootout decides the winner.", icon: '⚽', image: footballImg, prize: 'Exciting Prizes', time: '90 min', venue: 'Football Ground', rules: ['Each team: 9 players with 3 substitute players allowed', 'Match duration: 20 minutes with a 10-minute halftime break', 'No offside rule applied', 'In case of a 3-3 tie, a penalty shootout determines the winner', "Referee's decision is final; no arguments allowed"], coordinators: [{ 'name': 'Farman Alam', 'contact': '8618918753' }, { 'name': 'Rizwan Ansari', 'contact': '7759004972' }] },
      { title: 'Tug Of Titans', desc: 'Tug of War is a pure test of raw power, grip strength, and synchronized teamwork, pitting squads of five against each other on the main ground. Teams must stay behind the centerline and drag the center flag past their designated line to win. A unified, rhythmic pull often defeats disorganized strength, making coordination just as crucial as physical power.', icon: '🪢', image: tugOfWarImg, prize: 'Exciting Prizes', time: '90 min', venue: 'Main Ground', rules: ['Each team has 5 members', 'Teams pull the rope to drag the center flag past their designated side', 'Do not let go of the rope; no sitting or lying down', 'Stay behind the centerline before the game starts', "Boys' team weight limit: 430–450 kg total", "Girls' team weight limit: 280–300 kg total"], coordinators: [{ 'name': 'Prithwi Raj', 'contact': '6200105529' }, { 'name': 'Rajeev Kumar Mahakur', 'contact': '9123190112' }] },
      { title: 'Iron Grip', desc: "Arm Wrestling is an intense one-on-one test of upper body strength, leverage, and technique. Competitors in the 65–75 kg weight class lock hands, plant their elbows, and battle to pin their opponent's arm to the table. Strategy and form are just as vital as brute force. The first player to pin their opponent's hand wins.", icon: '💪', image: armWrestlingImg, prize: 'Exciting Prizes', time: '90 min', venue: 'Near the Main Stage', rules: ["Weight class: Participants' weight must be between 65 to 75 kg", "Both players sit facing each other, place one elbow on the table, and grip each other's hand", 'The other hand must stay behind the back or on the table', 'No lifting the elbow off the table', 'No using the other hand for assistance', 'No sudden jerks or dangerous moves', 'Referee decides the winner in case of a foul'], coordinators: [{ 'name': 'Keshav Raj', 'contact': '6201479730' }, { 'name': 'Raju Chouhan', 'contact': '9341122651' }, { 'name': 'Sujal Modak', 'contact': '6201383233' }] },
      { title: 'Attack On Chairs', desc: 'Musical Chairs brings a lighthearted yet fiercely competitive vibe to the stage ground, blending speed, focus, and sharp musical anticipation. Players continuously circle a shrinking arrangement of chairs, keeping their ears sharp for the sudden halt of the music. Pushing, pulling, or reserving chairs is strictly forbidden, and backward steps are not allowed once the music stops.', icon: '🪑', image: musicalChairImg, prize: 'Exciting Prizes', time: '90 min', venue: 'Stage Ground', rules: ['Chairs arranged in a circle with one less than the number of players', 'Players must keep moving while music is playing', 'No backward steps when the music stops', 'No pushing, pulling, or reserving a chair before the music stops', "The referee's decision is final if two players reach a chair simultaneously"], coordinators: [{ 'name': 'Sikha Swaroop', 'contact': '8854879791' }, { 'name': 'Smriti Murmu', 'contact': '9508790561' }, { 'name': 'Priyanka Tudu', 'contact': '6200935495' }] },
    ],
  },
  {
    id: 'circuitron',
    name: 'CIRCUITRON',
    label: 'Robotics & IoT Club',
    color: '#4ade80',
    events: [
      { title: 'Gundam Architecture', desc: 'The IoT Design event challenges participants to conceptualize and build innovative solutions using Internet of Things technologies. Participants will design and develop projects that leverage sensors, smart devices, and wireless connectivity to address real-world problems. The event encourages creative thinking and practical engineering. Projects are judged on innovation, technical implementation, problem-solving ability, presentation skills, and overall feasibility.', icon: '🌐', image: iotDesignImg, prize: 'Exciting Prizes', time: '90 min', venue: 'B1 Building (Electronics Lab)', rules: ['Project must be based on IoT concepts (sensors, connectivity, data processing)', 'Internet usage is allowed during development', 'Plagiarism is strictly prohibited; no copied/pre-built projects without acknowledgment', 'Must present/demo the project within the time limit', "No misbehavior; judge's decision is final"], coordinators: [{ 'name': 'Subha Pain', 'contact': '8709658260' }, { 'name': 'Rohini Kumari', 'contact': '8825239918' }] },
      { title: "Shikamaru's Cube", desc: "The Rubik's Cube event is a thrilling speed-solving competition that tests participants' problem-solving ability, mental agility, and precision under pressure. Competitors race against the clock to solve the standard 3×3×3 cube in the fastest time possible. Each participant gets 1 to 3 attempts, with the best time counting toward advancement. Top performers move on to the finals, making it an exciting battle of speed and strategy.", icon: '🧊', image: rubiksCubeImg, prize: 'Exciting Prizes', time: '90 min', venue: 'Front of B4 Building', rules: ['Only standard 3×3×3 cube allowed', 'Scrambling done by organizers', 'Inspection time (~15 sec) allowed', 'No external help or devices', 'No early start before signal', 'No illegal moves (disassembling cube)', 'Judging Criteria: Fastest completion time', 'Disqualification: Early start, Illegal moves, Misbehavior'], coordinators: [{ 'name': 'Ritkia Rani', 'contact': '7320056490' }, { 'name': 'Umang Kr. Sharma', 'contact': '7979807498' }] },
      { title: 'Cyber-Runner: Edge', desc: 'Robo Race is an exciting robotics competition where teams design and build battery-operated robots capable of navigating a predefined obstacle track in the shortest time possible. Participants must demonstrate strong engineering skills, strategic thinking, and precise robot control to clear checkpoints and avoid penalties. Each team gets a single attempt on the track, with resets allowed at checkpoints.', icon: '🏎️', image: roboRaceImg, prize: 'Exciting Prizes', time: '90 min', venue: 'Front of B1 Building', rules: ['One robot per team', 'Size: Max 30 cm × 30 cm', 'Weight: 1–3 kg', 'Battery-operated robots only', 'No touching the robot during the run (penalty applies)', 'Avoid track damage', 'Judging Criteria: Time taken, Checkpoints cleared, Penalty time for faults', 'Disqualification: Repeated track violations, Manual interference, Damaging arena'], coordinators: [{ 'name': 'Prem Shaw', 'contact': '6206735402' }, { 'name': 'Ajay Nayek', 'contact': '6201322650' }] },
      { title: 'Fullmetal Kick Off', desc: 'Robo Soccer brings the thrill of the beautiful game to the world of robotics, where teams compete by designing and controlling robots to play soccer and score goals. Matches are held in a knockout or league format, with each game lasting 10 minutes. Teams must demonstrate strategic thinking, smart robot design, and precise control to outplay their opponents.', icon: '⚽', image: roboSoccerImg, prize: 'Exciting Prizes', time: '90 min', venue: 'Workshop', rules: ['Robots must follow size and weight constraints', 'No manual interference during match', 'No damage to arena or opponent robots', 'No harmful mechanisms', 'No unsportsmanlike behavior', 'Tie resolved by extra time or penalty', 'Judging Criteria: Match performance (goals scored); Tie → extra time/penalty', 'Disqualification: Harmful mechanisms, Damaging opponent robots, Unsportsmanlike behavior'], coordinators: [{ 'name': 'Ajay Nayek', 'contact': '6201322650' }, { 'name': 'Joydav Kr. Mahato', 'contact': '6200419640' }] },
      { title: 'Gundam: Last Stand', desc: "Robo War is an adrenaline-fueled combat robotics event where teams build battle-ready robots and go head-to-head in knockout-style matches. The objective is simple — disable, flip, or push your opponent's robot out of the arena. Pushing, lifting, and flipping are fair game, but fire, explosives, and liquids are strictly prohibited. It's a true test of engineering, strategy, and nerves under pressure.", icon: '⚔️', image: roboWarImg, prize: 'Exciting Prizes', time: '90 min', venue: 'College Stage', rules: ['Max robot weight: Up to 5 kg', 'Wired/Wireless control allowed', 'Allowed: Pushing, lifting, flipping', 'Prohibited: Fire, explosives, liquids', 'No human interference during battle', 'No unsafe weapons or arena damage', 'Judging Criteria: Performance, Damage inflicted', 'Disqualification: Unsafe weapons, Arena damage, Manual interference'], coordinators: [{ 'name': 'Abhay Prajapati', 'contact': '9508918090' }, { 'name': 'Shaikh Khushboo', 'contact': '8797767565' }] },
      { title: 'Shinobi Balloon Smash', desc: "Balloon Pop is a high-energy, fun-filled individual event where participants compete to be the last one standing with their balloon intact. Each participant has a balloon tied to their ankle and must pop others' balloons using only their feet, while protecting their own. The last participant with an unpopped balloon wins.", icon: '🎈', image: balloonPopImg, prize: 'Exciting Prizes', time: '90 min', venue: 'Auditorium', rules: ['Balloon tied to ankle', 'Only feet allowed to pop balloons', 'No pushing, pulling, or use of hands/sharp objects', 'Stay within the designated area', 'No aggression or going out of bounds', 'Judging Criteria: Last person with balloon intact wins', 'Disqualification: Use of hands/sharp objects, Aggression, Going out of bounds'], coordinators: [{ 'name': 'Govind Kr. Sharma', 'contact': '9060239209' }, { 'name': 'Shubham Prajapati', 'contact': '9006099575' }] },
      { title: 'Finding One Piece', desc: 'Treasure Hunt is an exciting campus-wide adventure where teams race to solve a series of sequential clues leading to a hidden treasure. It demands sharp thinking, teamwork, and quick decision-making as participants navigate through the college campus decoding each clue to find the next.', icon: '🗺️', image: treasureHuntImg, prize: 'Exciting Prizes', time: '90 min', venue: 'College Campus', rules: ['Stay within college campus at all times', 'No skipping clues', 'No tampering with clues', 'No phone/internet usage (unless permitted)', 'Team must stay together throughout', 'Judging Criteria: First team to find the treasure wins', 'Disqualification: Skipping clues, Tampering with clues, Leaving campus boundaries'], coordinators: [{ 'name': 'Govind Kr. Sharma', 'contact': '9060239209' }, { 'name': 'Akshat Singh', 'contact': '9631535834' }] },
      { title: "Senku's Bridge", desc: 'Bridge the Gap is a structural engineering challenge where teams design and build a bridge model using limited materials — up to 200 pop sticks and glue — capable of sustaining maximum load. The event pushes participants to apply engineering principles, creative problem-solving, and structural design skills within strict dimension constraints. No thread is allowed, making the challenge even more demanding. The bridge that holds the greatest load without collapsing is declared the winner.', icon: '🌉', image: bridgeTheGapImg, prize: 'Exciting Prizes', time: '90 min', venue: 'B4 Building (Drawing Lab)', rules: ['Max 200 pop sticks and glue allowed; no thread (Materials Provided)', 'No pinning or clamping', 'Bridge must allow loading bar', 'Dimensions: Width 18–25 cm, Height 18–25 cm, Length 40–50 cm (±1 cm error allowed)', 'Judging Criteria: Maximum load sustained', 'Disqualification: Rule violations, Unsafe behavior'], coordinators: [{ 'name': 'Ganesh Gope', 'contact': '8455075264' }, { 'name': 'Jaysingh Murmu', 'contact': '8521644420' }] },
    ],
  },
  {
    id: 'independent',
    name: 'INDEPENDENT EVENTS',
    label: 'Open Events',
    color: '#eab308',
    events: [
      { title: 'Debate Competition', desc: 'Test your oratory and analytical skills against the best minds.', icon: '🗣️', prize: 'Exciting Prizes', time: 'Day 2 — 1:00 PM - 3:00 PM', venue: 'Seminar Hall', rules: ['Individual/Team', 'Topics provided prior', 'Not managed by any club'], coordinators: [] },
      { title: 'Flip & Win', desc: 'A fun game of chance and skill.', icon: '🎲', prize: 'Exciting Prizes', time: 'Day 2 — 3:30 PM - 4:30 PM', venue: 'Open Ground', rules: ['Individual', 'On-spot registration', 'Not managed by any club'], coordinators: [] },
    ],
  },
];

/* ═══════════════════════════════════
    EVENT MODAL
   ═══════════════════════════════════ */
const EventModal = ({ event, category, onClose }) => {
  useEffect(() => {
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';

    // Handle ESC key to close modal
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!event || !category) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 sm:px-6">
      {/* Dark Blurred Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Content container (centered, fixed) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        onWheel={(e) => e.stopPropagation()} // Stop wheel event from reaching Lenis
        onTouchMove={(e) => e.stopPropagation()} // Stop touch event from reaching Lenis
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: category.color }} />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-white/10 transition-colors backdrop-blur-md border border-white/10"
        >
          <X className="w-5 h-5 text-white/70" />
        </button>

        {/* Scrollable Content Area */}
        <div 
          className="overflow-y-auto p-6 sm:p-8 custom-scrollbar"
          data-lenis-prevent="true"
        >
          {/* Header */}
          <div className="flex items-center gap-5 sm:gap-6 mb-6">
            {event.image ? (
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-lg">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl sm:text-5xl shrink-0 shadow-lg">
                {event.icon}
              </div>
            )}
            <div>
              <p className="text-[10px] sm:text-xs font-black tracking-widest uppercase mb-1" style={{ color: category.color }}>
                {category.name}
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">{event.title}</h3>
            </div>
          </div>

          {/* Info Badges */}
          <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
            {[
              { icon: <Trophy className="w-4 h-4" />, text: event.prize },
              { icon: <Clock className="w-4 h-4" />, text: event.time },
              { icon: <MapPin className="w-4 h-4" />, text: event.venue },
            ].map((badge, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-xl bg-white/5 text-white/80 border border-white/5">
                <span style={{ color: category.color }}>{badge.icon}</span>
                {badge.text}
              </span>
            ))}
          </div>

          {/* Description */}
          <div className="mb-6 sm:mb-8">
            <h4 className="text-xs font-bold tracking-widest uppercase mb-2 sm:mb-3 text-white/40">About the Event</h4>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              {event.desc}
            </p>
          </div>

          {/* Rules */}
          {event.rules && event.rules.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <h4 className="text-xs font-bold tracking-widest uppercase mb-2 sm:mb-3 text-white/40">Guidelines & Rules</h4>
              <div className="space-y-2">
                {event.rules.map((rule, i) => (
                  <div
                    key={i}
                    className="text-sm text-white/70 pl-4 py-2 border-l-2 rounded-r-xl bg-white/[0.02] flex items-start gap-3"
                    style={{ borderColor: `${category.color}60` }}
                  >
                    <span className="text-white/30 text-xs mt-0.5 shrink-0">{i + 1}.</span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coordinators */}
          {event.coordinators && event.coordinators.length > 0 && (
            <div className="mb-8">
              <h4 className="text-xs font-bold tracking-widest uppercase mb-2 sm:mb-3 text-white/40">Coordinators</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.coordinators.map((coord, i) => (
                  <div key={i} className="flex flex-col bg-white/5 border border-white/10 rounded-xl p-3">
                    <span className="text-sm font-semibold text-white/90">{coord.name}</span>
                    <span className="text-xs text-white/50 mt-0.5">{coord.contact !== '—' ? coord.contact : 'N/A'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-auto pt-4">
            <button
              className="w-full py-3.5 sm:py-4 rounded-xl text-sm font-black tracking-widest uppercase text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ 
                background: `linear-gradient(135deg, ${category.color}, ${category.color}99)`,
                boxShadow: `0 8px 25px ${category.color}40`
              }}
            >
              Register Now
            </button>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

/* ═══════════════════════════════════
    EVENT CARD
   ═══════════════════════════════════ */
const EventCard = ({ event, category, onClick }) => {
  const [overlayPos, setOverlayPos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setOverlayPos({ x, y });
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({
      x: ((y - centerY) / centerY) * -14,
      y: ((x - centerX) / centerX) * 14,
    });
  };

  return (
    <div className="shrink-0 w-[260px] sm:w-[280px] [perspective:1200px]">
      <div
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => { setIsHovering(false); setTilt({ x: 0, y: 0 }); }}
        className="group relative rounded-[22px] cursor-pointer overflow-hidden"
        style={{
          height: '370px',
          background: '#080808',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovering
            ? 'box-shadow 0.3s ease'
            : 'transform 0.55s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s ease',
          transformStyle: 'preserve-3d',
          boxShadow: isHovering
            ? `0 32px 80px -12px ${category.color}60, 0 0 0 1.5px ${category.color}50`
            : `0 12px 40px -10px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.07)`,
        }}
      >
        {/* ── FULL-BLEED POSTER IMAGE ── */}
        <div className="absolute inset-0 z-0">
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
              style={{
                transform: isHovering ? 'scale(1.12)' : 'scale(1.01)',
                transition: 'transform 0.75s cubic-bezier(0.4,0,0.2,1)',
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-8xl"
              style={{ background: `radial-gradient(circle at 50% 40%, ${category.color}25, #080808 70%)` }}>
              {event.icon}
            </div>
          )}
        </div>

        {/* ── MULTI-STOP GRADIENT SCRIM ── */}
        <div className="absolute inset-0 z-[1] pointer-events-none" style={{
          background: `linear-gradient(
            180deg,
            rgba(0,0,0,0) 0%,
            rgba(0,0,0,0.08) 25%,
            rgba(0,0,0,0.55) 52%,
            rgba(0,0,0,0.92) 72%,
            rgba(0,0,0,1) 100%
          )`,
        }} />

        {/* ── MOUSE-TRACKING COLOR WASH ── */}
        <div className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            opacity: isHovering ? 1 : 0,
            transition: 'opacity 0.4s ease',
            background: `radial-gradient(300px circle at ${overlayPos.x}px ${overlayPos.y}px, ${category.color}22, transparent 70%)`,
          }}
        />

        {/* ── CATEGORY PILL (top-left) ── */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-[5px] rounded-full text-[9px] font-black tracking-[0.2em] uppercase backdrop-blur-xl border"
            style={{
              color: category.color,
              background: `${category.color}18`,
              borderColor: `${category.color}45`,
              boxShadow: `0 2px 16px ${category.color}30`,
              textShadow: `0 0 8px ${category.color}80`,
            }}>
            <span className="w-[5px] h-[5px] rounded-full"
              style={{ background: category.color, boxShadow: `0 0 8px ${category.color}` }} />
            {category.name}
          </span>
        </div>

        {/* ── EMOJI BADGE (top-right) ── */}
        <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-2xl flex items-center justify-center text-xl backdrop-blur-xl border border-white/10"
          style={{ background: 'rgba(0,0,0,0.55)', boxShadow: '0 4px 16px rgba(0,0,0,0.5)' }}>
          {event.icon}
        </div>

        {/* ── BOTTOM CONTENT TRAY ── */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-4 pt-2">

          {/* Venue / time micro-label */}
          <div className="flex items-center gap-1.5 mb-2">
            <MapPin className="w-[10px] h-[10px] shrink-0" style={{ color: `${category.color}cc` }} />
            <span className="text-[9px] uppercase tracking-[0.14em] font-semibold"
              style={{ color: `${category.color}99` }}>
              {event.venue}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-[18px] font-black text-white leading-tight mb-2 tracking-tight"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-[11px] leading-relaxed line-clamp-2 mb-3"
            style={{ color: isHovering ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.38)', transition: 'color 0.3s' }}>
            {event.desc}
          </p>

          {/* Separator */}
          <div className="h-px mb-3" style={{
            background: `linear-gradient(90deg, ${category.color}50, ${category.color}15, transparent)`,
          }} />

          {/* Footer row */}
          <div className="flex items-center justify-between mb-0">
            <div className="flex items-center gap-1.5">
              <Trophy className="w-3 h-3" style={{ color: category.color }} />
              <span className="text-[10px] font-bold tracking-wide"
                style={{ color: `${category.color}dd` }}>
                Exciting Prizes
              </span>
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase"
              style={{
                color: category.color,
                opacity: isHovering ? 0 : 1,
                transition: 'opacity 0.2s',
              }}>
              Details →
            </span>
          </div>

          {/* Slide-up CTA */}
          <div style={{
            maxHeight: isHovering ? '50px' : '0px',
            opacity: isHovering ? 1 : 0,
            overflow: 'hidden',
            transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease',
            marginTop: isHovering ? '10px' : '0',
          }}>
            <button
              className="w-full py-[10px] rounded-xl text-[11px] font-black tracking-[0.16em] uppercase text-white"
              style={{
                background: `linear-gradient(135deg, ${category.color}, ${category.color}aa)`,
                boxShadow: `0 6px 28px ${category.color}55, inset 0 1px 0 rgba(255,255,255,0.15)`,
                transition: 'filter 0.2s',
              }}
            >
              View Full Details
            </button>
          </div>
        </div>

        {/* ── TOP EDGE GLINT ── */}
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${category.color}70 50%, transparent 100%)`,
            opacity: isHovering ? 1 : 0.25,
            transition: 'opacity 0.4s',
          }} />

        {/* ── BOTTOM GLOW LINE ── */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none z-10"
          style={{
            background: `linear-gradient(90deg, transparent, ${category.color}, transparent)`,
            opacity: isHovering ? 1 : 0,
            transition: 'opacity 0.5s',
          }} />
      </div>
    </div>
  );
};

/* ═══════════════════════════════════
    MAIN: EVENT SECTION
   ═══════════════════════════════════ */
const EventSection = () => {
  const [activeCategory, setActiveCategory] = useState('helix');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const scrollRef = useRef(null);

  const currentCategory = categories.find(c => c.id === activeCategory);
  const currentEvents = currentCategory?.events || [];

  const scrollCards = (direction) => {
    if (scrollRef.current) {
      const amount = 300;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount });
    }
  };

  return (
    <section id="event" className="relative py-20 sm:py-28 px-4 sm:px-6 bg-[#0a0014]">
      {/* Subtle top glow */}
      {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" /> */}

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Section Header ── */}
        <div className="text-center mb-12">
          <span className="text-purple-400 text-xs font-bold tracking-[0.3em] uppercase">Explore</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mt-2 mb-3">
            Our <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500">Events</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base max-w-md mx-auto">
            Choose a category and discover what awaits you at Provenance 6.0
          </p>
        </div>

        {/* ── Category Bar (Horizontal Scroll) ── */}
        <div className="mb-10">
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory justify-start sm:justify-center">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    shrink-0 snap-start flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium border
                    ${isActive
                      ? 'text-white border-white/15 shadow-lg'
                      : 'text-white/40 border-transparent hover:text-white/70 hover:bg-white/3'
                    }
                  `}
                  style={isActive ? {
                    background: `${cat.color}10`,
                    borderColor: `${cat.color}25`,
                    boxShadow: `0 4px 20px ${cat.color}10`,
                  } : {}}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: isActive ? cat.color : 'rgba(255,255,255,0.15)' }}
                  />
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-white/25 hidden sm:inline">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Event Cards (Horizontal Scroll) ── */}
        <div className="relative">
          {/* Scroll arrows (desktop only) */}
          <button
            onClick={() => scrollCards('left')}
            className="hidden lg:flex absolute -left-20 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-zinc-900/90 border border-white/10 text-white/50 hover:text-white hover:border-white/20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollCards('right')}
            className="hidden lg:flex absolute -right-20 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-zinc-900/90 border border-white/10 text-white/50 hover:text-white hover:border-white/20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-8 pt-2 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 sm:-mx-0 sm:px-0 overscroll-x-contain"
          >
            {currentEvents.map((event) => (
              <div key={event.title} className="snap-start py-2">
                <EventCard
                  event={event}
                  category={currentCategory}
                  onClick={() => setSelectedEvent(event)}
                />
              </div>
            ))}
          </div>

          {/* Fade edges */}
          {/* <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-[#0a0014] to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-[#0a0014] to-transparent pointer-events-none z-10" /> */}
        </div>

      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            category={currentCategory}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>

      {/* Hide scrollbar utility */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default EventSection;