/**
 * ====================================================================
 * LUNARIS — Clan Configuration & Content File
 * ====================================================================
 * 
 * Edit this file to update clan links, member profiles, rules, 
 * activities, achievements, and recruitment webhook settings.
 * All changes in this file reflect instantly across the entire website!
 */

const CLAN_CONFIG = {
  // Brand & Identity
  name: "LUNARIS",
  game: "Roblox • The Strongest Battlegrounds",
  motto: "RULE THE NIGHT. RISE ABOVE ALL.",
  subtitle: "Born Beneath the Moon. Forged Through Battle.",
  description: "More than a clan. A community built on skill, discipline, loyalty, and the relentless pursuit of greatness.",
  aboutText: "LUNARIS is a TSB clan built for players who want to improve, compete, and become part of something greater. We value skill over ego, discipline over excuses, and teamwork over individual pride. Every member represents the clan through their gameplay, attitude, and commitment.",

  // Links & Socials
  // Replace this Discord invite with your active server invite link
  discordInvite: "https://discord.gg/ajQB3fH4rZ",
  robloxGroup: "https://www.roblox.com/groups/lunaris-tsb", // Optional: leave blank if none
  youtubeChannel: "", // Optional: e.g. "https://youtube.com/@lunaris_tsb"
  tiktok: "", // Optional

  // Webhook for Recruitment Application Submissions (Optional)
  // If you paste a Discord Webhook URL here, applications will automatically post to your Discord staff channel!
  // If left empty, the website runs in client demonstration mode.
  recruitmentWebhookUrl: "", 

  // Feature Pillars
  pillars: [
    {
      title: "Competitive Spirit",
      description: "Challenge ourselves and other clans through fair competition.",
      icon: "swords"
    },
    {
      title: "Continuous Growth",
      description: "Improve through practice, sparring, feedback, and experience.",
      icon: "trending-up"
    },
    {
      title: "Unity and Respect",
      description: "Build a community where members support one another and represent LUNARIS with pride.",
      icon: "shield"
    }
  ],

  // Clan Objectives
  objectives: [
    {
      id: 1,
      title: "Skill Development",
      description: "Help members improve their combat mechanics, combos, movement, timing, and decision-making.",
      icon: "zap"
    },
    {
      id: 2,
      title: "Competitive Recognition",
      description: "Participate in clan wars, friendly clan battles, and competitive events.",
      icon: "trophy"
    },
    {
      id: 3,
      title: "Community Growth",
      description: "Welcome skilled, respectful, and active players.",
      icon: "users"
    },
    {
      id: 4,
      title: "Team Coordination",
      description: "Develop communication, teamwork, and coordinated fighting strategies.",
      icon: "crosshair"
    },
    {
      id: 5,
      title: "Fair Competition",
      description: "Build a reputation through genuine performance and sportsmanship.",
      icon: "scale"
    },
    {
      id: 6,
      title: "Long-Term Legacy",
      description: "Establish LUNARIS as a recognizable and respected name in the TSB community.",
      icon: "moon"
    }
  ],

  // Member Showcase Roster
  // Note: Only genuine members should be added here.
  // NO roles, staff titles, ranks, or promotion tiers are displayed.
  // Replace these example placeholders with your actual clan member details!
  members: [
    {
      robloxUsername: "ExampleMember_1",
      displayName: "LunarVortex",
      avatar: "assets/placeholder-avatar.svg",
      discordUsername: "lunar_vortex",
      bio: "Focuses on high-speed neutral baiting, dash-cancels, and counter-punishing."
    },
    {
      robloxUsername: "ExampleMember_2",
      displayName: "EclipseBlade",
      avatar: "assets/placeholder-avatar.svg",
      discordUsername: "eclipse_blade",
      bio: "Specializes in wall combo extensions, aggressive spacing, and mixups."
    },
    {
      robloxUsername: "ExampleMember_3",
      displayName: "Nocturne_TSB",
      avatar: "assets/placeholder-avatar.svg",
      discordUsername: "nocturne_tsb",
      bio: "Dedicated sparring partner focusing on defensive conditioning and side dashes."
    },
    {
      robloxUsername: "ExampleMember_4",
      displayName: "CrescentStrike",
      avatar: "assets/placeholder-avatar.svg",
      discordUsername: "crescent_strike",
      bio: "TSB combatant working on evasive footwork and team coordination."
    }
  ],

  // Clan Rules & Guidelines
  // Fully expandable accordion categories
  rules: [
    {
      id: "general-conduct",
      title: "General Conduct",
      subtitle: "Foundational community standards for all LUNARIS members",
      items: [
        "Respect every clan member and community member at all times.",
        "No harassment, bullying, discrimination, or targeted abuse of any kind.",
        "Follow all Discord server rules and Roblox community standards strictly.",
        "Avoid unnecessary drama, toxic behavior, and personal attacks.",
        "Do not impersonate other clan members, opponents, or community figures."
      ]
    },
    {
      id: "competitive-conduct",
      title: "Competitive Conduct",
      subtitle: "Sportsmanship and integrity in all battles and sparring",
      items: [
        "No cheating, exploiting, macros, or using unauthorized scripts under any circumstances.",
        "Play fairly during clan wars, tryouts, friendly battles, and sparring sessions.",
        "Respect opponents, regardless of match outcome, victory, or loss.",
        "Follow match instructions and agreed competitive rules in every scrimmage.",
        "Never claim victories or achievements you have not genuinely earned."
      ]
    },
    {
      id: "clan-activity-loyalty",
      title: "Clan Activity and Loyalty",
      subtitle: "Commitment to clan representation and team presence",
      items: [
        "Represent LUNARIS responsibly across public servers and community events.",
        "Inform the clan if you will be inactive for an extended period.",
        "Do not leak private clan discussions, match strategies, or personal information.",
        "Do not misuse access to private channels, game links, or clan resources.",
        "Help maintain an encouraging, active, and focused competitive environment."
      ]
    },
    {
      id: "discord-conduct",
      title: "Discord Conduct",
      subtitle: "Etiquette and communication guidelines inside our home server",
      items: [
        "Do not spam messages, unnecessary pings, or unsolicited advertisements.",
        "Use designated channels for discussions, battle clips, and media.",
        "Never share malicious links, suspicious downloads, or unauthorized software.",
        "Respect other members and resolve disagreements calmly and privately."
      ]
    }
  ],

  // Clan Activities
  activities: [
    {
      id: "clan-wars",
      title: "Clan Wars",
      category: "Competitive",
      description: "Organized, high-stakes competitive battles against rival TSB clans to test our collective execution.",
      icon: "crossed-swords"
    },
    {
      id: "friendly-clan-battles",
      title: "Friendly Clan Battles",
      category: "Scrimmage",
      description: "Practice and test skills against allied and respected clans in fair, structured exhibition matches.",
      icon: "handshake"
    },
    {
      id: "sparring-sessions",
      title: "Sparring Sessions",
      category: "Mechanics",
      description: "Regular 1v1 and 2v2 sparring to hone individual combat mechanics, reaction speeds, and character matchups.",
      icon: "flame"
    },
    {
      id: "training-sessions",
      title: "Training Sessions",
      category: "Development",
      description: "Structured sessions to refine consistency, evasion, combo routing, and coordinated fighting tactics.",
      icon: "target"
    },
    {
      id: "recruitment-tryouts",
      title: "Recruitment Tryouts",
      category: "Tryouts",
      description: "Fair combat evaluations where prospective recruits showcase their combat fundamentals and attitude.",
      icon: "user-check"
    },
    {
      id: "community-events",
      title: "Community Events",
      category: "Community",
      description: "In-clan tournaments, game nights, and special events to bring members closer together outside scrims.",
      icon: "sparkles"
    }
  ],

  // Sample Schedule (Clearly marked as sample/unconfirmed)
  sampleSchedule: [
    {
      event: "Clan Sparring & Combo Workshop",
      type: "Internal Sparring",
      status: "Sample Event • Schedule Subject to Discord Announcement",
      day: "Weekly Sparring"
    },
    {
      event: "Combat Mechanics Clinic (Dash & Counters)",
      type: "Training",
      status: "Sample Event • Times Posted in Discord",
      day: "Training Night"
    },
    {
      event: "Recruitment Assessment Window",
      type: "Tryouts",
      status: "Sample Event • Apply via Recruitment Form",
      day: "Tryout Window"
    }
  ],

  // Verified Achievements & Clan Statistics
  // Strict rule: Zero fabricated records or numbers.
  statistics: [
    {
      label: "Clan War Record",
      value: "Not Yet Recorded",
      subtext: "Official records will be logged upon competitive season opening.",
      isPlaceholder: true
    },
    {
      label: "Tournament Placements",
      value: "Coming Soon",
      subtext: "Sanctioned TSB tournament entries in preparation.",
      isPlaceholder: true
    },
    {
      label: "Current Member Count",
      value: "Update Required",
      subtext: "Active roster verification underway.",
      isPlaceholder: true
    },
    {
      label: "Completed Events",
      value: "Coming Soon",
      subtext: "Archived matches will appear here post-season.",
      isPlaceholder: true
    },
    {
      label: "Confirmed Achievements",
      value: "Not Yet Recorded",
      subtext: "Milestone badges will be displayed upon official verification.",
      isPlaceholder: true
    }
  ],

  // Recruitment Criteria Qualities
  recruitmentQualities: [
    { title: "Combat Fundamentals", desc: "Solid movement, combo execution, and situational awareness in TSB." },
    { title: "Willingness to Learn", desc: "Open to constructive feedback, sparring analysis, and skill drills." },
    { title: "Respectful Behavior", desc: "Zero tolerance for toxicity, ego, or disrespect toward teammates or opponents." },
    { title: "Teamwork & Comms", desc: "Ability to coordinate, communicate clearly in calls, and support allies." },
    { title: "Consistent Activity", desc: "Regular participation in clan practices, sparring, and community discussions." },
    { title: "Competitive Mindset", desc: "A disciplined, sportsmanship-driven approach to every match, win or lose." }
  ],

  // Recruitment Process Steps
  recruitmentSteps: [
    { step: "01", title: "Join Discord", desc: "Enter the official LUNARIS Discord server and review our clan channels." },
    { step: "02", title: "Read Clan Rules", desc: "Familiarize yourself with our conduct guidelines and expectations." },
    { step: "03", title: "Submit Application", desc: "Complete the recruitment application form with your genuine combat experience." },
    { step: "04", title: "Combat Tryout", desc: "Participate in a fair 1v1 combat evaluation to demonstrate mechanics." },
    { step: "05", title: "Outcome Notification", desc: "Receive transparent feedback and notification regarding your trial." }
  ]
};

// Export to global scope for browser runtime
window.CLAN_CONFIG = CLAN_CONFIG;
