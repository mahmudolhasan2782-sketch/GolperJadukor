export interface StoryParams {
  characters: string;
  theme: string;
  keywords: string;
}

export interface StoryState {
  content: string;
  isLoading: boolean;
  isComplete: boolean;
  error: string | null;
}
