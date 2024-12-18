export interface IData {
  id: string;
  name: string;
  duration: string;
  price: number;
  about: string;
  likes: number;
  deleted: boolean;
  image?: string;
  translations: {
    ka: {
      name: string;
      duration: string;
      about: string;
    };
  };
}

export type TData = IData[];

interface State {
  data: TData;
  sortOrder: 'asc' | 'desc';
  newCity: IData;
}

const initialState: State = {
  data: [],
  sortOrder: 'asc',
  newCity: {
    id: Math.random().toString(),
    name: '',
    duration: '',
    price: 0,
    about: '',
    likes: 0,
    deleted: false,
    image: '',
    translations: {
      ka: {
        name: '',
        duration: '',
        about: '',
      },
    },
  },
};

type Action =
  | { type: 'SET_DATA'; payload: TData }
  | { type: 'SET_SORT_ORDER'; payload: 'asc' | 'desc' }
  | {
      type: 'UPDATE_NEW_CITY';
      payload: { name: string; value: string | number };
    }
  | { type: 'ADD_CITY'; payload: IData }
  | { type: 'LIKE_CITY'; payload: string }
  | { type: 'DELETE_CITY'; payload: string }
  | { type: 'UPDATE_CITY'; payload: IData };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };
    case 'SET_SORT_ORDER':
      return { ...state, sortOrder: action.payload };
    case 'UPDATE_NEW_CITY': {
      const { name, value } = action.payload;
      if (name.includes('_ka')) {
        const field = name.split('_')[0];
        return {
          ...state,
          newCity: {
            ...state.newCity,
            translations: {
              ...state.newCity.translations,
              ka: {
                ...state.newCity.translations.ka,
                [field]: value,
              },
            },
          },
        };
      }
      return {
        ...state,
        newCity: { ...state.newCity, [name]: value },
      };
    }
    case 'ADD_CITY':
      return {
        ...state,
        data: [
          ...state.data,
          { ...state.newCity, id: Math.random().toString() },
        ],
        newCity: {
          id: Math.random().toString(),
          name: '',
          duration: '',
          price: 0,
          about: '',
          likes: 0,
          deleted: false,
          image: '',
          translations: {
            ka: {
              name: '',
              duration: '',
              about: '',
            },
          },
        },
      };
    case 'LIKE_CITY':
      return {
        ...state,
        data: state.data.map((item) =>
          item.id === action.payload ? { ...item, likes: item.likes + 1 } : item
        ),
      };
    case 'DELETE_CITY':
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
      };
    case 'UPDATE_CITY':
      return {
        ...state,
        data: state.data.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    default:
      return state;
  }
};

export { initialState, reducer, type Action, type State };
