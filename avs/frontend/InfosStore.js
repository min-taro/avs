import { writable } from 'svelte/store';

export const VolunteerStore = writable([]);
export const NewsStore = writable([]);

// 検索結果
export const SearchResultVolunteer = writable([]);
export const SearchResultNews = writable([]);
export const SearchValue = writable('');
