# Sudoku

Sudoku is a really fun Japanese puzzle game (I kinda got addicted while working on this assignment). This is a web-based version of the same.

> Note:
> This is a take-home assignment I received for Mobbin, but it's a fun one so I wrote a product doc :)

## Design

What makes a game fun is the spirit of challenge and competition. Also, since this is a digital form of the game, the user experience matters just like any other app.  
We must keeping this in mind as we design this app and look at what features to add to make it fun and get users to love it.

### MVP

For the MVP, the app just needs the puzzle, the ability to interact with it & input numbers on the board, and once finished, verify if the puzzle was solved correctly.  
That is all that is needed for MVP. But, there's some more interesting things we can do to make it better :)

### Other features

Upon studying other apps in the space, one can find a few neat, useful features like:

- Notes
- Real-time feedback
- Timer
- Difficulty levels
- Hints/Assistant

#### Notes

Sudoku is a complex game and with so many possibile permutations and combinations, it's hard to keep it all in the head. Hence, notes is a very critical feature of the app, allowing users to write notes in each cell for which possible values can or cannot be used.

#### Real-time feedback

Another very critical feature. Due to the game's complex nature, it is very easy to make mistakes in the game and if not caught early on, building up on that mistake can cause all the time and effort to be wasted. This can be very annoying as a user. Hence, real-time feedback and notifying to the user if there's a mistake they are doing, is an absolutely essential feature.

#### Timer

Having a timer can be useful to many. For the enthusiasts, it can help them notice their progress over time. And for the rest of us non-serious players, it can bring a little extra satisfaction upon completion of the puzzle. Moreover, it brings a little more competition to the game.

#### Difficulty levels

Again, a very handy feature for boosting competitiveness, satisfaction and measuring your progress. Moreover, its very standard for most similar puzzle games to have difficulty levels because it allows users to take a challenge they are comfortable with, so many users would expect this feature.

#### Hints/Assistant

This can be useful for many users who are trying to improve and learn to master the game. And for the non-serious users, it can be another agitation-saver.

### Some Rather Unique Features

These were some interesting features to make our app more interesting and fun. But these exist in many other similar apps on the market. There are also a few new ideas that can be unique to us that can make our game more impressive.

Currently, there are no games in the space which allow 1:1 competition.
We can have a new format of "Sudoku matches" among 2 people, where both are given the same puzzle and the one who solves it first wins the match.
Having 1:1 competition with real human beings makes the game so much more interesting.

This can be manifested in 2 different ways, both equally fun.

#### Online Competitions

We could have tournaments round the year, themed around different events and festivals, where online users can come together and compete with each other. Winners and achievers of different milestones can win different kinds of virtual rewards like access to various themes in the app, different kinds of badges etc.

#### Social Connection

As humans, we love playing games and competing with real people, especially our friends. Being able to connect and play with friends online will make our app a lot more engaging and fun to play with.  
Even just a simple implementation of the previous feature, where we can create a shareable link with our friends, opening which loads the same puzzle and whoever solves it first wins, can go a long way.

### Micro UX Improvements

Subtle UX improvements can elevate a user's experience too. Tiny things **do** matter :)  
2 basic ideas that come to mind are:

- Zen quotes: Loading up zen quotes when loading, or waiting for a player etc.
- Highlight selected cell's row, column and subgrid: A very critical and useful idea, it can help users narrow down their focus onto the relevant areas as they play.

## Conclusion

These were my thoughts on the design of the app. However, not all mentioned features are in the scope of a take-home assignment. So here's a few things I have implemented:

- Notes
- Real-time feedback
- Timer
- Highlighting selected cell's row, column and subgrid
- A modal for the explanation of rules

> Made with ❤️ for Mobbin
