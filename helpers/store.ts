import create from 'zustand';

interface StoreState {
  storeExampleCounter: number;
}

const useStore = create<StoreState>(() => {
  return {
    storeExampleCounter: 0,
  };
});

export default useStore;
