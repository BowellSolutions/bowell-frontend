import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState} from "./reducers";
import {AppThunkDispatch} from "./store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
