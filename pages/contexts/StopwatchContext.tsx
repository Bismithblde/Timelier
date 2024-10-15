import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';

interface Stopwatch {
  name: string;
  time: number;
  link: string;
}

interface StopwatchState {
  stopwatches: Stopwatch[];
}

type StopwatchAction =
  | { type: 'ADD_STOPWATCH'; payload: Stopwatch }
  | { type: 'REMOVE_STOPWATCH'; payload: string }
  | { type: 'UPDATE_TIME'; payload: { link: string; time: number } }
  | { type: 'SET_STATE'; payload: StopwatchState };

const getInitialState = async (): Promise<StopwatchState> => {
  return new Promise(resolve => {
    chrome.storage.local.get('stopwatchState', result => {
      resolve(result.stopwatchState || { stopwatches: [] });
    });
  });
};

function stopwatchReducer(state: StopwatchState, action: StopwatchAction): StopwatchState {
  let newState: StopwatchState;
  switch (action.type) {
    case 'ADD_STOPWATCH':
      newState = {
        ...state,
        stopwatches: [...state.stopwatches, action.payload],
      };
      break;
    case 'REMOVE_STOPWATCH':
      newState = {
        ...state,
        stopwatches: state.stopwatches.filter(sw => sw.link !== action.payload),
      };
      break;
    case 'UPDATE_TIME':
      newState = {
        ...state,
        stopwatches: state.stopwatches.map(sw =>
          sw.link === action.payload.link ? { ...sw, time: action.payload.time } : sw,
        ),
      };
      break;
    case 'SET_STATE':
      newState = action.payload;
      break;
    default:
      newState = state;
  }
  chrome.storage.local.set({ stopwatchState: newState });
  return newState;
}

const StopwatchContext = createContext<{
  state: StopwatchState;
  dispatch: React.Dispatch<StopwatchAction>;
} | null>(null);

export const StopwatchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(stopwatchReducer, { stopwatches: [] });

  useEffect(() => {
    getInitialState().then(initialState => {
      dispatch({ type: 'SET_STATE', payload: initialState });
    });

    const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      if (changes.stopwatchState) {
        dispatch({ type: 'SET_STATE', payload: changes.stopwatchState.newValue });
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  return <StopwatchContext.Provider value={{ state, dispatch }}>{children}</StopwatchContext.Provider>;
};

export const useStopwatch = () => {
  const context = useContext(StopwatchContext);
  if (!context) {
    throw new Error('useStopwatch must be used within a StopwatchProvider');
  }

  const { state, dispatch } = context;

  const addStopwatch = useCallback(
    (stopwatch: Stopwatch) => {
      dispatch({ type: 'ADD_STOPWATCH', payload: stopwatch });
    },
    [dispatch],
  );

  const removeStopwatch = useCallback(
    (link: string) => {
      dispatch({ type: 'REMOVE_STOPWATCH', payload: link });
    },
    [dispatch],
  );

  const updateTime = useCallback(
    (link: string, time: number) => {
      dispatch({ type: 'UPDATE_TIME', payload: { link, time } });
    },
    [dispatch],
  );

  return {
    stopwatches: state.stopwatches,
    addStopwatch,
    removeStopwatch,
    updateTime,
  };
};
