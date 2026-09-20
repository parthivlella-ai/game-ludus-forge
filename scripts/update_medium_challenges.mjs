import fs from 'fs';
import { CHALLENGES_DATABASE } from '../src/data/challenges.js';

// Define the upgraded challenging math questions for Medium levels (21 to 40)
// Timers: 21-25: 20s, 26-30: 18s, 31-35: 17s, 36-40: 15s

const mediumUpgrades = {
  // Level 21 (Timer 20s) - Multi-step mental math & algebra
  21: [
    {
      c: 'MATH',
      p: 'Solve: (25 × 4) + (18 × 5) - 90',
      a: '100',
      acc: ['100', 'ONE HUNDRED'],
      exp: '100 + 90 - 90 = 100',
      hint: '25 × 4 is 100, 18 × 5 is 90'
    },
    {
      c: 'MATH',
      p: 'If 4x - 19 = 57, what is the value of x?',
      a: '19',
      acc: ['19', 'NINETEEN'],
      exp: '4x = 76 => x = 19',
      hint: 'Add 19 to 57, then divide by 4'
    },
    {
      c: 'MATH',
      p: 'Solve: (17 × 6) - (48 ÷ 4)',
      a: '90',
      acc: ['90', 'NINETY'],
      exp: '102 - 12 = 90',
      hint: '17 × 6 is 102, 48 ÷ 4 is 12'
    },
    {
      c: 'MATH',
      p: 'What is 35% of 240?',
      a: '84',
      acc: ['84', 'EIGHTY-FOUR', 'EIGHTY FOUR'],
      exp: '0.35 × 240 = 84',
      hint: '10% is 24, 30% is 72, 5% is 12'
    },
    {
      c: 'MATH',
      p: 'Solve: (16² - 14²)',
      a: '60',
      acc: ['60', 'SIXTY'],
      exp: '256 - 196 = 60, or (16-14)(16+14) = 2 × 30 = 60',
      hint: 'Difference of squares: (a-b)(a+b)'
    },
    {
      c: 'MATH',
      p: 'Solve: √289 + √225',
      a: '32',
      acc: ['32', 'THIRTY-TWO', 'THIRTY TWO'],
      exp: '17 + 15 = 32',
      hint: '17² = 289 and 15² = 225'
    },
    {
      c: 'MATH',
      p: 'Solve: (24 × 5) - (14 × 6)',
      a: '36',
      acc: ['36', 'THIRTY-SIX', 'THIRTY SIX'],
      exp: '120 - 84 = 36',
      hint: '120 minus 84'
    },
    {
      c: 'MATH',
      p: 'A rectangle has perimeter 56 and length 18. What is its area?',
      a: '180',
      acc: ['180', 'ONE HUNDRED EIGHTY', '180 SQ UNITS'],
      exp: 'Width = 28 - 18 = 10. Area = 18 × 10 = 180.',
      hint: 'Half-perimeter is 28, width is 10'
    },
    {
      c: 'MATH',
      p: 'If 3x + 2y = 38 and y = 7, what is x?',
      a: '8',
      acc: ['8', 'EIGHT'],
      exp: '3x + 14 = 38 => 3x = 24 => x = 8',
      hint: 'Subtract 2×7 from 38, then divide by 3'
    },
    {
      c: 'MATH',
      p: 'Three consecutive integers sum to 105. What is the largest integer?',
      a: '36',
      acc: ['36', 'THIRTY-SIX', 'THIRTY SIX'],
      exp: 'Middle integer = 105 ÷ 3 = 35. Largest = 36.',
      hint: 'Divide 105 by 3 to find the middle number'
    }
  ],

  // Level 22 (Timer 20s) - Non-trivial sequences & patterns
  22: [
    {
      c: 'SEQUENCE',
      p: 'Complete pattern: 2, 6, 18, 54, ?',
      a: '162',
      acc: ['162', 'ONE HUNDRED SIXTY-TWO'],
      exp: 'Multiply by 3 each time: 54 × 3 = 162.',
      hint: 'Multiply previous term by 3'
    },
    {
      c: 'SEQUENCE',
      p: 'Complete pattern: 3, 8, 18, 38, ?',
      a: '78',
      acc: ['78', 'SEVENTY-EIGHT'],
      exp: 'Rule is 2n + 2: 38 × 2 + 2 = 78.',
      hint: 'Double the term and add 2'
    },
    {
      c: 'SEQUENCE',
      p: 'Complete pattern: 1, 5, 14, 30, 55, ?',
      a: '91',
      acc: ['91', 'NINETY-ONE'],
      exp: 'Sum of squares: +1, +4, +9, +16, +25, +36 = 91.',
      hint: 'Add consecutive square numbers (+36)'
    },
    {
      c: 'SEQUENCE',
      p: 'Complete pattern: 5, 11, 23, 47, ?',
      a: '95',
      acc: ['95', 'NINETY-FIVE'],
      exp: 'Rule is 2n + 1: 47 × 2 + 1 = 95.',
      hint: 'Multiply by 2 and add 1'
    },
    {
      c: 'SEQUENCE',
      p: 'Complete pattern: 7, 15, 31, 63, ?',
      a: '127',
      acc: ['127', 'ONE HUNDRED TWENTY-SEVEN'],
      exp: 'Rule is 2n + 1: 63 × 2 + 1 = 127.',
      hint: 'Multiply by 2 and add 1'
    },
    {
      c: 'SEQUENCE',
      p: 'Complete pattern: 2, 7, 17, 37, ?',
      a: '77',
      acc: ['77', 'SEVENTY-SEVEN'],
      exp: 'Rule is 2n + 3: 37 × 2 + 3 = 77.',
      hint: 'Double the term and add 3'
    },
    {
      c: 'SEQUENCE',
      p: 'Complete pattern: 1, 4, 13, 40, ?',
      a: '121',
      acc: ['121', 'ONE HUNDRED TWENTY-ONE'],
      exp: 'Rule is 3n + 1: 40 × 3 + 1 = 121.',
      hint: 'Multiply by 3 and add 1'
    },
    {
      c: 'SEQUENCE',
      p: 'Complete pattern: 4, 9, 25, 49, 121, ?',
      a: '169',
      acc: ['169', 'ONE HUNDRED SIXTY-NINE'],
      exp: 'Squares of prime numbers: 2², 3², 5², 7², 11², 13² = 169.',
      hint: 'Square of the next prime number (13)'
    },
    {
      c: 'SEQUENCE',
      p: 'Complete pattern: 2, 6, 12, 20, 30, ?',
      a: '42',
      acc: ['42', 'FORTY-TWO'],
      exp: 'n(n+1): 1×2, 2×3, 3×4, 4×5, 5×6, 6×7 = 42.',
      hint: 'Next is 6 × 7'
    },
    {
      c: 'SEQUENCE',
      p: 'Complete pattern: 3, 5, 9, 17, 33, ?',
      a: '65',
      acc: ['65', 'SIXTY-FIVE'],
      exp: 'Rule is 2n - 1: 33 × 2 - 1 = 65.',
      hint: 'Double the term and subtract 1'
    }
  ],

  // Level 23 (Timer 20s) - Multi-step algebra & logic word math
  23: [
    {
      c: 'LOGIC',
      p: 'I am a number. If you multiply me by 6 and subtract 27, you get 81. What am I?',
      a: '18',
      acc: ['18', 'EIGHTEEN'],
      exp: '6x - 27 = 81 => 6x = 108 => x = 18.',
      hint: 'Add 27 to 81, then divide by 6'
    },
    {
      c: 'LOGIC',
      p: 'If 5 times a number plus 34 equals 149, what is the number?',
      a: '23',
      acc: ['23', 'TWENTY-THREE'],
      exp: '5x + 34 = 149 => 5x = 115 => x = 23.',
      hint: 'Subtract 34 from 149, then divide by 5'
    },
    {
      c: 'LOGIC',
      p: 'A store sells 3 notebooks and 4 pens for $38. If each pen is $5, how much is one notebook in dollars?',
      a: '6',
      acc: ['6', 'SIX', '$6', '6 DOLLARS'],
      exp: '3n + 4(5) = 38 => 3n = 18 => n = 6.',
      hint: '38 minus 20, then divide by 3'
    },
    {
      c: 'LOGIC',
      p: 'The sum of two numbers is 84, and their difference is 26. What is the larger number?',
      a: '55',
      acc: ['55', 'FIFTY-FIVE'],
      exp: '(84 + 26) ÷ 2 = 110 ÷ 2 = 55.',
      hint: '(Sum + Difference) ÷ 2'
    },
    {
      c: 'MATH',
      p: 'A car travels 315 km in 3.5 hours. At the same speed, how many km does it travel in 5 hours?',
      a: '450',
      acc: ['450', 'FOUR HUNDRED FIFTY', '450 KM'],
      exp: 'Speed = 315 ÷ 3.5 = 90 km/h. Distance = 90 × 5 = 450 km.',
      hint: 'Speed is 90 km/h, multiply by 5'
    },
    {
      c: 'LOGIC',
      p: 'If 4 painters paint 4 rooms in 4 hours, how many hours do 10 painters take to paint 20 rooms?',
      a: '8',
      acc: ['8', 'EIGHT', '8 HOURS'],
      exp: '1 painter does 1 room in 4 hours. 10 painters do 10 rooms in 4 hrs, 20 rooms take 8 hrs.',
      hint: '1 painter paints 1 room in 4 hours'
    },
    {
      c: 'MATH',
      p: 'Three consecutive even integers sum to 126. What is the smallest integer?',
      a: '40',
      acc: ['40', 'FORTY'],
      exp: 'n + (n+2) + (n+4) = 126 => 3n = 120 => n = 40 (numbers: 40, 42, 44).',
      hint: 'Middle number is 42, smallest is 40'
    },
    {
      c: 'MATH',
      p: 'If a rectangle\'s length is 3 times its width and its perimeter is 72, what is its area?',
      a: '243',
      acc: ['243', 'TWO HUNDRED FORTY-THREE'],
      exp: '2(3w + w) = 72 => 8w = 72 => w = 9, l = 27. Area = 27 × 9 = 243.',
      hint: 'Width is 9, length is 27'
    },
    {
      c: 'LOGIC',
      p: 'Divide $180 between A and B such that A gets $30 more than twice B\'s share. How much does B get in dollars?',
      a: '50',
      acc: ['50', 'FIFTY', '$50'],
      exp: '(2B + 30) + B = 180 => 3B = 150 => B = 50.',
      hint: '3B + 30 = 180'
    },
    {
      c: 'MATH',
      p: 'A reservoir empties by 15% each hour. If it originally held 400 liters, how many liters remain after 2 hours?',
      a: '289',
      acc: ['289', 'TWO HUNDRED EIGHTY-NINE'],
      exp: '400 × 0.85 × 0.85 = 289 liters.',
      hint: '400 × 0.85² = 289'
    }
  ],

  // Level 24 (Geometry / Powers upgraded)
  24: [
    {
      c: 'PATTERN',
      p: 'Which number doesn\'t belong: 2, 3, 5, 7, 9, 11?',
      a: '9',
      acc: ['9', 'NINE'],
      exp: '9 is composite; the rest are prime.',
      hint: 'Look for prime numbers'
    },
    {
      c: 'PATTERN',
      p: 'Which number is the odd one out: 4, 9, 16, 20, 25?',
      a: '20',
      acc: ['20', 'TWENTY'],
      exp: '20 is not a perfect square.',
      hint: 'Square numbers'
    },
    {
      c: 'PATTERN',
      p: 'Which number doesn\'t belong: 2, 4, 6, 9, 10, 12?',
      a: '9',
      acc: ['9', 'NINE'],
      exp: '9 is odd; the rest are even.',
      hint: 'Parity (even vs odd)'
    },
    {
      c: 'PATTERN',
      p: 'Odd one out: 27, 64, 125, 144, 216?',
      a: '144',
      acc: ['144', 'ONE HUNDRED FORTY-FOUR', 'ONE HUNDRED FORTY FOUR'],
      exp: '144 is a square, not a cube. The others are cubes.',
      hint: 'Check cube numbers: 3³, 4³, 5³, 6³'
    },
    {
      c: 'PATTERN',
      p: 'Which term breaks the pattern: 3, 6, 11, 18, 26, 38?',
      a: '26',
      acc: ['26', 'TWENTY-SIX', 'TWENTY SIX'],
      exp: 'Differences should be +3, +5, +7, +9, +11. 18+9 = 27, not 26.',
      hint: 'Consecutive odd differences: +3, +5, +7, +9'
    },
    {
      c: 'MATH',
      p: 'A regular polygon has interior angles of 140°. How many sides does it have?',
      a: '9',
      acc: ['9', 'NINE', '9 SIDES', 'NONAGON'],
      exp: 'Exterior angle = 180° - 140° = 40°. Sides = 360° ÷ 40° = 9.',
      hint: 'Exterior angle is 40°, 360 ÷ 40'
    },
    {
      c: 'MATH',
      p: 'A cube has a side length of 5. What is its total surface area across all 6 faces?',
      a: '150',
      acc: ['150', 'ONE HUNDRED FIFTY'],
      exp: 'Area of 1 face = 25. Total = 6 × 25 = 150.',
      hint: '6 faces × 5²'
    },
    {
      c: 'MATH',
      p: 'Solve: 2^7 - 2^5',
      a: '96',
      acc: ['96', 'NINETY-SIX', 'NINETY SIX'],
      exp: '128 - 32 = 96.',
      hint: '128 minus 32'
    },
    {
      c: 'MATH',
      p: 'Two complementary angles are in ratio 2:3. What is the larger angle in degrees?',
      a: '54',
      acc: ['54', 'FIFTY-FOUR', 'FIFTY FOUR', '54 DEGREES'],
      exp: 'Complementary sum to 90°. (3/5) × 90 = 54°.',
      hint: 'Sum is 90 degrees, divide by 5 and multiply by 3'
    },
    {
      c: 'MATH',
      p: 'A triangle has vertices forming an area with base 14 and height 16. What is its area?',
      a: '112',
      acc: ['112', 'ONE HUNDRED TWELVE'],
      exp: '(14 × 16) ÷ 2 = 112.',
      hint: 'Half of base × height'
    }
  ],

  // Level 27 (Rate / Algebra upgraded)
  27: [
    {
      c: 'LOGIC',
      p: 'If all A are B, and all B are C, what can be concluded about A?',
      a: 'A is C',
      acc: ['A IS C', 'ALL A ARE C', 'A ARE C'],
      exp: 'Transitive syllogism.',
      hint: 'Connect A to C directly'
    },
    {
      c: 'LOGIC',
      p: 'If Tom is taller than Bob, and Bob is taller than Jim, who is shortest?',
      a: 'Jim',
      acc: ['JIM'],
      exp: 'Tom > Bob > Jim.',
      hint: 'At the bottom of the order'
    },
    {
      c: 'LOGIC',
      p: 'If Red is heavier than Blue, and Green is heavier than Red, which is heaviest?',
      a: 'Green',
      acc: ['GREEN'],
      exp: 'Green > Red > Blue.',
      hint: 'Heaviest of the three'
    },
    {
      c: 'LOGIC',
      p: 'Five runners A, B, C, D, E finish. A finished before B, B before C, D before A, E finished last. Who won?',
      a: 'D',
      acc: ['D', 'RUNNER D'],
      exp: 'Order: D, A, B, C, E.',
      hint: 'D beat A, and A beat everyone else'
    },
    {
      c: 'LOGIC',
      p: 'A clock shows 3:15. What is the angle between the hour and minute hands in degrees?',
      a: '7.5',
      acc: ['7.5', '7.5 DEGREES', '7 1/2'],
      exp: 'At 3:15, hour hand moved 15 × 0.5° = 7.5° past 3.',
      hint: 'Hour hand moves 0.5 degrees per minute'
    },
    {
      c: 'LOGIC',
      p: 'If yesterday was tomorrow, today would be Friday. What day is today?',
      a: 'Sunday',
      acc: ['SUNDAY'],
      exp: 'If yesterday (Saturday) were tomorrow, today would be Friday.',
      hint: 'Think two days ahead from Friday'
    },
    {
      c: 'LOGIC',
      p: 'A father is 4 times as old as his son. In 20 years, he will be twice as old. How old is the son now?',
      a: '10',
      acc: ['10', 'TEN'],
      exp: '4s + 20 = 2(s + 20) => 2s = 20 => s = 10.',
      hint: 'Set up equation: 4s + 20 = 2(s + 20)'
    },
    {
      c: 'LOGIC',
      p: 'In a code, CAT is 24, DOG is 26. What is FOX (6+15+24)?',
      a: '45',
      acc: ['45', 'FORTY-FIVE', 'FORTY FIVE'],
      exp: '6 + 15 + 24 = 45.',
      hint: 'Sum the alphabet positions of F, O, X'
    },
    {
      c: 'MATH',
      p: 'A runner completes 1500 meters at a speed of 6 meters/sec. How many seconds did it take?',
      a: '250',
      acc: ['250', 'TWO HUNDRED FIFTY'],
      exp: '1500 ÷ 6 = 250 seconds.',
      hint: '1500 divided by 6'
    },
    {
      c: 'MATH',
      p: 'A tap fills a 720-liter tank in 4 hours. What is the fill rate in liters per minute?',
      a: '3',
      acc: ['3', 'THREE', '3 L/MIN'],
      exp: '4 hours = 240 minutes. 720 ÷ 240 = 3 L/min.',
      hint: 'Divide 720 by 240 minutes'
    }
  ],

  // Level 28 (Math & Logic upgraded)
  28: [
    {
      c: 'LOGIC',
      p: 'If 5 machines make 5 widgets in 5 minutes, how many minutes do 100 machines take to make 100 widgets?',
      a: '5',
      acc: ['5', 'FIVE', '5 MINUTES'],
      exp: 'Each machine takes 5 minutes to make 1 widget.',
      hint: 'Each individual machine takes 5 minutes'
    },
    {
      c: 'LOGIC',
      p: 'A bat and ball cost $1.10. The bat costs $1.00 more than the ball. How much does the ball cost in cents?',
      a: '5',
      acc: ['5', 'FIVE', '5 CENTS', '0.05'],
      exp: 'x + (x + 1.00) = 1.10 => 2x = 0.10 => x = 0.05.',
      hint: 'Not 10 cents! Total difference is $1.00'
    },
    {
      c: 'LOGIC',
      p: 'In a lake, a patch of lily pads doubles every day. If it takes 48 days to cover the lake, how many days to cover half?',
      a: '47',
      acc: ['47', 'FORTY-SEVEN', 'FORTY SEVEN'],
      exp: 'One day before day 48, it was half covered.',
      hint: 'One day before full coverage'
    },
    {
      c: 'LOGIC',
      p: 'A snail climbs up a 10m pole: 3m up during day, slips 2m down at night. How many days to reach the top?',
      a: '8',
      acc: ['8', 'EIGHT', '8 DAYS'],
      exp: 'After 7 days it is at 7m. On day 8 it climbs 3m to reach 10m.',
      hint: 'On the final day it reaches top before slipping'
    },
    {
      c: 'LOGIC',
      p: 'How many times do the hands of an analog clock overlap in a 24-hour day?',
      a: '22',
      acc: ['22', 'TWENTY-TWO', 'TWENTY TWO'],
      exp: '11 times every 12 hours = 22 times in 24 hours.',
      hint: '11 times every 12 hours'
    },
    {
      c: 'MATH',
      p: 'What is 45% of 360?',
      a: '162',
      acc: ['162', 'ONE HUNDRED SIXTY-TWO'],
      exp: '0.45 × 360 = 162.',
      hint: '50% is 180, minus 5% (18)'
    },
    {
      c: 'MATH',
      p: 'What is 65% of 240?',
      a: '156',
      acc: ['156', 'ONE HUNDRED FIFTY-SIX'],
      exp: '0.65 × 240 = 156.',
      hint: '50% is 120, plus 15% (36)'
    },
    {
      c: 'MATH',
      p: 'What is the next prime number after 47?',
      a: '53',
      acc: ['53', 'FIFTY-THREE'],
      exp: '48, 49, 50, 51, 52 are composite. 53 is prime.',
      hint: 'Check odd numbers in the 50s'
    },
    {
      c: 'MATH',
      p: 'What is the sum of all prime numbers between 20 and 35?',
      a: '83',
      acc: ['83', 'EIGHTY-THREE'],
      exp: 'Primes are 23, 29, 31. Sum = 23 + 29 + 31 = 83.',
      hint: '23 + 29 + 31'
    },
    {
      c: 'MATH',
      p: 'What is the sum of all odd integers from 1 to 19?',
      a: '100',
      acc: ['100', 'ONE HUNDRED'],
      exp: 'Sum of first n odds is n². There are 10 odds: 10² = 100.',
      hint: '10 odd numbers squared'
    }
  ],

  // Level 29 (Pattern & Deduction - remove "2+2")
  29: [
    {
      c: 'PATTERN',
      p: 'If 3 ⊕ 4 = 25, and 5 ⊕ 12 = 169, what is 8 ⊕ 15?',
      a: '289',
      acc: ['289', 'TWO HUNDRED EIGHTY-NINE'],
      exp: 'Rule is a² + b². 8² + 15² = 64 + 225 = 289.',
      hint: 'Sum of squares: 8² + 15²'
    },
    {
      c: 'PATTERN',
      p: 'If 4 # 2 = 14, 5 # 3 = 22, and 6 # 4 = 32, what is 7 # 5?',
      a: '44',
      acc: ['44', 'FORTY-FOUR', 'FORTY FOUR'],
      exp: 'Rule is a² - b. 7² - 5 = 49 - 5 = 44.',
      hint: 'First number squared minus second number'
    },
    {
      c: 'PATTERN',
      p: 'If 1 = 5, 2 = 25, 3 = 125, 4 = 625, then 5 = ?',
      a: '1',
      acc: ['1', 'ONE'],
      exp: 'By first statement: 1 = 5, so 5 = 1.',
      hint: 'Read the very first equation'
    },
    {
      c: 'PATTERN',
      p: 'What is the next number: 1, 11, 21, 1211, 111221, ?',
      a: '312211',
      acc: ['312211'],
      exp: 'Look-and-say: "three 1s, two 2s, one 1".',
      hint: 'Count the digits of the previous number'
    },
    {
      c: 'PATTERN',
      p: 'If 12 × 12 = 9, 23 × 23 = 16, what is 34 × 34?',
      a: '49',
      acc: ['49', 'FORTY-NINE'],
      exp: 'Sum digits then square: (3+4)² = 7² = 49.',
      hint: 'Sum digits of 34, then square the result'
    },
    {
      c: 'PATTERN',
      p: 'Complete: 1, 4, 10, 22, 46, ?',
      a: '94',
      acc: ['94', 'NINETY-FOUR', 'NINETY FOUR'],
      exp: 'Rule: 2n + 2. 46 × 2 + 2 = 94. (Or differences +3, +6, +12, +24, +48).',
      hint: 'Multiply by 2 and add 2'
    },
    {
      c: 'PATTERN',
      p: 'Find next: 3, 7, 15, 31, 63, ?',
      a: '127',
      acc: ['127', 'ONE HUNDRED TWENTY-SEVEN'],
      exp: '2n + 1: 63 × 2 + 1 = 127.',
      hint: 'Double each time and add 1'
    },
    {
      c: 'PATTERN',
      p: 'Complete sequence: 2, 5, 11, 23, 47, ?',
      a: '95',
      acc: ['95', 'NINETY-FIVE'],
      exp: '2n + 1: 47 × 2 + 1 = 95.',
      hint: 'Double and add 1'
    },
    {
      c: 'PATTERN',
      p: 'If ELEVEN + TWO = TWELVE + ONE, how many letters in THIRTY?',
      a: '6',
      acc: ['6', 'SIX'],
      exp: 'T-H-I-R-T-Y has 6 letters.',
      hint: 'Count letters in THIRTY'
    },
    {
      c: 'PATTERN',
      p: 'Find the missing number in the grid: (3, 5 -> 34), (4, 6 -> 52), (5, 7 -> ?)',
      a: '74',
      acc: ['74', 'SEVENTY-FOUR'],
      exp: '5² + 7² = 25 + 49 = 74.',
      hint: 'Square both and add them'
    }
  ],

  // Level 30 (BODMAS / Advanced operations)
  30: [
    {
      c: 'MATH',
      p: 'Solve: 7 + 7 ÷ 7 + 7 × 7 - 7',
      a: '50',
      acc: ['50', 'FIFTY'],
      exp: '7 + 1 + 49 - 7 = 50.',
      hint: 'Order of operations: division and multiplication first'
    },
    {
      c: 'MATH',
      p: 'Solve: (17² - 13²)',
      a: '120',
      acc: ['120', 'ONE HUNDRED TWENTY'],
      exp: '289 - 169 = 120, or (17-13)(17+13) = 4 × 30 = 120.',
      hint: 'Difference of squares: (17-13)(17+13)'
    },
    {
      c: 'MATH',
      p: 'Solve: 350 - (16 × 14)',
      a: '126',
      acc: ['126', 'ONE HUNDRED TWENTY-SIX'],
      exp: '16 × 14 = 224. 350 - 224 = 126.',
      hint: '16 × 14 is 224'
    },
    {
      c: 'MATH',
      p: 'Solve: (144 ÷ 6) × (84 ÷ 12) - 38',
      a: '130',
      acc: ['130', 'ONE HUNDRED THIRTY'],
      exp: '24 × 7 - 38 = 168 - 38 = 130.',
      hint: '24 × 7 = 168, minus 38'
    },
    {
      c: 'MATH',
      p: 'Solve: 15² - 11²',
      a: '104',
      acc: ['104', 'ONE HUNDRED FOUR'],
      exp: '225 - 121 = 104, or (15-11)(15+11) = 4 × 26 = 104.',
      hint: '225 minus 121'
    },
    {
      c: 'MATH',
      p: 'What is 12 cubed (12^3)?',
      a: '1728',
      acc: ['1728', 'ONE THOUSAND SEVEN HUNDRED TWENTY-EIGHT'],
      exp: '12 × 12 × 12 = 144 × 12 = 1728.',
      hint: '144 × 12'
    },
    {
      c: 'MATH',
      p: 'A car travels 280 km in 3.5 hours. What is its average speed in km/h?',
      a: '80',
      acc: ['80', 'EIGHTY', '80 KM/H'],
      exp: '280 ÷ 3.5 = 80 km/h.',
      hint: '280 divided by 3.5'
    },
    {
      c: 'MATH',
      p: 'If 4a - 15 = 49, what is 3a?',
      a: '48',
      acc: ['48', 'FORTY-EIGHT'],
      exp: '4a = 64 => a = 16 => 3a = 48.',
      hint: 'Find a first (16), then multiply by 3'
    },
    {
      c: 'MATH',
      p: 'What is 75% of 280 minus 35% of 200?',
      a: '140',
      acc: ['140', 'ONE HUNDRED FORTY'],
      exp: '210 - 70 = 140.',
      hint: '210 minus 70'
    },
    {
      c: 'MATH',
      p: 'Solve: (19 × 4) + (16 × 5)',
      a: '156',
      acc: ['156', 'ONE HUNDRED FIFTY-SIX'],
      exp: '76 + 80 = 156.',
      hint: '76 plus 80'
    }
  ],

  // Level 34 (Geometry & Combinatorics upgraded)
  34: [
    {
      c: 'LOGIC',
      p: 'Two coins equal 30 cents, and one is not a nickel. What are the two coins?',
      a: 'Quarter and nickel',
      acc: ['QUARTER AND NICKEL', 'A QUARTER AND A NICKEL', 'NICKEL AND QUARTER', '25 AND 5'],
      exp: 'One is not a nickel, but the other one is (a quarter and a nickel).',
      hint: 'The OTHER one is a nickel'
    },
    {
      c: 'MATH',
      p: 'A plane flies 450 miles in 1.5 hours with a 20 mph tailwind. What is its still-air speed?',
      a: '280',
      acc: ['280', 'TWO HUNDRED EIGHTY', '280 MPH'],
      exp: 'Ground speed = 450/1.5 = 300. Still-air = 300 - 20 = 280 mph.',
      hint: 'Speed is 300 mph with wind, subtract 20'
    },
    {
      c: 'LOGIC',
      p: 'If 8 people each shake hands with everyone once, how many handshakes happen?',
      a: '28',
      acc: ['28', 'TWENTY-EIGHT'],
      exp: '8 × 7 / 2 = 28.',
      hint: 'n(n-1)/2: 8 × 7 ÷ 2'
    },
    {
      c: 'LOGIC',
      p: 'If a clock strikes 6 times in 5 seconds, how many seconds does it take to strike 12 times?',
      a: '11',
      acc: ['11', 'ELEVEN'],
      exp: '5 intervals take 5 seconds (1 sec per interval). 11 intervals take 11 seconds.',
      hint: 'Count intervals between strikes: 5 intervals take 5 seconds'
    },
    {
      c: 'MATH',
      p: 'An interior angle of a regular octagon is how many degrees?',
      a: '135',
      acc: ['135', 'ONE HUNDRED THIRTY-FIVE', '135 DEGREES'],
      exp: '(8 - 2) × 180 ÷ 8 = 1080 ÷ 8 = 135°.',
      hint: '180 minus (360 ÷ 8)'
    },
    {
      c: 'MATH',
      p: 'Solve: 18² - 14²',
      a: '128',
      acc: ['128', 'ONE HUNDRED TWENTY-EIGHT'],
      exp: '324 - 196 = 128, or (18-14)(18+14) = 4 × 32 = 128.',
      hint: 'Difference of squares: 4 × 32'
    },
    {
      c: 'MATH',
      p: 'A rectangular prism has edges 3, 4, and 12. What is the length of its interior space diagonal?',
      a: '13',
      acc: ['13', 'THIRTEEN'],
      exp: '√(3² + 4² + 12²) = √(9 + 16 + 144) = √169 = 13.',
      hint: 'Square root of (9 + 16 + 144)'
    },
    {
      c: 'MATH',
      p: 'How many diagonals does a regular hexagon have?',
      a: '9',
      acc: ['9', 'NINE'],
      exp: 'n(n-3)/2 = 6 × 3 / 2 = 9.',
      hint: '6 × (6 - 3) ÷ 2'
    },
    {
      c: 'MATH',
      p: 'A circle has area 144π. What is its diameter?',
      a: '24',
      acc: ['24', 'TWENTY-FOUR'],
      exp: 'πr² = 144π => r = 12 => diameter = 24.',
      hint: 'Radius is √144 = 12, diameter is double'
    },
    {
      c: 'MATH',
      p: 'Solve: (13 × 13) - (12 × 12)',
      a: '25',
      acc: ['25', 'TWENTY-FIVE'],
      exp: '169 - 144 = 25.',
      hint: '13² - 12²'
    }
  ],

  // Level 35 (Algebra & Number theory upgraded)
  35: [
    {
      c: 'MATH',
      p: 'What is the sum of all prime numbers between 10 and 20?',
      a: '60',
      acc: ['60', 'SIXTY'],
      exp: 'Primes: 11, 13, 17, 19. Sum = 11 + 13 + 17 + 19 = 60.',
      hint: '11 + 13 + 17 + 19'
    },
    {
      c: 'MATH',
      p: 'What is the smallest three-digit prime number?',
      a: '101',
      acc: ['101', 'ONE HUNDRED ONE', 'ONE HUNDRED AND ONE'],
      exp: '100 is composite; 101 has no divisors.',
      hint: 'Check just above 100'
    },
    {
      c: 'MATH',
      p: 'Solve: 19² - 18²',
      a: '37',
      acc: ['37', 'THIRTY-SEVEN'],
      exp: '(19 - 18)(19 + 18) = 1 × 37 = 37.',
      hint: '19 + 18'
    },
    {
      c: 'MATH',
      p: 'Solve: (16 × 16) - (15 × 15)',
      a: '31',
      acc: ['31', 'THIRTY-ONE'],
      exp: '256 - 225 = 31.',
      hint: '16 + 15'
    },
    {
      c: 'MATH',
      p: 'Solve: 14² + 12²',
      a: '340',
      acc: ['340', 'THREE HUNDRED FORTY'],
      exp: '196 + 144 = 340.',
      hint: '196 + 144'
    },
    {
      c: 'PATTERN',
      p: 'Find the missing number: 2 -> 8, 3 -> 27, 4 -> 64, 5 -> ?',
      a: '125',
      acc: ['125', 'ONE HUNDRED TWENTY-FIVE'],
      exp: 'Cube rule: 5³ = 125.',
      hint: '5 cubed'
    },
    {
      c: 'PATTERN',
      p: 'Find missing: 6 -> 216, 7 -> 343, 8 -> ?',
      a: '512',
      acc: ['512', 'FIVE HUNDRED TWELVE'],
      exp: '8³ = 512.',
      hint: '8 cubed'
    },
    {
      c: 'PATTERN',
      p: 'Find missing: 10 -> 100, 20 -> 400, 30 -> ?',
      a: '900',
      acc: ['900', 'NINE HUNDRED'],
      exp: 'Square rule: 30² = 900.',
      hint: '30 squared'
    },
    {
      c: 'PATTERN',
      p: 'Grid pattern: 2×3=12, 3×4=24, 4×5=40, 5×6=?',
      a: '60',
      acc: ['60', 'SIXTY'],
      exp: '2 × product: 2 × (5 × 6) = 60.',
      hint: 'Double the normal product'
    },
    {
      c: 'PATTERN',
      p: 'If 2->5, 3->10, 4->17, 5->26, what does 6 become?',
      a: '37',
      acc: ['37', 'THIRTY-SEVEN'],
      exp: 'n² + 1: 6² + 1 = 37.',
      hint: 'Square the number and add 1'
    }
  ],

  // Level 37 (Fractions, Roots & Percentages upgraded)
  37: [
    {
      c: 'LOGIC',
      p: 'A bat and ball cost $110. The bat costs $100 more than the ball. How much is the ball in dollars?',
      a: '5',
      acc: ['5', 'FIVE', '$5', '5 DOLLARS'],
      exp: 'b + (b + 100) = 110 => 2b = 10 => b = 5.',
      hint: 'x + (x + 100) = 110'
    },
    {
      c: 'LOGIC',
      p: 'If 8 workers build 8 chairs in 8 hours, how many hours for 1 worker to build 1 chair?',
      a: '8',
      acc: ['8', 'EIGHT', '8 HOURS'],
      exp: 'Each worker makes 1 chair in 8 hours.',
      hint: 'Each worker builds at the same rate'
    },
    {
      c: 'MATH',
      p: 'A car leaves at 60 mph, another at 40 mph opposite direction. Distance apart after 2.5 hours?',
      a: '250',
      acc: ['250', 'TWO HUNDRED FIFTY', '250 MILES'],
      exp: '(60 + 40) × 2.5 = 100 × 2.5 = 250 miles.',
      hint: 'Combined speed 100 mph × 2.5 hours'
    },
    {
      c: 'MATH',
      p: 'What is 37.5% of 320?',
      a: '120',
      acc: ['120', 'ONE HUNDRED TWENTY'],
      exp: '3/8 of 320 = 3 × 40 = 120.',
      hint: '37.5% is 3/8'
    },
    {
      c: 'MATH',
      p: 'What is 62.5% of 240?',
      a: '150',
      acc: ['150', 'ONE HUNDRED FIFTY'],
      exp: '5/8 of 240 = 5 × 30 = 150.',
      hint: '62.5% is 5/8'
    },
    {
      c: 'MATH',
      p: 'Solve: √576 - √324',
      a: '6',
      acc: ['6', 'SIX'],
      exp: '24 - 18 = 6.',
      hint: '24 minus 18'
    },
    {
      c: 'MATH',
      p: 'Solve: √441 + √169',
      a: '34',
      acc: ['34', 'THIRTY-FOUR'],
      exp: '21 + 13 = 34.',
      hint: '21 plus 13'
    },
    {
      c: 'MATH',
      p: 'Solve: √625 - √289',
      a: '8',
      acc: ['8', 'EIGHT'],
      exp: '25 - 17 = 8.',
      hint: '25 minus 17'
    },
    {
      c: 'MATH',
      p: 'A triangle with sides 9, 12, 15 has what area?',
      a: '54',
      acc: ['54', 'FIFTY-FOUR'],
      exp: 'Right triangle: (9 × 12) ÷ 2 = 54.',
      hint: 'Right triangle with legs 9 and 12'
    },
    {
      c: 'MATH',
      p: 'Solve: (15 × 18) - (14 × 12)',
      a: '102',
      acc: ['102', 'ONE HUNDRED TWO'],
      exp: '270 - 168 = 102.',
      hint: '270 minus 168'
    }
  ],

  // Level 38 (Strict elimination of 2+2 & elementary BODMAS)
  38: [
    {
      c: 'DECODING',
      p: 'What is hexadecimal FF in decimal?',
      a: '255',
      acc: ['255', 'TWO HUNDRED FIFTY-FIVE'],
      exp: '15 × 16 + 15 = 255.',
      hint: '15 × 16 + 15'
    },
    {
      c: 'DECODING',
      p: 'What is hexadecimal 10 in decimal?',
      a: '16',
      acc: ['16', 'SIXTEEN'],
      exp: '1 × 16 + 0 = 16.',
      hint: '1 × 16'
    },
    {
      c: 'DECODING',
      p: 'What is hexadecimal A in decimal?',
      a: '10',
      acc: ['10', 'TEN'],
      exp: 'A = 10.',
      hint: 'First letter after 9'
    },
    {
      c: 'DECODING',
      p: 'What is binary 11111111 in decimal?',
      a: '255',
      acc: ['255', 'TWO HUNDRED FIFTY-FIVE'],
      exp: 'Eight 1s in binary = 255.',
      hint: '2^8 - 1'
    },
    {
      c: 'DECODING',
      p: 'Convert binary 101010 to decimal.',
      a: '42',
      acc: ['42', 'FORTY-TWO'],
      exp: '32 + 8 + 2 = 42.',
      hint: '32 + 8 + 2'
    },
    {
      c: 'DECODING',
      p: 'Convert decimal 64 to binary.',
      a: '1000000',
      acc: ['1000000', '100 0000'],
      exp: '2^6 = 1000000.',
      hint: '1 followed by six zeros'
    },
    {
      c: 'MATH',
      p: 'Solve: (18 × 7) - (96 ÷ 8) + 14',
      a: '128',
      acc: ['128', 'ONE HUNDRED TWENTY-EIGHT'],
      exp: '126 - 12 + 14 = 128.',
      hint: '126 - 12 + 14'
    },
    {
      c: 'MATH',
      p: 'Solve: (45 ÷ 3) × 4 - (72 ÷ 6)',
      a: '48',
      acc: ['48', 'FORTY-EIGHT'],
      exp: '15 × 4 - 12 = 60 - 12 = 48.',
      hint: '60 minus 12'
    },
    {
      c: 'MATH',
      p: 'Solve: 120 ÷ (4 × 3) + (15 × 6)',
      a: '100',
      acc: ['100', 'ONE HUNDRED'],
      exp: '120 ÷ 12 + 90 = 10 + 90 = 100.',
      hint: '10 plus 90'
    },
    {
      c: 'MATH',
      p: 'Solve: (14 × 15) - (13 × 12)',
      a: '54',
      acc: ['54', 'FIFTY-FOUR'],
      exp: '210 - 156 = 54.',
      hint: '210 minus 156'
    }
  ],

  // Level 40 (Grand Puzzles upgraded)
  40: [
    {
      c: 'MATH',
      p: 'Grand Puzzle: What is (65% of 240) + (45% of 180)?',
      a: '237',
      acc: ['237', 'TWO HUNDRED THIRTY-SEVEN'],
      exp: '156 + 81 = 237.',
      hint: '156 plus 81'
    },
    {
      c: 'MATH',
      p: 'Grand Puzzle: If x² - y² = 120 and x - y = 6, what is the value of x + y?',
      a: '20',
      acc: ['20', 'TWENTY'],
      exp: '(x-y)(x+y) = 120 => 6(x+y) = 120 => x+y = 20.',
      hint: 'Divide 120 by (x - y)'
    },
    {
      c: 'MATH',
      p: 'Grand Puzzle: A train 200m long passes a pole in 8 seconds. What is its speed in km/h?',
      a: '90',
      acc: ['90', 'NINETY', '90 KM/H'],
      exp: 'Speed = 200/8 = 25 m/s. In km/h: 25 × 3.6 = 90 km/h.',
      hint: '25 m/s × 3.6'
    },
    {
      c: 'MATH',
      p: 'Grand Puzzle: Solve for positive x: (2x² - 8) ÷ 4 = 16',
      a: '6',
      acc: ['6', 'SIX'],
      exp: '2x² - 8 = 64 => 2x² = 72 => x² = 36 => x = 6.',
      hint: 'Multiply by 4, add 8, divide by 2, take square root'
    },
    {
      c: 'MATH',
      p: 'Grand Puzzle: What is 2^10 (2 to the 10th power)?',
      a: '1024',
      acc: ['1024', 'ONE THOUSAND TWENTY-FOUR'],
      exp: '2^10 = 1024.',
      hint: '1024 (1 Kilobyte)'
    },
    {
      c: 'MATH',
      p: 'Grand Puzzle: The sum of three consecutive multiples of 7 is 147. What is the largest multiple?',
      a: '56',
      acc: ['56', 'FIFTY-SIX'],
      exp: 'Middle = 147 ÷ 3 = 49. Largest = 49 + 7 = 56.',
      hint: 'Middle number is 49'
    },
    {
      c: 'MATH',
      p: 'Grand Puzzle: A cone has base radius 6 and height 8. What is its slant height?',
      a: '10',
      acc: ['10', 'TEN'],
      exp: '√(6² + 8²) = √(36 + 64) = √100 = 10.',
      hint: 'Pythagorean triple: 6, 8, 10'
    },
    {
      c: 'MATH',
      p: 'Grand Puzzle: Solve: √1024 + √576',
      a: '56',
      acc: ['56', 'FIFTY-SIX'],
      exp: '32 + 24 = 56.',
      hint: '32 plus 24'
    },
    {
      c: 'MATH',
      p: 'Grand Puzzle: What is the remainder when 7^4 is divided by 5?',
      a: '1',
      acc: ['1', 'ONE'],
      exp: '7^4 = 2401. 2401 mod 5 = 1.',
      hint: 'Last digit of 2401 is 1'
    },
    {
      c: 'MATH',
      p: 'Grand Puzzle: If a shop gives a 20% discount then an extra 10% off the reduced price, what is total % discount?',
      a: '28',
      acc: ['28', 'TWENTY-EIGHT', '28%'],
      exp: '100 -> 80 -> 72. Total discount = 100 - 72 = 28%.',
      hint: '100 - 80 × 0.9 = 28'
    }
  ]
};

// Apply upgrades to CHALLENGES_DATABASE
let updatedCount = 0;
for (const [lvlStr, questions] of Object.entries(mediumUpgrades)) {
  const lvl = parseInt(lvlStr, 10);
  const baseTime = lvl <= 25 ? 20 : lvl <= 30 ? 18 : lvl <= 35 ? 17 : 15;
  const reward = 35 + (lvl - 20) * 2;

  questions.forEach((q, qIdx) => {
    const targetId = `lvl_${lvl}_c${qIdx + 1}`;
    const existingIdx = CHALLENGES_DATABASE.findIndex(c => c.id === targetId);

    const challengeObj = {
      id: targetId,
      level: lvl,
      difficulty: 'medium',
      category: q.c,
      prompt: q.p,
      answer: q.a,
      acceptedAnswers: q.acc,
      ruleType: 'EXACT_OR_ALIAS',
      ruleArg: null,
      explanation: q.exp,
      baseTime,
      reward,
      modifier: lvl >= 32 && (qIdx === 4 || qIdx === 8) ? 'BLACKOUT' : null,
      hint: q.hint
    };

    if (existingIdx !== -1) {
      CHALLENGES_DATABASE[existingIdx] = challengeObj;
      updatedCount++;
    }
  });
}

console.log(`Updated ${updatedCount} medium challenges with advanced mathematics.`);

// Write back to challenges.js
const content = `// Challenge Database for WordBlast
// Exactly 60 Levels:
// Easy (1-20): 100% Word Challenges
// Medium (21-40): 100% Math, Sequence, Logic, Pattern Puzzles (Non-trivial, somewhat difficult mathematics)
// Hard (41-60): 100% Riddles, Trick Questions, Lateral Brain Teasers

export const CHALLENGES_DATABASE = ${JSON.stringify(CHALLENGES_DATABASE, null, 2)};

export function generateProceduralChallenge(level, seq = 1) {
  if (level <= 20) {
    const substrings = ['BL', 'TR', 'ST', 'SH', 'CH', 'FL', 'GR', 'PL', 'SP', 'BR'];
    const chosen = substrings[(level + seq) % substrings.length];
    return {
      id: \`proc_lvl_\${level}_\${seq}_\${Date.now()}\`,
      level: level,
      difficulty: 'easy',
      category: 'WORD',
      prompt: \`Type an English word containing "\${chosen}"\`,
      answer: chosen + 'AST',
      acceptedAnswers: [],
      ruleType: 'CONTAINS_SUBSTRING',
      ruleArg: chosen,
      explanation: \`Any valid English word containing \${chosen}.\`,
      baseTime: level <= 5 ? 15 : level <= 10 ? 14 : level <= 15 ? 12 : 10,
      reward: 30,
      modifier: null,
      hint: \`Contains \${chosen}\`
    };
  } else if (level <= 40) {
    const a = 14 + ((level * 3 + seq) % 15);
    const b = 6 + ((level + seq * 2) % 9);
    const c = 12 + ((level * 2 + seq) % 20);
    const ans = (a * b - c).toString();
    return {
      id: \`proc_lvl_\${level}_\${seq}_\${Date.now()}\`,
      level: level,
      difficulty: 'medium',
      category: 'MATH',
      prompt: \`Solve: (\${a} × \${b}) - \${c}\`,
      answer: ans,
      acceptedAnswers: [ans],
      ruleType: 'EXACT_OR_ALIAS',
      ruleArg: null,
      explanation: \`(\${a} * \${b}) - \${c} = \${ans}\`,
      baseTime: level <= 25 ? 20 : level <= 30 ? 18 : level <= 35 ? 17 : 15,
      reward: 45,
      modifier: null,
      hint: \`First calculate \${a} × \${b} = \${a * b}, then subtract \${c}\`
    };
  } else {
    return {
      id: \`proc_lvl_\${level}_\${seq}_\${Date.now()}\`,
      level: level,
      difficulty: 'hard',
      category: 'RIDDLE',
      prompt: 'What has keys but no locks, space but no room, and enter but no door?',
      answer: 'Keyboard',
      acceptedAnswers: ['KEYBOARD', 'A KEYBOARD', 'COMPUTER KEYBOARD'],
      ruleType: 'EXACT_OR_ALIAS',
      ruleArg: null,
      explanation: 'A computer keyboard.',
      baseTime: 30,
      reward: 75,
      modifier: null,
      hint: 'Used for typing'
    };
  }
}
`;

fs.writeFileSync('./src/data/challenges.js', content, 'utf8');
console.log('Successfully wrote updated CHALLENGES_DATABASE and generateProceduralChallenge to src/data/challenges.js');
