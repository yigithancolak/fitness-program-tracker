
# Fitness Program Tracker


This project is designed to cater to fitness enthusiasts who enjoy creating their own customized workout programs.


## Tech Stack

### Language
- TypeScript

### Build Tool
- Vite

### Libraries and Frameworks
- React
- @emotion/react
- @emotion/styled
- @mui/icons-material
- @mui/material
- @mui/x-date-pickers
- @tanstack/react-query
- Axios
- Day.js
- React Toastify



  
## To Run It On On Your System

Clone the project

```bash
  git clone https://github.com/yigithancolak/fitness-program-tracker.git
```

Proje dizinine gidin

```bash
  cd fitness-program-tracker
```

Install the packages

```bash
  npm install
```

Run the dev server

```bash
  npm run dev
```

  
## App Flow & Code Examples

```javascript
export type InitialStateType = {
  plannedDays: PlanType[]
  selectedDay: string
}

export const initialState: InitialStateType = {
  plannedDays: getStorageDays(),
  selectedDay: ''
}

export const CalendarContext = createContext<{
  state: InitialStateType
  dispatch: Dispatch<ReducerActions>
}>({ state: initialState, dispatch: () => null })

export const CalendarProvider = (props: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <CalendarContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CalendarContext.Provider>
  )
}
```
App is initialized with an initial state created and distributed by the context. Also it checks localstorage for any previous user plans.

  
## App Tutorial Video
 
[screen-recording (1).webm](https://github.com/yigithancolak/fitness-program-tracker/assets/122079418/6ce9106f-ac86-41e0-862f-466e7e7c992e)
