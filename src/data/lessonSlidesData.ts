import { LessonSlide } from '../types';

export const INITIAL_LESSON_SLIDES: Record<number, LessonSlide[]> = {
  // --- UNIT 0: The Big 3 Milestones ---
  0: [
    {
      id: 'u0-s1',
      title: 'Harriet Tubman & Freedom Train',
      conceptEn: 'The Underground Railroad was a secret network of brave helpers, safe houses, and hidden trails that led escaped enslaved people to freedom in the North.',
      imageEmoji: '🛤️',
      graphicType: 'compare',
      details: {
        highlight: 'Harriet Tubman: "Moses of Her People"',
        points: [
          'Harriet Tubman made 19 dangerous rescue trips back to the South.',
          'She never lost a single passenger on the journey to freedom!',
          'Freedom seekers traveled by night, guided by the North Star.'
        ],
        chartItems: [
          { label: 'Secret Network', value: 'Underground RR', color: 'bg-emerald-500', icon: '🛤️' },
          { label: 'Heroic Conductor', value: 'Harriet Tubman', color: 'bg-amber-500', icon: '🏮' },
          { label: 'Destination', value: 'Free North & Canada', color: 'bg-blue-500', icon: '⭐' }
        ]
      }
    },
    {
      id: 'u0-s2',
      title: 'January 1, 1863: Freedom Proclamation',
      conceptEn: 'President Abraham Lincoln issued the Emancipation Proclamation, declaring all enslaved people in Confederate states forever free!',
      imageEmoji: '📜',
      graphicType: 'interactive-card',
      details: {
        highlight: 'A Document That Reshaped History',
        points: [
          'Officially signed on New Year\'s Day: January 1, 1863.',
          'Transformed the Civil War into a moral crusade to abolish human slavery.',
          'Authorized African American men to enlist as soldiers in the Union military.'
        ],
        interactiveTask: {
          instruction: 'On what date did President Lincoln issue the Emancipation Proclamation?',
          options: [
            { text: 'January 1, 1863', isCorrect: true, feedback: 'Correct! Signed on New Year\'s Day!' },
            { text: 'July 4, 1776', isCorrect: false, feedback: 'That was the Declaration of Independence.' },
            { text: 'December 25, 1860', isCorrect: false, feedback: 'Close, but it was signed on January 1, 1863.' }
          ]
        }
      }
    },
    {
      id: 'u0-s3',
      title: 'Appomattox: The War Ends in Peace',
      conceptEn: 'On April 9, 1865, Confederate General Robert E. Lee surrendered to Union General Ulysses S. Grant at Appomattox Court House, Virginia.',
      imageEmoji: '🤝',
      graphicType: 'timeline',
      details: {
        highlight: 'Treated with Dignity and Honor',
        points: [
          'Grant allowed Southern soldiers to keep their horses to plow family fields.',
          'Grant ordered Union troops not to mock or boast: "The rebels are our countrymen again."',
          'The Union was saved and slavery was defeated once and for all.'
        ],
        chartItems: [
          { label: 'Location', value: 'Appomattox, Virginia', color: 'bg-indigo-500', icon: '🏛️' },
          { label: 'Date', value: 'April 9, 1865', color: 'bg-emerald-600', icon: '📅' },
          { label: 'Outcome', value: 'One Reunited Nation', color: 'bg-amber-500', icon: '🇺🇸' }
        ]
      }
    }
  ],

  // --- UNIT 1: Slavery and the Life of the Enslaved ---
  1: [
    {
      id: 'u1-s1',
      title: 'Plantations & Cash Crops',
      conceptEn: 'Enslaved people were forced to labor on giant southern farms called plantations, growing cotton and tobacco from sunrise to sunset.',
      imageEmoji: '🌱',
      graphicType: 'compare',
      details: {
        highlight: 'The Reign of "King Cotton"',
        points: [
          'Cotton and tobacco were the most lucrative Southern cash crops.',
          'The invention of the cotton gin caused plantation owners to demand even more slave labor.',
          'Families were cruelly torn apart and separated by slave auctions.'
        ],
        chartItems: [
          { label: 'Top Crop #1', value: 'Cotton', color: 'bg-amber-400', icon: '☁️' },
          { label: 'Top Crop #2', value: 'Tobacco', color: 'bg-emerald-600', icon: '🌿' },
          { label: 'Workplace', value: 'Plantations', color: 'bg-blue-500', icon: '🏡' }
        ]
      }
    },
    {
      id: 'u1-s2',
      title: 'Spirituals & Secret Codes',
      conceptEn: 'Enslaved people sang spiritual songs and told stories to keep their spirits alive and share secret escape routes.',
      imageEmoji: '🎶',
      graphicType: 'interactive-card',
      details: {
        highlight: '"Swing Low, Sweet Chariot"',
        points: [
          'Music provided inner strength, community unity, and unwavering faith.',
          'Songs like "Follow the Drinking Gourd" taught travelers to follow the Big Dipper constellation toward the free North.',
          'Oral storytelling passed wisdom and hope across generations.'
        ],
        interactiveTask: {
          instruction: 'How did enslaved people preserve hope and spirit despite harsh conditions?',
          options: [
            { text: 'Through spiritual songs, storytelling, and family bonds', isCorrect: true, feedback: 'Wonderful! Music, faith, and family were their greatest strength.' },
            { text: 'By watching movies at the cinema', isCorrect: false, feedback: 'Movie theaters did not exist in the 19th century.' },
            { text: 'By booking airplane vacations', isCorrect: false, feedback: 'No! They had no freedom and airplanes had not been invented.' }
          ]
        }
      }
    }
  ],

  // --- UNIT 2: The Missouri Compromise (1820) ---
  2: [
    {
      id: 'u2-s1',
      title: 'The Balance of 1820',
      conceptEn: 'In 1820, Congress made the Missouri Compromise: Missouri entered as a slave state and Maine as a free state to keep the balance equal.',
      imageEmoji: '⚖️',
      graphicType: 'compare',
      details: {
        highlight: 'Equal Balance: 12 vs 12 States',
        points: [
          'Neither North nor South wanted the opposing side to hold more Senate votes.',
          'Maine separated from Massachusetts to become an admitted free state.',
          'The agreement maintained peace between both sections for nearly 30 years.'
        ],
        chartItems: [
          { label: 'Free State', value: 'Maine', color: 'bg-blue-500', icon: '❄️' },
          { label: 'Slave State', value: 'Missouri', color: 'bg-red-500', icon: '☀️' },
          { label: 'Year Passed', value: '1820', color: 'bg-amber-500', icon: '⚖️' }
        ]
      }
    },
    {
      id: 'u2-s2',
      title: 'The 36°30\' Latitude Line',
      conceptEn: 'Congress drew a line across Louisiana territory at 36°30\' latitude. North was forever free; south allowed slavery.',
      imageEmoji: '📐',
      graphicType: 'interactive-card',
      details: {
        highlight: 'A Dividing Line Across the Map',
        points: [
          'North of the 36°30\' line: Permanently declared Free Soil!',
          'South of the line: Slavery was permitted in new territories.',
          'Thomas Jefferson warned this line was a firebell in the night signaling future trouble.'
        ],
        interactiveTask: {
          instruction: 'What was decided for the territories NORTH of the 36°30\' line?',
          options: [
            { text: 'Slavery was forever banned (Free Soil)', isCorrect: true, feedback: 'Correct! The northern territory was protected as free soil.' },
            { text: 'Slavery was permitted everywhere', isCorrect: false, feedback: 'Incorrect. North of 36°30\' was legally declared free soil.' }
          ]
        }
      }
    }
  ],

  // --- UNIT 3: Growth of Antislavery Feeling ---
  3: [
    {
      id: 'u3-s1',
      title: 'Brave Abolitionists',
      conceptEn: 'Abolitionists were brave men and women who fought to end slavery immediately and completely.',
      imageEmoji: '📢',
      graphicType: 'compare',
      details: {
        highlight: 'Courageous Voices for Liberty',
        points: [
          'They published influential newspapers such as "The Liberator".',
          'They traveled across the country arguing that freedom is an inalienable right for every person.',
          'They sheltered escaping refugees on the Underground Railroad.'
        ],
        chartItems: [
          { label: 'Mission', value: 'Abolish Slavery', color: 'bg-violet-600', icon: '🕊️' },
          { label: 'Platform', value: 'Speeches & Press', color: 'bg-emerald-600', icon: '📰' },
          { label: 'Core Weapon', value: 'Truth & Conviction', color: 'bg-amber-500', icon: '🗣️' }
        ]
      }
    },
    {
      id: 'u3-s2',
      title: 'Frederick Douglass & Harriet Beecher Stowe',
      conceptEn: 'Frederick Douglass escaped slavery to become a brilliant speaker, and Harriet Beecher Stowe wrote the novel Uncle Tom\'s Cabin.',
      imageEmoji: '📖',
      graphicType: 'interactive-card',
      details: {
        highlight: 'Words That Awakened the World',
        points: [
          'Douglass taught himself to read and write, later advising President Lincoln.',
          'The book "Uncle Tom\'s Cabin" (1852) touched the conscience of millions across America.',
          'It revealed the tragic, unjust cruelty of slavery to readers worldwide.'
        ],
        interactiveTask: {
          instruction: 'What was the famous antislavery book written by Harriet Beecher Stowe?',
          options: [
            { text: 'Uncle Tom\'s Cabin', isCorrect: true, feedback: 'Excellent! It was the biggest best-seller of the era.' },
            { text: 'The Little Prince', isCorrect: false, feedback: 'That is a wonderful classic, but not about the Civil War!' }
          ]
        }
      }
    }
  ],

  // --- UNIT 4: Growing Apart (North vs South) ---
  4: [
    {
      id: 'u4-s1',
      title: 'Two Different Worlds (1850s)',
      conceptEn: 'The North had busy factories, railroads, and cities. The South was agricultural, relying on plantations and enslaved labor.',
      imageEmoji: '🏭',
      graphicType: 'compare',
      details: {
        highlight: 'Industry vs. Agriculture',
        points: [
          'North: Built over 90% of America\'s factories, machinery, and railroad tracks.',
          'South: Produced 75% of the entire world\'s cotton on agricultural plantations.',
          'Southern leaders began threatening secession (leaving the United States).'
        ],
        chartItems: [
          { label: 'North', value: 'Factories & Rails', color: 'bg-blue-600', icon: '🏭' },
          { label: 'South', value: 'Cotton Plantations', color: 'bg-emerald-600', icon: '🌾' },
          { label: 'Conflict', value: 'Secession Threat', color: 'bg-rose-500', icon: '⚡' }
        ]
      }
    }
  ],

  // --- UNIT 5: A House Divided ---
  5: [
    {
      id: 'u5-s1',
      title: 'Lincoln\'s Famous Prophecy',
      conceptEn: 'Abraham Lincoln gave his famous speech: "A house divided against itself cannot stand. This nation cannot endure permanently half slave and half free."',
      imageEmoji: '🏛️',
      graphicType: 'compare',
      details: {
        highlight: 'The Union Must Endure',
        points: [
          'Lincoln joined the newly formed Republican Party in the 1850s.',
          'Republicans aimed to halt the expansion of slavery into western territories.',
          'Lincoln was steadfast in defending the perpetuity of the American Union.'
        ],
        chartItems: [
          { label: 'Speech', value: 'A House Divided', color: 'bg-amber-600', icon: '🗣️' },
          { label: 'Core Message', value: 'We Cannot Stay Divided', color: 'bg-blue-600', icon: '🇺🇸' },
          { label: 'Party', value: 'Republican (1854)', color: 'bg-emerald-600', icon: '🐘' }
        ]
      }
    }
  ]
};
