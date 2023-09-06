# Sudoku

This app is built using Next.js, Tailwind CSS and Supabase.

## HLD

### Setup

To set this project up locally, clone the repo and run

```sh
yarn
```

to install the packages.  
You'll need 2 env variables: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to run the app.

Once done, run

```sh
yarn dev
```

to start the localhost server.

### Deployment/Hosting

This app is deployed on Vercel. So there are no steps required. Vercel automatically deploys the latest version everytime a new commit is pushed to the repo.

### Tech Stack

This project uses Next.js for the full-stack app, Tailwind CSS for styling and Supabase for the database. For testing, Jest is used and to render documentation from markdown pages `@next/mdx` is used.

#### Next.js

Next.js is a full-stack react framework. It is an extremely popular choice with some of the biggest companies using it for their products.  
Reasons for using Next.js

- Full stack framework
- Server-side rendering
- SEO Optimization
- Terrific community support
- Good performance by default
- Opinionated (a boon for large codebases)

#### Tailwind CSS

Tailwind CSS is a CSS framework. The best part about Tailwind CSS is that it is heavily customizable and flexible.  
Other frameworks like MUI are more of component frameworks. They can be customized too, but the level of customization with Tailwind is unparalleled.

#### Supabase

Supabase is a great choice for backend. It supports PostgreSQL for the database which makes it easy to do complex things. Plus, it builds on top of PostgreSQL to provide a lot of handy functionality. Moreover, it is open source, which brings a lot of transparency and a very vibrant community support. Also, performance is a key selling point for Supabase.  
It can also be used for other services like Storage and Authentication going forward.

### The Problem & The Solution

The problem statement is simple: Build an app that loads a random Sudoku puzzle and allows users to interact with the puzzle and once finished, verify the puzzle.

Here's what the solution (or data flow) looks like:  
The Next.js server uses the Supabase API to load a random puzzle from the database and then responds with the page containing the puzzle. The user then interacts with the puzzle on the client-side, where the logic for verification and real-time feedback exists.
On every input, we verify the puzzle for errors, and chalk it out if there are any. Once the puzzle is finished, if there are no errors we display a congratulatory popup.

### Project Structure

- Next.js with the App Router
- Pages can be found in `app/` directory
- `components/`, `icons/`, `utils/` & `hooks/` have components, icons, helper functions and custom hooks

## LLD

Let's discuss the low-level implementation in this section. For the sake of clarity, this section is divided into 2 parts:

- Backend
- Frontend

### Backend

The backend is very simple for this app. An API call to Supabase is made to retrieve a random puzzle from the database.  
In order to achieve that, we utilize the power of PostgreSQL functions. We have created a PostgreSQL function called `get_random_puzzle` and call it on the server through Supabase's Remote Procedure Calls to retrieve the puzzle.

### Frontend

On the frontend, there are a lot of things going on. Let's go through them one by one.

#### Data Model & Code Structure

The logic for the Sudoku puzzle is simple and represents a real Sudoku board itself. We have 3 components: `SudokuGrid`, `SudokuSubGrid` and the `SudokuGridCell`.

The `SudokuGrid` takes the puzzle (as a string) and is responsible for rendering the 9 `SudokuSubGrid`s.  
Each `SudokuSubGrid` is in turn passed it's child values (as a string) and is responsible for rendering 9 child `SudokuGridCell`s.  
A `SudokuGridCell` renders its value, and maintains the state for local data like notes.

The state of the grid is maintained by `SudokuContainer` which is a parent component for the puzzle. It contains `SudokuGrid` and `SudokuInput`.

> There are helper functions to facilitate conversions of indices to grid/subgrid coordinates and vice versa.

#### Sudoku Validation Logic

Another topic worth covering is the validation logic used to validate the Sudoku puzzle.

> Note: One product requirement to be kept in mind is real-time feedback. On every input, the puzzle should be validated and the user should be notified of any errors.

Now, we could write a Sudoku verification algorithm that traverses the complete board on every input and checks for any errors. The brute force solution would look like this:

```pseudo
error_points = {}

for each point in board:
	for each point_r in row:
	  if point_r == point:
			error_points.push(point)
			continue

	for each point_c in column:
	  if point_c == point:
			error_points.push(point)
			continue

	for each point_s in subgrid:
	  if point_s == point:
			error_points.push(point)
			continue

return True
```

However, there is a very simple way to quickly and cheaply optimize this solution: Only check for the relevant row, column and subgrid on every input.  
One catch is that we also need to account for previously detected error points which could be affected due to the latest input. The solution is to simply traverse through those points as well.

#### Modals

A custom `Modal` component is created to make it easier to make new modals. The component requires 3 props: `isOpen`, `onOpen` and `onClose`.  
These props can simply be received by using the custom `useModal` hook.

#### Other features

Implementation of other features is very simple:

- Timer: A custom hook `useTimer` is created which uses `interval`s to keep track of time
- Notes: Notes are locally managed by each `SudokuGridCell`

### Testing

There are 2 integration tests for testing the major functionality of this app - one for the rules modal and other for playing out the game on a mock puzzle and testing the various interactions. Jest is used for the testing framework.

## Future improvements

There's a couple of improvements that can and should be done to the project. Here's a list of the few:

- Better 404 handling: Currently, opening a random route leads to a default Next.js 404 page. We could have a better custom 404 page, or maybe redirect the user back to the home route
- Better handling of `New Game` functionality: Currently, clicking on `New Game` simply reloads the page. I just did that in the interest of time. Hope there's no negative points for that hehe :)
- Tests: There needs to be better tests and code coverage. Currently, for example the tests don't check for the error case.
- Error handling: Currently, if the app fails to fetch a puzzle from the database, it just uses a default puzzle. In case of a problem with the database, the users will keep seeing the same puzzle over and over again. So a better way to handle the error would probably be to display a clear error message.
- State management: Since the project is pretty small, I didn't use any state management libraries. But as the complexity increases, we might need those. Or if not a state management library, we could maybe use the React Context API since there's already a little bit of prop drilling going on.
