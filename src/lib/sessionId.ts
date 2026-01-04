// Generate or retrieve a persistent session ID for anonymous likes
export const getSessionId = (): string => {
  const storageKey = 'story_session_id';
  let sessionId = localStorage.getItem(storageKey);
  
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(storageKey, sessionId);
  }
  
  return sessionId;
};
