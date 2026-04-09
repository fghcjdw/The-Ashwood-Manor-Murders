// ═══════════════════════════════════════════
//   THE ASHCROFT MURDER — Story Data
// ═══════════════════════════════════════════

const STORY = {
  murderer: 'pym',

  // ─── CUTSCENE PANELS ───────────────────────
  cutscene: [
    {
      art: '🌩️',
      heading: 'England — November 14th, 1921',
      text: 'The storm arrived without warning. By nine o\'clock it had swallowed the moors whole, and Ashcroft Manor stood alone against the sky like a broken tooth.'
    },
    {
      art: '💀',
      heading: 'A Death in the Study',
      text: 'Lord Victor Ashcroft — industrialist, eccentric, feared by many — has been found dead in his study. The official verdict: heart failure. The solicitor\'s telegram said otherwise.'
    },
    {
      art: '🔍',
      heading: 'Your Assignment',
      text: 'You are Inspector. You were summoned by telegram two hours ago. The roads are already flooding. No one can leave the manor tonight. Neither can you.'
    },
    {
      art: '👥',
      heading: 'Six Suspects',
      text: 'Six people remain in the manor. One of them is a murderer. They all have secrets. They will all lie, at least once. The truth is buried in letters, silences, and what they almost say.'
    },
    {
      art: '⚠️',
      heading: 'One Warning',
      text: 'The killer is clever. They have already killed once tonight. Tread carefully, Inspector — they are watching every move you make. And they have nothing left to lose.'
    },
    {
      art: '🕯️',
      heading: 'Begin',
      text: 'Search every room. Speak to every suspect. Read every letter. When you are certain — and only when you are certain — make your accusation. The case is yours.'
    }
  ],

  // ─── ROOMS ────────────────────────────────
  rooms: {
    foyer: {
      id: 'foyer', name: 'The Grand Foyer', icon: '🚪',
      description: 'A vast entrance hall with a marble floor cracked by age. Two staircases sweep upward into shadow. Rain hammers the tall windows, and a grandfather clock marks time with the patience of a judge. Gas lamps flicker with each thunderclap.',
      exits: { study: 'Lord Ashcroft\'s Study', library: 'The Library', drawingRoom: 'The Drawing Room', diningRoom: 'The Dining Room', servantsCorridor: 'Servants\' Corridor' },
      npcs: ['finch'],
      objects: [
        { id: 'grandfather_clock', name: 'Grandfather Clock', icon: '⏰', hint: 'Examine it', description: 'An 18th-century longcase clock. Its pendulum swings with mechanical certainty. The time reads 11:52 PM. Someone wound it recently — the spring is very tight, as though they needed the clock to keep running through the night.' },
        { id: 'portrait_victor', name: 'Portrait of Lord Ashcroft', icon: '🖼️', hint: 'Look closer', description: 'A large oil portrait above the fireplace. Lord Victor Ashcroft gazes down with pale grey eyes and a slight, private smile — the smile of a man who knows something about everyone in the room. He probably did.' }
      ],
      firstVisit: 'You step into Ashcroft Manor. The door slams behind you in a gust of cold wind. The manor feels like a held breath. Mr. Finch, the butler, materialises from the shadows as though he has been waiting.'
    },

    study: {
      id: 'study', name: 'Lord Ashcroft\'s Study', icon: '📜',
      description: 'A large room lined with mahogany shelves and the accumulated evidence of a lifetime. Lord Ashcroft\'s body lies on the settee — the coroner cannot come until morning, when the roads clear. The room smells of old books, brandy, and something faintly medicinal.',
      exits: { foyer: 'Back to the Foyer' },
      npcs: [],
      objects: [
        { id: 'body', name: 'Lord Ashcroft\'s Body', icon: '⚰️', hint: 'Examine carefully', description: 'Lord Victor Ashcroft, 68 years old. On the settee, face placid in death. Examining him closely, you notice his lips have a faint bluish tinge inconsistent with simple cardiac arrest. His right hand shows minor tetanic contraction — characteristic of neurotoxin poisoning. This was no heart attack.', grantsClue: 'body_exam' },
        { id: 'brandy_glass', name: 'The Brandy Glass', icon: '🥃', hint: 'Check for residue', description: 'A crystal brandy glass on the side table, still containing a small amber pool. Look closer: the liquid is faintly cloudy. At the bottom, a crystalline residue. And on the stem — a partial fingerprint, smeared as though quickly wiped, but not thoroughly enough. Someone was careless in their haste.', grantsClue: 'brandy_glass' },
        { id: 'study_desk', name: 'The Writing Desk', icon: '🗄️', hint: 'Check the drawers', description: 'A mahogany writing desk littered with correspondence. A locked drawer — but the old lock yields with a pen nib. Inside: a loaded revolver, and a slip of paper in Lord Ashcroft\'s handwriting: "R.P. — accounts — CONFRONT." Underlined three times. Tonight was meant to be a reckoning.', grantsClue: 'rp_notation', grantsItem: 'revolver' },
        { id: 'victor_diary', name: 'Lord Ashcroft\'s Diary', icon: '📖', hint: 'Read the entries', description: 'A leather diary on the shelf, marked with this week. The recent entries tell a story...', grantsClue: 'diary', opensDoc: 'diary' }
      ],
      firstVisit: 'You enter the study. The body of Lord Victor Ashcroft rests on the settee. The room is quiet except for the rain. Something about the medicinal smell bothers you.'
    },

    library: {
      id: 'library', name: 'The Library', icon: '📚',
      description: 'Floor-to-ceiling shelves, thousands of volumes, a rolling ladder. Two reading chairs face a dead fireplace. The room is cold — a window has been cracked open recently; there are fresh rain droplets on the sill.',
      exits: { foyer: 'Back to the Foyer' },
      npcs: ['cecily'],
      objects: [
        { id: 'solicitors_letter', name: 'Letter from Hatch & Pemberton', icon: '⚖️', hint: 'Legal correspondence', description: 'From Lord Ashcroft\'s solicitors, dated three days ago. The contents are significant — particularly the section regarding a revision to his Lordship\'s will.', grantsClue: 'will_change', opensDoc: 'solicitors_letter' },
        { id: 'birth_cert', name: 'Hidden Document (under the blotter)', icon: '📋', hint: 'Something concealed', description: 'Tucked carefully beneath the desk blotter: a birth certificate. The name: "Cecily Margaret Ashcroft." Father: "Victor William Ashcroft." Mother: "Margaret Vane." Miss Vane is not who she claims to be.', grantsClue: 'birth_cert', opensDoc: 'birth_certificate' },
        { id: 'med_encyclopedia', name: 'Medical Encyclopedia Vol. IV', icon: '🔬', hint: 'Recently opened', description: 'A large medical reference, freshly handled — fingermarks in the dust. It falls open to the entry for Aconitum napellus. The text describes how aconitine causes rapid cardiac arrest while perfectly mimicking natural heart failure — and produces a characteristic blue tinge to the lips. You feel cold.', grantsClue: 'medical_encyclopedia' }
      ],
      firstVisit: 'The library is cold and silent. Miss Cecily Vane stands at the window, watching the lightning. She turns when you enter.'
    },

    drawingRoom: {
      id: 'drawingRoom', name: 'The Drawing Room', icon: '🛋️',
      description: 'A formal sitting room with faded floral wallpaper and furniture that was fashionable thirty years ago. Lady Eleanor sits beside a dying fire, perfectly still. The French doors to the garden are wet with recent rain.',
      exits: { foyer: 'Back to the Foyer', garden: 'The Garden (French Doors)' },
      npcs: ['eleanor'],
      objects: [
        { id: 'love_letters', name: 'Bundle of Letters (in the escritoire)', icon: '💌', hint: 'Secret correspondence', description: 'Hidden in the writing desk: letters tied with ribbon. Love letters — from Lady Eleanor to Captain Oliver Graves. Passionate, secret, spanning two years. "When Victor is finally gone, we can be together properly." A powerful motive — if you believe Eleanor is your killer.', grantsClue: 'love_letters', opensDoc: 'love_letters' },
        { id: 'smelling_salts', name: 'Smelling Salts (on the mantelpiece)', icon: '💊', hint: 'Take them', description: 'A small silver case of smelling salts — Lady Eleanor\'s initials engraved on the lid. Useful for reviving the unconscious. You pocket them.', grantsItem: 'smelling_salts' }
      ],
      firstVisit: 'Lady Eleanor Ashcroft does not look up when you enter. She stares into the embers as though reading something no one else can see.'
    },

    diningRoom: {
      id: 'diningRoom', name: 'The Dining Room', icon: '🍽️',
      description: 'The long dining table still bears the ghost of tonight\'s dinner. Eight candles burn low in the candelabra. Captain Graves sits alone at the far end with a glass of whiskey, his expression unreadable.',
      exits: { foyer: 'Back to the Foyer', kitchen: 'The Kitchen' },
      npcs: ['graves'],
      objects: [
        { id: 'dinner_table', name: 'The Dinner Table', icon: '🕯️', hint: 'Examine the place settings', description: 'Most places have been cleared. But one detail stands out: Dr. Pym\'s glass has been moved to Lord Ashcroft\'s end of the table. Pym was seated to His Lordship\'s immediate left — prime position to interfere with food or drink unobserved.' },
        { id: 'ious', name: 'Captain Graves\' IOUs (under the table)', icon: '📄', hint: 'Financial documents', description: 'Fallen under the Captain\'s chair: handwritten IOUs with Lord Ashcroft\'s name. £8,000 total. A note at the bottom in Victor\'s hand: "To be called in by November 20th." The deadline was six days away.', grantsClue: 'ious', opensDoc: 'ious' }
      ],
      firstVisit: 'The dining room is hushed. Captain Graves looks up when you enter, then away. He pours another finger of whiskey.'
    },

    kitchen: {
      id: 'kitchen', name: 'The Kitchen', icon: '🔥',
      description: 'A large Victorian kitchen, still warm from the evening\'s cooking. Copper pots hang in rows. Mrs. Thorne sits at the kitchen table with a cup of cold tea, hands wrapped around it, muttering to herself.',
      exits: { diningRoom: 'Back to the Dining Room', garden: 'The Garden (Back Door)' },
      npcs: ['thorne'],
      objects: [
        { id: 'herb_bundle', name: 'Herb Bundle (hanging from the beam)', icon: '🌿', hint: 'Identify the plants', description: 'A drying bundle of herbs. Rosemary, thyme, sage — and one more. You recognise it: Aconitum napellus. Wolfsbane. Monkshood. Highly toxic. The same plant referenced in the medical encyclopedia, and a known source of aconitine.', grantsClue: 'herb_bundle' },
        { id: 'brandy_flask', name: 'Cooking Brandy (on the shelf)', icon: '🫙', hint: 'Could be useful', description: 'A full bottle of cooking brandy. You pour a small flask and pocket it. Whatever this night holds, you\'ll likely need it.', grantsItem: 'brandy_flask' }
      ],
      firstVisit: 'The kitchen is the warmest room in the manor. Mrs. Thorne looks up at you sharply. Her eyes are very bright.'
    },

    servantsCorridor: {
      id: 'servantsCorridor', name: 'Servants\' Corridor', icon: '🚶',
      description: 'A narrow utilitarian corridor running along the back of the manor. Damp plaster, flickering gas lamps, and the howl of the storm through the walls. A notice board at the far end holds the household schedule.',
      exits: { foyer: 'Back to the Foyer', guestWing: 'The Guest Wing' },
      npcs: [],
      objects: [
        { id: 'notice_board', name: 'Household Schedule Board', icon: '📌', hint: 'Check the schedules', description: 'Tonight\'s household schedule. One entry is unusual: Dr. Pym requested access to the wine cellar at 7:45 PM — fifteen minutes before dinner. The wine cellar is accessed through the kitchen garden. He was near Mrs. Thorne\'s herb beds. He knew exactly what grew there.' }
      ],
      firstVisit: 'The corridor smells of damp stone and old wood. Thunder shakes the walls.'
    },

    guestWing: {
      id: 'guestWing', name: 'The Guest Wing', icon: '🛏️',
      description: 'A carpeted corridor lined with oak doors. Dr. Pym\'s and Captain Graves\' rooms are both closed.',
      exits: { servantsCorridor: 'Back to the Corridor', pymRoom: 'Dr. Pym\'s Room', gravesRoom: 'Captain Graves\' Room' },
      npcs: [],
      objects: [
        { id: 'muddy_prints', name: 'Muddy Footprints (near Pym\'s door)', icon: '👣', hint: 'Fresh tracks', description: 'Faint muddy footprints on the corridor carpet near Dr. Pym\'s door. Very recent — still damp. They lead from the direction of the main staircase, tracking in soil. Garden soil. Someone came in from outside and went directly to Pym\'s room.', grantsClue: 'muddy_prints' }
      ],
      firstVisit: 'The guest wing is silent. Both doors are closed. One of these rooms holds the evidence you need.'
    },

    pymRoom: {
      id: 'pymRoom', name: 'Dr. Pym\'s Room', icon: '🩺',
      description: 'Neat, methodical, clinical. Every item placed with precision. His medical bag sits on the writing desk beside a leather portfolio. The room smells faintly of antiseptic.',
      exits: { guestWing: 'Back to the Guest Wing' },
      npcs: [],
      objects: [
        { id: 'medical_bag', name: 'Dr. Pym\'s Medical Bag', icon: '💼', hint: 'Count the vials', description: 'A black Gladstone bag stamped "Dr. R. Pym." Inside, a velvet-lined tray holds twelve slots for glass vials. You count: eleven vials. One slot is empty. The label on the empty slot reads: "Ac. Nap. Solution." Aconitine napellus solution. The missing murder weapon.', grantsClue: 'medical_bag_vial' },
        { id: 'bank_letter', name: 'Letter from Coutts Bank', icon: '🏦', hint: 'Financial records', description: 'A bank letter from last week. It confirms a £3,000 transfer to a Geneva account — the fourth such transfer this year, bringing the total to £12,000. The source: the Ashcroft estate accounts. The recipient: Dr. R. Pym.', grantsClue: 'bank_letter', opensDoc: 'bank_letter' },
        { id: 'pym_notes', name: 'Personal Notes (on the desk)', icon: '✍️', hint: 'His own handwriting', description: 'Notes in Pym\'s cramped hand. One entry, dated three days ago: "V.A. found discrepancy — mentioned Fri. confrontation — must resolve before Sat." The word "resolve" is underlined twice. Saturday was tonight.', grantsClue: 'pym_notes' }
      ],
      firstVisit: 'Dr. Pym\'s room is tidy to a fault. Everything in its place — except, as you will discover, one thing.'
    },

    gravesRoom: {
      id: 'gravesRoom', name: 'Captain Graves\' Room', icon: '⚔️',
      description: 'Lived-in, slightly cluttered. Military medals on the dresser. A framed photograph of young soldiers, arm in arm.',
      exits: { guestWing: 'Back to the Guest Wing' },
      npcs: [],
      objects: [
        { id: 'eleanor_note', name: 'Letter from Eleanor (on the nightstand)', icon: '💌', hint: 'Private correspondence', description: 'In Eleanor\'s hand: "Dearest Oliver — when Victor is finally gone, perhaps things can be different. I dream of it. — E." Dated six months ago. "When Victor is finally gone" is an arresting phrase. But is it the premeditation of a killer, or the wishful thinking of a trapped woman?', grantsClue: 'eleanor_note', opensDoc: 'eleanor_graves_letter' },
        { id: 'war_photo', name: 'Photograph — Boer War, 1900', icon: '📸', hint: 'Old friends', description: 'A faded photograph of six young men in uniform. Victor Ashcroft and Oliver Graves, unmistakable. On the back, in Victor\'s handwriting: "We survived worse than this, Graves. We will survive anything." A cruel irony.' }
      ],
      firstVisit: 'The room smells of tobacco and old leather. Graves has lived simply, for a man of his background.'
    },

    garden: {
      id: 'garden', name: 'The Kitchen Garden', icon: '🌧️',
      description: 'You are immediately drenched. The storm is in full fury. Mrs. Thorne\'s herb beds are here, sheltered under wooden frames half-torn by the wind. Monkshood grows in a dedicated bed, its purple flowers beaten flat by the rain.',
      exits: { drawingRoom: 'Back to the Drawing Room', kitchen: 'Back to the Kitchen' },
      npcs: [],
      objects: [
        { id: 'aconitine_vial', name: 'Glass Vial (in the rose bed)', icon: '⚗️', hint: 'Something glinting', description: 'A small glass vial, mostly buried in the mud at the base of the rose trellis. Empty but for a few clear drops. The label reads: "Ac. Nap. Solution — 10ml — Dr. R. Pym, MD." This is the missing vial from his medical bag. He threw it here to hide it.', grantsClue: 'aconitine_vial' },
        { id: 'monkshood_bed', name: 'The Monkshood Bed', icon: '🌸', hint: 'Disturbed plants', description: 'Aconitum napellus — wolfsbane — in a dedicated bed. The plants have been recently disturbed, some stems snapped. Footprints in the soil, too large and too pointed to be Mrs. Thorne\'s. Someone with a medical education harvested these tonight. Someone who knew exactly what to extract.', grantsClue: 'monkshood_disturbed' }
      ],
      firstVisit: 'The garden is a chaos of rain and wind. A bolt of lightning illuminates everything for half a second — you see the herb beds, the rose trellis, and something catching the light.'
    },

    parlour: {
      id: 'parlour', name: 'The Parlour', icon: '🕯️',
      description: 'The six remaining occupants of Ashcroft Manor have gathered here. The room is thick with tension. Everyone watches everyone else. This is where the truth will come out.',
      exits: { foyer: 'Back to the Foyer' },
      npcs: ['eleanor', 'pym', 'cecily', 'finch', 'graves', 'thorne'],
      objects: [],
      firstVisit: 'You enter the parlour. Six faces turn toward you. The murderer is one of them. Choose carefully.',
      isAccusationRoom: true
    }
  },

  // ─── CHARACTERS ───────────────────────────
  characters: {
    finch: {
      id: 'finch', name: 'Mr. Horace Finch', role: 'Butler', emoji: '🎩',
      description: 'Dignified, measured, loyal to the last.',
      location: 'foyer',
      dialogue: {
        start: 'greeting',
        nodes: {
          greeting: {
            npc: "Inspector. I am relieved you've come. Lord Ashcroft was in excellent health this morning — we argued about the racing pages as we do every Thursday. A man does not simply expire between dinner and port. Something is deeply wrong.",
            opts: [
              { t: "Tell me about this evening's dinner.", n: 'dinner' },
              { t: "Who poured Lord Ashcroft's brandy?", n: 'brandy', g: 'w_finch_brandy' },
              { t: "What can you tell me about the guests?", n: 'guests' },
              { t: "How has Lord Ashcroft's mood been lately?", n: 'victor_mood' }
            ]
          },
          dinner: {
            npc: "Dinner was served at seven o'clock as usual. All six guests were present. Lord Ashcroft ate well and was in reasonable spirits, though perhaps a touch distracted. Dr. Pym was seated to his immediate left.",
            opts: [
              { t: "Anything unusual at the table?", n: 'table_unusual', g: 'w_finch_table' },
              { t: "Who poured his brandy?", n: 'brandy', g: 'w_finch_brandy' },
              { t: "Back to the beginning.", n: 'greeting' }
            ]
          },
          table_unusual: {
            npc: "One thing. During the soup course, Dr. Pym excused himself — said he needed something from his room. Gone about five minutes. When he returned, he was the one who poured Lord Ashcroft's after-dinner brandy. His Lordship normally poured his own. He was quite particular about it. I thought little of it at the time.",
            opts: [
              { t: "That could be significant.", n: 'finch_confirms' },
              { t: "What happened after dinner?", n: 'after_dinner' }
            ]
          },
          brandy: {
            npc: "Lord Ashcroft had a ritual of thirty-five years — he always poured his own brandy. Tonight, Dr. Pym poured it for him. His Lordship accepted it without comment, which surprised me greatly. They had been speaking very quietly. About something serious.",
            opts: [
              { t: "Did you hear any of their conversation?", n: 'conversation' },
              { t: "What happened after Lord Ashcroft drank?", n: 'after_drink' }
            ]
          },
          conversation: {
            npc: "Only a fragment. Lord Ashcroft said, quite clearly: 'You will explain yourself to me before the week is out, Reginald.' Dr. Pym smiled and replied in a murmur I couldn't catch. It did not look like a friendly exchange.",
            opts: [
              { t: "This is very helpful. Thank you.", n: 'end', g: 'w_finch_conversation' },
              { t: "What happened after that?", n: 'after_drink' }
            ]
          },
          after_drink: {
            npc: "About an hour after dinner, Lord Ashcroft said he felt unwell — dizzy, some numbness in his hands. He retired to the study. Dr. Pym offered to accompany him. Twenty minutes later, Pym came to find me and said that Lord Ashcroft had died. Peacefully, he said.",
            opts: [
              { t: "Pym was the last person with him.", n: 'pym_last', g: 'w_finch_last_with_victor' },
              { t: "Thank you, Finch.", n: 'end' }
            ]
          },
          pym_last: {
            npc: "Yes. That has not escaped me, Inspector. I have said nothing because I have no proof. But it has not escaped me.",
            opts: [
              { t: "You've been very helpful.", n: 'end' }
            ]
          },
          after_dinner: {
            npc: "After dinner, the company moved to the drawing room briefly. Lord Ashcroft retired to the study at about half-eight — said he had correspondence to attend to. Dr. Pym followed him a few minutes later, saying he wanted to check on His Lordship's blood pressure.",
            opts: [
              { t: "Pym followed him to the study?", n: 'pym_followed', g: 'w_finch_pym_followed' },
              { t: "Thank you.", n: 'end' }
            ]
          },
          pym_followed: {
            npc: "Yes. And stayed for about twenty minutes. When he emerged, he told me Lord Ashcroft had died. He was composed. Too composed for a man who had just watched his patient of twenty years expire.",
            opts: [{ t: "That is very telling.", n: 'end' }]
          },
          guests: {
            npc: "Lady Eleanor is remarkably composed. Captain Graves has been drinking since before I told him the news. Miss Vane has been crying, quite genuinely. Dr. Pym has been the picture of professional concern. And Mrs. Thorne believes the house has been cursed.",
            opts: [
              { t: "What about Miss Vane specifically?", n: 'cecily_info' },
              { t: "Your read on Dr. Pym?", n: 'pym_opinion' }
            ]
          },
          cecily_info: {
            npc: "Miss Vane. A sweet girl. His Lordship was unusually fond of her — more than professionally so. I never pressed the matter. It wasn't my place. But she reminded him of someone from his past.",
            opts: [{ t: "Thank you, Finch.", n: 'end' }]
          },
          pym_opinion: {
            npc: "My opinion is not evidence. But I will say this: Dr. Pym is a very clever man. And tonight he is trying very hard to appear to be nothing more than a grieving physician. Very. Hard.",
            opts: [{ t: "Noted.", n: 'end' }]
          },
          victor_mood: {
            npc: "Lord Ashcroft has been troubled for several weeks. Going through the estate accounts himself — hadn't done so in years. He said to me last Tuesday: 'Finch, I think someone has been taking liberties with my money.' He didn't name anyone. But he made an appointment with his solicitor.",
            opts: [
              { t: "Did he mention Dr. Pym by name?", n: 'victor_pym_name', g: 'w_finch_accounts' }
            ]
          },
          victor_pym_name: {
            npc: "He said: 'Pym has been handling several of my financial affairs as a courtesy, and I begin to wonder whether courtesy is the right word.' That is all. He was not a man who made accusations without proof. He was gathering it.",
            opts: [{ t: "And then he was silenced before he could act.", n: 'end', g: 'w_finch_pym_accounts' }]
          },
          finch_confirms: {
            npc: "I believe you are on the right track, Inspector. I have thought the same thing all evening and dared not say it. Please. Find the truth. He deserves it.",
            opts: [{ t: "I will.", n: 'end' }]
          },
          end: {
            npc: "If there is anything else you need, Inspector, I am entirely at your disposal. His Lordship deserves justice.",
            opts: [{ t: "Thank you, Finch. That will be all for now.", n: null }]
          }
        }
      }
    },

    eleanor: {
      id: 'eleanor', name: 'Lady Eleanor Ashcroft', role: 'Lord Ashcroft\'s Wife', emoji: '💍',
      description: 'Cold, composed, and impeccably dressed at midnight.',
      location: 'drawingRoom',
      dialogue: {
        start: 'greeting',
        nodes: {
          greeting: {
            npc: "Inspector. How convenient. I was in my chambers for most of the evening with a migraine. I came down for dinner and retired again shortly after. I neither saw nor heard anything remarkable.",
            opts: [
              { t: "You seem very composed for someone who just lost their husband.", n: 'composed' },
              { t: "Tell me about your marriage to Lord Ashcroft.", n: 'marriage' },
              { t: "What do you think of Dr. Pym?", n: 'about_pym' },
              { t: "Where were you between 8 and 10 PM?", n: 'alibi' }
            ]
          },
          composed: {
            npc: "How am I supposed to appear — hysterical? Victor and I had been married twenty-six years. I have had decades to learn composure. He was not a young man, and his health was, shall we say, inconsistent. One learns to prepare.",
            opts: [
              { t: "Were you unhappy?", n: 'unhappy' },
              { t: "Did you love him?", n: 'love' }
            ]
          },
          marriage: {
            npc: "Victor and I had an arrangement. He had his estate, his industries, his eccentricities. I had my life, within reason. Do not romanticize it, Inspector. Marriage in our circles is rarely about love. It is about continuation.",
            opts: [
              { t: "Were there others — for either of you?", n: 'others' },
              { t: "Did he ever mistreat you?", n: 'mistreat' }
            ]
          },
          others: {
            npc: "Victor had his interests. As for myself — I maintained a private life. Victor was aware of the broad strokes and chose not to inquire into the details. It was an arrangement that suited us both.",
            opts: [
              { t: "Captain Graves?", n: 'graves_topic', req: 'love_letters' },
              { t: "I see. Thank you.", n: 'end' }
            ]
          },
          graves_topic: {
            npc: "You found those letters. How industrious. Yes, Oliver and I have been close for some years. Victor was aware in the vaguest sense and chose not to care. If you're suggesting I killed my husband over Oliver Graves, I can assure you the motive does not exist.",
            opts: [
              { t: "You stood to inherit everything.", n: 'inherit' },
              { t: "Graves had significant debts to your husband.", n: 'graves_debts' }
            ]
          },
          inherit: {
            npc: "I have a comfortable income from my own family, Inspector. Victor's estate complicates my life far more than it enriches it. There are creditors, obligations, staff. I had no financial motive.",
            opts: [{ t: "Thank you.", n: 'end' }]
          },
          graves_debts: {
            npc: "Oliver's debts are Oliver's business. Victor had agreed to wait until month-end. There would have been no crisis.",
            opts: [{ t: "Thank you, Lady Eleanor.", n: 'end' }]
          },
          unhappy: {
            npc: "One is never entirely happy or unhappy in a long marriage. Both feelings visit, and both depart. This is simply reality.",
            opts: [{ t: "Fair enough.", n: 'end' }]
          },
          love: {
            npc: "I respected Victor. In our fashion, we were fond of one another. Whether that is love — I am not certain I am the best person to define it.",
            opts: [{ t: "Thank you.", n: 'end' }]
          },
          about_pym: {
            npc: "Reginald Pym has been our physician for twenty years. A precise, careful man. Victor trusted him entirely — perhaps excessively. He handled some of Victor's financial correspondence as a so-called courtesy. Victor liked not being bothered with paperwork.",
            opts: [
              { t: "Financial correspondence — what exactly?", n: 'pym_finances', g: 'w_eleanor_pym_finances' },
              { t: "Did you trust Pym?", n: 'trust_pym' }
            ]
          },
          pym_finances: {
            npc: "Bank correspondence, payments to contractors, transfers to various accounts. Victor gave him signatory authority years ago. I always thought it unwise. But Victor liked Pym. Found him convenient. Useful people have a way of making themselves necessary.",
            opts: [{ t: "That is very interesting.", n: 'end' }]
          },
          trust_pym: {
            npc: "I trust anyone as far as their interests align with mine. With Reginald, I was never quite certain what those interests were. He always seemed to want something. He just never made it obvious.",
            opts: [{ t: "A careful observation.", n: 'end' }]
          },
          alibi: {
            npc: "I was here in the drawing room until approximately nine, then retired upstairs. I spoke briefly with Miss Vane on the landing at nine-thirty — she can confirm it, if she's not too busy grieving.",
            opts: [{ t: "Thank you, Lady Eleanor.", n: 'end' }]
          },
          mistreat: {
            npc: "Victor was cold, occasionally cutting, and fundamentally self-absorbed. But not violent. I would not have tolerated violence.",
            opts: [{ t: "Thank you.", n: 'end' }]
          },
          end: {
            npc: "If that is all, Inspector, I am very tired. I should very much like to be left alone.",
            opts: [{ t: "Of course. Thank you for your time.", n: null }]
          }
        }
      }
    },

    pym: {
      id: 'pym', name: 'Dr. Reginald Pym', role: 'Family Physician', emoji: '🩺',
      description: 'Smooth, professional, and slightly too relaxed.',
      location: 'foyer',
      dialogue: {
        start: 'greeting',
        nodes: {
          greeting: {
            npc: "Inspector. What a dreadful night. I was with poor Victor at the end — absolutely dreadful. Heart failure, clearly. The man's diet was a catastrophe I warned him about for years. In the end the body simply... gives out. Terribly sad.",
            opts: [
              { t: "What exactly happened in the study?", n: 'what_happened' },
              { t: "You were the last person with him?", n: 'last_person' },
              { t: "Tell me about your medical bag.", n: 'bag_question' },
              { t: "I'd like to ask about Lord Ashcroft's finances.", n: 'finances' }
            ]
          },
          what_happened: {
            npc: "I followed Victor to the study — he'd mentioned feeling dizzy after dinner, which concerned me. When I arrived he was quite pale, pulse rapid and weak. I administered a cardiac stabiliser but within minutes he was... gone. Very quickly. Nothing more I could have done.",
            opts: [
              { t: "What medication did you administer?", n: 'medication', g: 'w_pym_medication' },
              { t: "Did he say anything?", n: 'last_words' }
            ]
          },
          medication: {
            npc: "A standard digitalis-based cardiac stimulant. Completely routine for suspected arrest. I have full documentation if required.",
            opts: [
              { t: "May I see your medical bag?", n: 'bag_request' },
              { t: "You seem very calm about all this.", n: 'calm' }
            ]
          },
          bag_request: {
            npc: "(A slight pause.) Of course. It's in my room. Standard physician's bag — forceps, sutures, medications. Nothing remarkable at all.",
            opts: [{ t: "I'll examine it myself. Thank you.", n: 'end' }]
          },
          last_person: {
            npc: "As far as I know, yes. Finch was nearby, he may have looked in. I was entirely focused on Victor.",
            opts: [
              { t: "Finch says you poured Lord Ashcroft's brandy.", n: 'brandy_confrontation', g: 'w_pym_brandy' },
              { t: "Was he conscious when you arrived?", n: 'conscious' }
            ]
          },
          brandy_confrontation: {
            npc: "(A brief flicker — quickly suppressed.) Yes, I poured the brandy. Victor's hands were shaking a little — the beginning of the episode, as it turned out. I poured it as a small courtesy between old friends.",
            opts: [
              { t: "Lord Ashcroft always poured his own brandy. For thirty-five years.", n: 'always_poured', g: 'w_pym_defensive' },
              { t: "I see.", n: 'end' }
            ]
          },
          always_poured: {
            npc: "I — yes, normally. But as I said, he seemed unwell. I really don't see the relevance of who poured the brandy, Inspector.",
            opts: [{ t: "The relevance may become clear.", n: 'end' }]
          },
          finances: {
            npc: "(Carefully.) I'm not sure what Victor's finances have to do with his health. I was his physician, not his accountant.",
            opts: [
              { t: "You had signatory authority on his accounts.", n: 'signatory', req: 'w_eleanor_pym_finances' },
              { t: "He had a note to confront you about something.", n: 'confront_note', req: 'rp_notation' },
              { t: "Let's move on.", n: 'end' }
            ]
          },
          signatory: {
            npc: "(A careful smile.) Yes, as a courtesy. I handled correspondence Victor found tedious. Every transfer was made with Victor's full knowledge and approval.",
            opts: [
              { t: "All twelve thousand pounds worth?", n: 'twelve_thousand', req: 'bank_letter' }
            ]
          },
          twelve_thousand: {
            npc: "(A long pause. Something shifts behind his eyes.) Where did you find— (composing himself.) Victor was aware of those transfers. They were investments on his behalf.",
            opts: [
              { t: "Investments in your own private Swiss account?", n: 'swiss', g: 'w_pym_exposed' },
              { t: "I'll be examining those bank records very carefully.", n: 'bank_response' }
            ]
          },
          swiss: {
            npc: "(He says nothing for a moment.) I think, Inspector, that this conversation would greatly benefit from my solicitor's presence. I have nothing more to say tonight.",
            opts: [{ t: "You'll answer for this, Dr. Pym.", n: 'end' }]
          },
          bank_response: {
            npc: "Please do. You'll find everything in order. (His eye twitches slightly.)",
            opts: [{ t: "I'm sure I will.", n: 'end' }]
          },
          confront_note: {
            npc: "(Sharp.) Where did you find— (catching himself.) Victor wrote notes about everything. 'Confront' hardly implies anything sinister. A routine discrepancy, perhaps.",
            opts: [
              { t: "He's dead now. Rather convenient.", n: 'convenient' },
              { t: "Thank you, Doctor.", n: 'end' }
            ]
          },
          convenient: {
            npc: "(Very still.) I would be very careful about what you imply, Inspector. Very careful indeed.",
            opts: [{ t: "I'm always careful.", n: 'end' }]
          },
          bag_question: {
            npc: "My bag is a physician's bag. Everything I might need in an emergency. Tonight, unfortunately, it wasn't enough.",
            opts: [
              { t: "What medications do you carry?", n: 'medications' },
              { t: "May I see it?", n: 'bag_request' }
            ]
          },
          medications: {
            npc: "The standard range. Digitalis, morphine sulphate, atropine, various tinctures and solutions. A travelling physician must be prepared for anything.",
            opts: [
              { t: "Aconitine?", n: 'aconitine', req: 'medical_encyclopedia' },
              { t: "I see.", n: 'end' }
            ]
          },
          aconitine: {
            npc: "(A visible swallow.) Aconitine is a restricted substance. A responsible physician would never carry it. I certainly don't.",
            opts: [
              { t: "One of your vial slots is empty. Labeled Ac. Nap. Solution.", n: 'vial_confrontation', req: 'medical_bag_vial' },
              { t: "I'll need to verify that.", n: 'end' }
            ]
          },
          vial_confrontation: {
            npc: "(Silence.) I — that slot is mislabeled. It held a sedative. There's been some confusion about the labeling in my bag.",
            opts: [
              { t: "I found the vial itself — in the rose bed in the garden.", n: 'vial_found', req: 'aconitine_vial', g: 'w_pym_vial' },
              { t: "We'll have the brandy glass residue tested.", n: 'glass_test' }
            ]
          },
          vial_found: {
            npc: "(He looks at you for a long, flat moment.) I want a solicitor. I have nothing more to say without legal representation.",
            opts: [{ t: "That's your right. But you won't be leaving this manor.", n: 'end' }]
          },
          glass_test: {
            npc: "(Slight tremor.) Test it. You'll find nothing. (A pause. He looks away.)",
            opts: [{ t: "The test will be conducted in the morning.", n: 'end' }]
          },
          calm: {
            npc: "I am a physician. I have seen death before. Composure is a professional necessity. It does not mean I am unaffected.",
            opts: [{ t: "I'll take your word for it.", n: 'end' }]
          },
          conscious: {
            npc: "Barely. He said — he said 'Reginald, I know.' And then he was gone.",
            opts: [{ t: "'I know.' What did he know, Doctor?", n: 'what_he_knew' }]
          },
          what_he_knew: {
            npc: "(Quickly.) He meant he knew he was dying. A man knows. I've seen it many times.",
            opts: [{ t: "Perhaps.", n: 'end' }]
          },
          last_words: {
            npc: "He was barely coherent. I couldn't make out anything.",
            opts: [{ t: "A moment ago you mentioned he said 'I know.'", n: 'contradiction', g: 'w_pym_contradiction' }]
          },
          contradiction: {
            npc: "(A dangerous pause.) I — yes. That's right. I misspoke. It's been a very difficult evening, Inspector.",
            opts: [{ t: "I'm sure it has.", n: 'end' }]
          },
          end: {
            npc: "Is there anything else, Inspector? I am entirely at your disposal.",
            opts: [{ t: "Not for now. Thank you, Doctor.", n: null }]
          }
        }
      }
    },

    cecily: {
      id: 'cecily', name: 'Miss Cecily Vane', role: 'Governess', emoji: '📚',
      description: 'Young, earnest, and clearly distressed.',
      location: 'library',
      dialogue: {
        start: 'greeting',
        nodes: {
          greeting: {
            npc: "Oh! You startled me. I was watching the lightning — I do that when I'm troubled. Is there any news? About Lord Ashcroft?",
            opts: [
              { t: "The investigation is ongoing. May I ask you some questions?", n: 'questions' },
              { t: "Why are you crying?", n: 'crying' },
              { t: "How well did you know Lord Ashcroft?", n: 'knew_victor' }
            ]
          },
          questions: {
            npc: "Of course. Whatever I can do. I want to know what really happened to him.",
            opts: [
              { t: "Where were you between 8 and 10 PM?", n: 'alibi' },
              { t: "What was your relationship with him?", n: 'relationship' },
              { t: "Did you see anything unusual tonight?", n: 'unusual' }
            ]
          },
          crying: {
            npc: "I'm sorry. I was fond of him — genuinely fond. He was kind to me in a way that was unusual coming from a man of his kind. Private, reserved, but always had time to discuss books. I am not crying for inheritance. I am crying for a man who was kind.",
            opts: [
              { t: "Did you know he was your father?", n: 'father_reveal', req: 'birth_cert' },
              { t: "I believe you.", n: 'believe' }
            ]
          },
          father_reveal: {
            npc: "(A long pause. She closes her eyes.) Yes. My mother died last spring and left me a box of letters — from him to her, before I was born. I came here because I wanted to know him. I answered the advertisement, I didn't tell him who I was, and then... I grew to love him. And now I can't tell him.",
            opts: [
              { t: "Did he know who you were?", n: 'did_he_know' },
              { t: "I'm sorry. That's a painful story.", n: 'sympathize' }
            ]
          },
          did_he_know: {
            npc: "I think he suspected. He would look at me sometimes with an expression I couldn't quite read. Once he said, 'You remind me of someone I loved very much, Miss Vane.' We never spoke plainly of it. We kept almost saying it.",
            opts: [
              { t: "You had nothing to gain from his death.", n: 'nothing_gain' },
              { t: "Thank you for telling me.", n: 'end' }
            ]
          },
          nothing_gain: {
            npc: "Nothing. Everything to lose. He was changing his will — I don't know what that letter said. But whatever it contained, I only wanted him to live. That's all.",
            opts: [{ t: "Thank you, Miss Vane.", n: 'end' }]
          },
          sympathize: {
            npc: "Thank you. It is a strange kind of grief — losing someone you were only just beginning to know.",
            opts: [{ t: "Do you suspect anyone?", n: 'suspect' }]
          },
          suspect: {
            npc: "I don't want to accuse without evidence. But Dr. Pym has been strange tonight — too smooth, too ready. And I saw him in the corridor near the study at about nine. He was coming away from it, not toward it. He saw me and smiled and said Lord Ashcroft was resting comfortably.",
            opts: [{ t: "He was leaving the study?", n: 'pym_leaving', g: 'w_cecily_corridor' }]
          },
          pym_leaving: {
            npc: "Yes. And that smile. I keep thinking about it. I couldn't say exactly what was wrong with it. Something behind it, something... finished. I thought nothing of it then.",
            opts: [{ t: "That is very important. Thank you.", n: 'end', g: 'w_cecily_pym_smile' }]
          },
          alibi: {
            npc: "I was here in the library until about nine, then checked on the children — they were frightened by the storm. I saw Lady Eleanor on the landing at nine-thirty. After that I was in my room.",
            opts: [{ t: "Did you see anyone else?", n: 'saw_anyone' }]
          },
          saw_anyone: {
            npc: "Dr. Pym in the corridor, as I mentioned. And I could see light under the study door — Lord Ashcroft was still alive then. I heard two voices through the door.",
            opts: [{ t: "Two voices — could you hear what was said?", n: 'voices', g: 'w_cecily_voices' }]
          },
          voices: {
            npc: "Lord Ashcroft's voice, raised: 'I know exactly what you've done.' Then a quieter voice — Pym's, I think. I couldn't hear the words. Then silence. I thought it was just an argument about his health. I walked on.",
            opts: [{ t: "This is significant evidence. Thank you.", n: 'end', g: 'w_cecily_argument' }]
          },
          unusual: {
            npc: "Pym in the corridor, the two voices from the study. But also — earlier, before dinner, I saw him go through the back passage toward the kitchen garden. He was carrying his medical bag. At the time I thought nothing of it.",
            opts: [{ t: "Around what time was that?", n: 'time_garden', g: 'w_cecily_garden' }]
          },
          time_garden: {
            npc: "About quarter to eight. Just before dinner. I remember because the gong rang while he was still out there.",
            opts: [{ t: "Thank you — that's very helpful.", n: 'end' }]
          },
          relationship: {
            npc: "I was employed as governess. A small role — only two children in residence. But Lord Ashcroft was generous about the library, and we spoke often about books.",
            opts: [{ t: "The real reason you came here?", n: 'crying' }]
          },
          knew_victor: {
            npc: "Better than anyone here knew, I think, at the end. He had a remarkable mind — ruthless in business, but deeply curious about ideas. Honest with himself, which is rarer than it sounds.",
            opts: [{ t: "Did he ever seem afraid of anyone?", n: 'afraid' }]
          },
          afraid: {
            npc: "In the last two weeks he was preoccupied. Once, when we were discussing a mystery novel, he said: 'The most dangerous criminals, Miss Vane, are the ones who appear trustworthy.' I wonder now if he was telling me something.",
            opts: [{ t: "He was suspicious of someone close to him.", n: 'close', g: 'w_cecily_warning' }]
          },
          close: {
            npc: "I believe so. I wish I'd asked who. I thought it was literary discussion. Now I think it was a warning — his way of saying something without quite saying it.",
            opts: [{ t: "Thank you, Miss Vane.", n: 'end' }]
          },
          believe: {
            npc: "Thank you. That means something.",
            opts: [{ t: "Do you suspect anyone?", n: 'suspect' }]
          },
          end: {
            npc: "Please find out what happened to him, Inspector. He deserved better than this.",
            opts: [{ t: "I will. I promise.", n: null }]
          }
        }
      }
    },

    graves: {
      id: 'graves', name: 'Captain Oliver Graves', role: 'Lord Ashcroft\'s Old Friend', emoji: '⚔️',
      description: 'Broad-shouldered, sad-eyed, and clearly drinking.',
      location: 'diningRoom',
      dialogue: {
        start: 'greeting',
        nodes: {
          greeting: {
            npc: "Sit down if you want. I'm not going anywhere. Victor was my oldest friend. We served together — Boer War, Western Front. Survived all of that. And then— (He drinks.) Well. Here we are.",
            opts: [
              { t: "Tell me about your evening.", n: 'evening' },
              { t: "I understand you had significant debts to Lord Ashcroft.", n: 'debts' },
              { t: "Do you believe this was foul play?", n: 'foul_play' },
              { t: "What do you make of Dr. Pym?", n: 'about_pym' }
            ]
          },
          evening: {
            npc: "I was here. Dining room. After dinner everyone drifted off and I stayed with the whiskey. Victor always left a bottle for me. He knew I wasn't built for drawing rooms.",
            opts: [
              { t: "Did you hear or see anything unusual?", n: 'unusual' },
              { t: "Were you alone all evening?", n: 'alone' }
            ]
          },
          unusual: {
            npc: "I heard Pym go past toward the study at about half-eight. Quick, purposeful footsteps. Then quiet for a long time. Too long. And when he came back, he walked much slower. Like a man who's finished something.",
            opts: [{ t: "Finished something. That's how you'd describe it.", n: 'finished', g: 'w_graves_pym_return' }]
          },
          finished: {
            npc: "I'm a soldier, Inspector. I know what a man looks like when he's done something that can't be undone. Pym looked like that. I didn't want to believe it. Victor trusted him completely.",
            opts: [
              { t: "What time did he go past?", n: 'timeline', g: 'w_graves_timeline' },
              { t: "Why didn't you say anything sooner?", n: 'sooner' }
            ]
          },
          timeline: {
            npc: "Half-eight, give or take. The mantel clock chimed nine while he was still in there. And then his footsteps going back, slow and quiet, a few minutes after that.",
            opts: [{ t: "That puts Pym in the study when Victor died.", n: 'pym_there', g: 'w_graves_pym_study' }]
          },
          pym_there: {
            npc: "That's my read. Yes.",
            opts: [{ t: "Thank you, Captain.", n: 'end' }]
          },
          sooner: {
            npc: "(Short, bitter laugh.) I should've done a lot of things differently in my life. Add it to the list.",
            opts: [{ t: "Tell me about the debts.", n: 'debts' }]
          },
          debts: {
            npc: "You've seen the IOUs. Eight thousand pounds. I know how it looks. But I was selling my Norfolk estate — would have cleared it and then some. Victor knew this. He'd agreed to wait until month-end.",
            opts: [
              { t: "He might have changed his mind.", n: 'changed_mind' },
              { t: "I believe you.", n: 'believe' }
            ]
          },
          changed_mind: {
            npc: "He hadn't. And even if he had — Victor is the only person from my old life still alive. Was. I wouldn't harm him for eight thousand pounds. I wouldn't harm him for anything.",
            opts: [{ t: "I understand.", n: 'end' }]
          },
          believe: {
            npc: "Appreciate that. Not everyone will.",
            opts: [{ t: "Tell me about Dr. Pym.", n: 'about_pym' }]
          },
          foul_play: {
            npc: "Without question. Victor was as healthy as a man his age has any right to be. And I've seen enough death to know the difference between natural and otherwise. The look on his face was wrong.",
            opts: [{ t: "Who do you think did it?", n: 'who_did_it' }]
          },
          who_did_it: {
            npc: "Two days before he died, Victor told me he'd found errors in the estate accounts — said he needed a serious conversation with 'the man handling the money.' Pym handled his money, Inspector. And Pym was the last man with him.",
            opts: [{ t: "That's very significant.", n: 'significant', g: 'w_graves_accounts' }]
          },
          significant: {
            npc: "I think so. I've thought it all evening. Didn't want to be wrong about a man. But that's your job, isn't it.",
            opts: [{ t: "Thank you, Captain.", n: 'end' }]
          },
          about_pym: {
            npc: "Never liked him, if you want the truth. Too polished. Victor trusted him because he was useful — handled things, smoothed things over. The sort of man who makes himself indispensable so no one looks too closely.",
            opts: [
              { t: "Did Victor ever express doubts about Pym?", n: 'victor_doubts', g: 'w_graves_doubts' }
            ]
          },
          victor_doubts: {
            npc: "He said to me: 'There are figures in my accounts that don't add up, Oliver. Someone's been very clever about it. But not quite clever enough.' He didn't say Pym's name. He didn't have to.",
            opts: [{ t: "And then he was killed before he could prove it.", n: 'end', g: 'w_graves_figures' }]
          },
          alone: {
            npc: "Mostly. Mrs. Thorne cleared the table at eight-fifteen, muttered about bad omens, and left. After that, just me and the whiskey.",
            opts: [{ t: "Thank you.", n: 'end' }]
          },
          end: {
            npc: "Get him, Inspector. Whatever he did — get him for Victor.",
            opts: [{ t: "I intend to.", n: null }]
          }
        }
      }
    },

    thorne: {
      id: 'thorne', name: 'Mrs. Agatha Thorne', role: 'Housekeeper', emoji: '🌿',
      description: 'Quick-eyed, superstitious, and observant.',
      location: 'kitchen',
      dialogue: {
        start: 'greeting',
        nodes: {
          greeting: {
            npc: "I knew something was wrong tonight. I felt it in the air — the barometric pressure dropped, three candles guttered out at once, and the kitchen cat wouldn't come in from the cold. Three candles at once, Inspector. That's never good.",
            opts: [
              { t: "What did you see this evening?", n: 'saw' },
              { t: "Tell me about your herb garden.", n: 'herbs' },
              { t: "What do you think happened?", n: 'opinion' }
            ]
          },
          saw: {
            npc: "I was in the kitchen garden at half-past eight, tying down the frames because of the storm. And I saw Dr. Pym walking through the rose garden. He was near my planting beds. The dedicated ones, at the far end.",
            opts: [
              { t: "Near which beds specifically?", n: 'which_beds', g: 'w_thorne_pym_garden' },
              { t: "Did he see you?", n: 'saw_me' }
            ]
          },
          which_beds: {
            npc: "The monkshood beds. I keep them separate because the plant is quite toxic. He was standing there for perhaps two or three minutes. I thought he was admiring them. Peculiar time for a botanical stroll, in retrospect.",
            opts: [{ t: "What time was this?", n: 'time_confirm', g: 'w_thorne_time' }]
          },
          time_confirm: {
            npc: "Half past eight. I'm certain because I'd just come out when the church clock on the hill struck the half-hour. You can hear it through the storm if it's blowing the right way.",
            opts: [{ t: "That is very important. Thank you.", n: 'end' }]
          },
          saw_me: {
            npc: "I don't believe so. The rain was heavy and I was crouching by the frames. He went back inside after a few minutes. Through the kitchen passage, not the French doors.",
            opts: [{ t: "Through the kitchen passage — to the guest wing stairs?", n: 'kitchen_passage', g: 'w_thorne_passage' }]
          },
          kitchen_passage: {
            npc: "Yes. That would take him up the back stairs to the guest wing. He could get to his room and back to the main house without passing through anywhere public. I'd not have noticed if I hadn't been outside.",
            opts: [{ t: "Thank you, Mrs. Thorne.", n: 'end' }]
          },
          herbs: {
            npc: "I grow them for cooking, for tisanes, and a few medicinal varieties from my grandmother's recipes. The monkshood is purely decorative and for one old poultice recipe — it's quite beautiful in summer. But very toxic. I keep it far from the kitchen and I label everything.",
            opts: [
              { t: "Could someone have harvested the aconitine from it?", n: 'harvest' },
              { t: "The plants look disturbed tonight.", n: 'disturbed', req: 'monkshood_disturbed' }
            ]
          },
          harvest: {
            npc: "Someone with the knowledge, yes. The root and seeds are the most potent. A physician would know exactly how to extract it. You could have a concentrated solution in under an hour if you knew what you were doing.",
            opts: [{ t: "A physician like Dr. Pym.", n: 'physician', g: 'w_thorne_physician' }]
          },
          physician: {
            npc: "I am not going to accuse anyone, Inspector. I am simply answering your question about the botany. (A meaningful pause.) But yes. A physician would know.",
            opts: [{ t: "Thank you, Mrs. Thorne.", n: 'end' }]
          },
          disturbed: {
            npc: "I noticed that too! The stems are snapped on three plants in the monkshood bed. And the root has been disturbed — I can see it in the soil. That wasn't me. I'd never damage my plants that way. Someone was in a hurry.",
            opts: [{ t: "Any idea of footprint size?", n: 'footprints', g: 'w_thorne_footprints' }]
          },
          footprints: {
            npc: "Too large and too pointed to be mine. A man's dress shoe, I'd say. A city man's shoe. Not made for gardens.",
            opts: [{ t: "Thank you.", n: 'end' }]
          },
          opinion: {
            npc: "Lord Ashcroft was murdered. I've been in service for thirty years and I know when a household is wrong. This one is very wrong. Lady Eleanor hasn't wept. Dr. Pym is too smooth. Something dark happened in this house tonight.",
            opts: [
              { t: "Your instincts may be correct.", n: 'instincts' },
              { t: "What did you see this evening?", n: 'saw' }
            ]
          },
          instincts: {
            npc: "Instincts kept me alive through worse than this, Inspector. Mark them.",
            opts: [{ t: "I will.", n: 'end' }]
          },
          end: {
            npc: "If there's anything else I can help with, Inspector, I'm not going anywhere. Not on a night like this.",
            opts: [{ t: "Thank you, Mrs. Thorne.", n: null }]
          }
        }
      }
    }
  },

  // ─── CLUES ────────────────────────────────
  clues: {
    body_exam:          { name: 'Body Examination', icon: '⚰️', key: true,  desc: 'Blue lip tinge and tetanic hand contraction — signs of aconitine (neurotoxin) poisoning, not natural cardiac arrest.' },
    brandy_glass:       { name: 'The Brandy Glass', icon: '🥃', key: true,  desc: 'Cloudy residue and smeared fingerprint on the stem. Someone wiped this hastily but not well enough.' },
    rp_notation:        { name: '"R.P. — CONFRONT"', icon: '📝', key: true,  desc: 'Lord Ashcroft\'s note: "R.P. — accounts — CONFRONT." Written the day he died. R.P. — Reginald Pym.' },
    diary:              { name: 'Lord Ashcroft\'s Diary', icon: '📖', key: true,  desc: 'Diary entries show Victor discovered financial irregularities and planned to confront Pym on the night of his death.' },
    will_change:        { name: 'Solicitor\'s Letter', icon: '⚖️', key: true,  desc: 'Victor was revising his will — and adding a clause to cut off anyone found to have breached his financial trust.' },
    medical_encyclopedia: { name: 'Aconitine Encyclopedia Entry', icon: '🔬', key: true,  desc: 'Medical text confirms aconitine causes cardiac arrest indistinguishable from natural heart failure — and produces a blue lip tinge.' },
    medical_bag_vial:   { name: 'Missing Vial (Pym\'s Bag)', icon: '💼', key: true,  desc: 'Pym\'s bag has 12 slots, only 11 vials. The empty slot is labeled: "Ac. Nap. Solution." Aconitine.' },
    bank_letter:        { name: 'Bank Transfer Letter', icon: '🏦', key: true,  desc: '£12,000 transferred from Ashcroft estate to Pym\'s private Swiss account over the past year. Embezzlement.' },
    pym_notes:          { name: 'Pym\'s Personal Notes', icon: '✍️', key: true,  desc: 'Pym wrote: "V.A. found discrepancy — must resolve before Sat." Saturday was the night Victor died.' },
    aconitine_vial:     { name: 'Aconitine Vial (Garden)', icon: '⚗️', key: true,  desc: 'The missing vial from Pym\'s bag — found in the rose bed, labeled with Pym\'s name. The murder weapon.' },
    monkshood_disturbed:{ name: 'Disturbed Monkshood Bed', icon: '🌸', key: true,  desc: 'Monkshood plants recently harvested. Large, pointed footprints in the soil — a man\'s dress shoe.' },
    muddy_prints:       { name: 'Muddy Footprints', icon: '👣', key: true,  desc: 'Fresh muddy prints outside Pym\'s room — garden soil. He came back via the back stairs to hide the evidence.' },
    herb_bundle:        { name: 'Monkshood in the Kitchen', icon: '🌿', key: true,  desc: 'Mrs. Thorne grows Aconitum napellus — the source plant for aconitine — in the kitchen garden.' },

    love_letters:       { name: 'Eleanor\'s Love Letters', icon: '💌', key: false, desc: 'Passionate letters from Eleanor to Captain Graves. Motive for Eleanor — but Victor already knew about the affair and didn\'t care.' },
    birth_cert:         { name: 'Cecily\'s Birth Certificate', icon: '📋', key: false, desc: 'Cecily Vane is Lord Ashcroft\'s illegitimate daughter — a motive to inherit. But she had no knowledge of the will, and clearly genuinely grieved.' },
    ious:               { name: 'Graves\' IOUs (£8,000)', icon: '📄', key: false, desc: 'Graves owed Victor £8,000. A motive — but he had a clear plan to repay, and Victor had agreed to wait.' },
    eleanor_note:       { name: 'Eleanor\'s Letter to Graves', icon: '💌', key: false, desc: '"When Victor is finally gone..." — suggestive phrasing, but Eleanor had no practical motive to act.' }
  },

  // ─── DOCUMENTS ────────────────────────────
  documents: {
    diary: {
      title: "Lord Ashcroft's Private Diary",
      icon: '📖',
      isDocument: true,
      pages: [
        { heading: "November 10th", body: "Went through the quarterly accounts myself for the first time in three years — Reginald usually handles the correspondence but I wanted to see the figures directly.\n\nSomething is not right. There are transfers to a Geneva account that I do not recognise. Small amounts, spread across many months, totalling what appears to be a considerable sum. I may be misreading the ledger. I shall look again tomorrow." },
        { heading: "November 12th", body: "I am not misreading the ledger.\n\nSome £12,000 has been moved from my estate accounts over the course of the year. The paperwork is done in my name — or rather, in my name as written by someone else. The Geneva account belongs to R.P.\n\nI will say nothing until I am certain. But I am becoming certain.\n\nFriday evening, I will ask Reginald to explain himself. I will give him the opportunity to produce a reasonable explanation. I do not expect one." },
        { heading: "November 14th — This Evening", body: "Tonight is the night. Reginald is here for dinner.\n\nI am not afraid of what I will find. I built this estate from nothing and I am not about to let a physician I trusted with my health steal from me without consequence.\n\nThe solicitor will be here Monday morning. Whatever Reginald says tonight, I am revising the will and beginning proceedings.\n\nI told no one. I trust no one in this house with this matter. Only Finch, perhaps — and Finch is too loyal to be useful.\n\nLet us see what Reginald has to say for himself." }
      ]
    },
    solicitors_letter: {
      title: "Letter from Hatch & Pemberton, Solicitors",
      icon: '⚖️',
      isDocument: true,
      body: "3 Chancery Lane, London\nNovember 11th, 1921\n\nDear Lord Ashcroft,\n\nWe write to confirm receipt of your instructions regarding an amendment to your existing will and testament, as discussed in our meeting of November 9th.\n\nAs requested, we are preparing a new clause (Clause 14, sub-section ii) which shall read as follows:\n\n\"Any person found by a court of competent jurisdiction to have breached their fiduciary duty to the estate of Victor William Ashcroft shall be wholly disinherited, and any sums misappropriated shall be pursued as a civil debt.\"\n\nWe anticipate the revised document will be ready for signature by Monday, November 16th.\n\nYours faithfully,\nJ.P. Hatch",
      signature: "J.P. Hatch, Solicitor"
    },
    birth_certificate: {
      title: "Birth Certificate",
      icon: '📋',
      isDocument: true,
      body: "CERTIFIED COPY OF AN ENTRY OF BIRTH\n\nName: Cecily Margaret Ashcroft\nDate of Birth: 14th March, 1897\nPlace of Birth: Dorchester, Dorset\n\nName of Father: Victor William Ashcroft\nOccupation: Industrialist\n\nName of Mother: Margaret Eleanor Vane\nOccupation: Schoolmistress\n\n(Registration District: Dorchester)\n\n—\n\n[A handwritten note is attached in unfamiliar script, in a woman's hand:]\n\n\"Cecily — if you ever find this, know that he did not abandon us. He did not know. I chose not to tell him, and I have wondered every year since whether I was right. If you ever wish to know him, the door may still be open. Go carefully. He is a complicated man. — M.\"",
      signature: "Registered: April 1897"
    },
    love_letters: {
      title: "Lady Eleanor's Letters to Captain Graves",
      icon: '💌',
      isDocument: true,
      body: "April 3rd, 1921\n\nDearest Oliver,\n\nAnother dinner where I sat across from a man who has not looked at me with genuine feeling in fifteen years. You will think I am being dramatic. Perhaps I am. But there are evenings when I feel entirely invisible, and those evenings are growing more frequent.\n\nHow strange that the one person in my life who actually sees me is the one person I cannot be with openly.\n\nI am not a romantic. I know this. But I cannot help thinking that there must be something better than this, and that you are it.\n\nWhen Victor is finally gone — and he is sixty-seven with terrible cholesterol, Oliver, this is not a wish, merely an actuarial reality — perhaps things can be arranged differently. I find myself thinking about it.\n\nWrite soon.\n— E.",
      note: "(A second letter, dated July, contains similar sentiments. No indication of any intent beyond wishful thinking.)"
    },
    bank_letter: {
      title: "Letter from Coutts & Co., Bankers",
      icon: '🏦',
      isDocument: true,
      body: "Coutts & Co.\n440 Strand, London\nNovember 8th, 1921\n\nDear Dr. Pym,\n\nWe write to confirm the completion of the most recent transfer instruction:\n\nAmount: £3,000 sterling\nFrom: Ashcroft Estate Current Account (No. 4471-88)\nTo: Account No. GVA-2204-PYM, Banque Privée de Genève, Switzerland\nDate of transfer: November 7th, 1921\n\nThis brings the total transferred to the above account in the calendar year 1921 to £12,000 sterling.\n\nAs per your standing instruction, no correspondence regarding these transfers is to be sent to the Ashcroft estate address. This letter is sent to your Harley Street practice as instructed.\n\nYours faithfully,\nA.C. Worthing\nPrivate Client Services",
      signature: "A.C. Worthing, Coutts & Co."
    },
    ious: {
      title: "Captain Graves' IOUs",
      icon: '📄',
      isDocument: true,
      body: "I.O.U.\n\n£2,500 — September 1920 (horse racing, Newmarket)\n£1,800 — February 1921 (card debts, Whites Club)\n£3,700 — August 1921 (investment gone wrong — Bolivian mining concern)\n\nTotal: £8,000 sterling\n\nI, Oliver James Graves, acknowledge this debt to Lord Victor Ashcroft and undertake to repay the full sum. Payment terms as agreed privately.\n\n— O.J. Graves, Captain (Ret.)\n\n[Victor Ashcroft's annotation at the bottom:]\n\"To be called in by November 20th, 1921. Oliver knows. We've discussed. He's selling Norfolk — it'll cover it. Poor old fool.\"",
      signature: "O.J. Graves"
    },
    eleanor_graves_letter: {
      title: "Eleanor's Letter (from Graves' Room)",
      icon: '💌',
      isDocument: true,
      body: "October 14th, 1921\n\nDearest Oliver,\n\nVictor mentioned your debts at dinner last night — not cruelly, just as a matter of fact, the way he mentions everything, as though feelings are a category error. He said he'd give you until the 20th and that he expected it settled.\n\nI told him you were reliable. He didn't disagree.\n\nI am sorry things are complicated. They are always complicated. I sometimes think we are both very good at complicated and very bad at simple.\n\nWhen Victor is finally gone — I know, I know, you will tell me not to talk like this — I think I would like to try something simple for once.\n\nYours,\n— E."
    }
  },

  // ─── ITEMS ────────────────────────────────
  items: {
    revolver:      { name: 'Loaded Revolver', icon: '🔫', desc: 'Found in Lord Ashcroft\'s desk. A decisive argument.', combat: true, damage: [35, 45], uses: 1 },
    smelling_salts: { name: 'Smelling Salts', icon: '💊', desc: 'Lady Eleanor\'s smelling salts. Restores your senses.', combat: true, heal: 30, uses: 1 },
    brandy_flask:  { name: 'Flask of Brandy', icon: '🫙', desc: 'Cooking brandy in a flask. Warming and restorative.', combat: true, heal: 20, uses: 1 }
  },

  // ─── ACHIEVEMENTS ─────────────────────────
  achievements: [
    { id: 'first_clue',      icon: '🔍', name: 'Elementary',        desc: 'Discovered your first clue.',                     secret: false },
    { id: 'all_rooms',       icon: '🗺️', name: 'No Stone Unturned', desc: 'Explored every room in the manor.',               secret: false },
    { id: 'all_characters',  icon: '💬', name: 'Conversationalist', desc: 'Spoke to every person in the manor.',             secret: false },
    { id: 'all_key_clues',   icon: '🗝️', name: 'Sharp Eye',         desc: 'Discovered all key pieces of evidence.',          secret: false },
    { id: 'read_all_docs',   icon: '📜', name: 'Bookworm',          desc: 'Read every letter and document.',                 secret: false },
    { id: 'no_hints',        icon: '🧠', name: 'Ace Detective',     desc: 'Solved the case without using any hints.',        secret: false },
    { id: 'first_try',       icon: '🎯', name: 'True Detective',    desc: 'Correctly identified the murderer on your first accusation.',  secret: false },
    { id: 'survived',        icon: '⚔️', name: 'Survivor',          desc: 'Defeated Dr. Pym in the confrontation.',          secret: false },
    { id: 'speed_run',       icon: '⚡', name: 'Lightning Justice', desc: 'Solved the case in under 12 minutes.',            secret: true  },
    { id: 'evidence_master', icon: '💥', name: 'Evidence Master',   desc: 'Used 5 or more evidence attacks in the final battle.',         secret: true  },
    { id: 'garden_visit',    icon: '🌧️', name: 'Into the Storm',    desc: 'Braved the garden in the storm.',                 secret: false },
    { id: 'all_clues',       icon: '🏆', name: 'Meticulous',        desc: 'Found every single clue, including all red herrings.',         secret: true  }
  ],

  // ─── HINTS ────────────────────────────────
  hints: [
    "The cause of death is unusual for a heart attack. Examine the body carefully, and check the medical reference in the library.",
    "Someone went to considerable trouble to dispose of evidence in the garden. Check every corner of the estate — including outside.",
    "Lord Ashcroft was planning to confront someone about missing money on the very night he died. His diary, his notes, and the bank correspondence tell a connected story. The person who had the most to lose was the person who poured his brandy."
  ],

  // ─── ACCUSATION OUTCOMES ──────────────────
  wrongAccusations: {
    eleanor: "Lady Eleanor stares at you with cold fury. 'How dare you.' She has an alibi — Miss Vane confirms she was on the landing at nine-thirty, far from the study. She had no means, and her motive was weaker than it appeared. Dr. Pym, watching from across the room, allows himself a very small smile. He thinks he has won.",
    cecily:  "Miss Vane looks at you with heartbreak, not anger. 'I loved him,' she says quietly. 'I would never.' Her grief is genuine, her alibi solid, and she had no knowledge of the will. Dr. Pym watches your failure with carefully concealed relief.",
    graves:  "Captain Graves doesn't argue. 'Wrong man,' he says simply. He has a full alibi in the dining room, witnessed by Mrs. Thorne until eight-fifteen. His motive was real but his debt was manageable. Pym is already beginning to pack his bags.",
    thorne:  "Mrs. Thorne looks offended rather than afraid. 'I was in that garden to save my herb frames, Inspector, not to commit murder.' She has no medical knowledge sufficient to administer the poison precisely, and her movements that evening are entirely accounted for. The killer slips away.",
    finch:   "Finch regards you with quiet dignity. 'I have served this family for thirty-five years, Inspector. I came to you.' He is right. He was the one who raised the alarm, who gave you the key witness account about the brandy. You have made a catastrophic error."
  },

  // ─── COMBAT DATA ──────────────────────────
  combat: {
    player: { maxHP: 100 },
    enemy: {
      name: 'Dr. Reginald Pym',
      emoji: '🩺',
      maxHP: 80,
      attacks: [
        { id: 'syringe',    name: 'Syringe Thrust',    icon: '💉', desc: 'He lunges with a loaded syringe!', damage: [22, 32], flavor: 'A physician\'s hands — steady, precise, murderous.' },
        { id: 'choke',      name: 'Choke Hold',        icon: '🤛', desc: 'He grabs your throat from behind!', damage: [14, 20], flavor: 'He is stronger than he looks.' },
        { id: 'glass',      name: 'Broken Decanter',   icon: '🔪', desc: 'He smashes the brandy decanter!', damage: [12, 18], flavor: 'The brandy splatters. The irony is not lost on you.' },
        { id: 'intimidate', name: 'Psychological Trap', icon: '🧠', desc: 'He tries to confuse and disorient you.', damage: [0, 0], debuff: 'intimidate', flavor: '"You have no real proof. A clever solicitor will have you laughed out of court."' },
        { id: 'desperate',  name: 'Desperate Injection', icon: '☠️', desc: 'He tries to inject you with remaining aconitine!', damage: [30, 40], flavor: 'Desperation makes him savage.', desperateOnly: true }
      ]
    },
    evidenceAttacks: {
      body_exam:        { name: 'Body Evidence',    icon: '⚰️', desc: 'The blue lips. The tetanic hand.', damage: [18, 25] },
      brandy_glass:     { name: 'The Brandy Glass', icon: '🥃', desc: 'The residue. The fingerprint.', damage: [20, 28] },
      rp_notation:      { name: 'Victor\'s Note',   icon: '📝', desc: '"R.P. — accounts — CONFRONT."', damage: [22, 30] },
      diary:            { name: 'The Diary',        icon: '📖', desc: 'Three entries. Every word damns him.', damage: [25, 34] },
      medical_bag_vial: { name: 'The Missing Vial', icon: '💼', desc: 'Eleven vials. One empty slot. Ac. Nap. Solution.', damage: [28, 36] },
      bank_letter:      { name: 'Bank Records',     icon: '🏦', desc: '£12,000 to his private account.', damage: [30, 38] },
      pym_notes:        { name: 'His Own Notes',    icon: '✍️', desc: '"Must resolve before Sat." You resolved it yourself, Doctor.', damage: [27, 35] },
      aconitine_vial:   { name: 'The Murder Weapon', icon: '⚗️', desc: 'The vial. His name. The garden mud.', damage: [32, 40] },
      muddy_prints:     { name: 'Muddy Footprints', icon: '👣', desc: 'The prints from the garden to his door.', damage: [20, 26] },
      monkshood_disturbed: { name: 'The Monkshood Bed', icon: '🌸', desc: 'Someone harvested this plant tonight.', damage: [18, 24] }
    }
  }
};
