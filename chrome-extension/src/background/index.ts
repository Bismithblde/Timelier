interface Stopwatch {
  name: string;
  time: number;
  link: string;
}

function updateStopwatches() {
  chrome.storage.local.get('stopwatchState', result => {
    const state = result.stopwatchState || { stopwatches: [] };
    const stopwatches = state.stopwatches;

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs.length === 0) return;

      const currentTab = tabs[0];
      if (!currentTab || !currentTab.url) return;

      let updated = false;
      const updatedStopwatches = stopwatches.map((stopwatch: Stopwatch) => {
        if (currentTab.url.includes(stopwatch.link)) {
          updated = true;
          return { ...stopwatch, time: stopwatch.time + 1 };
        }
        return stopwatch;
      });

      if (updated) {
        chrome.storage.local.set({ stopwatchState: { ...state, stopwatches: updatedStopwatches } });
      }
    });
  });
}

// Run the update function every second
setInterval(updateStopwatches, 1000);
