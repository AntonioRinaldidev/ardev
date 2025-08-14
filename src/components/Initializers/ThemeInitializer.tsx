'use client';
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { initializeTheme } from "@/store/themeSlice";

export default function ThemeInitializer(){
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeTheme());
    }, [dispatch]);

    return null
}