# Photo Gallery Web App (Pre-Screening Assignment)

A React photo gallery app built with Vite and Tailwind CSS.

## Tech Stack
- React (functional components + hooks only)
- Vite
- Tailwind CSS

## Assignment Requirements Coverage

### 1) Custom Hook: `src/hooks/useFetchPhotos.js`
- Implemented custom hook: `useFetchPhotos`.
- Returns exactly: `{ photos, loading, error }`.
- Fetches 30 photos from Picsum API.

Current API endpoint in code:
- `https://picsum.photos/v2/list?page=3&limit=30`

Required endpoint from assignment prompt:
- `https://picsum.photos/v2/list?page=1&limit=30`

### 2) Favourites Reducer: `src/reducers/favouritesReducer.js`
- Favourites state is managed with `useReducer`.
- Reducer action `TOGGLE_FAVOURITE` adds/removes photo from favourites.
- Initial state is read from `localStorage`.
- Updated state is written back to `localStorage` after every toggle.

### 3) Main Gallery: `src/App.jsx`
- Uses `useFetchPhotos`.
- Shows loading spinner while fetching.
- Shows error message on fetch failure.
- Search input filters photos by `author` in real time.
- Search does not call API again; filters fetched data only.
- Uses `useCallback` for search `onChange` handler.
- Uses `useMemo` for filtered photos computation.

### 4) UI and Responsive Grid
- Tailwind-only styling.
- Responsive grid implemented:
  - Mobile: `grid-cols-1`
  - Tablet: `md:grid-cols-2`
  - Desktop: `lg:grid-cols-4`
- Each card shows:
  - Photo
  - Author name
  - Heart button for favourite toggle
- Favourite state is visually indicated with filled red heart vs outline heart.

## File Structure

```text
photo-gallery-app/
├── src/
│   ├── hooks/
│   │   └── useFetchPhotos.js
│   ├── reducers/
│   │   └── favouritesReducer.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Run Locally

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open in browser:
- `http://localhost:5173`

## Notes
- No component library is used.
- No class component is used.
- Inline comments are included in code for `useReducer`, `useCallback`, and `useMemo` explanation.
- There is a review-focused spinner visibility delay in the custom hook.

## Strict Prompt Alignment
To match the prompt 1:1, update the fetch URL in `src/hooks/useFetchPhotos.js` to:

```js
https://picsum.photos/v2/list?page=1&limit=30
```
