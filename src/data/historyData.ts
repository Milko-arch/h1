import { Question, Unit, World, UserProgress } from '../types';
import { INITIAL_LESSON_SLIDES } from './lessonSlidesData';

export const ALL_QUESTIONS: Question[] = [
  // --- INTRO / KEY MILESTONES (1 - 3) ---
  {
    id: 1,
    questionNumber: 1,
    unitId: 0,
    category: "The Secret Pathway",
    question: "What was the name of the secret network that Harriet Tubman used to lead enslaved people to freedom?",
    questionEs: "¿Cómo se llamaba la red secreta que Harriet Tubman usó para guiar a las personas esclavizadas a la libertad?",
    options: [
      "The Underground Railroad",
      "The Freedom Express",
      "The Liberty Highway",
      "The North Star Tunnel"
    ],
    correctIndex: 0,
    explanation: "The Underground Railroad was not a real railroad with tracks! It was a secret network of brave people, safe houses, and hidden paths that guided escaped slaves north to freedom.",
    funFact: "Harriet Tubman made 19 dangerous trips back to the South and never lost a single passenger!",
    audioText: "What was the name of the secret network that Harriet Tubman used to lead enslaved people to freedom? The answer is The Underground Railroad."
  },
  {
    id: 2,
    questionNumber: 2,
    unitId: 0,
    category: "Presidential Order",
    question: "What famous document did President Abraham Lincoln issue on January 1, 1863, that declared all enslaved people in Confederate states free?",
    questionEs: "¿Qué famoso documento emitió Abraham Lincoln el 1 de enero de 1863 declarando libres a los esclavos en los estados confederados?",
    options: [
      "The Declaration of Independence",
      "The Emancipation Proclamation",
      "The Bill of Rights",
      "The Gettysburg Address"
    ],
    correctIndex: 1,
    explanation: "The Emancipation Proclamation declared that all enslaved people in Confederate states in rebellion were forever free and allowed Black men to enlist in the Union military.",
    funFact: "Lincoln said: 'If my name ever goes into history, it will be for this act, and my whole soul is in it.'",
    audioText: "What famous document did President Abraham Lincoln issue on January 1, 1863? The Emancipation Proclamation."
  },
  {
    id: 3,
    questionNumber: 3,
    unitId: 0,
    category: "The Surrender",
    question: "Where did General Robert E. Lee surrender to General Ulysses S. Grant, effectively ending the Civil War?",
    questionEs: "¿Dónde se rindió el general Robert E. Lee ante el general Ulysses S. Grant, terminando la Guerra Civil?",
    options: [
      "Appomattox Court House",
      "Fort Sumter",
      "Gettysburg Battlefield",
      "Washington, D.C."
    ],
    correctIndex: 0,
    explanation: "On April 9, 1865, Confederate General Robert E. Lee surrendered his army to Union General Ulysses S. Grant inside a private home at Appomattox Court House in Virginia.",
    funFact: "Grant was very generous: he allowed Confederate soldiers to keep their horses and mules to plant spring crops!",
    audioText: "Where did General Robert E. Lee surrender to General Ulysses S. Grant? Appomattox Court House."
  },

  // --- UNIT 1: SLAVERY AND THE LIFE OF THE ENSLAVED (4 - 6) ---
  {
    id: 4,
    questionNumber: 4,
    unitId: 1,
    category: "Slavery & Life",
    question: "What were the large farms in the South called where enslaved people worked?",
    questionEs: "¿Cómo se llamaban las grandes granjas del Sur donde trabajaban las personas esclavizadas?",
    options: [
      "Ranches",
      "Plantations",
      "Homesteads",
      "Haciendas"
    ],
    correctIndex: 1,
    explanation: "Plantations were massive agricultural estates in the South dedicated to growing cash crops, relying entirely on the forced, unpaid labor of enslaved people.",
    funFact: "Enslaved workers were forced to labor from sunrise until long after sunset in harsh heat.",
    audioText: "What were the large farms in the South called where enslaved people worked? Plantations."
  },
  {
    id: 5,
    questionNumber: 5,
    unitId: 1,
    category: "Slavery & Life",
    question: "Name two cash crops that enslaved people were forced to grow on Southern plantations.",
    questionEs: "Nombra dos cultivos comerciales que los esclavos eran forzados a cosechar en el Sur.",
    options: [
      "Cotton and Tobacco",
      "Corn and Wheat",
      "Apples and Potatoes",
      "Coffee and Cocoa"
    ],
    correctIndex: 0,
    explanation: "Cotton and tobacco were the most profitable Southern cash crops. Cotton was so valuable it was famously called 'King Cotton'!",
    funFact: "Eli Whitney's cotton gin made cotton processing faster, which tragically caused plantation owners to demand even more enslaved laborers.",
    audioText: "Name two cash crops that enslaved people were forced to grow on Southern plantations. Cotton and Tobacco."
  },
  {
    id: 6,
    questionNumber: 6,
    unitId: 1,
    category: "Slavery & Life",
    question: "How did enslaved people keep their spirits alive despite their terrible conditions?",
    questionEs: "¿Cómo mantenían su espíritu vivo las personas esclavizadas a pesar de sus terribles condiciones?",
    options: [
      "By playing board games with plantation owners",
      "Through music, spiritual songs, storytelling, and family bonds",
      "By watching television after work",
      "By taking annual vacations up north"
    ],
    correctIndex: 1,
    explanation: "Enslaved people preserved their humanity and courage through deep religious faith, singing spirituals (like 'Swing Low, Sweet Chariot'), storytelling, and secret community gatherings.",
    funFact: "Some spiritual songs contained hidden secret codes with directions on how to escape northward!",
    audioText: "How did enslaved people keep their spirits alive? Through music, spiritual songs, storytelling, and family bonds."
  },

  // --- UNIT 2: THE MISSOURI COMPROMISE (7 - 9) ---
  {
    id: 7,
    questionNumber: 7,
    unitId: 2,
    category: "The Missouri Compromise",
    question: "In what year was the Missouri Compromise made?",
    questionEs: "¿En qué año se firmó el Compromiso de Misuri?",
    options: [
      "1776",
      "1820",
      "1861",
      "1865"
    ],
    correctIndex: 1,
    explanation: "The Missouri Compromise was passed in 1820 by the U.S. Congress to keep an equal balance of power between slave states and free states.",
    funFact: "It kept the peace between the North and South for about 30 years before tensions erupted again!",
    audioText: "In what year was the Missouri Compromise made? The year eighteen twenty."
  },
  {
    id: 8,
    questionNumber: 8,
    unitId: 2,
    category: "The Missouri Compromise",
    question: "Which state entered the Union as a slave state, and which entered as a free state under this compromise?",
    questionEs: "¿Qué estado entró como estado esclavista y cuál como estado libre bajo este compromiso?",
    options: [
      "Missouri as a slave state, and Maine as a free state",
      "Texas as a slave state, and California as a free state",
      "Florida as a slave state, and New York as a free state",
      "Georgia as a slave state, and Ohio as a free state"
    ],
    correctIndex: 0,
    explanation: "To keep the balance in the Senate equal at 12 free states and 12 slave states, Missouri joined as a slave state and Maine was admitted as a free state.",
    funFact: "Before this, Maine was actually part of Massachusetts!",
    audioText: "Which states entered the Union? Missouri as a slave state, and Maine as a free state."
  },
  {
    id: 9,
    questionNumber: 9,
    unitId: 2,
    category: "The Missouri Compromise",
    question: "What did the Missouri Compromise decide about the Louisiana Purchase territory?",
    questionEs: "¿Qué decidió el Compromiso de Misuri sobre el territorio de la Compra de Luisiana?",
    options: [
      "It banned slavery north of the 36°30' parallel (latitude line)",
      "It allowed slavery anywhere in the United States",
      "It sold the entire territory back to France",
      "It forbade all westward travel"
    ],
    correctIndex: 0,
    explanation: "Congress drew an imaginary line at latitude 36°30' across the Louisiana Purchase. Slavery was forbidden in territories north of this line, while slavery was permitted south of it.",
    funFact: "Thomas Jefferson called this compromise 'a fire bell in the night' warning of future danger.",
    audioText: "What did the Missouri Compromise decide? It banned slavery north of the 36 degrees 30 minutes parallel."
  },

  // --- UNIT 3: GROWTH OF ANTISLAVERY FEELING (10 - 12) ---
  {
    id: 10,
    questionNumber: 10,
    unitId: 3,
    category: "Antislavery Movement",
    question: "What were abolitionists?",
    questionEs: "¿Quiénes eran los abolicionistas?",
    options: [
      "People who wanted to abolish (completely end) slavery",
      "Soldiers who defended plantation farms",
      "Traders who bought raw cotton",
      "Politicians who wanted to divide the country"
    ],
    correctIndex: 0,
    explanation: "Abolitionists were brave men and women—both Black and White—who believed slavery was a moral sin and worked passionately to end it immediately.",
    funFact: "Abolitionists gave speeches, published newspapers like 'The Liberator', and hid freedom seekers.",
    audioText: "What were abolitionists? People who wanted to abolish, or completely end, slavery."
  },
  {
    id: 11,
    questionNumber: 11,
    unitId: 3,
    category: "Antislavery Movement",
    question: "Who was the formerly enslaved man who became a powerful speaker and writer against slavery?",
    questionEs: "¿Quién fue el hombre que escapó de la esclavitud y se convirtió en un poderoso orador y escritor?",
    options: [
      "Frederick Douglass",
      "Jefferson Davis",
      "Robert E. Lee",
      "Andrew Jackson"
    ],
    correctIndex: 0,
    explanation: "Frederick Douglass escaped slavery in Maryland, learned to read, wrote best-selling autobiographies, and became one of the greatest speakers in American history.",
    funFact: "Douglass advised President Lincoln during the Civil War to recruit Black soldiers.",
    audioText: "Who was the formerly enslaved man who became a powerful speaker and writer? Frederick Douglass."
  },
  {
    id: 12,
    questionNumber: 12,
    unitId: 3,
    category: "Antislavery Movement",
    question: "What was the name of the famous book written by Harriet Beecher Stowe?",
    questionEs: "¿Cómo se llamaba el famoso libro escrito por Harriet Beecher Stowe?",
    options: [
      "Uncle Tom's Cabin",
      "Common Sense",
      "The Red Badge of Courage",
      "Little Women"
    ],
    correctIndex: 0,
    explanation: "Published in 1852, 'Uncle Tom's Cabin' opened the eyes of millions of Northerners to the terrible cruelties of slavery and sparked outrage.",
    funFact: "When President Lincoln met Harriet Beecher Stowe, he reportedly joked: 'So you're the little woman who wrote the book that made this great war!'",
    audioText: "What was the name of the famous book written by Harriet Beecher Stowe? Uncle Tom's Cabin."
  },

  // --- UNIT 4: GROWING APART (NORTH VS. SOUTH) (13 - 15) ---
  {
    id: 13,
    questionNumber: 13,
    unitId: 4,
    category: "Growing Apart",
    question: "What was the North like economically in the 1850s?",
    questionEs: "¿Cómo era la economía del Norte en la década de 1850?",
    options: [
      "Industrial economy with busy factories, railroads, and growing cities",
      "Only rural farmland with no machines",
      "Completely dependent on cotton exports",
      "A desert without roads or schools"
    ],
    correctIndex: 0,
    explanation: "The Northern states were heavily industrialized, filled with textile mills, iron foundries, thousands of miles of railroads, and bustling cities.",
    funFact: "By 1860, the North manufactured over 90% of the nation's weapons and goods!",
    audioText: "What was the North like economically in the 1850s? An industrial economy with busy factories, railroads, and growing cities."
  },
  {
    id: 14,
    questionNumber: 14,
    unitId: 4,
    category: "Growing Apart",
    question: "What was the South like economically in the 1850s?",
    questionEs: "¿Cómo era la economía del Sur en la década de 1850?",
    options: [
      "Agricultural economy based on large plantations and enslaved labor",
      "A high-tech center with railway networks everywhere",
      "Dependent solely on ship manufacturing",
      "Based exclusively on gold mining"
    ],
    correctIndex: 0,
    explanation: "The Southern economy relied almost entirely on agriculture—especially cotton, tobacco, and sugar—grown on plantations using enslaved labor.",
    funFact: "The South produced 75% of the world's cotton supply at that time.",
    audioText: "What was the South like economically in the 1850s? An agricultural economy based on large plantations and enslaved labor."
  },
  {
    id: 15,
    questionNumber: 15,
    unitId: 4,
    category: "Growing Apart",
    question: "What did the Southern states start talking about when they felt the North was trying to destroy their way of life?",
    questionEs: "¿De qué comenzaron a hablar los estados del Sur cuando sintieron que el Norte amenazaba su estilo de vida?",
    options: [
      "Secession (breaking away and leaving the United States)",
      "Moving to Canada",
      "Giving all power to the federal government",
      "Inviting Britain to rule them again"
    ],
    correctIndex: 0,
    explanation: "Southern political leaders argued for 'states' rights' and began threatening secession—withdrawing their states from the United States Union.",
    funFact: "'Secede' comes from a Latin word meaning 'to withdraw or go apart'.",
    audioText: "What did Southern states talk about? Secession, which means breaking away and leaving the United States."
  },

  // --- UNIT 5: A HOUSE DIVIDED (16 - 18) ---
  {
    id: 16,
    questionNumber: 16,
    unitId: 5,
    category: "A House Divided",
    question: "Who gave the famous 'A house divided against itself cannot stand' speech?",
    questionEs: "¿Quién pronunció el famoso discurso 'Una casa dividida contra sí misma no puede sostenerse'?",
    options: [
      "Abraham Lincoln",
      "George Washington",
      "Thomas Jefferson",
      "Ulysses S. Grant"
    ],
    correctIndex: 0,
    explanation: "Abraham Lincoln delivered this famous speech in Springfield, Illinois in 1858 when accepting the Republican nomination for U.S. Senator.",
    funFact: "Lincoln was quoting a famous proverb from the Bible to explain why America couldn't stay half-slave and half-free.",
    audioText: "Who gave the famous 'A house divided against itself cannot stand' speech? Abraham Lincoln."
  },
  {
    id: 17,
    questionNumber: 17,
    unitId: 5,
    category: "A House Divided",
    question: "What did Lincoln mean by 'a house divided against itself cannot stand'?",
    questionEs: "¿Qué quiso decir Lincoln con 'una casa dividida contra sí misma no puede mantenerse'?",
    options: [
      "The nation could not permanently survive half slave and half free",
      "Wood was not strong enough to build tall houses",
      "The Capitol building needed a new roof",
      "Every family should live in separate houses"
    ],
    correctIndex: 0,
    explanation: "Lincoln argued that the United States could not stay permanently divided between slave states and free states; eventually, it would become all one thing or all the other.",
    funFact: "He said: 'I do not expect the Union to be dissolved—I do not expect the house to fall—but I do expect it will cease to be divided.'",
    audioText: "What did Lincoln mean? That the nation could not permanently survive half slave and half free."
  },
  {
    id: 18,
    questionNumber: 18,
    unitId: 5,
    category: "A House Divided",
    question: "Which new political party was Lincoln a part of, and what did it stand for?",
    questionEs: "¿De qué nuevo partido político formaba parte Lincoln y qué defendía?",
    options: [
      "The Republican Party; it opposed the expansion of slavery into new territories",
      "The Whig Party; it wanted to end all international trade",
      "The Federalist Party; it wanted a British king",
      "The Liberty Party; it wanted to buy more land from Spain"
    ],
    correctIndex: 0,
    explanation: "The Republican Party was founded in the 1850s by anti-slavery activists. Its main goal was to stop slavery from spreading into western territories.",
    funFact: "Lincoln became the first Republican President of the United States!",
    audioText: "Which new political party was Lincoln a part of? The Republican Party, which opposed the expansion of slavery into new territories."
  },

  // --- UNIT 6: YOUNG MR. LINCOLN (19 - 21) ---
  {
    id: 19,
    questionNumber: 19,
    unitId: 6,
    category: "Young Lincoln",
    question: "Where did Abraham Lincoln grow up?",
    questionEs: "¿Dónde creció Abraham Lincoln?",
    options: [
      "In a log cabin on the frontier in Kentucky, Indiana, and Illinois",
      "In a wealthy mansion in Boston",
      "On a huge cotton plantation in Virginia",
      "In a seaside town in California"
    ],
    correctIndex: 0,
    explanation: "Lincoln was born in a humble one-room log cabin in Kentucky and grew up on the pioneer frontier in Indiana and later Illinois.",
    funFact: "His nickname 'The Railsplitter' came from his teenage years splitting logs to make wooden fences!",
    audioText: "Where did Abraham Lincoln grow up? In a log cabin on the frontier in Kentucky, Indiana, and Illinois."
  },
  {
    id: 20,
    questionNumber: 20,
    unitId: 6,
    category: "Young Lincoln",
    question: "How did Lincoln mostly learn to read and write?",
    questionEs: "¿Cómo aprendió Lincoln principalmente a leer y escribir?",
    options: [
      "By teaching himself and reading books by firelight",
      "By attending an expensive private academy in London",
      "By using an internet tablet",
      "His parents hired famous university professors"
    ],
    correctIndex: 0,
    explanation: "Lincoln had less than one year of formal schooling in his entire life! He taught himself by walking miles to borrow books and reading them by the light of the fireplace.",
    funFact: "He practiced writing his letters with charcoal on the back of wooden shovels!",
    audioText: "How did Lincoln learn to read and write? By teaching himself and reading books by firelight."
  },
  {
    id: 21,
    questionNumber: 21,
    unitId: 6,
    category: "Young Lincoln",
    question: "What jobs did Lincoln have before becoming a lawyer?",
    questionEs: "¿Qué trabajos tuvo Lincoln antes de convertirse en abogado?",
    options: [
      "Store clerk, postmaster, surveyor, and rail-splitter",
      "Ship captain and sea explorer",
      "Bank president and railroad owner",
      "King's bodyguard and painter"
    ],
    correctIndex: 0,
    explanation: "Lincoln worked as a frontier storekeeper, postmaster of New Salem, county land surveyor, flatboat operator, and rail-splitter before studying law.",
    funFact: "As a storekeeper, he was so honest that if he accidentally overcharged a customer by a few pennies, he would walk miles to return the change—earning him the nickname 'Honest Abe'!",
    audioText: "What jobs did Lincoln have before becoming a lawyer? Store clerk, postmaster, surveyor, and rail-splitter."
  },

  // --- UNIT 7: THE CRISIS DEEPENS (22 - 24) ---
  {
    id: 22,
    questionNumber: 22,
    unitId: 7,
    category: "The Crisis Deepens",
    question: "In what year was Abraham Lincoln elected President?",
    questionEs: "¿En qué año fue elegido presidente Abraham Lincoln?",
    options: [
      "1860",
      "1848",
      "1876",
      "1865"
    ],
    correctIndex: 0,
    explanation: "Lincoln was elected the 16th President of the United States in November 1860 without winning a single Southern state.",
    funFact: "Lincoln was the tallest U.S. President ever, standing 6 feet 4 inches (193 cm) tall—even taller with his top hat!",
    audioText: "In what year was Abraham Lincoln elected President? In the year eighteen sixty."
  },
  {
    id: 23,
    questionNumber: 23,
    unitId: 7,
    category: "The Crisis Deepens",
    question: "Which state was the first to secede from the Union after Lincoln's election?",
    questionEs: "¿Qué estado fue el primero en separarse (secesionarse) de la Unión tras la elección de Lincoln?",
    options: [
      "South Carolina",
      "Virginia",
      "Texas",
      "Georgia"
    ],
    correctIndex: 0,
    explanation: "South Carolina was the very first state to secede on December 20, 1860, just a few weeks after Lincoln won the election.",
    funFact: "Six other Deep South states quickly followed South Carolina within two months.",
    audioText: "Which state was the first to secede from the Union? South Carolina."
  },
  {
    id: 24,
    questionNumber: 24,
    unitId: 7,
    category: "The Crisis Deepens",
    question: "What was the name of the new country that the Southern states formed?",
    questionEs: "¿Cómo se llamó el nuevo país que formaron los estados del Sur?",
    options: [
      "The Confederate States of America (The Confederacy)",
      "The Republic of Dixie",
      "The Southern Allied Nations",
      "The United States of the South"
    ],
    correctIndex: 0,
    explanation: "Eleven Southern states broke away to form the Confederate States of America, electing Jefferson Davis as their president and choosing Richmond, Virginia as their capital.",
    funFact: "Lincoln declared that secession was illegal and that the Union could never be broken.",
    audioText: "What was the name of the new country? The Confederate States of America, or the Confederacy."
  },

  // --- UNIT 8: THE WAR BEGINS (FORT SUMTER) (25 - 27) ---
  {
    id: 25,
    questionNumber: 25,
    unitId: 8,
    category: "Fort Sumter",
    question: "Where was Fort Sumter located?",
    questionEs: "¿Dónde estaba ubicado Fort Sumter?",
    options: [
      "In the harbor of Charleston, South Carolina",
      "Near Richmond, Virginia",
      "In New York Harbor",
      "Outside New Orleans, Louisiana"
    ],
    correctIndex: 0,
    explanation: "Fort Sumter was a federal stone fort located on an island in Charleston Harbor, South Carolina.",
    funFact: "The fort was named after General Thomas Sumter, a hero of the American Revolutionary War.",
    audioText: "Where was Fort Sumter located? In the harbor of Charleston, South Carolina."
  },
  {
    id: 26,
    questionNumber: 26,
    unitId: 8,
    category: "Fort Sumter",
    question: "In what month and year was Fort Sumter fired upon?",
    questionEs: "¿En qué mes y año fue atacado Fort Sumter?",
    options: [
      "April 1861",
      "July 1863",
      "December 1860",
      "January 1865"
    ],
    correctIndex: 0,
    explanation: "On April 12, 1861, Confederate cannons opened fire on Fort Sumter, marking the official beginning of the American Civil War.",
    funFact: "Amazingly, during the 34-hour cannon bombardment, not a single Union soldier was killed!",
    audioText: "In what month and year was Fort Sumter fired upon? April eighteen sixty-one."
  },
  {
    id: 27,
    questionNumber: 27,
    unitId: 8,
    category: "Fort Sumter",
    question: "What did President Lincoln do after Fort Sumter was attacked?",
    questionEs: "¿Qué hizo el presidente Lincoln después del ataque a Fort Sumter?",
    options: [
      "He called for 75,000 volunteer soldiers to defend and preserve the Union",
      "He surrendered immediately to the Confederacy",
      "He resigned from the presidency",
      "He escaped to Canada"
    ],
    correctIndex: 0,
    explanation: "President Lincoln immediately called for 75,000 volunteers to join the Union military for 90 days to put down the rebellion.",
    funFact: "So many enthusiastic men rushed to enlist in the North that states had more volunteers than uniforms!",
    audioText: "What did President Lincoln do after Fort Sumter was attacked? He called for seventy-five thousand volunteer soldiers to defend the Union."
  },

  // --- UNIT 9: ADVANTAGES AND DISADVANTAGES (28 - 30) ---
  {
    id: 28,
    questionNumber: 28,
    unitId: 9,
    category: "Advantages & Disadvantages",
    question: "Name one major advantage the Union (North) had over the Confederacy.",
    questionEs: "Nombra una gran ventaja que tenía la Unión (Norte) sobre la Confederación.",
    options: [
      "A much larger population, more factories, and extensive railroads",
      "Fighting on familiar home territory",
      "More cotton fields to trade with Europe",
      "A warm tropical climate"
    ],
    correctIndex: 0,
    explanation: "The North had 22 million people (vs 9 million in the South), 85% of the nation's factories, and more than twice as many railroad tracks to move troops and supplies.",
    funFact: "The North could manufacture uniforms, rifles, and food cans far faster than the South!",
    audioText: "Name one advantage the Union had over the Confederacy: A much larger population, more factories, and extensive railroads."
  },
  {
    id: 29,
    questionNumber: 29,
    unitId: 9,
    category: "Advantages & Disadvantages",
    question: "Name one major advantage the Confederacy (South) had over the Union.",
    questionEs: "Nombra una gran ventaja que tenía la Confederación (Sur) sobre la Unión.",
    options: [
      "Fighting a defensive war on familiar home territory with talented military generals",
      "A huge navy with iron ships",
      "More gun factories and train tracks",
      "Direct financial support from Canada"
    ],
    correctIndex: 0,
    explanation: "The South fought on home ground they knew well, only needed to defend their land until the North grew tired, and had brilliant commanders like Robert E. Lee and Stonewall Jackson.",
    funFact: "Many Southern soldiers were skilled outdoorsmen who grew up hunting and riding horses.",
    audioText: "Name one advantage the Confederacy had over the Union: Fighting a defensive war on familiar home territory with talented military generals."
  },
  {
    id: 30,
    questionNumber: 30,
    unitId: 9,
    category: "Advantages & Disadvantages",
    question: "What was a major disadvantage for the Confederacy?",
    questionEs: "¿Cuál fue una gran desventaja para la Confederación?",
    options: [
      "Few factories to make weapons, shoes, and limited railroads to move supplies",
      "They had too many soldiers to feed",
      "Their generals had never been to military school",
      "They had no horses"
    ],
    correctIndex: 0,
    explanation: "The Confederacy lacked manufacturing plants, struggled to produce boots and rifles, and had poor rail connections that often broke down.",
    funFact: "Many Confederate soldiers had to march without shoes because shoe factories didn't exist in their territory!",
    audioText: "What was a major disadvantage for the Confederacy? Few factories to make weapons and shoes, and limited railroads to move supplies."
  },

  // --- UNIT 10: A BROTHER'S WAR (31 - 33) ---
  {
    id: 31,
    questionNumber: 31,
    unitId: 10,
    category: "A Brother's War",
    question: "Why was the Civil War called 'A Brother's War'?",
    questionEs: "¿Por qué se le llamó a la Guerra Civil 'La Guerra de Hermanos'?",
    options: [
      "Because family members and close friends often fought on opposite sides against each other",
      "Because only brothers were allowed to join the army",
      "Because two brothers started the fight over a farm",
      "Because generals called each other brothers"
    ],
    correctIndex: 0,
    explanation: "It was called 'A Brother's War' because families were deeply divided. Brothers, cousins, and lifelong friends found themselves wearing different uniforms and shooting at one another.",
    funFact: "Four of Mary Todd Lincoln's (the President's wife) brothers fought for the Confederacy!",
    audioText: "Why was the Civil War called A Brother's War? Because family members and close friends often fought on opposite sides against each other."
  },
  {
    id: 32,
    questionNumber: 32,
    unitId: 10,
    category: "A Brother's War",
    question: "What was the name of the U.S. Military Academy where many generals on both sides had been friends and classmates?",
    questionEs: "¿Cómo se llamaba la academia militar estadounidense donde muchos generales de ambos bandos habían sido amigos y compañeros?",
    options: [
      "West Point",
      "Annapolis Naval Academy",
      "Harvard Military School",
      "The Citadel"
    ],
    correctIndex: 0,
    explanation: "At the United States Military Academy at West Point in New York, commanders like Grant, Lee, Sherman, and 'Stonewall' Jackson were classmates, roomed together, and studied tactics together.",
    funFact: "When the war began, many of these close West Point friends said tearful goodbyes before heading to battle against each other.",
    audioText: "What was the name of the U.S. Military Academy? West Point."
  },
  {
    id: 33,
    questionNumber: 33,
    unitId: 10,
    category: "A Brother's War",
    question: "Why did Robert E. Lee refuse command of the Union army?",
    questionEs: "¿Por qué Robert E. Lee rechazó comandar el ejército de la Unión?",
    options: [
      "He chose to remain loyal to his beloved home state of Virginia",
      "He wanted to retire and become a farmer",
      "He disliked President Lincoln personally",
      "He wanted to lead the British army instead"
    ],
    correctIndex: 0,
    explanation: "Lincoln offered Lee command of the entire Union Army, but Lee said he could never raise his sword against his native state of Virginia when it seceded.",
    funFact: "Lee personally opposed slavery and secession, yet his loyalty to Virginia overrode everything else.",
    audioText: "Why did Robert E. Lee refuse command of the Union army? He chose to remain loyal to his home state of Virginia."
  },

  // --- UNIT 11: DEVELOPING A STRATEGY (34 - 36) ---
  {
    id: 34,
    questionNumber: 34,
    unitId: 11,
    category: "War Strategy",
    question: "What was the Union's three-part war plan called?",
    questionEs: "¿Cómo se llamó el plan de tres partes de la Unión?",
    options: [
      "The Anaconda Plan",
      "The Eagle Strike",
      "Operation Thunderbolt",
      "The Southern Squeeze"
    ],
    correctIndex: 0,
    explanation: "General Winfield Scott designed the 'Anaconda Plan', named after the giant snake that suffocates its prey by coiling tightly around it.",
    funFact: "Newspapers initially mocked the plan as too slow, but it eventually won the war for the North!",
    audioText: "What was the Union's three-part war plan called? The Anaconda Plan."
  },
  {
    id: 35,
    questionNumber: 35,
    unitId: 11,
    category: "War Strategy",
    question: "What did the Anaconda Plan include? (Name two parts)",
    questionEs: "¿Qué incluía el Plan Anaconda? (Nombra dos partes)",
    options: [
      "Blockading Southern ports and capturing the Mississippi River to divide the South",
      "Building a giant wall and buying Mexican territory",
      "Digging tunnels under Virginia and using hot air balloons",
      "Trading weapons with European kings"
    ],
    correctIndex: 0,
    explanation: "The Anaconda Plan had 3 parts: 1) Naval blockade of Southern ports to stop trade, 2) Seize control of the Mississippi River to cut the Confederacy in two, and 3) Capture Richmond, Virginia.",
    funFact: "By controlling the Mississippi, Texas, Arkansas, and Louisiana were completely cut off from the rest of the Confederacy.",
    audioText: "What did the Anaconda Plan include? Blockading Southern ports and taking control of the Mississippi River."
  },
  {
    id: 36,
    questionNumber: 36,
    unitId: 11,
    category: "War Strategy",
    question: "What was the Confederacy's main strategy?",
    questionEs: "¿Cuál era la estrategia principal de la Confederación?",
    options: [
      "Fight a defensive war to wear down the North's will to fight and gain European help",
      "Conquer all northern cities immediately",
      "Build a giant navy to invade New York",
      "Surrender after the first battle"
    ],
    correctIndex: 0,
    explanation: "The South planned to fight defensively on its own turf, inflict heavy casualties on Union forces, and convince Britain or France to recognize them as an independent nation.",
    funFact: "The South hoped 'King Cotton' would force Britain to intervene, but Britain found cotton in India and Egypt instead!",
    audioText: "What was the Confederacy's main strategy? Fight a defensive war to wear down the North's will to fight and gain European support."
  },

  // --- UNIT 12: THE WAR IN THE EAST (37 - 39) ---
  {
    id: 37,
    questionNumber: 37,
    unitId: 12,
    category: "War in the East",
    question: "What was the first major battle of the Civil War called?",
    questionEs: "¿Cómo se llamó la primera gran batalla de la Guerra Civil?",
    options: [
      "First Battle of Bull Run (Manassas)",
      "Battle of Gettysburg",
      "Battle of Shiloh",
      "Battle of Bunker Hill"
    ],
    correctIndex: 0,
    explanation: "Fought in July 1861 in Virginia, the First Battle of Bull Run shocked both sides by showing that the war would be long, bloody, and difficult.",
    funFact: "Northern spectators brought picnic baskets to watch the battle, expecting a quick Union parade, but had to flee in panic when Confederate forces counter-attacked!",
    audioText: "What was the first major battle of the Civil War called? First Battle of Bull Run, also known as Manassas."
  },
  {
    id: 38,
    questionNumber: 38,
    unitId: 12,
    category: "War in the East",
    question: "Which battle was the single bloodiest day in American history, with over 22,000 soldiers killed or wounded?",
    questionEs: "¿Qué batalla fue el día más sangriento en la historia de EE.UU. con más de 22,000 bajas?",
    options: [
      "Battle of Antietam (Sharpsburg)",
      "Battle of Vicksburg",
      "Battle of Fort Sumter",
      "Battle of Atlanta"
    ],
    correctIndex: 0,
    explanation: "Fought on September 17, 1862 in Maryland, the Battle of Antietam resulted in over 22,700 soldiers killed, wounded, or missing in just 12 hours of fighting.",
    funFact: "A Union soldier found Lee's secret battle plans wrapped around three cigars before the fight!",
    audioText: "Which battle was the single bloodiest day in American history? The Battle of Antietam."
  },
  {
    id: 39,
    questionNumber: 39,
    unitId: 12,
    category: "War in the East",
    question: "Which side won the Battle of Antietam?",
    questionEs: "¿Qué bando ganó la Batalla de Antietam?",
    options: [
      "The Union (North)",
      "The Confederacy (South)",
      "Great Britain",
      "It ended in a declared draw with no winner"
    ],
    correctIndex: 0,
    explanation: "Although it was a horrific clash, General Lee's Confederate forces were forced to retreat back to Virginia, giving the Union a strategic and political victory.",
    funFact: "This Union victory gave President Lincoln the confidence to announce the Emancipation Proclamation!",
    audioText: "Which side won the Battle of Antietam? The Union."
  },

  // --- UNIT 13: THE EMANCIPATION PROCLAMATION (40 - 42) ---
  {
    id: 40,
    questionNumber: 40,
    unitId: 13,
    category: "Emancipation",
    question: "On what date did President Lincoln officially issue the Emancipation Proclamation?",
    questionEs: "¿En qué fecha emitió oficialmente el presidente Lincoln la Proclamación de Emancipación?",
    options: [
      "January 1, 1863",
      "July 4, 1861",
      "April 9, 1865",
      "November 19, 1863"
    ],
    correctIndex: 0,
    explanation: "Lincoln signed the historic executive order on New Year's Day, January 1, 1863, transforming the Civil War into a moral crusade against slavery.",
    funFact: "Church bells rang across Northern cities and abolitionists cheered all night as news spread!",
    audioText: "On what date did President Lincoln issue the Emancipation Proclamation? January first, eighteen sixty-three."
  },
  {
    id: 41,
    questionNumber: 41,
    unitId: 13,
    category: "Emancipation",
    question: "What did the Emancipation Proclamation declare?",
    questionEs: "¿Qué declaraba la Proclamación de Emancipación?",
    options: [
      "That all enslaved people in Confederate states in rebellion were forever free",
      "That the war was officially over",
      "That only women were free in America",
      "That the South must pay taxes to Britain"
    ],
    correctIndex: 0,
    explanation: "It declared that all enslaved persons living within Confederate states that had rebelled against the Union 'are, and henceforward shall be free'.",
    funFact: "It made it politically impossible for Britain or France to help the South, because European citizens strongly opposed slavery.",
    audioText: "What did the Emancipation Proclamation declare? That all enslaved people in Confederate states in rebellion were forever free."
  },
  {
    id: 42,
    questionNumber: 42,
    unitId: 13,
    category: "Emancipation",
    question: "What did the Emancipation Proclamation allow African American men to do?",
    questionEs: "¿Qué permitió hacer la Proclamación de Emancipación a los hombres afroamericanos?",
    options: [
      "Enlist and serve as brave soldiers and sailors in the Union military",
      "Run for president immediately",
      "Move to Europe without passports",
      "Buy land in Canada for free"
    ],
    correctIndex: 0,
    explanation: "For the first time, African American men were officially welcomed to enlist in the U.S. Army and Navy, where nearly 200,000 served with extraordinary bravery.",
    funFact: "The famous all-Black 54th Massachusetts Infantry Regiment led a heroic assault on Fort Wagner!",
    audioText: "What did it allow African American men to do? Enlist and serve as soldiers and sailors in the Union military."
  },

  // --- UNIT 14: THE GENERALS (LEE VS. GRANT) (43 - 45) ---
  {
    id: 43,
    questionNumber: 43,
    unitId: 14,
    category: "The Generals",
    question: "Who was the brilliant general who led the Confederate army for most of the war?",
    questionEs: "¿Quién fue el brillante general que lideró el ejército confederado durante la mayor parte de la guerra?",
    options: [
      "General Robert E. Lee",
      "General George McClellan",
      "General Ulysses S. Grant",
      "General William T. Sherman"
    ],
    correctIndex: 0,
    explanation: "Robert E. Lee commanded the Army of Northern Virginia. His tactical mastery won stunning victories against much larger Union armies early in the war.",
    funFact: "Lee's beloved gray horse was named 'Traveller' and became famous throughout the war.",
    audioText: "Who was the brilliant general who led the Confederate army? General Robert E. Lee."
  },
  {
    id: 44,
    questionNumber: 44,
    unitId: 14,
    category: "The Generals",
    question: "Who was the Union general who was tough, determined, and would not give up?",
    questionEs: "¿Quién fue el general de la Unión que era tenaz, decidido y nunca se rendía?",
    options: [
      "General Ulysses S. Grant",
      "General George Custer",
      "General Robert E. Lee",
      "General Stonewall Jackson"
    ],
    correctIndex: 0,
    explanation: "Ulysses S. Grant won crucial victories in the West (Fort Donelson, Shiloh, Vicksburg). In 1864, Lincoln put Grant in charge of all Union armies.",
    funFact: "When critics asked Lincoln to fire Grant, Lincoln replied: 'I cannot spare this man; he fights!'",
    audioText: "Who was the Union general who was tough, determined, and would not give up? General Ulysses S. Grant."
  },
  {
    id: 45,
    questionNumber: 45,
    unitId: 14,
    category: "The Generals",
    question: "What famous quote did General Grant say about his determination to keep fighting?",
    questionEs: "¿Qué famosa frase dijo el general Grant sobre su determinación de seguir luchando?",
    options: [
      "'I propose to fight it out on this line if it takes all summer.'",
      "'Retreat is our best option.'",
      "'Give me liberty or give me death.'",
      "'I have not yet begun to fight.'"
    ],
    correctIndex: 0,
    explanation: "During the bloody Battle of Spotsylvania Court House in 1864, Grant sent this famous message to Washington, showing he would never back down.",
    funFact: "Grant's initials 'U.S.' also earned him the nickname 'Unconditional Surrender' Grant!",
    audioText: "What famous quote did General Grant say? 'I propose to fight it out on this line if it takes all summer.'"
  },

  // --- UNIT 15: JOHNNY REB AND BILLY YANK (46 - 48) ---
  {
    id: 46,
    questionNumber: 46,
    unitId: 15,
    category: "Soldier Life",
    question: "What was the popular nickname for the common Union soldier?",
    questionEs: "¿Cuál era el apodo popular del soldado común de la Unión?",
    options: [
      "Billy Yank",
      "Johnny Reb",
      "Uncle Sam",
      "Doughboy"
    ],
    correctIndex: 0,
    explanation: "Union soldiers were nicknamed 'Billy Yank' (short for Yankee). They fought to preserve the Union and defend the United States flag.",
    funFact: "Most Billy Yanks were young farm boys between the ages of 18 and 25.",
    audioText: "What was the nickname for the common Union soldier? Billy Yank."
  },
  {
    id: 47,
    questionNumber: 47,
    unitId: 15,
    category: "Soldier Life",
    question: "What color uniform did the Union soldier wear?",
    questionEs: "¿De qué color era el uniforme del soldado de la Unión?",
    options: [
      "Blue",
      "Gray",
      "Red",
      "Green"
    ],
    correctIndex: 0,
    explanation: "Union soldiers wore dark blue wool coats and sky-blue trousers, which is why Union forces were often called 'The Boys in Blue'.",
    funFact: "Wool uniforms were very heavy and uncomfortably hot during southern summer battles!",
    audioText: "What color uniform did the Union soldier wear? Blue."
  },
  {
    id: 48,
    questionNumber: 48,
    unitId: 15,
    category: "Soldier Life",
    question: "What was the nickname for the common Confederate soldier?",
    questionEs: "¿Cuál era el apodo popular del soldado común confederado?",
    options: [
      "Johnny Reb",
      "Billy Yank",
      "Tommy Atkins",
      "G.I. Joe"
    ],
    correctIndex: 0,
    explanation: "Confederate soldiers were called 'Johnny Reb' (short for Rebel). They wore gray or yellowish-brown 'butternut' colored uniforms.",
    funFact: "Confederate soldiers were famous for their terrifying high-pitched war cry known as the 'Rebel Yell'!",
    audioText: "What was the nickname for the common Confederate soldier? Johnny Reb."
  },

  // --- UNIT 16: WOMEN AND THE WAR EFFORT (49 - 51) ---
  {
    id: 49,
    questionNumber: 49,
    unitId: 16,
    category: "Women & the War",
    question: "What important job did thousands of women do on the battlefield?",
    questionEs: "¿Qué trabajo importante hicieron miles de mujeres en el campo de batalla?",
    options: [
      "Served as heroic nurses caring for wounded and sick soldiers",
      "Commanded war submarines",
      "Printed Confederate money",
      "Drove train engines"
    ],
    correctIndex: 0,
    explanation: "Thousands of women volunteered as battlefield nurses, cleaning wounds, administering medicine, feeding injured soldiers, and offering comfort.",
    funFact: "Some brave women even disguised themselves as men so they could fight on the front lines!",
    audioText: "What important job did thousands of women do on the battlefield? Served as nurses caring for wounded and sick soldiers."
  },
  {
    id: 50,
    questionNumber: 50,
    unitId: 16,
    category: "Women & the War",
    question: "Who was the famous Union nurse who later founded the American Red Cross?",
    questionEs: "¿Quién fue la famosa enfermera de la Unión que más tarde fundó la Cruz Roja Americana?",
    options: [
      "Clara Barton",
      "Florence Nightingale",
      "Susan B. Anthony",
      "Betsy Ross"
    ],
    correctIndex: 0,
    explanation: "Clara Barton brought medical wagons directly onto dangerous battlefields and earned the nickname 'Angel of the Battlefield'. She later established the American Red Cross in 1881.",
    funFact: "During one battle, a bullet tore right through the sleeve of Clara Barton's dress without injuring her!",
    audioText: "Who was the famous Union nurse who founded the American Red Cross? Clara Barton."
  },
  {
    id: 51,
    questionNumber: 51,
    unitId: 16,
    category: "Women & the War",
    question: "Name two ways women helped the war effort from home.",
    questionEs: "Nombra dos maneras en que las mujeres ayudaron en el esfuerzo de guerra desde el hogar.",
    options: [
      "Sewed uniforms, rolled bandages, sent food, and ran family farms and businesses",
      "Built skyscrapers and paved highways",
      "Invented telephones and airplanes",
      "Wrote peace treaties with European kings"
    ],
    correctIndex: 0,
    explanation: "At home, women sewed blankets and uniforms, raised funds, prepared medical supplies, and stepped up to run farms, shops, and government offices while men were away fighting.",
    funFact: "Women's aid societies in northern towns sent thousands of care packages filled with cookies, socks, and soap to soldiers.",
    audioText: "Name two ways women helped the war effort from home: Sewed uniforms and rolled bandages, and ran family farms and businesses."
  },

  // --- UNIT 17: THE TIDE TURNS (GETTYSBURG AND VICKSBURG) (52 - 54) ---
  {
    id: 52,
    questionNumber: 52,
    unitId: 17,
    category: "The Turning Point",
    question: "What was the turning point battle in the East, where Lee was defeated in a massive three-day battle?",
    questionEs: "¿Cuál fue la batalla decisiva en el Este, donde Lee fue derrotado en una batalla de tres días?",
    options: [
      "Battle of Gettysburg",
      "Battle of Bull Run",
      "Battle of Shiloh",
      "Battle of Fort Sumter"
    ],
    correctIndex: 0,
    explanation: "Fought in Pennsylvania from July 1 to July 3, 1863, the Battle of Gettysburg was the bloodiest battle of the war (51,000 casualties) and stopped Lee's invasion of the North forever.",
    funFact: "Pickett's Charge on the third day was a disastrous Confederate frontal assault across open fields.",
    audioText: "What was the turning point battle in the East? The Battle of Gettysburg."
  },
  {
    id: 53,
    questionNumber: 53,
    unitId: 17,
    category: "The Turning Point",
    question: "What city did General Grant capture that gave the Union total control of the Mississippi River?",
    questionEs: "¿Qué ciudad capturó el general Grant dando a la Unión el control total del río Misisipi?",
    options: [
      "Vicksburg",
      "New Orleans",
      "Atlanta",
      "Savannah"
    ],
    correctIndex: 0,
    explanation: "On July 4, 1863—just one day after Gettysburg—the fortress city of Vicksburg surrendered to Grant after a 47-day siege, splitting the Confederacy in two.",
    funFact: "Because Vicksburg surrendered on July 4th, the city refused to celebrate the 4th of July for over 80 years!",
    audioText: "What city did General Grant capture that gave the Union control of the Mississippi River? Vicksburg."
  },
  {
    id: 54,
    questionNumber: 54,
    unitId: 17,
    category: "The Turning Point",
    question: "What was the name of Lincoln's famous 2-minute speech delivered at the dedication of a soldiers' cemetery?",
    questionEs: "¿Cómo se llamó el famoso discurso de 2 minutos de Lincoln pronunciado en la dedicación del cementerio?",
    options: [
      "The Gettysburg Address",
      "The Emancipation Speech",
      "The Inaugural Oath",
      "The Freedom Proclamation"
    ],
    correctIndex: 0,
    explanation: "On November 19, 1863, Lincoln delivered the Gettysburg Address, opening with 'Four score and seven years ago' and declaring that 'government of the people, by the people, for the people, shall not perish from the earth.'",
    funFact: "Lincoln's speech was only 272 words long and took just over two minutes to deliver!",
    audioText: "What was the name of Lincoln's famous speech? The Gettysburg Address."
  },

  // --- UNIT 18: CONFEDERATE PROBLEMS MOUNT (55 - 57) ---
  {
    id: 55,
    questionNumber: 55,
    unitId: 18,
    category: "Confederate Hardship",
    question: "What was one major problem the Confederacy faced by 1864?",
    questionEs: "¿Cuál fue un gran problema que enfrentó la Confederación para 1864?",
    options: [
      "Severe shortages of food, medicine, and runaway inflation of their money",
      "Too much gold in their banks",
      "An overload of modern factories",
      "Peace treaties with all northern states"
    ],
    correctIndex: 0,
    explanation: "By 1864, Confederate money was nearly worthless, bread riots broke out in Southern cities, and soldiers in the field were starving and shoeless.",
    funFact: "A barrel of flour in Richmond cost over $1,000 in Confederate paper money by the end of the war!",
    audioText: "What was one problem the Confederacy faced by 1864? Severe shortages of food, medicine, and runaway inflation."
  },
  {
    id: 56,
    questionNumber: 56,
    unitId: 18,
    category: "Confederate Hardship",
    question: "Why couldn't the South import medicine, shoes, or weapons from other countries?",
    questionEs: "¿Por qué el Sur no podía importar medicinas, zapatos o armas de otros países?",
    options: [
      "The Union naval blockade patrolled and blocked Southern seaports",
      "All European ships had sunk in storms",
      "Foreign countries banned all sailing ships",
      "The South forgot where the ports were"
    ],
    correctIndex: 0,
    explanation: "The Union Navy established a tight blockade along 3,500 miles of Southern coastline, capturing or turning away ships attempting to trade with the Confederacy.",
    funFact: "Daring Southern sailors called 'Blockade Runners' used sleek steamships to slip past Union gunboats in the dark.",
    audioText: "Why couldn't the South import medicine, shoes, or weapons? The Union naval blockade blocked Southern seaports."
  },
  {
    id: 57,
    questionNumber: 57,
    unitId: 18,
    category: "Confederate Hardship",
    question: "What does 'deserted' mean in military terms?",
    questionEs: "¿Qué significa 'desertar' en términos militares?",
    options: [
      "Illegally abandoning the army without permission with no intention of returning",
      "Cooking dessert for the generals in camp",
      "Marching through a dry sandy desert",
      "Winning a medal of honor"
    ],
    correctIndex: 0,
    explanation: "Desertion means leaving one's post or military duty without permission. Thousands of Confederate soldiers deserted to return home and save their starving families.",
    funFact: "By late 1864, as many as one out of every three Confederate soldiers had deserted the army.",
    audioText: "What does 'deserted' mean? Illegally abandoning the army without permission and not returning."
  },

  // --- UNIT 19: THE WAR DRAWS TO A CLOSE (58 - 60) ---
  {
    id: 58,
    questionNumber: 58,
    unitId: 19,
    category: "War's End",
    question: "Who led the famous Union 'March to the Sea' through the heart of Georgia?",
    questionEs: "¿Quién lideró la famosa 'Marcha hacia el mar' de la Unión a través de Georgia?",
    options: [
      "General William Tecumseh Sherman",
      "General George Meade",
      "General Stonewall Jackson",
      "General Robert E. Lee"
    ],
    correctIndex: 0,
    explanation: "General William Tecumseh Sherman led 60,000 Union troops on a 285-mile march from captured Atlanta to the coastal port of Savannah, Georgia in late 1864.",
    funFact: "Sherman telegraphed President Lincoln on Christmas: 'I beg to present you as a Christmas gift the city of Savannah.'",
    audioText: "Who led the famous March to the Sea through Georgia? General William Tecumseh Sherman."
  },
  {
    id: 59,
    questionNumber: 59,
    unitId: 19,
    category: "War's End",
    question: "What did Sherman's troops do during the March to the Sea?",
    questionEs: "¿Qué hicieron las tropas de Sherman durante la Marcha hacia el mar?",
    options: [
      "Destroyed railroads, bridges, crops, and war supplies ('total war') to crush the South's ability to fight",
      "Built new schools and planted flower gardens",
      "Helped Confederate factories make more wagons",
      "Watched theatrical plays in every town"
    ],
    correctIndex: 0,
    explanation: "Sherman practiced 'total war', burning military supplies, tearing up railroad tracks and heating rails to twist them around tree trunks (nicknamed 'Sherman's neckties').",
    funFact: "Total war targeted the resources and willpower of the Confederacy, convincing them to end the war sooner.",
    audioText: "What did Sherman's troops do? Destroyed railroads, crops, and supplies to crush the Confederacy's ability to fight."
  },
  {
    id: 60,
    questionNumber: 60,
    unitId: 19,
    category: "War's End",
    question: "On what date did General Lee surrender to General Grant at Appomattox Court House?",
    questionEs: "¿En qué fecha se rindió el general Lee ante el general Grant en Appomattox Court House?",
    options: [
      "April 9, 1865",
      "July 4, 1876",
      "January 1, 1863",
      "October 12, 1860"
    ],
    correctIndex: 0,
    explanation: "On Palm Sunday, April 9, 1865, General Robert E. Lee met General Ulysses S. Grant in the parlor of Wilmer McLean's home at Appomattox Court House, Virginia, and signed surrender terms.",
    funFact: "Grant ordered his men not to cheer or fire salute guns, stating: 'The rebels are our countrymen again.'",
    audioText: "On what date did General Lee surrender to General Grant? April ninth, eighteen sixty-five."
  },

  // --- UNIT 20: THE DEATH OF PRESIDENT LINCOLN (61 - 63) ---
  {
    id: 61,
    questionNumber: 61,
    unitId: 20,
    category: "Lincoln's Assassination",
    question: "On what date was President Abraham Lincoln assassinated?",
    questionEs: "¿En qué fecha fue asesinado el presidente Abraham Lincoln?",
    options: [
      "April 14, 1865 (Good Friday)",
      "April 9, 1865",
      "January 1, 1863",
      "July 4, 1865"
    ],
    correctIndex: 0,
    explanation: "Just five days after Lee's surrender, on April 14, 1865, President Lincoln was fatally shot while watching a comedy play with his wife.",
    funFact: "Lincoln passed away early the next morning on April 15. Secretary of War Stanton said: 'Now he belongs to the ages.'",
    audioText: "On what date was President Lincoln assassinated? April fourteenth, eighteen sixty-five."
  },
  {
    id: 62,
    questionNumber: 62,
    unitId: 20,
    category: "Lincoln's Assassination",
    question: "Where was Lincoln shot?",
    questionEs: "¿Dónde le dispararon a Lincoln?",
    options: [
      "At Ford's Theatre in Washington, D.C.",
      "Inside the White House Oval Office",
      "On the steps of the U.S. Capitol",
      "At Gettysburg Battlefield"
    ],
    correctIndex: 0,
    explanation: "Lincoln was watching the British comedy 'Our American Cousin' from the presidential box at Ford's Theatre in Washington, D.C.",
    funFact: "Ford's Theatre is preserved today as a national historic site and active museum.",
    audioText: "Where was Lincoln shot? At Ford's Theatre in Washington, D.C."
  },
  {
    id: 63,
    questionNumber: 63,
    unitId: 20,
    category: "Lincoln's Assassination",
    question: "Who assassinated President Lincoln?",
    questionEs: "¿Quién asesinó al presidente Lincoln?",
    options: [
      "John Wilkes Booth",
      "Benedict Arnold",
      "Robert E. Lee",
      "Jefferson Davis"
    ],
    correctIndex: 0,
    explanation: "John Wilkes Booth, a well-known actor and passionate Confederate sympathizer, slipped into the President's box, fired a derringer pistol, and leaped to the stage.",
    funFact: "Booth shouted 'Sic semper tyrannis!' ('Thus always to tyrants' in Latin) as he leapt onto the stage.",
    audioText: "Who assassinated President Lincoln? John Wilkes Booth."
  },

  // --- UNIT 21: THE SOUTH IN RUINS (64 - 66) ---
  {
    id: 64,
    questionNumber: 64,
    unitId: 21,
    category: "The South in Ruins",
    question: "Approximately how many soldiers died in the Civil War?",
    questionEs: "¿Aproximadamente cuántos soldados murieron en la Guerra Civil?",
    options: [
      "Over 620,000 soldiers (and up to 750,000 by recent estimates)",
      "About 10,000 soldiers",
      "Nearly 5 million soldiers",
      "Less than 500 soldiers"
    ],
    correctIndex: 0,
    explanation: "More Americans died in the Civil War than in World War I, World War II, the Korean War, and Vietnam War combined! Two-thirds died from sickness and disease rather than battlefield wounds.",
    funFact: "Almost every town across America lost young men, leaving an entire generation in mourning.",
    audioText: "How many soldiers died in the Civil War? Over six hundred and twenty thousand soldiers."
  },
  {
    id: 65,
    questionNumber: 65,
    unitId: 21,
    category: "The South in Ruins",
    question: "What happened to major Southern cities like Atlanta and Richmond during the war?",
    questionEs: "¿Qué pasó con grandes ciudades del Sur como Atlanta y Richmond durante la guerra?",
    options: [
      "They were heavily burned, destroyed, and left in ruins",
      "They were completely untouched and prospered",
      "They were sold to France",
      "They were turned into giant museums"
    ],
    correctIndex: 0,
    explanation: "Bombardments and fires left cities like Atlanta, Richmond, and Columbia in smoking ashes. Rail lines were torn, bridges collapsed, and banks failed.",
    funFact: "Photographs from 1865 show Richmond looking like an ancient collapsed stone ruin.",
    audioText: "What happened to cities like Atlanta and Richmond? They were heavily burned, destroyed, and left in ruins."
  },
  {
    id: 66,
    questionNumber: 66,
    unitId: 21,
    category: "The South in Ruins",
    question: "How many formerly enslaved people were now free after the war?",
    questionEs: "¿Cuántas personas anteriormente esclavizadas eran libres después de la guerra?",
    options: [
      "Approximately 4 million people",
      "About 50,000 people",
      "Around 100 people",
      "Over 50 million people"
    ],
    correctIndex: 0,
    explanation: "Nearly 4 million African Americans were officially freed from bondage, seeking lost family members, founding churches, and seeking education and work.",
    funFact: "The celebration of liberation on June 19, 1865 in Texas became our national holiday, Juneteenth!",
    audioText: "How many enslaved people were now free after the war? Approximately four million people."
  },

  // --- UNIT 22: THE STRUGGLE OVER RECONSTRUCTION (67 - 69) ---
  {
    id: 67,
    questionNumber: 67,
    unitId: 22,
    category: "Reconstruction",
    question: "What was Reconstruction?",
    questionEs: "¿Qué fue la Reconstrucción?",
    options: [
      "The period (1865–1877) of rebuilding the South and reuniting the country while protecting freed people's rights",
      "The rebuilding of the White House after the War of 1812",
      "The construction of the first transcontinental railway",
      "The invention of steel skyscrapers"
    ],
    correctIndex: 0,
    explanation: "Reconstruction was the 12-year era after the Civil War dedicated to bringing Southern states back into the Union, rebuilding destroyed infrastructure, and guaranteeing constitutional rights to freed African Americans.",
    funFact: "It was one of the most transformative and hotly debated periods in U.S. history!",
    audioText: "What was Reconstruction? The period from 1865 to 1877 of rebuilding the South and reuniting the country."
  },
  {
    id: 68,
    questionNumber: 68,
    unitId: 22,
    category: "Reconstruction",
    question: "Who became President of the United States immediately after Lincoln's death?",
    questionEs: "¿Quién se convirtió en presidente de EE.UU. inmediatamente después de la muerte de Lincoln?",
    options: [
      "Vice President Andrew Johnson",
      "General Ulysses S. Grant",
      "Jefferson Davis",
      "Theodore Roosevelt"
    ],
    correctIndex: 0,
    explanation: "Vice President Andrew Johnson from Tennessee became the 17th President. He clashed fiercely with Congress because he was very lenient toward former Confederate leaders.",
    funFact: "Johnson was the first U.S. President ever to be impeached by the House of Representatives (though he was not removed by the Senate).",
    audioText: "Who became President after Lincoln's death? Vice President Andrew Johnson."
  },
  {
    id: 69,
    questionNumber: 69,
    unitId: 22,
    category: "Reconstruction",
    question: "What did the 'Radical Republicans' in Congress want to do during Reconstruction?",
    questionEs: "¿Qué querían hacer los 'Republicanos Radicales' en el Congreso durante la Reconstrucción?",
    options: [
      "Strictly punish Confederate leaders and guarantee full civil and voting rights for freed African Americans",
      "Allow the South to keep slavery forever",
      "End the United States presidency entirely",
      "Make Andrew Johnson king of America"
    ],
    correctIndex: 0,
    explanation: "Led by Thaddeus Stevens and Charles Sumner, the Radical Republicans believed freed people deserved full civil equality, voting rights, and government protection from southern violence.",
    funFact: "They passed historic civil rights laws over President Johnson's vetoes!",
    audioText: "What did the Radical Republicans want to do? Strictly punish Confederate leaders and guarantee full civil rights for freed African Americans."
  },

  // --- UNIT 23: CONGRESSIONAL RECONSTRUCTION (70 - 72) ---
  {
    id: 70,
    questionNumber: 70,
    unitId: 23,
    category: "Amendments & Congress",
    question: "What did the 14th Amendment to the U.S. Constitution do?",
    questionEs: "¿Qué hizo la Enmienda 14 de la Constitución de los Estados Unidos?",
    options: [
      "Granted citizenship and equal legal protection to anyone born in the U.S., including former enslaved people",
      "Banned the sale of farm goods",
      "Declared Washington D.C. an independent country",
      "Ended all federal taxes"
    ],
    correctIndex: 0,
    explanation: "Ratified in 1868, the 14th Amendment guaranteed that all people born in the U.S. are citizens and protected by 'due process' and 'equal protection of the laws'.",
    funFact: "The 14th Amendment is still one of the most cited amendments in Supreme Court civil rights cases today!",
    audioText: "What did the 14th Amendment do? Granted citizenship and equal legal protection to anyone born in the United States."
  },
  {
    id: 71,
    questionNumber: 71,
    unitId: 23,
    category: "Amendments & Congress",
    question: "What did the 15th Amendment do?",
    questionEs: "¿Qué hizo la Enmienda 15 de la Constitución?",
    options: [
      "Protected the right of African American men to vote regardless of race or previous servitude",
      "Allowed children to vote in school elections",
      "Banned all elections for 10 years",
      "Made voting mandatory for every citizen"
    ],
    correctIndex: 0,
    explanation: "Ratified in 1870, the 15th Amendment declared that the right to vote could not be denied based on 'race, color, or previous condition of servitude'.",
    funFact: "Hiram Revels of Mississippi soon became the very first African American U.S. Senator in history!",
    audioText: "What did the 15th Amendment do? Protected the right of African American men to vote."
  },
  {
    id: 72,
    questionNumber: 72,
    unitId: 23,
    category: "Amendments & Congress",
    question: "What did Congress do to the South during Reconstruction to enforce laws?",
    questionEs: "¿Qué hizo el Congreso con el Sur durante la Reconstrucción para hacer cumplir las leyes?",
    options: [
      "Divided the South into 5 military districts ruled by federal generals and troops",
      "Gave all Southern land back to Great Britain",
      "Evacuated all Southern cities",
      "Built a concrete wall around each Southern state"
    ],
    correctIndex: 0,
    explanation: "Under the Reconstruction Acts of 1867, Congress divided the ten unreconstructed Southern states into 5 military districts protected by U.S. soldiers to guarantee order and fair voting.",
    funFact: "Former Confederate states had to write new state constitutions and ratify the 14th Amendment before rejoining the Union!",
    audioText: "What did Congress do to the South during Reconstruction? Divided the South into five military districts commanded by federal generals."
  },

  // --- UNIT 24: THE SOUTH UNDER RECONSTRUCTION (73 - 75) ---
  {
    id: 73,
    questionNumber: 73,
    unitId: 24,
    category: "South Under Reconstruction",
    question: "What was the Freedmen's Bureau created to do?",
    questionEs: "¿Para qué fue creada la Oficina de Libertos (Freedmen's Bureau)?",
    options: [
      "Provide food, medical care, clothing, legal support, and establish schools for freed people and poor refugees",
      "Build warships for the navy",
      "Print Confederate dollar bills",
      "Organize horse races in southern cities"
    ],
    correctIndex: 0,
    explanation: "Created by Congress in 1865, the Freedmen's Bureau set up thousands of schools, founded universities (like Howard and Fisk), distributed food rations, and helped negotiate labor contracts.",
    funFact: "Thousands of freed Black children and elderly grandparents eagerly sat side-by-side in classrooms learning to read for the first time!",
    audioText: "What was the Freedmen's Bureau created to do? Provide food, medical care, clothing, and establish schools for freed people."
  },
  {
    id: 74,
    questionNumber: 74,
    unitId: 24,
    category: "South Under Reconstruction",
    question: "Name one way Reconstruction was difficult or dangerous for African Americans.",
    questionEs: "Nombra una forma en que la Reconstrucción fue difícil o peligrosa para los afroamericanos.",
    options: [
      "Terrorist hate groups like the Ku Klux Klan and unfair 'Black Codes' laws restricted rights and used violence",
      "There were too many books to read",
      "They were forced to travel to Europe",
      "School days were 20 hours long"
    ],
    correctIndex: 0,
    explanation: "White supremacist secret societies like the Ku Klux Klan used terror, threats, and violence to stop Black Americans from voting or owning land, while harsh 'Black Codes' tried to recreate slavery-like conditions.",
    funFact: "Despite these immense dangers, over 1,500 Black men bravely served in elected public offices during Reconstruction!",
    audioText: "Name one way Reconstruction was difficult or dangerous for African Americans: Terrorist groups like the Ku Klux Klan and unfair Black Codes laws."
  },
  {
    id: 75,
    questionNumber: 75,
    unitId: 24,
    category: "South Under Reconstruction",
    question: "When did Reconstruction officially end, and why?",
    questionEs: "¿Cuándo terminó oficialmente la Reconstrucción y por qué?",
    options: [
      "In 1877, under the Compromise of 1877 when federal troops were withdrawn from the South",
      "In 1865, the day Lincoln died",
      "In 1900, when cars were invented",
      "In 1861, when Fort Sumter was attacked"
    ],
    correctIndex: 0,
    explanation: "In the disputed 1876 presidential election, a political deal called the Compromise of 1877 made Rutherford B. Hayes president in exchange for withdrawing federal troops from the South, ending Reconstruction.",
    funFact: "Without federal soldiers to protect civil rights, Southern states enacted 'Jim Crow' segregation laws that lasted until the 1960s Civil Rights Movement.",
    audioText: "When did Reconstruction end, and why? In 1877, following the Compromise of 1877 when federal troops were withdrawn from the South."
  }
];

export const UNITS: Unit[] = [
  {
    id: 0,
    number: 0,
    worldId: 1,
    title: "The Big 3 Milestones",
    titleEs: "Los 3 Grandes Hitos",
    emoji: "⭐",
    color: "from-amber-400 to-amber-600",
    description: "Start here! Discover Harriet Tubman's secret railroad, Lincoln's freedom decree, and the final surrender.",
    keyPoints: [
      "Harriet Tubman guided escaped slaves to freedom on the secret Underground Railroad.",
      "President Lincoln signed the Emancipation Proclamation on Jan 1, 1863, declaring enslaved people free.",
      "General Lee surrendered to General Grant at Appomattox Court House on April 9, 1865."
    ],
    graphic: {
      type: "cards",
      title: "Three Key Anchors of the War",
      description: "Remember these three essential dates, heroes, and places!",
      iconName: "Compass",
      visualData: [
        { label: "Harriet Tubman", value: "Underground RR", sublabel: "Led 300+ people to freedom", color: "bg-emerald-500", icon: "🛤️" },
        { label: "Jan 1, 1863", value: "Emancipation", sublabel: "Declared enslaved people free", color: "bg-blue-500", icon: "📜" },
        { label: "Appomattox", value: "Surrender 1865", sublabel: "Lee surrenders to Grant", color: "bg-amber-500", icon: "🤝" }
      ]
    },
    questionIds: [1, 2, 3]
  },
  {
    id: 1,
    number: 1,
    worldId: 1,
    title: "Slavery & Life of the Enslaved",
    titleEs: "La Esclavitud y la Vida de los Esclavizados",
    emoji: "🌱",
    color: "from-emerald-500 to-teal-600",
    description: "Learn about the plantations in the South, cash crops, and the resilient spirit of enslaved people.",
    keyPoints: [
      "Enslaved people were forced to do hard, unpaid labor on giant Southern farms called plantations.",
      "Cotton and tobacco were the most valuable cash crops grown in the South.",
      "Enslaved people preserved their hope and culture through spirituals, storytelling, and community bonds."
    ],
    graphic: {
      type: "comparison",
      title: "Southern Cash Crops & Culture",
      description: "How the plantation economy functioned in the 1800s",
      iconName: "Sprout",
      visualData: [
        { label: "King Cotton", value: "Top Cash Crop", sublabel: "Exported worldwide to make fabric", color: "bg-amber-400", icon: "☁️" },
        { label: "Tobacco", value: "Second Cash Crop", sublabel: "Grown across Virginia & Carolinas", color: "bg-emerald-500", icon: "🌿" },
        { label: "Spiritual Songs", value: "Strength & Codes", sublabel: "'Swing Low' carried secret messages", color: "bg-indigo-500", icon: "🎶" }
      ]
    },
    questionIds: [4, 5, 6]
  },
  {
    id: 2,
    number: 2,
    worldId: 1,
    title: "The Missouri Compromise",
    titleEs: "El Compromiso de Misuri (1820)",
    emoji: "⚖️",
    color: "from-blue-500 to-indigo-600",
    description: "How Congress drew a dividing line in 1820 to balance slave states and free states.",
    keyPoints: [
      "Made in 1820 to maintain equal power between free states and slave states in the Senate.",
      "Missouri entered as a slave state, while Maine entered as a free state (12 vs 12).",
      "Slavery was banned north of latitude 36°30' in the Louisiana Purchase territory."
    ],
    graphic: {
      type: "diagram",
      title: "The 36°30' Dividing Line",
      description: "Keeping the balance in the U.S. Senate (1820)",
      iconName: "Scale",
      visualData: [
        { label: "North of 36°30'", value: "FREE SOIL", sublabel: "Slavery was banned forever", color: "bg-blue-500", icon: "❄️" },
        { label: "South of 36°30'", value: "SLAVE SOIL", sublabel: "Slavery was allowed to exist", color: "bg-rose-500", icon: "☀️" },
        { label: "New States", value: "Maine + Missouri", sublabel: "Kept 12 free and 12 slave", color: "bg-purple-500", icon: "⚖️" }
      ]
    },
    questionIds: [7, 8, 9]
  },
  {
    id: 3,
    number: 3,
    worldId: 1,
    title: "Growth of Antislavery Feeling",
    titleEs: "Crecimiento del Sentimiento Antiesclavista",
    emoji: "📢",
    color: "from-violet-500 to-purple-600",
    description: "Meet the brave abolitionists, Frederick Douglass, and the book that shook the world: Uncle Tom's Cabin.",
    keyPoints: [
      "Abolitionists were passionate crusaders who demanded an immediate and complete end to slavery.",
      "Frederick Douglass escaped slavery and became a legendary orator and newspaper publisher.",
      "Harriet Beecher Stowe's 1852 book Uncle Tom's Cabin aroused massive sympathy for enslaved people."
    ],
    graphic: {
      type: "cards",
      title: "Abolitionist Heroes & Voices",
      description: "Words and courage that changed public opinion",
      iconName: "BookOpen",
      visualData: [
        { label: "Frederick Douglass", value: "Great Orator", sublabel: "Escaped slavery & advised Lincoln", color: "bg-violet-500", icon: "🗣️" },
        { label: "Harriet Beecher Stowe", value: "Uncle Tom's Cabin", sublabel: "Best-selling anti-slavery novel", color: "bg-pink-500", icon: "📖" },
        { label: "Abolitionist Press", value: "The Liberator", sublabel: "Speeches, pamphlets, safe routes", color: "bg-amber-500", icon: "📰" }
      ]
    },
    questionIds: [10, 11, 12]
  },
  {
    id: 4,
    number: 4,
    worldId: 1,
    title: "Growing Apart: North vs. South",
    titleEs: "Distanciamiento: Norte vs. Sur",
    emoji: "🏭",
    color: "from-cyan-500 to-blue-600",
    description: "Compare the industrial North with the agricultural South in the 1850s and see why tensions grew.",
    keyPoints: [
      "The North had a bustling industrial economy with factories, extensive railways, and large cities.",
      "The South had an agricultural economy dependent on cash crops and forced enslaved labor.",
      "Southern leaders began threatening secession when they felt their way of life was threatened."
    ],
    graphic: {
      type: "comparison",
      title: "North vs South Economy (1850s)",
      description: "Two vastly different ways of living and working",
      iconName: "Layers",
      visualData: [
        { label: "North: Industry", value: "90% of Factories", sublabel: "Railroads, steel mills, city jobs", color: "bg-blue-500", icon: "🏭" },
        { label: "South: Agriculture", value: "King Cotton", sublabel: "Plantations, forced slave labor", color: "bg-emerald-500", icon: "🌾" },
        { label: "Tension", value: "Talk of Secession", sublabel: "Threatening to leave the Union", color: "bg-rose-500", icon: "⚡" }
      ]
    },
    questionIds: [13, 14, 15]
  },
  {
    id: 5,
    number: 5,
    worldId: 2,
    title: "A House Divided",
    titleEs: "Una Casa Dividida",
    emoji: "🏛️",
    color: "from-amber-500 to-orange-600",
    description: "Lincoln's famous speech warning that the nation cannot permanently endure half slave and half free.",
    keyPoints: [
      "Abraham Lincoln gave the historic 'A house divided against itself cannot stand' speech in 1858.",
      "He meant the nation could not permanently survive split half slave and half free.",
      "The new Republican Party was formed to stop the expansion of slavery into western territories."
    ],
    graphic: {
      type: "banner",
      title: "'A House Divided Cannot Stand'",
      description: "Abraham Lincoln's Prophetic 1858 Warning",
      iconName: "Shield",
      visualData: [
        { label: "Free States", value: "1/2 Free", sublabel: "Demanded stopping slavery spread", color: "bg-blue-500", icon: "🕊️" },
        { label: "Slave States", value: "1/2 Slave", sublabel: "Demanded expanding slave laws", color: "bg-red-500", icon: "⛓️" },
        { label: "Lincoln's Party", value: "Republican", sublabel: "Opposed spread of slavery", color: "bg-amber-500", icon: "🐘" }
      ]
    },
    questionIds: [16, 17, 18]
  },
  {
    id: 6,
    number: 6,
    worldId: 2,
    title: "Young Mr. Lincoln",
    titleEs: "El Joven Abraham Lincoln",
    emoji: "🪵",
    color: "from-amber-600 to-yellow-600",
    description: "The inspiring childhood of 'Honest Abe'—from frontier log cabins to self-taught lawyer.",
    keyPoints: [
      "Lincoln grew up in pioneer log cabins in Kentucky, Indiana, and Illinois.",
      "He taught himself to read and write by reading borrowed books by fireplace firelight.",
      "Before becoming a lawyer, he worked as a store clerk, postmaster, land surveyor, and rail-splitter."
    ],
    graphic: {
      type: "timeline",
      title: "Young Lincoln's Journey",
      description: "From frontier cabin to the White House",
      iconName: "BookMarked",
      visualData: [
        { label: "Log Cabin", value: "Pioneer Boy", sublabel: "Born 1809 in Kentucky woods", color: "bg-amber-700", icon: "🪵" },
        { label: "Self-Taught", value: "Firelight Books", sublabel: "Read Aesop, Bible, history", color: "bg-amber-500", icon: "🔥" },
        { label: "Frontier Jobs", value: "Honest Abe", sublabel: "Storekeeper, surveyor, lawyer", color: "bg-blue-600", icon: "⚖️" }
      ]
    },
    questionIds: [19, 20, 21]
  },
  {
    id: 7,
    number: 7,
    worldId: 2,
    title: "The Crisis Deepens",
    titleEs: "La Crisis se Profundiza",
    emoji: "🔥",
    color: "from-rose-500 to-red-600",
    description: "The 1860 election, South Carolina's secession, and the birth of the Confederate States of America.",
    keyPoints: [
      "Abraham Lincoln was elected the 16th President of the United States in 1860.",
      "South Carolina was the very first state to secede from the Union in December 1860.",
      "Southern states formed a new government called the Confederate States of America (Confederacy)."
    ],
    graphic: {
      type: "diagram",
      title: "The Breakup of the Union (1860)",
      description: "Lincoln's election triggers Southern secession",
      iconName: "Flame",
      visualData: [
        { label: "Nov 1860", value: "Lincoln Elected", sublabel: "16th US President wins", color: "bg-blue-500", icon: "🗳️" },
        { label: "Dec 1860", value: "South Carolina", sublabel: "First state to secede", color: "bg-rose-500", icon: "🚩" },
        { label: "Early 1861", value: "The Confederacy", sublabel: "11 southern states break away", color: "bg-red-600", icon: "⚔️" }
      ]
    },
    questionIds: [22, 23, 24]
  },
  {
    id: 8,
    number: 8,
    worldId: 2,
    title: "The War Begins: Fort Sumter",
    titleEs: "Comienza la Guerra: Fort Sumter",
    emoji: "🏰",
    color: "from-red-600 to-amber-700",
    description: "April 1861: Confederate cannons fire on Fort Sumter in Charleston, and Lincoln calls 75,000 volunteers.",
    keyPoints: [
      "Fort Sumter was a federal fort in the harbor of Charleston, South Carolina.",
      "In April 1861, Confederate troops opened fire on Fort Sumter, igniting the Civil War.",
      "President Lincoln responded by calling for 75,000 volunteer troops to save the Union."
    ],
    graphic: {
      type: "banner",
      title: "First Shots at Fort Sumter (April 1861)",
      description: "Charleston Harbor, South Carolina",
      iconName: "Crosshair",
      visualData: [
        { label: "Location", value: "Charleston Harbor", sublabel: "Island stone fort under siege", color: "bg-slate-600", icon: "🌊" },
        { label: "Date", value: "April 12, 1861", sublabel: "34 hours of cannon fire", color: "bg-amber-600", icon: "💣" },
        { label: "Lincoln's Call", value: "75,000 Volunteers", sublabel: "To preserve and defend the Union", color: "bg-blue-600", icon: "🎖️" }
      ]
    },
    questionIds: [25, 26, 27]
  },
  {
    id: 9,
    number: 9,
    worldId: 3,
    title: "Advantages & Disadvantages",
    titleEs: "Ventajas y Desventajas",
    emoji: "📊",
    color: "from-teal-500 to-emerald-600",
    description: "Compare the strengths: Union population and factories vs Confederate home-field advantage and generals.",
    keyPoints: [
      "The Union had far more people (22 million vs 9 million), 85% of factories, and extensive railroads.",
      "The Confederacy fought on familiar home ground and had skilled, experienced military commanders.",
      "The South's biggest weakness was having very few factories to make weapons, shoes, or train equipment."
    ],
    graphic: {
      type: "comparison",
      title: "North vs South War Resources",
      description: "Who held which advantages in 1861?",
      iconName: "TrendingUp",
      visualData: [
        { label: "Population", value: "Union 71% vs 29%", sublabel: "North: 22M / South: 9M (3.5M enslaved)", color: "bg-blue-500", icon: "👥" },
        { label: "Factories", value: "Union 85%", sublabel: "Can manufacture boots, rifles & iron", color: "bg-cyan-500", icon: "🏭" },
        { label: "Home Ground", value: "Confederate Edge", sublabel: "Defending familiar forests and rivers", color: "bg-emerald-500", icon: "🌲" }
      ]
    },
    questionIds: [28, 29, 30]
  },
  {
    id: 10,
    number: 10,
    worldId: 3,
    title: "A Brother's War",
    titleEs: "Una Guerra de Hermanos",
    emoji: "💔",
    color: "from-purple-500 to-indigo-600",
    description: "Why brother fought brother, West Point classmates faced each other, and Robert E. Lee chose Virginia.",
    keyPoints: [
      "Called 'A Brother's War' because families and friends were painfully torn apart on opposite sides.",
      "Many opposing generals were close friends and classmates at the West Point Military Academy.",
      "Robert E. Lee turned down command of the Union army because he could not fight against his home state of Virginia."
    ],
    graphic: {
      type: "cards",
      title: "Divided Friends & Families",
      description: "Heartbreaking bonds across enemy lines",
      iconName: "Users",
      visualData: [
        { label: "West Point", value: "Classmates & Pals", sublabel: "Studied together, fought against each other", color: "bg-purple-600", icon: "🎓" },
        { label: "Robert E. Lee", value: "Loyal to Virginia", sublabel: "Turned down Union commander post", color: "bg-slate-600", icon: "⚔️" },
        { label: "Families Torn", value: "Brother vs Brother", sublabel: "Brothers wore blue and gray uniforms", color: "bg-rose-500", icon: "💔" }
      ]
    },
    questionIds: [31, 32, 33]
  },
  {
    id: 11,
    number: 11,
    worldId: 3,
    title: "Developing a Strategy",
    titleEs: "Desarrollando una Estrategia",
    emoji: "🐍",
    color: "from-emerald-600 to-green-700",
    description: "The Anaconda Plan: blockade the coast, capture the Mississippi, and squeeze the Confederacy.",
    keyPoints: [
      "The Union's 3-part strategy was called the 'Anaconda Plan', designed by General Winfield Scott.",
      "It focused on blockading Southern ports and seizing the Mississippi River to cut the South in half.",
      "The South's strategy was to fight defensively, exhaust the North's will, and seek European support."
    ],
    graphic: {
      type: "diagram",
      title: "The Union's Anaconda Plan",
      description: "Coiling around the Confederacy like a giant snake",
      iconName: "Compass",
      visualData: [
        { label: "Part 1: Blockade", value: "Seal the Ports", sublabel: "Stop cotton exports & weapon imports", color: "bg-blue-600", icon: "🚢" },
        { label: "Part 2: Mississippi", value: "Divide the South", sublabel: "Split Texas & Arkansas from east", color: "bg-emerald-600", icon: "🌊" },
        { label: "Part 3: Richmond", value: "Capture Capital", sublabel: "March on Confederate capital city", color: "bg-amber-600", icon: "🏛️" }
      ]
    },
    questionIds: [34, 35, 36]
  },
  {
    id: 12,
    number: 12,
    worldId: 3,
    title: "The War in the East",
    titleEs: "La Guerra en el Este",
    emoji: "⚔️",
    color: "from-red-500 to-rose-700",
    description: "First Bull Run shatters hopes for a quick war; Antietam becomes the bloodiest single day.",
    keyPoints: [
      "The First Battle of Bull Run (Manassas) was the war's first major battle, proving it would be long and brutal.",
      "The Battle of Antietam was the single bloodiest day in U.S. history with over 22,000 casualties.",
      "The Union victory at Antietam gave Lincoln the momentum to announce the Emancipation Proclamation."
    ],
    graphic: {
      type: "timeline",
      title: "Clashes in Virginia & Maryland",
      description: "Key early battles in the eastern theater",
      iconName: "Swords",
      visualData: [
        { label: "July 1861", value: "1st Bull Run", sublabel: "Shattered illusion of a 90-day war", color: "bg-amber-600", icon: "💥" },
        { label: "Sept 17, 1862", value: "Antietam", sublabel: "22,000+ casualties in 12 hours", color: "bg-red-600", icon: "🩸" },
        { label: "Result", value: "Union Victory", sublabel: "Lincoln issues freedom proclamation", color: "bg-blue-600", icon: "📜" }
      ]
    },
    questionIds: [37, 38, 39]
  },
  {
    id: 13,
    number: 13,
    worldId: 4,
    title: "The Emancipation Proclamation",
    titleEs: "La Proclamación de Emancipación",
    emoji: "🕊️",
    color: "from-sky-500 to-blue-600",
    description: "Jan 1, 1863: Enslaved people in Confederate states declared free, and Black men enlist in the military.",
    keyPoints: [
      "Issued by President Lincoln on January 1, 1863.",
      "Declared all enslaved people in Confederate states in rebellion to be forever free.",
      "Allowed African American men to enlist in the Union Army and Navy (nearly 200,000 served!)."
    ],
    graphic: {
      type: "cards",
      title: "A Turning Point for Freedom",
      description: "How the Proclamation reshaped the war",
      iconName: "Award",
      visualData: [
        { label: "Moral Cause", value: "Ending Slavery", sublabel: "Civil War became a war for freedom", color: "bg-sky-500", icon: "🕊️" },
        { label: "Black Troops", value: "200,000 Soldiers", sublabel: "Served heroically in Army & Navy", color: "bg-blue-600", icon: "🎖️" },
        { label: "Europe Out", value: "No 3rd Party Aid", sublabel: "Britain & France refused to back slavery", color: "bg-emerald-500", icon: "🌍" }
      ]
    },
    questionIds: [40, 41, 42]
  },
  {
    id: 14,
    number: 14,
    worldId: 4,
    title: "The Generals: Lee vs. Grant",
    titleEs: "Los Generales: Lee vs. Grant",
    emoji: "⭐",
    color: "from-indigo-500 to-slate-700",
    description: "The two great leaders: Robert E. Lee's tactical brilliance vs Ulysses S. Grant's relentless determination.",
    keyPoints: [
      "General Robert E. Lee was the brilliant strategist commanding the Confederate Army of Northern Virginia.",
      "General Ulysses S. Grant was the tough, tenacious Union leader who never retreated.",
      "Grant famously said: 'I propose to fight it out on this line if it takes all summer.'"
    ],
    graphic: {
      type: "comparison",
      title: "Commander Face-Off",
      description: "The two masterminds who met at Appomattox",
      iconName: "Shield",
      visualData: [
        { label: "Gen. Ulysses S. Grant", value: "Union Commander", sublabel: "'Unconditional Surrender' / Relentless", color: "bg-blue-600", icon: "🧔🏻" },
        { label: "Gen. Robert E. Lee", value: "Confederate Leader", sublabel: "Audacious tactician / 'Marble Man'", color: "bg-slate-600", icon: "👨🏼‍🦳" },
        { label: "Grant's Motto", value: "'Fight It Out'", sublabel: "Even if it takes all summer", color: "bg-amber-600", icon: "⚡" }
      ]
    },
    questionIds: [43, 44, 45]
  },
  {
    id: 15,
    number: 15,
    worldId: 4,
    title: "Johnny Reb and Billy Yank",
    titleEs: "Johnny Reb y Billy Yank",
    emoji: "🪖",
    color: "from-blue-600 to-slate-600",
    description: "Step into the boots of the common soldier: blue uniforms vs gray uniforms, hardtack, and camp life.",
    keyPoints: [
      "The common Union soldier was nicknamed 'Billy Yank' and wore a blue uniform.",
      "The common Confederate soldier was nicknamed 'Johnny Reb' and wore a gray uniform.",
      "Soldiers ate hard crackers called 'hardtack', marched long miles, and spent 90% of time in camp."
    ],
    graphic: {
      type: "comparison",
      title: "Blue vs Gray Soldiers",
      description: "Uniforms and nicknames of the infantrymen",
      iconName: "Shirt",
      visualData: [
        { label: "Billy Yank", value: "Union Blue", sublabel: "Wool sack coat, kepi cap, rifle", color: "bg-blue-700", icon: "🔵" },
        { label: "Johnny Reb", value: "Confederate Gray", sublabel: "Gray/butternut coat, slouch hat", color: "bg-slate-500", icon: "⚪" },
        { label: "Daily Ration", value: "Hardtack & Coffee", sublabel: "Rock-hard flour crackers & bacon", color: "bg-amber-700", icon: "🍞" }
      ]
    },
    questionIds: [46, 47, 48]
  },
  {
    id: 16,
    number: 16,
    worldId: 4,
    title: "Women & the War Effort",
    titleEs: "Las Mujeres y el Esfuerzo Bélico",
    emoji: "👩‍⚕️",
    color: "from-rose-400 to-pink-600",
    description: "Clara Barton and the heroines who cared for wounded soldiers and kept family farms running.",
    keyPoints: [
      "Thousands of courageous women served as battlefield nurses treating sick and injured soldiers.",
      "Clara Barton, the 'Angel of the Battlefield', went right to the front lines and later founded the American Red Cross.",
      "At home, women sewed uniforms, rolled bandages, prepared supplies, and managed family farms and businesses."
    ],
    graphic: {
      type: "cards",
      title: "Heroines on Frontline & Home",
      description: "Dedication and bravery of Civil War women",
      iconName: "HeartHandshake",
      visualData: [
        { label: "Clara Barton", value: "American Red Cross", sublabel: "Founded Red Cross in 1881", color: "bg-rose-500", icon: "❤️" },
        { label: "Battlefield Nurses", value: "Saved Lives", sublabel: "Cleaned wounds, administered medicine", color: "bg-pink-500", icon: "🩹" },
        { label: "Home Front", value: "Ran Farms & Shops", sublabel: "Made uniforms, raised vital aid funds", color: "bg-purple-500", icon: "🏡" }
      ]
    },
    questionIds: [49, 50, 51]
  },
  {
    id: 17,
    number: 17,
    worldId: 5,
    title: "The Tide Turns: Gettysburg & Vicksburg",
    titleEs: "Cambia la Marea: Gettysburg y Vicksburg",
    emoji: "🏆",
    color: "from-amber-500 to-yellow-600",
    description: "July 1863: The 3-day clash at Gettysburg, Grant captures Vicksburg, and the Gettysburg Address.",
    keyPoints: [
      "The Battle of Gettysburg (July 1-3, 1863) in Pennsylvania stopped Lee's invasion of the North forever.",
      "On July 4, 1863, Grant captured Vicksburg, giving the Union complete control of the Mississippi River.",
      "Lincoln's 2-minute 'Gettysburg Address' honored fallen soldiers and redefined the purpose of America."
    ],
    graphic: {
      type: "timeline",
      title: "July 1863: The Dual Victories",
      description: "The pivotal week that decided the war's outcome",
      iconName: "Trophy",
      visualData: [
        { label: "July 1-3, 1863", value: "Gettysburg (East)", sublabel: "Lee defeated in Pennsylvania", color: "bg-amber-500", icon: "⚔️" },
        { label: "July 4, 1863", value: "Vicksburg (West)", sublabel: "Union takes the Mississippi River", color: "bg-blue-600", icon: "🌊" },
        { label: "Nov 19, 1863", value: "Gettysburg Address", sublabel: "'Government of the people, by the people'", color: "bg-indigo-600", icon: "📜" }
      ]
    },
    questionIds: [52, 53, 54]
  },
  {
    id: 18,
    number: 18,
    worldId: 5,
    title: "Confederate Problems Mount",
    titleEs: "Se Acumulan los Problemas Confederados",
    emoji: "📉",
    color: "from-stone-500 to-neutral-700",
    description: "Starvation, blockade runners, worthless paper money, and soldiers deserting the army.",
    keyPoints: [
      "By 1864, the Confederacy faced severe shortages of food, medicine, and uncontrollable inflation.",
      "The Union naval blockade choked off southern seaports, preventing weapon and medicine imports.",
      "'Deserting' meant leaving the army without permission to return home and save starving families."
    ],
    graphic: {
      type: "diagram",
      title: "Collapse of Confederate Resources (1864)",
      description: "Severe shortages and despair in the South",
      iconName: "AlertTriangle",
      visualData: [
        { label: "Naval Blockade", value: "Ports Sealed Off", sublabel: "No shoes, salt, or rifles entering", color: "bg-blue-600", icon: "⚓" },
        { label: "Hyperinflation", value: "Flour $1,000/bbl", sublabel: "Confederate dollars became worthless", color: "bg-amber-600", icon: "💸" },
        { label: "Desertion", value: "1 in 3 Left Army", sublabel: "Men rushed home to starving families", color: "bg-rose-600", icon: "🏃" }
      ]
    },
    questionIds: [55, 56, 57]
  },
  {
    id: 19,
    number: 19,
    worldId: 5,
    title: "The War Draws to a Close",
    titleEs: "La Guerra Llega a su Fin",
    emoji: "🏁",
    color: "from-orange-600 to-red-700",
    description: "Sherman's March to the Sea and Lee's historic surrender to Grant at Appomattox on April 9, 1865.",
    keyPoints: [
      "General William T. Sherman led the famous 'March to the Sea' across Georgia, capturing Atlanta and Savannah.",
      "Sherman waged 'total war', wrecking railroads, bridges, and war supplies to break the South's will.",
      "On April 9, 1865, General Lee surrendered to General Grant at Appomattox Court House, Virginia."
    ],
    graphic: {
      type: "timeline",
      title: "The Final March to Peace",
      description: "From Georgia to Appomattox Court House",
      iconName: "Flag",
      visualData: [
        { label: "Late 1864", value: "March to the Sea", sublabel: "Sherman captured Atlanta & Savannah", color: "bg-orange-600", icon: "🔥" },
        { label: "April 9, 1865", value: "Appomattox Surrender", sublabel: "Lee signs terms with Grant", color: "bg-emerald-600", icon: "🤝" },
        { label: "Grant's Order", value: "'Countrymen Again'", sublabel: "Confederates kept horses to farm", color: "bg-blue-600", icon: "🕊️" }
      ]
    },
    questionIds: [58, 59, 60]
  },
  {
    id: 20,
    number: 20,
    worldId: 5,
    title: "The Death of President Lincoln",
    titleEs: "La Muerte del Presidente Lincoln",
    emoji: "🕯️",
    color: "from-slate-700 to-black",
    description: "Tragedy strikes America: Lincoln assassinated at Ford's Theatre on April 14, 1865 by John Wilkes Booth.",
    keyPoints: [
      "On Good Friday, April 14, 1865—just 5 days after Lee surrendered—President Lincoln was assassinated.",
      "Lincoln was shot while watching a play from the presidential box at Ford's Theatre in Washington, D.C.",
      "The assassin was John Wilkes Booth, a Confederate sympathizer and well-known actor."
    ],
    graphic: {
      type: "cards",
      title: "Tragedy at Ford's Theatre",
      description: "A nation mourns its greatest wartime president",
      iconName: "Feather",
      visualData: [
        { label: "Date", value: "April 14, 1865", sublabel: "Good Friday, 5 days after war's end", color: "bg-slate-700", icon: "📅" },
        { label: "Location", value: "Ford's Theatre", sublabel: "Washington, D.C. stage box", color: "bg-stone-600", icon: "🎭" },
        { label: "Legacy", value: "'Belongs to the Ages'", sublabel: "Preserved the Union & freed enslaved", color: "bg-amber-600", icon: "🕊️" }
      ]
    },
    questionIds: [61, 62, 63]
  },
  {
    id: 21,
    number: 21,
    worldId: 6,
    title: "The South in Ruins",
    titleEs: "El Sur en Ruinas",
    emoji: "🏚️",
    color: "from-stone-600 to-zinc-800",
    description: "The staggering human cost: 620,000+ deaths, charred cities, and 4 million newly freed people.",
    keyPoints: [
      "Over 620,000 soldiers died in the Civil War (two-thirds from disease), devastating countless families.",
      "Major cities like Atlanta and Richmond were left burned and in smoking ruins.",
      "Nearly 4 million African Americans were now free and eager to build new lives, families, and schools."
    ],
    graphic: {
      type: "comparison",
      title: "The Toll of 4 Years of War",
      description: "Human sacrifice and the dawn of freedom",
      iconName: "PieChart",
      visualData: [
        { label: "Soldier Casualties", value: "620,000+ Died", sublabel: "Bloodiest conflict in U.S. history", color: "bg-red-700", icon: "✝️" },
        { label: "Southern Cities", value: "Burned to Ashes", sublabel: "Richmond, Atlanta, rail lines wrecked", color: "bg-stone-600", icon: "🏚️" },
        { label: "Newly Freed", value: "4 Million People", sublabel: "Free from bondage at long last", color: "bg-emerald-600", icon: "🌟" }
      ]
    },
    questionIds: [64, 65, 66]
  },
  {
    id: 22,
    number: 22,
    worldId: 6,
    title: "The Struggle Over Reconstruction",
    titleEs: "La Lucha por la Reconstrucción",
    emoji: "⚖️",
    color: "from-blue-600 to-indigo-800",
    description: "Rebuilding 1865–1877: President Andrew Johnson vs the Radical Republicans fighting for equal rights.",
    keyPoints: [
      "Reconstruction (1865–1877) was the era of rebuilding the South and reuniting the country.",
      "Vice President Andrew Johnson became president; he was very lenient toward former Confederate leaders.",
      "Radical Republicans in Congress demanded punishment for Confederate leaders and full civil rights for freed people."
    ],
    graphic: {
      type: "comparison",
      title: "President Johnson vs Radical Republicans",
      description: "Two conflicting visions for rebuilding America",
      iconName: "Scale",
      visualData: [
        { label: "Andrew Johnson", value: "Lenient on South", sublabel: "Vetoed civil rights; was impeached", color: "bg-amber-600", icon: "👨‍⚖️" },
        { label: "Radical Republicans", value: "Strict & Fair", sublabel: "Demanded voting rights & protection", color: "bg-blue-600", icon: "🏛️" },
        { label: "Core Mission", value: "Reunite & Protect", sublabel: "Rebuild destroyed schools & cities", color: "bg-emerald-600", icon: "🤝" }
      ]
    },
    questionIds: [67, 68, 69]
  },
  {
    id: 23,
    number: 23,
    worldId: 6,
    title: "Congressional Reconstruction",
    titleEs: "Reconstrucción del Congreso",
    emoji: "📜",
    color: "from-indigo-600 to-purple-800",
    description: "The 14th Amendment (citizenship), 15th Amendment (voting), and 5 military districts in the South.",
    keyPoints: [
      "The 14th Amendment granted U.S. citizenship and equal legal protection to all persons born in America.",
      "The 15th Amendment protected the right of African American men to vote regardless of race.",
      "Congress divided the South into 5 military districts commanded by federal troops to enforce rights."
    ],
    graphic: {
      type: "cards",
      title: "The Reconstruction Amendments",
      description: "Constitutional pillars of freedom and equality",
      iconName: "ShieldCheck",
      visualData: [
        { label: "13th Amendment", value: "Abolished Slavery", sublabel: "Slavery outlawed across entire US", color: "bg-teal-600", icon: "⛓️" },
        { label: "14th Amendment", value: "Citizenship & Rights", sublabel: "Equal protection under the law", color: "bg-blue-600", icon: "🗽" },
        { label: "15th Amendment", value: "Voting Rights", sublabel: "Black men gain right to vote", color: "bg-purple-600", icon: "🗳️" }
      ]
    },
    questionIds: [70, 71, 72]
  },
  {
    id: 24,
    number: 24,
    worldId: 6,
    title: "The South Under Reconstruction",
    titleEs: "El Sur Bajo la Reconstrucción",
    emoji: "🏫",
    color: "from-emerald-600 to-teal-800",
    description: "The Freedmen's Bureau, the Ku Klux Klan and Black Codes, and how Reconstruction ended in 1877.",
    keyPoints: [
      "The Freedmen's Bureau provided food, hospitals, legal aid, and opened thousands of public schools.",
      "Secret terrorist groups like the Ku Klux Klan and unfair 'Black Codes' terrorized Black citizens.",
      "Reconstruction ended in 1877 under the Compromise of 1877 when federal troops withdrew from the South."
    ],
    graphic: {
      type: "timeline",
      title: "Schools, Resistance & 1877",
      description: "The promise and conclusion of Reconstruction",
      iconName: "GraduationCap",
      visualData: [
        { label: "Freedmen's Bureau", value: "Schools & Relief", sublabel: "Educated hundreds of thousands", color: "bg-emerald-600", icon: "🏫" },
        { label: "Backlash & Terror", value: "KKK & Black Codes", sublabel: "Violent attempts to block equality", color: "bg-rose-700", icon: "⚠️" },
        { label: "Compromise of 1877", value: "Troops Withdrawn", sublabel: "Hayes becomes president; era ends", color: "bg-amber-700", icon: "🚪" }
      ]
    },
    questionIds: [73, 74, 75]
  }
];

export const WORLDS: World[] = [
  {
    id: 1,
    title: "World 1: Seeds of Conflict",
    subtitle: "Plantations, Compromises & Abolitionists (Units 0 - 4)",
    themeColor: "emerald",
    bgGradient: "from-emerald-500 to-teal-700",
    unitIds: [0, 1, 2, 3, 4]
  },
  {
    id: 2,
    title: "World 2: The Storm Gathers",
    subtitle: "A House Divided, Lincoln & Fort Sumter (Units 5 - 8)",
    themeColor: "amber",
    bgGradient: "from-amber-500 to-orange-700",
    unitIds: [5, 6, 7, 8]
  },
  {
    id: 3,
    title: "World 3: Clash of Armies",
    subtitle: "Strategies, Bull Run & Antietam (Units 9 - 12)",
    themeColor: "blue",
    bgGradient: "from-blue-600 to-indigo-800",
    unitIds: [9, 10, 11, 12]
  },
  {
    id: 4,
    title: "World 4: Freedom & Courage",
    subtitle: "Emancipation, Generals & Heroines (Units 13 - 16)",
    themeColor: "sky",
    bgGradient: "from-sky-500 to-indigo-700",
    unitIds: [13, 14, 15, 16]
  },
  {
    id: 5,
    title: "World 5: Turning Tide to Peace",
    subtitle: "Gettysburg, Sherman & Surrender (Units 17 - 20)",
    themeColor: "rose",
    bgGradient: "from-rose-500 to-red-800",
    unitIds: [17, 18, 19, 20]
  },
  {
    id: 6,
    title: "World 6: Rebuilding America",
    subtitle: "Reconstruction, Amendments & Bureau (Units 21 - 24)",
    themeColor: "purple",
    bgGradient: "from-purple-600 to-violet-900",
    unitIds: [21, 22, 23, 24]
  }
];

// Attach interactive lesson slides for early units
UNITS.forEach(u => {
  if (INITIAL_LESSON_SLIDES[u.id]) {
    u.slides = INITIAL_LESSON_SLIDES[u.id];
  }
});

export const INITIAL_USER_PROGRESS: UserProgress = {
  studentName: '',
  hearts: 5,
  maxHearts: 5,
  confites: 150, // 🍬 Moneda virtual
  xp: 0,
  streak: 1,
  streakHistory: [true, false, false, false, false, false, false], // Mon - Sun
  lastActiveDate: new Date().toISOString().split('T')[0],
  unlockedUnitId: 0, // Starts with unit 0 unlocked
  unitStars: {} as Record<number, number>,
  completedQuestions: [] as number[],
  completedLessons: [] as number[],
  unlockedAvatars: ['owl-explorer'],
  currentAvatar: 'owl-explorer',
  unlockedThemes: ['theme-emerald'],
  currentTheme: 'theme-emerald',
  streakFreeze: 1,
  openedChests: [] as number[],
  stickers: ['sticker-footprint']
};

export const SHOP_AVATARS = [
  { id: 'owl-explorer', name: 'Footy Explorer', price: 0, emoji: '🦉', desc: 'Curious historian owl with compass and map' },
  { id: 'lincoln-hat', name: 'Abe Lincoln', price: 100, emoji: '🎩', desc: 'Top hat and honest spirit of leadership' },
  { id: 'tubman-lantern', name: 'Harriet Guide', price: 150, emoji: '🏮', desc: 'Brave Underground Railroad freedom lantern' },
  { id: 'general-grant', name: 'General Grant', price: 200, emoji: '⭐', desc: 'Blue uniform and golden victory star' },
  { id: 'clara-angel', name: 'Angel Barton', price: 200, emoji: '🩺', desc: 'Red Cross heroine with a heart of gold' },
  { id: 'eagle-liberty', name: 'Golden Eagle', price: 300, emoji: '🦅', desc: 'Majestic symbol of liberty and justice' },
  { id: 'master-detective', name: 'Super Detective', price: 350, emoji: '🕵️', desc: 'Investigator of historical clues and mysteries' },
  { id: 'royal-scholar', name: 'Royal Scholar', price: 400, emoji: '👑', desc: 'Golden crown for the history champion' }
];

export const SHOP_THEMES = [
  { id: 'theme-emerald', name: 'Emerald Forest', price: 0, emoji: '🌿', previewColor: 'from-emerald-500 to-teal-600', desc: 'Classic vibrant and natural theme' },
  { id: 'theme-cosmic', name: 'Cosmic Sky', price: 120, emoji: '🌌', previewColor: 'from-indigo-600 to-purple-700', desc: 'Starlight and night constellations' },
  { id: 'theme-sunset', name: 'Golden Sunset', price: 150, emoji: '🌅', previewColor: 'from-amber-500 to-orange-600', desc: 'Warm horizon glow and evening hues' },
  { id: 'theme-candy', name: 'Sweet Candy', price: 200, emoji: '🍬', previewColor: 'from-pink-400 to-rose-500', desc: 'Pastel candy and cheerful confites' }
];

export const BADGES = [
  {
    id: 'first-step',
    title: 'First Footprint 👣',
    description: 'Answer your first question correctly',
    icon: '👣',
    color: 'from-amber-400 to-yellow-500',
    check: (p: UserProgress) => p.completedQuestions.length >= 1
  },
  {
    id: 'underground-hero',
    title: 'Freedom Pioneer 🛤️',
    description: 'Complete Unit 0 (The 3 Major Milestones)',
    icon: '🛤️',
    color: 'from-emerald-400 to-teal-500',
    check: (p: UserProgress) => (p.unitStars[0] || 0) > 0
  },
  {
    id: 'strike-fire',
    title: 'Blazing Streak 🔥',
    description: 'Reach a 3-day learning streak',
    icon: '🔥',
    color: 'from-orange-500 to-rose-500',
    check: (p: UserProgress) => p.streak >= 3
  },
  {
    id: 'interactive-learner',
    title: 'Super Learner 💡',
    description: 'Complete your first interactive graphic lesson',
    icon: '💡',
    color: 'from-yellow-400 to-amber-500',
    check: (p: UserProgress) => p.completedLessons.length >= 1
  },
  {
    id: 'gettysburg-scholar',
    title: 'Gettysburg Hero 🏆',
    description: 'Master Unit 17 (The Tide Turns)',
    icon: '🏆',
    color: 'from-blue-400 to-indigo-600',
    check: (p: UserProgress) => (p.unitStars[17] || 0) > 0
  },
  {
    id: 'confite-collector',
    title: 'Candy Champion 🍬',
    description: 'Collect 300 or more sweet confites',
    icon: '🍬',
    color: 'from-pink-400 to-rose-500',
    check: (p: UserProgress) => p.confites >= 300
  },
  {
    id: 'history-master',
    title: 'Grand Historian 🎓',
    description: 'Answer 50 or more questions correctly',
    icon: '🎓',
    color: 'from-purple-500 to-pink-500',
    check: (p: UserProgress) => p.completedQuestions.length >= 50
  }
];
