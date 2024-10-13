export interface IData {
  id: number;
  name: string;
  duration: string;
  price: number;
  about: string;
  likes: number;
  deleted: boolean;
}

export type TData = IData[];

interface State {
  data: TData;
  sortOrder: "asc" | "desc";
  newCity: IData;
}

const initialState: State = {
  data: [],
  sortOrder: "asc",
  newCity: {
    id: Math.random(),
    name: "",
    duration: "",
    price: 0,
    about: "",
    likes: 0,
    deleted: false,
  },
};

type Action =
  | { type: "SET_DATA"; payload: TData }
  | { type: "SET_SORT_ORDER"; payload: "asc" | "desc" }
  | { type: "UPDATE_NEW_CITY"; payload: { name: string; value: string | number } }
  | { type: "ADD_CITY" }
  | { type: "LIKE_CITY"; payload: number }
  | { type: "DELETE_CITY"; payload: number };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "SET_SORT_ORDER":
      return { ...state, sortOrder: action.payload };
    case "UPDATE_NEW_CITY":
      return {
        ...state,
        newCity: { ...state.newCity, [action.payload.name]: action.payload.value },
      };
    case "ADD_CITY":
      return {
        ...state,
        data: [...state.data, state.newCity],
        newCity: {
          id: Math.random(),
          name: "",
          duration: "",
          price: 0,
          about: "",
          likes: 0,
          deleted: false,
        },
      };
    case "LIKE_CITY":
      return {
        ...state,
        data: state.data.map((item) =>
          item.id === action.payload ? { ...item, likes: item.likes + 1 } : item
        ),
      };
    case "DELETE_CITY":
      return {
        ...state,
        data: state.data.map((item) =>
          item.id === action.payload ? { ...item, deleted: !item.deleted } : item
        ),
      };
    default:
      return state;
  }
};

export { initialState, reducer };