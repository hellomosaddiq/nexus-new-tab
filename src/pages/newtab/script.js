/**
 * NEXUS New Tab - Productivity-focused new tab extension
 *
 * @author mosaddiq
 * @version 1.0.0
 * @license MIT
 */

// Daily quotes database - 200+ short inspirational quotes
const DAILY_QUOTES = [
    { text: 'Just start.', author: 'Nike', category: 'motivation' },
    { text: 'Think different.', author: 'Apple', category: 'innovation' },
    { text: 'Make it happen.', author: 'Unknown', category: 'motivation' },
    { text: 'Stay hungry.', author: 'Steve Jobs', category: 'motivation' },
    { text: 'Keep going.', author: 'Unknown', category: 'motivation' },
    { text: 'Be fearless.', author: 'Unknown', category: 'motivation' },
    { text: 'Dream big.', author: 'Unknown', category: 'motivation' },
    { text: 'Act now.', author: 'Unknown', category: 'productivity' },
    { text: 'Stay focused.', author: 'Unknown', category: 'productivity' },
    { text: 'Never settle.', author: 'Unknown', category: 'success' },
    { text: 'Progress over perfection.', author: 'Unknown', category: 'motivation' },
    { text: 'Done is better than perfect.', author: 'Sheryl Sandberg', category: 'productivity' },
    { text: 'Fail fast, learn faster.', author: 'Unknown', category: 'innovation' },
    { text: 'Embrace the chaos.', author: 'Unknown', category: 'motivation' },
    { text: 'Create your own luck.', author: 'Unknown', category: 'success' },
    { text: 'Be the change.', author: 'Gandhi', category: 'wisdom' },
    { text: 'Choose courage over comfort.', author: 'Brené Brown', category: 'motivation' },
    { text: 'Start where you are.', author: 'Arthur Ashe', category: 'motivation' },
    { text: 'Do it with passion or not at all.', author: 'Rosa Couchette', category: 'motivation' },
    { text: 'Excellence is a habit.', author: 'Aristotle', category: 'success' },

    // PRODUCTIVITY & FOCUS (30-50 characters)
    {
        text: 'Focus on being productive instead of busy.',
        author: 'Tim Ferriss',
        category: 'productivity'
    },
    { text: 'Work smarter, not harder.', author: 'Unknown', category: 'productivity' },
    { text: 'Discipline is freedom.', author: 'Jocko Willink', category: 'productivity' },
    { text: 'Consistency beats perfection.', author: 'Unknown', category: 'productivity' },
    {
        text: 'Small steps daily lead to big changes yearly.',
        author: 'Unknown',
        category: 'productivity'
    },
    {
        text: 'Time is what we want most but use worst.',
        author: 'William Penn',
        category: 'productivity'
    },
    {
        text: 'Procrastination is the thief of time.',
        author: 'Charles Dickens',
        category: 'productivity'
    },
    {
        text: 'The way to get started is to quit talking.',
        author: 'Walt Disney',
        category: 'productivity'
    },
    {
        text: "You don't have to be great to get started.",
        author: 'Les Brown',
        category: 'productivity'
    },
    {
        text: 'Action is the foundational key to success.',
        author: 'Pablo Picasso',
        category: 'productivity'
    },

    // SUCCESS & ACHIEVEMENT (30-60 characters)
    {
        text: 'Success is not final, failure is not fatal.',
        author: 'Winston Churchill',
        category: 'success'
    },
    {
        text: "Believe you can and you're halfway there.",
        author: 'Theodore Roosevelt',
        category: 'success'
    },
    {
        text: 'The only impossible journey is the one you never begin.',
        author: 'Tony Robbins',
        category: 'success'
    },
    {
        text: 'Success is walking from failure to failure.',
        author: 'Winston Churchill',
        category: 'success'
    },
    {
        text: "Don't be afraid to give up good for great.",
        author: 'John D. Rockefeller',
        category: 'success'
    },
    {
        text: 'Success is 1% inspiration, 99% perspiration.',
        author: 'Thomas Edison',
        category: 'success'
    },
    {
        text: 'The harder you work, the luckier you get.',
        author: 'Gary Player',
        category: 'success'
    },
    { text: 'Success is not about the destination.', author: 'Unknown', category: 'success' },
    { text: 'Champions train, losers complain.', author: 'Unknown', category: 'success' },
    {
        text: 'Winners never quit, quitters never win.',
        author: 'Vince Lombardi',
        category: 'success'
    },

    // INNOVATION & CREATIVITY (30-60 characters)
    {
        text: 'Innovation distinguishes leaders from followers.',
        author: 'Steve Jobs',
        category: 'innovation'
    },
    {
        text: 'Simplicity is the ultimate sophistication.',
        author: 'Leonardo da Vinci',
        category: 'innovation'
    },
    {
        text: 'Creativity is intelligence having fun.',
        author: 'Albert Einstein',
        category: 'creativity'
    },
    {
        text: 'The best way to predict the future is to create it.',
        author: 'Peter Drucker',
        category: 'innovation'
    },
    {
        text: 'Ideas are easy. Implementation is hard.',
        author: 'Guy Kawasaki',
        category: 'innovation'
    },
    { text: 'Code is poetry.', author: 'Unknown', category: 'innovation' },
    {
        text: 'First, solve the problem. Then, write the code.',
        author: 'John Johnson',
        category: 'innovation'
    },
    {
        text: 'The best error message is the one that never shows up.',
        author: 'Thomas Fuchs',
        category: 'innovation'
    },
    {
        text: 'Good code is its own best documentation.',
        author: 'Steve McConnell',
        category: 'innovation'
    },
    { text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds', category: 'innovation' },

    // WISDOM & PHILOSOPHY (30-60 characters)
    {
        text: 'The only way to do great work is to love what you do.',
        author: 'Steve Jobs',
        category: 'wisdom'
    },
    {
        text: 'Be yourself; everyone else is already taken.',
        author: 'Oscar Wilde',
        category: 'wisdom'
    },
    {
        text: "Life is what happens while you're making plans.",
        author: 'John Lennon',
        category: 'wisdom'
    },
    {
        text: 'In the middle of difficulty lies opportunity.',
        author: 'Albert Einstein',
        category: 'wisdom'
    },
    {
        text: 'The journey of a thousand miles begins with one step.',
        author: 'Lao Tzu',
        category: 'wisdom'
    },
    {
        text: 'Yesterday is history, tomorrow is mystery.',
        author: 'Eleanor Roosevelt',
        category: 'wisdom'
    },
    {
        text: "What doesn't kill you makes you stronger.",
        author: 'Friedrich Nietzsche',
        category: 'wisdom'
    },
    { text: 'The only constant in life is change.', author: 'Heraclitus', category: 'wisdom' },
    { text: 'Knowledge is power.', author: 'Francis Bacon', category: 'wisdom' },
    { text: 'Less is more.', author: 'Ludwig Mies van der Rohe', category: 'wisdom' },

    // PERSEVERANCE & RESILIENCE (30-60 characters)
    {
        text: "It's not whether you get knocked down, it's whether you get up.",
        author: 'Vince Lombardi',
        category: 'motivation'
    },
    {
        text: 'Fall seven times, stand up eight.',
        author: 'Japanese Proverb',
        category: 'motivation'
    },
    {
        text: 'The difference between ordinary and extraordinary.',
        author: 'Jimmy Johnson',
        category: 'motivation'
    },
    {
        text: "Don't watch the clock; do what it does. Keep going.",
        author: 'Sam Levenson',
        category: 'motivation'
    },
    {
        text: 'Tough times never last, but tough people do.',
        author: 'Robert H. Schuller',
        category: 'motivation'
    },
    {
        text: "When you're going through hell, keep going.",
        author: 'Winston Churchill',
        category: 'motivation'
    },
    {
        text: 'The comeback is always stronger than the setback.',
        author: 'Unknown',
        category: 'motivation'
    },
    { text: 'Pressure makes diamonds.', author: 'Unknown', category: 'motivation' },
    { text: 'Every expert was once a beginner.', author: 'Helen Hayes', category: 'motivation' },
    {
        text: 'Storms make trees take deeper roots.',
        author: 'Dolly Parton',
        category: 'motivation'
    },

    // LEADERSHIP & GROWTH (30-60 characters)
    {
        text: 'A leader is one who knows the way and shows the way.',
        author: 'John C. Maxwell',
        category: 'success'
    },
    {
        text: 'Leadership is action, not position.',
        author: 'Donald H. McGannon',
        category: 'success'
    },
    {
        text: 'The best leaders are those who serve others.',
        author: 'Unknown',
        category: 'success'
    },
    {
        text: "Great leaders don't create followers, they create leaders.",
        author: 'Tom Peters',
        category: 'success'
    },
    { text: 'Lead by example.', author: 'Unknown', category: 'success' },
    { text: 'Be the leader you wish you had.', author: 'Unknown', category: 'success' },
    {
        text: 'Leadership is influence, nothing more, nothing less.',
        author: 'John C. Maxwell',
        category: 'success'
    },
    {
        text: 'The price of greatness is responsibility.',
        author: 'Winston Churchill',
        category: 'success'
    },
    {
        text: 'A good leader takes little more than his share of blame.',
        author: 'Arnold H. Glasow',
        category: 'success'
    },
    {
        text: 'Leadership is not about being in charge.',
        author: 'Simon Sinek',
        category: 'success'
    },

    // TECHNOLOGY & DEVELOPMENT (30-60 characters)
    {
        text: "Code is like humor. When you explain it, it's bad.",
        author: 'Cory House',
        category: 'innovation'
    },
    {
        text: 'Programs must be written for people to read.',
        author: 'Harold Abelson',
        category: 'innovation'
    },
    {
        text: 'Any fool can write code that a computer understands.',
        author: 'Martin Fowler',
        category: 'innovation'
    },
    {
        text: 'The best programs are written when the programmer is happy.',
        author: 'Bill Atkinson',
        category: 'innovation'
    },
    {
        text: 'Debugging is twice as hard as writing code.',
        author: 'Brian Kernighan',
        category: 'innovation'
    },
    {
        text: 'Code never lies, comments sometimes do.',
        author: 'Ron Jeffries',
        category: 'innovation'
    },
    {
        text: 'Make it work, make it right, make it fast.',
        author: 'Kent Beck',
        category: 'innovation'
    },
    {
        text: 'Premature optimization is the root of all evil.',
        author: 'Donald Knuth',
        category: 'innovation'
    },
    {
        text: 'The computer was born to solve problems.',
        author: 'Bill Gates',
        category: 'innovation'
    },
    {
        text: 'Software is a great combination of artistry and engineering.',
        author: 'Bill Gates',
        category: 'innovation'
    },

    // ENTREPRENEURSHIP & BUSINESS (30-60 characters)
    {
        text: 'Your most unhappy customers are your greatest source of learning.',
        author: 'Bill Gates',
        category: 'business'
    },
    {
        text: 'The way to get started is to quit talking and begin doing.',
        author: 'Walt Disney',
        category: 'business'
    },
    {
        text: 'Innovation is the specific instrument of entrepreneurship.',
        author: 'Peter Drucker',
        category: 'business'
    },
    {
        text: 'The best time to plant a tree was 20 years ago.',
        author: 'Chinese Proverb',
        category: 'business'
    },
    {
        text: "Don't be afraid to give up the good to go for the great.",
        author: 'John D. Rockefeller',
        category: 'business'
    },
    {
        text: 'The biggest risk is not taking any risk.',
        author: 'Mark Zuckerberg',
        category: 'business'
    },
    {
        text: 'Ideas are commodity. Execution of them is not.',
        author: 'Michael Dell',
        category: 'business'
    },
    {
        text: "The customer's perception is your reality.",
        author: 'Kate Zabriskie',
        category: 'business'
    },
    { text: 'Quality is not an act, it is a habit.', author: 'Aristotle', category: 'business' },
    {
        text: 'The best marketing strategy ever: CARE.',
        author: 'Gary Vaynerchuk',
        category: 'business'
    },

    // CREATIVITY & DESIGN (30-60 characters)
    {
        text: 'Design is not just what it looks like. Design is how it works.',
        author: 'Steve Jobs',
        category: 'creativity'
    },
    {
        text: 'Good design is obvious. Great design is transparent.',
        author: 'Joe Sparano',
        category: 'creativity'
    },
    {
        text: 'Simplicity is the ultimate sophistication.',
        author: 'Leonardo da Vinci',
        category: 'creativity'
    },
    { text: 'Design is thinking made visual.', author: 'Saul Bass', category: 'creativity' },
    {
        text: 'The details are not the details. They make the design.',
        author: 'Charles Eames',
        category: 'creativity'
    },
    {
        text: 'Design is where science and art break even.',
        author: 'Robin Mathew',
        category: 'creativity'
    },
    {
        text: 'Content precedes design. Design in the absence of content is not design.',
        author: 'Jeffrey Zeldman',
        category: 'creativity'
    },
    {
        text: 'Design is intelligence made visible.',
        author: 'Alina Wheeler',
        category: 'creativity'
    },
    { text: 'Good design is good business.', author: 'Thomas Watson Jr.', category: 'creativity' },
    {
        text: 'Design creates culture. Culture shapes values.',
        author: 'Robert L. Peters',
        category: 'creativity'
    },

    // MINDSET & ATTITUDE (30-60 characters)
    {
        text: "Whether you think you can or you can't, you're right.",
        author: 'Henry Ford',
        category: 'mindset'
    },
    {
        text: 'The mind is everything. What you think you become.',
        author: 'Buddha',
        category: 'mindset'
    },
    {
        text: 'Change your thoughts and you change your world.',
        author: 'Norman Vincent Peale',
        category: 'mindset'
    },
    {
        text: 'Positive anything is better than negative nothing.',
        author: 'Elbert Hubbard',
        category: 'mindset'
    },
    {
        text: 'The only disability in life is a bad attitude.',
        author: 'Scott Hamilton',
        category: 'mindset'
    },
    {
        text: 'Attitude is a little thing that makes a big difference.',
        author: 'Winston Churchill',
        category: 'mindset'
    },
    { text: 'Your attitude determines your direction.', author: 'Unknown', category: 'mindset' },
    {
        text: 'Optimism is the faith that leads to achievement.',
        author: 'Helen Keller',
        category: 'mindset'
    },
    {
        text: 'The pessimist sees difficulty in every opportunity.',
        author: 'Winston Churchill',
        category: 'mindset'
    },
    {
        text: 'Life is 10% what happens to you and 90% how you react.',
        author: 'Charles R. Swindoll',
        category: 'mindset'
    },

    // TIME & LIFE MANAGEMENT (30-60 characters)
    { text: 'Time is more valuable than money.', author: 'Jim Rohn', category: 'productivity' },
    {
        text: 'Lost time is never found again.',
        author: 'Benjamin Franklin',
        category: 'productivity'
    },
    {
        text: 'Time flies over us, but leaves its shadow behind.',
        author: 'Nathaniel Hawthorne',
        category: 'wisdom'
    },
    {
        text: 'The future depends on what you do today.',
        author: 'Mahatma Gandhi',
        category: 'productivity'
    },
    {
        text: "Yesterday's the past, tomorrow's the future.",
        author: 'Bil Keane',
        category: 'wisdom'
    },
    { text: 'Time is the scarcest resource.', author: 'Peter Drucker', category: 'productivity' },
    {
        text: "Don't count the days, make the days count.",
        author: 'Muhammad Ali',
        category: 'motivation'
    },
    {
        text: 'Time you enjoy wasting is not wasted time.',
        author: 'Marthe Troly-Curtin',
        category: 'wisdom'
    },
    {
        text: 'The two most powerful warriors are patience and time.',
        author: 'Leo Tolstoy',
        category: 'wisdom'
    },
    {
        text: 'Time is what we want most, but what we use worst.',
        author: 'William Penn',
        category: 'productivity'
    },

    // LEARNING & GROWTH (30-60 characters)
    { text: "Learn as if you'll live forever.", author: 'Mahatma Gandhi', category: 'wisdom' },
    {
        text: 'The more that you read, the more things you will know.',
        author: 'Dr. Seuss',
        category: 'wisdom'
    },
    { text: 'Learning never exhausts the mind.', author: 'Leonardo da Vinci', category: 'wisdom' },
    {
        text: 'An investment in knowledge pays the best interest.',
        author: 'Benjamin Franklin',
        category: 'wisdom'
    },
    { text: "Knowledge can't be taken away.", author: 'B.B. King', category: 'wisdom' },
    {
        text: 'Education is the most powerful weapon.',
        author: 'Nelson Mandela',
        category: 'wisdom'
    },
    {
        text: 'The expert in anything was once a beginner.',
        author: 'Helen Hayes',
        category: 'motivation'
    },
    {
        text: 'Learning is a treasure that will follow its owner everywhere.',
        author: 'Chinese Proverb',
        category: 'wisdom'
    },
    { text: 'The capacity to learn is a gift.', author: 'Unknown', category: 'wisdom' },
    { text: 'Stay curious, stay learning.', author: 'Unknown', category: 'wisdom' },

    // HAPPINESS & FULFILLMENT (30-60 characters)
    { text: 'Happiness comes from your actions.', author: 'Dalai Lama', category: 'happiness' },
    {
        text: 'The purpose of our lives is to be happy.',
        author: 'Dalai Lama',
        category: 'happiness'
    },
    {
        text: 'Happiness is a choice, not a result.',
        author: 'Ralph Marston',
        category: 'happiness'
    },
    {
        text: "The happiest people don't have the best of everything.",
        author: 'Unknown',
        category: 'happiness'
    },
    {
        text: 'Happiness is harmony in thought, word, deed.',
        author: 'Mahatma Gandhi',
        category: 'happiness'
    },
    { text: 'Count your age by friends, not years.', author: 'John Lennon', category: 'happiness' },
    { text: 'The secret of happiness is freedom.', author: 'Thucydides', category: 'happiness' },
    {
        text: "Happiness is not a destination, it's a way of life.",
        author: 'Burton Hills',
        category: 'happiness'
    },
    {
        text: 'Be happy for this moment. This moment is your life.',
        author: 'Omar Khayyam',
        category: 'happiness'
    },
    {
        text: 'Happiness is the only thing that multiplies when shared.',
        author: 'Albert Schweitzer',
        category: 'happiness'
    },

    // COURAGE & CONFIDENCE (30-60 characters)
    { text: 'Courage is not the absence of fear.', author: 'Nelson Mandela', category: 'courage' },
    { text: 'You are braver than you believe.', author: 'A.A. Milne', category: 'courage' },
    { text: 'Fortune favors the bold.', author: 'Latin Proverb', category: 'courage' },
    {
        text: 'Confidence comes not from always being right.',
        author: 'Unknown',
        category: 'courage'
    },
    { text: 'Be yourself. Everyone else is taken.', author: 'Oscar Wilde', category: 'courage' },
    {
        text: 'What lies behind us and before us are tiny matters.',
        author: 'Ralph Waldo Emerson',
        category: 'courage'
    },
    {
        text: "You miss 100% of the shots you don't take.",
        author: 'Wayne Gretzky',
        category: 'courage'
    },
    {
        text: 'The cave you fear to enter holds the treasure you seek.',
        author: 'Joseph Campbell',
        category: 'courage'
    },
    {
        text: 'Doubt kills more dreams than failure ever will.',
        author: 'Suzy Kassem',
        category: 'courage'
    },
    { text: 'Feel the fear and do it anyway.', author: 'Susan Jeffers', category: 'courage' },

    // FOCUS & DISCIPLINE (30-60 characters)
    { text: 'Where focus goes, energy flows.', author: 'Tony Robbins', category: 'focus' },
    {
        text: 'Discipline is the bridge between goals and accomplishment.',
        author: 'Jim Rohn',
        category: 'focus'
    },
    {
        text: 'The successful warrior is the average man with laser focus.',
        author: 'Bruce Lee',
        category: 'focus'
    },
    {
        text: 'Concentrate all your thoughts upon the work at hand.',
        author: 'Alexander Graham Bell',
        category: 'focus'
    },
    {
        text: 'Focus on the step in front of you, not the whole staircase.',
        author: 'Unknown',
        category: 'focus'
    },
    {
        text: 'Lack of direction, not lack of time, is the problem.',
        author: 'Zig Ziglar',
        category: 'focus'
    },
    {
        text: 'The art of being wise is knowing what to overlook.',
        author: 'William James',
        category: 'focus'
    },
    { text: 'Single-tasking is the new multitasking.', author: 'Unknown', category: 'focus' },
    { text: 'Starve your distractions, feed your focus.', author: 'Unknown', category: 'focus' },
    {
        text: "Focus is a matter of deciding what things you're not going to do.",
        author: 'John Carmack',
        category: 'focus'
    },

    // CHANGE & ADAPTATION (30-60 characters)
    {
        text: 'Be the change you wish to see in the world.',
        author: 'Mahatma Gandhi',
        category: 'change'
    },
    { text: 'Change is the only constant in life.', author: 'Heraclitus', category: 'change' },
    { text: "If you don't like something, change it.", author: 'Maya Angelou', category: 'change' },
    {
        text: 'The only way to make sense out of change is to plunge into it.',
        author: 'Alan Watts',
        category: 'change'
    },
    {
        text: 'Progress is impossible without change.',
        author: 'George Bernard Shaw',
        category: 'change'
    },
    {
        text: 'Change your thoughts and you change your world.',
        author: 'Norman Vincent Peale',
        category: 'change'
    },
    { text: 'Everyone thinks of changing the world.', author: 'Leo Tolstoy', category: 'change' },
    { text: 'Change before you have to.', author: 'Jack Welch', category: 'change' },
    {
        text: 'The secret of change is to focus all energy on building the new.',
        author: 'Socrates',
        category: 'change'
    },
    { text: 'Adapt or perish.', author: 'H.G. Wells', category: 'change' },

    // PASSION & PURPOSE (30-60 characters)
    {
        text: 'Follow your passion, and success will follow you.',
        author: 'Arthur Buddhold',
        category: 'passion'
    },
    {
        text: 'Passion is energy. Feel the power that comes from focusing.',
        author: 'Oprah Winfrey',
        category: 'passion'
    },
    {
        text: 'Nothing great in the world has been accomplished without passion.',
        author: 'Georg Wilhelm Friedrich Hegel',
        category: 'passion'
    },
    {
        text: "Find your why and you'll find your way.",
        author: 'John C. Maxwell',
        category: 'passion'
    },
    { text: 'Purpose guides, passion fuels.', author: 'Unknown', category: 'passion' },
    {
        text: "When you have a clear purpose, you won't have time for negativity.",
        author: 'Mark Victor Hansen',
        category: 'passion'
    },
    {
        text: 'The two most important days in your life are the day you are born.',
        author: 'Mark Twain',
        category: 'passion'
    },
    {
        text: 'Your work is going to fill a large part of your life.',
        author: 'Steve Jobs',
        category: 'passion'
    },
    { text: 'Passion is the genesis of genius.', author: 'Tony Robbins', category: 'passion' },
    { text: 'Do what you love, love what you do.', author: 'Unknown', category: 'passion' },

    // EXCELLENCE & QUALITY (30-60 characters)
    { text: 'Excellence is never an accident.', author: 'Aristotle', category: 'excellence' },
    { text: 'Quality is not an act, it is a habit.', author: 'Aristotle', category: 'excellence' },
    {
        text: 'Strive for perfection in everything you do.',
        author: 'Vince Lombardi',
        category: 'excellence'
    },
    {
        text: 'Excellence is doing ordinary things extraordinarily well.',
        author: 'John W. Gardner',
        category: 'excellence'
    },
    {
        text: "The quality of a person's life is in direct proportion to their commitment.",
        author: 'Vince Lombardi',
        category: 'excellence'
    },
    { text: 'We are what we repeatedly do.', author: 'Aristotle', category: 'excellence' },
    { text: 'Good enough never is.', author: 'Debbi Fields', category: 'excellence' },
    {
        text: 'Excellence is the gradual result of always striving to do better.',
        author: 'Pat Riley',
        category: 'excellence'
    },
    {
        text: 'The secret to getting ahead is getting started.',
        author: 'Mark Twain',
        category: 'excellence'
    },
    {
        text: 'Perfection is not attainable, but if we chase perfection we can catch excellence.',
        author: 'Vince Lombardi',
        category: 'excellence'
    },

    // NEW QUOTES (161)
    { text: 'Rise up.', author: 'Unknown', category: 'motivation' },
    { text: 'Stay sharp.', author: 'Unknown', category: 'focus' },
    { text: 'Own it.', author: 'Unknown', category: 'success' },
    { text: 'Keep climbing.', author: 'Unknown', category: 'motivation' },
    { text: 'Be bold.', author: 'Unknown', category: 'courage' },
    { text: 'Move fast.', author: 'Unknown', category: 'productivity' },
    { text: 'Think big.', author: 'Unknown', category: 'innovation' },
    { text: 'Stay true.', author: 'Unknown', category: 'wisdom' },
    { text: 'Act bold.', author: 'Unknown', category: 'courage' },
    { text: 'Grow daily.', author: 'Unknown', category: 'motivation' },
    { text: 'Push past your limits.', author: 'Unknown', category: 'motivation' },
    { text: 'Fear less, do more.', author: 'Unknown', category: 'motivation' },
    { text: 'Grow through struggle.', author: 'Unknown', category: 'motivation' },
    { text: 'Dare to begin.', author: 'Unknown', category: 'motivation' },
    { text: 'Keep your fire lit.', author: 'Unknown', category: 'motivation' },
    { text: 'Rise above doubt.', author: 'Unknown', category: 'motivation' },
    { text: 'Chase your vision.', author: 'Unknown', category: 'motivation' },
    { text: 'Embrace the grind.', author: 'Unknown', category: 'motivation' },
    { text: 'Stay relentless.', author: 'Unknown', category: 'motivation' },
    { text: 'Ignite your drive.', author: 'Unknown', category: 'motivation' },
    { text: 'Do one thing well.', author: 'Unknown', category: 'productivity' },
    { text: 'Plan today, win tomorrow.', author: 'Unknown', category: 'productivity' },
    { text: 'Finish what you start.', author: 'Unknown', category: 'productivity' },
    { text: 'Time is your asset.', author: 'Unknown', category: 'productivity' },
    { text: 'Focus fuels success.', author: 'Unknown', category: 'focus' },
    { text: 'Avoid the trivial.', author: 'Unknown', category: 'focus' },
    { text: 'Work with purpose.', author: 'Unknown', category: 'productivity' },
    { text: 'Clarity drives action.', author: 'Unknown', category: 'focus' },
    { text: 'Prioritize, then execute.', author: 'Unknown', category: 'productivity' },
    { text: 'Master your minutes.', author: 'Unknown', category: 'productivity' },
    { text: 'Simplify your tasks.', author: 'Unknown', category: 'productivity' },
    { text: 'Small wins build success.', author: 'Unknown', category: 'success' },
    { text: 'Effort shapes your future.', author: 'Unknown', category: 'success' },
    { text: 'Success rewards persistence.', author: 'Unknown', category: 'success' },
    { text: 'Dream, plan, achieve.', author: 'Unknown', category: 'success' },
    { text: 'Build your own path.', author: 'Unknown', category: 'success' },
    { text: 'Thrive under pressure.', author: 'Unknown', category: 'success' },
    { text: 'Victory loves preparation.', author: 'Unknown', category: 'success' },
    { text: 'Aim high, act now.', author: 'Unknown', category: 'success' },
    { text: 'Persistence beats talent.', author: 'Unknown', category: 'success' },
    { text: 'Success is earned daily.', author: 'Unknown', category: 'success' },
    { text: 'Win through discipline.', author: 'Unknown', category: 'success' },
    { text: 'Invent your future.', author: 'Unknown', category: 'innovation' },
    { text: "Create, don't copy.", author: 'Unknown', category: 'creativity' },
    { text: 'Think outside the box.', author: 'Unknown', category: 'innovation' },
    { text: 'Ideas spark progress.', author: 'Unknown', category: 'innovation' },
    { text: 'Simplify to innovate.', author: 'Unknown', category: 'innovation' },
    { text: 'Art meets function.', author: 'Unknown', category: 'creativity' },
    { text: 'Build to improve.', author: 'Unknown', category: 'innovation' },
    { text: 'Imagination drives change.', author: 'Unknown', category: 'creativity' },
    { text: 'Code with creativity.', author: 'Unknown', category: 'innovation' },
    { text: 'Solve problems simply.', author: 'Unknown', category: 'innovation' },
    { text: 'Innovate with purpose.', author: 'Unknown', category: 'innovation' },
    { text: 'Know yourself deeply.', author: 'Socrates', category: 'wisdom' },
    { text: 'Wisdom grows with time.', author: 'Unknown', category: 'wisdom' },
    { text: 'Seek truth always.', author: 'Unknown', category: 'wisdom' },
    { text: 'Balance is harmony.', author: 'Unknown', category: 'wisdom' },
    { text: 'Learn from silence.', author: 'Unknown', category: 'wisdom' },
    { text: 'Live with intention.', author: 'Unknown', category: 'wisdom' },
    { text: 'Wisdom is humility.', author: 'Unknown', category: 'wisdom' },
    { text: 'See beyond the surface.', author: 'Unknown', category: 'wisdom' },
    { text: 'Truth frees the mind.', author: 'Unknown', category: 'wisdom' },
    { text: 'Reflect to grow.', author: 'Unknown', category: 'wisdom' },
    { text: 'Endure to succeed.', author: 'Unknown', category: 'motivation' },
    { text: 'Bounce back stronger.', author: 'Unknown', category: 'motivation' },
    { text: 'Keep moving forward.', author: 'Unknown', category: 'motivation' },
    { text: 'Resilience is power.', author: 'Unknown', category: 'motivation' },
    { text: 'Overcome every obstacle.', author: 'Unknown', category: 'motivation' },
    { text: 'Persist through pain.', author: 'Unknown', category: 'motivation' },
    { text: 'Failure fuels growth.', author: 'Unknown', category: 'motivation' },
    { text: 'Stand firm, keep going.', author: 'Unknown', category: 'motivation' },
    { text: 'Rise after every fall.', author: 'Unknown', category: 'motivation' },
    { text: 'Grit wins battles.', author: 'Unknown', category: 'motivation' },
    { text: 'Lead with integrity.', author: 'Unknown', category: 'success' },
    { text: 'Inspire through action.', author: 'Unknown', category: 'success' },
    { text: 'Grow by lifting others.', author: 'Unknown', category: 'success' },
    { text: 'Lead with vision.', author: 'Unknown', category: 'success' },
    { text: 'Empower, don’t control.', author: 'Unknown', category: 'success' },
    { text: 'Serve to lead.', author: 'Unknown', category: 'success' },
    { text: 'Build trust daily.', author: 'Unknown', category: 'success' },
    { text: 'Lead through change.', author: 'Unknown', category: 'success' },
    { text: 'Mentor, don’t dictate.', author: 'Unknown', category: 'success' },
    { text: 'Leadership is service.', author: 'Unknown', category: 'success' },
    { text: 'Code with clarity.', author: 'Unknown', category: 'innovation' },
    { text: 'Build, test, improve.', author: 'Unknown', category: 'innovation' },
    { text: 'Tech solves problems.', author: 'Unknown', category: 'innovation' },
    { text: 'Debug with patience.', author: 'Unknown', category: 'innovation' },
    { text: 'Write readable code.', author: 'Unknown', category: 'innovation' },
    { text: 'Automate to save time.', author: 'Unknown', category: 'innovation' },
    { text: 'Tech drives progress.', author: 'Unknown', category: 'innovation' },
    { text: 'Optimize for users.', author: 'Unknown', category: 'innovation' },
    { text: 'Code is collaboration.', author: 'Unknown', category: 'innovation' },
    { text: 'Start small, scale big.', author: 'Unknown', category: 'business' },
    { text: 'Listen to your customers.', author: 'Unknown', category: 'business' },
    { text: 'Risk leads to reward.', author: 'Unknown', category: 'business' },
    { text: 'Build value daily.', author: 'Unknown', category: 'business' },
    { text: 'Adapt to survive.', author: 'Unknown', category: 'business' },
    { text: 'Solve real problems.', author: 'Unknown', category: 'business' },
    { text: 'Hustle with heart.', author: 'Unknown', category: 'business' },
    { text: 'Learn from failure.', author: 'Unknown', category: 'business' },
    { text: 'Design with empathy.', author: 'Unknown', category: 'creativity' },
    { text: 'Beauty in simplicity.', author: 'Unknown', category: 'creativity' },
    { text: 'Create with purpose.', author: 'Unknown', category: 'creativity' },
    { text: 'Form follows function.', author: 'Unknown', category: 'creativity' },
    { text: 'Design shapes culture.', author: 'Unknown', category: 'creativity' },
    { text: 'Craft with care.', author: 'Unknown', category: 'creativity' },
    { text: 'Art inspires change.', author: 'Unknown', category: 'creativity' },
    { text: 'Mindset shapes reality.', author: 'Unknown', category: 'mindset' },
    { text: 'Stay open to growth.', author: 'Unknown', category: 'mindset' },
    { text: 'Choose positive thoughts.', author: 'Unknown', category: 'mindset' },
    { text: 'Own your perspective.', author: 'Unknown', category: 'mindset' },
    { text: 'Embrace challenges.', author: 'Unknown', category: 'mindset' },
    { text: 'Think, then act.', author: 'Unknown', category: 'mindset' },
    { text: 'Growth is a choice.', author: 'Unknown', category: 'mindset' },
    { text: 'Use time wisely.', author: 'Unknown', category: 'productivity' },
    { text: 'Seize every moment.', author: 'Unknown', category: 'motivation' },
    { text: 'Plan for tomorrow.', author: 'Unknown', category: 'productivity' },
    { text: 'Live in the now.', author: 'Unknown', category: 'wisdom' },
    { text: 'Time shapes destiny.', author: 'Unknown', category: 'wisdom' },
    { text: 'Act before it’s late.', author: 'Unknown', category: 'productivity' },
    { text: 'Learn from mistakes.', author: 'Unknown', category: 'wisdom' },
    { text: 'Curiosity fuels growth.', author: 'Unknown', category: 'wisdom' },
    { text: 'Seek knowledge daily.', author: 'Unknown', category: 'wisdom' },
    { text: 'Grow through learning.', author: 'Unknown', category: 'wisdom' },
    { text: 'Study to succeed.', author: 'Unknown', category: 'wisdom' },
    { text: 'Joy is in the journey.', author: 'Unknown', category: 'happiness' },
    { text: 'Smile, it’s contagious.', author: 'Unknown', category: 'happiness' },
    { text: 'Find peace within.', author: 'Unknown', category: 'happiness' },
    { text: 'Live for today.', author: 'Unknown', category: 'happiness' },
    { text: 'Happiness is sharing.', author: 'Unknown', category: 'happiness' },
    { text: 'Face fear head-on.', author: 'Unknown', category: 'courage' },
    { text: 'Believe in yourself.', author: 'Unknown', category: 'courage' },
    { text: 'Take the leap.', author: 'Unknown', category: 'courage' },
    { text: 'Courage builds character.', author: 'Unknown', category: 'courage' },
    { text: 'Discipline drives results.', author: 'Unknown', category: 'focus' },
    { text: 'Stay on your path.', author: 'Unknown', category: 'focus' },
    { text: 'Focus, don’t scatter.', author: 'Unknown', category: 'focus' },
    { text: 'Embrace new beginnings.', author: 'Unknown', category: 'change' },
    { text: 'Adapt to thrive.', author: 'Unknown', category: 'change' },
    { text: 'Change sparks growth.', author: 'Unknown', category: 'change' },
    { text: 'Live with passion.', author: 'Unknown', category: 'passion' },
    { text: 'Find your purpose.', author: 'Unknown', category: 'passion' },
    { text: 'Purpose ignites joy.', author: 'Unknown', category: 'passion' },
    { text: 'Aim for excellence.', author: 'Unknown', category: 'excellence' },
    { text: 'Quality over quantity.', author: 'Unknown', category: 'excellence' },
    { text: 'Strive to be better.', author: 'Unknown', category: 'excellence' }
];

/**
 * Main NEXUS application class
 *
 * Manages the entire new tab experience including time display, settings,
 * themes, fonts, and all interactive features. Uses a modular architecture
 * with proper error handling and performance optimization.
 */
class Nexus {
    /**
     * Initialize NEXUS with default settings and core systems
     *
     * Sets up the application state, font collections, typography themes,
     * and initializes all subsystems in the correct order for optimal
     * loading performance.
     */
    constructor() {
        /**
         * Default application settings
         * These values are used when no user preferences exist
         * @type {Object}
         */
        this.defaultSettings = {
            timeFormat24: false,
            showSeconds: false,
            gridBackground: true,
            smoothAnimations: true,
            colorTheme: 'blue',
            typographyTheme: 'classic-pro',
            clockFont: 'JetBrains Mono',

            smartDateFeatures: true,
            selectedSmartDateFeatures: ['week-number', 'year-progress', 'days-to-weekend'],
            focusTimer: false,
            quickNotes: false,
            dailyQuotes: true,
            todoList: false
        };

        /**
         * Current user settings (merged with defaults)
         * @type {Object}
         */
        this.settings = { ...this.defaultSettings };

        /**
         * Premium font collection with instant loading
         *
         * Includes both locally bundled premium fonts and system fonts
         * for maximum compatibility and performance. All fonts load
         * instantly without FOUT (Flash of Unstyled Text).
         *
         * @type {Array<Object>}
         */
        this.availableFonts = [
            // Local premium fonts (bundled with extension)
            { name: 'Inter', family: '"Inter", sans-serif', type: 'sans-serif', local: true },
            { name: 'Geist', family: '"Geist", sans-serif', type: 'sans-serif', local: true },
            { name: 'Satoshi', family: '"Satoshi", sans-serif', type: 'sans-serif', local: true },
            {
                name: 'JetBrains Mono',
                family: '"JetBrains Mono", monospace',
                type: 'monospace',
                local: true
            },
            {
                name: 'Cascadia Code',
                family: '"Cascadia Code", monospace',
                type: 'monospace',
                local: true
            },

            // System fonts (available on most devices)
            {
                name: 'SF Pro',
                family: '-apple-system, BlinkMacSystemFont, sans-serif',
                type: 'system',
                system: true
            },
            {
                name: 'SF Mono',
                family: '"SF Mono", Monaco, Consolas, monospace',
                type: 'monospace',
                system: true
            },
            { name: 'Segoe UI', family: '"Segoe UI", sans-serif', type: 'system', system: true },

            // Classic fallback fonts (universal compatibility)
            {
                name: 'Times New Roman',
                family: '"Times New Roman", serif',
                type: 'serif',
                system: true
            },
            { name: 'Georgia', family: '"Georgia", serif', type: 'serif', system: true }
        ];

        /**
         * Typography theme system
         *
         * Curated font combinations inspired by popular design systems.
         * Each theme defines fonts for different UI contexts (display, body, UI, clock)
         * and includes preview information for the settings panel.
         *
         * @type {Object<string, Object>}
         */
        this.typographyThemes = {
            'classic-pro': {
                name: 'Classic Professional',
                description: 'Inter + SF Mono • Clean & readable',
                display: 'Inter',
                body: 'Inter',
                ui: 'Inter',
                clock: 'SF Mono',
                className: 'typography-classic-pro',
                preview: {
                    title: 'Professional',
                    subtitle: 'Clean & Readable',
                    code: 'SF Mono'
                }
            },
            'modern-tech': {
                name: 'Modern Tech',
                description: 'Geist + JetBrains Mono • Vercel inspired',
                display: 'Geist',
                body: 'Geist',
                ui: 'Geist',
                clock: 'JetBrains Mono',
                className: 'typography-modern-tech',
                preview: {
                    title: 'Modern',
                    subtitle: 'Tech Forward',
                    code: 'JetBrains'
                }
            },
            creative: {
                name: 'Creative Designer',
                description: 'Satoshi + Cascadia Code • Geometric style',
                display: 'Satoshi',
                body: 'Satoshi',
                ui: 'Satoshi',
                clock: 'Cascadia Code',
                className: 'typography-creative',
                preview: {
                    title: 'Creative',
                    subtitle: 'Geometric Style',
                    code: 'Cascadia'
                }
            },
            apple: {
                name: 'Apple Ecosystem',
                description: 'SF Pro + SF Mono • Native macOS feel',
                display: 'SF Pro',
                body: 'SF Pro',
                ui: 'SF Pro',
                clock: 'SF Mono',
                className: 'typography-apple',
                preview: {
                    title: 'Apple',
                    subtitle: 'Native Feel',
                    code: 'SF Mono'
                }
            },
            microsoft: {
                name: 'Microsoft Modern',
                description: 'Segoe UI + Cascadia Code • Windows style',
                display: 'Segoe UI',
                body: 'Segoe UI',
                ui: 'Segoe UI',
                clock: 'Cascadia Code',
                className: 'typography-microsoft',
                preview: {
                    title: 'Microsoft',
                    subtitle: 'Modern Windows',
                    code: 'Cascadia'
                }
            }
        };

        // ===== SYSTEM INITIALIZATION =====

        /**
         * Notification system for user feedback
         * Handles success, error, info, and confirmation messages
         */
        this.notificationSystem = new NotificationSystem();

        // Expose notification system globally for debugging and external access
        window.notifications = this.notificationSystem;

        /**
         * Shared cache manager for fonts and favicons
         * Uses IndexedDB for persistent storage with automatic cleanup
         */
        this.cacheManager = NexusCacheManager.getInstance();

        // Initialize local fonts immediately (no loading delay)
        this.initializeLocalFonts();

        // Schedule automatic cache maintenance
        this.scheduleCacheCleanup();

        /**
         * Font loading state
         * Local fonts are always ready since they're bundled with the extension
         */
        this.fontsReady = true;
        this.pendingFontApplication = null;

        /**
         * Daily quotes initialization state
         * Tracks whether quotes system has been initialized to prevent duplicate setup
         */
        this.quotesInitialized = false;

        /**
         * Pomodoro focus timer state
         * Default 25-minute sessions with pause/resume functionality
         */
        this.focusTimer = {
            duration: 25 * 60, // 25 minutes in seconds (standard Pomodoro)
            remaining: 25 * 60, // Time remaining in current session
            isRunning: false, // Timer active state
            isPaused: false, // Timer paused state
            interval: null // setInterval reference for cleanup
        };

        /**
         * Smart date features optimization
         * Tracks content hash to avoid unnecessary DOM updates
         */
        this.lastSmartDateHash = null;

        /**
         * Quick notes overlay state
         * Persistent note-taking with auto-save functionality
         */
        this.quickNotesContent = '';
        this.quickNotesVisible = false;
        this.saveTimeout = null;

        /**
         * Todo list panel state
         * Task management with persistent storage
         */
        this.todoTasks = [];
        this.todoVisible = false;
        this.todoSaveTimeout = null;
        this.focusedTaskIndex = -1; // Currently focused task for keyboard navigation

        /**
         * Modal exclusivity system
         * Ensures only one panel/modal is open at a time
         */
        this.activeModal = null; // 'settings', 'todo', 'notes', 'shortcuts'

        /**
         * Drag & Drop state
         * Modern pointer-based drag and drop implementation
         */
        this.dragState = {
            isDragging: false,
            draggedElement: null,
            draggedIndex: -1,
            dropTarget: null,
            dropPosition: null, // 'above' or 'below'
            startY: 0,
            currentY: 0,
            offsetY: 0
        };

        /**
         * Quick shortcuts panel instance
         * Initialized lazily for better performance
         */
        this.quickShortcuts = null;

        /**
         * Performance optimization: pre-bound event handlers
         * Prevents function recreation on every event listener setup
         */
        this.boundFunctions = {
            updateTime: this.updateTime.bind(this),
            handleKeydown: this.handleKeydown.bind(this),
            updateTabMemoryState: this.updateTabMemoryButtonState.bind(this)
        };

        // ===== PERFORMANCE MONITORING (DEVELOPMENT ONLY) =====
        const show_performance = false; // Set to true for performance debugging

        let initStartTime;
        if (show_performance) {
            initStartTime = performance.now();
            console.log('🚀 NEXUS: Starting initialization...');
        }

        // ===== INITIALIZATION SEQUENCE =====
        // Order matters for optimal loading performance

        this.setupErrorHandling(); // Error boundaries first
        this.setupClockSync(); // System clock synchronization
        this.initCore(); // Core features immediately
        this.deferredInit(); // Non-critical features when idle

        // ===== PERFORMANCE REPORTING (DEVELOPMENT ONLY) =====
        if (show_performance) {
            const initEndTime = performance.now();
            const initDuration = initEndTime - initStartTime;
            console.log(`✅ NEXUS: Initialization complete in ${initDuration.toFixed(2)}ms`);

            // Store performance data for debugging
            window.nexusPerformance = {
                initTime: initDuration,
                startTime: initStartTime,
                endTime: initEndTime
            };
        }
    }

    /**
     * ===== ERROR HANDLING & RESILIENCE =====
     *
     * Implements comprehensive error boundaries to ensure the extension
     * continues working even when individual features fail. Critical
     * features like the clock are protected with automatic recovery.
     */

    /**
     * Set up global error handlers for graceful degradation
     *
     * Catches both synchronous errors and unhandled promise rejections,
     * implementing specific recovery strategies for different error types.
     * Prevents any single failure from breaking the entire extension.
     * Includes enhanced development error reporting for debugging.
     */
    setupErrorHandling() {
        // ===== DEVELOPMENT MODE DETECTION =====
        // Check if we're in development mode for enhanced error reporting
        const isDevelopment =
            !('update_url' in chrome.runtime.getManifest()) ||
            window.location.protocol === 'file:' ||
            window.location.hostname === 'localhost';

        // ===== ENHANCED DEVELOPMENT ERROR REPORTING =====
        if (isDevelopment) {
            // Comprehensive error logging for development
            window.addEventListener('error', e => {
                console.group('🐛 NEXUS Error Details');
                console.error('Error:', e.error);
                console.log('Message:', e.message);
                console.log('Filename:', e.filename);
                console.log('Line:', e.lineno, 'Column:', e.colno);
                console.log('Stack:', e.error?.stack);
                console.log('Context:', window.location.href);
                console.log('User Agent:', navigator.userAgent);
                console.log('Timestamp:', new Date().toISOString());
                console.groupEnd();

                // Critical feature protection: ensure clock always works
                if (e.error?.message?.includes('clock') || e.error?.message?.includes('time')) {
                    this.ensureClockWorking();
                }

                // Don't prevent default in development to see errors
            });

            // Enhanced promise rejection logging for development
            window.addEventListener('unhandledrejection', e => {
                console.group('🚨 NEXUS Promise Rejection');
                console.error('Reason:', e.reason);
                console.log('Promise:', e.promise);
                console.log('Stack:', e.reason?.stack);
                console.log('Context:', window.location.href);
                console.log('Timestamp:', new Date().toISOString());
                console.groupEnd();

                // Storage error fallback: gracefully degrade to localStorage
                if (e.reason?.message?.includes('storage')) {
                    console.warn('🔄 Storage fallback will be handled automatically');
                }

                // CSP violation handling: use fallback resources
                if (
                    e.reason?.message?.includes('Content Security Policy') ||
                    e.reason?.message?.includes('CSP') ||
                    e.reason?.message?.includes('connect-src')
                ) {
                    console.warn('🛡️ CSP violation - fallback resources will be used');
                }

                // Don't prevent default in development to see errors
            });
        } else {
            // ===== PRODUCTION ERROR HANDLING =====
            // Silent error handling for production stability
            window.addEventListener('error', e => {
                // Critical feature protection: ensure clock always works
                if (e.error?.message?.includes('clock') || e.error?.message?.includes('time')) {
                    this.ensureClockWorking();
                }

                // Prevent error propagation that could break the extension
                e.preventDefault();
            });

            // Promise rejection handler for async errors
            window.addEventListener('unhandledrejection', e => {
                // Storage error fallback: gracefully degrade to localStorage
                if (e.reason?.message?.includes('storage')) {
                    // Automatic fallback handled in storage methods
                }

                // CSP violation handling: use fallback resources
                if (
                    e.reason?.message?.includes('Content Security Policy') ||
                    e.reason?.message?.includes('CSP') ||
                    e.reason?.message?.includes('connect-src')
                ) {
                    // Fallback icons and resources handled in respective modules
                }

                // Prevent unhandled rejection from breaking the extension
                e.preventDefault();
            });
        }
    }

    /**
     * Set up system clock synchronization for accuracy
     *
     * Implements immediate clock refresh when the tab becomes visible to handle
     * system clock changes, sleep/wake cycles, and timezone adjustments.
     * Ensures the displayed time is always accurate when users return to the tab.
     */
    setupClockSync() {
        // ===== VISIBILITY CHANGE HANDLER =====
        // Immediate clock refresh when tab becomes visible
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                // Tab became visible - immediately refresh clock for accuracy
                this.updateTime();

                // Also refresh date-related features that might be affected
                if (this.settings.smartDateFeatures) {
                    this.updateSmartDateFeatures();
                }
            }
        });

        // ===== FOCUS HANDLER FOR ADDITIONAL ACCURACY =====
        // Refresh clock when window regains focus (covers edge cases)
        window.addEventListener('focus', () => {
            this.updateTime();
        });

        // ===== PAGE SHOW HANDLER FOR BROWSER NAVIGATION =====
        // Handle browser back/forward navigation and cache restoration
        window.addEventListener('pageshow', e => {
            // Force refresh if page was restored from cache
            if (e.persisted) {
                this.updateTime();
                if (this.settings.smartDateFeatures) {
                    this.updateSmartDateFeatures();
                }
            }
        });
    }

    /**
     * Emergency clock recovery system
     *
     * Ensures the primary time display continues working even if other
     * systems fail. This is the most critical feature that users expect
     * to always function.
     */
    ensureClockWorking() {
        if (!this.clockInterval) {
            this.startClock();
        }
    }

    /**
     * Core initialization sequence
     *
     * Loads essential features immediately for fast perceived performance.
     * This includes settings, clock, and basic UI. Critical path is kept
     * minimal to ensure quick startup.
     */
    async initCore() {
        const show_performance = false; // Set to true for performance debugging
        let coreStartTime;

        if (show_performance) {
            coreStartTime = performance.now();
        }

        await this.loadSettings(); // Load user preferences first
        if (show_performance) {
            console.log(
                `⚙️  Settings loaded in ${(performance.now() - coreStartTime).toFixed(2)}ms`
            );
        }

        this.startClock(); // Start time display immediately
        if (show_performance) {
            console.log(`🕐 Clock started in ${(performance.now() - coreStartTime).toFixed(2)}ms`);
        }

        this.applySettings(); // Apply loaded settings to UI
        if (show_performance) {
            console.log(
                `🎨 Settings applied in ${(performance.now() - coreStartTime).toFixed(2)}ms`
            );
        }

        // Initialize smart date features if enabled
        if (this.settings.smartDateFeatures) {
            this.updateSmartDateFeatures();
        }

        // Initialize daily quotes system if enabled
        if (this.settings.dailyQuotes) {
            this.initDailyQuotes();
            this.quotesInitialized = true;
        }

        // Initialize todo list if enabled
        if (this.settings.todoList) {
            this.loadTodoTasks();
        }
    }

    /**
     * Deferred initialization for non-critical features
     *
     * Uses requestIdleCallback to initialize secondary features when the
     * browser is idle, ensuring the main UI remains responsive. Falls back
     * to setTimeout for browsers without idle callback support.
     */
    deferredInit() {
        const initSecondaryFeatures = () => {
            this.setupEventListeners(); // Keyboard shortcuts and interactions
            this.initQuickShortcuts(); // Quick shortcuts panel
            this.startTabMemoryStateUpdater(); // Tab memory system
            this.showKeyboardHints(); // First-time user guidance
        };

        // Use idle callback for better performance when available
        if (window.requestIdleCallback) {
            requestIdleCallback(initSecondaryFeatures);
        } else {
            // Fallback for older browsers
            setTimeout(initSecondaryFeatures, 100);
        }
    }

    /**
     * ===== QUICK SHORTCUTS INITIALIZATION =====
     *
     * Lazy initialization of the quick shortcuts panel system.
     * This feature provides AI-powered tab prediction and quick access
     * to bookmarks, top sites, and recent tabs.
     */

    /**
     * Initialize the quick shortcuts panel
     *
     * Creates the QuickShortcuts instance if available and exposes it
     * globally for debugging. Fails gracefully if the module is missing.
     */
    initQuickShortcuts() {
        try {
            if (typeof QuickShortcuts !== 'undefined') {
                this.quickShortcuts = new QuickShortcuts();
                window.quickShortcuts = this.quickShortcuts; // Debug access

                // Expose tab memory system globally for debugging (with delay for initialization)
                setTimeout(() => {
                    if (this.quickShortcuts.tabMemory) {
                        window.tabMemory = this.quickShortcuts.tabMemory;
                    }
                }, 100);
            }
        } catch (error) {
            // QuickShortcuts is optional - extension works without it
        }
    }

    /**
     * ===== FIRST-TIME USER GUIDANCE =====
     *
     * Provides subtle, non-intrusive hints to help new users discover
     * keyboard shortcuts and features. Only shown once per user.
     */

    /**
     * Show keyboard hints for first-time users
     *
     * Displays a sequence of helpful hints about keyboard shortcuts.
     * Uses localStorage to ensure hints are only shown once per user.
     * Timing is carefully orchestrated to avoid overwhelming the user.
     */
    showKeyboardHints() {
        // Skip if user has already seen the hints
        const hasSeenHints = localStorage.getItem('nexus-hints-seen');
        if (hasSeenHints) return;

        // Simple, focused hint sequence (2-3 most important shortcuts)
        setTimeout(() => {
            this.showHint('Press S for Settings', 3000);

            setTimeout(() => {
                this.showHint('Press K for Quick Shortcuts', 3000);

                // Mark as seen to prevent future displays
                localStorage.setItem('nexus-hints-seen', 'true');
            }, 4000);
        }, 2000); // Initial delay allows UI to settle
    }

    /**
     * Display a temporary hint message to the user
     *
     * Creates a styled tooltip-like element that appears at the bottom
     * of the screen, fades in smoothly, and automatically disappears.
     * Uses notification system colors for consistency.
     *
     * @param {string} message - The hint text to display
     * @param {number} duration - How long to show the hint (default: 3000ms)
     */
    showHint(message, duration = 3000) {
        // Create the hint element with modern styling
        const hint = document.createElement('div');
        hint.className = 'keyboard-hint';
        hint.textContent = message;

        // Apply notification system colors with original simple design
        hint.style.cssText = `
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.95);
            color: #1f2937;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 0.875rem;
            font-family: var(--font-ui);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;

        document.body.appendChild(hint);

        // Smooth fade-in animation
        requestAnimationFrame(() => {
            hint.style.opacity = '1';
        });

        // Auto-hide with fade-out animation
        setTimeout(() => {
            hint.style.opacity = '0';
            setTimeout(() => {
                if (hint.parentNode) {
                    hint.parentNode.removeChild(hint);
                }
            }, 300); // Wait for fade-out transition
        }, duration);
    }

    /**
     * ===== SETTINGS MANAGEMENT =====
     *
     * Handles loading and saving user preferences with multiple fallback
     * strategies for maximum reliability across different browsers and
     * storage scenarios. Implements graceful degradation.
     */

    /**
     * Load user settings from storage
     *
     * Attempts to load settings from browser storage APIs with multiple
     * fallback strategies:
     * 1. Chrome/Firefox sync storage (cross-device sync)
     * 2. Local extension storage (device-specific)
     * 3. localStorage (final fallback)
     *
     * Ensures critical settings like selectedSmartDateFeatures always exist
     * with sensible defaults.
     *
     * @async
     * @returns {Promise<void>}
     */
    async loadSettings() {
        try {
            // Cross-browser API detection
            const api = typeof browser !== 'undefined' && browser.runtime ? browser : chrome;

            if (api?.storage?.sync) {
                // Preferred: sync storage for cross-device settings
                const result = await api.storage.sync.get(this.settings);
                this.settings = { ...this.settings, ...result };
            } else if (api?.storage?.local) {
                // Fallback: local storage for single-device settings
                const result = await api.storage.local.get(this.settings);
                this.settings = { ...this.settings, ...result };
            }

            // Ensure critical settings exist with simplified defaults
            if (!this.settings.selectedSmartDateFeatures) {
                this.settings.selectedSmartDateFeatures = ['weekend-status']; // Start simple
                this.saveSettings();
            }
        } catch (error) {
            // Final fallback: localStorage for maximum compatibility
            try {
                const saved = localStorage.getItem('nexus-settings');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    this.settings = { ...this.settings, ...parsed };
                }

                // Ensure simplified defaults even in fallback mode
                if (!this.settings.selectedSmartDateFeatures) {
                    this.settings.selectedSmartDateFeatures = ['weekend-status']; // Start simple
                    this.saveSettings();
                }
            } catch (localError) {
                // Complete failure: use defaults (already set in constructor)
            }
        }
    }

    /**
     * Save user settings to storage
     *
     * Implements a multi-tier saving strategy for maximum reliability:
     * 1. localStorage first (for instant theme loading on next startup)
     * 2. Browser sync storage (for cross-device synchronization)
     * 3. Local extension storage (fallback)
     * 4. localStorage again (final fallback)
     *
     * The localStorage-first approach is critical for preventing theme
     * flash during extension startup.
     *
     * @async
     * @returns {Promise<void>}
     */
    async saveSettings() {
        try {
            // CRITICAL: localStorage first prevents theme flash on startup
            localStorage.setItem('nexus-settings', JSON.stringify(this.settings));

            // Cross-browser API detection for extension storage
            const api = typeof browser !== 'undefined' && browser.runtime ? browser : chrome;

            if (api?.storage?.sync) {
                // Preferred: sync storage for cross-device settings
                await api.storage.sync.set(this.settings);
            } else if (api?.storage?.local) {
                // Fallback: local extension storage
                await api.storage.local.set(this.settings);
            }
        } catch (error) {
            // Final fallback: ensure localStorage always has current settings
            try {
                localStorage.setItem('nexus-settings', JSON.stringify(this.settings));
            } catch (localError) {
                // Complete storage failure - settings lost until next change
            }
        }
    }

    /**
     * Apply all loaded settings to the UI
     *
     * Orchestrates the application of user preferences to all UI elements.
     * This method is called during initialization and whenever settings change.
     * Order of operations is important to prevent visual glitches.
     *
     * Process:
     * 1. Apply visual settings (background, animations, themes)
     * 2. Update form controls to match current settings
     * 3. Update dynamic UI components
     * 4. Refresh dependent systems
     */
    applySettings() {
        // ===== VISUAL SETTINGS =====

        // Grid background visibility
        const gridBackground = document.querySelector('.grid-background');
        if (gridBackground) {
            gridBackground.style.display = this.settings.gridBackground ? 'block' : 'none';
        }

        // Animation preferences (accessibility consideration)
        if (!this.settings.smoothAnimations) {
            document.body.classList.add('no-animations');
        } else {
            document.body.classList.remove('no-animations');
        }

        // Font system (must be applied before typography themes)
        this.applyFontSetting();

        // Theme system (order matters for CSS cascade)
        document.documentElement.setAttribute('data-theme', this.settings.colorTheme);
        this.applyTypographyTheme();

        // ===== FORM CONTROL SYNCHRONIZATION =====

        // Get all toggle elements (with null safety)
        const toggles = {
            timeFormat: document.getElementById('time-format'),
            showSeconds: document.getElementById('show-seconds'),
            gridBackground: document.getElementById('grid-background'),
            smoothAnimations: document.getElementById('smooth-animations'),
            smartDate: document.getElementById('smart-date-features'),
            focusTimer: document.getElementById('focus-timer'),
            quickNotes: document.getElementById('quick-notes'),
            dailyQuotes: document.getElementById('daily-quotes'),
            todoList: document.getElementById('todo-list')
        };

        // Update toggle states to match settings
        if (toggles.timeFormat) toggles.timeFormat.checked = this.settings.timeFormat24;
        if (toggles.showSeconds) toggles.showSeconds.checked = this.settings.showSeconds;
        if (toggles.gridBackground) toggles.gridBackground.checked = this.settings.gridBackground;
        if (toggles.smoothAnimations)
            toggles.smoothAnimations.checked = this.settings.smoothAnimations;
        if (toggles.smartDate) toggles.smartDate.checked = this.settings.smartDateFeatures;
        if (toggles.focusTimer) toggles.focusTimer.checked = this.settings.focusTimer;
        if (toggles.quickNotes) toggles.quickNotes.checked = this.settings.quickNotes;
        if (toggles.dailyQuotes) toggles.dailyQuotes.checked = this.settings.dailyQuotes;
        if (toggles.todoList) toggles.todoList.checked = this.settings.todoList;

        // ===== DYNAMIC UI UPDATES =====

        // Smart date feature selection UI
        this.updateSmartDateOptionsVisibility();
        requestAnimationFrame(() => {
            this.updateFeatureSelectionUI(); // Next frame to prevent layout thrashing
        });

        // Custom dropdown (if implemented)
        if (typeof this.updateCustomDropdown === 'function') {
            this.updateCustomDropdown();
        }

        // Theme selection UI updates
        this.updateColorThemeSelection();
        this.updateTypographySelection();
        this.updateSmartDateFeatures();

        // Feature-specific updates
        this.updateFocusTimer();
        this.updateDailyQuotes();
        this.updateQuickNotes();
        this.updateTodoList();

        // Settings state indicator
        this.updateResetButtonState();
    }

    /**
     * ===== FONT SYSTEM =====
     *
     * Manages the application of fonts to clock elements with instant loading.
     * Local fonts are bundled with the extension for zero-latency application.
     */

    /**
     * Apply the selected clock font setting
     *
     * Finds the user's selected font from the available collection and
     * applies it immediately. Local fonts are always ready since they're
     * bundled with the extension, eliminating FOUT (Flash of Unstyled Text).
     */
    applyFontSetting() {
        const selectedFont = this.availableFonts.find(
            font => font.name === this.settings.clockFont
        );
        if (!selectedFont) return;

        // Local fonts load instantly - no waiting required
        this.applyFontImmediately(selectedFont);
    }

    /**
     * Apply font directly to clock elements
     *
     * Updates the font-family CSS property on time display elements and
     * synchronizes CSS custom properties for consistency across the theme system.
     *
     * @param {Object} selectedFont - Font object from availableFonts array
     * @param {string} selectedFont.family - CSS font-family value
     * @param {string} selectedFont.name - Human-readable font name
     */
    applyFontImmediately(selectedFont) {
        // Target clock display elements
        const timeDisplay = document.querySelector('.time-display');
        const secondsDisplay = document.querySelector('.time-seconds');

        // Apply font to time elements
        if (timeDisplay) {
            timeDisplay.style.fontFamily = selectedFont.family;
        }
        if (secondsDisplay) {
            secondsDisplay.style.fontFamily = selectedFont.family;
        }

        // Synchronize with CSS custom properties for theme consistency
        document.documentElement.style.setProperty('--font-code', selectedFont.family);

        // Clear any pending font application
        this.pendingFontApplication = null;
    }

    /**
     * ===== TYPOGRAPHY THEME SYSTEM =====
     *
     * Manages comprehensive typography themes that affect fonts across
     * the entire extension. Each theme defines font families for different
     * UI contexts (display, body, UI, clock) for visual consistency.
     */

    /**
     * Apply typography theme to the entire extension
     *
     * Implements a two-phase approach to prevent visual glitches:
     * 1. Update CSS custom properties immediately
     * 2. Apply theme class for comprehensive styling
     *
     * This prevents the brief flash that can occur when switching between
     * themes with different monospace fonts.
     */
    applyTypographyTheme() {
        const themeId = this.settings.typographyTheme || 'classic-pro';
        const theme = this.typographyThemes[themeId];

        if (!theme) {
            return; // Invalid theme - use current styling
        }

        // CRITICAL: Update CSS variables first to prevent visual glitch
        const codeFontMapping = {
            'SF Mono': 'var(--font-sf-mono)',
            'JetBrains Mono': 'var(--font-jetbrains)',
            'Cascadia Code': 'var(--font-cascadia)'
        };

        const codeFontVariable = codeFontMapping[theme.clock];
        if (codeFontVariable) {
            // Apply all monospace font variables for consistency
            const monoProperties = [
                '--font-code',
                '--font-mono',
                '--font-mono-primary',
                '--font-mono-secondary'
            ];
            monoProperties.forEach(property => {
                document.documentElement.style.setProperty(property, codeFontVariable);
            });
        }

        // Clean slate: remove all existing typography theme classes
        Object.values(this.typographyThemes).forEach(themeObj => {
            document.body.classList.remove(themeObj.className);
        });

        // Apply the selected typography theme class
        document.body.classList.add(theme.className);
    }

    /**
     * Select and apply a typography theme
     *
     * Handles the complete process of switching typography themes including
     * settings persistence, UI updates, font synchronization, and user feedback.
     *
     * @param {string} themeId - The ID of the theme to apply (e.g., 'classic-pro')
     */
    selectTypographyTheme(themeId) {
        const theme = this.typographyThemes[themeId];
        if (!theme) {
            return; // Invalid theme ID
        }

        // Persist the selection
        this.settings.typographyTheme = themeId;
        this.saveSettings();

        // Apply visual changes
        this.applyTypographyTheme();

        // Ensure clock font matches the theme's monospace font
        this.syncClockFontWithTypographyTheme(theme);

        // Update settings panel UI to reflect selection
        this.updateTypographySelection();

        // Provide user feedback
        this.notificationSystem.show(
            'success',
            `${theme.name}`,
            `Typography • ${theme.preview.title} Style`,
            2000
        );

        // Update reset button state (theme change affects default comparison)
        this.updateResetButtonState();
    }

    /**
     * Synchronize clock font with typography theme selection
     *
     * Ensures the clock font matches the monospace font defined in the
     * selected typography theme. This maintains visual consistency and
     * prevents mismatched font combinations.
     *
     * Implements a multi-step process to prevent visual glitches:
     * 1. Map theme font to available font
     * 2. Update CSS variables immediately
     * 3. Apply font to clock elements
     * 4. Special handling for problematic fonts
     *
     * @param {Object} theme - Typography theme object with clock font definition
     */
    syncClockFontWithTypographyTheme(theme) {
        // Map typography theme font names to available font names
        const fontMapping = {
            'SF Mono': 'SF Mono',
            'JetBrains Mono': 'JetBrains Mono',
            'Cascadia Code': 'Cascadia Code'
        };

        const clockFontName = fontMapping[theme.clock];
        if (!clockFontName) return; // Theme uses unsupported font

        // Find the font in our available fonts collection
        const availableFont = this.availableFonts.find(font => font.name === clockFontName);
        if (!availableFont) return; // Font not available

        // CRITICAL: Update CSS variables first to prevent visual flash
        const codeFontMapping = {
            'SF Mono': 'var(--font-sf-mono)',
            'JetBrains Mono': 'var(--font-jetbrains)',
            'Cascadia Code': 'var(--font-cascadia)'
        };

        const codeFontVariable = codeFontMapping[clockFontName];
        if (codeFontVariable) {
            // Apply all monospace CSS variables immediately
            const monoProperties = [
                '--font-code',
                '--font-mono',
                '--font-mono-primary',
                '--font-mono-secondary'
            ];
            monoProperties.forEach(property => {
                document.documentElement.style.setProperty(property, codeFontVariable);
            });
        }

        // Update settings to reflect the synchronized font
        this.settings.clockFont = clockFontName;
        this.saveSettings();

        // Apply the font to clock elements
        this.applyFontImmediately(availableFont);

        // SPECIAL CASE: Cascadia Code requires explicit fallback chain
        if (clockFontName === 'Cascadia Code') {
            const timeElements = [
                document.querySelector('.time-display'),
                document.querySelector('.time-seconds')
            ];

            const cascadiaFontStack =
                '"Cascadia Code", "JetBrains Mono", "SF Mono", Monaco, Consolas, monospace';
            timeElements.forEach(element => {
                if (element) {
                    element.style.fontFamily = cascadiaFontStack;
                }
            });
        }
    }

    /**
     * ===== SETTINGS STATE MANAGEMENT =====
     *
     * Manages the state of settings relative to defaults and provides
     * visual feedback to users about modifications. Handles both general
     * settings and specialized AI/tab memory data.
     */

    /**
     * Check if current settings match default values
     *
     * Performs a deep comparison between current settings and defaults
     * using JSON serialization. This is used to determine whether to
     * show the "modified" indicator and enable reset functionality.
     *
     * @returns {boolean} True if settings are at default values
     */
    areSettingsAtDefault() {
        return JSON.stringify(this.settings) === JSON.stringify(this.defaultSettings);
    }

    /**
     * Update visual indicators for settings modification state
     *
     * Updates UI elements to reflect whether settings have been modified
     * from their default values. Also triggers tab memory button state
     * update since that system has separate reset logic.
     */
    updateResetButtonState() {
        const isAtDefault = this.areSettingsAtDefault();

        // Tab memory has separate reset logic (AI data vs settings)
        this.updateTabMemoryButtonState();

        // Update visual indicators for general settings
        const indicator = document.getElementById('settings-modified-indicator');
        const resetShortcutIcon = document.getElementById('reset-shortcut-icon');

        if (indicator) {
            indicator.classList.toggle('visible', !isAtDefault);
        }

        if (resetShortcutIcon) {
            resetShortcutIcon.classList.toggle('modified', !isAtDefault);
        }
    }

    /**
     * Update tab memory reset button state
     *
     * Checks for the presence of AI learning data and updates the reset
     * button accordingly. The tab memory system is separate from general
     * settings and requires its own reset logic based on collected data.
     *
     * @async
     * @returns {Promise<void>}
     */
    async updateTabMemoryButtonState() {
        const resetBtn = document.getElementById('reset-memory-btn');
        if (!resetBtn) return;

        // Check for AI learning data that can be reset
        let hasDataToReset = false;

        try {
            if (window.quickShortcuts?.tabMemory) {
                const analytics = window.quickShortcuts.tabMemory.getAnalytics();

                // Consider data present if any of these metrics exist
                hasDataToReset =
                    (analytics.totalInteractions || 0) > 0 ||
                    (analytics.totalSessions || 0) > 0 ||
                    Object.keys(analytics.patterns || {}).length > 0;
            }
        } catch (error) {
            hasDataToReset = false; // Safe default on error
        }

        // Update button state and appearance
        resetBtn.disabled = !hasDataToReset;
        resetBtn.classList.toggle('disabled', !hasDataToReset);

        // Update button text to reflect current state
        const buttonText = resetBtn.querySelector('span');
        if (buttonText) {
            buttonText.textContent = hasDataToReset ? 'Reset Tab Memory' : 'No Data to Reset';
        }
    }

    /**
     * Start periodic updates for tab memory button state
     *
     * Sets up a monitoring system to keep the tab memory reset button
     * state synchronized with the actual data. Uses both initial delay
     * and periodic updates to catch changes.
     */
    startTabMemoryStateUpdater() {
        // Initial update after Quick Shortcuts initialization
        setTimeout(this.boundFunctions.updateTabMemoryState, 1000);

        // Periodic updates to catch new interactions
        this.tabMemoryInterval = setInterval(this.boundFunctions.updateTabMemoryState, 5000);
    }

    /**
     * ===== EVENT LISTENERS =====
     *
     * Centralized event listener setup for all interactive elements.
     * Organized by functionality for maintainability. Uses optional
     * chaining for safety and bound functions for performance.
     */

    /**
     * Set up all event listeners for the application
     *
     * Initializes event handlers for settings panel, toggles, keyboard
     * shortcuts, and all interactive elements. Uses defensive programming
     * with null checks and optional chaining for robustness.
     */
    setupEventListeners() {
        // ===== SETTINGS PANEL CONTROLS =====

        const settingsBtn = document.getElementById('settings-btn');
        const settingsPanel = document.getElementById('settings-panel');
        const panelClose = document.getElementById('panel-close');
        const panelBackdrop = settingsPanel?.querySelector('.panel-backdrop');

        // Panel open/close handlers
        settingsBtn?.addEventListener('click', () => this.openSettings());
        panelClose?.addEventListener('click', () => this.closeSettings());
        panelBackdrop?.addEventListener('click', () => this.closeSettings());

        // Keyboard accessibility for panel
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && settingsPanel?.classList.contains('active')) {
                this.closeSettings();
            }
        });

        // ===== DISPLAY SETTINGS TOGGLES =====

        // Time format toggle (12/24 hour)
        document.getElementById('time-format')?.addEventListener('change', e => {
            this.settings.timeFormat24 = e.target.checked;
            this.saveSettings();
            this.updateResetButtonState();
            this.updateTime(); // Immediate update to show/hide AM/PM
        });

        // Seconds display toggle
        document.getElementById('show-seconds')?.addEventListener('change', e => {
            this.settings.showSeconds = e.target.checked;
            this.saveSettings();
            this.updateResetButtonState();
            this.updateTime(); // Immediate update to reflect seconds change
        });

        // ===== APPEARANCE SETTINGS TOGGLES =====

        // Grid background toggle
        document.getElementById('grid-background')?.addEventListener('change', e => {
            this.settings.gridBackground = e.target.checked;
            this.saveSettings();
            this.applySettings();
        });

        // Animation preferences toggle (accessibility consideration)
        document.getElementById('smooth-animations')?.addEventListener('change', e => {
            this.settings.smoothAnimations = e.target.checked;
            this.saveSettings();
            this.applySettings();
        });

        this.initCustomDropdown();
        this.initTypographyThemes();
        this.initModernHelpSection();
        document.getElementById('smart-date-features')?.addEventListener('change', e => {
            this.settings.smartDateFeatures = e.target.checked;
            this.saveSettings();
            this.applySettings();
            this.updateResetButtonState();
            this.toggleSmartDateOptions(e.target.checked);

            // Update main screen display immediately
            this.updateSmartDateFeatures();
        });

        // Initialize smart date feature selection UI
        this.initSmartDateFeatureSelection();

        // Ensure smart date features are displayed after UI initialization
        setTimeout(() => {
            if (this.settings.smartDateFeatures) {
                this.updateSmartDateFeatures();
            }
        }, 100);

        // Focus timer feature toggle
        document.getElementById('focus-timer')?.addEventListener('change', e => {
            this.settings.focusTimer = e.target.checked;
            this.saveSettings();
            this.applySettings();
            this.updateResetButtonState();
        });

        // Focus timer control buttons
        document
            .getElementById('focus-timer-start')
            ?.addEventListener('click', () => this.startFocusTimer());
        document
            .getElementById('focus-timer-pause')
            ?.addEventListener('click', () => this.pauseFocusTimer());
        document
            .getElementById('focus-timer-reset')
            ?.addEventListener('click', () => this.resetFocusTimer());

        // Quick notes feature toggle
        document.getElementById('quick-notes')?.addEventListener('change', e => {
            this.settings.quickNotes = e.target.checked;
            this.saveSettings();
            this.applySettings();
            this.updateResetButtonState();
        });

        // Daily quotes feature toggle
        document.getElementById('daily-quotes')?.addEventListener('change', e => {
            this.settings.dailyQuotes = e.target.checked;
            this.saveSettings();
            this.applySettings();
            this.updateResetButtonState();
        });

        // Quick notes overlay controls
        document
            .getElementById('quick-notes-close')
            ?.addEventListener('click', () => this.closeQuickNotes());
        document
            .getElementById('quick-notes-textarea')
            ?.addEventListener('input', e => this.handleNotesInput(e));

        // Keyboard accessibility for quick notes
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && this.quickNotesVisible) {
                this.closeQuickNotes();
            }
        });

        // ===== TODO LIST CONTROLS =====

        // Todo list feature toggle
        document.getElementById('todo-list')?.addEventListener('change', e => {
            this.settings.todoList = e.target.checked;
            this.saveSettings();
            this.applySettings();
            this.updateResetButtonState();
        });

        // Todo panel controls
        const todoPanel = document.getElementById('todo-panel');
        const todoBackdrop = todoPanel?.querySelector('.panel-backdrop');

        document
            .getElementById('todo-close')
            ?.addEventListener('click', () => this.closeTodoPanel());
        todoBackdrop?.addEventListener('click', () => this.closeTodoPanel());
        document.getElementById('add-task-btn')?.addEventListener('click', () => this.addTask());
        document.getElementById('new-task-input')?.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.addTask();
            }
        });

        // Keyboard accessibility for todo panel
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && this.todoVisible) {
                this.closeTodoPanel();
            }
        });

        // ===== SYSTEM CONTROLS =====

        // Tab memory reset button with disabled state handling
        document.getElementById('reset-memory-btn')?.addEventListener('click', e => {
            // Respect disabled state
            if (e.target.closest('button').disabled) {
                return;
            }
            this.handleTabMemoryResetClick();
        });

        // Global keyboard shortcuts (using bound function for performance)
        document.addEventListener('keydown', this.boundFunctions.handleKeydown);

        // ===== UI CLEANUP =====

        // Remove legacy hover effects from clock
        const digitalClock = document.querySelector('.digital-clock');
        if (digitalClock) {
            digitalClock.style.cursor = 'default';
        }
    }

    /**
     * Handle global keyboard shortcuts
     *
     * Processes keyboard shortcuts while respecting input focus states
     * and browser shortcuts. Only intercepts extension shortcuts when
     * the user is not typing in input fields.
     *
     * Shortcuts:
     * - F: Cycle through available fonts
     * - R: Reset settings to defaults
     * - S: Open settings panel
     * - N: Toggle quick notes overlay
     * - T: Toggle todo list panel
     * - Q: Refresh daily quote
     * - G: Toggle grid background
     * - A: Toggle smooth animations
     * - Escape: Close open modals/overlays
     *
     * @param {KeyboardEvent} e - The keyboard event
     */
    handleKeydown(e) {
        // CRITICAL: Never block browser shortcuts with Ctrl/Cmd/Alt modifiers
        // Allow Ctrl+K, Ctrl+N, Ctrl+T, Ctrl+R, etc. to work normally
        if (e.ctrlKey || e.metaKey || e.altKey) {
            return; // Let browser handle all modifier key combinations
        }

        // Only handle our shortcuts when no modifiers are pressed
        // and user is not typing in an input field

        if (e.key === 'f' || e.key === 'F') {
            if (!this.isInputFocused()) {
                e.preventDefault();
                this.cycleFonts();
                return;
            }
        }

        if (e.key === 'r' || e.key === 'R') {
            if (!this.isInputFocused()) {
                e.preventDefault();
                this.handleResetShortcut();
                return;
            }
        }

        if (e.key === 's' || e.key === 'S') {
            if (!this.isInputFocused()) {
                e.preventDefault();
                this.openSettings();
                return;
            }
        }

        // Quick Notes shortcut (N)
        if (e.key === 'n' || e.key === 'N') {
            if (!this.isInputFocused()) {
                e.preventDefault();
                this.toggleQuickNotes();
                return;
            }
        }

        // Todo List shortcut (T)
        if (e.key === 't' || e.key === 'T') {
            if (!this.isInputFocused()) {
                e.preventDefault();
                this.toggleTodoPanel();
                return;
            }
        }

        // Quote refresh shortcut (Q)
        if (e.key === 'q' || e.key === 'Q') {
            if (!this.isInputFocused()) {
                e.preventDefault();

                // Check if quotes are enabled before refreshing
                if (!this.settings.dailyQuotes) {
                    this.notificationSystem.show(
                        'info',
                        'Daily Quotes Disabled',
                        'Enable Daily Quotes in settings first',
                        3000
                    );
                    return;
                }

                this.refreshQuote();
                return;
            }
        }

        // Grid background toggle shortcut (G)
        if (e.key === 'g' || e.key === 'G') {
            if (!this.isInputFocused()) {
                e.preventDefault();
                this.toggleGridBackground();
                return;
            }
        }

        // Animations toggle shortcut (A)
        if (e.key === 'a' || e.key === 'A') {
            if (!this.isInputFocused()) {
                e.preventDefault();
                this.toggleAnimations();
                return;
            }
        }

        // Escape to close modals
        if (e.key === 'Escape') {
            if (this.quickNotesVisible) {
                this.closeQuickNotes();
            } else if (this.todoVisible) {
                this.closeTodoPanel();
            } else {
                this.closeSettings();
            }
        }

        // Todo panel keyboard navigation
        if (this.todoVisible && !this.isInputFocused()) {
            this.handleTodoKeyboardNavigation(e);
        }
    }

    /**
     * Check if user is currently typing in an input field
     *
     * Determines whether keyboard shortcuts should be intercepted or
     * allowed to pass through to input fields. Prevents shortcuts from
     * interfering with normal typing.
     *
     * @returns {boolean} True if an input field is currently focused
     */
    isInputFocused() {
        const activeElement = document.activeElement;
        return (
            activeElement &&
            (activeElement.tagName === 'INPUT' ||
                activeElement.tagName === 'TEXTAREA' ||
                activeElement.contentEditable === 'true')
        );
    }

    /**
     * ===== SETTINGS PANEL MANAGEMENT =====
     *
     * Handles the opening, closing, and animation of the settings panel
     * with proper accessibility support and focus management.
     */

    /**
     * Close any open modals before opening a new one
     */
    closeAllModals() {
        if (this.activeModal === 'settings') {
            this.closeSettings();
        } else if (this.activeModal === 'todo') {
            this.closeTodoPanel();
        } else if (this.activeModal === 'notes') {
            this.closeQuickNotes();
        } else if (this.activeModal === 'shortcuts') {
            // Close quick shortcuts if it exists
            if (window.quickShortcuts && window.quickShortcuts.isVisible) {
                window.quickShortcuts.hide();
            }
        }
        this.activeModal = null;
    }

    /**
     * Open the settings panel with smooth animation
     *
     * Implements proper accessibility practices including focus management,
     * ARIA attributes, and keyboard navigation. Prevents body scrolling
     * while panel is open.
     */
    openSettings() {
        const panel = document.getElementById('settings-panel');
        if (!panel) return;

        // Close any other open modals first
        this.closeAllModals();
        this.activeModal = 'settings';

        // Store focus origin for restoration when panel closes
        this.panelTrigger = document.activeElement;

        // Ensure panel content is initialized
        this.initializePanelContent();

        // Accessibility: make panel accessible before showing
        panel.removeAttribute('inert');
        panel.removeAttribute('aria-hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scroll

        // Animate panel opening with synchronized timing
        this.animateSettingsOpen(panel);

        // Focus management for keyboard users
        setTimeout(() => {
            const closeBtn = document.getElementById('panel-close');
            if (closeBtn) closeBtn.focus();
        }, 100);
    }

    /**
     * Animate settings panel opening
     *
     * Implements synchronized backdrop and container animations for smooth
     * visual transitions. Uses requestAnimationFrame for optimal performance
     * and cubic-bezier easing for natural motion.
     *
     * @param {HTMLElement} panel - The settings panel element
     */
    animateSettingsOpen(panel) {
        const backdrop = panel.querySelector('.panel-backdrop');
        const container = panel.querySelector('.panel-container');

        // Make panel visible immediately
        panel.style.display = 'flex';
        panel.style.pointerEvents = 'auto';

        // Force reflow to ensure initial state is applied
        panel.offsetHeight;

        // Synchronized animation start using requestAnimationFrame
        requestAnimationFrame(() => {
            // Trigger CSS transitions
            panel.classList.add('active');

            // Backdrop animation: fade in with blur effect
            if (backdrop) {
                const transition =
                    'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), background 500ms cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 500ms cubic-bezier(0.16, 1, 0.3, 1), -webkit-backdrop-filter 500ms cubic-bezier(0.16, 1, 0.3, 1)';
                backdrop.style.transition = transition;
                backdrop.style.opacity = '1';
                backdrop.style.background = 'rgba(0, 0, 0, 0.6)';
                backdrop.style.backdropFilter = 'blur(8px)';
                backdrop.style.webkitBackdropFilter = 'blur(8px)';
            }

            // Container animation: slide in from right with shadow
            if (container) {
                container.style.transition =
                    'transform 500ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 500ms cubic-bezier(0.16, 1, 0.3, 1)';
                container.style.transform = 'translateX(0)';
                container.style.boxShadow =
                    '-8px 0 32px rgba(0, 0, 0, 0.12), -4px 0 16px rgba(0, 0, 0, 0.08), inset 1px 0 0 rgba(255, 255, 255, 0.05)';
            }
        });
    }

    /**
     * Close the settings panel with proper focus restoration
     *
     * Implements accessibility best practices by restoring focus to the
     * element that opened the panel. Handles edge cases where the trigger
     * element no longer exists.
     */
    closeSettings() {
        const panel = document.getElementById('settings-panel');
        if (!panel) return;

        // Clear active modal state
        if (this.activeModal === 'settings') {
            this.activeModal = null;
        }

        // Focus management: clear any focused elements to prevent unwanted focus behavior
        // Don't auto-focus settings button to avoid focus issues after reset
        if (document.activeElement && document.activeElement !== document.body) {
            document.activeElement.blur();
        }

        // Make panel inaccessible to screen readers and keyboard navigation
        // Remove focus from any focused elements first to prevent aria-hidden warning
        if (document.activeElement && panel.contains(document.activeElement)) {
            document.activeElement.blur();
        }

        panel.setAttribute('inert', '');
        panel.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore body scrolling

        // Animate panel closing
        this.animateSettingsClose(panel);

        // Clean up focus reference
        this.panelTrigger = null;
    }

    /**
     * Animate settings panel closing
     *
     * Implements synchronized reverse animations for backdrop and container.
     * Cleans up inline styles after animation completes to prevent conflicts
     * with CSS on subsequent opens.
     *
     * @param {HTMLElement} panel - The settings panel element
     */
    animateSettingsClose(panel) {
        const backdrop = panel.querySelector('.panel-backdrop');
        const container = panel.querySelector('.panel-container');

        // Start synchronized close animations
        requestAnimationFrame(() => {
            // Backdrop animation: fade out and remove blur
            if (backdrop) {
                const transition =
                    'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), background 500ms cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 500ms cubic-bezier(0.16, 1, 0.3, 1), -webkit-backdrop-filter 500ms cubic-bezier(0.16, 1, 0.3, 1)';
                backdrop.style.transition = transition;
                backdrop.style.opacity = '0';
                backdrop.style.background = 'rgba(0, 0, 0, 0)';
                backdrop.style.backdropFilter = 'blur(0px)';
                backdrop.style.webkitBackdropFilter = 'blur(0px)';
            }

            // Container animation: slide out to right and fade shadow
            if (container) {
                container.style.transition =
                    'transform 500ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 500ms cubic-bezier(0.16, 1, 0.3, 1)';
                container.style.transform = 'translateX(100%)';
                container.style.boxShadow =
                    '-8px 0 32px rgba(0, 0, 0, 0), -4px 0 16px rgba(0, 0, 0, 0), inset 1px 0 0 rgba(255, 255, 255, 0)';
            }
        });

        // Cleanup after animation completes
        setTimeout(() => {
            panel.classList.remove('active');
            panel.style.display = 'none';
            panel.style.pointerEvents = 'none';

            // Reset all inline styles for clean state
            if (backdrop) {
                backdrop.style.transition = '';
                backdrop.style.opacity = '';
                backdrop.style.background = '';
                backdrop.style.backdropFilter = '';
                backdrop.style.webkitBackdropFilter = '';
            }

            if (container) {
                container.style.transition = '';
                container.style.transform = '';
                container.style.boxShadow = '';
            }
        }, 500); // Match animation duration exactly
    }

    /**
     * Initialize settings panel content
     *
     * Lazy initialization of panel components to improve startup performance.
     * Only initializes components when the panel is first opened, and prevents
     * duplicate initialization with flags.
     */
    initializePanelContent() {
        // Initialize tab navigation system
        this.initializeSettingsTabs();

        // Initialize color theme selection
        this.initializeColorThemes();

        // Initialize typography themes (one-time setup)
        if (!this.typographyThemesInitialized) {
            this.initTypographyThemes();
            this.typographyThemesInitialized = true;
        }
    }

    /**
     * ===== SETTINGS TABS SYSTEM =====
     *
     * Manages the tabbed interface within the settings panel for organizing
     * different categories of settings (Display, Appearance, Features, System).
     */

    /**
     * Initialize settings tab navigation
     *
     * Sets up tab switching functionality with animated indicator and proper
     * ARIA attributes for accessibility. Uses one-time initialization to
     * prevent duplicate event listeners.
     */
    initializeSettingsTabs() {
        // Prevent duplicate initialization
        if (this.settingsTabsInitialized) return;

        const tabs = document.querySelectorAll('.settings-tab');
        const indicator = document.querySelector('.settings-tab-indicator');

        if (!tabs.length || !indicator) return;

        // Set initial indicator position after DOM is ready
        setTimeout(() => {
            this.setSettingsTabIndicatorPosition('display', false);
        }, 100);

        // Add click handlers for tab switching
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;
                if (tabId) {
                    this.switchSettingsTab(tabId);
                }
            });
        });

        this.settingsTabsInitialized = true;
    }

    /**
     * Switch to a different settings tab
     *
     * Updates tab states, panel visibility, and indicator position with
     * smooth animations. Implements proper ARIA attributes for screen
     * reader accessibility.
     *
     * @param {string} tabId - The ID of the tab to switch to
     */
    switchSettingsTab(tabId) {
        const tabs = document.querySelectorAll('.settings-tab');
        const panels = document.querySelectorAll('.tab-panel');

        // Update tab button states and ARIA attributes
        tabs.forEach(tab => {
            const isActive = tab.dataset.tab === tabId;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        // Update panel visibility with smooth fade transition
        panels.forEach(panel => {
            const isActive = panel.dataset.panel === tabId;
            if (isActive) {
                // Show panel with fade-in animation
                panel.style.opacity = '0';
                panel.classList.add('active');

                requestAnimationFrame(() => {
                    panel.style.transition = 'opacity 200ms cubic-bezier(0.16, 1, 0.3, 1)';
                    panel.style.opacity = '1';
                });
            } else {
                // Hide panel and reset styles
                panel.classList.remove('active');
                panel.style.opacity = '';
                panel.style.transition = '';
            }
        });

        // Animate indicator to new position
        this.setSettingsTabIndicatorPosition(tabId, true);
    }

    /**
     * Position the tab indicator under the active tab
     *
     * Calculates and applies the position and width of the animated indicator
     * that shows which tab is currently active. Handles edge cases like tabs
     * not being ready and provides retry logic.
     *
     * @param {string} activeTabId - The ID of the currently active tab
     * @param {boolean} animate - Whether to animate the transition (default: true)
     */
    setSettingsTabIndicatorPosition(activeTabId, animate = true) {
        const tabs = document.querySelectorAll('.settings-tab');
        const indicator = document.querySelector('.settings-tab-indicator');

        if (!indicator || !tabs.length) return;

        // Disable transition for instant positioning when needed
        if (!animate) {
            indicator.style.transition = 'none';
        }

        // Find the target tab element
        const activeTab = Array.from(tabs).find(tab => tab.dataset.tab === activeTabId);
        if (!activeTab) return;

        // Ensure tab is rendered and has dimensions
        const activeRect = activeTab.getBoundingClientRect();
        if (activeRect.width === 0) {
            // Tab not ready - retry after brief delay
            setTimeout(() => this.setSettingsTabIndicatorPosition(activeTabId, animate), 50);
            return;
        }

        // Calculate position relative to parent container
        // offsetLeft is more reliable than getBoundingClientRect for relative positioning
        const left = activeTab.offsetLeft;
        const width = activeTab.offsetWidth;

        // Apply indicator position and size
        indicator.style.transform = `translateX(${left}px)`;
        indicator.style.width = `${width}px`;
        indicator.style.opacity = '1';

        // Re-enable transitions after instant positioning
        if (!animate) {
            indicator.offsetHeight; // Force reflow
            indicator.style.transition = '';
        }
    }

    /**
     * ===== DIGITAL CLOCK FUNCTIONALITY =====
     *
     * Core time display system with real-time updates, format switching,
     * and smart DOM manipulation to prevent flickering during updates.
     */

    /**
     * Start the digital clock with real-time updates
     *
     * Initializes the clock display and sets up a 1-second interval for
     * continuous time updates. Stores the interval ID for proper cleanup.
     */
    startClock() {
        this.updateTime(); // Initial display
        this.clockInterval = setInterval(this.boundFunctions.updateTime, 1000);
    }

    /**
     * ===== LOCAL FONTS SYSTEM =====
     *
     * Manages the local font collection bundled with the extension.
     * Provides instant loading without FOUT (Flash of Unstyled Text)
     * by using locally stored font files.
     */

    /**
     * Initialize local fonts with instant loading
     *
     * Sets up the local font system by cleaning up any legacy Google Fonts
     * elements and loading the bundled font CSS. Local fonts are immediately
     * available since they're packaged with the extension.
     */
    initializeLocalFonts() {
        // Remove any legacy font loading systems
        this.cleanupOldFontSystems();

        // Inject local font CSS definitions
        this.loadLocalFontCSS();

        // Apply the user's selected font immediately
        this.applyFontSetting();
    }

    /**
     * Load local font CSS definitions
     *
     * Injects @font-face declarations for all bundled fonts into the document.
     * Uses font-display: swap for better loading performance and prevents
     * duplicate style elements.
     */
    loadLocalFontCSS() {
        // Prevent duplicate font style elements
        const existingStyle = document.getElementById('nexus-local-fonts');
        if (existingStyle) {
            existingStyle.remove();
        }

        // Generate @font-face CSS for all bundled fonts
        const fontCSS = `
/* NEXUS Local Fonts - Premium Collection */
/* Variable fonts with full weight ranges for optimal flexibility */

@font-face {
    font-family: 'Inter';
    src: url('../../../assets/fonts/InterVariable.ttf') format('truetype-variations');
    font-weight: 100 900;
    font-style: normal;
    font-display: swap; /* Swap for better perceived performance */
}

@font-face {
    font-family: 'JetBrains Mono';
    src: url('../../../assets/fonts/JetBrainsMono[wght].ttf') format('truetype-variations');
    font-weight: 100 800;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Geist';
    src: url('../../../assets/fonts/Geist[wght].ttf') format('truetype-variations');
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Satoshi';
    src: url('../../../assets/fonts/Satoshi-Variable.ttf') format('truetype-variations');
    font-weight: 300 900;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Cascadia Code';
    src: url('../../../assets/fonts/CascadiaCode.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: block; /* Block for monospace consistency */
}
        `;

        // Inject CSS into document head
        const style = document.createElement('style');
        style.id = 'nexus-local-fonts';
        style.textContent = fontCSS;
        document.head.appendChild(style);
    }

    /**
     * Clean up legacy font loading systems
     *
     * Removes any old Google Fonts elements that may exist from previous
     * versions of the extension. This ensures a clean slate for the local
     * font system and prevents conflicts.
     */
    cleanupOldFontSystems() {
        // Remove legacy Google Fonts elements
        const legacyElements = [
            document.getElementById('google-fonts-style'),
            document.getElementById('google-fonts-link')
        ];

        legacyElements.forEach(element => {
            if (element) {
                element.remove();
            }
        });
    }

    /**
     * ===== FONT STATUS & DEBUGGING =====
     *
     * Provides information about font loading status and availability
     * for debugging and development purposes.
     */

    /**
     * Get current font system status
     *
     * Returns comprehensive information about font availability and loading
     * state. Local fonts are always ready since they're bundled with the extension.
     *
     * @returns {Object} Font status information
     */
    getFontStatus() {
        return {
            total: this.availableFonts.length,
            localFonts: this.availableFonts.filter(font => font.local).length,
            systemFonts: this.availableFonts.filter(font => font.system).length,
            ready: true,
            status: 'instant' // Local fonts load instantly
        };
    }

    /**
     * Debug method for console access
     *
     * Provides easy access to font status information for debugging
     * and development. Can be called from browser console.
     *
     * @returns {Object} Current font status
     */
    showFontStatus() {
        const status = this.getFontStatus();
        return status;
    }

    /**
     * ===== MEMORY MANAGEMENT =====
     *
     * Cleanup method for proper resource management and memory optimization.
     * Clears all intervals and event listeners to prevent memory leaks.
     */

    /**
     * Clean up all resources and event listeners
     *
     * Properly disposes of intervals, event listeners, and object references
     * to prevent memory leaks. Should be called when the extension is
     * being unloaded or reinitialized.
     */
    cleanup() {
        // Clear all active intervals
        const intervals = [
            { ref: 'clockInterval', name: 'Clock update' },
            { ref: 'focusTimer.interval', name: 'Focus timer' },
            { ref: 'tabMemoryInterval', name: 'Tab memory updater' }
        ];

        intervals.forEach(({ ref, name }) => {
            const intervalId = ref.includes('.') ? this.focusTimer.interval : this[ref];
            if (intervalId) {
                clearInterval(intervalId);
                if (ref.includes('.')) {
                    this.focusTimer.interval = null;
                } else {
                    this[ref] = null;
                }
            }
        });

        // Remove global event listeners
        if (this.boundFunctions) {
            document.removeEventListener('keydown', this.boundFunctions.handleKeydown);
            window.removeEventListener('beforeunload', this.boundFunctions.cleanup);
        }
    }

    /**
     * ===== TIME DISPLAY SYSTEM =====
     *
     * Core time update method with smart DOM manipulation to prevent
     * flickering and optimize performance. Handles both 12/24 hour formats
     * and optional seconds display.
     */

    /**
     * Update the time display with current time
     *
     * Implements smart DOM manipulation to prevent flickering during updates,
     * especially for the AM/PM indicator in 12-hour format. Uses efficient
     * string formatting and selective element updates.
     */
    updateTime() {
        const now = new Date();
        const timeElement = document.getElementById('time');
        const dateElement = document.getElementById('date');

        if (timeElement) {
            const hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');

            if (this.settings.timeFormat24) {
                // 24-hour format: simpler display without AM/PM
                const displayHours = hours.toString().padStart(2, '0');
                let timeString = `${displayHours}:${minutes}`;

                if (this.settings.showSeconds) {
                    timeString += `:${seconds}`;
                }

                timeElement.innerHTML = this.formatTimeWithDigits(timeString);
                this.lastPeriod = null; // Reset for format switching
            } else {
                // 12-hour format: complex display with AM/PM and smart DOM updates
                const period = hours >= 12 ? 'PM' : 'AM';
                let displayHours = hours % 12;
                displayHours = displayHours ? displayHours : 12; // Convert 0 to 12
                displayHours = displayHours.toString().padStart(2, '0');

                let timeString = `${displayHours}:${minutes}`;

                if (this.settings.showSeconds) {
                    timeString += `:${seconds}`;
                }

                const timeHTML = this.formatTimeWithDigits(timeString);

                // Smart DOM manipulation to prevent AM/PM flickering
                if (!this.lastPeriod || this.lastPeriod !== period) {
                    // Period changed (AM/PM switch) or first render - full update
                    const periodHTML = `<span class="time-period">${period}</span>`;
                    timeElement.innerHTML = timeHTML + periodHTML;
                    this.lastPeriod = period;
                } else {
                    // Period unchanged - selective update to prevent flickering
                    const existingPeriodElement = timeElement.querySelector('.time-period');
                    if (existingPeriodElement) {
                        // Efficient partial update: only replace time digits
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = timeHTML;

                        // Remove old time digits but preserve period element
                        const timeDigits = timeElement.querySelectorAll(
                            '.digit-group, .time-colon'
                        );
                        timeDigits.forEach(element => element.remove());

                        // Insert new time digits before period element
                        while (tempDiv.firstChild) {
                            timeElement.insertBefore(tempDiv.firstChild, existingPeriodElement);
                        }
                    } else {
                        // Fallback: period element missing, full recreation
                        const periodHTML = `<span class="time-period">${period}</span>`;
                        timeElement.innerHTML = timeHTML + periodHTML;
                    }
                }
            }
        }

        // Update date display with localized formatting
        if (dateElement) {
            const dateOptions = {
                weekday: 'long', // Full day name (e.g., "Monday")
                month: 'long', // Full month name (e.g., "January")
                day: 'numeric' // Day number (e.g., "15")
            };
            dateElement.textContent = now.toLocaleDateString('en-US', dateOptions);
        }

        // Update smart date features with change detection for performance
        this.updateSmartDateFeaturesIfChanged();
    }

    /**
     * ===== SMART DATE FEATURES SYSTEM =====
     *
     * Intelligent date insights that provide contextual information like
     * week numbers, year progress, working days, and seasonal data.
     * Uses change detection to minimize DOM updates for performance.
     */

    /**
     * Update smart date features with change detection
     *
     * Implements efficient change detection by hashing the current insights
     * and only updating the DOM when values actually change. This prevents
     * unnecessary DOM manipulation and improves performance.
     */
    updateSmartDateFeaturesIfChanged() {
        // Handle disabled state first
        if (!this.settings.smartDateFeatures) {
            this.updateSmartDateFeatures(); // Will hide features
            this.lastSmartDateHash = null; // Reset change detection
            return;
        }

        const now = new Date();
        const insights = this.getDateInsights(now);

        // Create content hash for change detection
        const currentHash = insights.map(insight => `${insight.label}:${insight.value}`).join('|');

        // Only update DOM if content has actually changed
        if (this.lastSmartDateHash !== currentHash) {
            this.updateSmartDateFeatures();
            this.lastSmartDateHash = currentHash;
        }
    }

    /**
     * Update smart date features display
     *
     * Renders the selected date insights with proper accessibility attributes
     * and SVG icons. Handles both enabled and disabled states with appropriate
     * DOM manipulation.
     */
    updateSmartDateFeatures() {
        const smartDateInfo = document.getElementById('smart-date-info');
        if (!smartDateInfo) return;

        if (!this.settings.smartDateFeatures) {
            // Hide features and clear content for disabled state
            smartDateInfo.style.display = 'none';
            smartDateInfo.innerHTML = '';
            return;
        }

        // Show features container
        smartDateInfo.style.display = 'flex';

        const now = new Date();
        const insights = this.getDateInsights(now);

        // Generate DOM elements safely to prevent XSS attacks
        smartDateInfo.innerHTML = ''; // Clear existing content

        insights.forEach(insight => {
            // Create main container with safe attributes
            const insightDiv = document.createElement('div');
            insightDiv.className = 'date-insight';
            insightDiv.setAttribute(
                'aria-label',
                `${this.sanitizeHTML(insight.label)}: ${this.sanitizeHTML(insight.value)}`
            );

            // Create and configure SVG icon safely
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.classList.add('date-insight-icon');
            svg.setAttribute('viewBox', '0 0 24 24');
            svg.setAttribute('fill', 'none');
            svg.setAttribute('stroke', 'currentColor');
            svg.setAttribute('stroke-width', '2');
            svg.setAttribute('aria-hidden', 'true');

            // Safely insert SVG content (iconSvg is from internal data, controlled by us)
            svg.innerHTML = insight.iconSvg; // Internal SVG data, controlled by us

            // Create content container with safe text insertion
            const contentDiv = document.createElement('div');
            contentDiv.className = 'date-insight-content';

            const labelSpan = this.createSafeElement('span', insight.label, 'date-insight-label');
            const valueSpan = this.createSafeElement('span', insight.value, 'date-insight-value');

            contentDiv.appendChild(labelSpan);
            contentDiv.appendChild(valueSpan);

            // Assemble the complete insight element
            insightDiv.appendChild(svg);
            insightDiv.appendChild(contentDiv);
            smartDateInfo.appendChild(insightDiv);
        });
    }

    /**
     * ===== SMART DATE FEATURE SELECTION =====
     *
     * Manages the user interface for selecting which smart date features
     * to display. Includes validation, limits, and user feedback.
     */

    /**
     * Initialize smart date feature selection UI
     *
     * Sets up the feature selection interface with proper event listeners,
     * visibility controls, and initial state synchronization.
     */
    initSmartDateFeatureSelection() {
        this.updateSmartDateOptionsVisibility();
        this.setupFeatureSelectionListeners();
        this.updateFeatureSelectionUI();
    }

    /**
     * Toggle smart date options container state
     *
     * Enables or disables the feature selection interface based on whether
     * smart date features are enabled globally.
     *
     * @param {boolean} enabled - Whether smart date features are enabled
     */
    toggleSmartDateOptions(enabled) {
        const optionsContainer = document.getElementById('smart-date-options');
        if (optionsContainer) {
            optionsContainer.classList.toggle('disabled', !enabled);
        }
    }

    /**
     * Update smart date options visibility and ensure valid selection
     *
     * Manages the visibility state of the feature selection UI and ensures
     * that at least one feature is selected when the system is enabled.
     */
    updateSmartDateOptionsVisibility() {
        const smartDateEnabled = this.settings.smartDateFeatures;
        this.toggleSmartDateOptions(smartDateEnabled);

        // Ensure minimum selection when enabling features
        if (
            smartDateEnabled &&
            (!this.settings.selectedSmartDateFeatures ||
                this.settings.selectedSmartDateFeatures.length === 0)
        ) {
            this.settings.selectedSmartDateFeatures = [
                'week-number',
                'year-progress',
                'days-to-weekend'
            ];
            this.saveSettings();
        }
    }

    /**
     * Set up event listeners for feature selection checkboxes
     *
     * Attaches change event listeners to all smart date feature checkboxes
     * to handle user selection changes with validation and limits.
     */
    setupFeatureSelectionListeners() {
        const checkboxes = document.querySelectorAll('input[name="smart-date-feature"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.handleFeatureSelection();
            });
        });
    }

    /**
     * Handle smart date feature selection changes
     *
     * Processes user selection changes with validation rules:
     * - Minimum 1 feature must be selected when enabled
     * - Maximum 3 features can be selected
     * - Provides user feedback for violations
     */
    handleFeatureSelection() {
        const checkboxes = document.querySelectorAll('input[name="smart-date-feature"]');
        const selectedFeatures = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        // Enforce minimum selection rule (at least 1 when enabled)
        if (selectedFeatures.length === 0 && this.settings.smartDateFeatures) {
            // Try to restore the last unchecked item
            const lastUnchecked = Array.from(checkboxes).find(
                cb => !cb.checked && this.settings.selectedSmartDateFeatures.includes(cb.value)
            );

            if (lastUnchecked) {
                lastUnchecked.checked = true;
                selectedFeatures.push(lastUnchecked.value);
            } else {
                // Fallback: select first available feature
                const firstCheckbox = checkboxes[0];
                if (firstCheckbox) {
                    firstCheckbox.checked = true;
                    selectedFeatures.push(firstCheckbox.value);
                }
            }

            // User feedback for minimum selection rule
            this.notificationSystem.show(
                'info',
                'Minimum Selection Required',
                'At least one smart date feature must be selected',
                2000
            );
        }

        // Enforce maximum selection rule (max 3 features)
        if (selectedFeatures.length > 3) {
            // Uncheck the most recently selected item
            const lastChecked = Array.from(checkboxes)
                .reverse()
                .find(cb => cb.checked);
            if (lastChecked) {
                lastChecked.checked = false;
                selectedFeatures.pop();
            }

            // User feedback for maximum selection rule
            this.notificationSystem.show(
                'warning',
                'Selection Limit Reached',
                'Maximum 3 smart date features can be selected',
                2000
            );
        }

        // Persist the validated selection
        this.settings.selectedSmartDateFeatures = selectedFeatures;
        this.saveSettings();

        // Update UI state to reflect changes
        this.updateFeatureSelectionUI();

        // Refresh main display if features are enabled
        if (this.settings.smartDateFeatures) {
            this.updateSmartDateFeatures();
        }
    }

    /**
     * Update feature selection UI state
     *
     * Synchronizes the checkbox states with current settings, updates the
     * selection counter, and manages the disabled state of checkboxes
     * when the maximum selection limit is reached.
     */
    updateFeatureSelectionUI() {
        const checkboxes = document.querySelectorAll('input[name="smart-date-feature"]');
        if (checkboxes.length === 0) return; // UI not initialized yet

        const selectedFeatures = this.settings.selectedSmartDateFeatures || [];

        // Synchronize checkbox states with current settings
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectedFeatures.includes(checkbox.value);
        });

        const selectedCount = selectedFeatures.length;

        // Update selection counter display
        const counter = document.getElementById('selection-count');
        if (counter) {
            counter.textContent = selectedCount;
        }

        // Manage checkbox disabled states based on selection limit
        checkboxes.forEach(checkbox => {
            // Disable unchecked boxes when limit is reached
            checkbox.disabled = !checkbox.checked && selectedCount >= 3;
        });
    }

    /**
     * ===== DATE INSIGHTS GENERATION =====
     *
     * Comprehensive system for generating contextual date information.
     * Each insight provides valuable temporal context with appropriate
     * icons and formatting for the user interface.
     */

    /**
     * Get selected date insights for display
     *
     * Generates insights based on user selection and returns formatted
     * objects ready for UI rendering. Each insight includes label, value,
     * and SVG icon for consistent presentation.
     *
     * @param {Date} date - The date to generate insights for
     * @returns {Array<Object>} Array of insight objects with label, value, and iconSvg
     */
    getDateInsights(date) {
        const selectedFeatures = this.settings.selectedSmartDateFeatures || [
            'week-number',
            'year-progress',
            'days-to-weekend'
        ];
        const insights = [];

        // Generate insights for each selected feature
        selectedFeatures.forEach(featureId => {
            const insight = this.generateFeatureInsight(featureId, date);
            if (insight) {
                insights.push(insight);
            }
        });

        return insights;
    }

    /**
     * Generate a specific feature insight
     *
     * Creates a formatted insight object for a specific feature type.
     * Each insight includes a human-readable label, calculated value,
     * and appropriate SVG icon for visual consistency.
     *
     * @param {string} featureId - The ID of the feature to generate
     * @param {Date} date - The date to calculate the insight for
     * @returns {Object|null} Insight object or null if feature not found
     */
    generateFeatureInsight(featureId, date) {
        // Feature generator map with calculation functions
        const featureMap = {
            'week-number': () => ({
                label: 'Week',
                value: this.getWeekNumber(date),
                iconSvg:
                    '<rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line>'
            }),

            'days-since-ny': () => ({
                label: 'Day',
                value: this.getDaysSinceNewYear(date),
                iconSvg:
                    '<circle cx="12" cy="12" r="10"></circle><polyline points="12,6 12,12 16,14"></polyline>'
            }),

            'days-to-weekend': () => ({
                label: this.getDaysToWeekendLabel(date),
                value: this.getDaysToWeekendValue(date),
                iconSvg:
                    '<path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path>'
            }),

            'working-days': () => ({
                label: 'Work Days',
                value: `${this.getWorkingDaysLeft(date)} left`,
                iconSvg:
                    '<rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M16 2v4"></path><path d="M8 2v4"></path><path d="M3 10h18"></path><path d="M10 16l2 2 4-4"></path>'
            }),

            'year-progress': () => ({
                label: 'Progress',
                value: `${this.getYearProgress(date)}%`,
                iconSvg:
                    '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>'
            }),

            'quarter-progress': () => ({
                label: this.getQuarterLabel(date),
                value: `${this.getQuarterProgress(date)}%`,
                iconSvg:
                    '<path d="M3 3v18h18"></path><path d="M7 12l3 3 7-7"></path><path d="M21 12h-6"></path>'
            }),

            'month-progress': () => ({
                label: this.getMonthName(date),
                value: `${this.getMonthProgress(date)}%`,
                iconSvg:
                    '<rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M16 2v4"></path><path d="M8 2v4"></path><path d="M3 10h18"></path><circle cx="8" cy="14" r="1"></circle><circle cx="12" cy="14" r="1"></circle><circle cx="16" cy="14" r="1"></circle>'
            }),

            'week-progress': () => ({
                label: 'Week',
                value: `${this.getWeekProgress(date)}%`,
                iconSvg:
                    '<rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path><path d="M8 14h8"></path><path d="M8 18h6"></path>'
            }),

            'weekend-status': () => {
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                return {
                    label: isWeekend ? 'Weekend' : 'Weekday',
                    value: 'Today',
                    iconSvg: isWeekend
                        ? '<path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path>'
                        : '<rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M16 2v4"></path><path d="M8 2v4"></path><path d="M3 10h18"></path><path d="M10 16l2 2 4-4"></path>'
                };
            },

            'season-info': () => ({
                label: this.getCurrentSeason(date),
                value: `Day ${this.getSeasonDay(date)}`,
                iconSvg: this.getSeasonIcon(date)
            }),

            'moon-phase': () => ({
                label: 'Moon',
                value: this.getMoonPhase(date),
                iconSvg:
                    '<circle cx="12" cy="12" r="10"></circle><path d="M12 2a10 10 0 0 0 0 20 8 8 0 0 1 0-16 8 8 0 0 1 0-4z"></path>'
            }),

            'daylight-info': () => {
                const sunsetTime = this.getSunsetTime(date);
                return {
                    label: 'Sunset',
                    value: sunsetTime,
                    iconSvg:
                        '<circle cx="12" cy="12" r="5"></circle><line x1="12" x2="12" y1="1" y2="3"></line><line x1="12" x2="12" y1="21" y2="23"></line><line x1="4.22" x2="5.64" y1="4.22" y2="5.64"></line><line x1="18.36" x2="19.78" y1="18.36" y2="19.78"></line><line x1="1" x2="3" y1="12" y2="12"></line><line x1="21" x2="23" y1="12" y2="12"></line><line x1="4.22" x2="5.64" y1="19.78" y2="18.36"></line><line x1="18.36" x2="19.78" y1="5.64" y2="4.22"></line>'
                };
            }
        };

        // Execute the generator function if it exists
        const generator = featureMap[featureId];
        return generator ? generator() : null;
    }

    /**
     * ===== DATE CALCULATION UTILITIES =====
     *
     * Core date calculation methods used by the insights system.
     * These provide the mathematical foundation for all temporal
     * calculations and progress tracking.
     */

    /**
     * Calculate the week number of the year
     *
     * Uses ISO-like week numbering where week 1 contains January 1st.
     * Accounts for the day of week that January 1st falls on.
     *
     * @param {Date} date - The date to calculate week number for
     * @returns {number} Week number (1-53)
     */
    getWeekNumber(date) {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }

    /**
     * Calculate days until weekend
     *
     * Returns the number of days until Saturday. Returns 0 if already
     * on weekend (Saturday or Sunday).
     *
     * @param {Date} date - The date to calculate from
     * @returns {number} Days until weekend (0-5)
     */
    getDaysToWeekend(date) {
        const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
        if (dayOfWeek === 0 || dayOfWeek === 6) return 0; // Already weekend
        return 6 - dayOfWeek; // Days until Saturday
    }

    /**
     * Calculate day of year
     *
     * Returns the ordinal day number within the year (1-366).
     *
     * @param {Date} date - The date to calculate day of year for
     * @returns {number} Day of year (1-366)
     */
    getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        return Math.floor(diff / 86400000);
    }

    /**
     * Check if a year is a leap year
     *
     * Uses the Gregorian calendar leap year rules:
     * - Divisible by 4 AND not divisible by 100, OR
     * - Divisible by 400
     *
     * @param {number} year - The year to check
     * @returns {boolean} True if leap year
     */
    isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    /**
     * ===== EXTENDED DATE CALCULATIONS =====
     *
     * Additional date calculation methods for specialized insights.
     * These provide more specific temporal information for advanced features.
     */

    /**
     * Get days since New Year's Day
     *
     * Alias for getDayOfYear for semantic clarity in certain contexts.
     *
     * @param {Date} date - The date to calculate from
     * @returns {number} Days since January 1st
     */
    getDaysSinceNewYear(date) {
        return this.getDayOfYear(date);
    }

    getDaysToWeekendLabel(date) {
        const daysToWeekend = this.getDaysToWeekend(date);
        return daysToWeekend > 0 ? 'Weekend' : 'Weekend';
    }

    getDaysToWeekendValue(date) {
        const daysToWeekend = this.getDaysToWeekend(date);
        return daysToWeekend > 0 ? `${daysToWeekend}d` : 'Today';
    }

    getWorkingDaysLeft(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const lastDay = new Date(year, month + 1, 0).getDate();
        let workingDays = 0;

        for (let day = date.getDate(); day <= lastDay; day++) {
            const currentDate = new Date(year, month, day);
            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                // Not Sunday or Saturday
                workingDays++;
            }
        }
        return workingDays;
    }

    getYearProgress(date) {
        const dayOfYear = this.getDayOfYear(date);
        const totalDaysInYear = this.isLeapYear(date.getFullYear()) ? 366 : 365;
        return Math.round((dayOfYear / totalDaysInYear) * 100);
    }

    getQuarterLabel(date) {
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        return `Q${quarter}`;
    }

    getQuarterProgress(date) {
        const quarter = Math.floor(date.getMonth() / 3);
        const quarterStartMonth = quarter * 3;
        const quarterStart = new Date(date.getFullYear(), quarterStartMonth, 1);
        const quarterEnd = new Date(date.getFullYear(), quarterStartMonth + 3, 0);

        const totalDays = Math.ceil((quarterEnd - quarterStart) / (1000 * 60 * 60 * 24));
        const daysPassed = Math.ceil((date - quarterStart) / (1000 * 60 * 60 * 24));

        return Math.round((daysPassed / totalDays) * 100);
    }

    getMonthName(date) {
        return date.toLocaleDateString('en-US', { month: 'short' });
    }

    getMonthProgress(date) {
        const totalDaysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        return Math.round((date.getDate() / totalDaysInMonth) * 100);
    }

    getWeekProgress(date) {
        const dayOfWeek = date.getDay();
        const adjustedDay = dayOfWeek === 0 ? 7 : dayOfWeek; // Sunday = 7
        return Math.round((adjustedDay / 7) * 100);
    }

    getCurrentSeason(date) {
        const month = date.getMonth();
        const day = date.getDate();

        if (
            (month === 11 && day >= 21) ||
            month === 0 ||
            month === 1 ||
            (month === 2 && day < 20)
        ) {
            return 'Winter';
        } else if (
            (month === 2 && day >= 20) ||
            month === 3 ||
            month === 4 ||
            (month === 5 && day < 21)
        ) {
            return 'Spring';
        } else if (
            (month === 5 && day >= 21) ||
            month === 6 ||
            month === 7 ||
            (month === 8 && day < 22)
        ) {
            return 'Summer';
        } else {
            return 'Autumn';
        }
    }

    getSeasonDay(date) {
        const season = this.getCurrentSeason(date);
        const year = date.getFullYear();
        let seasonStart;

        switch (season) {
            case 'Winter':
                seasonStart =
                    date.getMonth() === 11 ? new Date(year, 11, 21) : new Date(year - 1, 11, 21);
                break;
            case 'Spring':
                seasonStart = new Date(year, 2, 20);
                break;
            case 'Summer':
                seasonStart = new Date(year, 5, 21);
                break;
            case 'Autumn':
                seasonStart = new Date(year, 8, 22);
                break;
        }

        return Math.ceil((date - seasonStart) / (1000 * 60 * 60 * 24)) + 1;
    }

    getSeasonIcon(date) {
        const season = this.getCurrentSeason(date);
        const icons = {
            Winter: '<path d="M2 12h20"></path><path d="M12 2v20"></path><path d="M6 6l12 12"></path><path d="M6 18L18 6"></path>',
            Spring: '<path d="M12 2a3 3 0 0 0-3 3c0 1.5 1.5 3 3 3s3-1.5 3-3a3 3 0 0 0-3-3z"></path><path d="M12 8c-2 0-4 1-4 4v8h8v-8c0-3-2-4-4-4z"></path>',
            Summer: '<circle cx="12" cy="12" r="5"></circle><line x1="12" x2="12" y1="1" y2="3"></line><line x1="12" x2="12" y1="21" y2="23"></line><line x1="4.22" x2="5.64" y1="4.22" y2="5.64"></line><line x1="18.36" x2="19.78" y1="18.36" y2="19.78"></line><line x1="1" x2="3" y1="12" y2="12"></line><line x1="21" x2="23" y1="12" y2="12"></line><line x1="4.22" x2="5.64" y1="19.78" y2="18.36"></line><line x1="18.36" x2="19.78" y1="5.64" y2="4.22"></line>',
            Autumn: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>'
        };
        return icons[season] || icons['Summer'];
    }

    getMoonPhase(date) {
        // Simplified moon phase calculation
        const phases = [
            'New Moon',
            'Waxing Crescent',
            'First Quarter',
            'Waxing Gibbous',
            'Full Moon',
            'Waning Gibbous',
            'Last Quarter',
            'Waning Crescent'
        ];

        // Approximate lunar cycle (29.53 days)
        const knownNewMoon = new Date('2024-01-11'); // Known new moon date
        const daysSinceKnown = Math.floor((date - knownNewMoon) / (1000 * 60 * 60 * 24));
        const lunarCycle = 29.53;
        const phaseIndex = Math.floor((daysSinceKnown % lunarCycle) / (lunarCycle / 8));

        return phases[phaseIndex] || 'New Moon';
    }

    getSunsetTime(date) {
        // Simplified sunset calculation (would need geolocation for accuracy)
        // Using approximate times for mid-latitude locations
        const dayOfYear = this.getDayOfYear(date);
        const sunsetMinutes = 1080 + Math.sin(((dayOfYear - 81) * 2 * Math.PI) / 365) * 60; // Approximate

        const hours = Math.floor(sunsetMinutes / 60);
        const minutes = Math.floor(sunsetMinutes % 60);

        const displayHours = hours > 12 ? hours - 12 : hours;
        const period = hours >= 12 ? 'PM' : 'AM';

        return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }

    /**
     * ===== FOCUS TIMER FUNCTIONALITY =====
     *
     * Pomodoro-style focus timer with visual progress tracking and
     * session management. Provides 25-minute focused work sessions
     * with start, pause, reset, and completion handling.
     */

    /**
     * Update daily quotes visibility and state
     *
     * Shows or hides the daily quotes based on user settings and
     * ensures proper initialization or cleanup of the quotes system.
     */
    updateDailyQuotes() {
        const container = document.getElementById('daily-quote');
        if (!container) return;

        if (this.settings.dailyQuotes) {
            container.style.display = 'block';
            // Initialize quotes if not already done
            if (!this.quotesInitialized) {
                this.initDailyQuotes();
                this.quotesInitialized = true;
            }
        } else {
            container.style.display = 'none';
        }
    }

    /**
     * Update focus timer visibility and state
     *
     * Shows or hides the focus timer based on user settings and
     * ensures proper initialization of the timer display.
     */
    updateFocusTimer() {
        const container = document.getElementById('focus-timer-container');
        if (!container) return;

        if (this.settings.focusTimer) {
            container.classList.add('visible');
            this.updateFocusTimerDisplay();
        } else {
            container.classList.remove('visible');
            this.resetFocusTimer();
        }
    }

    /**
     * Start the focus timer session
     *
     * Begins a 25-minute Pomodoro session with visual feedback and
     * automatic completion handling. Updates UI states and starts
     * the countdown interval.
     */
    startFocusTimer() {
        if (this.focusTimer.isRunning) return; // Prevent double-start

        // Update timer state
        this.focusTimer.isRunning = true;
        this.focusTimer.isPaused = false;

        // Update button visual states
        document.getElementById('focus-timer-start').classList.add('active');
        document.getElementById('focus-timer-pause').classList.remove('active');

        // Update timer ring visual state
        const timerRing = document.querySelector('.focus-timer-ring');
        if (timerRing) {
            timerRing.classList.add('running');
            timerRing.classList.remove('paused', 'completed');
        }

        // Start countdown with 1-second intervals
        this.focusTimer.interval = setInterval(() => {
            this.focusTimer.remaining--;
            this.updateFocusTimerDisplay();

            // Check for completion
            if (this.focusTimer.remaining <= 0) {
                this.completeFocusTimer();
            }
        }, 1000);
    }

    /**
     * Pause the focus timer session
     *
     * Pauses the current session while preserving the remaining time.
     * Updates visual states and clears the countdown interval.
     */
    pauseFocusTimer() {
        if (!this.focusTimer.isRunning) return; // Can only pause running timer

        // Update timer state
        this.focusTimer.isRunning = false;
        this.focusTimer.isPaused = true;

        // Update button visual states
        document.getElementById('focus-timer-start').classList.remove('active');
        document.getElementById('focus-timer-pause').classList.add('active');

        // Update timer ring visual state
        const timerRing = document.querySelector('.focus-timer-ring');
        if (timerRing) {
            timerRing.classList.remove('running');
            timerRing.classList.add('paused');
        }

        // Stop the countdown interval
        if (this.focusTimer.interval) {
            clearInterval(this.focusTimer.interval);
            this.focusTimer.interval = null;
        }
    }

    /**
     * Reset the focus timer to initial state
     *
     * Resets the timer to 25 minutes, clears all states, and updates
     * the display. Can be called from any timer state.
     */
    resetFocusTimer() {
        // Reset timer state to initial values
        this.focusTimer.isRunning = false;
        this.focusTimer.isPaused = false;
        this.focusTimer.remaining = this.focusTimer.duration;

        // Clear button active states
        document.getElementById('focus-timer-start')?.classList.remove('active');
        document.getElementById('focus-timer-pause')?.classList.remove('active');

        // Reset timer ring visual state
        const timerRing = document.querySelector('.focus-timer-ring');
        if (timerRing) {
            timerRing.classList.remove('running', 'paused', 'completed');
        }

        // Clear any active interval
        if (this.focusTimer.interval) {
            clearInterval(this.focusTimer.interval);
            this.focusTimer.interval = null;
        }

        // Update display to show reset state
        this.updateFocusTimerDisplay();
    }

    /**
     * Complete the focus timer session
     *
     * Handles timer completion with celebration animation, user notification,
     * and automatic reset. Provides positive feedback for successful sessions.
     */
    completeFocusTimer() {
        // Update timer state to completed
        this.focusTimer.isRunning = false;
        this.focusTimer.isPaused = false;

        // Clear button active states
        document.getElementById('focus-timer-start')?.classList.remove('active');
        document.getElementById('focus-timer-pause')?.classList.remove('active');

        // Show completion visual state
        const timerRing = document.querySelector('.focus-timer-ring');
        if (timerRing) {
            timerRing.classList.remove('running', 'paused');
            timerRing.classList.add('completed');
        }

        // Clear the countdown interval
        if (this.focusTimer.interval) {
            clearInterval(this.focusTimer.interval);
            this.focusTimer.interval = null;
        }

        // Celebrate completion with notification
        this.notificationSystem.show(
            'success',
            'Focus Session Complete!',
            'Great job staying focused for 25 minutes',
            5000
        );

        // Auto-reset after brief celebration period
        setTimeout(() => {
            this.resetFocusTimer();
        }, 3000);
    }

    /**
     * Update focus timer display elements
     *
     * Updates the time display and circular progress indicator based on
     * current timer state. Handles both time formatting and SVG circle
     * animation calculations.
     */
    updateFocusTimerDisplay() {
        const timeElement = document.querySelector('.focus-timer-time');
        const progressElement = document.querySelector('.focus-timer-progress');
        const glowElement = document.querySelector('.focus-timer-glow');

        // Update time display in MM:SS format
        if (timeElement) {
            const minutes = Math.floor(this.focusTimer.remaining / 60);
            const seconds = this.focusTimer.remaining % 60;
            timeElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        // Update circular progress indicator
        if (progressElement) {
            // Calculate progress as ratio (0 to 1)
            const progress =
                (this.focusTimer.duration - this.focusTimer.remaining) / this.focusTimer.duration;

            // SVG circle circumference calculation: 2 * π * radius = 2 * π * 70 = 439.82
            const circumference = 439.82;
            const offset = circumference - progress * circumference;

            // Apply stroke-dashoffset to both progress and glow elements
            progressElement.style.strokeDashoffset = offset;
            if (glowElement) {
                glowElement.style.strokeDashoffset = offset;
            }
        }
    }

    /**
     * ===== CUSTOM DROPDOWN FUNCTIONALITY =====
     *
     * Advanced dropdown component with keyboard navigation, accessibility
     * support, and smooth animations. Used for color theme selection
     * with proper ARIA attributes and focus management.
     */

    /**
     * Initialize custom dropdown component
     *
     * Sets up event listeners for mouse and keyboard interactions,
     * implements accessibility features, and handles outside clicks.
     * Provides a native-like dropdown experience with custom styling.
     */
    initCustomDropdown() {
        const trigger = document.getElementById('color-theme-trigger');
        const menu = document.getElementById('color-theme-menu');
        const dropdown = document.getElementById('color-theme-dropdown');

        if (!trigger || !menu || !dropdown) return;

        // Toggle dropdown on trigger click
        trigger.addEventListener('click', e => {
            e.stopPropagation();
            const isActive = trigger.classList.contains('active');

            if (isActive) {
                this.closeDropdown();
            } else {
                this.openDropdown();
            }
        });

        // Keyboard accessibility for trigger button
        trigger.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isActive = trigger.classList.contains('active');
                if (isActive) {
                    this.closeDropdown();
                } else {
                    this.openDropdown();
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.openDropdown();
            }
        });

        // Handle theme selection from dropdown items
        menu.addEventListener('click', e => {
            const item = e.target.closest('.dropdown-item');
            if (!item) return;

            this.selectThemeOption(item);
        });

        // Advanced keyboard navigation for dropdown menu
        menu.addEventListener('keydown', e => {
            const items = Array.from(menu.querySelectorAll('.dropdown-item'));
            const currentIndex = items.indexOf(document.activeElement);

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    const nextIndex = Math.min(currentIndex + 1, items.length - 1);
                    items[nextIndex]?.focus();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    const prevIndex = Math.max(currentIndex - 1, 0);
                    items[prevIndex]?.focus();
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    if (document.activeElement.classList.contains('dropdown-item')) {
                        this.selectThemeOption(document.activeElement);
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.closeDropdown();
                    break;
            }
        });

        // Close dropdown when clicking outside (click-away behavior)
        document.addEventListener('click', e => {
            if (!dropdown.contains(e.target)) {
                this.closeDropdown();
            }
        });

        // Global escape key handler for dropdown
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                this.closeDropdown();
            }
        });
    }

    /**
     * Open the dropdown menu with accessibility support
     *
     * Shows the dropdown menu, updates ARIA attributes, and focuses
     * the first menu item for keyboard navigation.
     */
    openDropdown() {
        const trigger = document.getElementById('color-theme-trigger');
        const menu = document.getElementById('color-theme-menu');
        const dropdown = document.getElementById('color-theme-dropdown');

        if (trigger && menu && dropdown) {
            // Update visual states
            trigger.classList.add('active');
            menu.classList.add('active');

            // Update accessibility attributes
            dropdown.setAttribute('aria-expanded', 'true');

            // Focus management for keyboard users
            const firstOption = menu.querySelector('.dropdown-item');
            if (firstOption) {
                firstOption.focus();
            }
        }
    }

    /**
     * Close the dropdown menu with focus restoration
     *
     * Hides the dropdown menu, updates ARIA attributes, and restores
     * focus to the trigger button for accessibility.
     */
    closeDropdown() {
        const trigger = document.getElementById('color-theme-trigger');
        const menu = document.getElementById('color-theme-menu');
        const dropdown = document.getElementById('color-theme-dropdown');

        if (trigger && menu && dropdown) {
            // Update visual states
            trigger.classList.remove('active');
            menu.classList.remove('active');

            // Update accessibility attributes
            dropdown.setAttribute('aria-expanded', 'false');

            // Restore focus to trigger for keyboard users
            trigger.focus();
        }
    }

    /**
     * Handle theme selection from dropdown item
     *
     * Processes user selection, updates UI state, saves settings,
     * and applies the new theme immediately.
     *
     * @param {HTMLElement} item - The selected dropdown item
     */
    selectThemeOption(item) {
        const value = item.dataset.value;
        const text = item.querySelector('span').textContent;

        // Update dropdown UI state
        this.selectDropdownItem(value, text);
        this.closeDropdown();

        // Apply theme change
        this.settings.colorTheme = value;
        this.saveSettings();
        this.applySettings();
        this.updateResetButtonState();
    }

    /**
     * Update dropdown item selection state
     *
     * Updates the displayed value and manages the selected state
     * of dropdown items with proper ARIA attributes for accessibility.
     *
     * @param {string} value - The value of the selected item
     * @param {string} text - The display text for the selected item
     */
    selectDropdownItem(value, text) {
        const valueElement = document.querySelector('.dropdown-value');
        const items = document.querySelectorAll('.dropdown-item');

        // Update the displayed value in the trigger
        if (valueElement) {
            valueElement.textContent = text;
        }

        // Update selection state for all items
        items.forEach(item => {
            const isSelected = item.dataset.value === value;
            item.classList.toggle('selected', isSelected);
            item.setAttribute('aria-selected', isSelected.toString());
        });
    }

    /**
     * Update custom dropdown to reflect current theme
     *
     * Synchronizes the dropdown display with the current color theme
     * setting. Maps theme IDs to human-readable names.
     */
    updateCustomDropdown() {
        // Theme ID to display name mapping
        const themeNames = {
            blue: 'Blue (Default)',
            purple: 'Purple',
            green: 'Green',
            orange: 'Orange',
            pink: 'Pink',
            red: 'Red',
            cyan: 'Cyan',
            yellow: 'Yellow',
            indigo: 'Indigo'
        };

        const currentTheme = this.settings.colorTheme || 'blue';
        const currentText = themeNames[currentTheme] || 'Blue (Default)';

        this.selectDropdownItem(currentTheme, currentText);
    }

    /**
     * ===== COLOR THEMES FUNCTIONALITY =====
     *
     * Comprehensive color theme system with 9 carefully selected themes.
     * Each theme provides consistent accent colors across the entire
     * extension with proper accessibility and visual feedback.
     */

    /**
     * Initialize color theme selection grid
     *
     * Creates interactive theme options with color previews and proper
     * accessibility attributes. Supports both mouse and keyboard interaction.
     */
    initializeColorThemes() {
        const container = document.getElementById('color-theme-grid');
        if (!container) return;

        // Clear any existing content
        container.innerHTML = '';

        // Curated color theme collection
        const colorThemes = [
            { id: 'blue', name: 'Blue', color: '#3b82f6' }, // Default - professional blue
            { id: 'purple', name: 'Purple', color: '#8b5cf6' }, // Creative purple
            { id: 'green', name: 'Green', color: '#10b981' }, // Success green
            { id: 'orange', name: 'Orange', color: '#f59e0b' }, // Energetic orange
            { id: 'pink', name: 'Pink', color: '#ec4899' }, // Playful pink
            { id: 'red', name: 'Red', color: '#ef4444' }, // Bold red
            { id: 'cyan', name: 'Cyan', color: '#06b6d4' }, // Cool cyan
            { id: 'yellow', name: 'Yellow', color: '#eab308' }, // Bright yellow
            { id: 'indigo', name: 'Indigo', color: '#6366f1' } // Deep indigo
        ];

        // Generate theme option elements
        colorThemes.forEach(theme => {
            const option = this.createColorThemeOption(theme);
            container.appendChild(option);
        });

        // Synchronize with current selection
        this.updateColorThemeSelection();
    }

    /**
     * Create a color theme option element
     *
     * Generates an interactive theme option with color preview, name,
     * and full accessibility support including ARIA attributes and
     * keyboard navigation.
     *
     * @param {Object} theme - Theme configuration object
     * @param {string} theme.id - Unique theme identifier
     * @param {string} theme.name - Human-readable theme name
     * @param {string} theme.color - CSS color value for preview
     * @returns {HTMLElement} The created theme option element
     */
    createColorThemeOption(theme) {
        const option = document.createElement('div');
        option.className = 'color-theme-option';
        option.dataset.themeId = theme.id;

        // Accessibility attributes for radio button behavior
        option.setAttribute('role', 'radio');
        option.setAttribute('tabindex', '0');
        option.setAttribute('aria-label', `${theme.name} theme`);

        // Theme preview and name display
        option.innerHTML = `
            <div class="theme-preview" style="background-color: ${theme.color}"></div>
            <span class="theme-name">${theme.name}</span>
        `;

        // Mouse interaction handler
        option.addEventListener('click', () => {
            this.selectColorTheme(theme.id);
        });

        // Keyboard accessibility handler
        option.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.selectColorTheme(theme.id);
            }
        });

        return option;
    }

    /**
     * Select and apply a color theme
     *
     * Updates settings, applies the theme to the document, updates UI
     * selection state, and provides user feedback through notifications.
     *
     * @param {string} themeId - The ID of the theme to select
     */
    selectColorTheme(themeId) {
        // Persist theme selection
        this.settings.colorTheme = themeId;
        this.saveSettings();

        // Apply theme immediately to document
        document.documentElement.setAttribute('data-theme', themeId);

        // Update selection UI state
        this.updateColorThemeSelection();

        // Provide user feedback
        const themeName = themeId.charAt(0).toUpperCase() + themeId.slice(1);
        this.notificationSystem.show('success', `${themeName} Theme`, 'Color theme updated', 1500);

        // Update reset button state
        this.updateResetButtonState();
    }

    /**
     * ===== DAILY QUOTES SYSTEM =====
     *
     * Inspirational quote display system with daily rotation and manual refresh.
     * Provides motivational content below the date insights with elegant typography
     * and smooth animations. Features consistent daily quotes and refresh functionality.
     */

    /**
     * Initialize the daily quotes system
     *
     * Sets up the quote display, loads today's quote, and initializes
     * the refresh button with proper event handlers and accessibility.
     */
    initDailyQuotes() {
        try {
            // Display today's quote immediately
            this.displayTodaysQuote();

            // Set up refresh button functionality
            this.initQuoteRefreshButton();

            // Keyboard shortcut (Q key) is handled in main keyboard handler

            // Animate quote container into view
            this.animateQuoteContainer();
        } catch (error) {
            console.error('Error initializing daily quotes:', error);
            // Graceful degradation - hide quote container if initialization fails
            const quoteContainer = document.getElementById('daily-quote');
            if (quoteContainer) {
                quoteContainer.style.display = 'none';
            }
        }
    }

    /**
     * Display today's quote with consistent daily rotation
     *
     * Uses date-based algorithm to ensure the same quote shows all day
     * but changes daily. Provides consistent experience across browser sessions.
     */
    displayTodaysQuote() {
        const quote = this.getTodaysQuote();
        this.displayQuote(quote);
    }

    /**
     * Get today's quote using date-based rotation
     *
     * Calculates day of year and uses modulo to select a consistent
     * quote for the entire day. Ensures same quote across all sessions.
     *
     * @returns {Object} Quote object with text, author, and category
     */
    getTodaysQuote() {
        try {
            const today = new Date();
            const dayOfYear = Math.floor(
                (today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
            );
            const quoteIndex = dayOfYear % DAILY_QUOTES.length;
            return DAILY_QUOTES[quoteIndex];
        } catch (error) {
            console.error("Error getting today's quote:", error);
            // Fallback to first quote
            return DAILY_QUOTES[0];
        }
    }

    /**
     * Get a random quote for manual refresh with smart logic
     *
     * Uses intelligent randomization to avoid repetition and provide variety:
     * 1. Avoids showing the same quote twice in a row
     * 2. Balances categories for diverse inspiration
     * 3. Prefers shorter quotes during work hours (9-5)
     * 4. Uses time-based seeding for better distribution
     *
     * @returns {Object} Random quote object with text, author, and category
     */
    getRandomQuote() {
        try {
            const currentHour = new Date().getHours();
            const isWorkHours = currentHour >= 9 && currentHour <= 17;

            // Get last shown quote to avoid repetition
            const lastQuoteIndex = this.lastRandomQuoteIndex || -1;

            // Filter quotes based on context
            let availableQuotes = DAILY_QUOTES.filter((quote, index) => {
                // Avoid showing the same quote twice in a row
                if (index === lastQuoteIndex) return false;

                // During work hours, prefer productivity/focus/innovation quotes
                if (isWorkHours) {
                    const workCategories = [
                        'productivity',
                        'focus',
                        'innovation',
                        'success',
                        'excellence'
                    ];
                    return workCategories.includes(quote.category);
                }

                return true;
            });

            // If no quotes available (shouldn't happen), use all quotes
            if (availableQuotes.length === 0) {
                availableQuotes = DAILY_QUOTES;
            }

            // Use time-based seeding for better randomness
            const seed = Date.now() % 1000;
            const randomIndex =
                Math.floor((Math.random() + seed / 1000) * availableQuotes.length) %
                availableQuotes.length;
            const selectedQuote = availableQuotes[randomIndex];

            // Store the original index to avoid repetition
            this.lastRandomQuoteIndex = DAILY_QUOTES.indexOf(selectedQuote);

            return selectedQuote;
        } catch (error) {
            console.error('Error getting random quote:', error);
            // Fallback to first quote
            return DAILY_QUOTES[0];
        }
    }

    /**
     * Get a quote by specific category
     *
     * Allows filtering quotes by category for targeted inspiration.
     * Useful for different moods or contexts.
     *
     * @param {string} category - The category to filter by
     * @returns {Object} Random quote from the specified category
     */
    getQuoteByCategory(category) {
        try {
            const categoryQuotes = DAILY_QUOTES.filter(quote => quote.category === category);

            if (categoryQuotes.length === 0) {
                // If category not found, return random quote
                return this.getRandomQuote();
            }

            const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
            return categoryQuotes[randomIndex];
        } catch (error) {
            console.error('Error getting quote by category:', error);
            return DAILY_QUOTES[0];
        }
    }

    /**
     * Get quote statistics for debugging/analytics
     *
     * Returns information about the quote database for development purposes.
     *
     * @returns {Object} Statistics about the quote collection
     */
    getQuoteStats() {
        try {
            const categories = {};
            const lengths = { short: 0, medium: 0, long: 0 };

            DAILY_QUOTES.forEach(quote => {
                // Count by category
                categories[quote.category] = (categories[quote.category] || 0) + 1;

                // Count by length
                if (quote.text.length <= 30) lengths.short++;
                else if (quote.text.length <= 50) lengths.medium++;
                else lengths.long++;
            });

            return {
                total: DAILY_QUOTES.length,
                categories: categories,
                lengths: lengths,
                averageLength: Math.round(
                    DAILY_QUOTES.reduce((sum, q) => sum + q.text.length, 0) / DAILY_QUOTES.length
                )
            };
        } catch (error) {
            console.error('Error getting quote stats:', error);
            return { total: 0, categories: {}, lengths: {}, averageLength: 0 };
        }
    }

    /**
     * Display a quote in the UI with proper formatting
     *
     * Updates the quote text and author elements with accessibility
     * attributes and proper content formatting.
     *
     * @param {Object} quote - Quote object to display
     * @param {string} quote.text - The quote text
     * @param {string} quote.author - The quote author
     * @param {string} quote.category - The quote category
     */
    displayQuote(quote) {
        try {
            const quoteTextElement = document.getElementById('quote-text');
            const quoteAuthorElement = document.getElementById('quote-author');

            if (quoteTextElement && quoteAuthorElement) {
                // Update quote text
                quoteTextElement.textContent = quote.text;

                // Update author with proper formatting
                quoteAuthorElement.textContent = `— ${quote.author}`;

                // Update accessibility attributes
                const quoteContainer = document.getElementById('daily-quote');
                if (quoteContainer) {
                    quoteContainer.setAttribute(
                        'aria-label',
                        `Daily inspirational quote: ${quote.text} by ${quote.author}`
                    );
                }
            }
        } catch (error) {
            console.error('Error displaying quote:', error);
        }
    }

    /**
     * Initialize quote refresh button functionality
     *
     * Sets up click handler for the refresh button with proper
     * accessibility and visual feedback.
     */
    initQuoteRefreshButton() {
        const refreshButton = document.getElementById('quote-refresh');
        if (!refreshButton) return;

        refreshButton.addEventListener('click', () => {
            this.refreshQuote();
        });

        // Keyboard accessibility
        refreshButton.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.refreshQuote();
            }
        });
    }

    /**
     * Refresh quote with new random selection
     *
     * Gets a new random quote and displays it with visual feedback.
     * Provides immediate response to user interaction.
     */
    refreshQuote() {
        try {
            // Get new random quote
            const newQuote = this.getRandomQuote();

            // Display the new quote
            this.displayQuote(newQuote);

            // Provide user feedback
            this.notificationSystem.show('info', 'New Quote', 'Fresh inspiration loaded', 1500);

            // Brief visual feedback on refresh button
            const refreshButton = document.getElementById('quote-refresh');
            if (refreshButton) {
                refreshButton.style.transform = 'rotate(360deg)';
                setTimeout(() => {
                    refreshButton.style.transform = '';
                }, 300);
            }
        } catch (error) {
            console.error('Error refreshing quote:', error);

            // Show error feedback to user
            this.notificationSystem.show('error', 'Quote Refresh Failed', 'Please try again', 2000);
        }
    }

    /**
     * Animate quote container into view
     *
     * Applies entrance animation to the quote container matching
     * the timing of other UI elements for consistent experience.
     * Uses the same animation timing as smart date features.
     */
    animateQuoteContainer() {
        const quoteContainer = document.getElementById('daily-quote');
        if (!quoteContainer) return;

        // Animation is handled by CSS - just trigger the visible state
        // The CSS transition will handle the smooth animation
        setTimeout(() => {
            quoteContainer.style.opacity = '1';
            quoteContainer.style.transform = 'translateY(0)';
        }, 200); // Delay after date insights (150ms + 50ms buffer)
    }

    /**
     * Update color theme selection UI state
     *
     * Synchronizes the visual selection state of theme options with
     * the current settings, including proper ARIA attributes.
     */
    updateColorThemeSelection() {
        const currentTheme = this.settings.colorTheme || 'blue';
        const options = document.querySelectorAll('.color-theme-option');

        options.forEach(option => {
            const themeId = option.dataset.themeId;
            const isSelected = themeId === currentTheme;

            // Update visual and accessibility states
            option.classList.toggle('active', isSelected);
            option.setAttribute('aria-checked', isSelected.toString());
        });
    }

    /**
     * ===== TYPOGRAPHY THEMES FUNCTIONALITY =====
     *
     * Advanced typography theme system with curated font combinations
     * inspired by popular design systems. Each theme defines fonts for
     * different UI contexts with proper preview and accessibility support.
     */

    /**
     * Initialize typography theme selection interface
     *
     * Creates interactive typography options with font previews and
     * descriptions. Supports both mouse and keyboard interaction with
     * proper accessibility attributes.
     */
    initTypographyThemes() {
        const container = document.getElementById('typography-selector');
        if (!container) return;

        // Clear any existing content
        container.innerHTML = '';

        // Generate typography theme options
        Object.entries(this.typographyThemes).forEach(([themeId, theme]) => {
            const option = this.createTypographyOption(themeId, theme);
            container.appendChild(option);
        });

        // Synchronize with current selection
        this.updateTypographySelection();
    }

    /**
     * Create a typography theme option element
     *
     * Generates an interactive typography option with radio button styling,
     * theme information, and font preview. Includes full accessibility
     * support and keyboard navigation.
     *
     * @param {string} themeId - Unique theme identifier
     * @param {Object} theme - Theme configuration object
     * @param {string} theme.name - Human-readable theme name
     * @param {string} theme.description - Theme description
     * @param {string} theme.clock - Clock font name for preview
     * @returns {HTMLElement} The created typography option element
     */
    createTypographyOption(themeId, theme) {
        const option = document.createElement('div');
        option.className = 'typography-option';
        option.dataset.themeId = themeId;

        // Accessibility attributes for radio button behavior
        option.setAttribute('role', 'radio');
        option.setAttribute('tabindex', '0');

        // Typography option layout with radio, info, and preview
        option.innerHTML = `
            <div class="typography-radio"></div>
            <div class="typography-info">
                <div class="typography-name">${theme.name}</div>
                <div class="typography-description">${theme.description}</div>
            </div>
            <div class="typography-preview">
                <span class="typography-preview-font">${theme.clock}</span>
            </div>
        `;

        // Mouse interaction handler
        option.addEventListener('click', () => {
            this.selectTypographyTheme(themeId);
        });

        // Keyboard accessibility handler
        option.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.selectTypographyTheme(themeId);
            }
        });

        return option;
    }

    /**
     * Update typography theme selection UI state
     *
     * Synchronizes the visual selection state of typography options with
     * the current settings, including proper ARIA attributes for accessibility.
     */
    updateTypographySelection() {
        const currentTheme = this.settings.typographyTheme || 'classic-pro';
        const options = document.querySelectorAll('.typography-option');

        options.forEach(option => {
            const themeId = option.dataset.themeId;
            const isSelected = themeId === currentTheme;

            // Update visual and accessibility states
            option.classList.toggle('selected', isSelected);
            option.setAttribute('aria-checked', isSelected.toString());
        });
    }

    /**
     * ===== QUICK NOTES FUNCTIONALITY =====
     *
     * Persistent note-taking overlay with auto-save functionality.
     * Provides instant access to notes via keyboard shortcuts with
     * proper focus management and accessibility support.
     */

    /**
     * Update Quick Notes system state
     *
     * Handles initialization when Quick Notes is enabled. Unlike other
     * features, Quick Notes doesn't require visual updates since it's
     * controlled entirely by keyboard shortcuts and settings.
     */
    updateQuickNotes() {
        // Load notes when feature is enabled
        if (this.settings.quickNotes) {
            this.loadQuickNotes();
        }
    }

    /**
     * Update Todo List feature state
     *
     * Handles initialization when Todo List is enabled and provides
     * user feedback when the feature is disabled. Manages visibility
     * and state based on user settings.
     */
    updateTodoList() {
        if (this.settings.todoList) {
            // Load tasks when feature is enabled
            this.loadTodoTasks();
        } else {
            // Close todo panel if it's open when feature is disabled
            if (this.todoVisible) {
                this.closeTodoPanel();
            }
        }
    }

    /**
     * Toggle Quick Notes overlay visibility
     *
     * Shows or hides the Quick Notes overlay with proper state checking.
     * Provides user feedback when the feature is disabled.
     */
    toggleQuickNotes() {
        if (!this.settings.quickNotes) {
            // Inform user that feature needs to be enabled
            this.notificationSystem.show(
                'info',
                'Quick Notes Disabled',
                'Enable Quick Notes in settings first',
                3000
            );
            return;
        }

        // Toggle overlay visibility
        if (this.quickNotesVisible) {
            this.closeQuickNotes();
        } else {
            this.openQuickNotes();
        }
    }

    /**
     * Open the Quick Notes overlay
     *
     * Shows the notes overlay with proper accessibility attributes,
     * focus management, and animation timing. Prevents body scrolling
     * while overlay is active.
     */
    openQuickNotes() {
        const overlay = document.getElementById('quick-notes-overlay');
        const textarea = document.getElementById('quick-notes-textarea');

        if (overlay && textarea) {
            // Close any other open modals first
            this.closeAllModals();
            this.activeModal = 'notes';

            // Store focus origin for restoration when closing
            this.notesTrigger = document.activeElement;

            // Update overlay state
            this.quickNotesVisible = true;
            overlay.classList.add('active');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Prevent background scroll

            // Load any saved notes
            this.loadQuickNotes();

            // Focus textarea after animation completes
            setTimeout(() => {
                textarea.focus();
            }, 300);
        }
    }

    /**
     * Close the Quick Notes overlay
     *
     * Hides the overlay, saves current notes, restores focus to the
     * trigger element, and re-enables body scrolling.
     */
    closeQuickNotes() {
        const overlay = document.getElementById('quick-notes-overlay');

        if (overlay) {
            // Clear active modal state
            if (this.activeModal === 'notes') {
                this.activeModal = null;
            }

            // Update overlay state
            this.quickNotesVisible = false;
            overlay.classList.remove('active');

            // Remove focus from any focused elements first to prevent aria-hidden warning
            if (document.activeElement && overlay.contains(document.activeElement)) {
                document.activeElement.blur();
            }

            overlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Restore body scrolling

            // Persist notes before closing
            this.saveQuickNotes();

            // Restore focus to trigger element
            if (this.notesTrigger) {
                this.notesTrigger.focus();
                this.notesTrigger = null;
            }
        }
    }

    /**
     * Handle Quick Notes input with auto-save
     *
     * Processes user input and implements debounced auto-save to prevent
     * excessive storage operations while typing. Provides visual feedback
     * when notes are saved. Includes smart length validation with user warnings.
     *
     * @param {Event} e - The input event from the textarea
     */
    handleNotesInput(e) {
        const content = e.target.value;
        const MAX_NOTE_LENGTH = 100000; // 100KB limit for performance
        const WARNING_THRESHOLD = 90000; // Warn at 90KB

        // ===== ENHANCED NOTE LENGTH VALIDATION =====
        if (content.length > MAX_NOTE_LENGTH) {
            // Prevent exceeding maximum length
            e.target.value = content.substring(0, MAX_NOTE_LENGTH);
            this.quickNotesContent = e.target.value;

            this.notificationSystem.show(
                'warning',
                'Note Too Large',
                'Notes are limited to 100KB for optimal performance',
                4000
            );
            return;
        }

        // Warn user when approaching limit
        if (content.length > WARNING_THRESHOLD && content.length <= MAX_NOTE_LENGTH) {
            const remaining = MAX_NOTE_LENGTH - content.length;
            const remainingKB = Math.round(remaining / 1000);

            this.notificationSystem.show(
                'info',
                'Approaching Limit',
                `${remainingKB}KB remaining before size limit`,
                3000
            );
        }

        this.quickNotesContent = content;

        // ===== UPDATE CHARACTER COUNTER =====
        this.updateNotesCharacterCounter(content.length);

        // Debounced auto-save to prevent excessive storage operations
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        }

        this.saveTimeout = setTimeout(() => {
            this.saveQuickNotes();
            this.showSaveIndicator();
        }, 1000); // Save after 1 second of inactivity
    }

    /**
     * Save Quick Notes to storage
     *
     * Persists notes using multiple storage strategies for maximum reliability:
     * 1. Browser extension storage (preferred)
     * 2. localStorage (fallback)
     *
     * @async
     * @returns {Promise<void>}
     */
    async saveQuickNotes() {
        try {
            // Cross-browser API detection
            const api = typeof browser !== 'undefined' && browser.runtime ? browser : chrome;

            if (api?.storage?.local) {
                // Preferred: extension storage for persistence
                await api.storage.local.set({ quickNotesContent: this.quickNotesContent });
            } else {
                // Fallback: localStorage for basic persistence
                localStorage.setItem('nexus-quick-notes', this.quickNotesContent);
            }
        } catch (error) {
            // Final fallback: localStorage with error handling
            try {
                localStorage.setItem('nexus-quick-notes', this.quickNotesContent);
            } catch (localError) {
                // Complete storage failure - notes will be lost
            }
        }
    }

    /**
     * Load Quick Notes from storage
     *
     * Retrieves saved notes using multiple storage strategies and updates
     * the textarea content. Handles storage failures gracefully.
     *
     * @async
     * @returns {Promise<void>}
     */
    async loadQuickNotes() {
        try {
            let savedContent = '';

            // Cross-browser API detection
            const api = typeof browser !== 'undefined' && browser.runtime ? browser : chrome;

            if (api?.storage?.local) {
                // Preferred: extension storage
                const result = await api.storage.local.get(['quickNotesContent']);
                savedContent = result.quickNotesContent || '';
            } else {
                // Fallback: localStorage
                savedContent = localStorage.getItem('nexus-quick-notes') || '';
            }

            // Update internal state and UI
            this.quickNotesContent = savedContent;

            const textarea = document.getElementById('quick-notes-textarea');
            if (textarea) {
                textarea.value = savedContent;
                // Initialize character counter
                this.updateNotesCharacterCounter(savedContent.length);
            }
        } catch (error) {
            // Final fallback: localStorage with error handling
            try {
                this.quickNotesContent = localStorage.getItem('nexus-quick-notes') || '';
                const textarea = document.getElementById('quick-notes-textarea');
                if (textarea) {
                    textarea.value = this.quickNotesContent;
                    // Initialize character counter for fallback case
                    this.updateNotesCharacterCounter(this.quickNotesContent.length);
                }
            } catch (localError) {
                // Complete storage failure - start with empty notes
                this.quickNotesContent = '';
            }
        }
    }

    /**
     * Show visual save indicator
     *
     * Provides user feedback when notes are auto-saved by temporarily
     * showing a checkmark icon and "Saved" text with accent color.
     */
    showSaveIndicator() {
        const info = document.querySelector('.quick-notes-info');

        if (info) {
            // Store original content for restoration
            const originalHTML = info.innerHTML;

            // Show "Saved" state with checkmark icon
            info.innerHTML = `
                <svg class="save-icon saved" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
                Saved
            `;
            info.style.color = 'var(--accent)';
            info.classList.add('saved-state');

            // Restore original state after brief display
            setTimeout(() => {
                info.innerHTML = originalHTML;
                info.style.color = '';
                info.classList.remove('saved-state');
            }, 2000);
        }
    }

    /**
     * Update character counter with smart formatting
     *
     * Updates the character counter display with current count and provides
     * visual feedback when approaching or exceeding limits. Uses smart
     * formatting to show KB for large numbers.
     *
     * @param {number} count - Current character count
     */
    updateNotesCharacterCounter(count) {
        const counter = document.getElementById('quick-notes-counter');
        if (!counter) return;

        const MAX_LENGTH = 100000; // 100KB
        const WARNING_THRESHOLD = 90000; // 90KB

        // ===== SMART FORMATTING =====
        let displayCount;
        if (count < 1000) {
            displayCount = count.toString();
        } else {
            displayCount = Math.round(count / 1000) + 'K';
        }

        // ===== UPDATE COUNTER TEXT =====
        counter.textContent = `${displayCount} / 100K`;

        // ===== VISUAL FEEDBACK BASED ON USAGE =====
        counter.classList.remove('warning', 'danger', 'normal');

        if (count >= MAX_LENGTH) {
            counter.classList.add('danger');
            counter.style.color = '#ef4444'; // Red for at limit
        } else if (count >= WARNING_THRESHOLD) {
            counter.classList.add('warning');
            counter.style.color = '#f59e0b'; // Orange for warning
        } else {
            counter.classList.add('normal');
            counter.style.color = 'var(--text-muted)'; // Normal muted color
        }
    }

    /**
     * ===== FONT FUNCTIONALITY =====
     *
     * Font selection and cycling system for quick font switching.
     * Supports both direct selection and keyboard-driven cycling
     * through the entire font collection.
     */

    /**
     * Select a specific font by name
     *
     * Updates settings, applies the font immediately, and provides
     * user feedback with font type and source information.
     *
     * @param {string} fontName - The name of the font to select
     */
    selectFont(fontName) {
        const selectedFont = this.availableFonts.find(font => font.name === fontName);

        // Update and persist font selection
        this.settings.clockFont = fontName;
        this.saveSettings();

        // Apply font immediately (local fonts load instantly)
        this.applyFontSetting();

        // Provide clean user feedback without embedded SVG (for security)
        const fontType = selectedFont?.type || 'font';
        const capitalizedType = fontType.charAt(0).toUpperCase() + fontType.slice(1);
        const fontSource = selectedFont?.local ? 'Local' : 'System';

        this.notificationSystem.show(
            'success',
            `${fontName}`,
            `${capitalizedType} • ${fontSource}`,
            1500
        );

        this.updateResetButtonState();
    }

    /**
     * Cycle to the next available font
     *
     * Advances to the next font in the collection, wrapping around
     * to the beginning when reaching the end. Uses selectFont for
     * consistent behavior and user feedback.
     */
    cycleFonts() {
        const currentIndex = this.availableFonts.findIndex(
            font => font.name === this.settings.clockFont
        );
        const nextIndex = (currentIndex + 1) % this.availableFonts.length;
        const nextFont = this.availableFonts[nextIndex];

        // Use selectFont for consistent behavior and feedback
        this.selectFont(nextFont.name);
    }

    /**
     * ===== RESET FUNCTIONALITY =====
     *
     * Comprehensive reset system for restoring default settings.
     * Includes confirmation dialogs, state validation, and user feedback.
     */

    /**
     * Handle reset shortcut (R key)
     *
     * Processes keyboard shortcut reset with confirmation dialog.
     * Validates current state before showing confirmation to avoid
     * unnecessary resets.
     */
    handleResetShortcut() {
        // Validate that reset is needed
        if (this.areSettingsAtDefault()) {
            this.notificationSystem.show('info', 'Already at Defaults', 'No settings to reset');
            return;
        }

        // Show confirmation dialog for keyboard shortcut reset
        this.notificationSystem.showConfirmation(
            'Reset All Settings?',
            'This will restore all settings to default',
            () => this.performSettingsReset(), // onConfirm
            () =>
                this.notificationSystem.show('info', 'Reset Cancelled', 'Settings remain unchanged') // onCancel
        );
    }

    /**
     * Toggle grid background via keyboard shortcut (G key)
     *
     * Toggles the decorative grid background pattern and provides
     * user feedback about the current state.
     */
    toggleGridBackground() {
        this.settings.gridBackground = !this.settings.gridBackground;
        this.saveSettings();
        this.applySettings();

        const status = this.settings.gridBackground ? 'Enabled' : 'Disabled';
        this.notificationSystem.show('success', 'Grid Background', status, 1500);
    }

    /**
     * Toggle smooth animations via keyboard shortcut (A key)
     *
     * Toggles smooth animations throughout the interface and provides
     * user feedback about the current state.
     */
    toggleAnimations() {
        this.settings.smoothAnimations = !this.settings.smoothAnimations;
        this.saveSettings();
        this.applySettings();

        const status = this.settings.smoothAnimations ? 'Enabled' : 'Disabled';
        this.notificationSystem.show('success', 'Smooth Animations', status, 1500);
    }

    /**
     * Handle reset button click
     *
     * Processes direct reset from settings panel button.
     * Validates state and performs immediate reset without confirmation.
     */
    resetToDefaults() {
        // Validate that reset is needed
        if (this.areSettingsAtDefault()) {
            this.notificationSystem.show('info', 'Already at Defaults', 'No settings to reset');
            return;
        }

        // Direct reset for button clicks
        this.performSettingsReset();
    }

    /**
     * Perform the actual settings reset
     *
     * Resets all settings to default values, saves them, applies changes,
     * and provides user feedback. This is the core reset implementation
     * used by both keyboard shortcuts and button clicks.
     */
    performSettingsReset() {
        // Store current focused element to prevent unwanted focus changes
        const currentFocus = document.activeElement;

        // Reset to default values
        this.settings = { ...this.defaultSettings };

        // Persist the reset settings
        this.saveSettings();

        // Apply defaults to UI immediately
        this.applySettings();

        // Restore focus to body to prevent settings button focus
        if (currentFocus && currentFocus !== document.body) {
            document.body.focus();
        }

        // Provide success feedback
        this.notificationSystem.show(
            'success',
            'Settings Reset',
            'All settings restored to default'
        );
    }

    /**
     * ===== TIME FORMATTING UTILITIES =====
     *
     * Advanced time formatting system that creates individual digit elements
     * for enhanced styling and animation capabilities. Supports both
     * HH:MM and HH:MM:SS formats.
     */

    /**
     * Format time string with individual digit elements
     *
     * Converts a time string into HTML with individual digit spans for
     * advanced styling and animation. Each digit is wrapped in a span
     * for granular control over appearance and transitions.
     *
     * @param {string} timeString - Time in "HH:MM" or "HH:MM:SS" format
     * @returns {string} HTML string with individual digit elements
     */
    formatTimeWithDigits(timeString) {
        // Parse time components
        const parts = timeString.split(':');

        if (parts.length === 2) {
            // Hours and minutes format (HH:MM)
            const hours = parts[0].padStart(2, '0');
            const minutes = parts[1].padStart(2, '0');

            return `
                <div class="digit-group">
                    <span class="time-digit">${hours[0]}</span>
                    <span class="time-digit">${hours[1]}</span>
                </div>
                <span class="time-colon">:</span>
                <div class="digit-group">
                    <span class="time-digit">${minutes[0]}</span>
                    <span class="time-digit">${minutes[1]}</span>
                </div>
            `;
        } else if (parts.length === 3) {
            // Hours, minutes, and seconds format (HH:MM:SS)
            const hours = parts[0].padStart(2, '0');
            const minutes = parts[1].padStart(2, '0');
            const seconds = parts[2].padStart(2, '0');

            return `
                <div class="digit-group">
                    <span class="time-digit">${hours[0]}</span>
                    <span class="time-digit">${hours[1]}</span>
                </div>
                <span class="time-colon">:</span>
                <div class="digit-group">
                    <span class="time-digit">${minutes[0]}</span>
                    <span class="time-digit">${minutes[1]}</span>
                </div>
                <span class="time-colon">:</span>
                <div class="digit-group">
                    <span class="time-digit">${seconds[0]}</span>
                    <span class="time-digit">${seconds[1]}</span>
                </div>
            `;
        }

        // Fallback: return original string if format is unexpected
        return timeString;
    }

    /**
     * ===== TAB MEMORY RESET SYSTEM =====
     *
     * Specialized reset functionality for the AI-powered tab memory system.
     * Handles validation, confirmation, and cleanup of machine learning data
     * separately from general settings.
     */

    /**
     * Handle tab memory reset button click
     *
     * Validates that there is AI learning data to reset, shows confirmation
     * dialog, and handles the reset process. Separate from general settings
     * reset since tab memory uses different storage and logic.
     */
    handleTabMemoryResetClick() {
        // Validate that there's AI data to reset
        let hasDataToReset = false;

        try {
            if (window.quickShortcuts?.tabMemory) {
                const analytics = window.quickShortcuts.tabMemory.getAnalytics();
                hasDataToReset =
                    analytics.totalInteractions > 0 ||
                    analytics.totalSessions > 0 ||
                    Object.keys(analytics.patterns || {}).length > 0;
            }
        } catch (error) {
            // Graceful failure - assume no data
        }

        if (!hasDataToReset) {
            this.notificationSystem.show('info', 'Nothing to Reset', 'No AI learning data found');
            return;
        }

        // Show confirmation dialog for destructive action
        this.notificationSystem.showConfirmation(
            'Reset Tab Memory?',
            'This will clear all AI learning data and preferences',
            () => this.performTabMemoryReset(), // onConfirm
            () =>
                this.notificationSystem.show(
                    'info',
                    'Reset Cancelled',
                    'Tab memory data remains unchanged'
                ) // onCancel
        );
    }

    /**
     * Perform the actual tab memory reset
     *
     * Clears all AI learning data, provides user feedback, and updates
     * the UI state. Handles errors gracefully with appropriate messaging.
     *
     * @async
     * @returns {Promise<void>}
     */
    async performTabMemoryReset() {
        try {
            if (window.quickShortcuts?.tabMemory) {
                await window.quickShortcuts.tabMemory.resetMemory();
                this.notificationSystem.show(
                    'success',
                    'Tab Memory Reset',
                    'AI learning data cleared successfully'
                );

                // Update button state after successful reset
                setTimeout(() => {
                    this.updateTabMemoryButtonState();
                }, 100);
            } else {
                this.notificationSystem.show(
                    'error',
                    'Reset Failed',
                    'Tab memory system not available'
                );
            }
        } catch (error) {
            this.notificationSystem.show('error', 'Reset Failed', 'Unable to reset tab memory');
        }
    }

    /**
     * ===== CACHE MANAGEMENT =====
     *
     * Intelligent cache management system for fonts and favicons.
     * Implements automatic cleanup, storage monitoring, and debugging
     * utilities for optimal performance and storage usage.
     */

    /**
     * Schedule periodic cache cleanup
     *
     * Sets up automatic cache maintenance with startup delay to avoid
     * blocking initial load and regular intervals for ongoing cleanup.
     */
    scheduleCacheCleanup() {
        // Delayed startup cleanup to avoid blocking initial load
        setTimeout(() => {
            this.cacheManager.cleanupCache();
        }, 30000); // 30 seconds after startup

        // Regular maintenance every 6 hours
        setInterval(
            () => {
                this.cacheManager.cleanupCache();
            },
            6 * 60 * 60 * 1000
        ); // 6 hours
    }

    /**
     * Get cache statistics for debugging and monitoring
     *
     * Retrieves storage usage information formatted for human readability.
     * Useful for debugging storage issues and monitoring cache efficiency.
     *
     * @async
     * @returns {Promise<Object|null>} Cache statistics or null on error
     */
    async getCacheStats() {
        try {
            const usage = await this.cacheManager.getStorageUsage();
            return {
                used: `${(usage.used / 1024 / 1024).toFixed(2)} MB`,
                max: `${(usage.max / 1024 / 1024).toFixed(2)} MB`,
                percentage: `${usage.percentage.toFixed(1)}%`,
                raw: usage // Raw data for programmatic use
            };
        } catch (error) {
            return null; // Graceful failure
        }
    }

    /**
     * Clear all cache data
     *
     * Emergency cache clearing function for debugging and troubleshooting.
     * Provides user feedback on success or failure.
     *
     * @async
     * @returns {Promise<void>}
     */
    async clearCache() {
        try {
            await this.cacheManager.clearAllCache();
            this.notificationSystem.show(
                'success',
                'Cache Cleared',
                'All cached data has been removed',
                2000
            );
        } catch (error) {
            this.notificationSystem.show(
                'error',
                'Cache Clear Failed',
                'Could not clear cache',
                2000
            );
        }
    }

    /**
     * ===== MODERN HELP SECTION FUNCTIONALITY =====
     *
     * Interactive help system with quick actions and feature guides.
     * Provides contextual assistance and keyboard shortcut discovery
     * with modern UI design patterns.
     */

    /**
     * Initialize modern help section
     *
     * Creates an interactive help interface with quick actions and
     * feature guides. Replaces any existing content with the modern
     * help system.
     */
    initModernHelpSection() {
        const helpSection = document.getElementById('help-section');
        if (!helpSection) return;

        // Clear any existing content
        helpSection.innerHTML = '';

        // Generate modern help interface
        this.createModernHelpInterface(helpSection);
    }

    /**
     * Create modern help interface with improved design
     *
     * Generates a comprehensive help interface based on 2024 design trends
     * and best practices. Includes quick actions, feature guides, and
     * interactive elements for enhanced user experience.
     *
     * @param {HTMLElement} helpSection - The container element for the help interface
     */
    createModernHelpInterface(helpSection) {
        const helpData = this.getModernHelpData();

        helpSection.innerHTML = `
            <!-- Feature Cards -->
            <div class="help-features">
                <div class="help-features-grid">
                    ${helpData.features
                        .map(
                            feature => `
                        <div class="help-feature-card ${feature.action ? 'help-feature-clickable' : ''}"
                             data-category="${feature.category}"
                             ${feature.action ? `data-action="${feature.action}"` : ''}>
                            <div class="help-feature-header">
                                <div class="help-feature-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        ${feature.icon}
                                    </svg>
                                </div>
                                <div class="help-feature-title">${feature.title}</div>
                                ${feature.action ? '<div class="help-feature-external-icon">↗</div>' : ''}
                            </div>
                            <div class="help-feature-description">${feature.description}</div>
                            ${
                                feature.tips
                                    ? `
                                <div class="help-feature-tips">
                                    ${feature.tips.map(tip => `<div class="help-tip">• ${tip}</div>`).join('')}
                                </div>
                            `
                                    : ''
                            }
                        </div>
                    `
                        )
                        .join('')}
                </div>
            </div>
        `;

        // Add click handlers for actionable cards
        helpSection.querySelectorAll('.help-feature-clickable').forEach(card => {
            card.addEventListener('click', () => {
                const action = card.dataset.action;
                if (action) {
                    // Open in new tab to keep extension open
                    window.open(action, '_blank', 'noopener,noreferrer');
                }
            });

            // Add keyboard support
            card.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const action = card.dataset.action;
                    if (action) {
                        window.open(action, '_blank', 'noopener,noreferrer');
                    }
                }
            });

            // Make focusable for keyboard navigation
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute(
                'aria-label',
                `Open ${card.querySelector('.help-feature-title').textContent} in new tab`
            );
        });
    }

    /**
     * Get modern help data structure
     *
     * Returns the complete data structure for the help system including
     * quick actions and feature guides with icons, descriptions, and tips.
     *
     * @returns {Object} Help data structure with quickActions and features arrays
     */
    getModernHelpData() {
        return {
            features: [
                {
                    category: 'support',
                    title: 'Privacy Policy',
                    description: 'Learn how NEXUS protects your data and privacy.',
                    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
                    action: 'https://hellomosaddiq.github.io/nexus-new-tab/privacy.html',
                    tips: [
                        'All data stays on your device',
                        'No external tracking or analytics',
                        'Open source for transparency'
                    ]
                },
                {
                    category: 'support',
                    title: 'FAQ & Help',
                    description: 'Find answers to common questions and troubleshooting.',
                    icon: '<circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>',
                    action: 'https://hellomosaddiq.github.io/nexus-new-tab/getting-started/faq.html',
                    tips: [
                        'Installation and setup help',
                        'Feature explanations',
                        'Troubleshooting guides'
                    ]
                },
                {
                    category: 'basics',
                    title: 'Core Shortcuts',
                    description: 'Essential keyboard shortcuts for navigation and access.',
                    icon: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>',
                    tips: [
                        'K - Open quick shortcuts panel',
                        'S - Open settings panel',
                        'Escape - Close open panels'
                    ]
                },
                {
                    category: 'basics',
                    title: 'Productivity Features',
                    description: 'Shortcuts for productivity and task management.',
                    icon: '<path d="M9 11H3v2h6v-2zm0-4H3v2h6V7zm0 8H3v2h6v-2zm2-8v10h10V7H11zm8 8h-6v-2h6v2zm0-4h-6V9h6v2z"></path>',
                    tips: [
                        'N - Toggle quick notes overlay',
                        'T - Open todo list panel',
                        'Q - Refresh daily quote',
                        'Space - Start/pause focus timer (when focused)'
                    ]
                },
                {
                    category: 'basics',
                    title: 'Customization Shortcuts',
                    description: 'Quick access to visual and interface customization.',
                    icon: '<circle cx="12" cy="12" r="3"></circle><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>',
                    tips: [
                        'F - Cycle through font themes',
                        'G - Toggle grid background',
                        'A - Toggle smooth animations',
                        'R - Reset all settings to defaults'
                    ]
                },
                {
                    category: 'basics',
                    title: 'Customization',
                    description: 'Personalize your new tab with themes and fonts.',
                    icon: '<circle cx="12" cy="12" r="3"></circle><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>',
                    tips: [
                        'Choose from 9 color themes',
                        'Select from 5 typography options',
                        'Toggle animations and effects',
                        'All changes save automatically'
                    ]
                },
                {
                    category: 'basics',
                    title: 'Smart Features',
                    description: 'Enable helpful date insights and productivity tools.',
                    icon: '<rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line>',
                    tips: [
                        'Pick up to 3 smart date features',
                        'Enable focus timer for productivity',
                        'Turn on quick notes for ideas',
                        'All features work offline'
                    ]
                }
            ]
        };
    }

    /**
     * ===== SECURITY UTILITIES =====
     *
     * Security-focused utility methods for safe DOM manipulation and input sanitization.
     * These methods prevent XSS attacks and ensure safe handling of user data.
     */

    /**
     * Sanitize HTML content to prevent XSS attacks
     *
     * Safely escapes HTML characters in user-provided content to prevent
     * script injection and other XSS vulnerabilities. Uses browser's built-in
     * text encoding for maximum security and compatibility.
     *
     * SECURITY FEATURES:
     * - Escapes all HTML special characters
     * - Prevents script injection attacks
     * - Uses browser's native text encoding
     * - Maintains text content while removing HTML
     *
     * @param {string} str - String to sanitize
     * @returns {string} Sanitized string safe for innerHTML
     * @private
     */
    sanitizeHTML(str) {
        if (typeof str !== 'string') return '';

        // Create temporary div element for safe text encoding
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * Safely create DOM element with text content
     *
     * Creates DOM elements with safe text content insertion, preventing
     * XSS attacks while maintaining proper DOM structure and performance.
     *
     * @param {string} tagName - HTML tag name
     * @param {string} textContent - Safe text content
     * @param {string} className - Optional CSS class name
     * @returns {HTMLElement} Safely created DOM element
     * @private
     */
    createSafeElement(tagName, textContent = '', className = '') {
        const element = document.createElement(tagName);
        element.textContent = textContent; // Safe text insertion
        if (className) element.className = className;
        return element;
    }

    /**
     * ===== UTILITY METHODS =====
     *
     * Collection of utility methods for various helper functions.
     * Maintains clean, focused approach without unnecessary complexity.
     */

    /**
     * Handle key press simulation for help actions
     *
     * Simulates keyboard events for help interface integration.
     * Provides a bridge between UI actions and keyboard shortcuts.
     *
     * @param {Object} event - Simulated keyboard event object
     * @param {string} event.key - The key that was pressed
     * @param {Function} event.preventDefault - Function to prevent default behavior
     */
    handleKeyPress(event) {
        // Delegate to the main keyboard handler
        this.handleKeydown(event);
    }

    /**
     * ===== TODO LIST MANAGEMENT =====
     *
     * Task management system with persistent storage and keyboard shortcuts.
     * Follows the same patterns as quick notes for consistency.
     */

    /**
     * Toggle todo panel visibility
     *
     * Opens or closes the todo panel based on current state.
     * Provides user feedback when the feature is disabled.
     */
    toggleTodoPanel() {
        if (!this.settings.todoList) {
            // Inform user that feature needs to be enabled
            this.notificationSystem.show(
                'info',
                'Todo List Disabled',
                'Enable Todo List in settings first',
                3000
            );
            return;
        }

        if (this.todoVisible) {
            this.closeTodoPanel();
        } else {
            this.openTodoPanel();
        }
    }

    /**
     * Open the todo panel with smooth animation
     *
     * Similar to settings panel but slides from left side.
     */
    openTodoPanel() {
        if (!this.settings.todoList) return;

        const panel = document.getElementById('todo-panel');
        if (!panel) return;

        // Close any other open modals first
        this.closeAllModals();
        this.activeModal = 'todo';

        this.todoVisible = true;

        // Accessibility: make panel accessible before showing
        panel.removeAttribute('inert');
        panel.removeAttribute('aria-hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scroll

        // Animate panel opening (similar to settings but from left)
        this.animateTodoPanelOpen(panel);

        // Initialize UI with current tasks
        this.renderTasks();
        this.updateTaskCounter();
        this.initializeTaskFocus();

        // Focus management for keyboard users
        setTimeout(() => {
            const taskInput = document.getElementById('new-task-input');
            if (taskInput) taskInput.focus();
        }, 100);
    }

    /**
     * Animate todo panel opening (slides from left)
     */
    animateTodoPanelOpen(panel) {
        const backdrop = panel.querySelector('.panel-backdrop');
        const container = panel.querySelector('.panel-container');

        // Make panel visible immediately
        panel.style.display = 'flex';
        panel.style.pointerEvents = 'auto';

        // Force reflow to ensure initial state is applied
        panel.offsetHeight;

        // Synchronized animation start using requestAnimationFrame
        requestAnimationFrame(() => {
            // Trigger CSS transitions
            panel.classList.add('active');

            // Backdrop animation: fade in with blur effect
            if (backdrop) {
                const transition =
                    'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), background 500ms cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 500ms cubic-bezier(0.16, 1, 0.3, 1), -webkit-backdrop-filter 500ms cubic-bezier(0.16, 1, 0.3, 1)';
                backdrop.style.transition = transition;
                backdrop.style.opacity = '1';
                backdrop.style.background = 'rgba(0, 0, 0, 0.6)';
                backdrop.style.backdropFilter = 'blur(8px)';
                backdrop.style.webkitBackdropFilter = 'blur(8px)';
            }

            // Container animation: slide in from left with shadow
            if (container) {
                container.style.transition =
                    'transform 500ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 500ms cubic-bezier(0.16, 1, 0.3, 1)';
                container.style.transform = 'translateX(0)';
                container.style.boxShadow =
                    '8px 0 32px rgba(0, 0, 0, 0.12), 4px 0 16px rgba(0, 0, 0, 0.08), inset -1px 0 0 rgba(255, 255, 255, 0.05)';
            }
        });
    }

    /**
     * Close the todo panel with proper cleanup
     */
    closeTodoPanel() {
        const panel = document.getElementById('todo-panel');
        if (!panel) return;

        // Clear active modal state
        if (this.activeModal === 'todo') {
            this.activeModal = null;
        }

        this.todoVisible = false;

        // Make panel inaccessible to screen readers and keyboard navigation
        // Remove focus from any focused elements first to prevent aria-hidden warning
        if (document.activeElement && panel.contains(document.activeElement)) {
            document.activeElement.blur();
        }

        panel.setAttribute('inert', '');
        panel.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore body scrolling

        // Animate panel closing
        this.animateTodoPanelClose(panel);
    }

    /**
     * Animate todo panel closing (slides to left)
     */
    animateTodoPanelClose(panel) {
        const backdrop = panel.querySelector('.panel-backdrop');
        const container = panel.querySelector('.panel-container');

        // Start synchronized close animations
        requestAnimationFrame(() => {
            // Backdrop animation: fade out and remove blur
            if (backdrop) {
                const transition =
                    'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), background 500ms cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 500ms cubic-bezier(0.16, 1, 0.3, 1), -webkit-backdrop-filter 500ms cubic-bezier(0.16, 1, 0.3, 1)';
                backdrop.style.transition = transition;
                backdrop.style.opacity = '0';
                backdrop.style.background = 'rgba(0, 0, 0, 0)';
                backdrop.style.backdropFilter = 'blur(0px)';
                backdrop.style.webkitBackdropFilter = 'blur(0px)';
            }

            // Container animation: slide out to left and fade shadow
            if (container) {
                container.style.transition =
                    'transform 500ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 500ms cubic-bezier(0.16, 1, 0.3, 1)';
                container.style.transform = 'translateX(-100%)';
                container.style.boxShadow =
                    '8px 0 32px rgba(0, 0, 0, 0), 4px 0 16px rgba(0, 0, 0, 0), inset -1px 0 0 rgba(255, 255, 255, 0)';
            }
        });

        // Cleanup after animation completes
        setTimeout(() => {
            panel.classList.remove('active');
            panel.style.display = 'none';
            panel.style.pointerEvents = 'none';

            // Reset all inline styles for clean state
            if (backdrop) {
                backdrop.style.transition = '';
                backdrop.style.opacity = '';
                backdrop.style.background = '';
                backdrop.style.backdropFilter = '';
                backdrop.style.webkitBackdropFilter = '';
            }

            if (container) {
                container.style.transition = '';
                container.style.transform = '';
                container.style.boxShadow = '';
            }
        }, 500); // Match animation duration exactly
    }

    /**
     * Add a new task to the list
     */
    addTask() {
        const input = document.getElementById('new-task-input');
        if (!input) return;

        const text = input.value.trim();
        if (!text) return;

        // Create new task object
        const task = {
            id: Date.now().toString(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        // Add to tasks array
        this.todoTasks.push(task);

        // Clear input
        input.value = '';

        // Save and update UI
        this.saveTodoTasks();
        this.renderTasks();
        this.updateTaskCounter();

        // Keep focus on input for quick adding
        input.focus();
    }

    /**
     * Toggle task completion status with smooth animation
     */
    toggleTask(taskId) {
        const task = this.todoTasks.find(t => t.id === taskId);
        if (!task) return;

        // Find the task element in the DOM
        const taskElements = document.querySelectorAll('.task-item');
        let taskElement = null;

        taskElements.forEach(el => {
            const checkbox = el.querySelector('.task-checkbox');
            if (checkbox && checkbox.getAttribute('aria-checked') === task.completed.toString()) {
                const text = el.querySelector('.task-text').textContent;
                if (text === task.text) {
                    taskElement = el;
                }
            }
        });

        // Toggle the task state
        task.completed = !task.completed;

        // Animate the change if we found the element
        if (taskElement) {
            const checkbox = taskElement.querySelector('.task-checkbox');

            // Update checkbox state with animation
            checkbox.classList.toggle('completed', task.completed);
            checkbox.setAttribute('aria-checked', task.completed.toString());

            // Update the icon based on completion state
            const newIcon = task.completed
                ? `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344"/>
                    <path d="m9 11 3 3L22 4"/>
                </svg>`
                : `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2"/>
                </svg>`;

            checkbox.innerHTML = newIcon;

            // Update task item state
            taskElement.classList.toggle('completed', task.completed);
        }

        // Save and update counter
        this.saveTodoTasks();
        this.updateTaskCounter();
    }

    /**
     * Delete a task
     */
    deleteTask(taskId) {
        this.todoTasks = this.todoTasks.filter(t => t.id !== taskId);
        this.saveTodoTasks();
        this.renderTasks();
        this.updateTaskCounter();
    }

    /**
     * Render all tasks in the UI
     */
    renderTasks() {
        const taskList = document.getElementById('task-list');
        const emptyState = document.getElementById('empty-state');

        // If taskList doesn't exist, skip rendering (panel not opened)
        if (!taskList) return;

        // Clear current tasks
        taskList.innerHTML = '';

        if (this.todoTasks.length === 0) {
            // Show empty state, hide task list
            if (emptyState) emptyState.style.display = 'flex';
            taskList.style.display = 'none';
            return;
        }

        // Hide empty state, show task list
        if (emptyState) emptyState.style.display = 'none';
        taskList.style.display = 'flex';

        // Render each task
        this.todoTasks.forEach((task, index) => {
            const taskElement = this.createTaskElement(task, index);
            taskList.appendChild(taskElement);
        });

        // Restore keyboard focus if it was set
        if (this.focusedTaskIndex >= 0) {
            this.updateTaskFocus();
        }
    }

    /**
     * Create a task element
     */
    createTaskElement(task, index) {
        const taskItem = document.createElement('div');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskItem.setAttribute('role', 'listitem');
        taskItem.setAttribute('tabindex', '-1'); // Allow focus but not tab navigation
        taskItem.setAttribute('data-task-index', index);

        taskItem.innerHTML = `
            <div class="task-checkbox ${task.completed ? 'completed' : ''}"
                 role="checkbox"
                 aria-checked="${task.completed}"
                 tabindex="0">
                ${
                    task.completed
                        ? `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344"/>
                        <path d="m9 11 3 3L22 4"/>
                    </svg>`
                        : `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="18" height="18" x="3" y="3" rx="2"/>
                    </svg>`
                }
            </div>
            <span class="task-text">${this.escapeHtml(task.text)}</span>
            <button class="task-delete" aria-label="Delete task">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        `;

        // Add event listeners
        const checkbox = taskItem.querySelector('.task-checkbox');
        const deleteBtn = taskItem.querySelector('.task-delete');

        checkbox.addEventListener('click', () => this.toggleTask(task.id));
        checkbox.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTask(task.id);
            }
        });

        deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

        // Add drag & drop event listeners
        this.addDragListeners(taskItem, index);

        return taskItem;
    }

    /**
     * Update task counter in panel header
     */
    updateTaskCounter() {
        const counter = document.getElementById('task-counter');
        if (!counter) return;

        const total = this.todoTasks.length;
        const completed = this.todoTasks.filter(t => t.completed).length;

        if (total === 0) {
            counter.textContent = '0 tasks';
        } else if (completed === total) {
            counter.textContent = `All ${total} completed`;
        } else {
            counter.textContent = `${completed}/${total} completed`;
        }
    }

    /**
     * Load todo tasks from storage
     */
    async loadTodoTasks() {
        try {
            const api = typeof browser !== 'undefined' && browser.runtime ? browser : chrome;

            if (api?.storage?.local) {
                const result = await api.storage.local.get(['nexus-todos']);
                if (result['nexus-todos']) {
                    this.todoTasks = result['nexus-todos'];
                }
            }
        } catch (error) {
            // Fallback to localStorage
            try {
                const saved = localStorage.getItem('nexus-todos');
                if (saved) {
                    this.todoTasks = JSON.parse(saved);
                }
            } catch (localError) {
                // Use empty array as final fallback
                this.todoTasks = [];
            }
        }

        // Always render tasks after loading (panel might not be open yet)
        // The renderTasks function handles the case when elements don't exist
        this.renderTasks();
        this.updateTaskCounter();
    }

    /**
     * Save todo tasks to storage (with debouncing)
     */
    saveTodoTasks() {
        // Clear existing timeout
        if (this.todoSaveTimeout) {
            clearTimeout(this.todoSaveTimeout);
        }

        // Debounce saves to avoid excessive storage writes
        this.todoSaveTimeout = setTimeout(async () => {
            try {
                const api = typeof browser !== 'undefined' && browser.runtime ? browser : chrome;

                if (api?.storage?.local) {
                    await api.storage.local.set({ 'nexus-todos': this.todoTasks });
                }

                // Also save to localStorage as backup
                localStorage.setItem('nexus-todos', JSON.stringify(this.todoTasks));
            } catch (error) {
                // Fallback to localStorage only
                try {
                    localStorage.setItem('nexus-todos', JSON.stringify(this.todoTasks));
                } catch (localError) {
                    // Silent fail - tasks will be lost but app continues working
                }
            }
        }, 1000); // 1 second debounce (same as quick notes)
    }

    /**
     * Handle keyboard navigation within todo panel
     */
    handleTodoKeyboardNavigation(e) {
        const taskItems = document.querySelectorAll('.task-item');
        if (taskItems.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.focusedTaskIndex = Math.min(this.focusedTaskIndex + 1, taskItems.length - 1);
                this.updateTaskFocus();
                break;

            case 'ArrowUp':
                e.preventDefault();
                this.focusedTaskIndex = Math.max(this.focusedTaskIndex - 1, 0);
                this.updateTaskFocus();
                break;

            case ' ': // Space to toggle completion
                e.preventDefault();
                if (this.focusedTaskIndex >= 0 && this.focusedTaskIndex < this.todoTasks.length) {
                    const task = this.todoTasks[this.focusedTaskIndex];
                    this.toggleTask(task.id);
                }
                break;

            case 'Enter':
                e.preventDefault();
                // Focus the add task input
                const input = document.getElementById('new-task-input');
                if (input) {
                    input.focus();
                    this.clearTaskFocus();
                }
                break;

            case 'Home':
                e.preventDefault();
                this.focusedTaskIndex = 0;
                this.updateTaskFocus();
                break;

            case 'End':
                e.preventDefault();
                this.focusedTaskIndex = taskItems.length - 1;
                this.updateTaskFocus();
                break;
        }
    }

    /**
     * Update visual focus indicator for keyboard navigation
     */
    updateTaskFocus() {
        const taskItems = document.querySelectorAll('.task-item');

        // Clear all focus states
        taskItems.forEach(item => item.classList.remove('keyboard-focused'));

        // Apply focus to current item
        if (this.focusedTaskIndex >= 0 && this.focusedTaskIndex < taskItems.length) {
            const focusedItem = taskItems[this.focusedTaskIndex];
            focusedItem.classList.add('keyboard-focused');

            // Scroll into view if needed
            focusedItem.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    }

    /**
     * Clear task focus (when switching to input)
     */
    clearTaskFocus() {
        const taskItems = document.querySelectorAll('.task-item');
        taskItems.forEach(item => item.classList.remove('keyboard-focused'));
        this.focusedTaskIndex = -1;
    }

    /**
     * Initialize keyboard focus when panel opens
     */
    initializeTaskFocus() {
        // Start with no task focused, user can navigate with arrow keys
        this.focusedTaskIndex = -1;
        this.clearTaskFocus();
    }

    /**
     * ===== DRAG & DROP IMPLEMENTATION =====
     *
     * Modern pointer-based drag and drop system optimized for mobile and desktop.
     * Uses Pointer Events API for universal input handling.
     */

    /**
     * Add drag and drop event listeners to a task item
     */
    addDragListeners(taskItem, index) {
        // Pointer events for universal input handling (mouse, touch, pen)
        taskItem.addEventListener('pointerdown', e => this.handleDragStart(e, taskItem, index));

        // Prevent default drag behavior on images and other elements
        taskItem.addEventListener('dragstart', e => e.preventDefault());
    }

    /**
     * Handle drag start
     */
    handleDragStart(e, taskItem, index) {
        // Only allow dragging with primary pointer (left mouse button or first touch)
        if (e.button !== 0) return;

        // Don't start drag if clicking on interactive elements
        if (e.target.closest('.task-checkbox, .task-delete')) return;

        // Prevent text selection during drag
        e.preventDefault();

        // Set up drag state
        this.dragState.isDragging = true;
        this.dragState.draggedElement = taskItem;
        this.dragState.draggedIndex = index;
        this.dragState.startY = e.clientY;
        this.dragState.currentY = e.clientY;
        this.dragState.offsetY = e.clientY - taskItem.getBoundingClientRect().top;

        // Add dragging class
        taskItem.classList.add('dragging');

        // Set pointer capture for smooth dragging
        taskItem.setPointerCapture(e.pointerId);

        // Add global event listeners
        document.addEventListener('pointermove', this.handleDragMove);
        document.addEventListener('pointerup', this.handleDragEnd);
        document.addEventListener('pointercancel', this.handleDragEnd);

        // Clear any existing focus
        this.clearTaskFocus();
    }

    /**
     * Handle drag move
     */
    handleDragMove = e => {
        if (!this.dragState.isDragging) return;

        this.dragState.currentY = e.clientY;

        // Update dragged element position
        const deltaY = this.dragState.currentY - this.dragState.startY;
        this.dragState.draggedElement.style.transform = `translateY(${deltaY}px) rotate(2deg)`;

        // Find drop target
        this.updateDropTarget(e);
    };

    /**
     * Handle drag end
     */
    handleDragEnd = e => {
        if (!this.dragState.isDragging) return;

        // Remove global event listeners
        document.removeEventListener('pointermove', this.handleDragMove);
        document.removeEventListener('pointerup', this.handleDragEnd);
        document.removeEventListener('pointercancel', this.handleDragEnd);

        // Perform the drop
        this.performDrop();

        // Clean up drag state
        this.cleanupDrag();
    };

    /**
     * Update drop target during drag
     */
    updateDropTarget(e) {
        // Clear previous drop target
        this.clearDropTarget();

        // Find the task item under the pointer
        const elements = document.elementsFromPoint(e.clientX, e.clientY);
        const targetTaskItem = elements.find(
            el => el.classList.contains('task-item') && el !== this.dragState.draggedElement
        );

        if (!targetTaskItem) return;

        const rect = targetTaskItem.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;
        const dropPosition = e.clientY < midY ? 'above' : 'below';

        // Set drop target
        this.dragState.dropTarget = targetTaskItem;
        this.dragState.dropPosition = dropPosition;

        // Add visual indicator
        targetTaskItem.classList.add('drop-target');
        targetTaskItem.classList.add(`drop-target-${dropPosition}`);
    }

    /**
     * Clear drop target indicators
     */
    clearDropTarget() {
        const dropTargets = document.querySelectorAll('.drop-target');
        dropTargets.forEach(target => {
            target.classList.remove('drop-target', 'drop-target-above', 'drop-target-below');
        });

        this.dragState.dropTarget = null;
        this.dragState.dropPosition = null;
    }

    /**
     * Perform the drop operation
     */
    performDrop() {
        if (!this.dragState.dropTarget) return;

        const draggedIndex = this.dragState.draggedIndex;
        const targetElement = this.dragState.dropTarget;
        const targetIndex = parseInt(targetElement.getAttribute('data-task-index'));
        const dropPosition = this.dragState.dropPosition;

        // Calculate new index
        let newIndex = targetIndex;
        if (dropPosition === 'below') {
            newIndex = targetIndex + 1;
        }

        // Adjust for dragging from above
        if (draggedIndex < newIndex) {
            newIndex--;
        }

        // Don't move if dropping in the same position
        if (draggedIndex === newIndex) return;

        // Reorder tasks array
        const draggedTask = this.todoTasks.splice(draggedIndex, 1)[0];
        this.todoTasks.splice(newIndex, 0, draggedTask);

        // Save and re-render
        this.saveTodoTasks();
        this.renderTasks();

        // Update focus to follow the moved task
        this.focusedTaskIndex = newIndex;
        setTimeout(() => this.updateTaskFocus(), 100);
    }

    /**
     * Clean up drag state and visual indicators
     */
    cleanupDrag() {
        // Remove dragging class and reset transform
        if (this.dragState.draggedElement) {
            this.dragState.draggedElement.classList.remove('dragging');
            this.dragState.draggedElement.style.transform = '';
        }

        // Clear drop targets
        this.clearDropTarget();

        // Reset drag state
        this.dragState = {
            isDragging: false,
            draggedElement: null,
            draggedIndex: -1,
            dropTarget: null,
            dropPosition: null,
            startY: 0,
            currentY: 0,
            offsetY: 0
        };
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Add CSS for no-animations class - Enhanced coverage
const style = document.createElement('style');
style.textContent = `
    /* Enhanced no-animations class with complete coverage */
    .no-animations *,
    .no-animations *::before,
    .no-animations *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }

    /* Specific component overrides */
    .no-animations .grid-background {
        animation: none !important;
    }

    .no-animations .focus-timer-ring.running .focus-timer-progress {
        animation: none !important;
    }

    .no-animations .focus-timer-ring.running .focus-timer-time {
        animation: none !important;
    }

    .no-animations .dropdown-menu.active {
        animation: none !important;
    }

    .no-animations .settings-modal.active {
        animation: none !important;
    }

    .no-animations .modal-content {
        animation: none !important;
    }

    .no-animations .font-notification {
        animation: none !important;
    }

    .no-animations .focus-timer-container.visible .focus-timer-ring {
        animation: none !important;
    }

    .no-animations .quick-notes-container {
        transition: none !important;
        transform: scale(1) translateY(0) !important;
    }

    .no-animations .save-icon.saved {
        animation: none !important;
    }

    .no-animations .quick-notes-info.saved-state {
        animation: none !important;
    }

    /* Todo panel animations disabled */
    .no-animations .todo-panel {
        transition: none !important;
    }

    .no-animations .todo-panel .panel-backdrop {
        transition: none !important;
    }

    .no-animations .todo-panel .panel-container {
        transition: none !important;
    }

    .no-animations .task-item {
        transition: none !important;
    }

    .no-animations .task-checkbox svg {
        transition: none !important;
    }

    .no-animations .task-text {
        transition: none !important;
    }

    /* Drag & drop animations disabled */
    .no-animations .task-item.dragging {
        transition: none !important;
        transform: none !important;
    }

    .no-animations .task-item.drop-target {
        transition: none !important;
    }

    /* Hover effects disabled */
    .no-animations .settings-btn:hover {
        transform: none !important;
    }

    .no-animations .focus-timer-btn:hover {
        transform: none !important;
    }

    /* Modal close removed - will be replaced with panel close */

    .no-animations .setting-checkbox:hover + .checkbox-custom {
        transform: none !important;
    }
`;
document.head.appendChild(style);

// Initialize when DOM is ready with error handling
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        try {
            window.nexus = new Nexus();

            // Expose modal management for QuickShortcuts integration
            window.nexusApp = window.nexus;
        } catch (error) {
            // Show fallback UI or error message
            document.body.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #666;">
                    <div style="text-align: center;">
                        <h2>NEXUS Failed to Load</h2>
                        <p>Please refresh the page or check your browser console for details.</p>
                        <button onclick="location.reload()" style="padding: 8px 16px; margin-top: 16px; border: 1px solid #ccc; border-radius: 4px; background: white; cursor: pointer;">Refresh Page</button>
                    </div>
                </div>
            `;
        }

        const isDevelopment =
            window.location.protocol === 'file:' ||
            window.location.hostname === 'localhost' ||
            localStorage.getItem('nexus-debug-mode') === 'true';

        if (isDevelopment) {
            window.debugNexus = {
                getTabMemoryAnalytics: () => {
                    if (window.nexus?.quickShortcuts?.tabMemory) {
                        return window.nexus.quickShortcuts.tabMemory.getAnalytics();
                    } else if (window.quickShortcuts?.tabMemory) {
                        return window.quickShortcuts.tabMemory.getAnalytics();
                    }
                    return 'Quick shortcuts not initialized';
                },
                resetTabMemory: async () => {
                    if (window.nexus) {
                        await window.nexus.performTabMemoryReset();
                        return 'Tab memory reset successfully';
                    }
                    return 'NEXUS not initialized';
                },
                simulateInteraction: async (tabType = 'bookmarks') => {
                    if (window.nexus?.quickShortcuts?.tabMemory) {
                        await window.nexus.quickShortcuts.tabMemory.recordInteraction(
                            tabType,
                            'click'
                        );
                        return `Simulated interaction with ${tabType}`;
                    } else if (window.quickShortcuts?.tabMemory) {
                        await window.quickShortcuts.tabMemory.recordInteraction(tabType, 'click');
                        return `Simulated interaction with ${tabType}`;
                    }
                    return 'Quick shortcuts not initialized';
                },
                testTabMemory: () => {
                    const nexusQS = window.nexus?.quickShortcuts;
                    const globalQS = window.quickShortcuts;

                    return {
                        nexusQuickShortcuts: !!nexusQS,
                        globalQuickShortcuts: !!globalQS,
                        nexusTabMemory: !!nexusQS?.tabMemory,
                        globalTabMemory: !!globalQS?.tabMemory,
                        nexusTabMemoryReady: nexusQS?.tabMemoryReady,
                        globalTabMemoryReady: globalQS?.tabMemoryReady,
                        nexusStatus: nexusQS?.getTabMemoryStatus?.(),
                        globalStatus: globalQS?.getTabMemoryStatus?.()
                    };
                },
                forceTopSitesPreference: async () => {
                    // Force multiple topsites interactions to test the system
                    const qs = window.nexus?.quickShortcuts || window.quickShortcuts;
                    if (qs?.tabMemory) {
                        for (let i = 0; i < 5; i++) {
                            await qs.tabMemory.recordInteraction('topsites', 'click');
                            await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
                        }
                        return qs.tabMemory.getAnalytics();
                    }
                    return 'Tab memory not available';
                },
                getUsageVariance: () => {
                    const qs = window.nexus?.quickShortcuts || window.quickShortcuts;
                    if (qs?.getUsageVariance) {
                        return qs.getUsageVariance();
                    }
                    return 'Tab memory not available';
                },
                resetTabMemoryOptimized: async () => {
                    const qs = window.nexus?.quickShortcuts || window.quickShortcuts;
                    if (qs?.resetTabMemory) {
                        await qs.resetTabMemory();
                        return 'Tab memory reset with optimized values';
                    }
                    return 'Tab memory not available';
                },
                forceRecalculation: async () => {
                    const qs = window.nexus?.quickShortcuts || window.quickShortcuts;
                    if (qs?.tabMemory?.forceRecalculation) {
                        await qs.tabMemory.forceRecalculation();
                        return 'Forced recalculation with optimized values';
                    }
                    return 'Tab memory not available';
                },
                testFaviconCaching: async () => {
                    const qs = window.nexus?.quickShortcuts || window.quickShortcuts;
                    if (qs?.testFaviconCaching) {
                        return await qs.testFaviconCaching();
                    }
                    return 'Quick shortcuts not available';
                },
                getCacheStats: async () => {
                    const qs = window.nexus?.quickShortcuts || window.quickShortcuts;
                    if (qs?.getCacheStats) {
                        return await qs.getCacheStats();
                    }
                    return 'Quick shortcuts not available';
                },
                clearFaviconCache: async () => {
                    const qs = window.nexus?.quickShortcuts || window.quickShortcuts;
                    if (qs?.clearFaviconCache) {
                        return await qs.clearFaviconCache();
                    }
                    return 'Quick shortcuts not available';
                },
                verifyCacheUsage: async () => {
                    const qs = window.nexus?.quickShortcuts || window.quickShortcuts;
                    if (qs?.verifyCacheUsage) {
                        return await qs.verifyCacheUsage();
                    }
                    return 'Quick shortcuts not available';
                },
                cleanupDuplicateFavicons: async () => {
                    const qs = window.nexus?.quickShortcuts || window.quickShortcuts;
                    if (qs?.cleanupDuplicateFavicons) {
                        return await qs.cleanupDuplicateFavicons();
                    }
                    return 'Quick shortcuts not available';
                },
                getFontStatus: () => {
                    if (window.nexus) {
                        return window.nexus.showFontStatus();
                    }
                    return 'NEXUS not initialized';
                },
                preloadFonts: () => {
                    return 'Local fonts are used - no preloading needed';
                },
                clearFontCache: () => {
                    if (window.nexus) {
                        window.nexus.clearFontCache();
                    }
                },
                getNexusCacheStats: async () => {
                    if (window.nexus) {
                        return await window.nexus.getCacheStats();
                    }
                    return 'NEXUS not initialized';
                },
                clearCache: async () => {
                    if (window.nexus) {
                        await window.nexus.clearCache();
                        return 'Cache cleared successfully';
                    }
                    return 'NEXUS not initialized';
                },
                checkCacheInstance: () => {
                    const mainInstance = window.nexus?.cacheManager;
                    const quickInstance = window.quickShortcuts?.cacheManager;
                    const singleton = NexusCacheManager.instance;

                    // Return instance information for debugging

                    return {
                        main: mainInstance,
                        quick: quickInstance,
                        singleton: singleton,
                        allSame: mainInstance === quickInstance && quickInstance === singleton
                    };
                }
            };
        }
    });
} else {
    try {
        window.nexus = new Nexus();

        // Expose modal management for QuickShortcuts integration
        window.nexusApp = window.nexus;
    } catch (error) {
        // Silent fail for production
    }
}
