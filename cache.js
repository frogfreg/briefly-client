import { makeVar } from "@apollo/client";

export const isLoggedVar = makeVar(false);

export const loggedUserFavoritesVar = makeVar([]);
