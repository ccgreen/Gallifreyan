Gallifreyan
===========

## A Gallifreyan Alphabet translator

### About

The project is based on Sherman's Circular Gallifreyan, for more information about the language visit http://www.shermansplanet.com/gallifreyan

This is a fork of adrian17's Gallifreyan translator from http://adrian17.github.io/Gallifreyan/ , source at: https://github.com/adrian17/Gallifreyan

You can view the site at: https://ccgreen.github.io/Gallifreyan/
The project's purpose is to quickly create complex and customizable Gallifreyan words/sentences, without the need for image processing tools.
This edition adds support for unifon characters*



### TODO:

#### general:

#### fixes:
- the logic that limits angles in order to preserve letter/word order bugs out in rare cases
- the same with the word circle drawing, it's even more important as the bug makes it impossible to make overlapping letters

#### features:
- doubled vowels/consonants
- manually detach/reattach merged circles...
- support for punctuation, numbers?
- remember the state after changing the text if only some words were changed?
- add individual circle editing (for dots, line size, etc)

#### enhancements:
- make line creation algorithm smarter
- make arranging words prettier
- overall tweaks for the generation code, especially sizes

### Done:

#### general:
- added help text for circle resizing

#### fixes:
- fixed scaling of grandchildren

#### features:
- configurable dot size
- configurable dot radius

#### enhancements:

- make dots have a consistent distance from the centre (percentage) despite letter size
