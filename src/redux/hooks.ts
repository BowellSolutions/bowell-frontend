import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from "./reducers";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
