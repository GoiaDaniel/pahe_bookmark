function set(storageKey, storageVal) {
  chrome.storage.sync.set({ [storageKey]: storageVal });
}

function get(key) {
  return new Promise(resolve => {
    chrome.storage.sync.get(key, function(result) {
      console.log(`loaded ${key}, `, result)
      resolve(result)
    });
  })
}
